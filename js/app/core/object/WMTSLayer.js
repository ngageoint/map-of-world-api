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
 * @module WMTSLayer
 */

/**
 * @param id
 * @param url
 * @param layer
 * @param matrixSet
 * @param style
 * @constructor
 * @alias module:WMTSLayer
 */
function WMTSLayer(id, url, layer, matrixSet, style) {

    // ensure that the callee has invoked our constructor function with the 'new' keyword
    if (!(this instanceof WMTSLayer)) {
        throw new TypeError('WMTSLayer constructor cannot be called as a function.');
    }

    // verify parameter types
    if (!_.isString(id) || !_.isString(url) || !_.isString(layer) || !_.isString(matrixSet) || !_.isString(style)) {
        throw new TypeError('Cannot construct WMTSLayer due to incorrect parameter type(s).  Please reference API documentation.');
    }

    // verify parameter values
    if (_.isEmpty(id) || _.isEmpty(url) || !V.isURL(url) || _.isEmpty(layer) || _.isEmpty(matrixSet) || _.isEmpty(style)) {
        throw new Error('Cannot construct WMTSLayer due to empty required parameter.  Please reference API documentation.');
    }

    this.id = id;
    this.url = url;
    this.layer = layer;
    this.matrixSet = matrixSet;
    this.style = style;
}

/**
 * @return {string}
 * @memberOf module:WMTSLayer
 */
WMTSLayer.prototype.getId = function() {
    return this.id;
};

/**
 * @return {string}
 * @memberOf module:WMTSLayer
 */
WMTSLayer.prototype.getUrl = function() {
    return this.url;
};

/**
 * @return {string}
 * @memberOf module:WMTSLayer
 */
WMTSLayer.prototype.getLayer = function() {
    return this.layer;
};

/**
 * @return {string}
 * @memberOf module:WMTSLayer
 */
WMTSLayer.prototype.getMatrixSet = function() {
    return this.matrixSet;
};

/**
 * @return {string}
 * @memberOf module:WMTSLayer
 */
WMTSLayer.prototype.getStyle = function() {
    return this.style;
};

/**
 * @return {string}
 * @memberOf module:WMTSLayer
 */
WMTSLayer.prototype.getProjection = function() {
    return this.projection;
};

/**
 * @param {string} projection
 * @memberOf module:WMTSLayer
 */
WMTSLayer.prototype.setProjection = function(projection) {
    if (!_.isString(projection) || _.isEmpty(projection)) {
        throw new Error('Cannot set projection.  Parameter must be a string value.');
    }
    this.projection = projection;
};

/**
 * @return {string}
 * @memberOf module:WMTSLayer
 */
WMTSLayer.prototype.getFormat = function() {
    return this.format;
};

/**
 * @param {string} format
 * @memberOf module:WMTSLayer
 */
WMTSLayer.prototype.setFormat = function(format) {
    if (!_.isString(format) || _.isEmpty(format)) {
        throw new Error('Cannot set format.  Parameter must be a string value.');
    }
    this.format = format;
};

/**
 * @return {number}
 * @memberOf module:WMTSLayer
 */
WMTSLayer.prototype.getNumZoomLevels = function() {
    return this.numZoomLevels;
};

/**
 * @param {number} numZoomLevels
 * @memberOf module:WMTSLayer
 */
WMTSLayer.prototype.setNumZoomLevels = function(numZoomLevels) {
    if (!_.isNumber(numZoomLevels)) {
        throw new Error('Cannot set numZoomLevels.  Parameter must be a number.');
    }
    this.numZoomLevels = numZoomLevels;
};

/**
 * @return {number}
 * @memberOf module:WMTSLayer
 */
WMTSLayer.prototype.getMaxResolution = function() {
    return this.maxResolution;
};

/**
 * @param {number} maxResolution
 * @memberOf module:WMTSLayer
 */
WMTSLayer.prototype.setMaxResolution = function(maxResolution) {
    if (!_.isNumber(maxResolution)) {
        throw new Error('Cannot set maxResolution.  Parameter must be a number.');
    }
    this.maxResolution = maxResolution;
};

/**
 * @return {Array}
 * @memberOf module:WMTSLayer
 */
WMTSLayer.prototype.getMatrixIds = function() {
    return this.matrixIds;
};

/**
 * @param {Array} matrixIds
 * @memberOf module:WMTSLayer
 */
WMTSLayer.prototype.setMatrixIds = function(matrixIds) {
    if (!_.isArray(matrixIds) || _.isEmpty(matrixIds)) {
        throw new Error('Cannot set matrixIds.  Parameter must be a non-empty array.');
    }
    this.matrixIds = matrixIds;
};

// TODO matrixIds

module.exports = WMTSLayer;
