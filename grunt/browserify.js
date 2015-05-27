module.exports = {
    default: {
        src: 'js/app/core/defaultLoader.js',
        dest: '<%= distributions.default %>'
    },
    ol2: {
        src: 'js/app/openLayers/olLoader.js',
        dest: '<%= distributions.ol2 %>'
    },
    ol3: {
        src: 'js/app/openLayers/ol3/ol3Loader.js',
        dest: '<%= distributions.ol3 %>'
    },
    leaflet: {
        src: 'js/app/leaflet/leafletLoader.js',
        dest: '<%= distributions.leaflet %>'
    }
};
