(function() {
	"use strict";

	window.onload = function() {
		loadXML("./Announcements/Current.xml",loadAnnouncements)
	};

	function loadXML(address, action){
		var ajax = new XMLHttpRequest();
		ajax.open("GET", address, true);
		ajax.onload = action;
		ajax.send();

	}

	function loadAnnouncements() {
		console.log("test");
		var allBooks = this.responseXML.querySelectorAll("announcement");
		console.log(allBooks.length);

		document.getElementById("Announcements").innerHTML = "test";

	}














})();