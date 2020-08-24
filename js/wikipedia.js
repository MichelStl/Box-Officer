var wikiPath = "http://en.wikipedia.org/w/api.php?action=opensearch&format=json&gsrlimit=1&origin=*&search=";
var result = "";

function searchWiki(search, id) {
    var result = {Name : "", Link : "" , Text : ""};
    $.ajax({
        type: "GET",
        async: false,
        url: wikiPath + search,
        success: function (res) {
            console.log(res);
            result.Name = res['0'];
            result.Link = res['3']['0'];
            result.Text = res['2']['0'];
        }, error: function (res) {
            alert("L'api de Wikipedia ne répond pas!");
        }
    });
    return result;
}
