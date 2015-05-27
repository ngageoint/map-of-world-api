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

/**
 * @namespace mapapi.constant
 */
var constants = {

    /**
     * API-supported map types
     *
     * @memberOf mapapi.constant
     * @property {object} mapType               - Constant for the various supported map types
     * @property {string} mapType.OPENLAYERS    - Constant denoting a map type of OpenLayers 2
     * @property {string} mapType.LEAFLET       - Constant denoting a map type of Leaflet
     * @property {string} mapType.OPENLAYERS3   - Constant denoting a map type of OpenLayers 3
     */
    mapType: {
        OPENLAYERS:     'OpenLayers',
        LEAFLET:        'Leaflet',
        OPENLAYERS3:    'OpenLayers3'
    }
};

module.exports = constants;
