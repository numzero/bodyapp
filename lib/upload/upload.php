<?
//var_dump($_FILES);
//var_dump($_POST);if
if(move_uploaded_file($_FILES['file']['tmp_name'],"img/".$_FILES["file"]["name"])){
	echo "true";
}else{
	echo "false";
}



?>