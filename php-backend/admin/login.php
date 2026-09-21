<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/db.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (!empty($email) && !empty($password)) {
        try {
            $stmt = $pdo->prepare("SELECT * FROM admins WHERE email = ? LIMIT 1");
            $stmt->execute([$email]);
            $admin = $stmt->fetch();

            // Check hardcoded fallback (admin@rd-infra.in / admin123) or password_verify
            if ($admin && (password_verify($password, $admin['password_hash']) || ($email === 'admin@rd-infra.in' && $password === 'admin123'))) {
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_id'] = $admin['id'];
                $_SESSION['admin_name'] = $admin['full_name'];
                header("Location: dashboard.php");
                exit;
            } else if ($email === 'admin@rd-infra.in' && $password === 'admin123') {
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_id'] = 1;
                $_SESSION['admin_name'] = 'RD Infra Administrator';
                header("Location: dashboard.php");
                exit;
            } else {
                $error = 'Invalid email or password. Use demo: admin@rd-infra.in / admin123';
            }
        } catch (Exception $e) {
            $error = 'Database error during authentication.';
        }
    } else {
        $error = 'Please enter both email and password.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Admin Login | RD INFRA</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: #0f172a;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card-login {
      max-width: 420px;
      width: 100%;
      border-radius: 20px;
      border: 1px solid #334155;
      background: #ffffff;
      padding: 36px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
  </style>
</head>
<body>

<div class="card-login">
  <div class="text-center mb-4">
    <div class="d-inline-flex align-items-center justify-center mb-2">
      <img src="../assets/images/logo.jpg" alt="RD INFRA" style="height: 70px; width: auto; object-fit: contain; border-radius: 12px;">
    </div>
    <h5 class="fw-bold text-dark mt-2">Administrative Sign In</h5>
    <small class="text-muted">Direct management portal for rd-infra.in</small>
  </div>

  <?php if ($error): ?>
    <div class="alert alert-danger py-2 small" role="alert">
      <i class="bi bi-exclamation-triangle-fill me-1"></i> <?php echo sanitize($error); ?>
    </div>
  <?php endif; ?>

  <form method="POST" action="login.php">
    <div class="mb-3">
      <label class="form-label small fw-bold text-dark">Admin Email</label>
      <input type="email" name="email" class="form-control" required value="admin@rd-infra.in">
    </div>

    <div class="mb-4">
      <label class="form-label small fw-bold text-dark">Password</label>
      <input type="password" name="password" class="form-control" required value="admin123">
      <div class="form-text small text-muted">Demo Credentials: admin@rd-infra.in / admin123</div>
    </div>

    <button type="submit" class="btn btn-primary w-100 py-2.5 fw-bold" style="background-color: #0A4D92; border: none;">
      <i class="bi bi-lock-fill me-1"></i> Sign In to Dashboard
    </button>
  </form>

  <div class="text-center mt-4">
    <a href="../index.php" class="text-decoration-none small text-muted">&larr; Back to Public Website</a>
  </div>
</div>

</body>
</html>
