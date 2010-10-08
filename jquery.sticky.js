/*
 * jQuery Sticky Plugin v0.1
 * http://
 *
 * Copyright (c) 2010 Bearded Studio LLC
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function($){
  $.fn.sticky = function(options){
    options = $.extend({
      containedBy: null  // dom element that restricts scrolling of sticky
    }, options);
    
    // select the (optional) element the sticky is restricted by
    var $containedBy = $(options.containedBy).first();
    
    // loop over the selected elements
    this.each(function(){
      var $sticky = $(this);
      
      // get the original top and the original position
      var stickyTop = $sticky.offset().top;
      var originalPosition = $sticky.css('position');

      // on scroll, swap appropriate styles
      $(window).scroll(function(){
        var scrollOffset = $(this).scrollTop();

        // determine whether there's a bottom bound on the sticky
        var stickyBottom = 0;
        if ($containedBy.length) {
          stickyBottom = $containedBy.offset().top + $containedBy.height() - $sticky.height();
        }

        // we're scrolling past the top of the sticky
        if (scrollOffset > stickyTop) {
          // if there's a bottom bound and we're scrolling past it
          if (stickyBottom && scrollOffset > stickyBottom) {
            // then position the sticky absolutely so it scrolls off the screen
            $sticky.css({position: 'absolute', top: stickyBottom});
          } else {
            // otherwise, keep that sticky in place!
            $sticky.css({position: 'fixed', top: '0px'});
          }
        } else {
          // otherwise, we're above the stick's original position, so put everything back
          $sticky.css({position: originalPosition, top: stickyTop});
        }
      });
    })
  }
})(jQuery);