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
var V = require('../../../../node_modules/validator/validator.min');

/**
 * @module WMSLayer
 */

/**
 * @param id
 * @param url
 * @param layers
 * @constructor
 * @alias module:WMSLayer
 */
function WMSLayer(id, url, layers) {

    // ensure that the callee has invoked our constructor function with the 'new' keyword
    if (!(this instanceof WMSLayer)) {
        throw new TypeError('WMSLayer constructor cannot be called as a function.');
    }

    // verify parameter types
    if (!_.isString(id) || !_.isString(url) || !_.isArray(layers)) {
        throw new TypeError('Cannot construct WMSLayer due to incorrect parameter type(s).  Please reference API documentation.');
    }

    // verify parameter values
    if (_.isEmpty(id) || _.isEmpty(url) || !V.isURL(url) || _.isEmpty(layers)) {
        throw new Error('Cannot construct WMSLayer due to empty required parameter.  Please reference API documentation.');
    }

    _.forEach(layers, function(layer) {
        if (!_.isString(layer) || _.isEmpty(layer)) {
            throw new Error('Cannot construct WMSLayer.  Each layer must be a non-empty string.');
        }
    });

    this.id = id;
    this.url = url;
    this.layers = layers;
    this.isTransparent = true;
}

/**
 * @return {string}
 * @memberOf module:WMSLayer
 */
WMSLayer.prototype.getId = function() {
    return this.id;
};

/**
 * @return {string}
 * @memberOf module:WMSLayer
 */
WMSLayer.prototype.getUrl = function() {
    return this.url;
};

WMSLayer.prototype.getLayers = function() {
    return this.layers;
};

/**
 * @return {boolean}
 * @memberOf module:WMSLayer
 */
WMSLayer.prototype.getIsTransparent = function() {
    return this.isTransparent;
};

/**
 * @param {boolean} isTransparent
 * @memberOf module:WMSLayer
 */
WMSLayer.prototype.setIsTransparent = function(isTransparent) {
    if (!_.isBoolean(isTransparent)) {
        throw new Error('Cannot set transparency.  Parameter must be a boolean value.');
    }
    this.isTransparent = isTransparent;
};

/**
 * @return {Array}
 * @memberOf module:WMSLayer
 */
WMSLayer.prototype.getStyles = function() {
    return this.styles;
};

/**
 * @param {Array} styles
 * @memberOf module:WMSLayer
 */
WMSLayer.prototype.setStyles = function(styles) {
    if (!_.isArray(styles) || _.isEmpty(styles)) {
        throw new Error('Cannot set styles.  Parameter must be a non-empty array.');
    }
    _.forEach(styles, function(style) {
        if (!_.isString(style) || _.isEmpty(style)) {
            throw new Error('Cannot set styles.  Each style must be a non-empty string.');
        }
    });
    this.styles = styles;
};

/**
 * @return {Array}
 * @memberOf module:WMSLayer
 */
WMSLayer.prototype.getFormat = function() {
    return this.format;
};

/**
 * @param {Array} format
 * @memberOf module:WMSLayer
 */
WMSLayer.prototype.setFormat = function(format) {
    if (!_.isString(format) || _.isEmpty(format)) {
        throw new Error('Cannot set format.  Parameter must be a string value.');
    }
    this.format = format;
};

/**
 * @return {number}
 * @memberOf module:WMSLayer
 */
WMSLayer.prototype.getNumZoomLevels = function() {
    return this.numZoomLevels;
};

/**
 * @param {number} numZoomLevels
 * @memberOf module:WMSLayer
 */
WMSLayer.prototype.setNumZoomLevels = function(numZoomLevels) {
    if (!_.isNumber(numZoomLevels)) {
        throw new Error('Cannot set numZoomLevels.  Parameter must be a number.');
    }
    this.numZoomLevels = numZoomLevels;
};

// For documentation on WMS GetMap Request Parameters, see:
// http://webhelp.esri.com/arcgisserver/9.3/java/index.htm#wms_service_in_a_browser.htm
// http://docs.geoserver.org/stable/en/user/services/wms/reference.html

module.exports = WMSLayer;
