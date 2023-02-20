var minutes = 10;
var seconds = 0;
var time;
var stopper_running = false;
var negyedek = 1;

/*-----------------------*/
function timer() {
	stopper_running = !stopper_running;
	document.getElementById("timerButton").value = (stopper_running ? "STOP" : "START");
	if (stopper_running) szamolas = setInterval(() => {
		seconds -= 0.01; seconds = seconds.toFixed(2);
		if (minutes == 0 && seconds <= 0) { 
			clearInterval(szamolas);
			stopper_running = false;
			minutes = 10;
			seconds = 0;
			negyedek++;
		}
		if (seconds <= 0 && stopper_running) { --minutes; seconds = 59.99; }
		document.getElementById("szamlalo").textContent = negyedek < 5 ? (minutes + ":" + seconds) : "0:0.00";
		document.getElementById("negyedelo").textContent = negyedek < 5 ? (negyedek + ". negyed") : "Meccs vége!";
	}, 10);
	else clearInterval(szamolas);
}

/*-------------------------------*/
function log(description, player1 = "---", player2 = "---") {
	if (description !== undefined) $("#log_content").append(`<tr><td>${document.getElementById("szamlalo").textContent}</td><td>${player1}</td><td>${player2}</td><td>${description}</td></tr>`);
}
/*------------------------------*/
var hazai_pontok = 0;
var vendeg_pontok = 0;

function pontozoh(szam) { 
	let hazaipont = document.getElementById("pontszam-hazai");
	var hazaipir = document.getElementById("pszamhazai");
	var hpsz = hazaipont.value
	if (hpsz <= 3 && palyaplayershaza > 0) {
		let hazaip = document.getElementById("hazaipalya");
		var hazaivalasztottpalya = hazaip.options[hazaip.selectedIndex].text;
		hazai_pontok += Number(hazaipont.value);
		if (hpsz > 0) log("Hazai pontszerzés: " + hpsz, hazaivalasztottpalya);
		else log("Hazai kihagyott pontszerzés", hazaivalasztottpalya);
		hazaipir.innerHTML = hazai_pontok;
	}
	else {
		if (hpsz > 3 ) triggerError("Túl magas pontszám!")
		if (palyaplayershaza <= 0) triggerError("Nincs a pályán játékos!")
	}
}

function pontozov() {
	let vendegpont = document.getElementById("pontszam-vendeg");
	var vendegpir = document.getElementById("pszamvendeg");
	var vpsz = vendegpont.value;
	if (vpsz <= 3 && palyaplayersvendeg > 0) {
		let vendegp = document.getElementById("vendegpalya");
		var vendegvalasztottpalya = vendegp.options[vendegp.selectedIndex].text;
		vendeg_pontok += Number(vpsz);
		if (vpsz > 0) log("Vendég pontszerzés: " + vpsz, vendegvalasztottpalya);
		else log("Vendég kihagyott pontszerzés", vendegvalasztottpalya)
		vendegpir.innerHTML = vendeg_pontok;
	}
	else {
		if (vpsz > 3 ) triggerError("Túl magas pontszám!")
		if (palyaplayersvendeg <= 0) triggerError("Nincs a pályán játékos!")
	}
}

function ponthazai() { pontozoh(); }
function pontvendeg() { pontozov(); }
/*------------------------------*/
var maxplayershaza = 5;
var palyaplayershaza = 0;
var maxplayersvendeg = 5;
var palyaplayersvendeg = 0;

function hazaipalyara() {
	let hazai2 = document.getElementById("hazaiplayer");
	let hazaip = document.getElementById("hazaipalya");
	if (palyaplayershaza < maxplayershaza) {
		var hazaivalasztott = hazai2.options[hazai2.selectedIndex].text;
		console.log(hazaivalasztott);
		let playeradd = document.createElement("option");
		hazaip.add(playeradd);
		hazai2.remove(hazai2.selectedIndex);
		playeradd.text = hazaivalasztott;
		playeradd.value = palyaplayershaza;
		palyaplayershaza++;
		console.log(palyaplayershaza);
	}
	if (palyaplayershaza == maxplayershaza) {
		var hazaivalasztottpalya = hazaip.options[hazaip.selectedIndex].text;
		var hazaivalasztottkispad = hazai2.options[hazai2.selectedIndex].text;
		let playeraddhkcsere = document.createElement("option");
		let playeraddhpcsere = document.createElement("option");
		hazaip.add(playeraddhpcsere);
		playeraddhpcsere.text = hazaivalasztottkispad;
		playeraddhpcsere.value = palyaplayershaza;
		hazai2.add(playeraddhkcsere);
		playeraddhkcsere.text = hazaivalasztottpalya;
		playeraddhkcsere.value = hazai2.lenght + 1;
		log("Hazai csere", hazaivalasztottpalya, hazaivalasztottkispad);
		hazai2.remove(hazai2.selectedIndex);
		hazaip.remove(hazaip.selectedIndex);
		
	}
}

function vendegpalyara() {
	let vendeg2 = document.getElementById("vendegplayer");
	let vendegp = document.getElementById("vendegpalya");
	if (palyaplayersvendeg < maxplayersvendeg) {
		var vendegvalasztott = vendeg2.options[vendeg2.selectedIndex].text;
		console.log(vendegvalasztott);
		let playeradd2 = document.createElement("option");
		vendegp.add(playeradd2);
		vendeg2.remove(vendeg2.selectedIndex);
		playeradd2.text = vendegvalasztott;
		playeradd2.value = palyaplayersvendeg;
		palyaplayersvendeg++;
	}
	if (palyaplayersvendeg == maxplayersvendeg) {
		var vendegvalasztottpalya = vendegp.options[vendegp.selectedIndex].text;
		var vendegvalasztottkispad = vendeg2.options[vendeg2.selectedIndex].text;
		let playeraddvkcsere = document.createElement("option");
		let playeraddvpcsere = document.createElement("option");
		vendegp.add(playeraddvpcsere);
		playeraddvpcsere.text = vendegvalasztottkispad;
		playeraddvpcsere.value = palyaplayersvendeg;
		vendeg2.add(playeraddvkcsere);
		playeraddvkcsere.text = vendegvalasztottpalya;
		playeraddvkcsere.value = vendeg2.lenght + 1;
		log("Vendég csere", vendegvalasztottpalya, vendegvalasztottkispad);
		vendeg2.remove(vendeg2.selectedIndex);
		vendegp.remove(vendegp.selectedIndex);
	}
}

function hazaicsere () { hazaipalyara(); }
function vendegcsere () { vendegpalyara(); }
/*--------------------------------------------------*/
function hazaikick() {
	let hazaip = document.getElementById("hazaipalya");
	var hazaivalasztottpalya = hazaip.options[hazaip.selectedIndex].text;
	log("Hazai eltiltás", hazaivalasztottpalya)
	hazaip.remove(hazaip.selectedIndex);
	--maxplayershaza;
	--palyaplayershaza;
} 

function vendegkick() {
	let vendegp = document.getElementById("vendegpalya");
	var vendegvalasztottpalya = vendegp.options[vendegp.selectedIndex].text;
	log("Vendég eltiltás", vendegvalasztottpalya)
	vendegp.remove(vendegp.selectedIndex);
	--maxplayersvendeg;
	--palyaplayersvendeg;
}
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
	if (h == v) { 
		console.error("Nem játszhat maga ellen!");
		triggerError("Nem játszhat maga ellen!");
		return true;
	}
}

function triggerHelp() {
	$("#helpMessage").modal("show");
}

function triggerError(message) {
	content = document.getElementById("errorMessageContent");
	content.innerHTML = "Unknown error!";
	content.innerHTML = message;
	$("#errorMessage").modal("show");
}
/*-----------------------------*/
$(document).ready(function () {
	var listItems = "";
	var k_json = ajax_post("kosar.php", "csapatok=1", 1);               // JSON!
	console.log(k_json);
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
		if (sameteams(hazai.value, vendeg.value)) {
			hazai.value = "default";
			$("#hazaiplayer").empty();
			$('#hazaipalya').empty()
		}
		else {
			let val1 = $("#hazaiselect option:selected").val();
			let csapat = ajax_post("kosar.php", `ID_CSAPAT=${val1}`, 1)
			console.log(csapat)
			let player = document.getElementById("hazaiplayer");
			$('#hazaiplayer').empty()
			palyaplayershaza = 0;
			player.innerHTML = csapat["Jatekosok"]
			console.log(k_json);
		}
	})

	$("#vendegselect").change(function(){
		if (sameteams(hazai.value, vendeg.value)) {
			vendeg.value = "default";
			$("#vendegplayer").empty();
			$('#vendegpalya').empty()
		}
		else {
			let val2 = $("#vendegselect option:selected").val();
			let csapat1 = ajax_post("kosar.php", `ID_CSAPAT=${val2}`, 1)
			console.log(csapat1)
			let player1 = document.getElementById("vendegplayer");
			palyaplayersvendeg = 0;
			player1.innerHTML = csapat1["Jatekosok"]
		}
	})
});
