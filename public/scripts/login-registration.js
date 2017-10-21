$(document).ready(function () {
    $("#nav-bar #login").on('submit', function(event) {
        event.preventDefault();

        let data = {};
        let formdata = $(this).serializeArray();

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
                    $('#login').toggle();
                    $('.new-tweet').slideDown(500);
                    $('#logged-in').toggle();
                }
            });
        } else if (document.activeElement.id==='registerBtn'){
            $.ajax({
                method: 'POST',
                url: '/users/new' ,
                data: data,
            }).done(function (data){
                loadTweets();
                if(data.error){
                    $('#login .error-message').text('Username is being used!').show().fadeOut(3000);
                } else {
                    $('#login').toggle();
                    $('#logged-in').toggle();
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
  });

