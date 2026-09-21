<?php
$page_title = "Our Projects | Farmhouses & Land Parcels";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';

// Category filter
$category = isset($_GET['category']) ? trim($_GET['category']) : 'all';

try {
    if ($category !== 'all' && !empty($category)) {
        $stmt = $pdo->prepare("SELECT * FROM projects WHERE project_type = ? ORDER BY id ASC");
        $stmt->execute([$category]);
    } else {
        $stmt = $pdo->query("SELECT * FROM projects ORDER BY id ASC");
    }
    $projects = $stmt->fetchAll();
} catch (Exception $e) {
    $projects = [];
}
?>

<div class="bg-light py-5 border-bottom">
  <div class="container">
    <h1 class="display-6 fw-bold text-dark">Projects Portfolio</h1>
    <p class="text-secondary mb-0">Explore our prime agricultural farmhouses, strategic land parcels, and plotted layouts.</p>
  </div>
</div>

<div class="container py-4">
  <!-- Filter Pills -->
  <div class="d-flex flex-wrap gap-2 mb-4 pb-2 border-bottom">
    <a href="projects.php?category=all" class="btn btn-sm <?php echo $category === 'all' ? 'btn-rd-blue' : 'btn-outline-secondary'; ?>">All Categories</a>
    <a href="projects.php?category=Farmhouse+Projects" class="btn btn-sm <?php echo $category === 'Farmhouse Projects' ? 'btn-rd-blue' : 'btn-outline-secondary'; ?>">Farmhouse Projects</a>
    <a href="projects.php?category=Land+Investment+Projects" class="btn btn-sm <?php echo $category === 'Land Investment Projects' ? 'btn-rd-blue' : 'btn-outline-secondary'; ?>">Land Investment</a>
    <a href="projects.php?category=Plotted+Developments" class="btn btn-sm <?php echo $category === 'Plotted Developments' ? 'btn-rd-blue' : 'btn-outline-secondary'; ?>">Plotted Developments</a>
    <a href="projects.php?category=Commercial+Projects" class="btn btn-sm <?php echo $category === 'Commercial Projects' ? 'btn-rd-blue' : 'btn-outline-secondary'; ?>">Commercial Frontage</a>
  </div>

  <!-- Projects Grid -->
  <div class="row g-4">
    <?php if (empty($projects)): ?>
      <div class="col-12 text-center py-5 text-muted">
        <p>No projects currently match this filter. Please check back soon or browse all categories.</p>
        <a href="projects.php" class="btn btn-outline-primary btn-sm">View All Projects</a>
      </div>
    <?php else: ?>
      <?php foreach ($projects as $p): ?>
        <div class="col-md-6 col-lg-4">
          <div class="card-project h-100 d-flex flex-column">
            <img src="<?php echo sanitize($p['image']); ?>" class="card-img-top" style="height: 220px; object-fit: cover;" alt="<?php echo sanitize($p['project_name']); ?>">
            <div class="p-4 d-flex flex-column flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge bg-light text-primary border small"><?php echo sanitize($p['project_type']); ?></span>
                <span class="badge bg-success bg-opacity-10 text-success small"><?php echo sanitize($p['status']); ?></span>
              </div>
              <h5 class="fw-bold text-dark mb-1"><?php echo sanitize($p['project_name']); ?></h5>
              <p class="text-muted small mb-2"><i class="bi bi-geo-alt"></i> <?php echo sanitize($p['location']); ?></p>
              
              <p class="text-secondary small mb-3 flex-grow-1">
                <?php echo sanitize($p['description']); ?>
              </p>

              <?php if (!empty($p['highlights'])): ?>
                <div class="p-2.5 bg-light rounded-2 small text-secondary mb-3">
                  <div class="fw-bold text-dark mb-1" style="font-size: 11px;">KEY HIGHLIGHTS:</div>
                  <ul class="mb-0 ps-3" style="font-size: 11px;">
                    <?php 
                      $lines = explode("\n", $p['highlights']);
                      foreach (array_slice($lines, 0, 2) as $line): 
                    ?>
                      <li><?php echo sanitize($line); ?></li>
                    <?php endforeach; ?>
                  </ul>
                </div>
              <?php endif; ?>

              <div class="pt-3 border-top d-flex justify-content-between align-items-center">
                <span class="small fw-bold text-dark">Size: <?php echo sanitize($p['plot_size'] ?? 'On Request'); ?></span>
                <a href="contact.php?project=<?php echo urlencode($p['project_name']); ?>#enquire" class="btn btn-rd-blue btn-sm">
                  Enquire Project
                </a>
              </div>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    <?php endif; ?>
  </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
