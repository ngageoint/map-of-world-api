var demoApp = require('../constants/demoApp');

module.exports = {
    setActiveMap: function(browser, optionValue) {
        browser
            .setValue(demoApp.select.mapContainer, optionValue)
            .click(demoApp.button.setActiveMap);
    }
};
