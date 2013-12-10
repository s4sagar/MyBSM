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
// ini_set('display_errors',true);
// error_reporting(E_ALL);

function arrayCastRecursive($array)
{
    if (is_array($array)) {
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $array[$key] = arrayCastRecursive($value);
            }
            if ($value instanceof stdClass) {
                $array[$key] = arrayCastRecursive((array)$value);
            }
        }
    }
    if ($array instanceof stdClass) {
        return (array)$array;
    }
    return $array;
}

$requestParams = array(
    'year' => $_GET['year']
    // 'year' => 2013
);

$client = new SoapClient('../BsmMobileService.svc.xml');
$response = $client->GetTopVendors($requestParams);
$response = $response->GetTopVendorsResult->TopVendorEntity;
array_slice($response, 0, 50);

$arr2 = json_encode($response, true);
// $arr2 = array_slice($arr2['GetTopVendorsResult']['TopVendorEntity'], 0, 25);
print_r($arr2);

?>