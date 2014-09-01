<?

$file_type=explode("/", $_FILES["file"]["type"]);
$user_id = $_GET['uid'];
$dir = "../temp/";
$new_name =$user_id."_l1.".$file_type[1];
if(move_uploaded_file($_FILES['file']['tmp_name'],$dir.$new_name)){
	echo $new_name;
}else{
	echo "false";
}

?>