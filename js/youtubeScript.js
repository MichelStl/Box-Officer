var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&";
var key ="key=AIzaSyA51AnVe1X51T9gE00V7ZAb7101BjZzw3I";
var search = "";

function videoSearch() {
    search = $('#detailTitle').text();
    search += " (" + $('#detailReleaseDate').text().substring(15, 19) + ") (Official)Trailer";
    $.getJSON(encodeURI(url + 'q=' + search + '&' + key)).done(function (data) {
        $.each(data.items, function(index, item){
            if(item != "")
                $("#toRep").replaceWith($("<iframe class='video'>").attr("src", "https://youtube.com/embed/" + item.id.videoId));
        });
    }).fail(function () {
        alert("Youtube ne répond pas!");
    });
    $.getJSON(encodeURI("https://api.dailymotion.com/videos?channel=tv&languages=en&search=" + search + "&limit=1")).done(function (data){
        $.each(data.list, function(index, item){
            if(item != "")
                $("#toReplace").replaceWith($("<iframe allowfullscreen allow='autoplay'>").attr("src", "https://www.dailymotion.com/embed/video/" + item.id));
                    });
    }).fail(function () {
        alert("Dailymotion ne répond pas!");
    });
};