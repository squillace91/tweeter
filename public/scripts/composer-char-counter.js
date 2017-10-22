$(document).ready(function () {
    $(".new-tweet textarea").on('input', function () {
        const counter = $(this).siblings('.counter');
        const maxLimit = 140;
        let textLength = this.value.length;

        if (textLength > maxLimit) {
            counter.addClass("limit-text");
        } else {
            counter.removeClass("limit-text");
        }

        counter.text(maxLimit - textLength);
    });
});