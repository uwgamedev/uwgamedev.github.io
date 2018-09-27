(function() {
	"use strict";
	var pages;
	var slideIndex = 0;
	var slideRepeat;

	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
					  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
					];

	window.onload = function() {
		findPages();
		projectSortButtons();
		loadXML("http://uwgamedev.com/admin/backend/data/featured.xml", loadFeatured);
		loadXML("http://uwgamedev.com/admin/backend/data/projects.xml", loadProjects, 2, true);
		loadXML("http://uwgamedev.com/admin/backend/data/calender.xml", loadCalender);
		loadXML("http://uwgamedev.com/admin/backend/data/announcement.txt", loadAnnouncement);
		loadXML("http://uwgamedev.com/admin/backend/data/slideshow.xml", createSlides);
		showSlides(1);
		//var myVar = setTimeout(landingAnimation, 1500);
	};

	function landingAnimation() {
		//document.getElementById("logo_animation").classList.toggle('closed');
		document.getElementById("container").style.visibility = "visible";
	}

	function createSlides() {
		var images = this.responseXML.querySelectorAll("image");
		var container = document.getElementById('slideshow');
		if(images.length > 0) {
			container.innerHTML = "";
		}
		for(var i = 0; i < images.length; i++) {
			var outerDiv = document.createElement('div');
			outerDiv.className = "mySlides fade";
			var index = document.createElement('div');
			index.innerHTML = "" + (i+1) + " / " + images.length;
			index.className = "numbertext";
			var image = document.createElement('img');
			image.src = images[i].querySelector("source").textContent;
			image.style.width = "100%";
			var link = document.createElement('a');
			link.setAttribute('href', images[i].querySelector("link").textContent);
			link.setAttribute('target', "_blank");
			var caption = document.createElement('div');
			caption.className = "text";
			caption.innerHTML = images[i].querySelector("caption").textContent;
			link.appendChild(image);
			outerDiv.appendChild(index);
			outerDiv.appendChild(link);
			outerDiv.appendChild(caption);
			container.appendChild(outerDiv);

			if(i == 0){
				outerDiv.style.display = "block";
			}
		}
		var prev = document.createElement('a');
		prev.className = "prev";
		prev.onclick = function() { plusSlides(-1);};
		prev.innerHTML = "&#10094;";

		var next = document.createElement('a');
		next.className = "next";
		next.onclick = function() { plusSlides(1);};
		next.innerHTML = "&#10095;";
		container.appendChild(prev);
		container.appendChild(next);
	}

	function plusSlides(n) {
		clearTimeout(slideRepeat);
		showSlides(n);
	}

	function showSlides(n) {
	    var i;
	    var slides = document.getElementsByClassName("mySlides");
	    for (i = 0; i < slides.length; i++) {
	        slides[i].style.display = "none"; 
	    }
	    slideIndex+=n;
	    if (slideIndex> slides.length) {slideIndex = 1} 
	    if (slideIndex == 0) {slideIndex = slides.length-1} 
	    slides[slideIndex-1].style.display = "block"; 
	    slideRepeat = setTimeout(function(){showSlides(1);}, 8000); 
	}

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
			link.setAttribute('target', "_blank");

			link.className = "feature_link";


			game.appendChild(tile);
			game.appendChild(caption);
			tile.appendChild(link);
			caption.appendChild(title);
			caption.appendChild(author);
			games_container.appendChild(game);
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

		byName.onclick = function(){loadXML("http://uwgamedev.com/admin/backend/data/projects.xml", loadProjects, 0, false);};
		byAuthor.onclick = function(){loadXML("http://uwgamedev.com/admin/backend/data/projects.xml", loadProjects, 1, false);};
		byDate.onclick = function(){loadXML("http://uwgamedev.com/admin/backend/data/projects.xml", loadProjects, 2, true);};
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