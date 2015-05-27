/**
   Copyright 2015 Booz Allen Hamilton

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

/* jshint -W097 */
'use strict';

var _ = require('lodash');
var Constants = require('../core/const');
var MapManager = require('../core/mapManager');
var ObjectValidator = require('../core/objectValidator');
var AppUtils = require('../util/appUtils');
var OpenLayers = require('../../assets/openLayers/2.13.1/OpenLayers');
var EventManager = require('../core/EventManager');

var _BASE_LAYER = 'BASE';
var _DEFAULT_PROJECTION = new OpenLayers.Projection('EPSG:4326');
var _eventManager = new EventManager();

// OpenLayers must be globally accessible for ArcGISCache support
// which uses JSONP to query for layer info prior to creating layer
require('../util/appUtils').getGlobalObject().OpenLayers = OpenLayers;

function _registerLoadendEvent(baseLayer, callback) {
    var callbackWrapper = function() {
        baseLayer.events.unregister('loadend', baseLayer, callbackWrapper);
        callback();
    };
    baseLayer.events.register('loadend', baseLayer, callbackWrapper);
}

function _instantiateMap(divId, callback, baseLayer) {

    if (callback !== undefined) {
        _registerLoadendEvent(baseLayer, callback);
    }

    var map = new OpenLayers.Map(divId, {
        theme: null
    });
    map.addLayer(baseLayer);
    map.zoomToMaxExtent();

    map.events.register('moveend', map, function(eventData) {
        _eventManager.handleMapMoveEvent(eventData);
    });

    map.events.register('zoomend', map, function(eventData) {
        _eventManager.handleZoomEndEvent(eventData);
    });

    MapManager.registerMapInstance(divId, Constants.mapType.OPENLAYERS, map);
    MapManager.setActiveMap(divId);
}

var util = {

    createMap: function(divId, callback, layer) {

        var baseLayer;

        // default to OpenStreetMaps if no layer was provided
        if (layer === undefined) {
            baseLayer = new OpenLayers.Layer.OSM(_BASE_LAYER);
            baseLayer.projection = new OpenLayers.Projection('EPSG:3857'); // see http://docs.openlayers.org/library/spherical_mercator.html#sphericalmercator-and-epsg-aliases
            _instantiateMap(divId, callback, baseLayer);
        }
        else {
            if (ObjectValidator.isArcGIS93RestLayer(layer)) {
                baseLayer = new OpenLayers.Layer.ArcGIS93Rest(
                    _BASE_LAYER,
                    layer.getUrl()
                );
                if (!_.isUndefined(layer.getNumZoomLevels())) {
                    baseLayer.addOptions({numZoomLevels: layer.getNumZoomLevels()}, true);
                }
                _instantiateMap(divId, callback, baseLayer);
            }
            else if (ObjectValidator.isArcGISCacheLayer(layer)) {
                var jsonp = new OpenLayers.Protocol.Script();
                jsonp.createRequest(layer.getUrl(), {
                    f: 'json',
                    pretty: 'true'
                }, function(layerInfo) {
                    var layerOptions = { layerInfo: layerInfo };
                    if (!_.isUndefined(layer.getNumZoomLevels())) {
                        layerOptions.numZoomLevels = layer.getNumZoomLevels();
                    }
                    baseLayer = new OpenLayers.Layer.ArcGISCache(_BASE_LAYER, layer.getUrl(), layerOptions);
                    _instantiateMap(divId, callback, baseLayer);
                });
            }
            else if (ObjectValidator.isWmtsLayer(layer)) {
                baseLayer = this.createWmtsObject(layer, true);
                _instantiateMap(divId, callback, baseLayer);
            }
            else if (ObjectValidator.isWmsLayer(layer)) {
                baseLayer = this.createWmsObject(layer, true);
                _instantiateMap(divId, callback, baseLayer);
            }
            else if (ObjectValidator.isKMLLayer(layer)) {
                baseLayer = this.createKmlLayer(layer, true);
                _instantiateMap(divId, callback, baseLayer);
            }
            else if (ObjectValidator.isGeoJsonLayer(layer)) {
                baseLayer = this.createGeoJsonLayer(layer, true);
                _instantiateMap(divId, callback, baseLayer);
            }
            else {
                throw new TypeError('API does not support for the given base layer type.');
            }
        }

    },

    createPoint: function(coordinate) {
        var point = new OpenLayers.Geometry.Point(coordinate.getLongitude(), coordinate.getLatitude());
        point.transform(_DEFAULT_PROJECTION, MapManager.getActiveMapObject().getProjectionObject());
        return point;
    },

    removeFeature: function(featureId) {
        var vectorLayers = MapManager.getActiveMapObject().getLayersByClass('OpenLayers.Layer.Vector');
        _.forEach(vectorLayers, function(vectorLayer) {
            var features = vectorLayer.getFeaturesByAttribute('featureId', featureId);
            vectorLayer.removeFeatures(features);
        });
    },

    toggleControl: function(controlClass, newControl) {
        var mapObj = MapManager.getActiveMapObject();
        var controls = mapObj.getControlsByClass(controlClass);
        if (controls.length === 0) {
            mapObj.addControl(newControl);
        }
        else {
            mapObj.removeControl(controls[0]);
        }
    },

    getDefaultProjection: function() {
        return _DEFAULT_PROJECTION;
    },

    calculateBounds: function(layerId) {
        var layer = this.getLayer(layerId);
        if (!_.isUndefined(layer)) {
            return layer.getDataExtent();
        }
        else return;
    },

    getEventManager: function() {
        return _eventManager;
    },

    createWmtsObject: function(layer, isBase) {
        var layerConfig = {
            isBaseLayer: isBase,
            name: layer.getId(),
            url: layer.getUrl(),
            layer: layer.getLayer(),
            matrixSet: layer.getMatrixSet(),
            style: layer.getStyle()
        };

        if (!isBase) {
            layerConfig.projection = layer.getProjection() || MapManager.getActiveMapObject().getProjection();
            layerConfig.numZoomLevels = layer.getNumZoomLevels() || MapManager.getActiveMapObject().getNumZoomLevels();
            layerConfig.maxResolution = layer.getMaxResolution() || MapManager.getActiveMapObject().getMaxResolution();
        }
        if (layer.getFormat() !== undefined) { layerConfig.format = layer.getFormat(); }
        if (!_.isUndefined(layer.getMatrixIds())) { layerConfig.matrixIds = layer.getMatrixIds(); }

        var wmtsLayer = new OpenLayers.Layer.WMTS(layerConfig);

        return wmtsLayer;
    },

    createWmsObject: function(layer, isBase) {
        var name = layer.getId();
        var url = layer.getUrl();

        // Handle WMS GetMap Request Parameters
        // ------------------------------------
        // We accept the defaults that OpenLayers stamps
        // in for the following required parameters:
        // version, service, request, srs, bbox, width, height
        var params = {
            layers: layer.getLayers().join(),
            transparent: layer.getIsTransparent()
        };
        if (!_.isUndefined(layer.getStyles())) {
            params.styles = layer.getStyles().join();
        }
        if (!_.isUndefined(layer.getFormat())) {
            params.format = layer.getFormat();
        }

        // Handle OpenLayers.Layer.WMS optional properties
        // -----------------------------------------------
        // OpenLayers.Layer.WMS also supports the following
        // properties as options:
        // encodeBBOX, noMagic, yx
        // ... and any properties from a superclass (there are a lot)
        // We will provide support for these on an as needed basis (upon request)
        var options = {
            isBaseLayer: isBase
        };

        if (!_.isUndefined(layer.getNumZoomLevels())) {
            options.numZoomLevels = layer.getNumZoomLevels();
        }

        var wms = new OpenLayers.Layer.WMS(name, url, params, options);
        return wms;
    },

    createKmlLayer: function(layer, isBase) {
        var kmllayer = new OpenLayers.Layer.Vector(layer.getId(), {
            strategies: [new OpenLayers.Strategy.Fixed()],
            protocol: new OpenLayers.Protocol.HTTP({
                url: layer.getPath(),
                format: new OpenLayers.Format.KML({
                    extractStyles: true,
                    extractAttributes: true,
                    maxDepth: 2
                })
            }),
            isBaseLayer: isBase
        });
        return kmllayer;
    },

    createGeoJsonLayer: function(layer, isBase) {
        var geoJsonLayer = new OpenLayers.Layer.Vector(layer.getId(), {
            strategies: [new OpenLayers.Strategy.Fixed()],
            protocol: new OpenLayers.Protocol.HTTP({
                url: layer.getPath(),
                format: new OpenLayers.Format.GeoJSON()
            }),
            isBaseLayer: isBase
        });
        return geoJsonLayer;
    },

    getLayer: function(layerId) {
        var layers = MapManager.getActiveMapObject().getLayersByName(layerId);
        if (_.isArray(layers) && !_.isEmpty(layers)) {
            return layers[0];
        }
        else {
            return; // no matching layer found
        }
    }
};

module.exports = util;
