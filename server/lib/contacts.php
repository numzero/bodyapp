<?
include 'db.php';
class contacts extends db{

	function check_contacts($key){
		$sql="select * from contacts where Cphone='$key[0]'";
		$ans=$this->query($sql);
		$row=mysqli_num_rows($ans);
		if($row == 0){
			return true;
		}else{
			return false;
		}
	}

	function add_contacts($key){
		$sql="insert into contacts values('$key[0]','$key[1]','$key[2]','$key[3]','$key[4]','$key[5]')";
		$ans=$this->query($sql);
		if($ans){
			return true;
		}else{
			return false;
		}

	}
	function add_looking($key){
		$date =date("Y-m-d H:i:s");
		$sql="insert into looking values('$key[0]','$key[6]','$date')";
		$ans=$this->query($sql);

		if($ans){
			return true;
		}else{
			return false;
		}
	}
	function add_pic($key){

		$sql="insert into pic_contacts values('$key[0]','$key[1]','$key[2]')";
		$ans=$this->query($sql);


		$sql="insert into pic_looking values('$key[0]','$key[3]','$key[4]','$key[5]','$key[6]')";
		$ans=$this->query($sql);

	}

	function view_contacts(){
		$sql="select * from contacts inner join pic_contacts on contacts.Cphone=pic_contacts.Cphone";
		$ans=$this->query($sql);
		return $ans;
	}

	function view_detail($key){
		$sql="select * from contacts,pic_contacts where (contacts.Cphone='$key' && pic_contacts.Cphone='$key')";
		$ans=$this->query($sql);
		return $ans;
	}

	function view_looking(){
		$sql="select * from looking inner join pic_contacts on looking.Cphone=pic_contacts.Cphone";
		$ans=$this->query($sql);
		return $ans;
	}
}

?>

