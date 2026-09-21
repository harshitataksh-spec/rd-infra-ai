<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/db.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo isset($page_title) ? sanitize($page_title) . " | " . SITE_NAME : SITE_NAME . " | " . SITE_TAGLINE; ?></title>
  <meta name="description" content="RD INFRA (rd-infra.in) - Trusted real estate and infrastructure development company since 2014. Premium farmhouses, land investment corridors, and plotted developments across Gurgaon, NH-48, Sohna, and Vrindavan.">
  <meta name="keywords" content="RD INFRA, rd-infra.in, Building Better Tomorrows, Gurgaon luxury farms, NH-48 land, Sohna farmhouses, Vrindavan land">
  <link rel="canonical" href="https://rd-infra.in/">

  <!-- Bootstrap 5 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Bootstrap Icons -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <!-- Google Fonts: Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <style>
    :root {
      --rd-blue: #0A4D92;
      --rd-blue-hover: #083c72;
      --rd-blue-light: #eff6ff;
      --rd-grey: #475569;
      --rd-grey-light: #f8fafc;
      --rd-grey-border: #e2e8f0;
      --rd-dark: #0f172a;
    }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #334155;
      background-color: #f8fafc;
    }
    .btn-rd-blue {
      background-color: var(--rd-blue);
      color: #ffffff;
      font-weight: 700;
      border: none;
      border-radius: 10px;
      padding: 10px 22px;
      transition: all 0.2s ease;
    }
    .btn-rd-blue:hover {
      background-color: var(--rd-blue-hover);
      color: #ffffff;
      transform: translateY(-1px);
    }
    .card-project {
      border: 1px solid var(--rd-grey-border);
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s ease;
      background: #ffffff;
    }
    .card-project:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px -10px rgba(10, 77, 146, 0.15);
      border-color: var(--rd-blue);
    }
    .floating-whatsapp {
      position: fixed;
      bottom: 24px;
      right: 20px;
      z-index: 1050;
    }
  </style>
</head>
<body>
