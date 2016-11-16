/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

 var data = [
   {
     "user": {
       "name": "Newton",
       "avatars": {
         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
       },
       "handle": "@SirIsaac"
     },
     "content": {
       "text": "If I have seen further it is by standing on the shoulders of giants"
     },
     "created_at": 1461116232227
   },
   {
     "user": {
       "name": "Descartes",
       "avatars": {
         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
       },
       "handle": "@rd" },
     "content": {
       "text": "Je pense , donc je suis"
     },
     "created_at": 1461113959088
   },
   {
     "user": {
       "name": "Johann von Goethe",
       "avatars": {
         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
       },
       "handle": "@johann49"
     },
     "content": {
       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
     },
     "created_at": 1461113796368
   }
 ];



  function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
      $('section.tweets').prepend(createTweetElement(tweet));
    });
  }

  function createTweetElement(tweet) {
    var firstName = tweet.user.name;
    var smallAvatarUrl = tweet.user.avatars.small;
    var tag = tweet.user.handle;
    var content = tweet.content.text;
    var timeStamp = tweet.created_at;

    var $tweet = $('<article>').addClass('tweet');
    var $header = $('<header>').addClass('tweet-header');
    var $footer = $('<footer>').addClass('tweet-footer');

    $header.append($(`<img src="${smallAvatarUrl}">`).addClass('avatar'));
    $header.append($(`<div>${firstName}</div>`).addClass('user'));
    $header.append($(`<div>${tag}</div>`).addClass('tag'));

    $tweet.append($header);

    $tweet.append($(`<div><p>${content}</p></div>`).addClass('content'));

    var $div = $('<div>').addClass('icons');
        ['fa fa-flag', 'fa fa-retweet', 'fa-heart'].forEach(function(icon) {
        $div.append($(`<i class="fa ${icon}"></i>`));
      })

    $footer.append($(`<p>${timeStamp}</p>`));

    $footer.append($div);

    $tweet.append($footer);


    return $tweet;
  }

  renderTweets(data);

})
