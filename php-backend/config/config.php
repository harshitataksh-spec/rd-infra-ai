<?php
/**
 * RD INFRA - Site Configuration
 * Domain: rd-infra.in
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

define('SITE_NAME', 'RD INFRA');
define('SITE_TAGLINE', 'Building Better Tomorrows');
define('SITE_DOMAIN', 'rd-infra.in');
define('SITE_EMAIL', 'rdinfra.98@gmail.com');
define('SITE_PHONE', '+91 97170 77699');
define('SITE_WHATSAPP', '919717077699');
define('SITE_INSTAGRAM', 'https://www.instagram.com/gurgaonluxuryfarms/');
define('SITE_FACEBOOK', 'https://www.facebook.com/share/1LG7WHyxmA/?mibextid=wwXIfr');
define('SITE_LOCATION', 'Strategic Corridor Hub, Gurugram, Haryana, India');

// Base URL detection
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
$script_dir = dirname($_SERVER['SCRIPT_NAME'] ?? '');
define('BASE_URL', rtrim($protocol . $host . $script_dir, '/'));

// Helper sanitization
function sanitize($input) {
    return htmlspecialchars(trim($input ?? ''), ENT_QUOTES, 'UTF-8');
}
?>
