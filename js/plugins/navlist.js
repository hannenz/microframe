/*
 * navlist.js
 * 
 * Implement mobile navigation
 *
 * @author Johannes Braun <j.braun@agentur-halma.de>
 * @package microframe
 */
;(function($) {

	var pluginName = 'navlist';

	function Plugin(element, options) {
		var el = element;
		var $el = $(element);

		options = $.extend({}, $.fn[pluginName].defaults, options);

		function init() {
			$('body').addClass('microframe-navlist-js');
			$el.find('ul').hide();
			$el.find('a.has-submenu').bind('click', _onClick);
			hook('onInit');
		}

		function _onClick(event){
			event.preventDefault();

			if (!$(this).hasClass('selected')){
				$(this).addClass('selected');
				$(this).parent().siblings().hide();
				$(this).next('ul').slideDown(options.animationSpeed);
			}
			else {
				$(this).next('ul').slideUp(options.animationSpeed);
				$(this).parent().siblings().show();
				$(this).removeClass('selected');
			}
		}

		function option (key, val) {
			if (val) {
				options[key] = val;
			} else {
				return options[key];
			}
		}

		function destroy() {
			$el.each(function() {
				var el = this;
				var $el = $(this);

				// Add code to restore the element to its original state...

				hook('onDestroy');
				$el.removeData('plugin_' + pluginName);
			});
		}

		function hook(hookName) {
			if (options[hookName] !== undefined) {
				options[hookName].call(el);
			}
		}
		init();

		return {
			option: option,
			destroy: destroy,
		};
	}
	/**
	 * Plugin definition.
	 */
	$.fn[pluginName] = function(options) {
		if (typeof arguments[0] === 'string') {
			var methodName = arguments[0];
			var args = Array.prototype.slice.call(arguments, 1);
			var returnVal;
			this.each(function() {
				if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
					returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
				}
			});
			if (returnVal !== undefined){
				return returnVal;
			}
			else {
				return this;
			}
		}
		else if (typeof options === "object" || !options) {
			return this.each(function() {
				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
				}
			});
		}
	};

	$.fn[pluginName].defaults = {
		onInit: function() {},
		onDestroy: function() {},
		animationSpeed : 200
	};
})(jQuery);
