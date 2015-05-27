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

var appUtils = {

    // This module returns a reference to the global (Window) object.
    // See the link below for an in depth explanation as to why this
    // is necessary.
    //
    // http://stackoverflow.com/questions/7290086/javascript-use-strict-and-nicks-find-global-function
    //
    // The gist is that:
    //
    // (1) we want to operate in strict mode at all times in all files
    // (2) outside of strict mode, 'this' would refer to the global
    //     Window object, but when running in strict mode, 'this' is
    //     undefined
    // (3) Because of RequireJS, we often wrap our code in a closure,
    //     which prevents some other popular techniques from working
    // (4) The approach below works in all Browsers, Engines, ES3,
    //     ES5, strict, nested scope, etc. and will pass JSHint/JSLint
    //
    getGlobalObject: function() {
        return (function(f) {
            return f('return this')();
        })(Function);
    }

};

module.exports = appUtils;
