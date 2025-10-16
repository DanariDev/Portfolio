<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

require __DIR__ . '/php/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/php/PHPMailer/src/SMTP.php';
require __DIR__ . '/php/PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;

$raw = file_get_contents("php://input");
$data = json_decode($raw ?: "{}", true);

$name = trim(strip_tags($data["name"] ?? ""));
$email = trim(strip_tags($data["email"] ?? ""));
$message = trim(strip_tags($data["message"] ?? ""));

if ($name === "" || $email === "" || $message === "") {
  echo json_encode(["success"=>false,"error"=>"missing_fields"]); exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo json_encode(["success"=>false,"error"=>"invalid_email"]); exit;
}

$mail = new PHPMailer(true);
try {
  $mail->isSMTP();
  $mail->Host       = 'mail.gmx.net';
  $mail->SMTPAuth   = true;
  $mail->Username   = 'danielkwiatkowski@gmx.de';
  $mail->Password   = 'Reinerswurst1996!';    
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port       = 587;

  $mail->setFrom('danielkwiatkowski@gmx.de', 'Portfolio');
  $mail->addAddress('danielkwiatkowski@gmx.de');
  $mail->addReplyTo($email, $name);

  $mail->Subject = '=?UTF-8?B?' . base64_encode('Neue Nachricht über dein Kontaktformular') . '?=';

  $mail->Body    = "Von: $name <$email>\n\nNachricht:\n$message";

  $ok = $mail->send();
  echo json_encode(["success" => (bool)$ok]);
} catch (\Throwable $e) {
  echo json_encode(["success" => false, "error" => "smtp_error"]);
}