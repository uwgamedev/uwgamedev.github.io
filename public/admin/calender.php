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
	uploadFeature($_POST["title"], $_POST['date'], $xml_dir);
}

header('Location: ../admin/');

function deleteFeature($index, $xml_dir){
	if (file_exists($xml_dir)) {
	    $doc = new DOMDocument();
		$doc->load($xml_dir);
		$index = intval($index);
		$calender = $doc->documentElement;
		$event = $calender->getElementsByTagName('event');
		$del_feature = $calender->removeChild($event->item($index));
		$doc->save($xml_dir);
		header('Location: ../admin/');
		exit;
	} else {
	    exit('Failed to open calender.xml.');
	}

}

function uploadFeature($title, $date, $xml_dir) {
	$dom = new DOMDocument();
	$dom->load($xml_dir);
	$time = strtotime($date);
	$new_date = date('Y-m-d', $time);
	$calender = $dom->documentElement;
	$events = $calender->getElementsByTagName('event');
	$event = $dom->createElement('event');
	$title = $dom->createElement("title", $title);
	$date = $dom->createElement('date', $new_date);

	//append
	$event->appendChild($title);
	$event->appendChild($date);
	insertEvent($calender, $events, $event, $new_date, $time);
	$dom->save($xml_dir);
}

function insertEvent($calender, $events, $event, $new_date, $stamp) {
	if($events->length == 0) {
		$calender->insertBefore($event, $calender->firstChild);
	} else {
		for($i = 0; $i < $events->length; $i++){
			//echo("[i: ".$i." ");
		  	$date2value = $events->item($i)->getElementsByTagName('date')->item(0)->nodeValue;

		  	$date2stamp = strtotime($date2value);
		  	$date2string = date('Y-m-d', $date2stamp);

		  	$datetime2 =date_create($date2string);
		  	$datetime1 = date_create($new_date);
			$diff = $stamp - $date2stamp;
			echo($diff."] , ");
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


function editXML ($title, $time, $xml_dir, $index){
	if (file_exists($xml_dir)) {
	    $doc = new DOMDocument();
		$doc->load($xml_dir);
		$index = intval($index);
		$calender = $doc->documentElement;
		$events = $calender->getElementsByTagName('event');
		$edit_event = $calender->removeChild($events->item($index));

		$stamp = strtotime($time);
		$new_date = date('Y-m-d', $stamp);

		$edit_event->getElementsByTagName('title')->item(0)->nodeValue = $title;
		$edit_event->getElementsByTagName('date')->item(0)->nodeValue = $new_date;
		insertEvent($calender, $events, $edit_event, $new_date, $stamp);
		$doc->save($xml_dir);
	}
}

?>