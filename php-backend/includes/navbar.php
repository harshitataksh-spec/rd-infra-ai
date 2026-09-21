<!-- Top Bar -->
<div class="bg-white border-bottom py-1.5 d-none d-lg-block text-secondary small">
  <div class="container d-flex justify-content-between align-items-center">
    <div>
      <span class="text-primary me-2"><i class="bi bi-geo-alt-fill"></i></span>
      <span>North India Land Corridors: Gurgaon &bull; NH-48 &bull; Sohna &bull; Vrindavan</span>
    </div>
    <div class="d-flex align-items-center gap-3">
      <a href="tel:<?php echo str_replace(' ', '', SITE_PHONE); ?>" class="text-decoration-none fw-bold text-dark">
        <i class="bi bi-telephone-fill text-primary me-1"></i> <?php echo SITE_PHONE; ?>
      </a>
      <span class="text-muted">|</span>
      <a href="admin/login.php" class="text-decoration-none text-secondary">
        <i class="bi bi-shield-lock-fill text-primary"></i> Admin Login
      </a>
    </div>
  </div>
</div>

<!-- Main Sticky Navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top border-bottom py-3 shadow-sm">
  <div class="container">
    <a class="navbar-brand d-flex align-items-center gap-2 fw-bolder text-dark" href="index.php">
      <img src="assets/images/logo.jpg" alt="RD INFRA" style="height: 46px; width: auto; object-fit: contain; border-radius: 8px; border: 1px solid #e2e8f0; padding: 2px; background: #fff;">
      <div class="d-flex flex-column leading-none text-start">
        <div class="d-flex align-items-center gap-1">
          <span class="fw-black text-primary" style="color: #0A4D92 !important;">RD</span>
          <span class="text-muted">|</span>
          <span class="fw-bold text-dark">INFRA</span>
        </div>
        <small class="text-muted fw-normal" style="font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;">Building Better Tomorrows</small>
      </div>
    </a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#rdNavbar" aria-controls="rdNavbar" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="rdNavbar">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0 fw-semibold align-items-lg-center gap-lg-2">
        <li class="nav-item"><a class="nav-link text-dark" href="index.php">Home</a></li>
        <li class="nav-item"><a class="nav-link text-dark" href="about.php">About RD Infra</a></li>
        <li class="nav-item"><a class="nav-link text-dark" href="projects.php">Projects</a></li>
        <li class="nav-item"><a class="nav-link text-dark" href="upcoming.php">Upcoming</a></li>
        <li class="nav-item"><a class="nav-link text-dark" href="contact.php">Contact</a></li>
        <li class="nav-item ms-lg-2">
          <a class="btn btn-rd-blue btn-sm" href="contact.php#enquire">Enquire Now</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
