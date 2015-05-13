// server info (DO NOT EDIT)
var boshService = "http://sox.ht.sfc.keio.ac.jp:5280/http-bind/";
var xmppServer = "sox.ht.sfc.keio.ac.jp";
var jid = "cloutfujisawa@sox.ht.sfc.keio.ac.jp";
var password = "pAnAke!o";

// (EDIT) Prepare varibles (but these cannot be used in processing.js)
var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.weather = 0;
EnoshimaSensorInfo.temperature = "-- ";
EnoshimaSensorInfo.humidity = "-- ";
EnoshimaSensorInfo.delay = 0;

/*
 * (EDIT) Prepare getter methods to call from processing.js
 * To use javascript variables in processing.js
 *  you have to call by getter methods
 *
 */
function getEnoshimaTemperature() {
    return EnoshimaSensorInfo.temperature;
}

function getEnoshimaHumidity() {
    return EnoshimaSensorInfo.humidity;
}

/* 0: sunny, 1: cloudy, 2: rainy */
function getWeather() {
    return EnoshimaSensorInfo.weather;
}

// Called when received sensor data
function eventListener(device, transducer) {
    // (EDIT) check if the DEVICE name is the one you want
    if(device=="江ノ島今日の天気"){
        /*
         * (EDIT) change below statements depending on
         * which TRANSDUCER & what VALUE you want to use
         */
        if (typeof transducer.sensorData === "undefined") {
            status("Data undefined");
            return;
        }

        if (transducer.id == "天気") {
            var value = String(transducer.sensorData.rawValue);

            if (value.indexOf("晴時々曇") > -1 || value.indexOf("曇時々晴") > -1) {
                EnoshimaSensorInfo.weather = 3;
            }
            else if (value.indexOf("雨時々曇") > -1 || value.indexOf("曇時々雨") > -1) {
                EnoshimaSensorInfo.weather = 4;
            }
            else if (value.indexOf("晴") > -1) {
                EnoshimaSensorInfo.weather = 0;
            }
            else if (value.indexOf("曇") > -1) {
                EnoshimaSensorInfo.weather = 1;
            }
            else if (value.indexOf("雨") > -1) {
                EnoshimaSensorInfo.weather = 2;
            }
            else {
                EnoshimaSensorInfo.weather = 5;
            }
        }

    }
    else if (device=="EnoshimaYachtHarbour") {
        /*
         * (EDIT) change below statements depending on
         * which TRANSDUCER & what VALUE you want to use
         */
        if (typeof transducer.sensorData === "undefined") {
            status("Data undefined");
            return;
        }

        if (transducer.name == "気温") {
            var value = String(transducer.sensorData.rawValue);
            EnoshimaSensorInfo.temperature = value;
        }
        if (transducer.name == "湿度") {
            var value = String(transducer.sensorData.rawValue);
            EnoshimaSensorInfo.humidity = value;
        }
    }
}

// Create new SoxClient when page is loaded
$(document).ready(function() {
    var client = new SoxClient(boshService, xmppServer, jid, password);
    var soxEventListener = new SoxEventListener();
    soxEventListener.connected = function(soxEvent) {
        console.log("[SoxClient.js]" + soxEvent.soxClient);
        status("Connected: " + soxEvent.soxClient);
        client.unsubscribeAll();

        var deviceNames = ["江ノ島今日の天気", "EnoshimaYachtHarbour"];

        if (!client.subscribeDevice()) {
            status("[SoxClient.js] Counldn't subscribe device: " + soxEvent.soxClient);
        }
        deviceNames.forEach(function(name){
            var device = new Device(name);
            if (!client.subscribeDevice(device)) {
                status("Couldn't send subscription request: "+device);
            }           
        });
    };
    soxEventListener.connectionFailed = function(soxEvent) {
        status("Connection Failed: " + soxEvent.soxClient);
    };
    soxEventListener.subscribed = function(soxEvent) {
        status("Subscribed: " + soxEvent.device);
    };
    soxEventListener.subscriptionFailed = function(soxEvent) {
        status("Subscription Failed: " + soxEvent.device);
    };
    soxEventListener.metaDataReceived = function(soxEvent) {
        status("Meta data received: " + soxEvent.device);
    };
    soxEventListener.sensorDataReceived = function(soxEvent) {
        status("Sensor data received: " + soxEvent.device);
        var transducers = soxEvent.device.transducers;

        transducers.forEach(function(transducer) {
            eventListener(soxEvent.device.name, transducer);
        });
    };

    client.setSoxEventListener(soxEventListener);
    client.connect();
});

function status(message) {
    // var html = (new Date().toLocaleString() + " [SoxClient.js] " + message +
    //     "<hr>\n" + $("#status").html());
    // $("#status").html(html);
    console.log("-------------------------------------");
    console.log(message);
    console.log("-------------------------------------");
}
