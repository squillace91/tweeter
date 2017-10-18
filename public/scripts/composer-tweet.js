$(document).ready(function () {
  $("#nav-bar button").click(function() {
    console.log('hello');
    $( ".new-tweet" ).slideToggle( "slow", function() {
      $(".new-tweet textarea").focus();
    });
  });
});