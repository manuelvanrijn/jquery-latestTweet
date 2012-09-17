# jQuery LatestTweet

## Why oh why?

Of course there're a lot of plugins but I just want a simple clean plugin that just returns me the formated latest tweet of a user.

## Example

### Import the javascript

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
<script src="src/jquery.latestTweet.js"></script>
```

### Engage the plugin

```javascript
$('#element_for_tweet').latestTweet('manuelvanrijn');
```

### Plugin defaults

The plugin has some default options you can override when executing the plugin:

```javascript
$('#element_for_tweet').latestTweet('manuelvanrijn', {
	formatLink: false,
	formatHashes: false
});
```

You can also override the global default values if you want a different default behaviour.
For instance, you can override the global default value for `formatLink` by defining:

```javascript
$.fn.latestTweet.defaults.formatLink = false;
```

## Default options

Here's a list with the available default options

```javascript
{
    formatLinks: true,          // format url's to a clickable link
    formatMentions: true,       // format @username to a link to the users profile
    formatHashes: true,         // format #tag to a link to the twitter tag search
    callback: function() {}     // function that will be called after the latest tweet has been filled in.
}
```

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/fc117b93ff9a8abb7375c79e4a242efa "githalytics.com")](http://githalytics.com/manuelvanrijn/jquery-latestTweet)