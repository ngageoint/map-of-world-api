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

var AppUtils = require('./util/appUtils');
var Constants = require('./core/const');
var ObjectFactory = require('./core/objectFactory');
var Facade = require('./core/facade');

// publicly expose all API methods under the 'mapapi' namespace
var Window = AppUtils.getGlobalObject();
Window.mapapi = Facade;
Window.mapapi.constant = Constants;
Window.mapapi.factory = ObjectFactory;
Window.mapapi.VERSION = '0.9.12';
