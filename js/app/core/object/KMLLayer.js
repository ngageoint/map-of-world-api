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

/**
 * @module KMLLayer
 */

/**
 * @param id
 * @param path
 * @constructor
 * @alias module:KMLLayer
 */
function KMLLayer(id, path) {

    // ensure that the callee has invoked our constructor function with the 'new' keyword
    if (!(this instanceof KMLLayer)) {
        throw new TypeError('KMLLayer constructor cannot be called as a function.');
    }

    // verify parameter types
    if (!_.isString(id) || !_.isString(path)) {
        throw new TypeError('Cannot construct KMLLayer due to incorrect parameter type(s).  Please reference API documentation.');
    }

    // verify parameter values
    if (_.isEmpty(id) || _.isEmpty(path)) {
        throw new Error('Cannot construct KMLLayer due to empty required parameter.  Please reference API documentation.');
    }

    this.id = id;
    this.path = path;
}

/**
 * @return {string}
 * @memberOf module:KMLLayer
 */
KMLLayer.prototype.getId = function() {
    return this.id;
};

/**
 * @return {string}
 * @memberOf module:KMLLayer
 */
KMLLayer.prototype.getPath = function() {
    return this.path;
};

module.exports = KMLLayer;
