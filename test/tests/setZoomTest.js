var demoApp = require('../constants/demoApp');

module.exports = function(browser, newZoom) {
    browser
        .clearValue(demoApp.input.zoomLevel)
        .setValue(demoApp.input.zoomLevel, newZoom)
        .click(demoApp.button.setZoom)
        .pause(1000)
        .click(demoApp.button.getZoom)
        .getText(demoApp.span.currentZoom, function(result) {
            var zoom = Number(result.value);
            this.verify.equal(zoom, Number(newZoom));
        });
};
