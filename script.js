var base_url = "https://api.coingecko.com/api/v3"

function showPopularCurrencies(){
    console.log("searching popular currencies")

    var query = new URLSearchParams(location.search)
    var page = query.get("page") || 1

    var sort = document.getElementById("sort").value
    var order = document.getElementById("order").value

    var xhr = new XMLHttpRequest();
    
    var params = new URLSearchParams()
    params.append("vs_currency", "usd")
    params.append("order", sort+order)
    params.append("per_page", "10")
    params.append("page", page)
    params.append("price_chage_percentage", "24h")
    xhr.open("GET", base_url+"/coins/markets?"+params);
    
    xhr.setRequestHeader("accept", "application/json")
    xhr.send();
    xhr.onload = function(){
        console.log(xhr.status)
        var data = JSON.parse(this.response);
        renderDOM(data)
    }
}

function renderDOM(data){
    var arr = data

    var result = document.getElementById("result")
    result.innerHTML = ""

    var pages = document.createElement("div")
    for (var i=0;i<10;i++){
        var a = document.createElement("a")
        a.innerText = (i+1)
        a.href = "popularCurrencies.html?page="+ (i+1)
        a.style.padding = "10px"
        pages.appendChild(a)
    }
    document.body.insertBefore(pages, result)
    // result.append(pages)

    arr.forEach(function(cryptocurrency){
        var div = createCard(cryptocurrency)
        result.append(div)
    })

    function createCard(cryptocurrency){
        var div = document.createElement("div")
        div.setAttribute("class","card")
        var img = document.createElement("img")
        img.setAttribute("src", cryptocurrency.image)
        var name = document.createElement("div");
        name.innerText = "Name: " + cryptocurrency.name
        var id = document.createElement("div");
        id.innerText = "Id: " + cryptocurrency.id

        div.append(img,name,id);
        return div

    }
}


// function searchCoin(){
//     var searchValue = event.target.previousSibling.previousSibling.value
//     console.log(searchValue)
// }
// var search = document.getElementById("search");
// search.addEventListener("click", searchCoin)
