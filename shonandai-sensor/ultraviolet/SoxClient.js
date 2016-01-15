// server info (DO NOT EDIT)
var boshService = "http://sox.ht.sfc.keio.ac.jp:5280/http-bind/";
var xmppServer = "sox.ht.sfc.keio.ac.jp";

// (EDIT) Prepare varibles (but these cannot be used in processing.js)
var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.ultravioletValue = 0;

/*
 * (EDIT) Prepare getter methods to call from processing.js
 * To use javascript variables in processing.js
 *  you have to call by getter methods
 *
 */
function getUltravioletStrength() {
    return EnoshimaSensorInfo.ultravioletValue;
}

// Called when received sensor data
function eventListener(device, transducer) {
    // (EDIT) check if the DEVICE name is the one you want
    if (device=="湘南・江ノ島の海の天気") {
        /*
         * (EDIT) change below statements depending on
         * which TRANSDUCER & what VALUE you want to use
         */
        if (typeof transducer.sensorData === "undefined") {
            status("Data undefined");
            return;
        }

        if (transducer.id == "紫外線") {
            var value = transducer.sensorData.rawValue;
            if (value.indexOf("極めて強い") > -1) {
                console.log("極めて強い");
                EnoshimaSensorInfo.ultravioletValue = 4;
            } else if (value.indexOf("非常に強い") > -1) {
                console.log("非常に強い");
                EnoshimaSensorInfo.ultravioletValue = 3;
            } else if (value.indexOf("やや強い") > -1) {
                console.log("やや強い");
                EnoshimaSensorInfo.ultravioletValue = 1;
            } else if (value.indexOf("強い") > -1) {
                console.log("強い");
                EnoshimaSensorInfo.ultravioletValue = 2;
            } else {
                console.log("その他");
                EnoshimaSensorInfo.ultravioletValue = 0;
            }
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

        var device = new Device("湘南・江ノ島の海の天気", soxEvent.soxClient);

        if (!client.subscribeDevice(device)) {
            status("[SoxClient.js] Counldn't subscribe device: " + soxEvent.soxClient);
        }
    };
    soxEventListener.connectionFailed = function(soxEvent) {
        status("Connection Failed: " + soxEvent.soxClient);
    };
    soxEventListener.connectionFailed = function(soxEvent) {
        status("Connection Failed: "+soxEvent.soxClient);
    };

    soxEventListener.resolved = function(soxEvent) {
        status("Device Resolved: "+soxEvent.soxClient);
    };

    soxEventListener.resolveFailed = function(soxEvent){
        /* couldn't get device information from the server */
        status("Resolve Failed: "+soxEvent.device+" code="+soxEvent.errorCode+" type="+soxEvent.errorType);
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
