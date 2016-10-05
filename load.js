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
		var announcements = this.responseXML.querySelectorAll("announcement");
		console.log(announcements.length);
		for(var i = 0; i < announcements.length; i++) {
			var div = document.createElement("div");
			var title = document.createElement("h2");
			title.innerHTML = announcements[i].querySelector("title").textContent;
			var author = document.createElement("h3");
			author.innerHTML = announcements[i].querySelector("author").textContent + " " + announcements[i].querySelector("date").textContent;
			var body = document.createElement("p");
			body.innerHTML = announcements[i].querySelector("body").textContent;
			div.appendChild(title);
			div.appendChild(author);
			div.appendChild(body);
			document.getElementById("Announcements").appendChild(div);
		}
		

	}














})();