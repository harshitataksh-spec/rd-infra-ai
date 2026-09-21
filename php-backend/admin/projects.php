<?php
require_once __DIR__ . '/auth_check.php';
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/db.php';

$action = $_GET['action'] ?? 'list';
$error = '';
$msg = '';

// Delete
if ($action === 'delete' && isset($_GET['id'])) {
    $id = (int)$_GET['id'];
    $stmt = $pdo->prepare("DELETE FROM projects WHERE id = ?");
    $stmt->execute([$id]);
    header("Location: projects.php?msg=deleted");
    exit;
}

// Add/Edit Save
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = isset($_POST['id']) ? (int)$_POST['id'] : 0;
    $project_name = trim($_POST['project_name'] ?? '');
    $location = trim($_POST['location'] ?? '');
    $project_type = trim($_POST['project_type'] ?? 'Farmhouse Projects');
    $description = trim($_POST['description'] ?? '');
    $highlights = trim($_POST['highlights'] ?? '');
    $image = trim($_POST['image'] ?? '');
    $plot_size = trim($_POST['plot_size'] ?? '');
    $connectivity = trim($_POST['connectivity'] ?? '');
    $status = trim($_POST['status'] ?? 'Active');

    if (!empty($project_name) && !empty($location) && !empty($image)) {
        if ($id > 0) {
            $stmt = $pdo->prepare("UPDATE projects SET project_name=?, location=?, project_type=?, description=?, highlights=?, image=?, plot_size=?, connectivity=?, status=? WHERE id=?");
            $stmt->execute([$project_name, $location, $project_type, $description, $highlights, $image, $plot_size, $connectivity, $status, $id]);
            header("Location: projects.php?msg=updated");
            exit;
        } else {
            $stmt = $pdo->prepare("INSERT INTO projects (project_name, location, project_type, description, highlights, image, plot_size, connectivity, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$project_name, $location, $project_type, $description, $highlights, $image, $plot_size, $connectivity, $status]);
            header("Location: projects.php?msg=added");
            exit;
        }
    } else {
        $error = "Project name, location, and image are required.";
    }
}

// Fetch single for edit
$edit_project = null;
if ($action === 'edit' && isset($_GET['id'])) {
    $stmt = $pdo->prepare("SELECT * FROM projects WHERE id = ?");
    $stmt->execute([(int)$_GET['id']]);
    $edit_project = $stmt->fetch();
}

$projects = $pdo->query("SELECT * FROM projects ORDER BY id DESC")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Manage Projects | RD INFRA Admin</title>
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
    <a href="logout.php" class="btn btn-danger btn-sm">Log Out</a>
  </div>
</nav>

<div class="container-fluid">
  <div class="row">
    <div class="col-md-3 col-lg-2 sidebar p-3">
      <ul class="nav nav-pills flex-column gap-1">
        <li class="nav-item"><a class="nav-link text-dark" href="dashboard.php"><i class="bi bi-speedometer2 me-2"></i> Overview</a></li>
        <li class="nav-item"><a class="nav-link active bg-primary" style="background-color: #0A4D92 !important;" href="projects.php"><i class="bi bi-buildings me-2"></i> Current Projects</a></li>
        <li class="nav-item"><a class="nav-link text-dark" href="enquiries.php"><i class="bi bi-envelope me-2"></i> Enquiries & Leads</a></li>
      </ul>
    </div>

    <div class="col-md-9 col-lg-10 p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="fw-bold text-dark mb-0">Manage Property Projects</h3>
        <?php if ($action !== 'add' && $action !== 'edit'): ?>
          <a href="projects.php?action=add" class="btn btn-primary btn-sm fw-bold" style="background-color: #0A4D92; border: none;">
            <i class="bi bi-plus-lg me-1"></i> Add New Project
          </a>
        <?php endif; ?>
      </div>

      <?php if ($action === 'add' || $action === 'edit'): ?>
        <div class="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
          <h5 class="fw-bold text-dark mb-3"><?php echo $action === 'edit' ? 'Edit Project' : 'Add New Project'; ?></h5>
          <?php if ($error): ?><div class="alert alert-danger small"><?php echo $error; ?></div><?php endif; ?>
          <form method="POST" action="projects.php">
            <input type="hidden" name="id" value="<?php echo $edit_project['id'] ?? 0; ?>">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label small fw-bold">Project Name</label>
                <input type="text" name="project_name" class="form-control" required value="<?php echo sanitize($edit_project['project_name'] ?? ''); ?>">
              </div>
              <div class="col-md-6">
                <label class="form-label small fw-bold">Category</label>
                <select name="project_type" class="form-select">
                  <option value="Farmhouse Projects" <?php echo ($edit_project['project_type'] ?? '') === 'Farmhouse Projects' ? 'selected' : ''; ?>>Farmhouse Projects</option>
                  <option value="Land Investment Projects" <?php echo ($edit_project['project_type'] ?? '') === 'Land Investment Projects' ? 'selected' : ''; ?>>Land Investment Projects</option>
                  <option value="Residential Projects" <?php echo ($edit_project['project_type'] ?? '') === 'Residential Projects' ? 'selected' : ''; ?>>Residential Projects</option>
                  <option value="Commercial Projects" <?php echo ($edit_project['project_type'] ?? '') === 'Commercial Projects' ? 'selected' : ''; ?>>Commercial Projects</option>
                  <option value="Plotted Developments" <?php echo ($edit_project['project_type'] ?? '') === 'Plotted Developments' ? 'selected' : ''; ?>>Plotted Developments</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label small fw-bold">Location</label>
                <input type="text" name="location" class="form-control" required value="<?php echo sanitize($edit_project['location'] ?? ''); ?>">
              </div>
              <div class="col-md-6">
                <label class="form-label small fw-bold">Plot Size / Dimensions</label>
                <input type="text" name="plot_size" class="form-control" placeholder="e.g. 1 Acre to 2.5 Acres" value="<?php echo sanitize($edit_project['plot_size'] ?? ''); ?>">
              </div>
              <div class="col-12">
                <label class="form-label small fw-bold">Image URL</label>
                <input type="url" name="image" class="form-control" required value="<?php echo sanitize($edit_project['image'] ?? ''); ?>">
              </div>
              <div class="col-12">
                <label class="form-label small fw-bold">Description</label>
                <textarea name="description" rows="3" class="form-control" required><?php echo sanitize($edit_project['description'] ?? ''); ?></textarea>
              </div>
              <div class="col-12">
                <label class="form-label small fw-bold">Highlights (one per line)</label>
                <textarea name="highlights" rows="3" class="form-control"><?php echo sanitize($edit_project['highlights'] ?? ''); ?></textarea>
              </div>
              <div class="col-12 d-flex justify-content-end gap-2">
                <a href="projects.php" class="btn btn-outline-secondary btn-sm">Cancel</a>
                <button type="submit" class="btn btn-primary btn-sm fw-bold" style="background-color: #0A4D92; border: none;">Save Project</button>
              </div>
            </div>
          </form>
        </div>
      <?php endif; ?>

      <div class="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0 small">
            <thead class="table-light">
              <tr>
                <th>Project</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <?php foreach ($projects as $p): ?>
                <tr>
                  <td class="fw-bold text-dark d-flex align-items-center gap-2">
                    <img src="<?php echo sanitize($p['image']); ?>" style="width: 36px; height: 36px; object-fit: cover; border-radius: 6px;">
                    <?php echo sanitize($p['project_name']); ?>
                  </td>
                  <td><?php echo sanitize($p['project_type']); ?></td>
                  <td><?php echo sanitize($p['location']); ?></td>
                  <td><span class="badge bg-success"><?php echo sanitize($p['status']); ?></span></td>
                  <td class="text-end">
                    <a href="projects.php?action=edit&id=<?php echo $p['id']; ?>" class="btn btn-outline-primary btn-sm me-1"><i class="bi bi-pencil"></i></a>
                    <a href="projects.php?action=delete&id=<?php echo $p['id']; ?>" class="btn btn-outline-danger btn-sm" onclick="return confirm('Delete this project?');"><i class="bi bi-trash"></i></a>
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
