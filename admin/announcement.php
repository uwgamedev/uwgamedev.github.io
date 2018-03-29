<?php
if(!isset($_POST["message"])) {
    exit();
}
updateText();
header('Location: ../admin/');

function updateText() {
	$myfile = fopen("announcement.txt", "w");
    fwrite($myfile, $_POST["message"]);
    fclose($myfile);
}
?>