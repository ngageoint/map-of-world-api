var demoApp = require('../constants/demoApp');

module.exports = function(browser, expectedZoom) {
    browser
        .click(demoApp.tab.misc)
        .click(demoApp.button.twentyFivepoints)
        .click(demoApp.tab.zoomPan)
        .pause(1000)
        .click(demoApp.button.getZoom)
        .getText(demoApp.span.currentZoom, function(result) {
            var zoom = Number(result.value);
            this.verify.equal(zoom, expectedZoom);
        });
};
