<?php
$target_dir = "../images/slideshow/";
$xml_dir = 'slideshow.xml';

if(!isset($_POST["delete"]) && !isset($_POST["update"]) && !isset($_POST["upload"])) {
    exit();
}

if(isset($_POST["delete"])){
	deleteFeature($_POST["index"], $xml_dir);
} else if(isset($_POST["update"])){
	editXML($_POST["caption"], $_POST["link"], $xml_dir, $_POST["index"]);
} else if(isset($_POST["upload"])){
	$target_file = $target_dir . basename($_FILES["feature_image"]["name"]);
	if (move_uploaded_file($_FILES["feature_image"]["tmp_name"], $target_file)) {
		uploadFeature($_POST["caption"], $_POST["link"], $target_file, $xml_dir);
    }
}

header('Location: ../admin/');

function deleteFeature($index, $xml_dir){
	if (file_exists($xml_dir)) {
	    $doc = new DOMDocument();
		$doc->load($xml_dir);
		$index = intval($index);
		$slideshow = $doc->documentElement;
		$images = $slideshow->getElementsByTagName('image');
		$del_feature = $slideshow->removeChild($images->item($index));
		$doc->save($xml_dir);
		header('Location: ../admin/');
		exit;
	} else {
	    exit('Failed to open calender.xml.');
	}

}

function uploadFeature($caption, $link, $img_src, $xml_dir) {
	$dom = new DOMDocument();
	$dom->load($xml_dir);
	$slideshow = $dom->documentElement;
	$images = $slideshow->getElementsByTagName('event');
	$image = $dom->createElement('image');
	$source = $dom->createElement("source", $img_src);
	$caption = $dom->createElement('caption', $caption);
	$link = $dom->createElement('link', $link);

	//append
	$image->appendChild($source);
	$image->appendChild($caption);
	$image->appendChild($link);
	$slideshow->appendChild($image);
	$dom->save($xml_dir);
}


function editXML ($caption, $link, $xml_dir, $index){
	if (file_exists($xml_dir)) {
	    $doc = new DOMDocument();
		$doc->load($xml_dir);
		$index = intval($index);
		$slideshow = $doc->documentElement;
		$images = $slideshow->getElementsByTagName('image');
		$edit_image = $images->item($index);
		$edit_image->getElementsByTagName('caption')->item(0)->nodeValue = $caption;
		$edit_image->getElementsByTagName('link')->item(0)->nodeValue = $link;
		$doc->save($xml_dir);
	}
}

?>