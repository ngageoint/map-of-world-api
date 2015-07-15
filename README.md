
Origin
------

[![Join the chat at https://gitter.im/ngageoint/map-of-world-api](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ngageoint/map-of-world-api?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Map of the World API was developed at the [National Geospatial-Intelligence Agency](http://www.nga.mil) in collaboration with [Booz Allen Hamilton](http://www.boozallen.com). The government has "unlimited rights" and is releasing this software to increase the impact of government investments by providing developers with the opportunity to take things in new directions. The software use, modification, and distribution rights are stipulated within the [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html) license.

Contributing
-----------

All pull request contributions to this project will be released under the Apache 2.0 or compatible license. Software source code previously released under an open source license and then modified by NGA staff is considered a "joint work" (see 17 USC � 101); it is partially copyrighted, partially public domain, and as a whole is protected by the copyrights of the non-government authors and must be released according to the terms of the original open source license.

Description
-----------

* This Map API supports multiple web-based mapping libraries and provides a consistent set of methods for interacting with any of the supported implementations.
* Currently [OpenLayers 2](http://openlayers.org/two/) and [Leaflet](http://leafletjs.com/) are supported.
* Support for [OpenLayers 3](http://openlayers.org/) is coming soon!

Development Guidelines
------------------------------

* It is highly encouraged that developers follow the conventions described in the following two JavaScript style guides: (1) [airbnb](https://github.com/airbnb/javascript) (2) [idiomatic.js](https://github.com/rwaldron/idiomatic.js/)
* The development team uses [Grunt](http://gruntjs.com/) to manage builds
* The build process lints JavaScript source files via [JSHint](http://www.jshint.com/) + [JSCS](http://jscs.info/overview.html) and generates API documentation via [JSDoc](http://usejsdoc.org/)
* JavaScript source files are bundled into a single file for distribution via [Browserify](http://browserify.org/) and minified using [Uglify](https://github.com/mishoo/UglifyJS)
* [NightwatchJS](http://nightwatchjs.org/) + [Selenium](http://www.seleniumhq.org/) are used for automated end-to-end tests
* New functionality must be developed in a descriptively named feature branch and code reviewed prior to being merged into the 'master' branch

API Documentation
-----------------

* A zip file of the [Map API documentation](https://github.com/ngageoint/map-of-world-api/raw/master/docs/mapapi_jsdoc.zip) is available for those that wish to review the documentation prior to building the project themselves.  

Build Process
-------------

* Some of the commands below may require `sudo` (or equivalent) depending on the operating system.
* If you work on site at an organization with restrictive network policies (such as blocking SSH on port 22), you may need to tell Git to replace the Git protocol with HTTPS via `git config --global url."https://".insteadOf git://`
    1. Install [NodeJS](http://nodejs.org/)
    2. Install [Grunt](http://gruntjs.com/) `npm install -g grunt-cli`
    3. Install dependencies via `npm install` (see package.json for configuration)
    4. Download standalone version of Selenium, which can be found [here](http://selenium-release.storage.googleapis.com/2.44/selenium-server-standalone-2.44.0.jar)
    5. Edit `testConfig.json` for your local environment
        * `seleniumJarLocation` should point to the location of the Standalone Selenium JAR (which you just downloaded in #4) on your local filesystem
        * `seleniumHost` should point to the host of the selenium instance (most likely localhost)
        * `seleniumPort` defines the port that selenium listens on (selenium default is 4444)
        * `localExpressServerPort` defines the port that the local express server listens on (default is 3000)
    6. Perform build via `grunt` (see Gruntfile.js for alternative build tasks and configurations)

Top-level Directory Structure
-------------

* `demo/` - contains simple HTML page (and other required dependencies) to demonstrate API functionality
* `dev/` - contains HTML container(s) useful during development and debugging
* `dist/` - contains resources that are copied/generated during the build process
* `grunt` - contains modules for each Grunt task
* `js/`
    * `js/app/` - contains all API source code
    * `js/assets/` - contains third-party dependencies not available via npm (manually managed)
* `tests/` - contains NightwatchJS tests
* `Gruntfile.js` - build script containing various build tasks and configurations
* `LICENSE` - Apache 2.0 License
* `NOTICE` - Apache 2.0 License Header
* `README.me` - development documentation
* `api-usage-examples.md` - API usage guidelines with examples
* `distributions.json` - file names of various distributions produced by build
* `jscs.json` - JavaScript code style validation rules
* `jsdoc.conf.json` - configures the formatting of JSDoc output
* `lint.json` - configures the locations of source files to be linted
* `npm-shrinkwrap.json` - locks down specific dependency versions, update via `npm shrinkwrap` after adding a new dependency
* `package.json` - project configuration and dependency definitions
* `server.js` - rudimentary ExpressJS server used to host local resources for end-to-end test execution
* `testConfig.json` - contains properies related to the configuration of the test environment

