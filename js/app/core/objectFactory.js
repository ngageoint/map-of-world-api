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

var Coordinate = require('./object/Coordinate');
var Image = require('./object/Image');
var GeoJsonLayer = require('./object/GeoJsonLayer');
var KMLLayer = require('./object/KMLLayer');
var WMSLayer = require('./object/WMSLayer');
var WMTSLayer = require('./object/WMTSLayer');
var ArcGIS93RestLayer = require('./object/ArcGIS93RestLayer');
var ArcGISCacheLayer = require('./object/ArcGISCacheLayer');

/**
 * @namespace mapapi.factory
 */
var factory = {

    /**
     * Returns a {@link module:Coordinate|Coordinate}
     *
     * @method
     * @memberOf mapapi.factory
     * @param {number} latitude     - the latitude value
     * @param {number} longitude    - the longitude value
     * @returns {Object}            - {@link module:Coordinate|Coordinate}
     */
    coordinate: function(latitude, longitude) {
        return new Coordinate(latitude, longitude);
    },

    /**
     * Returns an {@link module:Image|Image}
     *
     * @method
     * @memberOf mapapi.factory
     * @param url               - the image URL
     * @param width             - the image width in pixels
     * @param height            - the image height in pixels
     * @returns {Object}        - {@link module:Image|Image}
     */
    image: function(url, width, height) {
        return new Image(url, width, height);
    },

    /**
     * Instantiates a {@link module:GeoJsonLayer|GeoJsonLayer}
     *
     * @method
     * @memberOf mapapi.factory
     * @param {string} id       - a unique key for the layer
     * @param {string} path     - the path to the GeoJson file
     * @return {Object}         - {@link module:GeoJsonLayer|GeoJsonLayer}
     */
    geoJsonLayer: function(id, path) {
        return new GeoJsonLayer(id, path);
    },

    /**
     * Instantiates a {@link module:KMLLayer|KMLLayer}
     *
     * @method
     * @memberOf mapapi.factory
     * @param {string} id       - a unique key for the layer
     * @param {string} path     - the path to the KML file
     * @return {Object}         - {@link module:KMLLayer|KMLLayer}
     */
    kmlLayer: function(id, path) {
        return new KMLLayer(id, path);
    },

    /**
     * Instantiates a {@link module:WMSLayer|WMSLayer}
     *
     * @method
     * @memberOf mapapi.factory
     * @param {string} id       - a unique key for the layer
     * @param {string} url      - the layer URL
     * @param {Array} layers    - an array of the layer names to add
     * @return {Object}         - {@link module:WMSLayer|WMSLayer}
     */
    wmsLayer: function(id, url, layers) {
        return new WMSLayer(id, url, layers);
    },

    /**
     * Instantiates a {@link module:WMTSLayer|WMTSLayer}
     *
     * @method
     * @memberOf mapapi.factory
     * @param {string} id           - a unique key for the layer
     * @param {string} url          - the layer URL
     * @param {string} layer        - the layer name
     * @param {string} matrixSet    - the matrix set
     * @param {string} style        - the style
     * @return {Object}             - {@link module:WMTSLayer|WMTSLayer}
     */
    wmtsLayer: function(id, url, layer, matrixSet, style) {
        return new WMTSLayer(id, url, layer, matrixSet, style);
    },

    /**
     * Instantiates a {@link module:ArcGIS93RestLayer|ArcGIS93RestLayer}
     *
     * @method
     * @memberOf mapapi.factory
     * @param {string} url      - the layer URL
     * @return {Object}         - {@link module:ArcGIS93RestLayer|ArcGIS93RestLayer}
     */
    arcGIS93RestLayer: function(url) {
        return new ArcGIS93RestLayer(url);
    },

    /**
     * Instantiates a {@link module:ArcGISCacheLayer|ArcGISCacheLayer}
     *
     * @method
     * @memberOf mapapi.factory
     * @param {string} url      - the layer URL
     * @return {Object}         - {@link module:ArcGISCacheLayer|ArcGISCacheLayer}
     */
    arcGISCacheLayer: function(url) {
        return new ArcGISCacheLayer(url);
    }

};

/**
 * This module exposes factory methods to instantiate
 * instances of Objects required by various API methods
 */
module.exports = factory;
