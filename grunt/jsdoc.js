module.exports = {
    src: ['js/app/**/*.js'],
    options: {
        destination: 'docs/jsdoc',
        template: 'node_modules/grunt-jsdoc/node_modules/ink-docstrap/template',
        configure: 'node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json'
    }
};
