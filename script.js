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

/*------------------------------*/
var maxplayers = 5;
var palyaplayers = 0;

let hazai = document.getElementById("hazaiselect");
let hazaip = document.getElementById("hazaipalya");
let vendeg = document.getElementById("vendegselect");
let vendegp = document.getElementById("vendegpalya");

function hazaipalyara() {
	if (palyaplayers < maxplayers) {
		const hazaivalasztott = hazai.options[hazai.selectedIndex];
		hazaip.append(hazaivalasztott);
	}
	if (palyaplayers == maxplayers) {

	}
}

function vendegpalyara() {
	if (palyaplayers < maxplayers) {

	}
	if (palyaplayers == maxplayers) {
		
	}
}

function hazaicsere () { hazaipalyara(); }
function vendegcsere () { vendegpalyara(); }
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
		error: function (jqXHR, textStatus, errorThrown) { console.log(`RT: ${jqXHR.responseText}\nS: ${textStatus}\nErr:${errorThrown}`); },
		complete: function () { }
	});
	return s;
};

function sameteams(h, v) {
	//console.log("x", h, v);
	if (h == v) console.error("Nem játszhat maga ellen!");
}

/*-----------------------------*/
$(document).ready(function () {
	var listItems = "";
	var k_json = ajax_post("kosar.php", "csapatok=1", 1);               // JSON!
	//console.log(k_json);
	let hazai = document.getElementById("hazaiselect");
	let vendeg = document.getElementById("vendegselect");
	k_json.forEach(e => {
		let option1 = document.createElement("option");
		let option2 = document.createElement("option");
		option1.text = "Hazai: "+e["ID_CSAPAT"];
		option1.value = e["ID_CSAPAT"];
		option2.text = "Vendég: "+e["ID_CSAPAT"];
		option2.value = e["ID_CSAPAT"];
		hazai.add(option1);
		vendeg.add(option2);
	});

	$("#hazaiselect").change(function(){
		let val1 = $("#hazaiselect option:selected").val();
		let csapat = ajax_post("kosar.php", `ID_CSAPAT=${val1}`, 1)
		console.log(csapat)
		if (sameteams(hazai.value, vendeg.value)) $("#hazaiselect").val("").change();
		let player = document.getElementById("hazaiplayer");
		player.innerHTML = csapat["Jatekosok"]
	})

	$("#vendegselect").change(function(){
		let val2 = $("#vendegselect option:selected").val();
		let csapat1 = ajax_post("kosar.php", `ID_CSAPAT=${val2}`, 1)
		console.log(csapat1)
		if (sameteams(hazai.value, vendeg.value)) $("#vendegselect").val("").change();
		let player1 = document.getElementById("vendegplayer");
		player1.innerHTML = csapat1["Jatekosok"]
	})



});
