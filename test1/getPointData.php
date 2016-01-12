<?php
	//ini_set('display_errors',1);
	//phpinfo();
	$q = intval($_GET['q']);

	$con = pg_connect("host=localhost port=5432 dbname=Test user=postgres password=123");//mysqli_connect('localhost','peter','abc123','my_db');
	if (!$con) {
		die('Could not connect: ');
	}

	$sql = "SELECT * FROM test WHERE latitude = 22.222 AND longitude = 22.222";
	$result = pg_query($con,$sql);

	while($row = pg_fetch_array($result)) {
		echo $row['latitude'];
	}
	
	pg_close($con);
?>