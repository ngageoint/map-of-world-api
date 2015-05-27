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
 * @module Coordinate
 */

/**
 * @param latitude
 * @param longitude
 * @constructor
 * @alias module:Coordinate
 */
function Coordinate(latitude, longitude) {

    // ensure the callee invoked the constructor function using 'new'
    if (!(this instanceof Coordinate)) {
        throw new TypeError('Coordinate constructor cannot be called as a function.');
    }

    // verify parameter types
    if (!_.isNumber(latitude) || !_.isNumber(longitude)) {
        throw new TypeError('Cannot construct Coordinate due to incorrect parameter type(s).  Please reference API documentation.');
    }

    // verify parameter values
    if ((latitude < -90) || (latitude > 90) || (longitude < -180) || (longitude > 180)) {
        throw new RangeError('Cannot construct Coordinate object due to bad input values.  Latitude ranges from -90 to 90 and Longitude ranges from -180 to 180!');
    }

    this._lat = latitude;
    this._lng = longitude;
}

/**
 * Returns the Latitude
 *
 * @return {number}
 * @memberOf module:Coordinate
 */
Coordinate.prototype.getLatitude = function() {
    return this._lat;
};

/**
 * Returns the Longitude
 *
 * @return {number}
 * @memberOf module:Coordinate
 */
Coordinate.prototype.getLongitude = function() {
    return this._lng;
};

module.exports = Coordinate;
