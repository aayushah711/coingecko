var base_url = "https://api.coingecko.com/api/v3"

function ping(){
    xhr = new XMLHttpRequest();

    xhr.open("GET", url+"/ping");
    xhr.send();
    xhr.onload = function(){
        console.log(xhr.status)
        var data = JSON.parse(this.response);
        console.log(data);
    }

}

// var search = document.getElementById("search");
// search.addEventListener("click", search)

var ping = document.getElementById("ping");
ping.addEventListener("click", ping)