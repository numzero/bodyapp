<?
include 'header.php';
include '../lib/contacts.php';


$view = new contacts();
$get=json_decode(file_get_contents("php://input"));
$key=$get->tel;

$ans=$view->view_detail($key);


$j=0;

while($row=mysqli_fetch_array($ans)){
	if($row[8] !="none.jpeg" && $row[7]=="none.jpeg"){
		$row[7]=$row[8];
		$row[8]="none.jpeg";
	}
	for($i=0;$i<9;$i++){
		$data[$j][$i]=$row[$i];
	}
	$j++;


}

echo json_encode($data);
?>