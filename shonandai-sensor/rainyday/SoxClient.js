// server info (DO NOT EDIT)
var boshService = "http://sox.ht.sfc.keio.ac.jp:5280/http-bind/";
var xmppServer = "sox.ht.sfc.keio.ac.jp";

// (EDIT) Prepare varibles (but these cannot be used in processing.js)
var ShonandaiSensorInfo = {};
ShonandaiSensorInfo.percentage = 0;

/*
 * (EDIT) Prepare getter methods to call from processing.js
 * To use javascript variables in processing.js
 *  you have to call by getter methods
 *
 */

/* 0: sunny, 1: cloudy, 2: rainy 3: sunny-cloudy 4:cloudy-rainy */
function getShonandaiRainPercentage() {
    return ShonandaiSensorInfo.percentage;
}

// Called when received sensor data
function eventListener(device, transducer) {
    // (EDIT) check if the DEVICE name is the one you want
    if(device=="湘南・江ノ島の降水確率"){
        /*
         * (EDIT) change below statements depending on
         * which TRANSDUCER & what VALUE you want to use
         */
        if (typeof transducer.sensorData === "undefined") {
            status("Data undefined");
            return;
        }

        var date = new Date();
        var hour = date.getHours();

        // until 0a.m to 6a.m
        if (transducer.id == "00-06" && 0 <= hour && hour < 6) {
            var value = String(transducer.sensorData.rawValue);
            ShonandaiSensorInfo.percentage = value;
        }
        if (transducer.id == "06-12" && 6 <= hour && hour < 12) {
            var value = String(transducer.sensorData.rawValue);
            ShonandaiSensorInfo.percentage = value;
        }
        if (transducer.id == "12-18" && 12 <= hour && hour < 18) {
            var value = String(transducer.sensorData.rawValue);
            ShonandaiSensorInfo.percentage = value;
        }
        if (transducer.id == "18-24" && 18 <= hour && hour < 24) {
            var value = String(transducer.sensorData.rawValue);
            ShonandaiSensorInfo.percentage = value;
        }
    }
}

// Create new SoxClient when page is loaded
$(document).ready(function() {
    var client = new SoxClient(boshService, xmppServer);
    var soxEventListener = new SoxEventListener();

    soxEventListener.connected = function(soxEvent) {
        console.log("[SoxClient.js]" + soxEvent.soxClient);
        status("Connected: " + soxEvent.soxClient);
        client.unsubscribeAll();

        var device = new Device("湘南・江ノ島の降水確率");

        /* クライアントに繋がったら、デバイスにサブスクライブする */
        if(!client.subscribeDevice(device)){
            /* サーバに繋がってない場合などで、要求を送信できなかった場合はfalseが返ってくる */
            status("Couldn't send subscription request: "+device);
        }
         
    };
    soxEventListener.connectionFailed = function(soxEvent) {
        status("Connection Failed: " + soxEvent.soxClient);
    };
    soxEventListener.resloved = function(soxEvent) {
        status("Device Resolved: " + soxEvent.soxClient);
    };
    soxEventListener.resloveFailed = function(soxEvent) {
        status("Resolve Failed: " + soxEvent.device +
            "code=" + soxEvent.errorCode +
            " type=" + soxEvent.errorType);
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
