module.exports = {
    main: {
        files: [
            {
                // Leaflet CSS
                cwd: 'node_modules/leaflet/dist',
                src: ['**/*.css', 'images/**/*'],
                dest: 'dist/leaflet',
                expand: true
            },
            {
                // OpenLayers 2 CSS
                cwd: 'js/assets/openLayers/2.13.1/theme/default',
                src: '**/*',
                dest: 'dist/openlayers',
                expand: true
            },
            {
                // Custom JSDoc Docstrap Template
                cwd: '.',
                src: 'jsdoc.conf.json',
                dest: 'node_modules/grunt-jsdoc/node_modules/ink-docstrap/template',
                expand: true
            },
            {
                // OpenLayers 3 CSS
                cwd: 'js/assets/ol3',
                src: '**/*.css',
                dest: 'dist/openlayers/ol3',
                expand: true
            }
        ]
    }
};
