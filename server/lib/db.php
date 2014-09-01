<?
class db {
	private $host = "localhost";
	private $db = "mkone";
	private $user="root";
	private $pass="root";

	function db (){
		$this->con=mysqli_connect($this->host,$this->user,$this->pass,$this->db) or die("Can't Connect to Internet");
		$this->set = mysqli_set_charset($this->con, "utf8");
	}
	function query($sql){
	
		$result = mysqli_query($this->con, $sql) or die("Can't read");
		return $result;
	}
}

/*$db = new db();

$db->query("555");*/
?>