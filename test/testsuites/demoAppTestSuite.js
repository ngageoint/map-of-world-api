// url of the demo application running on localhost
var demoPageUrl = 'http://localhost:' + process.env.expressPort + '/demo/index.html';

// constants
var demoApp = require('../constants/demoApp');
var NUM_MAP_IMPLEMENTATIONS = 2;

// utility Functions
var util = require('../util/demoAppUtils');

// load each test individually from '../tests/' folder
var getCenterTest = require('../tests/getCenterTest');
var setCenterTest = require('../tests/setCenterTest');
var getZoomTest = require('../tests/getZoomTest');
var setZoomTest = require('../tests/setZoomTest');
var zoomOutTest = require('../tests/zoomOutTest');
var zoomInTest = require('../tests/zoomInTest');
var addVectorLayerTest = require('../tests/addVectorLayerTest');
var createPointTest = require('../tests/createPointTest');
var removePointTest = require('../tests/removePointTest');
var createPolygonTest = require('../tests/createPolygonTest');
var removePolygonTest = require('../tests/removePolygonTest');
var createLineTest = require('../tests/createLineTest');
var removeLineTest = require('../tests/removeLineTest');
var createMultipointTest = require('../tests/createMultipointTest');
var removeMultipointTest = require('../tests/removeMultipointTest');
var toggleScaleOnTest = require('../tests/toggleScaleOnTest');
var toggleScaleOffTest = require('../tests/toggleScaleOffTest');
var toggleGraticuleOnTest = require('../tests/toggleGraticuleOnTest');
var toggleGraticuleOffTest = require('../tests/toggleGraticuleOffTest');
var toggleCoordinatesOnTest = require('../tests/toggleCoordinatesOnTest');
var toggleCoordinatesOffTest = require('../tests/toggleCoordinatesOffTest');
var toggleZoomOnTest = require('../tests/toggleZoomOnTest');
var toggleZoomOffTest = require('../tests/toggleZoomOffTest');
var zoomToDataTest = require('../tests/zoomToDataTest');
var zoomToFullExtentTest = require('../tests/zoomToFullExtentTest');
var clearAllFeaturesTest = require('../tests/clearAllFeaturesTest');
var createMapOL2Test = require('../tests/createMapOL2Test');
var createMapLeafletTest = require('../tests/createMapLeafletTest');
var addWmtsLayerTest = require('../tests/addWmtsLayerTest');

// used in beforeEach
var numStepsExecuted = 0;

module.exports = {

    // launch demo app in browser and maximize window
    before: function(browser) {
        console.log('Launching ' + demoPageUrl + ' ...');
        browser
            .url(demoPageUrl)
            .maximizeWindow();
    },

    // toggle between map implementations as test suite moves through individual tests
    beforeEach: function(browser) {
        // begin toggling after all maps have been created
        if (numStepsExecuted >= NUM_MAP_IMPLEMENTATIONS) {
            if (numStepsExecuted % NUM_MAP_IMPLEMENTATIONS === 0) util.setActiveMap(browser, demoApp.divId.ol2);
            else util.setActiveMap(browser, demoApp.divId.leaflet);
        }
    },

    // keep track of the # of tests that have run
    afterEach: function() {
        numStepsExecuted++;
    },

    'Create Map (OpenLayers v2)': function(browser) { createMapOL2Test(browser, demoApp.divId.ol2); },
    'Create Map (Leaflet)': function(browser) { createMapLeafletTest(browser, demoApp.divId.leaflet); },
    'Get Center (OpenLayers v2)': function(browser) { getCenterTest(browser); },
    'Get Center (Leaflet)': function(browser) { getCenterTest(browser); },
    'Set Center (OpenLayers v2)': function(browser) { setCenterTest(browser); },
    'Set Center (Leaflet)': function(browser) { setCenterTest(browser); },
    'Get Zoom (OpenLayers v2)': function(browser) { getZoomTest(browser, demoApp.zoom.theDefault.toString()); },
    'Get Zoom (Leaflet)': function(browser) { getZoomTest(browser, demoApp.zoom.theDefault.toString()); },
    'Set Zoom (OpenLayers v2)': function(browser) { setZoomTest(browser, demoApp.zoom.newZoom.toString()); },
    'Set Zoom (Leaflet)': function(browser) { setZoomTest(browser, demoApp.zoom.newZoom.toString()); },
    'Zoom Out (OpenLayers v2)': function(browser) { zoomOutTest(browser, demoApp.zoom.newZoom - 1); },
    'Zoom Out (Leaflet)': function(browser) { zoomOutTest(browser, demoApp.zoom.newZoom - 1); },
    'Zoom In (OpenLayers v2)': function(browser) { zoomInTest(browser, demoApp.zoom.newZoom); },
    'Zoom In (Leaflet)': function(browser) { zoomInTest(browser, demoApp.zoom.newZoom); },
    'Add Vector Layer (OpenLayers v2)': function(browser) { addVectorLayerTest(browser, demoApp.ol2.vectorLayer); },
    'Add Vector Layer (Leaflet)': function(browser) {
        // TODO implementation
        console.log('Temporary Placeholder Needs Implemented');
    },
    'Create Point (OpenLayers v2)': function(browser) { createPointTest(browser, demoApp.ol2.point); },
    'Create Point (Leaflet)': function(browser) { createPointTest(browser, demoApp.leaflet.feature); },
    'Remove Point (OpenLayers v2)': function(browser) { removePointTest(browser, demoApp.ol2.point); },
    'Remove Point (Leaflet)': function(browser) { removePointTest(browser, demoApp.leaflet.feature); },
    'Create Polygon (OpenLayers v2)': function(browser) { createPolygonTest(browser, demoApp.ol2.polygon); },
    'Create Polygon (Leaflet)': function(browser) { createPolygonTest(browser, demoApp.leaflet.feature); },
    'Remove Polygon (OpenLayers v2)': function(browser) { removePolygonTest(browser, demoApp.ol2.polygon); },
    'Remove Polygon (Leaflet)': function(browser) { removePolygonTest(browser, demoApp.leaflet.feature); },
    'Create Multipoint (OpenLayers v2)': function(browser) { createMultipointTest(browser, demoApp.ol2.point); },
    'Create Multipoint (Leaflet)': function(browser) { createMultipointTest(browser, demoApp.leaflet.feature); },
    'Remove Multipoint (OpenLayers v2)': function(browser) { removeMultipointTest(browser, demoApp.ol2.point); },
    'Remove Multipoint (Leaflet)': function(browser) { removeMultipointTest(browser, demoApp.leaflet.feature); },
    'Create Line (OpenLayers v2)': function(browser) { createLineTest(browser, demoApp.ol2.line); },
    'Create Line (Leaflet)': function(browser) { createLineTest(browser, demoApp.leaflet.feature); },
    'Remove Line (OpenLayers v2)': function(browser) { removeLineTest(browser, demoApp.ol2.line); },
    'Remove Line (Leaflet)': function(browser) { removeLineTest(browser, demoApp.leaflet.feature); },
    'Toggle Scale On (OpenLayers v2)': function(browser) { toggleScaleOnTest(browser, demoApp.ol2.scaleControl); },
    'Toggle Scale On (Leaflet)': function(browser) { toggleScaleOnTest(browser, demoApp.leaflet.scaleControl); },
    'Toggle Scale Off (OpenLayers v2)': function(browser) { toggleScaleOffTest(browser, demoApp.ol2.scaleControl); },
    'Toggle Scale Off (Leaflet)': function(browser) { toggleScaleOffTest(browser, demoApp.leaflet.scaleControl); },
    'Toggle Graticule On (OpenLayers v2)': function(browser) { toggleGraticuleOnTest(browser, demoApp.ol2.graticuleControl); },
    'Toggle Graticule On (Leaflet)': function(browser) { toggleGraticuleOnTest(browser, demoApp.leaflet.graticuleControl); },
    'Toggle Graticule Off (OpenLayers v2)': function(browser) { toggleGraticuleOffTest(browser, demoApp.ol2.graticuleControl); },
    'Toggle Graticule Off (Leaflet)': function(browser) { toggleGraticuleOffTest(browser, demoApp.leaflet.graticuleControl); },
    'Toggle Coordinates Control On (OpenLayers v2)': function(browser) { toggleCoordinatesOnTest(browser, demoApp.ol2.coordinatesControl); },
    'Toggle Coordinates Control On (Leaflet)': function(browser) { toggleCoordinatesOnTest(browser, demoApp.leaflet.coordinatesControl); },
    'Toggle Coordinates Control Off (OpenLayers v2)': function(browser) { toggleCoordinatesOffTest(browser, demoApp.ol2.coordinatesControl); },
    'Toggle Coordinates Control Off (Leaflet)': function(browser) { toggleCoordinatesOffTest(browser, demoApp.leaflet.coordinatesControl); },
    // zoom control is enabled by default, so test toggle off then on...
    'Toggle Zoom Control Off (OpenLayers v2)': function(browser) { toggleZoomOffTest(browser, demoApp.ol2.zoomControl); },
    'Toggle Zoom Control Off (Leaflet)': function(browser) { toggleZoomOffTest(browser, demoApp.leaflet.zoomControl); },
    'Toggle Zoom Control On (OpenLayers v2)': function(browser) { toggleZoomOnTest(browser, demoApp.ol2.zoomControl); },
    'Toggle Zoom Control On (Leaflet)': function(browser) { toggleZoomOnTest(browser, demoApp.leaflet.zoomControl); },
    'Zoom to Full Extent (OpenLayers v2)': function(browser) { zoomToFullExtentTest(browser, demoApp.zoom.theDefault); },
    'Zoom to Full Extent (Leaflet)': function(browser) { zoomToFullExtentTest(browser, demoApp.zoom.theDefault); },
    'Zoom to Points (OpenLayers v2)': function(browser) { zoomToDataTest(browser, demoApp.zoom.calculatedZoom); },
    'Zoom to Points (Leaflet)': function(browser) {
        // TODO uncomment test once Leaflet adapter is updated
        console.log('Temporary Placeholder Needs Implemented');
        //zoomToDataTest(browser, demoApp.zoom.calculatedZoom);
    },
    'Clear All Features (OpenLayers v2)': function(browser) { clearAllFeaturesTest(browser, demoApp.ol2.point, demoApp.ol2.polygon, demoApp.ol2.line); },
    'Clear All Features (Leaflet)': function(browser) { clearAllFeaturesTest(browser, demoApp.leaflet.feature); },
    'Add WMTS Layer (OpenLayers v2)': function(browser) { addWmtsLayerTest(browser, demoApp.ol2.wmtsLayer); },

    // call end() when complete to close out the test suite
    after: function(browser) {
        console.log('Wrapping up...');
        browser.end();
    }

};
