// server info (DO NOT EDIT)
var boshService = "http://sox.ht.sfc.keio.ac.jp:5280/http-bind/";
var xmppServer = "sox.ht.sfc.keio.ac.jp";
var jid = "guest@sox.ht.sfc.keio.ac.jp";
var password = "miroguest";

// prepate varibles (these cannot be used in processing.js)
var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.starInfo = "";
EnoshimaSensorInfo.starStatus = 0;

// prepare getter methods to call from processing.js
function getEnoshimaStarStatus() {
    return EnoshimaSensorInfo.starStatus;
}
function getEnoshimaStarInfo() {
    return EnoshimaSensorInfo.starInfo;
}

// called when received sensor data
function eventListener(device, transducer) {
    // check if the device name is the one you want
    if(device=="江ノ島今日の生活指数"){
        // EDIT below depending on which transducer you want to use
        if (transducer.id == "星空") {
            var data = transducer.sensorData.rawValue;
            EnoshimaSensorInfo.starInfo = data;
            console.log(data);

            if (data.indexOf("空一杯") >= 0 || data.indexOf("まずまず") >= 0) {
                EnoshimaSensorInfo.starStatus = 1;
            }
            else if (data.indexOf("期待") >= 0 || data.indexOf("わずか") >= 0) {
                EnoshimaSensorInfo.starInfo = "星空は期待できなさそう。残念。";
                EnoshimaSensorInfo.starStatus = 0;
            }
            else {
                EnoshimaSensorInfo.starInfo = "星空は期待できなさそう。残念。";
                EnoshimaSensorInfo.starStatus = 1;
            }
        }
    }
}

// create new SoxClient when page is loaded
$(document).ready(function() {
    var client = new SoxClient(boshService, xmppServer, jid, password);
    var soxEventListener = new SoxEventListener();
    soxEventListener.connected = function(soxEvent) {
        console.log("[SoxClient.js]" + soxEvent.soxClient);
        status("Connected: " + soxEvent.soxClient);
        client.unsubscribeAll();

        // change the device name depending on which device you want to subscribe
        var device = new Device("江ノ島今日の生活指数");

        if (!client.subscribeDevice(device)) {
            status("Couldn't send subscription request: " + device);
        }
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
        // status("Sensor data received: " + soxEvent.device);
        var transducers = soxEvent.device.transducers;
        transducers.forEach(function(transducer) {
            status(transducer);
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
