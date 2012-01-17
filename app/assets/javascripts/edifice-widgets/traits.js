(function($) {
  // *********** EDIFICE TRAIT CODE ************ //
  
  /**
    @name $.edifice_traits 
    @namespace 
    @description Traits live here.
   */
  $.edifice_traits = {};
  
  /**
   *  Runs $.edifice.traits.X on all contained elements with data-trait containing X
   *
   * @param {Boolean} Reset the checks to see if things have already been attached
   *                   [use this if you have clone an element without copying events]
   *
   *  Records which elements have already been 'traited' via data-trait-attached
   */
  $.fn.attach_traits = function(reset) {
    if (reset) { this.find('[data-trait]').removeAttr('data-trait-attached'); }
    
    for (trait in $.edifice_traits) {
      var $els = this.find('[data-trait~=' + trait + ']:not([data-trait-attached~=' + trait + '])');
      $els.attr('data-trait-attached', function(i, val) { 
        return (val ? val + ' ' : '') + trait; 
      });
      $.edifice_traits[trait].call($els);
    }
    return this;
  }
}(jQuery));