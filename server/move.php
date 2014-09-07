<?
$user_id=540;
$phone="0949377560";

if($user_id && $phone){
	copy("temp/".$user_id."_c1.jpeg","real/".$phone."_c1.jpeg");
	copy("temp/".$user_id."_c2.jpeg","real/".$phone."_c2.jpeg");
	copy("temp/".$user_id."_l1.jpeg","real/".$phone."_l1.jpeg");
	copy("temp/".$user_id."_l2.jpeg","real/".$phone."_l2.jpeg");
	copy("temp/".$user_id."_l3.jpeg","real/".$phone."_l3.jpeg");
	copy("temp/".$user_id."_l4.jpeg","real/".$phone."_l4.jpeg");

	unlink("temp/".$user_id."_c1.jpeg");
	unlink("temp/".$user_id."_c2.jpeg");
	unlink("temp/".$user_id."_l1.jpeg");
	unlink("temp/".$user_id."_l2.jpeg");
	unlink("temp/".$user_id."_l3.jpeg");
	unlink("temp/".$user_id."_l4.jpeg");
}else{
	echo "false";
}
?>