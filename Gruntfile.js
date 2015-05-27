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

module.exports = function(grunt) {

    'use strict';

    require('load-grunt-config')(grunt, {
        data: {
            jitGrunt: {
                staticMappings: {
                    // manually define mappings that jit-grunt can't automatically figure out
                    express: 'grunt-express-server'
                }
            },
            config: grunt.file.readJSON('testConfig.json'),      // read by nightwatch task
            lint: grunt.file.readJSON('lint.json'),
            distributions: grunt.file.readJSON('distributions.json')
        }
    });

    require('time-grunt')(grunt);

    // task groupings (helpers)
    grunt.registerTask('lint', ['newer:jshint', 'newer:jscs', 'newer:htmlhint', 'newer:csslint']);
    grunt.registerTask('prep', ['clean', 'copy']);
    grunt.registerTask('test', ['env:def', 'express:test', 'nightwatch', 'express:test:stop']);
    grunt.registerTask('minify:default', ['browserify:default', 'uglify:default']);
    grunt.registerTask('minify:ol2', ['browserify:ol2', 'uglify:ol2']);
    grunt.registerTask('minify:ol3', ['browserify:ol3', 'uglify:ol3']);
    grunt.registerTask('minify:leaflet', ['browserify:leaflet', 'uglify:leaflet']);

    // full "production" build
    grunt.registerTask('prod', ['clear', 'lint', 'prep', 'minify:default', 'minify:ol2', 'test', 'jsdoc', 'plato']);
    // builds that target a single map implementation to minimize API footprint
    grunt.registerTask('ol2', ['clear', 'lint', 'prep', 'minify:ol2']);
    grunt.registerTask('ol3', ['clear', 'lint', 'prep', 'minify:ol3']);
    grunt.registerTask('leaflet', ['clear', 'lint', 'prep', 'minify:leaflet']);
    // helper tasks for development purposes
    grunt.registerTask('dev', ['clear', 'lint', 'prep', 'browserify:default']);
    grunt.registerTask('testsonly', ['clear', 'test']);
    // default Task, run via 'grunt'
    grunt.registerTask('default', ['prod']);
};
