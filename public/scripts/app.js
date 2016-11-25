/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
      $('section.tweets').prepend(createTweetElement(tweet));
    });
  }

  function createTweetElement(tweet) {
    var firstName       = tweet.user.name;
    var smallAvatarUrl  = tweet.user.avatars.small;
    var tag             = tweet.user.handle;
    var content         = tweet.content.text;
    var epoch           = tweet.created_at;
    var newTime         = new Date(epoch);
    var timeStamp       = moment(newTime).fromNow();

    var $tweet  = $('<article>').addClass('tweet');
    var $header = $('<header>').addClass('tweet-header');
    var $footer = $('<footer>').addClass('tweet-footer');

    $header.append($(`<img
                    src="${smallAvatarUrl}">`).addClass('avatar'));
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

  function sendAjax(url, method, data) {
    return $.ajax({ url: url, method: method, data: data });
  }

  function loadTweets() {
    return sendAjax('/tweets', 'GET', {})
  }

  function createTweet(data) {
    return sendAjax('/tweets', 'POST', data) 
  }


  $('.submit-form').on('submit', function(event) {
    event.preventDefault();
    var formData   = $(this).serialize();
    var tweetInput = $('textarea').val();
    var alertsEl   = $('.alerts'); 
    if(tweetInput === '') {
      alertsEl.text('Cat Got Your Tongue?');
      alertsEl.fadeIn(1000);
      alertsEl.fadeOut(1000);
    } else if(tweetInput.length > 140) {
      alertsEl.text('Too Many Characters!');
      alertsEl.fadeIn(1000);
      alertsEl.fadeOut(1000);
    } else {
      createTweet(formData).then(loadTweets).then(renderTweets)

      $('.compose-container').slideToggle(1000);
      $('.counter').removeClass('max');
      $('.counter').text('140 Characters Left');
      this.reset();
    }

  });

  // using 'on' can be handy in specifying a scope
  // when dynamically loading elements that need the handlers
  // otherwise newly loaded elements might not have working
  // handlers
  // you can do stuff like $('.container').on('click', '.el-inside-container', function...
  $('.new-tweet').on('mouseenter', function() {
    $('.compose-container').slideToggle(1000);
    $('.textarea').select();
  });

  $('.register').on('click', function(e) {
    e.preventDefault();
    $('#nav-bar p').text('PSYCH!').fadeOut(1000);
  });

  loadTweets().then(renderTweets);
});
