<html>
<head><title>Message Board</title></head>
<style type="text/css">

table tr {
	background-color: #FFFF66;
	
}
 
tr:hover {    
	background-color: white	;
}
</style>
<h2> Welcome to Or's message board! </h2>
<body>
<form>

Post a message: <input type="text"  name="message"></input>
<input type="submit" value = "Post!" name="Post"></input>
<input type="submit" value = "Sign Out" name="Logout"></input>

</form>
<?php
session_start();
if(isset($_GET['Logout']))
{
		unset($_SESSION['userNameSession']);
		unset($_SESSION['userPWSession']);
		
		header("Location: http://localhost/project6/login.php"); 
		/* Redirect browser */
		exit();	
	
	
}


error_reporting(E_ALL);
ini_set('display_errors','On');

try {
  $dbh = new PDO("mysql:host=127.0.0.1:3306;dbname=board","root","",array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
 // print_r($dbh);
  $dbh->beginTransaction();
  $dbh->exec('delete from users where username="smith"');
 
  $dbh->exec('insert into users values("smith","' . md5("mypass") . '","John Smith","smith@cse.uta.edu")')
        or die(print_r($dbh->errorInfo(), true));
  $dbh->commit();
	$messageCounter = 0;
  $stmt2 = $dbh->prepare('select * from posts');
  $stmt2->execute();

   while ($row = $stmt2->fetch()) 
   {
	 
	  
		$messageCounter = $messageCounter + 1;
   }
   
	
  $stmt = $dbh->prepare('select * from users');
  $stmt->execute();
  // print "<pre>";
  // while ($row = $stmt->fetch()) {
    // print_r($row);
  // }
  // print "</pre>";
  
   $stmt3 = $dbh->prepare('select * from posts');
  $stmt3->execute();
	 $tableFormat = "";
	 $tableFormat .= "<table>";
	 // $tableFormat .= "<tr><td> ID   UserName  Date posted  Message </td></tr>";
	print "<pre>";
   while ($row3 = $stmt3->fetch()) 
   {
		$tableFormat.= "<tr><td>".$row3[0]."</td>";
		$tableFormat .= "<td></td>";
		$tableFormat.= "<td>".$row3[1]."</td>";
		$tableFormat .= "<td></td>";
		$tableFormat.= "<td>".$row3[2]."</td>";
		$tableFormat .= "<td></td>";
		$tableFormat.= "<td>".$row3[3]."</td></tr>";
		$tableFormat .= "<td></td>";
		
		
	// print_r ($row3[3]);
		// echo "<p>";
   }
	print "</pre>";
  	
 
   
		// $tableFormat.= "<tr><td>".."</td>";
		// $tableFormat.= "<td>".."</td></tr>";
	// }
	 $tableFormat .= "</table>";
	
	
	 echo $tableFormat;
  
} catch (PDOException $e) {
  print "Error!: " . $e->getMessage() . "<br/>";
  die();
  
 
  
}

if(isset($_GET['Post']))
{
	$userSessionName = $_SESSION['userNameSession'];
	$messageEntered = $_GET['message'];

	$dbh->exec('insert into posts values ("'.uniqid().'","'.$userSessionName.'",now(),"'.$messageEntered.'" )');
	$messageCounter = $messageCounter + 1;
	header("Location: http://localhost/project6/board.php"); /* Redirect browser */
	// echo $userSessionName;
	// echo " Entered: ".$messageEntered;
	
}



?>
</body>
</html>