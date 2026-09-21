# RD INFRA — Production PHP & MySQL Deployment Package

**Domain:** `rd-infra.in`  
**Tagline:** “Building Better Tomorrows”  
**Contact:** +91 97170 77699 | rdinfra.98@gmail.com  
**Instagram:** [https://www.instagram.com/gurgaonluxuryfarms/](https://www.instagram.com/gurgaonluxuryfarms/)  
**Facebook:** [https://www.facebook.com/share/1LG7WHyxmA/?mibextid=wwXIfr](https://www.facebook.com/share/1LG7WHyxmA/?mibextid=wwXIfr)

---

## 10-Step XAMPP & Local Server Installation

### Step 1: Install XAMPP
Download and install XAMPP from [https://www.apachefriends.org](https://www.apachefriends.org) (PHP 8.1 or 8.2 recommended). Ensure **Apache** and **MySQL** modules are selected during setup.

### Step 2: Start Apache and MySQL
Open the **XAMPP Control Panel** and start both **Apache** and **MySQL** services. Confirm that both status indicators turn green.

### Step 3: Create the MySQL Database
1. Open your browser and navigate to: `http://localhost/phpmyadmin/`
2. Click on the **Databases** tab.
3. Enter database name: `rd_infra`
4. Collation: `utf8mb4_unicode_ci`
5. Click **Create**.

### Step 4: Import Database Schema
1. Click the **Import** tab in phpMyAdmin with the `rd_infra` database selected.
2. Choose the `rd_infra.sql` file provided in this folder.
3. Click **Go** at the bottom of the page.
4. All tables (`admins`, `projects`, `upcoming_projects`, `testimonials`, `enquiries`, `site_settings`) and initial seed data will be imported.

### Step 5: Place Code in XAMPP htdocs
Copy the contents of this `php-backend` directory into your XAMPP root:
- **Windows:** `C:\xampp\htdocs\rd-infra\`
- **macOS:** `/Applications/XAMPP/htdocs/rd-infra/`
- **Linux:** `/opt/lampp/htdocs/rd-infra/`

### Step 6: Verify Database Configuration
Open `config/db.php` in your code editor (e.g., VS Code) and verify:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'rd_infra');
```

### Step 7: Launch the Public Website
Visit in your web browser:
```
http://localhost/rd-infra/
```
The website will load with all responsive sections, current projects, upcoming pipelines, corridors, and working contact form.

### Step 8: Log into the Admin Dashboard
Visit:
```
http://localhost/rd-infra/admin/login.php
```
**Default Credentials:**
- **Email:** `admin@rd-infra.in`
- **Password:** `admin123`

### Step 9: Manage Projects & Enquiries
From the Admin Dashboard:
- Add, edit, or delete current and upcoming projects
- Review client enquiries and change status (New, Contacted, Closed)
- Export leads to CSV

### Step 10: Production Deployment to `rd-infra.in`
1. Upload all files to your production web server's `public_html` directory via FTP/cPanel File Manager.
2. In cPanel MySQL Databases, create a database and user, grant all privileges, and import `rd_infra.sql`.
3. Update `config/db.php` with your live cPanel database credentials.
4. Update your domain DNS records at your registrar:
   - **A Record:** `@` points to your hosting server IP.
   - **CNAME:** `www` points to `rd-infra.in`.
5. Install free Let's Encrypt SSL.
