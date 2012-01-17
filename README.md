Edifice Widgets + Traits
========================

edifice-widgets is the part of the [edifice project](https://github.com/tmeasday/edifice) which allows simple unobtrusive javascript behaviours to allow you to make pages dynamic, whilst avoiding unnecessary boilerplate.

Note that it does not depend on edifice although it complements it well. Also note that it doesn't depend on rails---the javascript files can be used in isolation if you want. It does depend on jQuery.

Traits -- unobtrusive JS behaviours
-----------------------------------

Traits are best explained through example. Suppose you have a input field that you'd like to automatically select all when clicked on (for example github's repository URL field). If we define:

    $.edifice_traits.always_select_all = function() {
      return this.bind('click select focus focusin', function() {
        this.select();
      });
    }

Then we can use such a behaviour with:

    <input data-trait="always_select_all">

edifice-widgets will ensure that the code is attached to the `input` and everything behaves as you'd expect.

You can define more than one trait for an element (separate them with spaces, as you would CSS classes). For that reason, as a rule, it is best if traits remain very simple, and don't alter the internal HTML structure of the element. Otherwise bugs are bound to happen when you combine them.

Widgets -- unobtrusive specialised elements
-------------------------------------------

If you need something more complex that will significantly alter the HTML, or which requires arguments, it is best to use a widget. For example, suppose you want to create a styled select. Suppose we want to use it all over our website.

Then we want to write the minimum of HTML above what we would to use a vanilla select, and let the JS framework take care of hooking things together. edifice-widgets lets us write simply:

    <select name="country" data-widget="select">
      <option value="au">Australia</option>
      <option value="us">USA</option>
    </select>

To enable this, we can write a `select` widget, which goes something like:
    
    // note this code is basically untested psuedo-code
    $.edifice_widgets.select = function() {
      return this.each(function(){
        var $select = $(this).wrap('<div class="select">'),
          $widget = $select.parent(), $ul = $('<ul>').insertBefore($select);
        
        // insert the selected text
        $widget.prepend('<a class="selected">' + $select.val() + '</a>');
        
        $select.find('option').each(function() {
          // add a <li> to $ul
          var $li = $('<li">' + $(this).text() + '</li>').data('option', $(this));
          $ul.append();
        });
        
        // bind click events on lis to select the li's value and close the select widget
        $widget.delegate('li', 'click', function() {
          $select.val($(this).data('option').val());
          $widget.find('.selected').text($(this).data('option').text());
          $widget.removeClass('open');
          
        // bind click events on the selected value to toggle the open state
        }).delegate('.selected', 'click', function() {
          $widget.toggleClass('open');
        })
      });
    }

Of course you would also need to define some appropriate styles to make the select look right.

Widgets can take arguments, which are set like so:

    <select data-widget="select" data-widget-open_class="expanded">

To access the option easily, use the `.read_options` method:

    var settings = $(this).read_options({
      'open_class': 'open' // <-- this is the default value for settings.open_class
    })

Use `$edifice_widgets.REQUIRED` to indicate that a setting is required:
    var settings = $(this).read_options({
      'autosubmit_url': $.edifice_widgets.REQUIRED
    });


License
-------

Edifice is crafted by [Percolate Studio](http://percolatestudio.com) and released under the [MIT license](www.opensource.org/licenses/MIT)

