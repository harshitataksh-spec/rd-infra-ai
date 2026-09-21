<?php
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: contact.php");
    exit;
}

$name = trim($_POST['name'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$email = trim($_POST['email'] ?? '');
$project = trim($_POST['project'] ?? 'General Portfolio');
$requirement = trim($_POST['requirement'] ?? 'Farmhouse Plot');
$message = trim($_POST['message'] ?? '');

if (empty($name) || empty($phone)) {
    header("Location: contact.php?error=" . urlencode("Name and phone number are required.") . "#enquire");
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO enquiries (name, phone, email, project, requirement, message, status) VALUES (?, ?, ?, ?, ?, ?, 'new')");
    $stmt->execute([$name, $phone, $email, $project, $requirement, $message]);

    // Redirect to contact with success indicator
    header("Location: contact.php?success=1#enquire");
    exit;
} catch (Exception $e) {
    error_log("Enquiry submission error: " . $e->getMessage());
    header("Location: contact.php?error=" . urlencode("Failed to submit enquiry. Please call us directly at " . SITE_PHONE) . "#enquire");
    exit;
}
?>
