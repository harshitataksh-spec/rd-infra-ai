<?php
$page_title = "Building Better Tomorrows | Real Estate & Farmhouses";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';

// Fetch active projects
try {
    $stmt = $pdo->query("SELECT * FROM projects WHERE status = 'Active' ORDER BY id ASC LIMIT 6");
    $featured_projects = $stmt->fetchAll();
} catch (Exception $e) {
    $featured_projects = [];
}

// Fetch upcoming
try {
    $stmt_up = $pdo->query("SELECT * FROM upcoming_projects ORDER BY id ASC LIMIT 4");
    $upcoming_list = $stmt_up->fetchAll();
} catch (Exception $e) {
    $upcoming_list = [];
}

// Fetch testimonials
try {
    $stmt_test = $pdo->query("SELECT * FROM testimonials WHERE status = 'published' ORDER BY id ASC LIMIT 5");
    $testimonials_list = $stmt_test->fetchAll();
} catch (Exception $e) {
    $testimonials_list = [];
}
?>

<!-- Hero Section -->
<section class="py-5 bg-white border-bottom position-relative overflow-hidden">
  <div class="container py-lg-5">
    <div class="row align-items-center g-5">
      <div class="col-lg-6">
        <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-light border mb-3 small fw-bold text-secondary">
          <span class="badge rounded-pill" style="background-color: #0A4D92;">RD INFRA</span>
          <span>ESTABLISHED 2014 &bull; 10+ YEARS EXCELLENCE</span>
        </div>
        <h1 class="display-5 fw-extrabold text-dark mb-3">
          Prime Farmhouse Lands & Strategic Growth Corridors
        </h1>
        <p class="lead text-secondary mb-4 fs-6">
          <em>“<?php echo SITE_TAGLINE; ?>”</em> &mdash; We identify high-potential land parcels, develop secure farmhouse retreats, and build long-term real estate value across Gurgaon and North India.
        </p>

        <div class="d-flex flex-wrap gap-3 mb-4">
          <a href="projects.php" class="btn btn-rd-blue btn-lg">Explore Projects</a>
          <a href="contact.php#enquire" class="btn btn-outline-secondary btn-lg">Request Site Inspection</a>
        </div>

        <div class="row pt-3 border-top g-3">
          <div class="col-4">
            <h4 class="fw-bold mb-0 text-dark">10+</h4>
            <small class="text-secondary">Years Industry Experience</small>
          </div>
          <div class="col-4">
            <h4 class="fw-bold mb-0 text-dark">100%</h4>
            <small class="text-secondary">Verified Freehold Land</small>
          </div>
          <div class="col-4">
            <h4 class="fw-bold mb-0 text-dark">500+</h4>
            <small class="text-secondary">Satisfied Land Owners</small>
          </div>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="position-relative">
          <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" 
               class="img-fluid rounded-4 shadow-lg border" 
               alt="RD INFRA Luxury Farmhouse">
          <div class="position-absolute bottom-0 start-0 m-3 p-3 bg-white rounded-3 shadow-sm border d-flex align-items-center gap-3">
            <i class="bi bi-shield-check fs-2 text-primary"></i>
            <div>
              <div class="fw-bold text-dark small">Complete Due Diligence</div>
              <small class="text-secondary">Direct Registry & Demarcation</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- About Preview -->
<section class="py-5 bg-light">
  <div class="container py-lg-4">
    <div class="row g-4 align-items-center">
      <div class="col-lg-6">
        <span class="text-primary fw-bold text-uppercase small">About RD INFRA</span>
        <h2 class="fw-bold text-dark mt-2 mb-3">Pioneering Secure Real Estate Infrastructure Since 2014</h2>
        <p class="text-secondary small leading-relaxed">
          Founded in 2014, RD INFRA has grown into a distinguished real-estate and infrastructure development firm committed to delivering verified, legally sound, and strategically positioned land investments.
        </p>
        <p class="text-secondary small leading-relaxed">
          With over a decade of hands-on expertise in the NCR market, our portfolio encompasses luxury farmhouses along the Aravali ridge, plotted developments along major expressways, and high-value strategic parcels.
        </p>
        <a href="about.php" class="btn btn-outline-dark btn-sm fw-bold">Read Full Company Profile &rarr;</a>
      </div>

      <div class="col-lg-6">
        <div class="row g-3">
          <div class="col-sm-6">
            <div class="p-4 bg-white rounded-3 border h-100">
              <i class="bi bi-patch-check-fill text-primary fs-3 mb-2"></i>
              <h6 class="fw-bold text-dark">Clear Legal Titles</h6>
              <p class="text-secondary small mb-0">Demarcated boundaries, encumbrance verification, and transparent registry paperwork.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-4 bg-white rounded-3 border h-100">
              <i class="bi bi-compass-fill text-primary fs-3 mb-2"></i>
              <h6 class="fw-bold text-dark">Prime Corridors</h6>
              <p class="text-secondary small mb-0">Selective investments focused on high-speed expressways and urban growth arcs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Featured Projects -->
<section class="py-5 bg-white">
  <div class="container py-lg-4">
    <div class="d-flex justify-content-between align-items-end mb-4">
      <div>
        <span class="text-primary fw-bold text-uppercase small">Portfolio Showcase</span>
        <h2 class="fw-bold text-dark mt-1 mb-0">Featured Current Projects</h2>
      </div>
      <a href="projects.php" class="text-primary fw-bold text-decoration-none small">View All Projects &rarr;</a>
    </div>

    <div class="row g-4">
      <?php foreach ($featured_projects as $project): ?>
        <div class="col-md-6 col-lg-4">
          <div class="card-project h-100 d-flex flex-column">
            <img src="<?php echo sanitize($project['image']); ?>" class="card-img-top" style="height: 220px; object-fit: cover;" alt="<?php echo sanitize($project['project_name']); ?>">
            <div class="p-4 d-flex flex-column flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge bg-light text-primary border small"><?php echo sanitize($project['project_type']); ?></span>
                <span class="text-muted small"><i class="bi bi-geo-alt"></i> <?php echo sanitize($project['location']); ?></span>
              </div>
              <h5 class="fw-bold text-dark mb-2"><?php echo sanitize($project['project_name']); ?></h5>
              <p class="text-secondary small flex-grow-1 mb-3">
                <?php echo substr(sanitize($project['description']), 0, 110); ?>...
              </p>
              <div class="pt-3 border-top d-flex justify-content-between align-items-center">
                <span class="small fw-semibold text-dark">Plot: <?php echo sanitize($project['plot_size'] ?? 'On Request'); ?></span>
                <a href="contact.php?project=<?php echo urlencode($project['project_name']); ?>#enquire" class="btn btn-outline-primary btn-sm fw-bold">
                  Enquire Now
                </a>
              </div>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Upcoming Projects Preview -->
<section class="py-5 bg-light">
  <div class="container py-lg-4">
    <div class="mb-4">
      <span class="text-primary fw-bold text-uppercase small">Future Horizons</span>
      <h2 class="fw-bold text-dark mt-1">Upcoming Pipelines & Corridors</h2>
      <p class="text-secondary small">Early-stage pre-launch enclaves across emerging economic corridors</p>
    </div>

    <div class="row g-4">
      <?php foreach ($upcoming_list as $up): ?>
        <div class="col-md-6 col-lg-3">
          <div class="bg-white rounded-3 p-4 border h-100 d-flex flex-column justify-content-between">
            <div>
              <span class="badge bg-dark mb-2"><?php echo sanitize($up['badge']); ?></span>
              <h6 class="fw-bold text-dark mb-1"><?php echo sanitize($up['project_name']); ?></h6>
              <p class="text-muted small mb-2"><i class="bi bi-signpost-2"></i> <?php echo sanitize($up['corridor']); ?></p>
              <p class="text-secondary small mb-3"><?php echo substr(sanitize($up['description']), 0, 95); ?>...</p>
            </div>
            <a href="contact.php?project=<?php echo urlencode($up['project_name']); ?>#enquire" class="btn btn-sm btn-outline-secondary w-100">
              Register Interest
            </a>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Testimonials -->
<section class="py-5 bg-white border-top">
  <div class="container py-lg-4">
    <div class="text-center max-w-2xl mx-auto mb-5">
      <span class="text-primary fw-bold text-uppercase small">Client Experiences</span>
      <h2 class="fw-bold text-dark mt-1">Customer Testimonials</h2>
      <p class="text-secondary small">What our valued property owners and land investors say about partnering with RD INFRA</p>
    </div>

    <div class="row g-4">
      <?php foreach ($testimonials_list as $test): ?>
        <div class="col-md-6 col-lg-4">
          <div class="p-4 rounded-3 border bg-light h-100 d-flex flex-column justify-content-between">
            <div>
              <div class="text-warning mb-2">
                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
              </div>
              <p class="text-secondary small italic mb-3">
                “<?php echo sanitize($test['testimonial']); ?>”
              </p>
            </div>
            <div class="border-top pt-2">
              <h6 class="fw-bold text-dark mb-0"><?php echo sanitize($test['customer_name']); ?></h6>
              <small class="text-muted"><?php echo sanitize($test['location_tag']); ?></small>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
