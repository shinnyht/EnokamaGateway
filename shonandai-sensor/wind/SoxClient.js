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
    if(device=="藤沢市 今日の風向き"){
        /*
         * (EDIT) change below statements depending on
         * which TRANSDUCER & what VALUE you want to use
         */
        if (typeof transducer === "undefined") {
            status("Data undefined");
            return;
        }

        var date = new Date();
        var hour = date.getHours();

        if (transducer.id == "3時風速" && 0 <= hour && hour < 3) {
            EnoshimaSensorInfo.windSpeed = transducer.sensorData.rawValue;
        }
        else if (transducer.id == "6時風速" && 3 <= hour && hour < 6) {
            EnoshimaSensorInfo.windSpeed = transducer.sensorData.rawValue;
        }
        else if (transducer.id == "9時風速" && 6 <= hour && hour < 9) {
            EnoshimaSensorInfo.windSpeed = transducer.sensorData.rawValue;
        }
        else if (transducer.id == "12時風速" && 9 <= hour && hour < 12) {
            EnoshimaSensorInfo.windSpeed = transducer.sensorData.rawValue;
        }
        else if (transducer.id == "15時風速" && 12 <= hour && hour < 15) {
            EnoshimaSensorInfo.windSpeed = transducer.sensorData.rawValue;
        }
        else if (transducer.id == "18時風速" && 15 <= hour && hour < 18) {
            EnoshimaSensorInfo.windSpeed = transducer.sensorData.rawValue;
        }
        else if (transducer.id == "21時風速" && 18 <= hour && hour < 21) {
            EnoshimaSensorInfo.windSpeed = transducer.sensorData.rawValue;
        }
        else if (transducer.id == "24時風速" && 21 <= hour && hour < 24) {
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

        var device = new Device("藤沢市 今日の風向き", soxEvent.soxClient);

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
