(function() {
	"use strict";

	window.onload = function() {
		loadXML("./Announcements/current.xml",loadAnnouncements)
	};

	function loadXML(address, action){
		var ajax = new XMLHttpRequest();
		ajax.open("GET", address, true);
		ajax.onload = action;
		ajax.send();

	}

	function loadAnnouncements(xml) {
		var allBooks = this.responseXML.querySelectorAll("announcement");
		console.log(allBooks.size);

		document.getElementById("Announcements").innerHTML = "";

	}














})();