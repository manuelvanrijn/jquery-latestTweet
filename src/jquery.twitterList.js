;( function( $, window, document, undefined ) {
  
  var TwitterList = function( elem, options ) {
    this.elem = elem;
    this.$elem = $(elem);
    this.config = $.extend( {}, $.fn.twitterList.defaults, options );
  };

  TwitterList.prototype = {
    init: function( username ) {
      // I prefer not using the name "that"
      var _instance = this;
      var url = _instance.getUrl( username );

      $.getJSON( url, function(data) {
				// check if target is a UL
				var ul;
				if( _instance.elem.tagName === 'UL' ) {					
					ul = _instance.$elem;
				}
				else {
					ul = $( '<ul />' ).appendTo( _instance.$elem );
				}
					
				for(var i = 0, length = data.length; i < length; i++) {
					var text = $( '<p />' ).html( _instance.formatTweet( data[i].text ) );
					var link = $( '<a />' ).attr( 'href', 'http://twitter.com/' + data[i].user.screen_name ).attr( 'target', '_blank' );
					var image = $('<img />' ).attr( 'src', data[i].user.profile_image_url ).appendTo(link);
					
					var avatarDiv = $( '<div />' ).addClass( 'tweet_avatar' ).append( link );
					var tweetText = $( '<div />' ).addClass( 'tweet_text' ).append( text );
					var li = $( '<li />' ).append( avatarDiv ).append( tweetText );
					
					ul.append( li );
				}
      }); 

      return this;
    },
    getUrl: function( username ) {
      var proto = ('https:' == document.location.protocol ? 'https:' : 'http:');
			return proto + '//api.twitter.com/1/lists/statuses.json?owner_screen_name=' + username + '&slug=' + this.config.list + '&per_page=' + this.config.count + '&callback=?'
    },
    formatTweet: function( text ) {
      var regexpLinkUrl = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
      var regexpLinkUser = /[\@]+([A-Za-z0-9-_]+)/gi;
      var regexpLinkHash = /[\#]+([A-Za-z0-9-_]+)/gi;

      if( this.config.formatLinks )
        text = text.replace( regexpLinkUrl, '<a href="$1">$1</a>' );
      if( this.config.formatMentions )
        text = text.replace( regexpLinkUser, '<a href="http://twitter.com/$1">@$1</a>' );
      if( this.config.formatHashes )
        text = text.replace( regexpLinkHash, '<a href="http://search.twitter.com/search?q=&tag=$1&lang=all">#$1</a>' );
      return text;
    }
  }

  $.fn.twitterList = function( username, options ) {
    // if no username or list is specified, we can't proceed
    if( typeof username != 'string' || typeof options.list != 'string')
      return;

    return this.each(function() {
      new TwitterList( this, options ).init( username );
    });
  };

  $.fn.twitterList.defaults = {
    formatLinks: true,          // format url's to a clickable link
    formatMentions: true,       // format @username to a link to the users profile
    formatHashes: true,         // format #tag to a link to the twitter tag search
		count: 1,										// number of tweets to retrieve
		list: undefined,						// list to get tweets from
    callback: function() {}     // function that will be called after the latest tweet has been filled in.		
  };

})( jQuery, window, document );