$(document).ready(function () {
  $("#nav-bar #composeBtn").click(function () {
    $(".new-tweet").slideToggle("slow", function () {
      $(".new-tweet textarea").focus();
    });
  });
});