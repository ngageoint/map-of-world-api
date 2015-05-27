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

// super simple ExpressJS server to serve demo page for automated end-to-end tests
// minimizes config by allowing tests to launch demo page via HTTP rather than file://

var express = require('express');
var app = express();

app.use('/', express.static(__dirname));	// would not want to serve entire root directory in
											// an application, but it does not matter in our case

var port = process.env.expressPort || 3000;

var server = app.listen(port, function() {
    console.log('Express running on port ' + server.address().port);
});

module.exports = app;
