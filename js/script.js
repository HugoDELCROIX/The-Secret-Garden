$(document).mousemove(function (e) {
    $("#net").css({
        left: e.pageX - 1,
        top: e.pageY - 1
    });
});

setInterval(function () {
    $("body").toggleClass('night');
}, 5000);