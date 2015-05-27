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

var objectValidator = {

    isCoordinate: function(coordinate) {
        return coordinate instanceof Coordinate.prototype.constructor;
    },

    isImage: function(image) {
        return image instanceof Image.prototype.constructor;
    },

    isGeoJsonLayer: function(geoJsonlayer) {
        return geoJsonlayer instanceof GeoJsonLayer.prototype.constructor;
    },

    isKMLLayer: function(kmlLayer) {
        return kmlLayer instanceof KMLLayer.prototype.constructor;
    },

    isWmsLayer: function(wmsLayer) {
        return wmsLayer instanceof WMSLayer.prototype.constructor;
    },

    isWmtsLayer: function(wmtsLayer) {
        return wmtsLayer instanceof WMTSLayer.prototype.constructor;
    },

    isArcGIS93RestLayer: function(layer) {
        return layer instanceof ArcGIS93RestLayer.prototype.constructor;
    },

    isArcGISCacheLayer: function(layer) {
        return layer instanceof ArcGISCacheLayer.prototype.constructor;
    }

};

module.exports = objectValidator;
