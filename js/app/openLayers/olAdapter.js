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
var ObjectFactory = require('../core/objectFactory');
var OlUtil = require('./olUtil');
var OpenLayers = require('../../assets/openLayers/2.13.1/OpenLayers');

var adapter = {

    createMapObject: function(divId, callback, baseLayer) {
        OlUtil.createMap(divId, callback, baseLayer);
    },

    destroyMap: function() {
        MapManager.getActiveMapObject().destroy();
    },

    updateSize: function() {
        MapManager.getActiveMapObject().updateSize();
    },

    clearAllFeatures: function() {
        var vectorLayers = MapManager.getActiveMapObject().getLayersByClass('OpenLayers.Layer.Vector');
        _.forEach(vectorLayers, function(vectorLayer) {
            vectorLayer.removeAllFeatures();
        });
    },

    zoomIn: function() {
        MapManager.getActiveMapObject().zoomIn();
    },

    zoomOut: function() {
        MapManager.getActiveMapObject().zoomOut();
    },

    getZoom: function() {
        return MapManager.getActiveMapObject().getZoom();
    },

    setZoom: function(zoomVal) {
        MapManager.getActiveMapObject().zoomTo(zoomVal);
    },

    zoomToMaxExtent: function() {
        MapManager.getActiveMapObject().zoomToMaxExtent();
    },

    zoomToData: function(layerId) {
        var bounds = OlUtil.calculateBounds(layerId);
        if (!_.isUndefined(bounds)) {
            MapManager.getActiveMapObject().zoomToExtent(bounds);
        }
    },

    getCenter: function() {
        var lonLat = MapManager.getActiveMapObject().getCenter();
        lonLat.transform(MapManager.getActiveMapObject().getProjectionObject(), OlUtil.getDefaultProjection());
        return ObjectFactory.coordinate(lonLat.lat, lonLat.lon);
    },

    setCenter: function(coordinate) {
        var lonLat = new OpenLayers.LonLat(coordinate.getLongitude(), coordinate.getLatitude());
        lonLat.transform(OlUtil.getDefaultProjection(), MapManager.getActiveMapObject().getProjectionObject());
        MapManager.getActiveMapObject().panTo(lonLat);
    },

    setBaseLayer: function(layerId) {
        var layer = MapManager.getActiveMapObject().getLayersByName(layerId)[0];
        if (_.isUndefined(layer)) {
            throw new Error('Cannot find layer with id: ' + layerId);
        }
        MapManager.getActiveMapObject().setBaseLayer(layer);
    },

    addWmsLayer: function(layer) {
        var wms = OlUtil.createWmsObject(layer, false);
        MapManager.getActiveMapObject().addLayer(wms);
    },

    addWmtsLayer: function(layer) {
        var wmtsLayer = OlUtil.createWmtsObject(layer, false);
        MapManager.getActiveMapObject().addLayer(wmtsLayer);
    },

    removeLayer: function(layerId) {
        var layer = MapManager.getActiveMapObject().getLayersByName(layerId)[0];
        if (_.isUndefined(layer)) {
            throw new Error('Cannot find layer with id: ' + layerId);
        }
        MapManager.getActiveMapObject().removeLayer(layer);
    },

    toggleLayer: function(layerId) {
        var layer = MapManager.getActiveMapObject().getLayersByName(layerId)[0];
        if (_.isUndefined(layer)) {
            throw new Error('Cannot find layer with id: ' + layerId);
        }
        layer.setVisibility(!layer.getVisibility());
    },

    getLayerOrder: function(layerId) {
        var layer = MapManager.getActiveMapObject().getLayersByName(layerId)[0];
        if (_.isUndefined(layer)) {
            throw new Error('Cannot find layer with id: ' + layerId);
        }
        return MapManager.getActiveMapObject().getLayerIndex(layer);
    },

    setLayerOrder: function(layerId, zOrder) {
        var layer = MapManager.getActiveMapObject().getLayersByName(layerId)[0];
        if (_.isUndefined(layer)) {
            throw new Error('Cannot find layer with id: ' + layerId);
        }
        MapManager.getActiveMapObject().setLayerIndex(layer, zOrder);
    },

    getLayerOpacity: function(layerId) {
        var layer = MapManager.getActiveMapObject().getLayersByName(layerId)[0];
        if (_.isUndefined(layer)) {
            throw new Error('Cannot find layer with id: ' + layerId);
        }
        return layer.opacity;
    },

    setLayerOpacity: function(layerId, opacity) {
        var layer = MapManager.getActiveMapObject().getLayersByName(layerId)[0];
        if (_.isUndefined(layer)) {
            throw new Error('Cannot find layer with id: ' + layerId);
        }
        layer.setOpacity(opacity);
    },

    getLayer: function(layerId) {
        return OlUtil.getLayer(layerId);
    },

    addPoint: function(featureId, layerId, coordinate, image) {
        var layer = OlUtil.getLayer(layerId);
        if (!_.isUndefined(layer)) {
            var attributes = {};
            attributes.featureId = featureId;
            var style;
            if (image !== undefined) {
                style = {
                    externalGraphic: image.getUrl(),
                    graphicWidth: image.getWidth(),
                    graphicHeight: image.getHeight()
                };
            }
            layer.addFeatures([new OpenLayers.Feature.Vector(OlUtil.createPoint(coordinate), attributes, style)]);
        }
    },

    removePoint: function(featureId) {
        OlUtil.removeFeature(featureId);
    },

    addPolygon: function(featureId, layerId, coordinates) {
        var layer = OlUtil.getLayer(layerId);
        if (!_.isUndefined(layer)) {
            var attributes = {};
            attributes.featureId = featureId;
            var points = [];
            _.forEach(coordinates, function(coordinate) {
                points.push(OlUtil.createPoint(coordinate));
            });
            var linearRing = new OpenLayers.Geometry.LinearRing(points);
            var polygon = new OpenLayers.Geometry.Polygon(linearRing);
            var vector = new OpenLayers.Feature.Vector(polygon, attributes);
            layer.addFeatures([vector]);
        }
    },

    removePolygon: function(featureId) {
        OlUtil.removeFeature(featureId);
    },

    addLine: function(featureId, layerId, coordinates) {
        var layer = OlUtil.getLayer(layerId);
        if (!_.isUndefined(layer)) {
            var attributes = {};
            attributes.featureId = featureId;
            var points = [];
            _.forEach(coordinates, function(coordinate) {
                points.push(OlUtil.createPoint(coordinate));
            });
            var line = new OpenLayers.Geometry.LineString(points);
            var vector = new OpenLayers.Feature.Vector(line, attributes);
            layer.addFeatures([vector]);
        }
    },

    removeLine: function(featureId) {
        OlUtil.removeFeature(featureId);
    },

    addMultipoint: function(featureId, layerId, coordinates) {
        var layer = OlUtil.getLayer(layerId);
        if (!_.isUndefined(layer)) {
            var attributes = {};
            attributes.featureId = featureId;
            var multipoint = new OpenLayers.Geometry.MultiPoint();
            _.forEach(coordinates, function(coordinate) {
                multipoint.addPoint(OlUtil.createPoint(coordinate));
            });
            var vector = new OpenLayers.Feature.Vector(multipoint, attributes);
            layer.addFeatures([vector]);
        }
    },

    removeMultipoint: function(featureId) {
        OlUtil.removeFeature(featureId);
    },

    getFeatures: function(featureId) {
        var allMatchingFeatures = [];
        var vectorLayers = MapManager.getActiveMapObject().getLayersByClass('OpenLayers.Layer.Vector');
        _.forEach(vectorLayers, function(vectorLayer) {
            var features = vectorLayer.getFeaturesByAttribute('featureId', featureId);
            if (_.isArray(features) && features.length > 0) {
                allMatchingFeatures.push(features);
            }
        });
        return _.flatten(allMatchingFeatures, true);
    },

    registerClickListener: function(functionId, clickHandler) {
        OlUtil.getEventManager().registerClickListener(functionId, clickHandler);
    },

    unregisterClickListener: function(functionId) {
        OlUtil.getEventManager().unregisterClickListener(functionId);
    },

    registerHoverListener: function(functionId, hoverHandler) {
        OlUtil.getEventManager().registerHoverListener(functionId, hoverHandler);
    },

    unregisterHoverListener: function(functionId) {
        OlUtil.getEventManager().unregisterHoverListener(functionId);
    },

    registerMapMoveListener: function(functionId, handler) {
        OlUtil.getEventManager().registerMapMoveListener(functionId, handler);
    },

    unregisterMapMoveListener: function(functionId) {
        OlUtil.getEventManager().unregisterMapMoveListener(functionId);
    },

    registerZoomEndListener: function(functionId, handler) {
        OlUtil.getEventManager().registerZoomEndListener(functionId, handler);
    },

    unregisterZoomEndListener: function(functionId) {
        OlUtil.getEventManager().unregisterZoomEndListener(functionId);
    },

    registerOutListener: function(functionId, handler) {
        OlUtil.getEventManager().registerOutListener(functionId, handler);
    },

    unregisterOutListener: function(functionId) {
        OlUtil.getEventManager().unregisterOutListener(functionId);
    },

    toggleZoom: function() {
        OlUtil.toggleControl('OpenLayers.Control.Zoom', new OpenLayers.Control.Zoom());
    },

    toggleScale: function() {
        OlUtil.toggleControl('OpenLayers.Control.ScaleLine', new OpenLayers.Control.ScaleLine());
    },

    toggleCoordinates: function() {
        OlUtil.toggleControl('OpenLayers.Control.MousePosition', new OpenLayers.Control.MousePosition());
    },

    toggleGraticule: function() {
        // Note: different from others; removing it from map's control array does not remove lines from display
        var mapObj = MapManager.getActiveMapObject();
        var controls = mapObj.getControlsByClass('OpenLayers.Control.Graticule');
        if (controls.length === 0) {
            mapObj.addControl(new OpenLayers.Control.Graticule());
        }
        else {
            controls[0].destroy();
        }
    },

    addKml: function(layer) {
        var kmllayer = OlUtil.createKmlLayer(layer, false);
        MapManager.getActiveMapObject().addLayer(kmllayer);
    },

    addGeoJson: function(layer) {
        var geoJsonLayer = OlUtil.createGeoJsonLayer(layer, false);
        MapManager.getActiveMapObject().addLayer(geoJsonLayer);
    },

    addVectorLayer: function(layerId, options) {
        var vectorLayer;
        if (!_.isUndefined(options)) {
            if (!_.isUndefined(options.strategies)) {
                if (!(_.isArray(options.strategies) && (options.strategies.length > 0) && (options.strategies[0] instanceof OpenLayers.Strategy))) {
                    throw new Error('options.strategies[0] must be an instance of OpenLayers.Strategy');
                }
            }
            if (!_.isUndefined(options.styleMap)) {
                if (!(options.styleMap instanceof OpenLayers.StyleMap)) {
                    throw new Error('options.styleMap must be an instance of OpenLayers.StyleMap');
                }
            }
            vectorLayer = new OpenLayers.Layer.Vector(layerId, options);
        }
        else {
            vectorLayer = new OpenLayers.Layer.Vector(layerId);
        }
        // register event listeners for feature data
        // event listeners propogate all feature data received
        // from OpenLayers when the event occurs to the EventManager
        // so the developer has access to any information they may need
        vectorLayer.events.register('featureclick', vectorLayer, function(data) {
            OlUtil.getEventManager().handleClickEvent(data);
        });
        vectorLayer.events.register('featureover', vectorLayer, function(data) {
            OlUtil.getEventManager().handleHoverEvent(data);
        });
        vectorLayer.events.register('featureout', vectorLayer, function(data) {
            OlUtil.getEventManager().handleOutEvent(data);
        });
        MapManager.getActiveMapObject().addLayer(vectorLayer);
    }
};

module.exports = adapter;
