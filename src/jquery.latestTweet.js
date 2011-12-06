/*
*  Project: jQuery LatestTweet
*  Description: return the latest tweet from a user
*  Author: Manuel van Rijn
*  Licensed under the MIT license
*/

;(function($, window, document, undefined) {
    var pluginName = 'latestTweet';
    var defaults = {
        username: 'manuelvanrijn'
    };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {
        init: function() {
            var url = this.build_url();
            var that = this;
            $.getJSON(url, function(data) {
				var formattedText = that.formatTweet(data[0].text);
                $(that.element).html(formattedText);
            });
        },
        build_url: function() {
            var proto = ('https:' == document.location.protocol ? 'https:' : 'http:');
            return proto+'//api.twitter.com/1/statuses/user_timeline.json?screen_name='+this.options.username+'&count=1&callback=?';
        },
		formatTweet: function(text) {
			var regexpLinkUrl = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
			var regexpLinkUser = /[\@]+([A-Za-z0-9-_]+)/gi;
			var regexpLinkHash = / [\#]+([A-Za-z0-9-_]+)/gi;
			
			text = text.replace(regexpLinkUrl, "<a href=\"$1\">$1</a>");
			text = text.replace(regexpLinkUser, "<a href=\"http://twitter.com/$1\">@$1</a>");
			return text.replace(regexpLinkHash, ' <a href="http://search.twitter.com/search?q=&tag=$1&lang=all">#$1</a>');
		}
    };
    
    $.fn[pluginName] = function(options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    }
})(jQuery, window, document);