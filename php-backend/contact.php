<?php
$page_title = "Contact RD INFRA | Enquire on Land & Farmhouses";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';

$prefill_project = isset($_GET['project']) ? sanitize($_GET['project']) : '';
$success = isset($_GET['success']) && $_GET['success'] == 1;
$error = isset($_GET['error']) ? sanitize($_GET['error']) : '';
?>

<div class="bg-light py-5 border-bottom">
  <div class="container">
    <h1 class="display-6 fw-bold text-dark">Contact & Site Advisory</h1>
    <p class="text-secondary mb-0">Speak directly with our senior corridor specialists or schedule an on-ground site visit.</p>
  </div>
</div>

<div class="container py-5" id="enquire">
  <div class="row g-5">
    <div class="col-lg-5">
      <h3 class="fw-bold text-dark mb-3">Direct Communication Channels</h3>
      <p class="text-secondary small leading-relaxed mb-4">
        Whether you are seeking an exclusive 1-to-2 acre farmhouse parcel in Sohna, high-yield land along the Delhi&ndash;Jaipur Highway, or spiritual retreat land in Vrindavan, our advisory team ensures complete legal clarity and on-ground assistance.
      </p>

      <div class="d-flex flex-column gap-3 mb-4">
        <div class="d-flex align-items-start gap-3 p-3 bg-light rounded-3 border">
          <i class="bi bi-telephone-fill text-primary fs-4 mt-1"></i>
          <div>
            <div class="fw-bold text-dark small">Phone & WhatsApp Hotline</div>
            <a href="tel:<?php echo str_replace(' ', '', SITE_PHONE); ?>" class="text-decoration-none text-dark fw-bold"><?php echo SITE_PHONE; ?></a>
          </div>
        </div>

        <div class="d-flex align-items-start gap-3 p-3 bg-light rounded-3 border">
          <i class="bi bi-envelope-fill text-primary fs-4 mt-1"></i>
          <div>
            <div class="fw-bold text-dark small">Official Email Inquiries</div>
            <a href="mailto:<?php echo SITE_EMAIL; ?>" class="text-decoration-none text-dark"><?php echo SITE_EMAIL; ?></a>
          </div>
        </div>

        <div class="d-flex align-items-start gap-3 p-3 bg-light rounded-3 border">
          <i class="bi bi-geo-alt-fill text-primary fs-4 mt-1"></i>
          <div>
            <div class="fw-bold text-dark small">Corporate Hub</div>
            <span class="text-secondary small"><?php echo SITE_LOCATION; ?></span>
          </div>
        </div>
      </div>

      <div class="p-3 bg-primary bg-opacity-10 border border-primary rounded-3 text-primary small">
        <i class="bi bi-info-circle-fill me-1"></i>
        <span>Site inspections are arranged by private chauffeur-driven appointment upon request.</span>
      </div>
    </div>

    <!-- Enquiry Form -->
    <div class="col-lg-7">
      <div class="card border rounded-4 p-4 p-md-5 shadow-sm bg-white">
        <h4 class="fw-bold text-dark mb-1">Submit Project Enquiry</h4>
        <p class="text-secondary small mb-4">Fill out your contact details below and our team will get back to you promptly.</p>

        <?php if ($success): ?>
          <div class="alert alert-success d-flex align-items-center gap-2" role="alert">
            <i class="bi bi-check-circle-fill fs-4"></i>
            <div>
              <strong>Enquiry Received!</strong> Thank you for contacting RD INFRA. Our senior corridor manager will contact you shortly.
            </div>
          </div>
        <?php endif; ?>

        <?php if ($error): ?>
          <div class="alert alert-danger" role="alert">
            <?php echo $error; ?>
          </div>
        <?php endif; ?>

        <form action="submit-enquiry.php" method="POST" class="row g-3">
          <div class="col-md-6">
            <label class="form-label small fw-bold text-dark">Full Name <span class="text-danger">*</span></label>
            <input type="text" name="name" class="form-control" required placeholder="Your full name">
          </div>

          <div class="col-md-6">
            <label class="form-label small fw-bold text-dark">Phone Number <span class="text-danger">*</span></label>
            <input type="tel" name="phone" class="form-control" required placeholder="+91 97170 00000">
          </div>

          <div class="col-md-6">
            <label class="form-label small fw-bold text-dark">Email Address</label>
            <input type="email" name="email" class="form-control" placeholder="name@domain.com">
          </div>

          <div class="col-md-6">
            <label class="form-label small fw-bold text-dark">Interested Project / Corridor</label>
            <input type="text" name="project" class="form-control" value="<?php echo $prefill_project ? $prefill_project : 'General Land Advisory'; ?>" placeholder="e.g. Sohna Farmhouses">
          </div>

          <div class="col-12">
            <label class="form-label small fw-bold text-dark">Requirement Category</label>
            <select name="requirement" class="form-select">
              <option value="Luxury Farmhouse Plot">Luxury Farmhouse Plot (1-2 Acres)</option>
              <option value="Long-Term Land Investment">Long-Term Land Investment</option>
              <option value="Residential Plotted Development">Residential Plotted Development</option>
              <option value="Commercial Frontage Land">Commercial Frontage Land</option>
            </select>
          </div>

          <div class="col-12">
            <label class="form-label small fw-bold text-dark">Specific Message or Site Visit Date</label>
            <textarea name="message" rows="3" class="form-control" placeholder="Please specify any particular preferences or preferred visit schedule..."></textarea>
          </div>

          <div class="col-12 pt-2">
            <button type="submit" class="btn btn-rd-blue w-100 py-2.5">
              <i class="bi bi-send-fill me-1"></i> Submit Enquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
