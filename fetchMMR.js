 var scholarDict;
var rankDict;
var scholarInfoList;

function fetchMMRData(ronin_addr){

}
/*
function display(rank, scholarInfo) {
    $("#mmrTable tbody").append("<tr>" +
        "<td>"+ String(rank) + "</td>" +
        "<td>" + scholarInfo.name + "</td>" +
        "<td>"+ scholarInfo.mmr + "</td>" +
        "<td>"+ scholarInfo.rank + "</td>" +
        "</tr>");
}*/
function display(rank, scholarInfo) {
    $("#mmrTable tbody").append('<tr class="row100 body">' +
        '<td class="cell100 column1">'+ String(rank) + "</td>" +
        '<td class="cell100 column1" >' + scholarInfo.name + "</td>" +
        '<td class="cell100 column1" >'+ scholarInfo.mmr + "</td>" +
        '<td class="cell100 column1" >'+ scholarInfo.rank + "</td>" +
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

    var firebaseConfig = {
      apiKey: "AIzaSyDlbyEUYiZwaYp89qtPBw6p4Tu0V3aW-As",
      authDomain: "epps-5f1e3.firebaseapp.com",
      databaseURL: "https://epps-5f1e3-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "epps-5f1e3",
      storageBucket: "epps-5f1e3.appspot.com",
      messagingSenderId: "763329415950",
      appId: "1:763329415950:web:e2b831a6a5b620d34e255f",
      measurementId: "G-ZFFNNXQVKP"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


    const dbRef = firebase.database().ref("scholars");
    const usersRef = dbRef.child('scholars');

    scholarList = [];

    dbRef.on("value", snap => {
       let user = snap.val();
       scholarList = Object.values(user);
       //console.log(Object.values(user))

       scholarList.sort(function(a, b) {
         return b.mmr - a.mmr;
       });

       console.log(scholarList)

       scholarList.forEach((item, i) => {
           display(i+1, item)
       });
   });


   const last_update_ref = firebase.database().ref("lastupdate");
   last_update_ref.on("value", snap => {

      $("#last_update").append("<p>Last Update:" + Object.values(snap.val())[0] + "</p>");

   });
}

document.addEventListener("DOMContentLoaded", function() {
    scholarDict = {};
    rankDict = {};
    scholarInfoList = [];

    if ($("#mmrTable tbody").length == 0) {
        $("#mmrTable").append("<tbody></tbody>");
    }



    processProfile();




    //try_();
});



/*
document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
    const table = th.closest('table');
    Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
        .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
        .forEach(tr => table.appendChild(tr) );
})));*/
