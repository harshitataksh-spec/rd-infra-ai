<?php
$page_title = "About RD INFRA | 10+ Years Building Better Tomorrows";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
?>

<div class="bg-light py-5 border-bottom">
  <div class="container">
    <span class="badge bg-primary px-3 py-1 mb-2" style="background-color: #0A4D92 !important;">SINCE 2014</span>
    <h1 class="display-6 fw-bold text-dark">About RD INFRA</h1>
    <p class="text-secondary mb-0">Discover our decade-long legacy in real-estate and infrastructure excellence across North India.</p>
  </div>
</div>

<section class="py-5 bg-white">
  <div class="container py-4">
    <div class="row g-5 align-items-center">
      <div class="col-lg-7">
        <h3 class="fw-bold text-dark mb-3">Our Corporate Story</h3>
        <p class="text-secondary leading-relaxed">
          Founded in <strong>2014</strong>, <strong>RD INFRA</strong> has steadily evolved from a visionary regional land consultancy into a trusted name in infrastructure and premium real estate development. Operating with the foundational belief that land represents the bedrock of generational wealth, our guiding philosophy &mdash; <em>“Building Better Tomorrows”</em> &mdash; steers every acquisition and planning initiative.
        </p>
        <p class="text-secondary leading-relaxed">
          Over the past decade, we have developed a specialized focus on verified farmland acquisitions, luxury farmhouse communities, and strategic plotted developments along North India’s most promising growth arteries &mdash; including the Sohna elevated corridor, the historic NH-48 Delhi&ndash;Jaipur Highway, the Delhi&ndash;Mumbai Expressway, and the sacred spiritual territory of Vrindavan.
        </p>

        <h4 class="fw-bold text-dark mt-4 mb-2">Our Core Principles</h4>
        <div class="row g-3 mt-1">
          <div class="col-sm-6">
            <div class="p-3 border rounded-3 bg-light">
              <h6 class="fw-bold text-dark mb-1"><i class="bi bi-file-earmark-check text-primary me-1"></i> Due Diligence</h6>
              <small class="text-secondary">Every parcel undergoes rigorous 30-year title verification and boundary inspection.</small>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 border rounded-3 bg-light">
              <h6 class="fw-bold text-dark mb-1"><i class="bi bi-geo-alt text-primary me-1"></i> Strategic Location</h6>
              <small class="text-secondary">We only invest where capital appreciation is propelled by national infrastructure investments.</small>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-5">
        <div class="card border-0 shadow-sm p-4 bg-light rounded-4">
          <h5 class="fw-bold text-dark mb-3">Corporate Factsheet</h5>
          <ul class="list-group list-group-flush bg-transparent small">
            <li class="list-group-item bg-transparent d-flex justify-content-between px-0">
              <span class="text-muted">Entity Name</span>
              <span class="fw-bold text-dark">RD INFRA</span>
            </li>
            <li class="list-group-item bg-transparent d-flex justify-content-between px-0">
              <span class="text-muted">Official Domain</span>
              <span class="fw-bold text-dark"><?php echo SITE_DOMAIN; ?></span>
            </li>
            <li class="list-group-item bg-transparent d-flex justify-content-between px-0">
              <span class="text-muted">Inception Year</span>
              <span class="fw-bold text-dark">2014 (10+ Years)</span>
            </li>
            <li class="list-group-item bg-transparent d-flex justify-content-between px-0">
              <span class="text-muted">Contact Telephone</span>
              <span class="fw-bold text-dark"><?php echo SITE_PHONE; ?></span>
            </li>
            <li class="list-group-item bg-transparent d-flex justify-content-between px-0">
              <span class="text-muted">Direct Email</span>
              <span class="fw-bold text-dark"><?php echo SITE_EMAIL; ?></span>
            </li>
            <li class="list-group-item bg-transparent d-flex justify-content-between px-0">
              <span class="text-muted">Primary Hub</span>
              <span class="fw-bold text-dark">Gurugram, Haryana</span>
            </li>
          </ul>

          <div class="mt-4 pt-3 border-top text-center">
            <a href="contact.php" class="btn btn-rd-blue w-100 btn-sm">Schedule Advisory Discussion</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
