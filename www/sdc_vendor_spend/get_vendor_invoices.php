<?php

header('Content-type: application/json');

$http_origin = $_SERVER['HTTP_ORIGIN'];
if ($http_origin == "https://www.getvesseltracker.com" || $http_origin == "https://getvesseltracker.com")
{ 
   header('Access-Control-Allow-Origin: *');
}
// header('Access-Control-Allow-Origin: http://getvesseltracker.com http://www.getvesseltracker.com');

ini_set('max_execution_time', 300);
ini_set('memory_limit', '-1');
// ini_set('display_errors',true);
// error_reporting(E_ALL);
$con=mysqli_connect("localhost","root","prasannas","vendor_spend_turnover");
$sdc = $_GET['sdc'];
$vendor_name = $_GET['vendor_name'];
if (!$sdc || !$vendor_name) 
	return;

// $sdc = mysql_real_escape_string($sdc);
// $vendor_name = mysql_real_escape_string($vendor_name);

$sql_q = 'SELECT * FROM `vendor_spend` WHERE sdc=\''.$sdc.'\' AND `vendor_name` LIKE \''.$vendor_name.'%\' ORDER BY `vessel_amount` DESC LIMIT 0,100';
// print $sql_q;
$res = $con->query($sql_q);
$results;
while($row = mysqli_fetch_array($res)) {			
	$results[] = $row;
}
print json_encode($results);
?>