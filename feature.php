<?php
$target_dir = "images/featured/";
$xml_dir = 'featured.xml';
$node_name = 'feature';



if(!isset($_POST["delete"]) && !isset($_POST["update"]) && !isset($_POST["upload"])) {
    exit();
}

$database = $_POST["database"];
if($database == "projects"){
	$xml_dir = 'projects.xml';
	$node_name = 'project';
	$target_dir = 'images/games';
}

if(isset($_POST["delete"])){
	deleteFeature($_POST["index"], $xml_dir, $node_name);
} else if(isset($_POST["update"])){
	editXML($_POST["author"], $_POST["title"], $_POST["link"], $_POST["index"], $xml_dir);
} else if(isset($_POST["upload"])){
	$target_file = $target_dir . basename($_FILES["feature_image"]["name"]);
	if (move_uploaded_file($_FILES["feature_image"]["tmp_name"], $target_file)) {
		uploadFeature($_POST["author"], $_POST["title"], $_POST["link"], $target_file, $xml_dir, $node_name);
    } else {
        //echo($_FILES["feature_image"]["size"]);
    }
}

//header('Location: admin.html');

function deleteFeature($index, $xml_dir, $node_name){
	if (file_exists($xml_dir)) {
	    $doc = new DOMDocument();
		$doc->load($xml_dir);
		$index = intval($index);
		$features = $doc->documentElement;
		$feature = $features->getElementsByTagName($node_name);
		$del_feature = $features->removeChild($feature[$index]);
		$doc->save($xml_dir);
	} else {
	    exit('Failed to open featured.xml.');
	}

}


function uploadFeature($author, $title, $link, $src,$xml_dir, $node_name) {
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
	$features->insertBefore($feature, $features->firstChild);
	$dom->save($xml_dir);
}

function editXML ($author, $title, $link, $index, $xml_dir){
	if (file_exists($xml_dir)) {
		$xml = simplexml_load_file($xml_dir);
		$index = intval($index);
		$xml->feature[$index]->author = $author;
		$xml->feature[$index]->title = $title;
		$xml->feature[$index]->link = $link;
	    $xml->asXML($xml_dir);
	} else {
	    exit('Failed to open featured.xml.');
	}
}

?>