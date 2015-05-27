(function() {

    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                preload: Infinity,
                //source: new ol.source.MapQuest({layer: 'sat'})
                source: new ol.source.BingMaps({
                    key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
                    imagerySet: 'Aerial'
                })
            })
        ],
        view: new ol.View({
            // centered and zoomed on Caribbean
            center: ol.proj.transform([-77.7912668, 25.5578058], 'EPSG:4326', 'EPSG:3857'),
            zoom: 6
        })
    });

    $( document ).ready(function() {

        $('#buttonFly').click(function() {
            var bern = ol.proj.transform([7.4458, 46.95], 'EPSG:4326', 'EPSG:3857');
            var duration = 2000;
            var start = +new Date();
            var pan = ol.animation.pan({
                duration: duration,
                source: /** @type {ol.Coordinate} */ (map.getView().getCenter()),
                start: start
            });
            var bounce = ol.animation.bounce({
                duration: duration,
                resolution: 4 * map.getView().getResolution(),
                start: start
            });
            map.beforeRender(pan, bounce);
            map.getView().setCenter(bern);
        });

        $('#buttonPan').click(function() {
            var london = ol.proj.transform([-0.12755, 51.507222], 'EPSG:4326', 'EPSG:3857');
            var pan = ol.animation.pan({
                duration: 2000,
                source: /** @type {ol.Coordinate} */ (map.getView().getCenter())
            });
            map.beforeRender(pan);
            map.getView().setCenter(london);
        });

        $('#buttonZoomIn').click(function() {
            var currentZoom = map.getView().getZoom();
            map.getView().setZoom(currentZoom + 1);
        });

        $('#buttonZoomOut').click(function() {
            var currentZoom = map.getView().getZoom();
            map.getView().setZoom(currentZoom - 1);
        });

        $('#buttonAddPoint').click(function() {
            var bahamas = ol.proj.transform([-77.6, 23.2], 'EPSG:4326', 'EPSG:3857');
            var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(bahamas)
            });
            var iconStyle = new ol.style.Style({
                image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    opacity: 0.75,
                    src: 'marker.png'
                }))
            });
            iconFeature.setStyle(iconStyle);
            var vectorSource = new ol.source.Vector({
                features: [iconFeature]
            });
            var vectorLayer = new ol.layer.Vector({
                source: vectorSource
            });
            map.addLayer(vectorLayer);
        });

        $('#buttonAddMousePositionControl').click(function() {
            var mousePositionControl = new ol.control.MousePosition({
                coordinateFormat: ol.coordinate.createStringXY(4),
                projection: 'EPSG:4326',
                undefinedHTML: '&nbsp;'
            });
            map.addControl(mousePositionControl);
        });

    });

})();