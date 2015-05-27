module.exports = {

	button: {
        addVectorLayer: 'button[id=addVectorLayer]',
		createLeafletMap: 'button[id=createLMapButton]',
		createLine: 'button[id=createLineButton]',
		createMapOL2: 'button[id=createOLMapButton]',
        createMapOL3: 'button[id=createOL3MapButton]',
		createMultipoint: 'button[id=createMultipointButton]',
		createPoint: 'button[id=createPointButton]',
		createPolygon: 'button[id=createPolygonButton]',
        exampleWmtsLayer: 'button[id=exampleWmtsLayer]',
		getCenter: 'button[id=getCenterButton]',
		getZoom: 'button[id=getZoomButton]',
		removeAllFeatures: 'button[id=removeAllFeaturesButton]',
		removeLine: 'button[id=removeLineButton]',
		removeMultipoint: 'button[id=removeMultipointButton]',
		removePolygon: 'button[id=removePolygonButton]',
		removePoint: 'button[id=removePointButton]',
		setActiveMap: 'button[id=setActiveMapButton]',
		setCenter: 'button[id=setCenterButton]',
		setZoom: 'button[id=setZoomButton]',
		toggleCoordinatesControl: 'button[id=toggleCoordinatesButton]',
		toggleGraticuleControl: 'button[id=toggleGraticuleButton]',
		toggleScaleControl: 'button[id=toggleScaleButton]',
		toggleZoomControl: 'button[id=toggleZoomButton]',
        twentyFivepoints: 'button[id=twentyFivePoints]',
		zoomIn: 'button[id=zoomInButton]',
		zoomOut: 'button[id=zoomOutButton]',
		zoomToFullExtent: 'button[id=zoomToFullExtentButton]'
	},

	divId: {
		ol2: 'map1',
		leaflet: 'map2',
        ol3: 'map1'
	},

	input: {
		centerLat: 'input[id=centerLat]',
		centerLng: 'input[id=centerLng]',
		featureId: 'input[id=featureId]',
        layerId: 'input[id=layerId]',
		pointLat: 'input[id=pointLat]',
		pointLat2: 'input[id=pointLat2]',
		pointLat3: 'input[id=pointLat3]',
		pointLng: 'input[id=pointLng]',
		pointLng2: 'input[id=pointLng2]',
		pointLng3: 'input[id=pointLng3]',
        theLayerId: 'input[id=theLayerId]',
		zoomLevel: 'input[id=zoomLevel]'
	},

	leaflet: {
		feature: 'path[class*="leaflet"]',
		coordinatesControl: 'div[class*="leaflet-control-mouseposition"]',
		graticuleControl: 'div.leaflet-overlay-pane>svg.leaflet-zoom-animated>g>path.leaflet-clickable', // yikes
		scaleControl: 'div[class*="leaflet-control-scale"]',
		zoomControl: 'div[class*="leaflet-control-zoom"]'
	},

	ol2: {
		point: 'circle[id*="OpenLayers"]',
		line: 'polyline[id*="OpenLayers"]',
		polygon: 'path[id*="OpenLayers"]',
		coordinatesControl: 'div[class~=olControlMousePosition]',
		graticuleControl: 'div[class~=olControlGraticule]',
		scaleControl: 'div[class~=olControlScaleLine]',
        vectorLayer: 'div[id*="OpenLayers_Layer_Vector"]',
        wmtsLayer: 'div[id*="OpenLayers_Layer_WMTS"]',
		zoomControl: 'div[class~=olControlZoom]'
	},

    ol3: {
        coordinatesControl: 'div.ol-mouse-position',
        scaleControl: 'div.ol-scale-line.ol-unselectable',
        zoomControl: 'div.ol-zoom.ol-unselectable.ol-control'
    },

	select: {
		mapContainer: 'select[id=mapContainer]'
	},

	span: {
		currentLat: 'span#currentLat',
		currentLng: 'span#currentLong',
		currentZoom: 'span#currentZoom'
	},

	map: {
		ol2: '#map1',
		leaflet: '#map2[class~=leaflet-container]',
        ol3: 'canvas[class=ol-unselectable]',
        vectorLayerId: 'vectorLayer'
	},

	tab: {
		features: 'a[aria-controls=features]',
        layers: 'a[aria-controls=layerMgmt]',
		misc: 'a[aria-controls=miscExamples]',
		uiControls: 'a[aria-controls=uiControls]',
		zoomPan: 'a[aria-controls=zoomMethods]'
	},

	zoom: {
		theDefault: 2,
		newZoom: 5,
		calculatedZoom: 4
	}

};
