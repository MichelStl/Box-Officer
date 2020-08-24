var ebaySearch = "https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&GLOBAL-ID=EBAY-ENCA&SECURITY-APPNAME=JeanFlix-Applicat-PRD-83882c1d0-bbdc372b&RESPONSE-DATA-FORMAT=XML&categoryId=617&paginationInput.entriesPerPage=5&itemFilter(0).name=Condition&itemFilter(0).value=1000&itemFilter(1).paramName=Currency&itemFilter(1).paramValue=CAD&CONTENT-TYPE=XML&Origin=*&keywords=";
//voir https://cors-anywhere.herokuapp.com/ & https://medium.com/netscape/hacking-it-out-when-cors-wont-let-you-be-great-35f6206cc646
var CORSbypass = "https://cors-anywhere.herokuapp.com/";

function getMovie(s) {
    var sreplace = s.replace(/ /g, '%20');
    sreplace = sreplace.replace(/&/g, '%26');
    var movie = { Title: null, Price: null, Link: null };
    $.ajax({
        type: "GET",
        url: CORSbypass + ebaySearch + sreplace,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Custom-Header': 'value',
            'Accept': 'application/json',
        },
        success: function (res) {
            console.log("reussi");
            var result = res;
            if (result.all[9].innerHTML != 0) {
                movie = {
                    Title: result.all[4].children[0].children[1].innerHTML,
                    Price: result.all[4].children[0].children[12].children[0].innerHTML,
                    Link: result.all[4].children[0].children[5].innerHTML
                }
                document.getElementById("btnEbay").setAttribute("onClick", "location.href='" + movie.Link + "'");
                document.getElementById("btnEbay").innerHTML += "<br/>" +  movie.Price + "$CAD";
            } else {
                console.log("aucun resultat trouvé :-(");
                document.getElementById("btnEbay").setAttribute("disabled", true);

            }

        }, error: function (res) {
            console.log(res);
            console.log(ebaySearch + sreplace);
            alert("L'api de Ebay ne répond pas!");
        }
    });
    console.log("return");
    return movie;
}


