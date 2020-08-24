var tmdbPath = "http://api.themoviedb.org/3/";
var tmdbApiKey = "api_key=3dfdb6301f37397ae5002887a301f75c"
var tmdbToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGZkYjYzMDFmMzczOTdhZTUwMDI4ODdhMzAxZjc1YyIsInN1YiI6IjVkYjhhYWNiYTFkMzMyMDAxN2U4NzM1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UvBCjciFS84ambVpzdZSnnEveLU0AMRg6QTVY0QBFK8"
var tmdbLangue = "&language=en-US"
var tmdbPage = "&page="
var query = "&query="
var tmdbImage = "https://image.tmdb.org/t/p/w500"
var tmdbImagetv = "https://image.tmdb.org/t/p/original/"

var tmdbDiscover = "discover/movie?"
var tmdbSearchMulti = "search/multi?"
var tmdbLatestMovie = "movie/latest?"
var tmdbinfoMovie = "movie/"
var tmdbinfoTv = "tv/"

var tmdbsort = "&sort_by="

var sortReleaseDateDesc = "release_date.desc"
var sortReleaseDate = "release_date.asc"
var sortPopularityDesc = "popularity.desc"
var sortPopularity = "popularity.asc"

function fetchPageDiscover(page, sort){
    var uri;
    if(sort == "releaseDate"){
    uri = encodeURI(tmdbPath + tmdbDiscover + tmdbApiKey + tmdbLangue + tmdbsort + sortReleaseDateDesc + tmdbPage + page)
    }else{
    uri = encodeURI(tmdbPath + tmdbDiscover + tmdbApiKey + tmdbLangue + tmdbsort + sortPopularityDesc + tmdbPage + page)
    }
    $.getJSON(uri).done(function (data) {
        display(data);
    }).fail(function () {
        alert("L'api ne répond pas!");
    });
}

function fetchPageSearch(page, search){
    $.getJSON(encodeURI(tmdbPath + tmdbSearchMulti + tmdbApiKey + tmdbLangue + query + search + tmdbPage + page)).done(function (data) {
        displaySearch(data);
    }).fail(function () {
        alert("L'api ne répond pas!");
    });
}

function fetchMovieInfo(id){
    $.getJSON(encodeURI(tmdbPath + tmdbinfoMovie + id + '?' +  tmdbApiKey + tmdbLangue )).done(function (data) {
        $.getJSON(encodeURI(tmdbPath + tmdbinfoMovie + id + '/credits?' +  tmdbApiKey + tmdbLangue )).done(function (datacrew) {
            displayMovie(data, datacrew);
        }).fail(function () {
            alert("L'api ne répond pas!");
        });
    }).fail(function () {
        alert("L'api ne répond pas!");
    });
}

function fetchTvInfo(id){
    $.getJSON(encodeURI(tmdbPath + tmdbinfoTv + id + '?' +  tmdbApiKey + tmdbLangue )).done(function (data) {
    }).fail(function () {
        alert("L'api ne répond pas!");
    });
}

$('#searchInput').keyup(function (e) {
    var search = $('#searchInput').val();
    if (search!= "") {
        document.getElementById("sort").style.display = "none";
        fetchPageSearch(1, search);
    } else {
        document.getElementById("sort").style.display = "flex";
        fetchPageDiscover(1, "pop");
    }
});

function display(data) {
    $('#title').empty();
    var div = $("");
    for (i in data.results) {
        var poster = "";
        if(data.results[i].poster_path == null || data.results[i].poster_path == "")
            poster = "./images/movieGenerique.png";
        else
            poster = encodeURI(tmdbImage + data.results[i].poster_path);
        div = $("<div>").attr('id', data.results[i].id).attr('class', 'col-md-2 card')
        .append($("<div>").attr('id', 'divInfo').attr("class", "card-header").append($("<b>").text(data.results[i].title)))
        .append($("<div>").attr('id', 'divImg').append($('<img>').attr('src', poster).attr('class', 'card-img-top')));
    div.append($('<button>').attr('class', 'btn btn-light').attr("OnClick","fetchInfoPage(" + data.results[i].id + ")").text('DETAILS'));
    div.appendTo($('#title'));

    }
    showPagination(data.page, data.total_pages);
}

function displaySearch(data) {
    $('#title').empty();
    var div = $("");
    for (i in data.results) {
        if (data.results[i].media_type == "movie") {
            var poster = "";
            if(data.results[i].poster_path == null || data.results[i].poster_path == "" || data.results[i].poster_path == "null")
                poster = "./images/movieGenerique.png";
            else
                poster = encodeURI(tmdbImage + data.results[i].poster_path);
            div = $("<div>").attr('id', data.results[i].id).attr('class', 'col-md-2 card')
                .append($("<div><bold>").attr('id', 'divInfo').attr("class", "card-header").append($("<b>").text(data.results[i].title)))
                .append($("<div>").attr('id', 'divImg').append($('<img>').attr('src', poster).attr('class', 'card-img-top')));
            div.append($('<button>').attr('class', 'btn btn-light').attr("OnClick","fetchInfoPage(" + data.results[i].id + ")").text('DETAILS'));
            div.appendTo($('#title'));
        }
        else if (data.results[i].media_type == "tv") {
            var poster = "";
            if(data.results[i].backdrop_path == null || data.results[i].backdrop_path == ""|| data.results[i].backdrop_path == "null"){
                poster = "./images/movieGenerique.png";
                div = $("<div>").attr('id', data.results[i].id).attr('class', 'col-md-2 card')
                .append($("<div><bold>").attr('id', 'divInfo').attr("class", "card-header").append($("<b>").text(data.results[i].name)))
                .append($("<div>").attr('id', 'divImg').append($('<img>').attr('src', poster).attr('class', 'card-img-top')));
            div.appendTo($('#title'));
            }
            else{
                poster = encodeURI(tmdbImagetv + data.results[i].backdrop_path);
                div = $("<div>").attr('id', data.results[i].id).attr('class', 'col-md-2 card')
                .append($("<div><bold>").attr('id', 'divInfo').attr("class", "card-header").append($("<b>").text(data.results[i].name)))
                .append($("<div>").attr('id', 'divImg').append($('<img>').attr('src', poster).attr('class', 'card-img-top-tv')));
            div.appendTo($('#title'));
            }
            

        }
    }
    showPagination(data.page, data.total_pages);

}

function ratingStar(number){
    var result = "";
    var numberDecimal = number.toLocaleString();
    var decimal = numberDecimal.split('.');
    for(i = 1; i <= number; i++){
        result += '<span class="fa fa-star checked"></span>';
    }
    if(decimal.length > 1){
        result += '<span class="fa fa-star-half-alt checked"></span>';
        for(i = number+1; i <= 10; i++){
            result += '<span class="far fa-star checked"></span>';
        }
    }else{
        for(i = number; i <= 10; i++){
            result += '<span class="far fa-star checked"></span>';
        }
    }
    
     return result;
}

function categorie(data){
    var result = " ";
    for(i = 0 ; i < data.genres.length; i++){
        result += data.genres[i].name;
        if(i < data.genres.length - 1){
            result += ", ";
        }
    }
    return result;
}
function cast(data){
    var result = "";
    var photo = "";
    for(i = 0; i < data.cast.length; i++ ) {
        if(i == 14){
            result += '<button id="btnCast" type="button" onClick="hideBtn()" style="margin : auto; justify-content:center; display:flex;" ' +
            'class="btn btn-outline-secondary" data-toggle="collapse" data-target="#cast">Affichez le reste de la distribution</button>' +
            '<div id="cast" class="collapse row" style="justify-content:center">';
        }
        if( data.cast[i].profile_path == null){
            photo = "./images/profile.png";
        }
        else{
            photo = tmdbImage +  data.cast[i].profile_path;
        }
        var link = searchWiki(data.cast[i].name);
        result += '<div class="w3-card-4 w3-center" title="' + link.Name +  +  link.Text  +'" style="width:200px;height:350px; display:inline-block;vertical-align:bottom">' + 
        '<img src="' + photo + '" alt="Alps" style="width:200px;height:250px;">' + 
        '<h4><a href="' + link.Link +'">' +  data.cast[i].name + "</a></h4><p> (" +  data.cast[i].character + ")</p>" + 
        '</div>'
    };
    if(data.cast.length > 14){
        result += '<br><button id="btnHideCast" type="button" onClick="ShowBtn()" style="margin : auto;" ' + 
        'class="btn btn-outline-secondary" data-toggle="collapse" data-target="#cast">Cachez une partie de la distribution</button>';
    }
    return result;
}

function crew(data){
    var result = "";
    data.crew.forEach(e => {
        if(!result.includes(e.department)){
            result += "<b>" + e.department + "</b> :";
            var dept = e.department;
            data.crew.forEach(sube => {
                if(sube.department == dept){
                    result += sube.name + ", ";
                }
            });
            result += "<br>";
        }
    });
    return result;
}

function prodCompagnie(data){
    var result = "";
    var photo = "";
    for(i = 0; i < data.length; i++ ) {
        if( data[i].logo_path == null){
            photo = "./images/profile.png";
        }
        else{
            photo = tmdbImage +  data[i].logo_path;
        }
        result += '<div class="w3-card-4 w3-center" style="width:142px;height:230px; display:inline-block;vertical-align:bottom">' + 
        '<img src="' + photo + '" alt="Alps" style="width:142px;height:142px;">' + 
        '<h4>' +  data[i].name + "</h4>" + 
        '</div>'
    };
    return result;
}

function displayMovie(data, crewdata){
    var movie = getMovie(data.title + '%20Movie%20(' + data.release_date.split('-')[0] + ')');
    document.getElementById("detailMoviePoster").setAttribute("src", tmdbImage + data.poster_path);
    document.getElementById("detailReleaseDate").innerText = "Release Date : " + data.release_date;
    document.getElementById("detailTitle").innerText = data.title;
    document.getElementById("detailRating").innerHTML = ratingStar(data.vote_average) + " " + data.vote_average;
    document.getElementById("detailCategorie").innerText = categorie(data);
    document.getElementById("detailResume").innerText = data.overview;
    document.getElementById("detailCast").innerHTML = cast(crewdata);
    document.getElementById("detailCrew").innerHTML = crew(crewdata);
    document.getElementById("Production_comp").innerHTML = prodCompagnie(data.production_companies);
    
}

function showPagination(page, pageTotal) {
    $('#pagination').empty();
   
    var method = "";
    var sort = "";
   
    if(document.querySelector('#btnPop').classList.contains('active'))
        sort = ",'Pop'";
    else
        sort = ",'releaseDate'";
    if(document.getElementById("searchInput").value == "")
        method = "fetchPageDiscover";
    else
        method = "fetchPageSearch";

    var start = page - 1;
    var total = 0;
    if((pageTotal - start) > 5){
        total = (start+6);
    }
    else{
        total = pageTotal;
    }
    var query = "";
        if(method == "fetchPageDiscover")
            query = method + "(" + (start) + sort + ")";
        else
        query = method + "(" + (start) + ",'" + $('#searchInput').val() + "')";
    var div = $("<li>").attr("class", "page-item").append("<a>").attr("class", "page-link").attr("onClick", query).text("Previous");
    div.appendTo($('#pagination'));
    if(page > 1){
        start --;
    }
    for (i = (start+1); i < total ; i++) {
        if(method == "fetchPageDiscover")
            query = method + "(" + i + sort + ")";
        else
            query = method + "(" + i + ",'" + $('#searchInput').val() + "')";
      if (page == i) {
        div = $("<li>").attr("class", "page-item active").append($("<a>").attr("class", "page-link active").attr("onClick", query).text(i));
        div.appendTo($('#pagination'));
      }
      else {
        div = $("<li>").attr("class", "page-item").append($("<a>").attr("class", "page-link").attr("onClick", query).text(i));
        div.appendTo($('#pagination'));
      }
    }
    var query = "";
        if(method == "fetchPageDiscover")
            query = method + "(" + (page+1) + sort + ")";
        else
        query = method + "(" + (page+1) + ",'" + $('#searchInput').val() + "')";
    var div = $("<li>").attr("class", "page-item").append("<a>").attr("class", "page-link").attr("onClick", query).text("Next");
    div.appendTo($('#pagination'));
}



