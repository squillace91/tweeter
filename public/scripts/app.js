$(document).ready(function() {/*
  * Client-side JS logic goes here
  * jQuery is already loaded
  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
  */

  function createTweetElementHeader(user) {
      return $("<header>")
        .append($("<img>").attr("src", user.avatars.small))
        .append($("<h2>").text(user.name))
        .append($("<p>").text(user.handle));
  }

  function createTweetElementFooter(tweetJS) {
      return $("<footer>")
        .append($("<span>").text(moment(tweetJS.created_at).fromNow()))
        .append($("<i>").attr("data-userid",tweetJS._id).text(tweetJS.likes).addClass("fa fa-heart fa-lg likes"))
        .append($("<i>").addClass("fa fa-retweet fa-lg"))
        .append($("<i>").addClass("fa fa-flag fa-lg"));
  }

  function createTweetElement(tweetJS) {

      const tweet = $("<article>").addClass("tweet")
        .append(createTweetElementHeader(tweetJS.user))
        .append($("<p>").text(tweetJS.content.text).addClass("tweet-content"))
        .append(createTweetElementFooter(tweetJS))

      return tweet;            
  }

  var allTweets = $('#container-tweets');

  function renderTweets(tweets) {
      // loops through tweets
        // calls createTweetElement for each tweet
        // takes return value and appends it to the tweets container
      allTweets.empty();   
      //TODO use for of   
      tweets.forEach(function(elem) {
          let $tweet = createTweetElement(elem);
          $('#container-tweets').prepend($tweet);
      });
  }

  function loadTweets() {
    $.ajax({
      method: 'get',
      url: '/tweets'
    }).done(function (tweets) {
      renderTweets(tweets);
    });
  }

  // TODO Put this submit function in another file
  $('.new-tweet form').on('submit', function(event) {
    event.preventDefault();
    var theForm = this;
    var data = $(this).serialize();
    console.log(data);
    console.log(data);
    var tweetCount = $(".new-tweet textarea").val().length;

    if (tweetCount > 140) {
      $('.error-message').text('Tweet too long!').show().fadeOut(1500);
    } else if (tweetCount <= 0) {
      $('.error-message').text('Empty tweet!').show().fadeOut(1500);
    } else {
      $(".new-tweet .counter").text('140');
      //TODO make it a function instead sending the data and the form
      $.ajax({
        method: 'post',
        url: '/tweets',
        data: data
      }).done(function (){
        theForm.reset();
        loadTweets();
      });
    }
  })

  $(document).ready(function() {
    $(document).on('click','.likes',function() {
        const id = this.dataset.userid;
        $.ajax({
            method: 'PUT',
            url: '/tweets/likes/' + id ,
        }).done(function (){
            loadTweets();
        });
    });
  });

  loadTweets();
});