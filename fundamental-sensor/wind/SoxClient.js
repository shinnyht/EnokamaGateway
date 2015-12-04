// server info (DO NOT EDIT)
var boshService = "http://sox.ht.sfc.keio.ac.jp:5280/http-bind/";
var xmppServer = "sox.ht.sfc.keio.ac.jp";

// (EDIT) Prepare varibles (but these cannot be used in processing.js)
var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.windSpeed = 0;

/*
 * (EDIT) Prepare getter methods to call from processing.js
 * To use javascript variables in processing.js
 *  you have to call by getter methods
 *
 */
function getEnoshimaWindSpeed() {
    return EnoshimaSensorInfo.windSpeed;
}

// Called when received sensor data
function eventListener(device, transducer) {
    // (EDIT) check if the DEVICE name is the one you want
    if(device=="江ノ島ヨットハーバー_mini"){
        /*
         * (EDIT) change below statements depending on
         * which TRANSDUCER & what VALUE you want to use
         */
        if (typeof transducer === "undefined") {
            status("Data undefined");
            return;
        }

        if (transducer.id == "平均風速") {
            EnoshimaSensorInfo.windSpeed = transducer.sensorData.rawValue;
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

        var device = new Device("江ノ島ヨットハーバー_mini", soxEvent.soxClient);

        if (!client.subscribeDevice(device)) {
            status("[SoxClient.js] Counldn't subscribe device: " + soxEvent.soxClient);
        }
    };
    soxEventListener.connectionFailed = function(soxEvent) {
        status("Connection Failed: " + soxEvent.soxClient);
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
