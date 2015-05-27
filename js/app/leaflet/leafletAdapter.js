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
var LConst = require('./leafletConst');
var LeafletUtil = require('./leafletUtil');
var L = require('leaflet');
require('../../assets/leaflet.Graticule/src/L.Graticule');
require('../../assets/leaflet.mouseposition/src/L.Control.MousePosition');

var adapter = {

    createMapObject: function(divId, callback, baseLayer) {
        LeafletUtil.createMap(divId, callback, baseLayer);
    },

    destroyMap: function() {
        MapManager.getActiveMapObject().remove();
    },

    updateSize: function() {
        MapManager.getActiveMapObject().invalidateSize();
    },

    clearAllFeatures: function() {
        var map = MapManager.getActiveMapObject();
        map.allFeatures = {};
        map.layers[LConst.layerName.VECTOR].clearLayers();
        map.layers[LConst.layerName.CLUSTER].clearLayers();
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
        MapManager.getActiveMapObject().setZoom(zoomVal);
    },

    zoomToMaxExtent: function() {
        var map = MapManager.getActiveMapObject();
        map.setZoom(map.getMinZoom());
    },

    zoomToData: function(layerId) {
        throw new Error('Method not currently supported for Leaflet');
    },

    getCenter: function() {
        var center = MapManager.getActiveMapObject().getCenter();
        return ObjectFactory.coordinate(center.lat, center.lng);
    },

    setCenter: function(coordinate) {
        var latlng = LeafletUtil.createLatLng(coordinate);
        MapManager.getActiveMapObject().panTo(latlng);
    },

    setBaseLayer: function(layerId) {
        // TODO implement
        throw new Error('mapapi.setBaseLayer() is not currently supported for Leaflet');
    },

    addWmsLayer: function(layer) {
        var name = layer.getId();
        var url = layer.getUrl();

        // Handle WMS GetMap Request Parameters
        // ------------------------------------
        // Default Leaflet options: layers:'', styles:'', format:'image.jpeg', transparent:false, version:'1.1.1', crs:null
        // Inherits default TileLayer options: see http://leafletjs.com/reference.html#tilelayer-options, includes zoom settings, opacity, tileSize, etc.

        var options = {
            layers: layer.getLayers().join(),
            transparent: layer.getIsTransparent(),
            autoZIndex: true
        };
        if (!_.isUndefined(layer.getStyles())) {
            options.styles = layer.getStyles().join();
        }
        if (!_.isUndefined(layer.getFormat())) {
            options.format = layer.getFormat();
        } else if (layer.getIsTransparent()) {
            options.format = 'image/png';
        }
        if (!_.isUndefined(layer.getNumZoomLevels())) {
            options.maxNativeZoom = layer.getNumZoomLevels();
        }

        var wms = new L.TileLayer.WMS(url, options);

        var map = MapManager.getActiveMapObject();
        map.layers[name] = wms;

        //Provide a default zIndex for the layer
        wms.setZIndex(Object.getOwnPropertyNames(map.layers).length);

        map.addLayer(wms);
    },

    addWmtsLayer: function(layer) {
        // TODO implement
        throw new Error('WMTS is not currently supported for Leaflet');
    },

    removeLayer: function(layerId) {
        var map = MapManager.getActiveMapObject();
        if (map.layers[layerId] !== undefined) {
            map.removeLayer(map.layers[layerId]);
            map.layers[layerId] = undefined;
        }
    },

    toggleLayer: function(layerId) {
        var map = MapManager.getActiveMapObject();
        if (map.layers[layerId] !== undefined) {
            if (map.hasLayer(map.layers[layerId])) {
                map.removeLayer(map.layers[layerId]);
            } else {
                map.addLayer(map.layers[layerId]);
            }
        }
    },

    getLayerOrder: function(layerId) {
        var map = MapManager.getActiveMapObject();
        var lLayer = map.layers[layerId];
        if (lLayer !== undefined) {
            return lLayer.options.zIndex;
        }
    },

    setLayerOrder: function(layerId, zOrder) {
        var lLayer = MapManager.getActiveMapObject().layers[layerId];
        if (lLayer !== undefined) {
            lLayer.setZIndex(zOrder);
        }
    },

    getLayerOpacity: function(layerId) {
        var map = MapManager.getActiveMapObject();
        var lLayer = map.layers[layerId];
        if (lLayer !== undefined) {
            return lLayer.options.opacity;
        }
    },

    setLayerOpacity: function(layerId, opacity) {
        var lLayer = MapManager.getActiveMapObject().layers[layerId];
        if (lLayer !== undefined) {
            lLayer.setOpacity(opacity);
        }
    },

    getLayer: function(layerId) {
        throw new Error('Method not currently supported for Leaflet');
    },

    addPoint: function(featureId, layerId, coordinate, image) {
        // TODO handle layerId
        var lPoint;
        var latlng = LeafletUtil.createLatLng(coordinate);
        var map = MapManager.getActiveMapObject();
        if (image === undefined) {
            lPoint = LeafletUtil.createEventingCircleMarker(featureId, latlng);
        } else {
            lPoint = LeafletUtil.createEventingMarker(featureId, latlng, image);
        }
        map.allFeatures[featureId] = lPoint;
        map.layers[LConst.layerName.CLUSTER].addLayer(lPoint);
    },

    removePoint: function(featureId) {
        var map = MapManager.getActiveMapObject();
        map.layers[LConst.layerName.CLUSTER].removeLayer(map.allFeatures[featureId]);
        map.allFeatures[featureId] = undefined;
    },

    addPolygon: function(featureId, layerId, coordinates) {
        // TODO handle layerId
        var map = MapManager.getActiveMapObject();

        var latlngs = [];
        _.forEach(coordinates, function(coordinate) {
            latlngs.push(LeafletUtil.createLatLng(coordinate));
        });

        var lPoly = new L.Polygon(latlngs);
        map.allFeatures[featureId] = lPoly;
        map.layers[LConst.layerName.VECTOR].addLayer(lPoly);
    },

    removePolygon: function(featureId) {
        var map = MapManager.getActiveMapObject();
        map.layers[LConst.layerName.VECTOR].removeLayer(map.allFeatures[featureId]);
        map.allFeatures[featureId] = undefined;
    },

    addLine: function(featureId, layerId, coordinates) {
        // TODO handle layerId
        var map = MapManager.getActiveMapObject();

        var latlngs = [];
        _.forEach(coordinates, function(coordinate) {
            latlngs.push(LeafletUtil.createLatLng(coordinate));
        });

        var lPolyline = new L.Polyline(latlngs);
        map.allFeatures[featureId] = lPolyline;
        map.layers[LConst.layerName.VECTOR].addLayer(lPolyline);
    },

    removeLine: function(featureId) {
        var map = MapManager.getActiveMapObject();
        map.layers[LConst.layerName.VECTOR].removeLayer(map.allFeatures[featureId]);
        map.allFeatures[featureId] = undefined;
    },

    addMultipoint: function(featureId, layerId, coordinates) {
        // TODO handle multipoint
        var map = MapManager.getActiveMapObject();

        var latlngs = [];
        _.forEach(coordinates, function(coordinate) {
            latlngs.push(LeafletUtil.createLatLng(coordinate));
        });

        var lMultiPoint = new L.FeatureGroup();

        for (var i = 0; i < latlngs.length; i++) {
            var point = LeafletUtil.createEventingCircleMarker(featureId, latlngs[i]);
            point.setRadius(LConst.pointStyle.RADIUS);
            point.addTo(lMultiPoint);
        }

        map.allFeatures[featureId] = lMultiPoint;
        map.layers[LConst.layerName.CLUSTER].addLayer(lMultiPoint);
    },

    removeMultipoint: function(featureId) {
        var map = MapManager.getActiveMapObject();
        map.layers[LConst.layerName.CLUSTER].removeLayer(map.allFeatures[featureId]);
        map.allFeatures[featureId] = undefined;
    },

    getFeatures: function(featureId) {
        throw new Error('Method not currently supported for Leaflet');
    },

    registerClickListener: function(functionId, clickHandler) {
        LeafletUtil.getEventManager().registerClickListener(functionId, clickHandler);
    },

    unregisterClickListener: function(functionId) {
        LeafletUtil.getEventManager().unregisterClickListener(functionId);
    },

    registerHoverListener: function(functionId, hoverHandler) {
        throw new Error('Method not currently supported for Leaflet');
    },

    unregisterHoverListener: function(functionId) {
        throw new Error('Method not currently supported for Leaflet');
    },

    registerMapMoveListener: function(functionId, handler) {
        throw new Error('Method not currently supported for Leaflet');
    },

    unregisterMapMoveListener: function(functionId) {
        throw new Error('Method not currently supported for Leaflet');
    },

    registerZoomEndListener: function(functionId, handler) {
        throw new Error('Method not currently supported for Leaflet');
    },

    unregisterZoomEndListener: function(functionId) {
        throw new Error('Method not currently supported for Leaflet');
    },

    registerOutListener: function(functionId, handler) {
        throw new Error('Method not currently supported for Leaflet');
    },

    unregisterOutListener: function(functionId) {
        throw new Error('Method not currently supported for Leaflet');
    },

    toggleZoom: function() {
        var map = MapManager.getActiveMapObject();
        if (map.allControls[LConst.controlName.ZOOM] === undefined) {
            var zControl = new L.control.zoom();
            map.allControls[LConst.controlName.ZOOM] = zControl;
            map.addControl(zControl);
        }
        else {
            map.removeControl(map.allControls[LConst.controlName.ZOOM]);
            map.allControls[LConst.controlName.ZOOM] = undefined;
        }
    },

    toggleScale: function() {
        var map = MapManager.getActiveMapObject();
        if (map.allControls[LConst.controlName.SCALE] === undefined) {
            var sControl = new L.control.scale({metric:true, imperial:true});
            map.allControls[LConst.controlName.SCALE] = sControl;
            map.addControl(sControl);
        }
        else {
            map.removeControl(map.allControls[LConst.controlName.SCALE]);
            map.allControls[LConst.controlName.SCALE] = undefined;
        }
    },

    toggleCoordinates: function() {
        var map = MapManager.getActiveMapObject();
        if (map.allControls[LConst.controlName.COORDINATES] === undefined) {
            map.allControls[LConst.controlName.COORDINATES] = L.control.mousePosition();
            map.addControl(map.allControls[LConst.controlName.COORDINATES]);
        }
        else {
            map.removeControl(map.allControls[LConst.controlName.COORDINATES]);
            map.allControls[LConst.controlName.COORDINATES] = undefined;
        }
    },

    toggleGraticule: function() {
        var map = MapManager.getActiveMapObject();
        if (map.allControls[LConst.controlName.GRATICULE] === undefined) {
            //Note: graticule defaults to 20 degree separation of lines, {interval: x} can be used to change the default
            //Future: No label option is available but L.graticule().getLayers()[x].feature.properties.name holds degree information for each line
            map.allControls[LConst.controlName.GRATICULE] = L.graticule();
            map.addLayer(map.allControls[LConst.controlName.GRATICULE]);
        }
        else {
            map.removeLayer(map.allControls[LConst.controlName.GRATICULE]);
            map.allControls[LConst.controlName.GRATICULE] = undefined;
        }
    },

    addKml: function(layer) {
        throw new Error('Method not currently supported for Leaflet');
    },

    addGeoJson: function(layer) {
        throw new Error('Method not currently supported for Leaflet');
    },

    addVectorLayer: function(layerId, options) {
        throw new Error('Method not currently supported for Leaflet');
    }
};

module.exports = adapter;
