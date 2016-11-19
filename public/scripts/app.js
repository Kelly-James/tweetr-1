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

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(data) {
        renderTweets(data);
      }
    });
  }

  $('.submit-form').on('submit', function(event) {
    event.preventDefault();
    var formData = $(this).serialize();
    var tweetInput = $('textarea').val();
    if(tweetInput === '') {
      $('.alerts').text('Cat Got Your Tongue?');
      $('.alerts').fadeIn(1000);
      $('.alerts').fadeOut(1000);
    } else if(tweetInput.length > 140) {
      $('.alerts').text('Too Many Characters!');
      $('.alerts').fadeIn(1000);
      $('.alerts').fadeOut(1000);
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: formData,
        success: function(data) {
          loadTweets();
        }
      });
      $('.compose-container').slideToggle(1000);
      $('.counter').removeClass('max');
      $('.counter').text('140 Characters Left');
      this.reset();
    }

  });

  $('.new-tweet').mouseenter(function() {
    $('.compose-container').slideToggle(1000);
    $('.textarea').select();
  });

  $('.register').click(function() {
    event.preventDefault();
    $('#nav-bar p').text('PSYCH!').fadeOut(1000);
  })

  loadTweets();

});
