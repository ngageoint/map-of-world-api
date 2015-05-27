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
 * @module Image
 */

/**
 * @param url
 * @param width
 * @param height
 * @constructor
 * @alias module:Image
 */
function Image(url, width, height) {

    // ensure the callee invoked the constructor function using 'new'
    if (!(this instanceof Image)) {
        throw new TypeError('Image constructor cannot be called as a function.');
    }

    // verify parameter types
    if (!_.isString(url) || !_.isNumber(width) || !_.isNumber(height)) {
        throw new TypeError('Cannot construct Image due to incorrect parameter type(s).  Please reference API documentation.');
    }

    // verify parameter values
    if (_.isEmpty(url) || (width <= 0) || (height <= 0)) {
        throw new RangeError('Cannot construct Image due to bad parameter value(s).  Please reference API documentation.');
    }

    this._url = url;
    this._width = width;
    this._height = height;
}

/**
 * Returns the Image's URL
 *
 * @return {string}
 * @memberOf module:Image
 */
Image.prototype.getUrl = function() {
    return this._url;
};

/**
 * Returns the Image's width
 *
 * @return {number}
 * @memberOf module:Image
 */
Image.prototype.getWidth = function() {
    return this._width;
};

/**
 * Returns the Image's Height
 *
 * @return {number}
 * @memberOf module:Image
 */
Image.prototype.getHeight = function() {
    return this._height;
};

module.exports = Image;
