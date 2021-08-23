var scholarDict;
var rankDict;
var scholarInfoList;

function fetchMMRData(ronin_addr){

}

function display(rank, scholarInfo) {
    $("#mmrTable tbody").append("<tr>" +
        "<td>"+ String(rank) + "</td>" +
        "<td>" + scholarInfo.name + "</td>" +
        "<td>"+ scholarInfo.mmr + "</td>" +
        "<td>"+ scholarInfo.rank + "</td>" +
        "</tr>");
}

function fetchData(ronin_addr){
    var raw = "";
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    var addr = "https://game-api.skymavis.com/game-api/leaderboard?client_id=" + ronin_addr.replace("ronin:", "0x");
    //var addr = "https://game-api.skymavis.com/game-api/clients/0x0d670459536e4974c0b61453b07e20aea4c2914f/items";
    return fetch(addr, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));


}

function getMMR(json_data) {
    return json_data.items[11].elo;
}

function getName(json_data) {
    return json_data.items[11].name;
}

function getSeasonRank(json_data){
    return json_data.items[11].rank;
    //return json_data.walletData.pvpData.rank;
}

function processProfile(){

    var leader = JSON.parse(leaderboard);

    leader.sort(function(a, b) {
      return a.rank - b.rank;
    });

    leader.forEach((item, i) => {
        display(i+1, item)
    });


}

async function try_(){
    mmr_data = await fetchMMRData("ronin:b2b3959abc631ffc324294f44ebfb81afc231cbc");
    console.log(mmr_data.items[11].name);
    console.log(mmr_data.items[11].elo);
}


document.addEventListener("DOMContentLoaded", function() {
    scholarDict = {};
    rankDict = {};
    scholarInfoList = [];

    if ($("#mmrTable tbody").length == 0) {
        $("#mmrTable").append("<tbody></tbody>");
    }



    processProfile();

    $("#last_update").append("<p>Last Update:" + last_update + "</p>");
    console.log(today);


    //try_();
});



/*
document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
    const table = th.closest('table');
    Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
        .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
        .forEach(tr => table.appendChild(tr) );
})));*/
