<?
include 'header.php';
include '../lib/contacts.php';



$data = json_decode(file_get_contents("php://input"));

$user_id=$data->user_id;
$key[0]=$data->tel;
$key[1]=$data->name;
$key[2]=$data->nname;
$key[3]=$data->email;
$key[4]=$data->keyword;
$key[5]=$data->type;
$key[6]=$data->look;

$add = new contacts();

$check=$add->check_contacts($key);
if($check == true){
	$c=$add->add_contacts($key);
	$l=$add->add_looking($key);
	
	$name = array("c1","c2","l1","l2","l3","l4");
	for($i=0;$i<6;$i++){
		$dir="../temp/".$user_id."_".$name[$i].".jpeg";
		if(file_exists($dir)){
			copy("../temp/".$user_id."_".$name[$i].".jpeg","../real/".$key[0]."_".$name[$i].".jpeg");
			unlink("../temp/".$user_id."_".$name[$i].".jpeg");
			$key[$i+1]=$key[0]."_".$name[$i];
		}else{
			$key[$i+1]="none.jpeg";
		}
	}
	$add->add_pic($key);
}

$val[0]=$check;
$val[1]=$c;
$val[2]=$l;

echo json_encode($val);







?>