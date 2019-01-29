// Load Box value on start
// Indiquer l'adresse IP/url et la clé API de Jeedom (votre_cle_API_jeedom)

function initJeedomValue() {
    localStorage.setItem("IP", "192.168.1.250");
    localStorage.setItem("KEY", "votre_cle_API_jeedom");
}

// Save Box value

function saveJeedomValue() {
    var addressValue = document.getElementById("addressValue").value;
    var keyValue = document.getElementById("keyValue").value;
    localStorage.setItem("SavedAddress", addressValue);
    localStorage.setItem("SavedKey", keyValue);
}

// Load Box JSON value on start
// Indiquer l'adresse IP/url et la clé API de Jeedom (votre_cle_API_jeedom)

function initJeedomJsonValue() {

    var myKeyValue, myIPValue;

    myKeyValue = localStorage.getItem("KEY");
    myIPValue = localStorage.getItem("IP");
    console.log("KEY Value: " + myKeyValue);
    console.log("IP Value: " + myIPValue);

    var xhttp1; // JSON-Objects
    var xhttp2; // JSON-Commands
    var xhttp3; // JSON-Scenario

    // JSON-Objects
    xhttp1 = new XMLHttpRequest();
    xhttp1.open("POST", "http://" + myIPValue + "/core/api/jeeApi.php");
    xhttp1.setRequestHeader("Content-Type", "application/text/plain");
    xhttp1.send(JSON.stringify({
        "jsonrpc": "2.0",
        "method": "object::all",
        "params": {
            "apikey": "votre_cle_API_jeedom"
        },
        "id": 1
    }));
    // curl -d '{"jsonrpc": "2.0", "method":"object::all","params":{"apikey": "votre_cle_API_jeedom"}, "id":1}' http://192.168.1.x/core/api/jeeApi.php


    xhttp1.onreadystatechange = function () {
        if (xhttp1.readyState == 4 && xhttp1.status == 200) {
            var data = JSON.parse(xhttp1.responseText);
            console.log(JSON.stringify(data));
            localStorage.setItem("JSON-Objects", JSON.stringify(data));
        }
    }

    // JSON-Commands
    xhttp2 = new XMLHttpRequest();

    xhttp2.open("POST", "http://" + myIPValue + "/core/api/jeeApi.php");
    xhttp2.setRequestHeader("Content-Type", "application/text/plain");
    xhttp2.send(JSON.stringify({
        "jsonrpc": "2.0",
        "method": "cmd::all",
        "params": {
            "apikey": "votre_cle_API_jeedom"
        },
        "id": 1
    }));
    // curl -d '{"jsonrpc": "2.0", "method":"object::all","params":{"apikey": "votre_cle_API_jeedom"}, "id":1}' http://192.168.1.x/core/api/jeeApi.php


    xhttp2.onreadystatechange = function () {
        if (xhttp2.readyState == 4 && xhttp2.status == 200) {
            var data = JSON.parse(xhttp2.responseText);
            console.log(JSON.stringify(data));
            localStorage.setItem("JSON-Commands", JSON.stringify(data));
        }
    }

    // JSON-Scenario
    xhttp3 = new XMLHttpRequest();

    xhttp3.open("POST", "http://" + myIPValue + "/core/api/jeeApi.php");
    xhttp3.setRequestHeader("Content-Type", "application/text/plain");
    xhttp3.send(JSON.stringify({
        "jsonrpc": "2.0",
        "method": "scenario::all",
        "params": {
            "apikey": "votre_cle_API_jeedom"
        },
        "id": 1
    }));
    // curl -d '{"jsonrpc": "2.0", "method":"object::all","params":{"apikey": "votre_cle_API_jeedom"}, "id":1}' http://192.168.1.x/core/api/jeeApi.php


    xhttp3.onreadystatechange = function () {
        if (xhttp3.readyState == 4 && xhttp3.status == 200) {
            var data = JSON.parse(xhttp3.responseText);
            console.log(JSON.stringify(data));
            localStorage.setItem("JSON-Scenario", JSON.stringify(data));
        }
    }
}


// Requette HTTP pour les Commandes
// Les commandes sont en HTTP. On peut mettre HTTPS si besoin.


function requestcommand(jeedomcmd) {

    var myKeyValue, myIPValue;

    myKeyValue = localStorage.getItem("KEY");
    myIPValue = localStorage.getItem("IP");
    console.log("KEY Value: " + myKeyValue);
    console.log("IP Value: " + myIPValue);

    var client = new XMLHttpRequest();
    client.open("GET", "http://" + myIPValue + "/core/api/jeeApi.php?apikey=" + myKeyValue + "&type=cmd&id=" + jeedomcmd);
    console.log("http://" + myIPValue + "/core/api/jeeApi.php?apikey=" + myKeyValue + "&type=cmd&id=" + jeedomcmd);
    client.onreadystatechange = function () {
        if (client.readyState == 4) {
            if (client.status == 200) {
                console.log(client.responseText);
                navigator.vibrate([500, 500, 500]);
            }
        }
    };
    client.send();
};

// Requette HTTP pour les Scenario
// Les commandes sont en HTTP. On peut mettre HTTPS si besoin.

function requestscenario(jeedomscenario) {

    var myKeyValue, myIPValue;

    myKeyValue = localStorage.getItem("KEY");
    myIPValue = localStorage.getItem("IP");
    console.log("KEY Value: " + myKeyValue);
    console.log("IP Value: " + myIPValue);

    var client = new XMLHttpRequest();
    client.open("GET", "http://" + myIPValue + "/core/api/jeeApi.php?apikey=" + myKeyValue + "&type=scenario&id=" + jeedomscenario + "&action=start");
    console.log("http://" + myIPValue + "/core/api/jeeApi.php?apikey=" + myKeyValue + "&type=scenario&id=" + jeedomscenario + "&action=start");
    client.onreadystatechange = function () {
        if (client.readyState == 4) {
            if (client.status == 200) {
                console.log(client.responseText);
                navigator.vibrate([500, 500, 500]);
            }
        }
    };
    client.send();
};

// Requette HTTP pour la requete Voix
// Les commandes sont en HTTP. On peut mettre HTTPS si besoin.

function requestvoice() {
    var appControlData = new tizen.ApplicationControlData('http://tizen.org/appcontrol/data/input_type', ['input_voice']);
    var myKeyValue, myIPValue;

    myKeyValue = localStorage.getItem("KEY");
    myIPValue = localStorage.getItem("IP");
    console.log("KEY Value: " + myKeyValue);
    console.log("IP Value: " + myIPValue);

    var appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/get_input", null, null, null, [appControlData], null);
    var appControlReplyCallback = {
        onsuccess: function (data) {
            for (var i = 0; i < data.length; i++) {
                console.log('ret: ' + data[i].key);
                console.log('result: ' + data[i].value[0]);
                var client = new XMLHttpRequest();
                client.open("GET", "http://" + myIPValue + "/core/api/jeeApi.php?apikey=" + myKeyValue + "&type=interact&query=" + data[i].value[0] + "&utf8=1");
                console.log("http://" + myIPValue + "/core/api/jeeApi.php?apikey=" + myKeyValue + "&type=interact&query=" + data[i].value[0] + "&utf8=1");
                client.onreadystatechange = function () {
                    if (client.readyState == 4) {
                        if (client.status == 200) {
                            console.log(client.responseText);
                            navigator.vibrate([500, 500, 500]);
                        }
                    }
                };
                client.send();
            }
        },
        onfailure: function () {
            console.log('The launch application control failed');
        }
    }
    tizen.application.launchAppControl(appControl, null, function () {
        console.log("launch application control succeed");
    }, function (e) {
        console.log("launch application control failed. reason: " + e.message);
    }, appControlReplyCallback);
    console.log('launch application done');
};

// Requette HTTP pour la requete temperature
// Les commandes sont en HTTP. On peut mettre HTTPS si besoin.

function requesttemp(jeedomtemp) {

    var myKeyValue, myIPValue;

    myKeyValue = localStorage.getItem("KEY");
    myIPValue = localStorage.getItem("IP");
    console.log("KEY Value: " + myKeyValue);
    console.log("IP Value: " + myIPValue);

    var client = new XMLHttpRequest();
    client.open("GET", "http://" + myIPValue + "/core/api/jeeApi.php?apikey=" + myKeyValue + "&type=cmd&id=" + jeedomtemp);
    console.log("http://" + myIPValue + "/core/api/jeeApi.php?apikey=" + myKeyValue + "&type=cmd&id=" + jeedomtemp);
    client.onreadystatechange = function () {
        if (client.readyState === 4) {
            if (client.status === 200) {
                console.log(client.responseText);
                navigator.vibrate([500, 500, 500]);

                var message = client.responseText;
                console.log(message);
                var messageOut = document.getElementById("messageOut");
                console.log(messageOut);

                var timeOut = "2"; // Input timeOut en secondes
                messageOut.innerHTML = message;
                console.log(messageOut.innerHTML);


                console.log(tau.openPopup("#Popup"));
                setTimeout(function () {
                        tau.closePopup();
                    }, // Alert Popup Toast
                    timeOut * 1000);

            }
        }
    };
    client.send();
}


// Requette HTTP pour la requete Texte
// Les commandes sont en HTTP. On peut mettre HTTPS si besoin.

function requesttext() {
    var appControlData = new tizen.ApplicationControlData('http://tizen.org/appcontrol/data/input_type', ['input_voice']);
    var myKeyValue, myIPValue;

    myKeyValue = localStorage.getItem("KEY");
    myIPValue = localStorage.getItem("IP");
    console.log("KEY Value: " + myKeyValue);
    console.log("IP Value: " + myIPValue);

    var appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/get_input", null, null, null, null, null);
    var appControlReplyCallback = {
        onsuccess: function (data) {
            for (var i = 0; i < data.length; i++) {
                console.log('ret: ' + data[i].key);
                console.log('result: ' + data[i].value[0]);

                var client = new XMLHttpRequest();
                client.open("GET", "http://" + myIPValue + "/core/api/jeeApi.php?apikey=" + myKeyValue + "&type=interact&query=" + data[i].value[0] + "&utf8=1");
                console.log("http://" + myIPValue + "/core/api/jeeApi.php?apikey=" + myKeyValue + "&type=interact&query=" + data[i].value[0] + "&utf8=1");
                client.onreadystatechange = function () {
                    if (client.readyState == 4) {
                        if (client.status == 200) {
                            console.log(client.responseText);
                            navigator.vibrate([500, 500, 500]);
                        }
                    }
                };
                client.send();
            }
        },
        onfailure: function () {
            console.log('The launch application control failed');
        }
    }
    tizen.application.launchAppControl(appControl, null, function () {
        console.log("launch application control succeed");
    }, function (e) {
        console.log("launch application control failed. reason: " + e.message);
    }, appControlReplyCallback);
    console.log('launch application done');
};
