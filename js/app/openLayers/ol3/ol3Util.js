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

// dependencies
var _ = require('lodash');
var EventManager = require('../../core/EventManager');
var Constants = require('../../core/const');
var ol3Const = require('./ol3Const');
var ObjectValidator = require('../../core/objectValidator');
var MapManager = require('../../core/mapManager');
var ol = require('../../../assets/ol3/ol');

// local variables
var _eventManager = new EventManager();
var _controls = {};

var _vectorSource;
var _pointSource;

// private helper functions
function _addControl(key, control) {
    if (ol3Const.controlName.hasOwnProperty(key)) {
        _controls[key] = control;
    }
    else {
        throw new Error('Key ' + key + ' for control not currently supported');
    }
}

function _getLayerByName(key) {
    var layers = MapManager.getActiveMapObject().getLayers();

    layers.forEach(function(layer) {
        if (layer.get('name') == key) {
            return layer;
        }
    });
}

function _getFeatureByID(key) {
    var layers = MapManager.getActiveMapObject().getLayers();
    var features = _vectorSource.getFeatures();
    var feature;

    for (var x = 0 ; x < features.length; x++) {
        if (features[x].get('id') == key) {
            feature = features[x];
        }
    }

    if (feature) {
        return feature;
    }
    else {
        return null;
    }
}

// public functions
var util = {

    createMap: function(divId, callback, layer) {
        var layers = [];

        _addControl(ol3Const.controlName.ZOOM, new ol.control.Zoom());

        _vectorSource = new ol.source.Vector();
        _pointSource = new ol.source.Vector();

        if (layer === undefined) {
            var baseLayer = new ol.layer.Tile({
                source: new ol.source.MapQuest({
                    layer: 'osm'
                })
            });

            layers.push(baseLayer);
        }
        else {
            if (ObjectValidator.isWmsLayer(layer)) {
                layers.push(this.createWMSLayer(layer));
            }
            else if (ObjectValidator.isWmtsLayer(layer)) {
                layers.push(this.createWMTSLayer(layer));
            }
            else if (ObjectValidator.isKMLLayer(layer)) {
                layers.push(this.createKMLLayer(layer));
            }
            else if (ObjectValidator.isGeoJsonLayer(layer)) {
                layers.push(this.createGeoJSONLayer(layer));
            }
        }

        var featureLayerGroup = new ol.layer.Group({
            name: ol3Const.layerName.FEATURE,
            layers: [
                new ol.layer.Vector({
                        name: ol3Const.layerName.VECTOR,
                        source: _vectorSource
                    }),
                new ol.layer.Vector({
                        name: ol3Const.layerName.POINT,
                        source: _pointSource
                    })
                ]
        });

        layers.push(featureLayerGroup);

        var map = new ol.Map({
            target: divId,
            controls: [_controls[ol3Const.controlName.ZOOM]],
            layers: layers,
            view: new ol.View({
                center: ol.proj.transform([0, 0], 'EPSG:4326', 'EPSG:3857'),
                extent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34],
                zoom: 2
            })
        });

        // FIXME handle callback

        MapManager.registerMapInstance(divId, Constants.mapType.OPENLAYERS3, map);
        MapManager.setActiveMap(divId);
    },

    getEventManager: function() {
        return _eventManager;
    },

    getVectorSource: function() {
        return _vectorSource;
    },

    getPointSource: function() {
        return _pointSource;
    },

    getFeatureByID: function(featureID) {
        return _getFeatureByID(featureID);
    },

    removeFeature: function(featureID) {
        var theFeatureToRemove = this.getFeatureByID(featureID);

        if (theFeatureToRemove) {
            this.getVectorSource().removeFeature(theFeatureToRemove);
        }
    },

    createWMSLayer: function(layer) {
        var name = layer.getId();
        var url = layer.getUrl();

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

        var options = {
            isBaseLayer: false
        };

        var wmsLayer = new ol.layer.Tile({
            name: name,
            source: new ol.source.TileWMS({
                url: url,
                params: params,
                options: options
            })
        });

        return wmsLayer;
    },

    createWMTSLayer: function(layer) {
        var projection = ol.proj.get('EPSG:3857');
        var projectionExtent = projection.getExtent();
        var size = ol.extent.getWidth(projectionExtent) / 256;
        var resolutions = new Array(14);
        var matrixIds = new Array(14);
        for (var z = 0; z < 14; ++z) {
            resolutions[z] = size / Math.pow(2, z);
            matrixIds[z] = z;
        }

        var wmtsLayer = new ol.layer.Tile({
            name: layer.getId(),
            opacity: 0.7,
            extent: projectionExtent,
            source: new ol.source.WMTS({
                url: layer.getUrl(),
                layer: layer.getLayer(),
                matrixSet: layer.getMatrixSet(),
                format: 'image/png',
                projection: projection,
                tileGrid: new ol.tilegrid.WMTS({
                    origin: ol.extent.getTopLeft(projectionExtent),
                    resolutions: resolutions,
                    matrixIds: matrixIds
                }),
                style: layer.getStyle()
            })
        });

        return wmtsLayer;
    },

    createGeoJSONLayer: function(layer) {
        var geoJsonLayer = new ol.layer.Vector({
                name: layer.getId(),
                source: new ol.source.GeoJSON({
                    projection: 'EPSG:3857',
                    url: layer.getPath()
                })
            });

        return geoJsonLayer;
    },

    createKMLLayer: function(layer) {
        var kmlLayer = new ol.layer.Vector({
            name: layer.getId(),
            source: new ol.source.KML({
                projection: 'EPSG:3857',
                url: layer.getPath()
            })
        });

        return kmlLayer;
    },

    toggleControl: function(key, control) {
        var map = MapManager.getActiveMapObject();

        // Graticule needs to be treated as a canvas item, so
        // we need to check and perform setMap(). Otherwise, we
        // can use functions addControl() & removeControl() for
        // all other control types as defined in ol3Const.js
        if (_controls[key]) {
            if (_.isEqual(key, ol3Const.controlName.GRATICULE)) {
                _controls[key].setMap(null);
            }
            else {
                map.removeControl(_controls[key]);
            }
            delete _controls[key];
        }
        else {
            _addControl(key, control);
            if (_.isEqual(key, ol3Const.controlName.GRATICULE)) {
                control.setMap(map);
            }
            else {
                map.addControl(_controls[key]);
            }
        }
    }
};

// expose public functions
module.exports = util;
