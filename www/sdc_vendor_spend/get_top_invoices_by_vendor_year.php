<?php
ini_set('soap.wsdl_cache_enabled',0);
ini_set('soap.wsdl_cache_ttl',0);
header('Content-type: application/json');

$http_origin = $_SERVER['HTTP_ORIGIN'];
if ($http_origin == "https://www.getvesseltracker.com" || $http_origin == "https://getvesseltracker.com")
{ 
   header('Access-Control-Allow-Origin: *');
}

ini_set('max_execution_time', 300);
ini_set('memory_limit', '-1');
ini_set('display_errors',true);
error_reporting(E_ALL);

$requestParams = array(
    'VendorID' => $_GET['VendorID'],
    'year' => $_GET['year']
);

$client = new SoapClient('../BsmMobileService.svc.xml');
$response = $client->GetVendorInvoices($requestParams);
// var_dump($response);
$response = $response->GetVendorInvoicesResult->VendorInvoicesEntity;
$response_min = array();


// foreach($response as $invoice) {
// 	$cur = array();
// 	$cur['TOTAL_GROUP_CURRENCY'] = $invoice['TOTAL_GROUP_CURRENCY'];
// 	$cur['
// }
// $response = array_splice($response, 0, )
print_r(json_encode($response,true));

?>