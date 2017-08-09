<?php
$xml_dir = 'calender.xml';

if(!isset($_POST["delete"]) && !isset($_POST["update"]) && !isset($_POST["upload"])) {
    exit();
}

if(isset($_POST["delete"])){
	deleteFeature($_POST["index"], $xml_dir);
} else if(isset($_POST["update"])){
	editXML($_POST["title"], $_POST["date"], $xml_dir, $_POST["index"]);
} else if(isset($_POST["upload"])){
	uploadFeature($_POST["title"], $_POST["date"], $xml_dir);
}

//header('Location: admin.html');

function deleteFeature($index, $xml_dir){
	if (file_exists($xml_dir)) {
	    $doc = new DOMDocument();
		$doc->load($xml_dir);
		$index = intval($index);
		$calender = $doc->documentElement;
		$event = $calender->getElementsByTagName('event');
		$del_feature = $calender->removeChild($event[$index]);
		$doc->save($xml_dir);
	} else {
	    exit('Failed to open calender.xml.');
	}

}

function uploadFeature($title, $date, $xml_dir) {
	$dom = new DOMDocument();
	$dom->load($xml_dir);
	echo("xml: ".$xml_dir);
	$calender = $dom->documentElement;
	$event = $dom->createElement('event');
	$title = $dom->createElement("title", $title);
	$date = $dom->createElement('date', $date);
	//append
	$event->appendChild($title);
	$event->appendChild($date);
	$calender->insertBefore($event, $calender->firstChild);
	$dom->save($xml_dir);
}

function editXML ($title, $date, $xml_dir, $index){
	if (file_exists($xml_dir)) {
		$xml = simplexml_load_file($xml_dir);
		$index = intval($index);
		$xml->event[$index]->date = $date;
		$xml->event[$index]->title = $title;
	    $xml->asXML($xml_dir);
	} else {
	    exit('Failed to open calender.xml.');
	}
}

?>