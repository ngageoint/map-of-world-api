Leaflet plugins
===============

Various plugins to make life easier with [Leaflet](http://leafletjs.com/). 

## L.Graticule.js

The graticule plugin displays a grid of latitude/longitude lines projected on the map. Extends [GeoJson](http://leafletjs.com/reference.html#geojson). 

[Example](http://turban.github.com/leaflet-plugins/examples/graticule.html)

### Usage

```javascript
L.graticule().addTo(map);
```

```javascript
L.graticule({
  onEachFeature: function(feature, layer) {
    layer.bindPopup('<strong>' + feature.properties.name + '</strong>');
  }
}).addTo(map);
```

```javascript
L.graticule({
  surface: true,
  style: {
    fillColor: '#99b3cc',
    fillOpacity: 1,
    weight: 0
  }      
}).addTo(map);
```


