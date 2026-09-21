<?php
require_once __DIR__ . '/auth_check.php';
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/db.php';

// Fetch statistics
$total_projects = $pdo->query("SELECT COUNT(*) FROM projects")->fetchColumn();
$total_upcoming = $pdo->query("SELECT COUNT(*) FROM upcoming_projects")->fetchColumn();
$total_enquiries = $pdo->query("SELECT COUNT(*) FROM enquiries")->fetchColumn();
$new_enquiries = $pdo->query("SELECT COUNT(*) FROM enquiries WHERE status = 'new'")->fetchColumn();
$total_testimonials = $pdo->query("SELECT COUNT(*) FROM testimonials")->fetchColumn();

// Latest enquiries
$recent_enquiries = $pdo->query("SELECT * FROM enquiries ORDER BY id DESC LIMIT 5")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Admin Dashboard | RD INFRA</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #f1f5f9; }
    .sidebar { min-height: calc(100vh - 65px); background: #ffffff; border-right: 1px solid #e2e8f0; }
    .stat-card { border-radius: 16px; border: 1px solid #e2e8f0; background: #ffffff; padding: 20px; }
  </style>
</head>
<body>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3 sticky-top">
  <div class="container-fluid">
    <a class="navbar-brand d-flex align-items-center gap-2 fw-bold" href="dashboard.php">
      <span class="badge bg-primary" style="background-color: #0A4D92 !important;">RD</span>
      <span>INFRA Admin Portal</span>
    </a>
    <div class="d-flex align-items-center gap-3">
      <a href="../index.php" target="_blank" class="btn btn-outline-light btn-sm">
        <i class="bi bi-box-arrow-up-right me-1"></i> View Live Site
      </a>
      <a href="logout.php" class="btn btn-danger btn-sm">
        <i class="bi bi-power me-1"></i> Log Out
      </a>
    </div>
  </div>
</nav>

<div class="container-fluid">
  <div class="row">
    <!-- Sidebar -->
    <div class="col-md-3 col-lg-2 sidebar p-3">
      <ul class="nav nav-pills flex-column gap-1">
        <li class="nav-item">
          <a class="nav-link active bg-primary" style="background-color: #0A4D92 !important;" href="dashboard.php">
            <i class="bi bi-speedometer2 me-2"></i> Overview
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-dark" href="projects.php">
            <i class="bi bi-buildings me-2"></i> Current Projects (<?php echo $total_projects; ?>)
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-dark" href="enquiries.php">
            <i class="bi bi-envelope me-2"></i> Enquiries & Leads (<?php echo $total_enquiries; ?>)
          </a>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="col-md-9 col-lg-10 p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 class="fw-bold text-dark mb-0">Operational Dashboard</h3>
          <small class="text-muted">Domain: <?php echo SITE_DOMAIN; ?> &bull; Logged in as: <?php echo sanitize($_SESSION['admin_name'] ?? 'Administrator'); ?></small>
        </div>
        <a href="projects.php?action=add" class="btn btn-primary btn-sm fw-bold" style="background-color: #0A4D92; border: none;">
          <i class="bi bi-plus-lg me-1"></i> Add Project
        </a>
      </div>

      <!-- 5 Metric Cards -->
      <div class="row g-3 mb-4">
        <div class="col-sm-6 col-xl">
          <div class="stat-card">
            <span class="text-muted small fw-bold uppercase">Total Projects</span>
            <h2 class="fw-bold text-dark mt-2 mb-0"><?php echo $total_projects; ?></h2>
            <small class="text-secondary">Farmhouses & Lands</small>
          </div>
        </div>
        <div class="col-sm-6 col-xl">
          <div class="stat-card">
            <span class="text-muted small fw-bold uppercase">Upcoming</span>
            <h2 class="fw-bold text-dark mt-2 mb-0"><?php echo $total_upcoming; ?></h2>
            <small class="text-secondary">Corridors in Pipeline</small>
          </div>
        </div>
        <div class="col-sm-6 col-xl">
          <div class="stat-card">
            <span class="text-muted small fw-bold uppercase">Total Enquiries</span>
            <h2 class="fw-bold text-dark mt-2 mb-0"><?php echo $total_enquiries; ?></h2>
            <small class="text-secondary">Client Leads</small>
          </div>
        </div>
        <div class="col-sm-6 col-xl">
          <div class="stat-card border-primary">
            <span class="text-primary small fw-bold uppercase">New Enquiries</span>
            <h2 class="fw-bold text-primary mt-2 mb-0"><?php echo $new_enquiries; ?></h2>
            <small class="text-secondary">Awaiting Contact</small>
          </div>
        </div>
        <div class="col-sm-6 col-xl">
          <div class="stat-card">
            <span class="text-muted small fw-bold uppercase">Testimonials</span>
            <h2 class="fw-bold text-dark mt-2 mb-0"><?php echo $total_testimonials; ?></h2>
            <small class="text-secondary">Published Reviews</small>
          </div>
        </div>
      </div>

      <!-- Recent Enquiries Table -->
      <div class="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
        <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h6 class="fw-bold text-dark mb-0">Latest Customer Inquiries</h6>
          <a href="enquiries.php" class="text-primary text-decoration-none small fw-bold">View All &rarr;</a>
        </div>
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0 small">
            <thead class="table-light">
              <tr>
                <th>Client Name</th>
                <th>Phone</th>
                <th>Project Interest</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <?php foreach ($recent_enquiries as $enq): ?>
                <tr>
                  <td class="fw-bold text-dark"><?php echo sanitize($enq['name']); ?></td>
                  <td><a href="tel:<?php echo sanitize($enq['phone']); ?>"><?php echo sanitize($enq['phone']); ?></a></td>
                  <td><?php echo sanitize($enq['project']); ?></td>
                  <td class="text-muted"><?php echo substr($enq['created_at'], 0, 10); ?></td>
                  <td>
                    <span class="badge <?php echo $enq['status'] === 'new' ? 'bg-primary' : ($enq['status'] === 'contacted' ? 'bg-warning' : 'bg-success'); ?>">
                      <?php echo strtoupper($enq['status']); ?>
                    </span>
                  </td>
                </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
