<?php
require_once __DIR__ . '/auth_check.php';
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/db.php';

// Handle Status update
if (isset($_GET['action']) && $_GET['action'] === 'update_status' && isset($_GET['id']) && isset($_GET['status'])) {
    $id = (int)$_GET['id'];
    $status = in_array($_GET['status'], ['new', 'contacted', 'closed']) ? $_GET['status'] : 'new';
    $stmt = $pdo->prepare("UPDATE enquiries SET status = ? WHERE id = ?");
    $stmt->execute([$status, $id]);
    header("Location: enquiries.php");
    exit;
}

// Handle Delete
if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['id'])) {
    $id = (int)$_GET['id'];
    $stmt = $pdo->prepare("DELETE FROM enquiries WHERE id = ?");
    $stmt->execute([$id]);
    header("Location: enquiries.php");
    exit;
}

// Handle CSV Export
if (isset($_GET['export']) && $_GET['export'] === 'csv') {
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=rd_infra_enquiries_' . date('Y-m-d') . '.csv');
    $output = fopen('php://output', 'w');
    fputcsv($output, ['ID', 'Name', 'Phone', 'Email', 'Project', 'Requirement', 'Message', 'Status', 'Date']);
    $rows = $pdo->query("SELECT * FROM enquiries ORDER BY id DESC")->fetchAll();
    foreach ($rows as $row) {
        fputcsv($output, [$row['id'], $row['name'], $row['phone'], $row['email'], $row['project'], $row['requirement'], $row['message'], $row['status'], $row['created_at']]);
    }
    exit;
}

$enquiries = $pdo->query("SELECT * FROM enquiries ORDER BY id DESC")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Manage Enquiries | RD INFRA Admin</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #f1f5f9; }
    .sidebar { min-height: calc(100vh - 65px); background: #ffffff; border-right: 1px solid #e2e8f0; }
  </style>
</head>
<body>

<nav class="navbar navbar-dark bg-dark px-4 py-3 sticky-top">
  <div class="container-fluid">
    <a class="navbar-brand fw-bold" href="dashboard.php">RD INFRA Admin</a>
    <div>
      <a href="enquiries.php?export=csv" class="btn btn-success btn-sm me-2">
        <i class="bi bi-file-earmark-spreadsheet me-1"></i> Export CSV
      </a>
      <a href="logout.php" class="btn btn-danger btn-sm">Log Out</a>
    </div>
  </div>
</nav>

<div class="container-fluid">
  <div class="row">
    <div class="col-md-3 col-lg-2 sidebar p-3">
      <ul class="nav nav-pills flex-column gap-1">
        <li class="nav-item"><a class="nav-link text-dark" href="dashboard.php"><i class="bi bi-speedometer2 me-2"></i> Overview</a></li>
        <li class="nav-item"><a class="nav-link text-dark" href="projects.php"><i class="bi bi-buildings me-2"></i> Current Projects</a></li>
        <li class="nav-item"><a class="nav-link active bg-primary" style="background-color: #0A4D92 !important;" href="enquiries.php"><i class="bi bi-envelope me-2"></i> Enquiries & Leads</a></li>
      </ul>
    </div>

    <div class="col-md-9 col-lg-10 p-4">
      <h3 class="fw-bold text-dark mb-4">Customer Enquiries & Leads</h3>
      
      <div class="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0 small">
            <thead class="table-light">
              <tr>
                <th>ID</th>
                <th>Client Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Project Interest</th>
                <th>Requirement</th>
                <th>Status</th>
                <th>Date</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <?php foreach ($enquiries as $e): ?>
                <tr>
                  <td>#<?php echo $e['id']; ?></td>
                  <td class="fw-bold text-dark"><?php echo sanitize($e['name']); ?></td>
                  <td><a href="tel:<?php echo sanitize($e['phone']); ?>" class="text-decoration-none fw-semibold"><?php echo sanitize($e['phone']); ?></a></td>
                  <td><?php echo sanitize($e['email'] ?? '—'); ?></td>
                  <td><?php echo sanitize($e['project']); ?></td>
                  <td><?php echo sanitize($e['requirement']); ?></td>
                  <td>
                    <div class="btn-group btn-group-sm">
                      <a href="enquiries.php?action=update_status&id=<?php echo $e['id']; ?>&status=new" class="btn btn-outline-primary <?php echo $e['status'] === 'new' ? 'active' : ''; ?>">New</a>
                      <a href="enquiries.php?action=update_status&id=<?php echo $e['id']; ?>&status=contacted" class="btn btn-outline-warning <?php echo $e['status'] === 'contacted' ? 'active' : ''; ?>">Contacted</a>
                      <a href="enquiries.php?action=update_status&id=<?php echo $e['id']; ?>&status=closed" class="btn btn-outline-success <?php echo $e['status'] === 'closed' ? 'active' : ''; ?>">Closed</a>
                    </div>
                  </td>
                  <td class="text-muted"><?php echo substr($e['created_at'], 0, 10); ?></td>
                  <td class="text-end">
                    <a href="enquiries.php?action=delete&id=<?php echo $e['id']; ?>" class="btn btn-outline-danger btn-sm" onclick="return confirm('Delete this enquiry?');">
                      <i class="bi bi-trash"></i>
                    </a>
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

</body>
</html>
