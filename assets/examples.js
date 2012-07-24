$(function() {

  $('#demo1 p').latestTweet('bbcnews');

  $('#demo2 p').latestTweet('bbcnews', {
    formatLinks: false,
    formatMentions: false,
    formatHashes: false
  });

  $('#demo3start').click(function(e) {
    e.preventDefault();
    $("#log").text('start getting latest tweet');
    $('#demo3 p').latestTweet('foxnews', {
      callback: function() {
        $("#log").text('finished!');
      }
    });
  });

});
