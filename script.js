(function() {
	// const api = "http://uwgamedev.x10host.com/admin/backend/data/";
	const api = "./data/";
	"use strict";
	var pages;

	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
					  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
					];

	window.onload = function() {
		findPages();
		projectSortButtons();
		loadXML(api + "projects.xml", loadProjects, 2, true);
		loadXML(api + "calender.xml", loadCalender);
		loadXML(api + "announcement.txt", loadAnnouncement);
	};

	function loadAnnouncement() {
		var announcement = document.getElementById("announcement");
		announcement.innerHTML = this.responseText;
	}

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

	var projectButtons = [];

	function projectSortButtons() {
		var byName = document.getElementById("project_by_name");
		var byAuthor = document.getElementById("project_by_author");
		var byDate = document.getElementById("project_by_date");

		projectButtons.push(byName);
		projectButtons.push(byAuthor);
		projectButtons.push(byDate);

		byName.onclick = function(){loadXML(api + "projects.xml", loadProjects, 0, false);};
		byAuthor.onclick = function(){loadXML(api + "projects.xml", loadProjects, 1, false);};
		byDate.onclick = function(){loadXML(api + "projects.xml", loadProjects, 2, true);};
	}

	// tests the sort projects function. Prints out the order onto the html page 
	function loadProjects(sortIndex, isReverse){
		for(var j = 0; j < projectButtons.length; j++){
			projectButtons[j].classList.remove("project_sort_current");
		}
		projectButtons[sortIndex].className += " project_sort_current"; 
		var project_container = document.getElementById("projects_container");
		projects_container.innerHTML = "";
		var projects = createProjectArray(this.responseXML.querySelectorAll("project"));
		//format: projects = [title , author, date  , link, description, image_src];
		projects = sortProjects(projects, sortIndex, isReverse);	
		
		for(var i = 0; i < projects.length; i++){
			//console.log("["+projects[i] +"], ");
			var game = document.createElement('div');
			game.className = "project";
			var caption = document.createElement('div');
			var title = document.createElement('div');
			
			title.className = "project_name";
			var author = document.createElement('span');
			author.innerHTML = projects[i][1];
			caption.className = "project_caption"
			author.className = "project_author";
			var tile = document.createElement('div');
			tile.className = "project_tile";
			var link = document.createElement('a');
			link.setAttribute('href', projects[i][3]);
			link.setAttribute('target', "_blank");
			link.innerHTML = projects[i][0];
			link.className = "project_link";
			tile.style.backgroundImage = "url("+projects[i][5]+")";

			var description = document.createElement('div');
			description.innerHTML = projects[i][4];
			description.className = "project_caption hover-other project_description";
			title.appendChild(link);

			game.appendChild(tile);
			caption.appendChild(title);
			link.appendChild(author);
			game.appendChild(caption);
			//game.appendChild(description);
			projects_container.appendChild(game);
		}
	}

	// this sorts out the project array by a given index (0 = title, 1 = author, 2 = date)
	// then you can also reverse the order with the order parameter
	function sortProjects(projects, indexOfOrder, reverse){		
		projects.sort(function(a,b){			
			var x = a[indexOfOrder].toLowerCase();
			var y = b[indexOfOrder].toLowerCase();
			
			return (x < y ? -1 : x > y ? 1 : 0) * (reverse ? -1 : 1);
		});	
		return projects;
	}
	
	// takes in your response XML and converts it into a project array that can be sorted by the above function
	// I can't really test this, since I can't access the XML directly, but it should work
	function createProjectArray(projectXML){
		var projects = [];
		for(var i = 0; i < projectXML.length; i++) {
			var newProject = [projectXML[i].querySelector("title").textContent, projectXML[i].querySelector("author").textContent, projectXML[i].querySelector("date").textContent, projectXML[i].querySelector("link").textContent,
			projectXML[i].querySelector("description").textContent,projectXML[i].querySelector("image_src").textContent];
			
			projects.push(newProject);
		}
		return projects;
	}


	function loadCalender() {
		var calender = this.responseXML.querySelectorAll("event");
		var calender_container = document.getElementById("event_name");
		calender_container.innerHTML = "";

		var now = new Date();
		var date_container;
		var closest_diff = Infinity;

		for(var i = 0; i < calender.length; i++){
			var container = document.createElement('div');
			container.className = "event";
			var title = document.createElement('div');
			title.className = "event_title";
			var date = document.createElement('div');
			date.className = "event_date";
			var month = document.createElement('span');
			month.className = "event_month";

			title.innerHTML = calender[i].querySelector("title").textContent;
			var rawDate = calender[i].querySelector("date").textContent.split("-");
			var monthIndex = parseInt(rawDate[1]);
			var yearInt = parseInt(rawDate[0]);
			var dayInt = parseInt(rawDate[2]);
			month.innerHTML = monthNames[monthIndex - 1];
			date.innerHTML =  rawDate[2] + " ";
			date.appendChild(month);
			
			container.appendChild(date);
			container.appendChild(title);
			calender_container.appendChild(container);

			var tempdate = new Date(yearInt, monthIndex - 1, dayInt);
			var temp_diff = now.getTime() - tempdate.getTime();
			if((temp_diff > closest_diff && temp_diff <= 0 || date_container == null) && tempdate > now ){
				closest_diff = temp_diff;
				date_container = date;
			}
		}
		date_container.style.backgroundColor = "#FFD700";
	}

	function loadXML(address, action, sortIndex, isReverse){
		var ajax = new XMLHttpRequest();
		ajax.open("GET", address, true);
		ajax.setRequestHeader('Content-Type',  'text/xml');
		if(sortIndex != null) {
			ajax.onload = action.bind(ajax, sortIndex, isReverse);
		} else {
			ajax.onload = action;
		}
		ajax.send();
	}

})();