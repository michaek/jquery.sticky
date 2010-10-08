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
      containedBy: null,  // dom element that restricts scrolling of sticky
      distanceFromTop: 0
    }, options);
    
    // select the (optional) element the sticky is restricted by
    var $containedBy = $(options.containedBy).first();
    
    // loop over the selected elements
    this.each(function(){
      var $sticky = $(this);
      
      // get the original top and the original position
      var stickyTop = $sticky.offset().top - options.distanceFromTop;
      var originalPosition = $sticky.css('position');

      // still working on this - meant to support page flow remaining unchanged when float starts
      // TODO: correctly adjust for margin - now just taking the top
      var $stickyPlaceholder = $sticky.wrap('<div />').parent().css({
        position: originalPosition,
        width: $sticky.outerWidth(),
        height: $sticky.outerHeight(),
        marginTop: $sticky.css('margin-top')
      });
      $sticky.css('marginTop', '0');

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
          if (stickyBottom && scrollOffset > stickyBottom - options.distanceFromTop) {
            // then position the sticky absolutely so it scrolls off the screen
            $sticky.css({position: 'absolute', top: stickyBottom});
          } else {
            // otherwise, keep that sticky in place!
            $sticky.css({position: 'fixed', top: options.distanceFromTop});
          }
        } else {
          // otherwise, we're above the stick's original position, so put everything back
          $sticky.css({position: originalPosition, top: stickyTop});
        }
      });
    })
  }
})(jQuery);