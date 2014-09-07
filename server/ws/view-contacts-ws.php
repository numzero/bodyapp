<?
include 'header.php';
include '../lib/contacts.php';


$view = new contacts();
$ans=$view->view_contacts();


$j=0;
while($row=mysqli_fetch_array($ans)){
	if($row[7]=="none.jpeg"){
		$row[7]=$row[8];
	}
	for($i=0;$i<9;$i++){
		$data[$j][$i]=$row[$i];
		
	}
	$j++;


}

echo json_encode($data)
?>