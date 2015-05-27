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
 * @module ArcGISCacheLayer
 */

/**
 * @param url
 * @constructor
 * @alias module:ArcGISCacheLayer
 */
function ArcGISCacheLayer(url) {

    // ensure the callee invoked the constructor function using 'new'
    if (!(this instanceof ArcGISCacheLayer)) {
        throw new TypeError('ArcGISCacheLayer constructor cannot be called as a function.');
    }

    // verify parameter types
    if (!_.isString(url)) {
        throw new TypeError('Cannot construct ArcGISCacheLayer due to incorrect parameter type(s).  Please reference API documentation.');
    }

    // verify parameter values
    if (_.isEmpty(url) || !V.isURL(url)) {
        throw new Error('Cannot construct ArcGISCacheLayer due to bad parameter value(s).  Please reference API documentation.');
    }

    this._url = url;
}

/**
 * Return the Layer's URL
 *
 * @return {string}
 * @memberOf module:ArcGISCacheLayer
 */
ArcGISCacheLayer.prototype.getUrl = function() {
    return this._url;
};

/**
 * Get the Layers
 *
 * @return {Array}
 * @memberOf module:ArcGISCacheLayer
 */
ArcGISCacheLayer.prototype.getLayers = function() {
    return this._layers;
};

/**
 * Set the Layers
 *
 * @param {Array} layers
 * @memberOf module:ArcGISCacheLayer
 */
ArcGISCacheLayer.prototype.setLayers = function(layers) {
    if (!_.isArray(layers) || _.isEmpty(layers)) {
        throw new Error('layers must be a non-empty Array');
    }
    _.forEach(layers, function(layer) {
        if (!_.isString(layer) || _.isEmpty(layer)) {
            throw new Error('each layer must be a non-empty string');
        }
    });
    this._layers = layers;
};

/**
 * @return {number}
 * @memberOf module:ArcGISCacheLayer
 */
ArcGISCacheLayer.prototype.getNumZoomLevels = function() {
    return this.numZoomLevels;
};

/**
 * @param {number} numZoomLevels
 * @memberOf module:ArcGISCacheLayer
 */
ArcGISCacheLayer.prototype.setNumZoomLevels = function(numZoomLevels) {
    if (!_.isNumber(numZoomLevels)) {
        throw new Error('Cannot set numZoomLevels.  Parameter must be a number.');
    }
    this.numZoomLevels = numZoomLevels;
};

module.exports = ArcGISCacheLayer;
