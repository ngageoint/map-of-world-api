var demoApp = require('../constants/demoApp');

module.exports = function(browser) {
    browser
        .click(demoApp.tab.zoomPan)
        .click(demoApp.button.getCenter)
        .pause(1000)
        .verify.containsText(demoApp.span.currentLat, '0')
        .verify.containsText(demoApp.span.currentLng, '0');
};
