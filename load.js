(function() {
	"use strict";

	window.onload = function() {
		loadXML("./Announcements/Current.xml",loadAnnouncements);
		loadXML("./projects/ProjectList.xml", loadProjects);
		loadXML("./calendar/current.txt", loadCalendar);
	};

	function loadXML(address, action){
		var ajax = new XMLHttpRequest();
		ajax.open("GET", address, true);
		ajax.onload = action;
		ajax.send();

	}

	function loadAnnouncements() {
		var announcements = this.responseXML.querySelectorAll("announcement");
		for(var i = 0; i < announcements.length; i++) {
			var div = document.createElement("div");
			var title = document.createElement("h3");
			title.innerHTML = announcements[i].querySelector("title").textContent;
			var author = document.createElement("h5");
			author.innerHTML = announcements[i].querySelector("author").textContent + " " + announcements[i].querySelector("date").textContent;
			var body = document.createElement("p");
			body.innerHTML = announcements[i].querySelector("body").textContent;
			div.appendChild(title);
			div.appendChild(author);
			div.appendChild(body);
			document.getElementById("Announcements").appendChild(div);
		}
	}

	function loadProjects() {
		console.log(this);
		var projectsContainer = this.responseXML.querySelector("projects");
		var projects = projectsContainer.querySelectorAll("project");
		console.log(projects.length);
		for(var i = 0; i < projects.length; i++) {
			var div = document.createElement("div");
			var link = document.createElement("a");
			link.href = projects[i].querySelector("url").textContent;
			var thumbnail = document.createElement("img");
			thumbnail.src = projects[i].querySelector("image").textContent;
			thumbnail.alt = projects[i].querySelector("title").textContent;
			thumbnail.style.height = '200px';
			thumbnail.style.width = '200px';
			link.appendChild(thumbnail);
			var title = document.createElement("p");
			title.innerHTML = projects[i].querySelector("title").textContent;
			title.style.margin = "0";
			var caption = document.createElement("p");
			caption.innerHTML = projects[i].querySelector("author").textContent + "<br>" + projects[i].querySelector("date").textContent;
			caption.style.margin = "0";
			div.appendChild(link);
			div.appendChild(title);
			div.appendChild(caption);
			div.className = "games";
			document.getElementById("Projects").appendChild(div);
		}

	}

	function loadCalendar() {
		var allString = this.responseText;
		console.log(allString);
		var tokens = allString.split("\n");
		console.log(tokens[0]);
		var list = document.createElement ("ul");
		document.getElementById("calendar").appendChild(list);
		for(var i = 0; i < tokens.length; i++) {
			var bullet = document.createElement("li");
			var date = tokens[i].split(":");
			var highlight = document.createElement("span");
			highlight.innerHTML = date[0] +": ";
			highlight.style.color="#15c4be";
			var normal = document.createElement("span");
			normal.innerHTML = date[1];
			bullet.appendChild(highlight);
			bullet.appendChild(normal);
			list.appendChild(bullet);
		}
	}












})();