<?
include 'header.php';
include '../lib/contacts.php';


$view = new contacts();


$ans=$view->view_looking();

$j=0;

while($row=mysqli_fetch_array($ans)){
	$data[$j][0]=$row[0];
	$data[$j][1]=$row[1];
	$date = new DateTime($row[2]);
	$data[$j][2]=$date->format('Y-m-d');
	if($row[4]=="none.jpeg"){
		$row[4]=$row[5];
	}
	$data[$j][3]=$row[4];
	$j++;

}

echo json_encode($data);
?>