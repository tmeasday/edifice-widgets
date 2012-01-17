(function($) {
  // code that automatically hooks up the traits + widgets defined in the edifice namespace
  
  // when the document is ready, we can attach widgets
  $(document).ready(function() {
    $('body').attach_widgets().attach_traits();
    $(document).trigger('widgetsReady');
    
    // whenever an ajax request completes, we want to attach any widgets that have been attached to do the dom
    $('body').ajaxComplete(function(event, request) {
      $('body').attach_widgets().attach_traits();
      $(document).trigger('widgetsReady');
    });
  });
  
}(jQuery));