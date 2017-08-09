(function() {
	"use strict";
	var pages;

	window.onload = function() {
		findPages();
		loadXML("featured.xml", loadFeatured);
		loadXML("projects.xml", loadProjects);
		loadXML("calender.xml", loadCalender);
	};

	function findPages() {
		var nav_home = document.getElementById("nav_home");
		nav_home.onclick = function(){ enablePage(0);};
		var nav_about = document.getElementById("nav_about");
		nav_about.onclick = function(){ enablePage(1);};
		var nav_projects = document.getElementById("nav_projects");
		nav_projects.onclick = function(){ enablePage(2);};
		var nav_resources = document.getElementById("nav_resources");
		nav_resources.onclick = function() {enablePage(3);};

		var home = document.getElementById("home");
		var about = document.getElementById("about");
		var projects = document.getElementById("projects");
		var resources = document.getElementById("resources");
		pages = [home, about, projects, resources];
		about.style.display = "none";
		projects.style.display = "none";
		resources.style.display = "none";

	}

	function enablePage(index){
		var page = pages[index];
		for(var i = 0; i < pages.length; i++){
			var temp = i;
			if(temp == index){
				pages[index].style.display = "block";
			} else {
				pages[temp].style.display = "none";
			}
		}
	}

	function loadFeatured(){
		var features = this.responseXML.querySelectorAll("feature");
		var games_container = document.getElementById("games");
		games_container.innerHTML = "";

		for(var i = 0; i < features.length; i++) {
			var game = document.createElement('div');
			var tile = document.createElement('div');
			var caption = document.createElement('div');
			var title = document.createElement('h4');
			var author = document.createElement('h5');

			title.innerHTML = features[i].querySelector("title").textContent;
			tile.style.backgroundImage = "url("+features[i].querySelector("image_src").textContent+")";
			author.innerHTML = features[i].querySelector("author").textContent;
			game.className = "game";
			tile.className = "tile";
			caption.className = "caption";

			var link = document.createElement('a');
			link.setAttribute('href', features[i].querySelector("link").textContent);
			link.className = "feature_link";


			game.appendChild(tile);
			game.appendChild(caption);
			tile.appendChild(link);
			caption.appendChild(title);
			caption.appendChild(author);
			games_container.appendChild(game);
		}
	}

	function loadProjects() {
		var projects = this.responseXML.querySelectorAll("project");
		var project_container = document.getElementById("projects_container");
		projects_container.innerHTML = "";
		console.log(this);
		console.log(projects);
		for(var i = 0; i < projects.length; i++) {
			var game = document.createElement('div');
			game.className = "project";
			game.style.backgroundImage = "url("+projects[i].querySelector("image_src").textContent+")";
			var link = document.createElement('a');
			link.setAttribute('href', projects[i].querySelector("link").textContent);
			link.className = "project_link";


			game.appendChild(link);
			projects_container.appendChild(game);
		}
	}

	function loadCalender() {
		var calender = this.responseXML.querySelectorAll("event");
		var calender_container = document.getElementById("event_name");
		calender_container.innerHTML = "";
		for(var i = 0; i < calender.length; i++){
			var title = document.createElement('li');
			var date = document.createElement('li');
			title.innerHTML = calender[i].querySelector("title").textContent;
			date.innerHTML = calender[i].querySelector("date").textContent;
			calender_container.appendChild(title);
			calender_container.appendChild(date);
		}

			
	}

	function loadXML(address, action){
		var ajax = new XMLHttpRequest();
		ajax.open("GET", address, true);
		ajax.setRequestHeader('Content-Type',  'text/xml');
		ajax.onload = action;
		ajax.send();
	}

})();