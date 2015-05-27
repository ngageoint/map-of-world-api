module.exports = {
    default: {
        src: '<%= distributions.default %>',
        dest: '<%= distributions.default_min %>'
    },
    ol2: {
        src: '<%= distributions.ol2 %>',
        dest: '<%= distributions.ol2_min %>'
    },
    ol3: {
        src: '<%= distributions.ol3 %>',
        dest: '<%= distributions.ol3_min %>'
    },
    leaflet: {
        src: '<%= distributions.leaflet %>',
        dest: '<%= distributions.leaflet_min %>'
    }
};
