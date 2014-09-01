<?
include 'db.php'
class contacts {

	function add_contacts($key){
		$sql="insert into contacts values('$key[0]','$key[1]','$key[2]','$key[3]','$key[4]','$key[5]','$key[6]')";
		$ans=$this->query($sql);

		$key[1]=$key[0]."_l1";
		$key[2]=$key[0]."_l2";
		$key[3]=$key[0]."_l3";
		$key[4]=$key[0]."_l4";
		$sql="insert into contacts_look values('$key[0]','$key[1]','$key[2]','$key[3]','$key[4]')";
		$ans=$this->query($sql);

		$key[1]=$key[0]."_c1";
		$key[2]=$key[0]."_c2";
		$sql="insert into contacts_pic values('$key[0]','$key[1]','$key[2]')";
		$ans=$this->query($sql);

		return $ans;
	}
}

/*$db = new db();

$db->query("555");*/
?>