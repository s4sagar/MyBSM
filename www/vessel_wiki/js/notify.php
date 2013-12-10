<?php

// Replace with real BROWSER API key from Google APIs
$apiKey = "AIzaSyAf4Caz6-QUBBTwgE-Q9jpKi2sPEAzXm3Q";

// Replace with real client registration IDs 
$registrationIDs = array( "APA91bHK7rPXDzVlgfzYx7U-nrbjRBBEvLMz4x9aswanMaAHaD1MrzcwbNj3mJpEG1ap2O5OOTdB3JjFQAasT4jDoFv1hj3uAGMdggFCGPzyiaO_-IgcpKm41bV0qPhwH3X4XzIDqc42wVe8QFEz0IxoA81jCwO6qw" );

// Message to be sent
$message = "x";

// Set POST variables
$url = 'https://android.googleapis.com/gcm/send';

$fields = array(
                'registration_ids'  => $registrationIDs,
                'data'              => array( "message" => $message ),
                );

$headers = array( 
                    'Authorization: key=' . $apiKey,
                    'Content-Type: application/json'
                );

// Open connection
$ch = curl_init();

// Set the url, number of POST vars, POST data
curl_setopt( $ch, CURLOPT_URL, $url );

curl_setopt( $ch, CURLOPT_POST, true );
curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );

curl_setopt( $ch, CURLOPT_POSTFIELDS, json_encode( $fields ) );

// Execute post
$result = curl_exec($ch);

// Close connection
curl_close($ch);

echo $result;

?>