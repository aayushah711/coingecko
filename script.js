var base_url = "https://api.coingecko.com/api/v3"

var popularCurrencies = [
        {
        "id": "bitcoin",
        "symbol": "btc",
        "name": "Bitcoin",
        "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
        "current_price": 9616.12,
        "market_cap": 176695025001,
        "market_cap_rank": 1,
        "total_volume": 23280194256,
        "high_24h": 9838.02,
        "low_24h": 9567.29,
        "price_change_24h": -175.65751178,
        "price_change_percentage_24h": -1.79393,
        "market_cap_change_24h": -3434174585.10464,
        "market_cap_change_percentage_24h": -1.90651,
        "circulating_supply": 18395675,
        "total_supply": 21000000,
        "ath": 19665.39,
        "ath_change_percentage": -51.1566,
        "ath_date": "2017-12-16T00:00:00.000Z",
        "atl": 67.81,
        "atl_change_percentage": 14065.15248,
        "atl_date": "2013-07-06T00:00:00.000Z",
        "roi": null,
        "last_updated": "2020-06-06T05:25:33.449Z"
        },
        {
        "id": "ethereum",
        "symbol": "eth",
        "name": "Ethereum",
        "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1547034048",
        "current_price": 240.08,
        "market_cap": 26660359794,
        "market_cap_rank": 2,
        "total_volume": 8554565693,
        "high_24h": 246.44,
        "low_24h": 238.66,
        "price_change_24h": -3.74253542,
        "price_change_percentage_24h": -1.53496,
        "market_cap_change_24h": -456256939.024151,
        "market_cap_change_percentage_24h": -1.68257,
        "circulating_supply": 111232215.1865,
        "total_supply": null,
        "ath": 1448.18,
        "ath_change_percentage": -83.44943,
        "ath_date": "2018-01-13T00:00:00.000Z",
        "atl": 0.432979,
        "atl_change_percentage": 55256.5466,
        "atl_date": "2015-10-20T00:00:00.000Z",
        "roi": {
            "times": 32.409498382958766,
            "currency": "btc",
            "percentage": 3240.949838295877
        },
        "last_updated": "2020-06-06T05:25:17.389Z"
        },
        {
        "id": "tether",
        "symbol": "usdt",
        "name": "Tether",
        "image": "https://assets.coingecko.com/coins/images/325/large/tether.png?1547034089",
        "current_price": 0.99978,
        "market_cap": 9280025402,
        "market_cap_rank": 3,
        "total_volume": 27847128974,
        "high_24h": 1,
        "low_24h": 0.997911,
        "price_change_24h": -0.00036879,
        "price_change_percentage_24h": -0.03687,
        "market_cap_change_24h": 12979317,
        "market_cap_change_percentage_24h": 0.14006,
        "circulating_supply": 9282071390.88765,
        "total_supply": 7509779844,
        "ath": 1.32,
        "ath_change_percentage": -24.43631,
        "ath_date": "2018-07-24T00:00:00.000Z",
        "atl": 0.572521,
        "atl_change_percentage": 74.62758,
        "atl_date": "2015-03-02T00:00:00.000Z",
        "roi": null,
        "last_updated": "2020-06-06T05:09:30.193Z"
        },
        {
        "id": "ripple",
        "symbol": "xrp",
        "name": "XRP",
        "image": "https://assets.coingecko.com/coins/images/44/large/xrp.png?1564480400",
        "current_price": 0.202703,
        "market_cap": 8940136163,
        "market_cap_rank": 4,
        "total_volume": 1226859653,
        "high_24h": 0.206172,
        "low_24h": 0.202086,
        "price_change_24h": -0.00198561,
        "price_change_percentage_24h": -0.97006,
        "market_cap_change_24h": -84997803.67462161,
        "market_cap_change_percentage_24h": -0.94179,
        "circulating_supply": 44112853111,
        "total_supply": 100000000000,
        "ath": 3.4,
        "ath_change_percentage": -94.03654,
        "ath_date": "2018-01-07T00:00:00.000Z",
        "atl": 0.00268621,
        "atl_change_percentage": 7444.6581,
        "atl_date": "2014-05-22T00:00:00.000Z",
        "roi": null,
        "last_updated": "2020-06-06T05:25:26.339Z"
        }
    ]

function pingSite(){
    xhr = new XMLHttpRequest();

    xhr.open("GET", base_url+"/ping");
    xhr.send();
    xhr.onload = function(){
        console.log(xhr.status)
        var data = JSON.parse(this.response);
        console.log(data);
    }

}

function showPopularCurrencies(){
    console.log("searching popular currencies")
    xhr = new XMLHttpRequest();
    
    var params = new URLSearchParams()
    params.append("vs_currency", "usd")
    params.append("order", "market_cap_desc")
    params.append("per_page", "5")
    params.append("page", "2")
    params.append("price_chage_percentage", "24h")
    xhr.open("GET", base_url+"/coins/markets?"+params);
    
    xhr.setRequestHeader("accept", "application/json")
    xhr.send();
    xhr.onload = function(){
        console.log(xhr.status)
        var data = JSON.parse(this.response);
        console.log(data);
        renderDOM(data)
    }

    

}

function renderDOM(data){
    var activePage = 1;
    var total = 50;
    var totalPages = 50;
    var perPage = 5;
    var arr = data

    var result = document.getElementById("result")

    arr.forEach(function(cryptocurrency){
        var div = createCard(cryptocurrency)
        result.append(div)
    })

    function createCard(cryptocurrency){
        var div = document.createElement("div")
        var id = document.createElement("div");
        id.innerText = "Id: " + cryptocurrency.id
        var name = document.createElement("div");
        name.innerText = "Name: " + cryptocurrency.name
        var img = document.createElement("img")
        img.setAttribute("src", cryptocurrency.image)

        div.append(id,name,img);
        return div

    }
}
var ping = document.getElementById("ping");
ping.addEventListener("click", pingSite)

var btnPopularCurrencies = document.getElementById("popularCurrencies");
btnPopularCurrencies.addEventListener("click", function(){
    // location = "popularCurrencies.html"
    showPopularCurrencies()
})


// function searchCoin(){
//     var searchValue = event.target.previousSibling.previousSibling.value
//     console.log(searchValue)
// }
// var search = document.getElementById("search");
// search.addEventListener("click", searchCoin)
