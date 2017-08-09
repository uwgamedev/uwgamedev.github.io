(function() {
	"use strict";
	var pages;
	var nav_button;
	var feature_elements = [];
	var project_elements = [];
	window.onload = function() {
		findPages();
		loadXML("featured.xml", loadUploadedItems, 'text/xml', "feature_container", "feature", feature_elements, "featured");
		loadXML("projects.xml", loadUploadedItems, 'text/xml', "project_container", "project", project_elements, "projects");
		loadXML("announcement.txt", displayCurrentAnnouncement, 'text/plain');
		loadXML("calender.xml", loadCalender, 'text/xml');
	};

	function findPages() {
		var nav_announcement = document.getElementById("nav_announcement");
		nav_announcement.onclick = function(){ enablePage(0, nav_announcement);};
		var nav_featured = document.getElementById("nav_featured");
		nav_featured.onclick = function(){ enablePage(1, nav_featured);};
		var nav_calender = document.getElementById("nav_calender");
		nav_calender.onclick = function(){ enablePage(2, nav_calender);};
		var nav_projects = document.getElementById("nav_projects");
		nav_projects.onclick = function(){ enablePage(3, nav_projects);};
		var announcement = document.getElementById("announcement");
		var featured = document.getElementById("featured");
		var calender = document.getElementById("calender");
		var projects = document.getElementById("projects");
		pages = [announcement, featured, calender, projects];
		featured.style.display = "none";
		calender.style.display = "none";
		projects.style.display = "none";
		nav_button = nav_announcement;
	}

	function enablePage(index, nav){
		changeHighlight(nav);
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

	function loadCalender(){
		var calender_nodes = this.responseXML.querySelectorAll("event");
		var calender_container = document.getElementById("calender_container");

		for(var i = 0; i < calender_nodes.length; i++){
			(function(i){
				var temp = i;
				var event = document.createElement('div');
				var form = document.createElement('form');
				var title = document.createElement('input');
				var date = document.createElement('input');
				var update = document.createElement('input');
				var del = document.createElement('input');
				var index = document.createElement('input');

				form.action = "calender.php";
				form.method = "post"; 
				event.className = "calender_event";
				title.className = "calender_form";
				date.className = "calender_form";
				del.className = "delete";
				update.className = "update";


				index.name = "index";
				index.type = "number";
				index.value = ""+temp;
				title.type = "text";
				title.name = "title";
				title.value = calender_nodes[i].querySelector("title").textContent;
				title.placeholder = "Title";
				date.type = "text";
				date.name = "date";
				date.value = calender_nodes[i].querySelector("date").textContent;
				date.placeholder = "Event Date (eg. 'Oct. 9')";

				del.type = "submit";
				del.name = "delete";
				del.value = "Delete";
				update.type = "submit";
				update.name = "update";
				update.value = "Update";

				index.style.display = "none";

				calender_container.appendChild(event);
				event.appendChild(form);
				form.appendChild(title);
				form.appendChild(date);
				form.appendChild(update);
				form.appendChild(del);
			})(i);
		}
	}

	function loadUploadedItems(container, xml, element_array, database) {
		var features = this.responseXML.querySelectorAll(xml);
		var feature_container = document.getElementById(container);

		for(var i = 0; i < features.length; i++) {
			(function(i){
				var temp = i;
				var feature = document.createElement('div');
				var tile = document.createElement('div');
				var caption = document.createElement('div');
				var form = document.createElement('form');
				var title = document.createElement('input');
				var author = document.createElement('input');
				var link = document.createElement('input');
				var update = document.createElement('input');
				var del = document.createElement('input');
				var expand = document.createElement('div');
				var collapse = document.createElement('div');
				var index = document.createElement('input');
				var database = document.createElement('input');
				element_array.push(caption);
				element_array.push(update);
				element_array.push(del);
				element_array.push(expand);
				element_array.push(collapse);

				title.value = features[i].querySelector("title").textContent;
				tile.style.backgroundImage = "url("+features[i].querySelector("image_src").textContent+")";
				author.value = features[i].querySelector("author").textContent;
				author.placeholder = "Author Name";
				title.placeholder = "Title Name";
				link.placeholder = "URL Link"
				feature.className = "feature";
				tile.className = "feature_tile";
				caption.className = "feature_caption";
				author.className = "feature_form";
				author.type = "text";
				author.name = "author";
				title.className = "feature_form";
				title.type = "text";
				title.name = "title";
				link.className = "feature_form";
				link.type = "text";
				link.name = "link";
				link.value = features[i].querySelector("link").textContent;
				index.name = "index";
				index.type = "number";
				index.value = ""+temp;
				database.type = "text";
				database.value = database;
				database.name = "database";
				console.log(database.value);

				title.required = true;
				author.required = true;
				link.required = true;

				expand.className = "feature_expand";
				collapse.className = "feature_collapse";
				collapse.onclick = (function(temp) {return function() {	
					element_array[5 * temp].style.display = "none";
					element_array[5 * temp + 1].style.display = "none";
					element_array[5 * temp + 2].style.display = "none";
					element_array[5 * temp + 3].style.display = "block";
					element_array[5 * temp + 4].style.display = "none";
				};})(temp);
				expand.onclick = (function(temp) {return function() {
					element_array[5 * temp].style.display = "block";
					element_array[5 * temp+ 1].style.display = "block";
					element_array[5 * temp+2].style.display = "block";
					element_array[5 * temp+3].style.display = "none";
					element_array[5 * temp+4].style.display = "block";
				};})(temp);

				

				del.type = "submit";
				del.className = "delete";
				del.name = "delete";
				del.value = "Delete";
				update.type = "submit";
				update.name = "update";
				update.className = "update";
				update.value = "Update";

				caption.appendChild(title);
				caption.appendChild(author);
				caption.appendChild(link);
				form.appendChild(tile);
				form.appendChild(expand);
				form.appendChild(collapse);
				form.appendChild(caption);
				form.appendChild(update);
				form.appendChild(del);
				form.appendChild(index);
				console.log(index);
				feature.appendChild(form);
				feature_container.appendChild(feature);
				form.action = "feature.php";
				form.method = "post";

				update.style.display = "none";
				del.style.display = "none";
				caption.style.display = "none";
				collapse.style.display = "none";
				index.style.display = "none";

			})(i);


		}
	}

	function displayCurrentAnnouncement() {
		var text = this.responseText;
		var announcement = document.getElementById("announce_text");
		announcement.innerHTML = text;
	}

	function changeHighlight(button) {
		button.className = "highlight";
		nav_button.className = "";
		nav_button = button;
	}


	function loadXML(address, action, header, container, xml, element_array, database){
		var ajax = new XMLHttpRequest();
		ajax.open("GET", address, true);
		ajax.setRequestHeader('Content-Type', header);
		if(container != null) {
			ajax.onload = action.bind(ajax, container, xml, element_array, database);
		} else {
			ajax.onload = action;
		}
		ajax.send();
	}

})();