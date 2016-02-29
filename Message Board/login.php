<html>
<body>
<form>

User name: <input type="text"  name="userID"></input>
<p>
Password: <input type="password" name="userPassword"></input>
<p><input type="submit" value = "Login" name="Login"></input>



</form>
<?php
session_start();

if(isset($_GET['Login']))
{
	$givenID = $_GET['userID'];
	$givenPW = $_GET['userPassword'];
	$dbh = new PDO("mysql:host=127.0.0.1:3306;dbname=board","root","",array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
	$dbh->beginTransaction();
	$dbh->commit();
	$stmt = $dbh->prepare('select * from users WHERE username ="'.$givenID.'" AND password="'.md5($givenPW).'"');
	$stmt->execute();
	$queryCount = 0;
		while ($row = $stmt->fetch()) 
		{
			$queryCount = $queryCount + 1;
		}
			if ( $queryCount != 0)
			{
				print ("Welcome, ".$_GET['userID']."!");
					$_SESSION['userNameSession']= $givenID;
					$_SESSION['userPWSession']= $givenPW;
					header("Location: http://localhost/project6/board.php"); /* Redirect browser */
					exit();	
			}
			else
			{
				print ("Incorrect credintials. Try again.");
			}
}



?>
</body>
</html>