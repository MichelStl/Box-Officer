//On load les autre JavaScript avant de pouvoir commencer pour pouvoir les utiliser avec 
// l'interaction utilisateur
document.writeln("<script type='text/javascript' src='js/wikipedia.js'></script>");
document.writeln("<script type='text/javascript' src='js/themoviedb.js'></script>");
document.writeln("<script type='text/javascript' src='js/youtubeScript.js'></script>");
document.writeln("<script type='text/javascript' src='js/ebayScript.js'></script>");
document.writeln("<script type='text/javascript' src='js/openweather.js'></script>");
document.writeln("<script type='text/javascript' src='js/google.js'></script>");



(function () {
  document.getElementById("navbar").innerHTML +=
    '<div class="col-md-4">' +
    '<h5 class="padHeadTitle"><a class="badge badge-light dkGray" href="./index.html">Box-Officer</a></h5>' +
    '</div>' +
    '<div class="col-md-4">' +
    '<div id="filmSearch" class="input-group">' +
    '<div class="input-group-prepend">' +
    '<span  class="input-group-text"><i class="fas fa-search"></i></span >' +
    '</div>' +
    '<input id="searchInput" type="text" class="form-control" placeholder="Movie, TV Show...">' +
    '</div></div>' +
    '<div class="col-md-4">' +
    '<span id="weather"></span>' +
    '<p style="float : right;" class="padAPropos"><a href="./about.html"><span class="badge badge-light ltGray txtAPropos">About</span></a></p>' +
    '</div>';

  document.getElementById("footer").innerHTML +=
    '<div class="alert alert-light" role="alert" style=" margin-top:12rem;margin-bottom: 0px;position: fixed;width: 100%;bottom:0;text-align: center;' +
    'height: 1,1rem;z-index=999;">' +
    '<p>Braught to you by Jean-Félix St-Hilaire and Michel St-Laurent - &#9400; 2019</p>' +
    '</div>';
})();

function sortDate() {
  document.getElementById('searchInput').value = "";
  document.getElementById("btnPop").setAttribute("class", "btn btn-outline-secondary");
  document.getElementById("btnReleaseDate").setAttribute("class", "btn btn-outline-secondary active");
  fetchPageDiscover(1, "releaseDate");
};

function sortPop() {
  document.getElementById('searchInput').value = "";
  document.getElementById("btnReleaseDate").setAttribute("class", "btn btn-outline-secondary");
  document.getElementById("btnPop").setAttribute("class", "btn btn-outline-secondary active");
  fetchPageDiscover(1, "pop");
};

function LoadBody() {
  document.getElementById('searchInput').value = "";
  fetchPageDiscover(1, "pop");
  getLocation();
  
}

function fetchInfoPage(id) {
  document.location.href = "./detail.html?id=" + encodeURIComponent(id);
}

function loadDetail() {
  var url = document.location.href,
    params = url.split('?')[1],
    data = params.split('=')[1];
  fetchMovieInfo(data);
  getLocation();
}


function ShowBtn() {
  document.getElementById("btnCast").style.display = "flex";
}
function hideBtn() {
  document.getElementById("btnCast").style.display = "none";
}