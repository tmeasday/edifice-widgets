(function($) {
  // *********** EDIFICE WIDGET CODE *********** //
  /**
    @name $.edifice_widgets 
    @namespace 
    @description Our widgets live here.
   */
  $.edifice_widgets = {};

  /**
   * Runs attach_widget() on any widget found in the html which isn't already attached.
   *
   * @param {Boolean} Reset the checks to see if things have already been attached
   *                   [use this if you have clone an element without copying events]
   *
   */  
  $.fn.attach_widgets = function(reset) {
    if (reset) { this.find('[data-widget]').removeAttr('data-widget-attached'); }

    this.find('[data-widget]:not([data-widget-attached])').attach_widget();

    return this;
  };

  /**
   * Call $.WIDGET_NAME on the matched elements where WIDGET_NAME is set in the
   * data-widget attribute.
   *
   * @param {Object} extra_options Use these options in addition to those specified
   * in the html as data-widget-OPTION_NAME=VALUE
   *
   * @throws {Exception} If a widget has already been attached.
   * @throws {Exception} If the type of widget doesn't exist.
   */
  $.fn.attach_widget = function(extra_options) {
    return this.each(function() {
      var $e = $(this), fn_name = $e.attr('data-widget');

      // error checking
      if ($e.attr('data-widget-attached')) {
        throw('attach_widget called on already attached widget.');
      }
      if (!(fn_name in $.edifice_widgets)) {
        throw("edifice widget '" + fn_name + "'   is not defined.");
      }

      // attach extra options to the widget
      if (typeof(extra_options) != 'undefined') {
        $.each(extra_options, function(name, def) {
          $e.data('widget-' + name, def);
        });      
      }

      // load the widget up
      $.edifice_widgets[fn_name].call($e);
      $e.attr('data-widget-attached', true);
    });
  };
  
  /**
   * Make a widget out of an element which doesn't already have data-widget set
   * in the html.
   *
   * @param {String} Type Type of widget, e.g 'ajax_form'
   * @param {Object} Options for widget.
   */
  $.fn.create_widget = function(type, options) {
    return $(this).attr('data-widget', type).attach_widget(options);
  };
    
  /**
   * @constant
   */
  $.edifice_widgets.REQUIRED = '*** VALUE REQUIRED ***';
  
  /**
   * Read the set of options attached to a widget via data-widget-OPTION_NAME
   * in the html.
   *
   * @param {Object} defaults Specifies the names and default values of 
   * applicable options. Set default value to $.edifice_widgets.REQUIRED to indicate
   * a mandatory value.
   *
   * @returns {Object} The options calculated.
   *
   * @throws {Exception} If a required option is not found.
   */  
  $.fn.read_options = function(defaults) {
    var that = this;
    var options = {};
    $.each(defaults, function(name, def) {
      var val = that.data('widget-' + name) || that.attr('data-widget-' + name);
      
      if (val) {
        options[name] = val;
      } else {
        if (def === $.edifice_widgets.REQUIRED) {
          throw("Widget argument required: " + name);
        }
        
        options[name] = def;
      }
    });
    
    return options;
  }
}(jQuery));