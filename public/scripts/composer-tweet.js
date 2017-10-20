$(document).ready(function () {
  $("#nav-bar button").click(function() {
    $( ".new-tweet" ).slideToggle( "slow", function() {
      $(".new-tweet textarea").focus();
    });
  });
});