<?php
if(!isset($_POST["message"])) {
    exit();
}
header('Location: admin.html');
updateText();
echo($_POST["message"]);


function updateText() {
	$myfile = fopen("announcement.txt", "w");
    fwrite($myfile, $_POST["message"]);
    fclose($myfile);
}
?>