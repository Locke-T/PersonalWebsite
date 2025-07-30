<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    
    $to = "contact@locketsang.org";
    
    // Improved headers with proper formatting
    $headers = "From: Website Contact Form <noreply@" . $_SERVER['HTTP_HOST'] . ">\r\n";
    $headers .= "Reply-To: $name <$email>\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    // Improved email subject
    $email_subject = "Website Contact: " . $subject;
    
    $body  = "Master I have received a new message from your website.\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Subject: $subject\n\n";
    $body .= "Message:\n$message\n";

    // Add debugging information
    $success = mail($to, $email_subject, $body, $headers);
    
    // Log the attempt for debugging
    $log_message = date('Y-m-d H:i:s') . " - Mail attempt to $to - ";
    $log_message .= $success ? "SUCCESS" : "FAILED";
    $log_message .= " - From: $email\n";
    error_log($log_message, 3, "mail_log.txt");
    
    if ($success) {
        echo "✅ Message sent successfully!";
    } else {
        $error = error_get_last();
        error_log("Mail error: " . print_r($error, true), 3, "mail_log.txt");
        echo "❌ Error: Message not sent. Server issue detected.";
    }
} else {
    // If someone tries to load mail.php directly
    echo "Invalid request.";
}
?>