var demoApp = require('../constants/demoApp');

module.exports = function(browser, expectedZoom) {
    browser
		.click(demoApp.button.getZoom)
		.verify.containsText(demoApp.span.currentZoom, expectedZoom);
};
