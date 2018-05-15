<?php

$target_dir = "../images/featured/";
$xml_dir = 'featured.xml';
$node_name = 'feature';



if(!isset($_POST["delete"]) && !isset($_POST["update"]) && !isset($_POST["upload"])) {
    exit();
}

$database = $_POST["database"];
if($database == "projects"){
	$xml_dir = 'projects.xml';
	$node_name = 'project';
	$target_dir = '../images/games/';
}

if(isset($_POST["delete"])){
	deleteFeature($_POST["index"], $xml_dir, $node_name);
} else if(isset($_POST["update"])){
	editXML($_POST["author"], $_POST["title"], $_POST["description"],$_POST["link"], $_POST["date"], $_POST["index"], $xml_dir, $database);
} else if(isset($_POST["upload"])){
	$target_file = $target_dir . basename($_FILES["feature_image"]["name"]);
	if (move_uploaded_file($_FILES["feature_image"]["tmp_name"], $target_file)) {
		$temp = "";
		if(isset($_POST["description"])){
			$temp = $_POST["description"];
		}
		uploadFeature($_POST["author"], $_POST["title"], $temp, $_POST["link"], $target_file, $xml_dir, $node_name, $database, $_POST["date"]);
    } else {
        echo($_FILES["feature_image"]["size"]);
    }
}

#header('Location: ../admin/');

function deleteFeature($index, $xml_dir, $node_name){
	if (file_exists($xml_dir)) {
	    $doc = new DOMDocument();
		$doc->load($xml_dir);
		$index = intval($index);
		$features = $doc->documentElement;
		$feature = $features->getElementsByTagName($node_name);
		$del_feature = $features->removeChild($feature->item($index));
		$file_path = $del_feature->getElementsByTagName('image_src')->item(0)->nodeValue;
		unlink($file_path);
		$doc->save($xml_dir);
	} else {
	    exit('Failed to open featured.xml.');
	}

}


function uploadFeature($author, $title, $description, $link, $src,$xml_dir, $node_name, $datebase, $date) {
	$dom = new DOMDocument();
	$dom->load($xml_dir);
	$features = $dom->documentElement;
	$feature = $dom->createElement($node_name);
	$srcNode = $dom->createElement("image_src", $src);
	$author = $dom->createElement('author', $author);
	$title = $dom->createElement('title', $title);
	$link = $dom->createElement('link', $link);
	//append
	$feature->appendChild($srcNode);
	$feature->appendChild($author);
	$feature->appendChild($title);
	$feature->appendChild($link);

	//$node_name = "feature";
	if($datebase == "projects") {
		$description = $dom->createElement('description', $description);
		$feature->appendChild($description);
	} 
	$time_stamp = strtotime($date);
	$new_date = date('Y-m-d', $time_stamp);
	$date_node = $dom->createElement('date', $new_date);
	$feature->appendChild($date_node);
	//echo("date: ".$date.". time stamp: ".$time_stamp.", new date: ".$new_date);
	findRecentProjectNode($features, $feature, $new_date, $time_stamp, $node_name);
	$dom->save($xml_dir);
	echo($xml_dir);
}

function findRecentProjectNode($calender, $event, $new_date, $stamp, $node_name) {
	$events = $calender->getElementsByTagName($node_name);
	if($events->length == 0) {
		$calender->insertBefore($event, $calender->firstChild);
		//echo("insert at 0");
	} else {
		for($i = 0; $i < $events->length; $i++){
			//echo("[i: ".$i." ");
		  	$date2value = $events->item($i)->getElementsByTagName('date')->item(0)->nodeValue;

		  	$date2stamp = strtotime($date2value);
		  	$date2string = date('Y-m-d', $date2stamp);

		  	$datetime2 =date_create($date2string);
		  	$datetime1 = date_create($new_date);
			$diff = $stamp - $date2stamp;
			//echo($diff."] , ");
			if($diff < 0){
				$calender->insertBefore($event, $events->item($i));
				//echo(" insert before: ".$i);
				break;
			} else if($i == $events->length - 1) {
				$calender->appendChild($event);
				break;
			}
		}
	}

}

function editXML ($author, $title, $description, $link, $time, $index, $xml_dir, $database){
	if (file_exists($xml_dir)) {
		$node_name = getNodeName($database);
	    $doc = new DOMDocument();
		$doc->load($xml_dir);
		$index = intval($index);
		$game_root = $doc->documentElement;
		$games = $game_root->getElementsByTagName($node_name);
		$edit_game = $game_root->removeChild($games->item($index));

		$stamp = strtotime($time);
		$new_date = date('Y-m-d', $stamp);

		$edit_game->getElementsByTagName('title')->item(0)->nodeValue = $title;
		$edit_game->getElementsByTagName('author')->item(0)->nodeValue = $author;
		$edit_game->getElementsByTagName('description')->item(0)->nodeValue = $description;
		$edit_game->getElementsByTagName('link')->item(0)->nodeValue = $link;
		$edit_game->getElementsByTagName('date')->item(0)->nodeValue = $new_date;


		findRecentProjectNode($game_root, $edit_game, $new_date, $stamp, $node_name);
		$doc->save($xml_dir);
	}
}

function getNodeName($database) {
	$node_name = "feature";
	if($database == "projects") {
		$node_name = "project";
	} 
	return $node_name;
}

?>