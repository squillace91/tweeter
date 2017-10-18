$(document).ready(function(){/*
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
    .append($("<span>").text(tweetJS.created_at))
    .append($("<img>").attr("src", 'https://dummyimage.com/20x20/000000/0011ff.jpg'))
    .append($("<img>").attr("src", 'https://dummyimage.com/20x20/000000/0011ff.jpg'))
    .append($("<img>").attr("src", 'https://dummyimage.com/20x20/000000/0011ff.jpg'));
}

function createTweetElement(tweetJS) {

    let tweet = $("<article>").addClass("tweet")
        .append(createTweetElementHeader(tweetJS.user))
        .append($("<p>").text(tweetJS.content.text).addClass("tweet-content"))
        .append(createTweetElementFooter(tweetJS))

    return tweet;            
}

function renderTweets(tweets) {
    // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
    // tweets.forEach(function(elem){
    //     let $tweet = createTweetElement(elem);
    //     $('#container-tweets').append($tweet);
    // });
    $('#container-tweets').append(tweets.map(createTweetElement));
}

// Fake data taken from tweets.json
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

renderTweets(data);
});