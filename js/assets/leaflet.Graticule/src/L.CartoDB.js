L.CartoDB = L.GeoJSON.extend({
  initialize: function (url, options) {
    L.Util.setOptions(this, options);

    this._layers = {};

    var self = this;

    if (url) {
      this._jsonp(url, function(geojson){
        self.addData(geojson);
      });
    }
  },

  _jsonp: function(url, callback){
    
      // Create random function name
      var randomName = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_';
      var length = 10;
      while (length--) {
        randomName += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    
      // Called when data is loaded
      L.CartoDB[randomName] = function(data) {
        callback(data);
        delete L.CartoDB[randomName];
        script.parentNode.removeChild(script);
      }
          
      // Add script to page    
      var script = document.createElement('script');
      script.src = url + '&format=GeoJSON&callback=L.CartoDB.' + randomName;
      script.async = true;
      script = document.getElementsByTagName('head')[0].appendChild(script);      
    }
});

L.cartoDB = function (url, options) {
  return new L.CartoDB(url, options);
};