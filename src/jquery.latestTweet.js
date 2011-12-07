/* =========================================================
 * jquery.latestTweet.js v0.1
 * Description: Return the latest tweet from a user
 * Project: https://github.com/manuelvanrijn/jquery-latestTweet
 * Author: Manuel van Rijn
 * Released under the MIT License.
 * ========================================================== */

;(function($, window, document, undefined) {
  
  var LatestTweet = function(elem, options){
    this.elem = elem;
    this.$elem = $(elem);
    this.config = $.extend({}, $.fn.latestTweet.defaults, options);
  };

  LatestTweet.prototype = {
    init: function(username) {
      // I prefer not using the name "that"
      var _instance = this;
      var url = _instance.getUrl(username);

      $.getJSON(url, function(data) {
        var text = _instance.formatTweet(data[0].text);
        _instance.$elem.html(text);

        // trigger the callback
        _instance.config.callback.call(this);
      });

      return this;
    },
    getUrl: function(username) {
      var proto = ('https:' == document.location.protocol ? 'https:' : 'http:');
      return proto+'//api.twitter.com/1/statuses/user_timeline.json?screen_name='+username+'&count=1&callback=?';
    },
    formatTweet: function(text) {
      var regexpLinkUrl = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
      var regexpLinkUser = /[\@]+([A-Za-z0-9-_]+)/gi;
      var regexpLinkHash = /[\#]+([A-Za-z0-9-_]+)/gi;

      if(this.config.formatLinks)
        text = text.replace(regexpLinkUrl, "<a href=\"$1\">$1</a>");
      if(this.config.formatMentions)
        text = text.replace(regexpLinkUser, "<a href=\"http://twitter.com/$1\">@$1</a>");
      if(this.config.formatHashes)
        text = text.replace(regexpLinkHash, ' <a href="http://search.twitter.com/search?q=&tag=$1&lang=all">#$1</a>');
      return text;
    }
  }

  $.fn.latestTweet = function(username, options) {
    // if no username is specified, we can't proceed
    if(typeof username != 'string')
      return;

    return this.each(function () {
      new LatestTweet(this, options).init(username);
    });
  };

  $.fn.latestTweet.defaults = {
    formatLinks: true,          // format url's to a clickable link
    formatMentions: true,       // format @username to a link to the users profile
    formatHashes: true,         // format #tag to a link to the twitter tag search
    callback: function() {}     // function that will be called after the latest tweet has been filled in.
  };

})(jQuery, window, document);