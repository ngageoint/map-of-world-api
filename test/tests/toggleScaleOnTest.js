var demoApp = require('../constants/demoApp');

module.exports = function(browser, assertionElement) {
    browser
        .click(demoApp.tab.uiControls)
        .click(demoApp.button.toggleScaleControl)
        .verify.elementPresent(assertionElement);
};
