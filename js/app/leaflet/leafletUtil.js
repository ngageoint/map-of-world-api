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

var Constants = require('../core/const');
var MapManager = require('../core/mapManager');
var LConst = require('./leafletConst');
var ObjectValidator = require('../core/objectValidator');
var L = require('leaflet');
require('../../assets/leaflet.esrirest/TileLayer.EsriRest');
var EventManager = require('../core/EventManager');

var _eventManager = new EventManager();

//There is a known bug in Leaflet - when loading the script dynamically, the wrong relative path for images is found
//since the regular expression just searches for any file name starting with leaflet - instead, set the default image path below:
//L.Icon.Default.imagePath = window.location.href.split(/\w*.html/)[0] + 'js/lib/leaflet/dist/images';

function _instantiateClusterLayer() {
    var clusterLayer = new L.FeatureGroup().on('click', function(e) {
        //TODO: wrap objects with feature id? any other way to grab it?
        _eventManager.handleClickEvent(e.feature.attributes.featureId);
    });

    return clusterLayer;
}

function _constructOSMLayer() {
    return new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 2
    });
}

function _constructArcGIS93RestLayer(layer) {
    if (layer.getLayers() === undefined) {
        return new L.TileLayer.EsriRest(layer.getUrl(), {layers: '0'});
    } else {
        return new L.TileLayer.EsriRest(layer.getUrl(), {layers: layer.getLayers()});
    }
}

var util = {

    createMap: function(divId, callback, layer) {

        var CustomMap = L.Map.extend({
            allFeatures: {},       //Store map of features to allow removal by name
            allControls: {},       //Store map of controls to allow removal by name
            layers: {}             //Store layers as groups to allow for layer operations (opacity changes/etc.)
        });

        var options = {
            center: [0, 0],
            zoom: 3,
            zoomControl: false
        };

        var map = new CustomMap(divId, options);

        var baseLayer;
        if (layer === undefined) {
            baseLayer = _constructOSMLayer();
        }
        else {
            if (ObjectValidator.isArcGISCacheLayer(layer)) {
                throw new Error('API does not currently support ArcGISCache base layer for Leaflet.');
                // TODO implement
            }
            if (ObjectValidator.isWmtsLayer()) {
                throw new Error('API does not currently support WMTS base layer for Leaflet.');
                // TODO implement
            }
            if (ObjectValidator.isWmsLayer()) {
                throw new Error('API does not currently support WMS base layer for Leaflet.');
                // TODO implement
            }
            baseLayer = _constructArcGIS93RestLayer(layer);
        }

        map.layers[LConst.layerName.BASE] = baseLayer;
        map.addLayer(baseLayer);

        //Add Vector Layer
        var vectorLayer = new L.FeatureGroup();
        map.layers[LConst.layerName.VECTOR] = vectorLayer;
        //Add Cluster/Markers/Points Layer with click eventing
        var clusterLayer = new L.FeatureGroup().on('click', function(f) {
            _eventManager.handleClickEvent(f.layer.attributes.id);
        });
        map.layers[LConst.layerName.CLUSTER] = clusterLayer;

        if (callback !== undefined) {
            map.whenReady(callback);
        }

        map.addLayer(vectorLayer);
        map.addLayer(clusterLayer);

        // Add zoom control by default to match OL behavior
        var zControl = new L.control.zoom();
        map.allControls[LConst.controlName.ZOOM] = zControl;
        map.addControl(zControl);

        // zoom map all the way out by default
        map.setZoom(map.getMinZoom());

        MapManager.registerMapInstance(divId, Constants.mapType.LEAFLET, map);
        MapManager.setActiveMap(divId);

    },

    createLatLng: function(coordinate) {
        return new L.LatLng(coordinate.getLatitude(), coordinate.getLongitude());
    },

    createEventingCircleMarker: function(featureId, latlng) {
        var CustomCircleMarker = L.CircleMarker.extend({
            attributes: {
                id: featureId
            }});

        var point = new CustomCircleMarker(latlng);
        point.setRadius(LConst.pointStyle.RADIUS);
        return point;
    },

    createEventingMarker: function(featureId, latlng, image) {
        var CustomMarker = L.Marker.extend({
            attributes: {
                id: featureId
            }});

        var featureIcon = L.icon({iconUrl: image.getUrl()});
        return new CustomMarker(latlng, {icon: featureIcon});
    },

    getEventManager: function() {
        return _eventManager;
    }
};

module.exports = util;
