var demoApp = require('../constants/demoApp');

module.exports = function(browser, expectedZoom) {
    browser
        .click(demoApp.tab.zoomPan)
        .click(demoApp.button.zoomToFullExtent)
        .pause(1000)
        .click(demoApp.button.getZoom)
        .getText(demoApp.span.currentZoom, function(result) {
            var zoom = Number(result.value);
            this.verify.equal(zoom, expectedZoom);
        });
};
