<?

//var_dump($_FILES);
//var_dump($_POST);if
$directory = 'temp/';
$files = glob($directory . '*');
$file_count = count( $files );

$file_type=explode("/", $_FILES["file"]["type"]);

$dir = "server/temp/";
$new_name =$dir."file_".$file_count.".".$file_type[1];
if(move_uploaded_file($_FILES['file']['tmp_name'],$new_name)){
	echo $new_name;
}else{
	echo "false";
}










?>