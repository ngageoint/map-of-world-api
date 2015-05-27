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

require('../api');
var AdapterManager = require('./adapterManager');
var Constants = require('./const');
var _openlayersAdapter = require('../openLayers/olAdapter');
var _openlayers3Adapter = require('../openLayers/ol3/ol3Adapter');
var _leafletAdapter = require('../leaflet/leafletAdapter');

AdapterManager.registerAdapter(Constants.mapType.OPENLAYERS, _openlayersAdapter);
AdapterManager.registerAdapter(Constants.mapType.OPENLAYERS3, _openlayers3Adapter);
AdapterManager.registerAdapter(Constants.mapType.LEAFLET, _leafletAdapter);
