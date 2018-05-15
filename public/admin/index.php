<?php
    session_start();
#check if the user has logged in correctly, otherwise take to log in page
    if(!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] == false) {
        header("Location: login.php");
    }
?>

<!DOCTYPE html>
<html>
<head>
<style>
@font-face {
    font-family: Prime;
    src: url(prime.otf);
}</style>
<title>GDC</title>
<link href="https://fonts.googleapis.com/css?family=Saira" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="admin.css">
<!-- Include stylesheet -->
<link href="https://cdn.quilljs.com/1.3.5/quill.snow.css" rel="stylesheet">



</head>

<body>

	<!--HEADERS-->
	<div id = "banner">
		<div id = "title">
		Game Development Club <br> <span class = "gold_text">ADMIN PANEL</span>
		</div>
	</div>
	<div id = "navigation">
		<ul>
			<li id = "nav_announcement" class = "highlight">Announcement</li>
			<li id = "nav_featured">Featured</li>
			<li id = "nav_calender">Calender</li>
			<li id = "nav_projects">Projects</li>
			<li id = "nav_slideshow">Slideshow</li>
		</ul>
	</div>


	<!--MAIN CONTENT AREA -->
	<div id = "main">
		<div id = "announcement">
			<h3>Current Announcement</h3>
		    <div id = "announce">
		    	<p>Hello World!</p>
			  	<p>Some initial <strong>bold</strong> text</p>
			  	<p><br></p>
		    </div>
		    <form action = "announcement.php" method="post" onsubmit="prepareDiv()">
				<input type="hidden"  id="announcement_box" name="message">
		    	<input class = "update" type="submit" value="Submit">
		    </form>
		</div>

		<script type="text/javascript">
			function prepareDiv() {
		    	document.getElementById("announcement_box").value = document.getElementById("announce").getElementsByTagName( 'div' )[0].innerHTML;
			}
		</script>

		<div id = "featured">
			<h3>Featured List</h3>
			<div id = feature_container>
				<div class = "feature">
					<form action="feature.php" enctype="multipart/form-data" method="post">
						<div class = "feature_caption">
							<input type="file" name="feature_image" id="feature_image_upload" required>
							<input type="text" class = "feature_form" name="title" placeholder="TITLE NAME" required>
							<input type="text" class = "feature_form" name="author" placeholder="AUTHOR NAME" required>
							<input type="text" class = "feature_form" name="link" placeholder="URL LINK" required>
							<input type="date" class = "feature_form" name="date" required>
							<input type="text" name = "database" value = "featured" class = "input_hide">
					    	<input type="submit" class = "update" value="Upload" name = "upload">
						</div>
			    	</form>

				</div>
			</div>
		</div>

		<div id = "projects">
			<h3>Club Projects</h3>
			<div id = project_container>
				<div class = "feature">
					<form action="feature.php" enctype="multipart/form-data" method="post">
						<div class = "feature_caption">
							<input type="file" name="feature_image" id="feature_image_upload" required>
							<input type="text" class = "feature_form" name="title" placeholder="TITLE NAME" required>
							<input type="text" class = "feature_form" name="author" placeholder="AUTHOR NAME" required>
							<input type="text" class = "feature_form" name="link" placeholder="URL LINK" required>
							<input type="text" class = "feature_form" name="description" placeholder="DESCRIPTION" required>
							<input type="date" class = "feature_form" name="date" required>
							<input type="text" name = "database" value = "projects" class = "input_hide">
					    	<input type="submit" class = "update" value="Upload" name = "upload">
						</div>
			    	</form>

				</div>
			</div>
		</div>


		<div id  = "calender">
			<h3>Quartly Calender</h3>
			<div id = calender_container>
				<div class = calender_event>
					<form action="calender.php" method="post">
					<input type="text" class = "calender_form" name="title" placeholder="Event Name" required>
					<input type="date" class = "calender_form" name="date" required>
			    	<input type="submit" class = "update" name = "upload" value="Add">
					</div>
			    	</form>
				</div>

			</div>
			<div id = "slideshow">
			<h3>Slideshow</h3>
			<div id = slideshow_container>
				<div class = "feature">
					<form action="slideshow.php" enctype="multipart/form-data" method="post">
						<div class = "feature_caption">
							<input type="file" name="feature_image" id="feature_image_upload" required>
							<input type="text" class = "feature_form" name="caption" placeholder="Caption" required>
							<input type="text" class = "feature_form" name="link" placeholder="Link" required>
					    	<input type="submit" class = "update" value="Upload" name = "upload">
						</div>
			    	</form>

				</div>
			</div>
		</div>
		</div>
	</div>
</body>

<!-- Main Quill library -->
<script src="//cdn.quilljs.com/1.3.5/quill.js"></script>
<script src="admin.js"></script>

</html>