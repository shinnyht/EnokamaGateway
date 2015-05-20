// server info (DO NOT EDIT)
var boshService = "http://sox.ht.sfc.keio.ac.jp:5280/http-bind/";
var xmppServer = "sox.ht.sfc.keio.ac.jp";
var jid = "cloutfujisawa@sox.ht.sfc.keio.ac.jp";
var password = "pAnAke!o";

// (EDIT) Prepare varibles (but these cannot be used in processing.js)
var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.weather = 0;
EnoshimaSensorInfo.temperature = 0;
EnoshimaSensorInfo.humidity = 0;
EnoshimaSensorInfo.wind = 0;
EnoshimaSensorInfo.weatherH = 0; 
EnoshimaSensorInfo.temperatureH = 0;
EnoshimaSensorInfo.humidityH =  0;
EnoshimaSensorInfo.windH = 0;
EnoshimaSensorInfo.luigi = 0;
EnoshimaSensorInfo.word = "似ている！";
EnoshimaSensorInfo.word2 = "ハワイらしさを感じる"

/*
 * (EDIT) Prepare getter methods to call from processing.js
 * To use javascript variables in processing.js
 *  you have to call by getter methods
 *
 */

function getEnoshimaHawaii(){
	return EnoshimaSensorInfo.luigi;
}

function getEnoshimaHawaiiWord(){
	return EnoshimaSensorInfo.word;
}

function getEnoshimaHawaiiWord2(){
	return EnoshimaSensorInfo.word2;
}

function getEnoshimaWeather(){
	if(parseInt(EnoshimaSensorInfo.weather) == 0){
		return "晴れ";		
	} else if(parseInt(EnoshimaSensorInfo.weather) == 1){
		return "晴-曇";		
	} else if(parseInt(EnoshimaSensorInfo.weather) == 2){
		return "曇り";		
	} else if(parseInt(EnoshimaSensorInfo.weather) == 3){
		return "曇-雨";		
	} else if(parseInt(EnoshimaSensorInfo.weather) == 4){
		return "雨";		
	} else {
		return "雪";		
	}
}

function getEnoshimaTemp(){
	return parseInt(EnoshimaSensorInfo.temperature);		
}

function getEnoshimaHumi(){
	return parseInt(EnoshimaSensorInfo.humidity);	
}

function getEnoshimaWind(){
	return parseInt(EnoshimaSensorInfo.wind);
}

function getHawaiiWeather(){
	if(parseInt(EnoshimaSensorInfo.weatherH) == 0){
		return "晴れ";		
	} else if(parseInt(EnoshimaSensorInfo.weatherH) == 1){
		return "晴-曇";		
	} else if(parseInt(EnoshimaSensorInfo.weatherH) == 2){
		return "曇り";		
	} else if(parseInt(EnoshimaSensorInfo.weatherH) == 3){
		return "曇-雨";		
	} else if(parseInt(EnoshimaSensorInfo.weatherH) == 4){
		return "雨";		
	} else {
		return "雪";		
	}

}

function getHawaiiTemp(){
	return parseInt(EnoshimaSensorInfo.temperatureH);		
}

function getHawaiiHumi(){
	return parseInt(EnoshimaSensorInfo.humidityH);		
}

function getHawaiiWind(){
	return parseInt(EnoshimaSensorInfo.windH);
}
/* 0: sunny, 1: cloudy, 2: rainy 3: sunny-cloudy 4:cloudy-rainy */
function getWeather() {
    return EnoshimaSensorInfo.weather;
}

// Called when cahnged sensor data 
function SimilarityCalculation(){
	var temp = parseFloat(EnoshimaSensorInfo.temperature);
	var humi = parseFloat(EnoshimaSensorInfo.humidity);
	var tempH = parseFloat(EnoshimaSensorInfo.temperatureH);
	var humiH = parseFloat(EnoshimaSensorInfo.humidityH);
	var weat = parseFloat(EnoshimaSensorInfo.weather);
	var weatH = parseFloat(EnoshimaSensorInfo.weatherH);
	var wind = parseFloat(EnoshimaSensorInfo.wind);
	var windH = parseFloat(EnoshimaSensorInfo.windH);
	var fukai = 0.81 * temp + 0.01 * humi * (0.99 * temp -14.3) + 46.3;
	fukai = Math.floor(fukai * 10) /10;
	var fukaiH = 0.81 * tempH + 0.01 * humiH * (0.99 * tempH -14.3) + 46.3;
	fukaiH = Math.floor(fukaiH * 10) /10;
	var luigi = 100 - 0.2 * Math.pow(fukai - fukaiH, 2) - 2 * Math.pow(weat -weatH, 2) - Math.pow(wind - windH, 2);
	luigi = Math.floor(luigi * 10) / 10;
	if(luigi >= 30){
	EnoshimaSensorInfo.luigi = luigi;
	}else{
		EnoshimaSensorInfo.luigi = 30.0;
		luigi = 30;	
	}
	if(luigi >= 80){
		EnoshimaSensorInfo.word = "すごい似ている！"
		EnoshimaSensorInfo.word2 = "気分はハワイだね"
	} else if(luigi >= 60){
		EnoshimaSensorInfo.word = "似ている！"
		EnoshimaSensorInfo.word2 = "ハワイらしさを感じる"
	} else if(luigi >= 40){
		EnoshimaSensorInfo.word = "少し似ている！"
		EnoshimaSensorInfo.word2 = "江の島時々ハワイ"
	} else if(luigi >= 20){
		EnoshimaSensorInfo.word = "普通"
		EnoshimaSensorInfo.word2 = "ハワイを探そう！"
	} else {
		EnoshimaSensorInfo.word = "残念"
		EnoshimaSensorInfo.word2 = "ハワイらしさは少ない"
	}
}

// Called when received sensor data
function eventListener(device, transducer) {
    // (EDIT) check if the DEVICE name is the one you want
    if(device=="江ノ島今日の天気"){
        /*
         * (EDIT) change below statements depending on
         * which TRANSDUCER & what VALUE you want to use
         */
        if (transducer.id == "天気") {
			var value = String(transducer.sensorData.rawValue);
            if (value.indexOf("晴") > -1 && value.indexOf("曇") > -1) {
                EnoshimaSensorInfo.weather = 1;
            }
            else if (value.indexOf("雨") > -1 && value.indexOf("曇") > -1) {
                EnoshimaSensorInfo.weather = 3;
            }
            else if (value.indexOf("晴") > -1) {
                EnoshimaSensorInfo.weather = 0;
            }
            else if (value.indexOf("曇") > -1) {
                EnoshimaSensorInfo.weather = 2;
            }
            else if (value.indexOf("雨") > -1) {
                EnoshimaSensorInfo.weather = 4;
            }
            else {
                EnoshimaSensorInfo.weather = 5;
            }
		}
    }else if(device=="EnoshimaYachtHarbour"){
		if (transducer.name == "気温"){
			EnoshimaSensorInfo.temperature = transducer.sensorData.rawValue;
		}
		else if (transducer.id == "湿度"){
			EnoshimaSensorInfo.humidity = transducer.sensorData.rawValue;
		}
		else if (transducer.id == "平均風速"){
			EnoshimaSensorInfo.wind = transducer.sensorData.rawValue;
		}
	}else if(device=="ハワイ今日の天気"){
		if (transducer.id == "天気") {
			var valueH = String(transducer.sensorData.rawValue);
			if (valueH.indexOf("晴") > -1 && valueH.indexOf("曇") > -1) {
				EnoshimaSensorInfo.weatherH = 1;
			}
			else if (valueH.indexOf("雨") > -1 && valueH.indexOf("曇") > -1){
				EnoshimaSensorInfo.weatherH = 3;
			}
			else if (valueH.indexOf("晴") > -1) {
				EnoshimaSensorInfo.weatherH = 0;
			}
			else if (valueH.indexOf("曇") > -1) {
				EnoshimaSensorInfo.weatherH = 2;
			}
			else if (valueH.indexOf("雨") > -1){
				EnoshimaSensorInfo.weatherH = 4;
			}
			else {
				EnoshimaSensorInfo.weatherH = 5;
			}
		} else if (transducer.id == "気温"){
			EnoshimaSensorInfo.temperatureH = transducer.sensorData.rawValue;
		} else if (transducer.id == "湿度"){
			EnoshimaSensorInfo.humidityH = transducer.sensorData.rawValue;
		} else if (transducer.id == "風速"){
			EnoshimaSensorInfo.windH = transducer.sensorData.rawValue;
		}
	}
	SimilarityCalculation();
}

// Create new SoxClient when page is loaded
$(document).ready(function() {
    var client = new SoxClient(boshService, xmppServer, jid, password);
    var soxEventListener = new SoxEventListener();
    soxEventListener.connected = function(soxEvent) {
        console.log("[SoxClient.js]" + soxEvent.soxClient);
        status("Connected: " + soxEvent.soxClient);
        client.unsubscribeAll();

        var deviceNames = ["江ノ島今日の天気", "EnoshimaYachtHarbour", "ハワイ今日の天気"];

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
