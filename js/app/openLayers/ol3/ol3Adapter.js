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
var MapManager = require('../../core/mapManager');
var ol3Const = require('./ol3Const');
var ObjectFactory = require('../../core/objectFactory');
var OlUtil = require('./ol3Util');
var ol = require('../../../assets/ol3/ol');

var adapter = {

    createMapObject: function(divId, callback, baseLayer) {
        OlUtil.createMap(divId, callback, baseLayer);
    },

    destroyMap: function() {
        MapManager.getActiveMapObject().setTarget(null);
    },

    updateSize: function() {
        MapManager.getActiveMapObject().updateSize();
    },

    clearAllFeatures: function() {
        OlUtil.getVectorSource().clear();
        OlUtil.getPointSource().clear();
    },

    zoomIn: function() {
        var mapView = MapManager.getActiveMapObject().getView();
        var currentZoom = mapView.getZoom();
        mapView.setZoom(currentZoom + 1);
    },

    zoomOut: function() {
        var mapView = MapManager.getActiveMapObject().getView();
        var currentZoom = mapView.getZoom();
        mapView.setZoom(currentZoom - 1);
    },

    getZoom: function() {
        return MapManager.getActiveMapObject().getView().getZoom();
    },

    setZoom: function(zoomVal) {
        MapManager.getActiveMapObject().getView().setZoom(zoomVal);
    },

    zoomToMaxExtent: function() {
        var mapObj = MapManager.getActiveMapObject();
        mapObj.getView().fitExtent([-20037508.34, -20037508.34, 20037508.34, 20037508.34], mapObj.getSize());
    },

    zoomToData: function(layerId) {
        throw new Error('Method not currently supported for OL3');
    },

    getCenter: function() {
        // Need to investigate - when OpenLayers 3 map wraps around the
        // international date line, getCenter will return coordinates out of bounds.
        var centerPoint = ol.proj.transform(MapManager.getActiveMapObject().getView().getCenter(), 'EPSG:3857', 'EPSG:4326');
        return ObjectFactory.coordinate(centerPoint[1], centerPoint[0]);
    },

    setCenter: function(coordinate) {
        MapManager.getActiveMapObject().getView().setCenter(ol.proj.transform([coordinate._lng, coordinate._lat], 'EPSG:4326', 'EPSG:3857'));
    },

    setBaseLayer: function(layerId) {
        var mapObj = MapManager.getActiveMapObject();
        this.setLayerOrder(layerId, 0);
        var layers = mapObj.getLayers();
        layers.removeAt(1);
    },

    addWmsLayer: function(layer) {
        MapManager.getActiveMapObject().addLayer(OlUtil.createWMSLayer(layer));
    },

    addWmtsLayer: function(layer) {
        MapManager.getActiveMapObject().addLayer(OlUtil.createWMTSLayer(layer));
    },

    removeLayer: function(layerId) {
        var layers = MapManager.getActiveMapObject().getLayers();

        layers.forEach(function(item, i) {
            if (item.get('name') == layerId) {
                MapManager.getActiveMapObject().removeLayer(item);
            }
        });
    },

    toggleLayer: function(layerId) {
        var layers = MapManager.getActiveMapObject().getLayers();

        layers.forEach(function(item, i) {
            if (item.get('name') == layerId) {
                item.setVisible(!item.getVisible());
            }
        });
    },

    getLayerOrder: function(layerId) {
        var layers = MapManager.getActiveMapObject().getLayers();
        var index;

        if (_.isUndefined(layers)) {
            throw new Error('There are no layers added to the map');
        }

        layers.forEach(function(item, i) {
            if (item.get('name') == layerId) {
                index = i;
            }
        });

        if (index) {
            return index;
        }
        else {
            throw new Error('Cannot find layer with id: ' + layerId);
        }
    },

    setLayerOrder: function(layerId, zOrder) {
        var layers = MapManager.getActiveMapObject().getLayers();

        if (_.isUndefined(layers)) {
            throw new Error('There are no layers added to the map');
        }

        var layer = layers.removeAt(this.getLayerOrder(layerId));
        layers.insertAt(zOrder, layer);
    },

    getLayerOpacity: function(layerId) {
        var layers = MapManager.getActiveMapObject().getLayers();
        var opacity;

        if (_.isUndefined(layers)) {
            throw new Error('There are no layers added to the map');
        }

        layers.forEach(function(item, i) {
            if (item.get('name') == layerId) {
                opacity = item.getOpacity();
            }
        });

        if (opacity) {
            return opacity;
        }
        else {
            throw new Error('Cannot find layer with id: ' + layerId);
        }
    },

    setLayerOpacity: function(layerId, opacity) {
        var layers = MapManager.getActiveMapObject().getLayers();

        if (_.isUndefined(layers)) {
            throw new Error('Cannot find layer with id: ' + layerId);
        }

        layers.forEach(function(item, i) {
            if (item.get('name') == layerId) {
                item.setOpacity(opacity);
            }
        });
    },

    getLayer: function(layerId) {
        throw new Error('Method not currently supported for OL3');
    },

    addPoint: function(featureId, layerId, coordinates, image) {
        // TODO handle layerId
        var mapObj = MapManager.getActiveMapObject();

        if ((!_.isNaN(coordinates._lat)) || (!_.isNaN(coordinates._lng))) {
            var coord = [];
            coord.push(coordinates._lng);
            coord.push(coordinates._lat);

            var Points = new ol.geom.Point(coord);
            Points.transform('EPSG:4326', 'EPSG:3857');

            var feature = new ol.Feature({ geometry: Points, id: featureId });

            OlUtil.getPointSource().addFeature(feature);
        }
    },

    removePoint: function(featureId) {
        OlUtil.removeFeature(featureId);
    },

    addPolygon: function(featureId, layerId, coordinates) {
        // TODO handle layerId
        var mapObj = MapManager.getActiveMapObject();
        var ring = [];

        for (var x = 0; x < coordinates.length; x++) {
            if ((!_.isNaN(coordinates[x]._lat)) || (!_.isNaN(coordinates[x]._lng))) {
                var point = [];
                point.push(coordinates[x]._lng);
                point.push(coordinates[x]._lat);
                ring.push(point);
            }
        }

        var Polygon = new ol.geom.Polygon([ring]);
        Polygon.transform('EPSG:4326', 'EPSG:3857');

        var feature = new ol.Feature({ geometry: Polygon, id: featureId });

        OlUtil.getVectorSource().addFeature(feature);
    },

    removePolygon: function(featureId) {
        OlUtil.removeFeature(featureId);
    },

    addLine: function(featureId, layerId, coordinates) {
        // TODO handle layerId
        var mapObj = MapManager.getActiveMapObject();
        var points = [];

        for (var x = 0; x < coordinates.length; x++) {
            if ((!_.isNaN(coordinates[x]._lat)) || (!_.isNaN(coordinates[x]._lng))) {
                var point = [];
                point.push(coordinates[x]._lng);
                point.push(coordinates[x]._lat);
                points.push(point);
            }
        }

        var LineString = new ol.geom.LineString(points);
        LineString.transform('EPSG:4326', 'EPSG:3857');

        var feature = new ol.Feature({ geometry: LineString, id: featureId });

        OlUtil.getVectorSource().addFeature(feature);
    },

    removeLine: function(featureId) {
        OlUtil.removeFeature(featureId);
    },

    addMultipoint: function(featureId, layerId, coordinates) {
        // TODO handle layerId
        var mapObj = MapManager.getActiveMapObject();
        var points = [];

        for (var x = 0; x < coordinates.length; x++) {
            if ((!_.isNaN(coordinates[x]._lat)) || (!_.isNaN(coordinates[x]._lng))) {
                var point = [];
                point.push(coordinates[x]._lng);
                point.push(coordinates[x]._lat);
                points.push(point);
            }
        }

        var MultiPoint = new ol.geom.MultiPoint(points);
        MultiPoint.transform('EPSG:4326', 'EPSG:3857');

        var feature = new ol.Feature({ geometry: MultiPoint, id: featureId });

        OlUtil.getPointSource().addFeature(feature);
    },

    removeMultipoint: function(featureId) {
        OlUtil.removeFeature(featureId);
    },

    getFeatures: function(featureId) {
        throw new Error('Method not currently supported for OL3');
    },

    registerClickListener: function(functionId, clickHandler) {
        OlUtil.getEventManager().registerClickListener(functionId, clickHandler);
    },

    unregisterClickListener: function(functionId) {
        OlUtil.getEventManager().unregisterClickListener(functionId);
    },

    registerHoverListener: function(functionId, hoverHandler) {
        throw new Error('Method not currently supported for OL3');
    },

    unregisterHoverListener: function(functionId) {
        throw new Error('Method not currently supported for OL3');
    },

    registerMapMoveListener: function(functionId, handler) {
        throw new Error('Method not currently supported for OL3');
    },

    unregisterMapMoveListener: function(functionId) {
        throw new Error('Method not currently supported for OL3');
    },

    registerZoomEndListener: function(functionId, handler) {
        throw new Error('Method not currently supported for OL3');
    },

    unregisterZoomEndListener: function(functionId) {
        throw new Error('Method not currently supported for OL3');
    },

    registerOutListener: function(functionId, handler) {
        throw new Error('Method not currently supported for OL3');
    },

    unregisterOutListener: function(functionId) {
        throw new Error('Method not currently supported for OL3');
    },

    toggleZoom: function() {
        OlUtil.toggleControl(ol3Const.controlName.ZOOM, new ol.control.Zoom());
    },

    toggleScale: function() {
        OlUtil.toggleControl(ol3Const.controlName.SCALE, new ol.control.ScaleLine());
    },

    toggleCoordinates: function() {
        OlUtil.toggleControl(ol3Const.controlName.COORDINATES,
            new ol.control.MousePosition({
                undefinedHTML: '',
                projection: 'EPSG:4326',
                coordinateFormat: function(coordinate) {
                    return ol.coordinate.format(coordinate, '{x}, {y}', 4);
                }
            }));
    },

    // Warning - OpenLayers 3 Graticule API is not currently stable.
    // See http://openlayers.org/en/master/apidoc/ol.Graticule.html?unstable=true
    toggleGraticule: function() {
        OlUtil.toggleControl(ol3Const.controlName.GRATICULE,
            new ol.Graticule({
                strokeStyle: new ol.style.Stroke({
                    color: 'rgba(255,120,0,0.9)',
                    width: 2,
                    lineDash: [0.5, 4]
                })
            }));
    },

    addKml: function(layer) {
        MapManager.getActiveMapObject().addLayer(OlUtil.createKMLLayer(layer));
    },

    addGeoJson: function(layer) {
        MapManager.getActiveMapObject().addLayer(OlUtil.createGeoJSONLayer(layer));
    },

    addVectorLayer: function(layerId, options) {
        throw new Error('Method not currently supported for OL3');
    }
};

module.exports = adapter;
