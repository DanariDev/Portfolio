<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

$to = "danielkwiatkowski@gmx.de";

$data = json_decode(file_get_contents("php://input"), true);
$name = strip_tags($data["name"] ?? "");
$email = strip_tags($data["email"] ?? "");
$message = strip_tags($data["message"] ?? "");

if (!$name || !$email || !$message) {
  echo json_encode(["success" => false, "error" => "missing_fields"]);
  exit;
}

$subject = "Neue Nachricht über dein Kontaktformular";
$body = "Von: $name <$email>\n\nNachricht:\n$message";
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

$sent = mail($to, $subject, $body, $headers);
echo json_encode(["success" => $sent]);