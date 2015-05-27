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
var Constants = require('./const');
var MapManager = require('./mapManager');
var ObjectValidator = require('./objectValidator');
var AdapterManager = require('./adapterManager');

/**
 * @namespace mapapi
 */
var facade = {

    /**
     * Creates a new map instance
     *
     * @method
     * @memberOf mapapi
     * @param {string} divId        - the DIV to bind the map to
     * @param {string} mapType      - the type of the map @see mapapi.constant.mapType
     * @param {Function} [callback] - optional callback function to be called once the base layer has loaded
     * @param {Object} [baseLayer]  - optional baseLayer, defaults to OpenStreetMaps
     * @return {undefined}
     */
    createMap: function(divId, mapType, callback, baseLayer) {
        var valid = (arguments.length >= 2) && (arguments.length <= 4) &&
            _.isString(divId) && !_.isEmpty(divId) &&
            _.isString(mapType) && !_.isEmpty(mapType) &&
            (_.isUndefined(callback) || _.isFunction(callback)) &&
            (
                // API supports base layers of type: WMS, WMTS, KML, GeoJSON, ArcGIS93Rest, ArcGISCache
                _.isUndefined(baseLayer) ||
                ObjectValidator.isArcGIS93RestLayer(baseLayer) ||
                ObjectValidator.isArcGISCacheLayer(baseLayer) ||
                ObjectValidator.isWmtsLayer(baseLayer) ||
                ObjectValidator.isWmsLayer(baseLayer) ||
                ObjectValidator.isKMLLayer(baseLayer) ||
                ObjectValidator.isGeoJsonLayer(baseLayer)
            );
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(mapType).createMapObject(divId, callback, baseLayer);
    },

    /**
     * Destroys the given map
     *
     * @method
     * @memberOf mapapi
     * @param {string} divId - the ID of the map to destroy
     * @return {undefined}
     */
    destroyMap: function(divId) {
        var valid = (arguments.length == 1) && _.isString(divId) && !_.isEmpty(divId);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        MapManager.setActiveMap(divId);
        AdapterManager.getAdapter(MapManager.getActiveMapType()).destroyMap();
        MapManager.unregisterMapInstance(divId);
    },

    /**
     * Resets the given map
     *
     * @method
     * @memberOf mapapi
     * @param {string} divId - the ID of the map to reset
     * @return {undefined}
     */
    resetMap: function(divId) {
        var valid = (arguments.length == 1) && _.isString(divId) && !_.isEmpty(divId);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        var mapType = MapManager.getMapType(divId);
        this.destroyMap(divId);
        this.createMap(divId, mapType);
        // FIXME handle callback if one was originally supplied to createMap()
        // FIXME handle baselayer if one was originally supplied to createMap()
    },

    /**
     * toggles the active map to the map currently bound to divId
     * API methods operate on the currently active map
     *
     * @method
     * @memberOf mapapi
     * @param {string} divId - the ID of the DIV the map is bound to
     * @return {undefined}
     */
    setActiveMap: function(divId) {
        var valid = (arguments.length == 1) && _.isString(divId) && !_.isEmpty(divId);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        MapManager.setActiveMap(divId);
    },

    /**
     * updates the size of the map after the
     * containing DIV has been resized
     *
     * @method
     * @memberOf mapapi
     * @param {string} [divId]  - optional divId, uses currently active map if not supplied
     * @return {undefined}
     */
    updateSize: function(divId) {
        var valid = (arguments.length === 0) || ((arguments.length == 1) && _.isString(divId) && !_.isEmpty(divId));
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        if (divId) MapManager.setActiveMap(divId);
        AdapterManager.getAdapter(MapManager.getActiveMapType()).updateSize();
    },

    /**
     * removes all features from the active map
     *
     * @method
     * @memberOf mapapi
     * @return {undefined}
     */
    clearAllFeatures: function() {
        AdapterManager.getAdapter(MapManager.getActiveMapType()).clearAllFeatures();
    },

    /**
     * zooms the map in by one level
     *
     * @method
     * @memberOf mapapi
     * @return {undefined}
     */
    zoomIn: function() {
        AdapterManager.getAdapter(MapManager.getActiveMapType()).zoomIn();
    },

    /**
     * zooms the map out by one level
     *
     * @method
     * @memberOf mapapi
     * @return {undefined}
     */
    zoomOut: function() {
        AdapterManager.getAdapter(MapManager.getActiveMapType()).zoomOut();
    },

    /**
     * gets the current zoom level of the map
     *
     * @method
     * @memberOf mapapi
     * @return {number} - the current zoom level of the map
     */
    getZoom: function() {
        return AdapterManager.getAdapter(MapManager.getActiveMapType()).getZoom();
    },

    /**
     * sets the current zoom level of the map
     *
     * @method
     * @memberOf mapapi
     * @param {number} zoomVal - the new zoom level of the map
     * @return {undefined}
     */
    setZoom: function(zoomVal) {
        var valid = (arguments.length == 1) && _.isNumber(zoomVal);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).setZoom(zoomVal);
    },

    /**
     * zoom to the full extent and recenter
     *
     * @method
     * @memberOf mapapi
     * @return {undefined}
     */
    zoomToMaxExtent: function() {
        AdapterManager.getAdapter(MapManager.getActiveMapType()).zoomToMaxExtent();
    },

    /**
     * Calculates the bounding box of all feature data
     * for the given layer and zooms accordingly
     *
     * @method
     * @memberOf mapapi
     * @param {string}  - the ID of the layer
     * @return {undefined}
     */
    zoomToData: function(layerId) {
        var valid = (arguments.length == 1) && _.isString(layerId) && !_.isEmpty(layerId);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).zoomToData(layerId);
    },

    /**
     * Returns the center of the map view
     *
     * @method
     * @memberOf mapapi
     * @return {Object} - the center {@link module:Coordinate|Coordinate}
     */
    getCenter: function() {
        return AdapterManager.getAdapter(MapManager.getActiveMapType()).getCenter();
    },

    /**
     * Sets the center of the map view
     *
     * @method
     * @memberOf mapapi
     * @param {Object} coordinate   - the desired center {@link module:Coordinate|Coordinate}
     * @return {undefined}
     */
    setCenter: function(coordinate) {
        var valid = (arguments.length == 1) && ObjectValidator.isCoordinate(coordinate);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).setCenter(coordinate);
    },

    /**
     * adds a point to the map
     * if an Image object is supplied, the image is used in lieu of the default point icon
     *
     * @method
     * @memberOf mapapi
     * @param {string} featureId    - the ID of the point
     * @param {string} layerId      - the ID of the layer
     * @param {Object} coordinate   - a {@link module:Coordinate|Coordinate} object
     * @param {Object} [image]      - an optional {@link module:Image|Image} object
     * @return {undefined}
     */
    addPoint: function(featureId, layerId, coordinate, image) {
        var valid = (arguments.length >= 3) && (arguments.length <= 4) &&
            _.isString(featureId) && !_.isEmpty(featureId) &&
            _.isString(layerId) && !_.isEmpty(layerId) &&
            ObjectValidator.isCoordinate(coordinate) &&
            (_.isUndefined(image) || (ObjectValidator.isImage(image)));
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).addPoint(featureId, layerId, coordinate, image);
    },

    /**
     * removes a point from the map
     *
     * @method
     * @memberOf mapapi
     * @param {string} featureId - the ID of the point to remove
     * @return {undefined}
     */
    removePoint: function(featureId) {
        var valid = (arguments.length == 1) && _.isString(featureId) && !_.isEmpty(featureId);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).removePoint(featureId);
    },

    /**
     * adds a polygon to the map
     *
     * @method
     * @memberOf mapapi
     * @param {string} featureId    - the ID of the polygon
     * @param {string} layerId      - the ID of the layer to add the polygon to
     * @param {Array} coordinates   - a {@link module:Coordinate|Coordinate} Array
     */
    addPolygon: function(featureId, layerId, coordinates) {
        var valid = (arguments.length == 3) &&
            _.isString(featureId) && !_.isEmpty(featureId) &&
            _.isString(layerId) && !_.isEmpty(layerId) &&
            _.isArray(coordinates);
        var allCoordinatesValid = true;
        _.forEach(coordinates, function(coordinate) {
            if (!ObjectValidator.isCoordinate(coordinate)) {
                allCoordinatesValid = false;
            }
        });
        if (!valid || !allCoordinatesValid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).addPolygon(featureId, layerId, coordinates);
    },

    /**
     * removes a polygon from the map
     *
     * @method
     * @memberOf mapapi
     * @param {string} featureId - the ID of the polygon to remove
     * @return {undefined}
     */
    removePolygon: function(featureId) {
        var valid = (arguments.length == 1) && _.isString(featureId) && !_.isEmpty(featureId);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).removePolygon(featureId);
    },

    /**
     * adds a line to the map
     *
     * @method
     * @memberOf mapapi
     * @param {string} featureId    - the ID of the line
     * @param {string} layerId      - the ID of the layer to add the polygon to
     * @param {Array} coordinates   - a {@link module:Coordinate|Coordinate} Array
     */
    addLine: function(featureId, layerId, coordinates) {
        var valid = (arguments.length == 3) &&
            _.isString(featureId) && !_.isEmpty(featureId) &&
            _.isString(layerId) && !_.isEmpty(layerId) &&
            _.isArray(coordinates);
        var allCoordinatesValid = true;
        _.forEach(coordinates, function(coordinate) {
            if (!ObjectValidator.isCoordinate(coordinate)) {
                allCoordinatesValid = false;
            }
        });
        if (!valid || !allCoordinatesValid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).addLine(featureId, layerId, coordinates);
    },

    /**
     * removes a line from the map
     *
     * @method
     * @memberOf mapapi
     * @param {string} featureId - the ID of the line to remove
     * @return {undefined}
     */
    removeLine: function(featureId) {
        var valid = (arguments.length == 1) && _.isString(featureId) && !_.isEmpty(featureId);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).removeLine(featureId);
    },

    /**
     * adds a multipoint to the map
     *
     * @method
     * @memberOf mapapi
     * @param {string} featureId    - the ID of the multipoint
     * @param {string} layerId      - the ID of the layer
     * @param {Array} coordinates   - a {@link module:Coordinate|Coordinate} Array
     */
    addMultipoint: function(featureId, layerId, coordinates) {
        var valid = (arguments.length == 3) &&
            _.isString(featureId) && !_.isEmpty(featureId) &&
            _.isString(layerId) && !_.isEmpty(layerId) &&
            _.isArray(coordinates);
        var allCoordinatesValid = true;
        _.forEach(coordinates, function(coordinate) {
            if (!ObjectValidator.isCoordinate(coordinate)) {
                allCoordinatesValid = false;
            }
        });
        if (!valid || !allCoordinatesValid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).addMultipoint(featureId, layerId, coordinates);
    },

    /**
     * removes a multipoint from the map
     *
     * @method
     * @memberOf mapapi
     * @param {string} featureId - the ID of the multipoint to remove
     * @return {undefined}
     */
    removeMultipoint: function(featureId) {
        var valid = (arguments.length == 1) && _.isString(featureId) && !_.isEmpty(featureId);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).removeMultipoint(featureId);
    },

    /**
     * returns the feature(s) associated with featureId
     *
     * @method
     * @memberOf mapapi
     * @param {string} featureId    - the ID of the feature
     * @return {array}             - the feature(s)
     */
    getFeatures: function(featureId) {
        var valid = (arguments.length == 1) && _.isString(featureId) && !_.isEmpty(featureId);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        return AdapterManager.getAdapter(MapManager.getActiveMapType()).getFeatures(featureId);
    },

    /**
     * register a listener function to be called when points/markers are clicked
     *
     * @method
     * @memberOf mapapi
     * @param {string} functionId       - an ID to associate with the click listener
     * @param {Function} clickHandler   - the Function to be called when a Point/Marker is clicked
     * @return {undefined}
     */
    registerClickListener: function(functionId, clickHandler) {
        var valid = (arguments.length == 2) &&
            _.isString(functionId) && !_.isEmpty(functionId) &&
            _.isFunction(clickHandler);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).registerClickListener(functionId, clickHandler);
    },

    /**
     * Un-subscribe an existing click listener function
     *
     * @method
     * @memberOf mapapi
     * @param {string} functionId - the ID of the existing click listener function
     * @return {undefined}
     */
    unregisterClickListener: function(functionId) {
        var valid = (arguments.length == 1) && _.isString(functionId) && !_.isEmpty(functionId);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).unregisterClickListener(functionId);
    },

    /**
     * register a listener function to be called when points/markers are hovered
     *
     * @method
     * @memberOf mapapi
     * @param {string} functionId       - an ID to associate with the hover listener
     * @param {Function} hoverHandler   - the Function to be called when a Point/Marker is hovered
     * @return {undefined}
     */
    registerHoverListener: function(functionId, hoverHandler) {
        var valid = (arguments.length == 2) &&
            _.isString(functionId) && !_.isEmpty(functionId) &&
            _.isFunction(hoverHandler);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).registerHoverListener(functionId, hoverHandler);
    },

    /**
     * Un-subscribe an existing hover listener function
     *
     * @method
     * @memberOf mapapi
     * @param {string} functionId - the ID of the existing hover listener function
     * @return {undefined}
     */
    unregisterHoverListener: function(functionId) {
        var valid = (arguments.length == 1) && _.isString(functionId) && !_.isEmpty(functionId);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).unregisterHoverListener(functionId);
    },

    /**
     * register a listener function to be called when the map is moved
     *
     * @method
     * @memberOf mapapi
     * @param {string} functionId  - an ID to associate with the listener
     * @param {Function} handler   - the Function to be called when the map is moved
     * @return {undefined}
     */
    registerMapMoveListener: function(functionId, handler) {
        var valid = (arguments.length == 2) &&
            _.isString(functionId) && !_.isEmpty(functionId) &&
            _.isFunction(handler);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).registerMapMoveListener(functionId, handler);
    },

    /**
     * Un-subscribe an existing listener function
     *
     * @method
     * @memberOf mapapi
     * @param {string} functionId - the ID of the existing listener function
     * @return {undefined}
     */
    unregisterMapMoveListener: function(functionId) {
        var valid = (arguments.length == 1) && _.isString(functionId) && !_.isEmpty(functionId);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).unregisterMapMoveListener(functionId);
    },

    /**
     * register a listener function to be called when the map is zoomed
     *
     * @method
     * @memberOf mapapi
     * @param {string} functionId  - an ID to associate with the listener
     * @param {Function} handler   - the Function to be called when the map is zoomed
     * @return {undefined}
     */
    registerZoomEndListener: function(functionId, handler) {
        var valid = (arguments.length == 2) &&
            _.isString(functionId) && !_.isEmpty(functionId) &&
            _.isFunction(handler);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).registerZoomEndListener(functionId, handler);
    },

    /**
     * Un-subscribe an existing listener function
     *
     * @method
     * @memberOf mapapi
     * @param {string} functionId - the ID of the existing listener function
     * @return {undefined}
     */
    unregisterZoomEndListener: function(functionId) {
        var valid = (arguments.length == 1) && _.isString(functionId) && !_.isEmpty(functionId);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).unregisterZoomEndListener(functionId);
    },

    /**
     * register a listener function to be called when the mouse un-hovers a feature
     *
     * @method
     * @memberOf mapapi
     * @param {string} functionId  - an ID to associate with the listener
     * @param {Function} handler   - the Function to be called
     * @return {undefined}
     */
    registerOutListener: function(functionId, handler) {
        var valid = (arguments.length == 2) &&
            _.isString(functionId) && !_.isEmpty(functionId) &&
            _.isFunction(handler);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).registerOutListener(functionId, handler);
    },

    /**
     * Un-subscribe an existing listener function
     *
     * @method
     * @memberOf mapapi
     * @param {string} functionId - the ID of the existing listener function
     * @return {undefined}
     */
    unregisterOutListener: function(functionId) {
        var valid = (arguments.length == 1) && _.isString(functionId) && !_.isEmpty(functionId);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).unregisterOutListener(functionId);
    },

    /**
     * Set an existing layer as the map base layer
     *
     * @method
     * @memberOf mapapi
     * @param {string} layerId  - the ID of the existing layer to set as the base layer
     * @return {undefined}
     */
    setBaseLayer: function(layerId) {
        var valid = (arguments.length == 1) && _.isString(layerId) && !_.isEmpty(layerId);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).setBaseLayer(layerId);
    },

    /**
     * Adds a WMS layer to the map
     *
     * @method
     * @memberOf mapapi
     * @param {object} layer - the {@link module:WMSLayer|WMSLayer} to add to the map
     * @return {undefined}
     */
    addWmsLayer: function(layer) {
        var valid = (arguments.length == 1) && ObjectValidator.isWmsLayer(layer);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).addWmsLayer(layer);
    },

    /**
     * Adds a WMTS layer to the map
     *
     * @method
     * @memberOf mapapi
     * @param {object} layer - the {@link module:WMTSLayer|WMTSLayer} to add to the map
     * @return {undefined}
     */
    addWmtsLayer: function(layer) {
        var valid = (arguments.length == 1) && ObjectValidator.isWmtsLayer(layer);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).addWmtsLayer(layer);
    },

    /**
     * Removes a layer from the map
     *
     * @method
     * @memberOf mapapi
     * @param {string} layerId - the ID of the Layer to remove
     * @return {undefined}
     */
    removeLayer: function(layerId) {
        var valid = (arguments.length == 1) && _.isString(layerId) && !_.isEmpty(layerId);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).removeLayer(layerId);
    },

    /**
     * Toggles the visibility (visible vs. hidden) of a Layer
     *
     * @method
     * @memberOf mapapi
     * @param {string} layerId - the ID of the Layer to toggle
     * @return {undefined}
     */
    toggleLayer: function(layerId) {
        var valid = (arguments.length == 1) && _.isString(layerId) && !_.isEmpty(layerId);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).toggleLayer(layerId);
    },

    /**
     * Gets the order of a Layer
     * Note: API functionality only supports the retrieval of user-created layer orders
     *
     * @method
     * @memberOf mapapi
     * @param {string} layerId - the ID of the Layer whose order will be returned
     * @return {number}
     */
    getLayerOrder: function(layerId) {
        var valid = (arguments.length == 1) && _.isString(layerId) && !_.isEmpty(layerId);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        return AdapterManager.getAdapter(MapManager.getActiveMapType()).getLayerOrder(layerId);
    },

    /**
     * Sets the order of a Layer
     * Note: API functionality only supports the ordering of user created layers
     *
     * @method
     * @memberOf mapapi
     * @param {string} layerId  - the ID of the Layer whose order will be set
     * @param {number} zOrder   - the order to set for the referenced Layer
     * @return {undefined}
     */
    setLayerOrder: function(layerId, zOrder) {
        var valid = (arguments.length == 2) && _.isString(layerId) && !_.isEmpty(layerId) && _.isNumber(zOrder);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).setLayerOrder(layerId, zOrder);
    },

    /**
     * Gets the opacity of a Layer
     * Note: API functionality only supports the retrieval of user-created layer opacity
     *
     * @method
     * @memberOf mapapi
     * @param {string} layerId - the ID of the Layer whose opacity will be returned
     * @return {number}
     */
    getLayerOpacity: function(layerId) {
        var valid = (arguments.length == 1) && _.isString(layerId) && !_.isEmpty(layerId);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        return AdapterManager.getAdapter(MapManager.getActiveMapType()).getLayerOpacity(layerId);
    },

    /**
     * Sets the opacity of a Layer
     * Note: API functionality only supports the setting of opacity for user created layers
     *
     * @method
     * @memberOf mapapi
     * @param {string} layerId - the ID of the Layer whose opacity will be set
     * @param {number} opacity - the opacity to set for the referenced Layer
     * @return {undefined}
     */
    setLayerOpacity: function(layerId, opacity) {
        var valid = (arguments.length == 2) && _.isString(layerId) && !_.isEmpty(layerId) && _.isNumber(opacity);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).setLayerOpacity(layerId, opacity);
    },

    /**
     * Returns the layer object associated with the given ID
     *
     * @method
     * @memberOf mapapi
     * @param {string} layerId  - the ID of the layer
     * @return {object}         - the layer
     */
    getLayer: function(layerId) {
        var valid = (arguments.length == 1) && _.isString(layerId) && !_.isEmpty(layerId);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        return AdapterManager.getAdapter(MapManager.getActiveMapType()).getLayer(layerId);
    },

    /**
     * toggles the user interface zoom control (visible vs. hidden)
     *
     * @method
     * @memberOf mapapi
     * @return {undefined}
     */
    toggleZoomControl: function() {
        AdapterManager.getAdapter(MapManager.getActiveMapType()).toggleZoom();
    },

    /**
     * toggles the user interface scale control (visible vs. hidden)
     *
     * @method
     * @memberOf mapapi
     * @return {undefined}
     */
    toggleScaleControl: function() {
        AdapterManager.getAdapter(MapManager.getActiveMapType()).toggleScale();
    },

    /**
     * toggles the user interface coordinates control (visible vs. hidden)
     *
     * @method
     * @memberOf mapapi
     * @return {undefined}
     */
    toggleCoordinatesControl: function() {
        AdapterManager.getAdapter(MapManager.getActiveMapType()).toggleCoordinates();
    },

    /**
     * toggles the user interface graticule control (visible vs. hidden)
     *
     * @method
     * @memberOf mapapi
     * @return {undefined}
     */
    toggleGraticuleControl: function() {
        AdapterManager.getAdapter(MapManager.getActiveMapType()).toggleGraticule();
    },

    /**
     * returns the implementation-specific (native) active map object
     * to serve as a "backdoor"
     * allows developers to leverage API while simultaneously providing
     * the ability to fill in gaps in functionality that the API does
     * not currently provide
     *
     * @method
     * @memberOf mapapi
     * @return {undefined}
     */
    getActiveMapObject: function() {
        return MapManager.getActiveMapObject();
    },

    /**
     * Adds a locally hosted KML file to the map as a vector layer
     *
     * @method
     * @memberOf mapapi
     * @param {object} layer - the {@link module:KMLLayer|KMLLayer} to add to the map
     * @return {undefined}
     */
    addKml: function(layer) {
        var valid = (arguments.length == 1) && ObjectValidator.isKMLLayer(layer);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).addKml(layer);
    },

    /**
     * Adds a locally hosted GeoJSON file to the map as a vector layer
     *
     * @method
     * @memberOf mapapi
     * @param {string} layer - the relative path of the GeoJSON file (hosted locally)
     * @return {undefined}
     */
    addGeoJson: function(layer) {
        var valid = (arguments.length == 1) && ObjectValidator.isGeoJsonLayer(layer);
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).addGeoJson(layer);
    },

    /**
     * Adds a vector layer to the map

     * @method
     * @memberOf mapapi
     * @param {string} layerId      - the unique name of the layer
     * @param {object} [options]    - optional object encapsulating various advanced options, such as layer styles and cluster strategy
     * @return {undefined}
     */
    addVectorLayer: function(layerId, options) {
        var valid = (arguments.length >= 1) && (arguments.length <= 2) &&
                    _.isString(layerId) && !_.isEmpty(layerId) &&
                    (_.isUndefined(options) || _.isObject(options));
        if (!valid) { throw new Error('Invalid parameters: please reference API documentation for correct usage'); }
        AdapterManager.getAdapter(MapManager.getActiveMapType()).addVectorLayer(layerId, options);
    }

};

module.exports = facade;
