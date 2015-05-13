// server info (DO NOT EDIT)
var boshService = "http://sox.ht.sfc.keio.ac.jp:5280/http-bind/";
var xmppServer = "sox.ht.sfc.keio.ac.jp";
var jid = "cloutfujisawa@sox.ht.sfc.keio.ac.jp";
var password = "pAnAke!o";

// (EDIT) Prepare varibles (but these cannot be used in processing.js)
var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.starInfo = "";
EnoshimaSensorInfo.starStatus = 0;

/*
 * To use javascript variables in processing.js
 *  you have to call by getter methods
 *
 */
function getEnoshimaStarStatus() {
    return EnoshimaSensorInfo.starStatus;
}
function getEnoshimaStarInfo() {
    return EnoshimaSensorInfo.starInfo;
}

// Called when received sensor data
function eventListener(device, transducer) {
    // (EDIT) check if the DEVICE name is the one you want
    if(device=="江ノ島今日の生活指数"){
        /*
         * (EDIT) change below statements depending on
         * which TRANSDUCER & what VALUE you want to use
         */
        if (typeof transducer.sensorData === "undefined") {
            status("Data undefined");
            return;
        }

        if (transducer.id == "星空") {
            var data = transducer.sensorData.rawValue;
            EnoshimaSensorInfo.starInfo = data;
            console.log(data);

            EnoshimaSensorInfo.starInfo = transducer.sensorData.rawValue;
            EnoshimaSensorInfo.starStatus = 1;

            /*
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
            */
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

        var device = new Device("江ノ島今日の生活指数");

        if (!client.subscribeDevice(device)) {
            status("[SoxClient.js] Counldn't get device list: " + soxEvent.soxClient);
        }
    };
    soxEventListener.discovered = function(soxEvent) {
        try {
            console.log("[SoxClient.js] Discovered " + soxEvent.devices);
            for (var i = 0; i < soxEvent.devices.length; i++) {
                /*
                 * (EDIT) change the device name depending on
                 * which DEVICE you want to subscribe
                 */
                if (soxEvent.devices[i].nodeName == "江ノ島今日の生活指数") {
                    client.subscribeDevice(soxEvent.devices[i]);
                }
            }
        } catch (e) {
            printStackTrace(e);
        }
    };
    soxEventListener.discoveryFailed = function(soxEvent) {
        console.log("[main.js] Discovery failed " + soxEvent);
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
            // status(transducer);
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
