// server info (DO NOT EDIT)
var boshService = "http://sox.ht.sfc.keio.ac.jp:5280/http-bind/";
var xmppServer = "sox.ht.sfc.keio.ac.jp";

// (EDIT) Prepare varibles (but these cannot be used in processing.js)
var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.weather = 0;
EnoshimaSensorInfo.temperature = 0;
EnoshimaSensorInfo.maxTemp = 0;
EnoshimaSensorInfo.minTemp = 0;
EnoshimaSensorInfo.humidity = 0;
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

function getEnoshimaMaxTemp() {
    return EnoshimaSensorInfo.maxTemp;
}

function getEnoshimaMinTemp() {
    return EnoshimaSensorInfo.minTemp;
}

function getEnoshimaHumidity() {
    return EnoshimaSensorInfo.humidity;
}

/* 0: sunny, 1: cloudy, 2: rainy 3: sunny-cloudy 4:cloudy-rainy */
function getWeather() {
    return EnoshimaSensorInfo.weather;
}

function getNextDeparture() {
    var min;
    if (!EnoshimaSensorInfo.delay) {
        
    }
    else {
        // write when delay occurs
    }

    return min;
}

// Called when received sensor data
function eventListener(device, transducer) {
    // (EDIT) check if the DEVICE name is the one you want
    if(device=="湘南・江ノ島の海の天気"){
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

            if (value.indexOf("晴") > -1 && value.indexOf("曇") > -1) {
                EnoshimaSensorInfo.weather = 3;
            }
            else if (value.indexOf("雨") > -1 && value.indexOf("曇") > -1) {
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

        if(transducer.id=="最高気温"){
            EnoshimaSensorInfo.maxTemp = transducer.sensorData.rawValue;
        }

        if(transducer.id=="最低気温"){
            EnoshimaSensorInfo.minTemp = transducer.sensorData.rawValue;
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

        var device = new Device("湘南・江ノ島の海の天気");

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
