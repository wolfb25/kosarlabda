var minutes = 0;
var seconds = 0;
var time;
var hazai_pontok = 0;
var vendég_pontok = 0;

/*-----------------------*/
function timedCount() {
	document.getElementById('szamlalo').textContent = minutes + ":" + seconds;
	//document.getElementById('hazai').textContent = kosar.php?request=csapatok;
	document.getElementById('negyedelo').textContent = (((minutes / 15) | 0) + 1) + ". negyed";
	++seconds;
	if (seconds % 60 == 0) { ++minutes; seconds = 0; }
	time = setTimeout("timedCount()", 1000);
	if (minutes % 15 == 0 && seconds == 0) { 
		minutes = Math.round(minutes / 15) * 15;
		seconds = 0;
		clearTimeout(time);
	}

}

function doTimer() { timedCount(); }
function stopTimer() { clearTimeout(time); }

/*--------------------------------------------------*/
function ajax_get(urlsor, hova, tipus, aszinkron) {
	$.ajax({
		url: urlsor, type: "get", async: aszinkron, cache: false, dataType: tipus === 0 ? 'html' : 'json',
		beforeSend: function (xhr) { },
		success: function (data) { $(hova).html(data); },
		error: function (jqXHR, textStatus, errorThrown) { console.log(jqXHR.responseText); },
		complete: function () { }
	});
	return true;
};

/*-----------------------------------*/
function ajax_post(urlsor, data, tipus) {     // !! változás: data
	var s = "";
	$.ajax({
		url: urlsor, type: "post", data: data, async: false, cache: false, dataType: tipus === 0 ? 'html' : 'json',
		beforeSend: function (xhr) { },
		success: function (data) { s = data; },
		error: function (jqXHR, textStatus, errorThrown) { console.log(jqXHR.responseText); },
		complete: function () { }
	});
	return s;
};

/*-----------------------------*/
$(document).ready(function () {
	var listItems = "";
	var k_json = ajax_post("kosar.php", "csapatok=1", 1);               // JSON!
	console.log(k_json);
	
});
