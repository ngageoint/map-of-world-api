L.Wax = L.Class.extend({

  initialize: function (map) {
    this.map = map;
    var layers = map.options.layers || [];
    var self = this;
    
    map.on('layeradd', function(e) {
      if (e.layer.options.wax) {
        self._getTilejson(e.layer, self._addWax);
      }  
    });
	
    map.on('layerremove', function(e) {
      if (e.layer.options.wax) {
      	self._removeWax();
      }  
    });

    for (var i = 0; i < layers.length; i++) {
      if (layers[i].options.wax) {
        this._getTilejson(layers[i], this._addWax);
      }
    }

  },

  _getTilejson: function (layer, callback) {
    var self = this;
    var tilejson = layer.options.wax;
    if (typeof tilejson === 'string') {
      wax.tilejson(tilejson, function(response) {
        layer.options.wax = response; 
        callback.call(self, response) 
      });
    } else {
      callback.call(this, tilejson)
    }
  },

  _addWax: function (tilejson) {
  	if (tilejson.legend) {
  	  this.legend = wax.leaf.legend(this.map, tilejson).appendTo(this.map._container);
  	};  

  	if (tilejson.grids) {
      this.tooltip = wax.tooltip();
      this.interaction = wax.leaf.interaction()
       .map(map)
       .tilejson(tilejson)
       .on(this.tooltip.animate(true).parent(map._container).events());
    } 
  },

  _removeWax: function() {
    if (this.legend) {
      var el = this.legend.element();
      el.parentNode.removeChild(el);
      this.legend = null;
    }
    if (this.interaction) {
      var el = document.getElementsByClassName('wax-tooltip')[0]; // Better to have access to element directly
      if (el) {
        this.tooltip.parent().removeChild(el);
      }
      this.interaction.remove();
      this.interaction = null;
    }  	
  }


});

L.wax = function (map) {
  return new L.Wax(map);
};

