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
        .append($("<i>").attr("data-tweetid",tweetJS._id).text(tweetJS.likes).addClass("fa fa-heart fa-lg likes"))
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
    // document.cookie = 'coooookie';
    // console.log('cookie client side',$(document.cookie));
    $.ajax({
      method: 'get',
      url: '/tweets'
    }).done(function (tweets) {
      // document.cookie = tweets.sess;
      // console.log('cookie client side',$(document.cookie));
      console.log(tweets.session);
      if(tweets.session.user_id){
        console.log('logged in');
        $('#login').hide();
        $('.new-tweet').slideDown(500);
        $('#logged-in').show();
        $('#user-name').text(tweets.session.username).show();
      } else {
        console.log('not logged in');
      }
      renderTweets(tweets.tweets);
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
        const id = this.dataset.tweetid;
        $.ajax({
            method: 'PUT',
            url: '/tweets/likes/' + id ,
        }).done(function (){
            loadTweets();
        });
    });
  });

  $("#nav-bar #login").on('submit', function(event) {
    event.preventDefault();

    let data = {};
    let formdata = $(this).serializeArray();
    let theForm = this;

    $(formdata).each(function(index, obj){
        data[obj.name] = obj.value;
    });

    if(document.activeElement.id==='loginBtn'){
        $.ajax({
            method: 'POST',
            url: '/users/login' ,
            data: data,
        }).done(function (data){
            if(data.length === 0){
                $('#login .error-message').text('Username does not exist!').show().fadeOut(3000);
            } else {
                theForm.reset();
                loadTweets();
                $('.new-tweet').slideDown(500);
            }
        });
    } else if (document.activeElement.id==='registerBtn'){
        $.ajax({
            method: 'POST',
            url: '/users/new' ,
            data: data,
        }).done(function (data){
            if(data.error){
                $('#login .error-message').text('Username is being used!').show().fadeOut(3000);
            } else {
                theForm.reset();  
                loadTweets();
            }
        });
    }
    
});

$("#nav-bar #logoutBtn").click(function() {
    $.ajax({
        method: 'POST',
        url: '/users/logout' ,
    });
    $('.new-tweet').slideUp(500);
    $('#logged-in').toggle();
    $('#login').toggle();
});



  loadTweets();
});