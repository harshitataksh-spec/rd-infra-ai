<!-- Floating WhatsApp and Call Action -->
<div class="floating-whatsapp d-flex flex-column gap-2">
  <a href="https://wa.me/<?php echo SITE_WHATSAPP; ?>?text=<?php echo urlencode('Hello RD INFRA, I would like more information on your farmhouse and land investment projects.'); ?>" 
     target="_blank" 
     class="btn btn-success rounded-circle shadow-lg d-flex align-items-center justify-content-center" 
     style="width: 52px; height: 52px;" 
     title="Chat on WhatsApp">
    <i class="bi bi-whatsapp fs-4"></i>
  </a>
</div>

<!-- Footer -->
<footer class="bg-dark text-white pt-5 pb-4 mt-5">
  <div class="container">
    <div class="row g-4 pb-4 border-bottom border-secondary">
      <div class="col-lg-4">
        <div class="d-flex align-items-center gap-3 mb-3">
          <img src="assets/images/logo.jpg" alt="RD INFRA" style="height: 52px; width: auto; object-fit: contain; border-radius: 10px; background: #fff; padding: 3px;">
          <div>
            <div class="fw-bold fs-5 text-white">RD INFRA</div>
            <small class="text-secondary" style="font-size: 11px; letter-spacing: 0.1em;">BUILDING BETTER TOMORROWS</small>
          </div>
        </div>
        <p class="text-secondary small mb-3">
          <em>“<?php echo SITE_TAGLINE; ?>”</em>
        </p>
        <p class="text-secondary small">
          Premier real-estate & infrastructure development enterprise specializing in verified farmhouses, high-growth expressway land parcels, and plotted developments across North India.
        </p>
        <div class="d-flex gap-3 mt-3">
          <a href="<?php echo SITE_INSTAGRAM; ?>" target="_blank" class="text-secondary fs-5 hover-text-white"><i class="bi bi-instagram"></i></a>
          <a href="<?php echo SITE_FACEBOOK; ?>" target="_blank" class="text-secondary fs-5 hover-text-white"><i class="bi bi-facebook"></i></a>
          <a href="mailto:<?php echo SITE_EMAIL; ?>" class="text-secondary fs-5 hover-text-white"><i class="bi bi-envelope-fill"></i></a>
        </div>
      </div>

      <div class="col-6 col-lg-2">
        <h6 class="fw-bold text-white uppercase small mb-3">Company</h6>
        <ul class="list-unstyled text-secondary small space-y-2">
          <li class="mb-2"><a href="about.php" class="text-secondary text-decoration-none">About Us</a></li>
          <li class="mb-2"><a href="projects.php" class="text-secondary text-decoration-none">Projects Portfolio</a></li>
          <li class="mb-2"><a href="upcoming.php" class="text-secondary text-decoration-none">Upcoming Pipeline</a></li>
          <li class="mb-2"><a href="contact.php" class="text-secondary text-decoration-none">Contact Team</a></li>
        </ul>
      </div>

      <div class="col-6 col-lg-3">
        <h6 class="fw-bold text-white uppercase small mb-3">Focus Corridors</h6>
        <ul class="list-unstyled text-secondary small">
          <li class="mb-2"><i class="bi bi-arrow-right-short text-primary"></i> Sohna – Western Peripheral</li>
          <li class="mb-2"><i class="bi bi-arrow-right-short text-primary"></i> NH-48 Delhi–Jaipur Belt</li>
          <li class="mb-2"><i class="bi bi-arrow-right-short text-primary"></i> Delhi–Mumbai Expressway</li>
          <li class="mb-2"><i class="bi bi-arrow-right-short text-primary"></i> Vrindavan Spiritual Corridor</li>
        </ul>
      </div>

      <div class="col-lg-3">
        <h6 class="fw-bold text-white uppercase small mb-3">Corporate Advisory</h6>
        <p class="text-secondary small mb-2">
          <i class="bi bi-telephone text-primary me-2"></i> <?php echo SITE_PHONE; ?>
        </p>
        <p class="text-secondary small mb-2">
          <i class="bi bi-envelope text-primary me-2"></i> <?php echo SITE_EMAIL; ?>
        </p>
        <p class="text-secondary small mb-3">
          <i class="bi bi-geo-alt text-primary me-2"></i> <?php echo SITE_LOCATION; ?>
        </p>
        <a href="admin/login.php" class="btn btn-outline-secondary btn-sm text-white">
          <i class="bi bi-shield-lock me-1"></i> Admin Portal
        </a>
      </div>
    </div>

    <div class="row pt-4 text-secondary small align-items-center">
      <div class="col-md-6">
        &copy; <?php echo date('Y'); ?> <strong>RD INFRA</strong> (<?php echo SITE_DOMAIN; ?>). All Rights Reserved.
      </div>
      <div class="col-md-6 text-md-end mt-2 mt-md-0">
        <span class="text-muted">Disclaimer: All property dimensions and project coordinates are subject to municipal verification.</span>
      </div>
    </div>
  </div>
</footer>

<!-- Bootstrap 5 JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
