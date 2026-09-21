<?php
$page_title = "Upcoming Projects & Corridors | RD INFRA";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';

try {
    $stmt = $pdo->query("SELECT * FROM upcoming_projects ORDER BY id ASC");
    $upcoming_projects = $stmt->fetchAll();
} catch (Exception $e) {
    $upcoming_projects = [];
}
?>

<div class="bg-light py-5 border-bottom">
  <div class="container">
    <span class="badge bg-primary mb-2" style="background-color: #0A4D92 !important;">PRE-LAUNCH & PIPELINES</span>
    <h1 class="display-6 fw-bold text-dark">Upcoming Projects & Strategic Corridors</h1>
    <p class="text-secondary mb-0">Register early interest for upcoming farmhouse enclaves and highway land developments.</p>
  </div>
</div>

<div class="container py-5">
  <div class="row g-4">
    <?php foreach ($upcoming_projects as $up): ?>
      <div class="col-lg-6">
        <div class="card h-100 border rounded-4 overflow-hidden shadow-sm d-flex flex-md-row">
          <img src="<?php echo sanitize($up['image']); ?>" class="col-md-5 object-fit-cover" style="min-height: 220px;" alt="<?php echo sanitize($up['project_name']); ?>">
          <div class="p-4 d-flex flex-column justify-content-between col-md-7">
            <div>
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge bg-dark small"><?php echo sanitize($up['badge']); ?></span>
                <span class="text-muted small"><?php echo sanitize($up['corridor']); ?></span>
              </div>
              <h5 class="fw-bold text-dark mb-1"><?php echo sanitize($up['project_name']); ?></h5>
              <p class="text-muted small mb-2"><i class="bi bi-geo-alt"></i> <?php echo sanitize($up['location']); ?></p>
              <p class="text-secondary small mb-3"><?php echo sanitize($up['description']); ?></p>
              
              <?php if (!empty($up['connectivity_highlights'])): ?>
                <div class="bg-light p-2 rounded small text-secondary mb-3" style="font-size: 11px;">
                  <strong class="text-dark">CONNECTIVITY:</strong>
                  <?php echo nl2br(sanitize($up['connectivity_highlights'])); ?>
                </div>
              <?php endif; ?>
            </div>

            <a href="contact.php?project=<?php echo urlencode($up['project_name']); ?>#enquire" class="btn btn-outline-primary btn-sm w-100 fw-bold">
              Register Interest &rarr;
            </a>
          </div>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
