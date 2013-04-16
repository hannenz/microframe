/**
 * ocmenu.js
 * 
 * @author Johannes Braun <j.braun@agentur-halma.de>
 * @package microframe
 */
;(function($) {
	// Change this to your plugin name.
	var pluginName = 'ocmenu';

	function Plugin(element, options) {
		// References to DOM and jQuery versions of element.
		var el = element;
		var $el = $(element);

		options = $.extend({}, $.fn[pluginName].defaults, options);

		function init() {
			$el.find('.ocmenu-open').bind('click', function(event){
				$('body').addClass('js-nav');
			});
			$el.find('.ocmenu-close').bind('click', function(event){
				$('body').removeClass('js-nav');
			});
		}

		// Initialize the plugin instance.
		init();

	}
	/**
	 * Plugin definition.
	 */
	$.fn[pluginName] = function(options) {
		// If the first parameter is a string, treat this as a call to
		// a public method.
		if (typeof arguments[0] === 'string') {
			var methodName = arguments[0];
			var args = Array.prototype.slice.call(arguments, 1);
			var returnVal;
			this.each(function() {
				// Check that the element has a plugin instance, and that
				// the requested public method exists.
				if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
					// Call the method of the Plugin instance, and Pass it
					// the supplied arguments.
					returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
				} else {
					//~ throw new Error('Method ' +  methodName + ' does not exist on jQuery.' + pluginName);
				}
			});
			if (returnVal !== undefined){
				// If the method returned a value, return the value.
				return returnVal;
			} else {
				// Otherwise, returning 'this' preserves chainability.
				return this;
			}
		// If the first parameter is an object (options), or was omitted,
		// instantiate a new instance of the plugin.
		} else if (typeof options === "object" || !options) {
			return this.each(function() {
				// Only allow the plugin to be instantiated once.
				if (!$.data(this, 'plugin_' + pluginName)) {
					// Pass options to Plugin constructor, and store Plugin
					// instance in the elements jQuery data object.
					$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
				}
			});
		}
	};
	$.fn[pluginName].defaults = {
		onInit: function() {},
		onDestroy: function() {}
	};
})(jQuery);

