import React, { useState } from 'react';
import { X, Copy, Check, Download, Database, Server, FolderTree, FileCode2, ExternalLink, Terminal } from 'lucide-react';

interface XamppExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const XamppExportModal: React.FC<XamppExportModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'sql' | 'php_config' | 'tree'>('guide');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const sqlCode = `-- ==========================================================
-- RD INFRA - Production Database Schema (rd_infra)
-- Domain: rd-infra.in | Tagline: "Building Better Tomorrows"
-- ==========================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+05:30";

CREATE DATABASE IF NOT EXISTS \`rd_infra\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`rd_infra\`;

-- --------------------------------------------------------
-- Table structure for table \`admins\`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`admins\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`username\` VARCHAR(100) NOT NULL UNIQUE,
  \`email\` VARCHAR(150) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`full_name\` VARCHAR(150) NOT NULL,
  \`role\` ENUM('superadmin', 'admin') DEFAULT 'admin',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Admin 1 Account: ravinder deswal 001 / rdinfra@2026 (bcrypt hash)
INSERT INTO \`admins\` (\`id\`, \`username\`, \`email\`, \`password_hash\`, \`full_name\`, \`role\`) VALUES
(1, 'ravinder deswal 001', 'ravinder@rd-infra.in', '$2y$10$tMv6Yf1eR0C379eXqG8k1u8F3aP2Z5r2m3u4A1B2C3D4E5F6G7H8I', 'Ravinder Deswal (001)', 'superadmin');

-- --------------------------------------------------------
-- Table structure for table \`projects\`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`projects\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`project_name\` VARCHAR(255) NOT NULL,
  \`location\` VARCHAR(255) NOT NULL,
  \`project_type\` ENUM('Farmhouse Projects', 'Land Investment Projects', 'Residential Projects', 'Commercial Projects', 'Plotted Developments') NOT NULL,
  \`description\` TEXT NOT NULL,
  \`highlights\` TEXT NOT NULL,
  \`image\` VARCHAR(500) NOT NULL,
  \`status\` ENUM('Active', 'Completed', 'Upcoming') DEFAULT 'Active',
  \`plot_size\` VARCHAR(100) DEFAULT NULL,
  \`connectivity\` VARCHAR(255) DEFAULT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Projects
INSERT INTO \`projects\` (\`id\`, \`project_name\`, \`location\`, \`project_type\`, \`description\`, \`highlights\`, \`image\`, \`status\`, \`plot_size\`, \`connectivity\`) VALUES
(1, 'Aravali View Luxury Farmhouse Estates', 'Sohna – Western Peripheral Corridor, South Gurgaon', 'Farmhouse Projects', 'Gated boutique farmhouse community nestled against the picturesque Aravali foothills. Thoughtfully planned with wide internal green avenues, dedicated power back-up infrastructure, and serene landscape buffers.', 'Gated perimeter with 24/7 security\\n40-foot wide tree-lined internal roads\\nRich fertile soil for private organic orchards\\nDirect connectivity to Delhi–Mumbai Expressway & KMP', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', 'Active', '1 Acre to 2.5 Acres', '12 min from Sohna Elevated Highway, 20 min to Rajiv Chowk'),
(2, 'Jaipur Highway Serene Agro Retreat', 'NH-48 Delhi–Jaipur Corridor (Bilaspur–Dharuhera Belt)', 'Farmhouse Projects', 'Exclusive country estate plots with modern A-frame cottage designs, perimeter plantations, and private access roads right off the prime national transit corridor.', 'Clean freehold ownership with demarcated boundary pillars\\nUnderground electricity conduit and rainwater harvesting\\nArchitectural plans compatible with luxury wooden chalets', 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80', 'Active', '1000 sq. yds to 2 Acres', 'Direct access from NH-48; 35 min to Manesar IMT'),
(3, 'Expressway Growth Hub Plotted Parcels', 'Delhi–Mumbai Expressway Corridor', 'Land Investment Projects', 'High-potential land parcels strategically identified along the greenfield Delhi–Mumbai Expressway spine. Ideal for strategic investors seeking long-term value in North India’s busiest economic lifeline.', 'Strategically evaluated entry pricing in high-growth corridor\\nProximity to proposed logistics parks and dry ports\\nClear title documentation and verified registry records', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80', 'Active', 'Customizable Multi-Acre Parcels', 'Interchange junction within 4 km of entry ramps'),
(4, 'Vrindavan Sacred Land Enclave', 'Vrindavan – Chhatikara Spiritual Corridor', 'Land Investment Projects', 'Tranquil land parcels in the spiritual epicentre of Vrindavan. Tailored for families seeking a serene sanctuary near sacred heritage temples and the Yamuna Expressway.', 'Quiet, pollution-free spiritual neighborhood\\nDirect linkage to NH-19 and Yamuna Expressway\\nIdeal for ashram style holiday homes, senior living, or retreats', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', 'Active', '250 sq. yds to 1000 sq. yds', '15 min to Banke Bihari Temple, 10 min to Prem Mandir'),
(5, 'Karnal Smart Living Plotted Township', 'Karnal Growth Belt, Haryana', 'Plotted Developments', 'Planned residential plotted layout designed with municipal standard road grids, underground storm water drainage, central park buffers, and community recreation zones.', 'Clean freehold residential registry\\nWide 30ft & 40ft blacktop sector roads\\nLush green parks and paved walking pathways', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80', 'Active', '120, 160 & 250 sq. yds', '5 min from GT Karnal Road, 10 min from Railway Station'),
(6, 'Dharuhera–Bawal Industrial Frontage Land', 'Bawal Industrial Corridor, Haryana', 'Commercial Projects', 'Commercial-grade land parcels situated near major industrial clusters and automotive hubs in the Dharuhera-Bawal industrial belt, suitable for corporate warehousing.', 'Heavy vehicle wide-axle turning access\\nSurrounded by Tier-1 Japanese & Indian manufacturing giants\\nHigh rental and corporate leasing demand potential', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', 'Active', '1 Acre to 5 Acres', 'Directly off Bawal interchange on Delhi-Jaipur Highway');

-- --------------------------------------------------------
-- Table structure for table \`upcoming_projects\`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`upcoming_projects\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`project_name\` VARCHAR(255) NOT NULL,
  \`location\` VARCHAR(255) NOT NULL,
  \`project_category\` VARCHAR(150) NOT NULL,
  \`corridor\` VARCHAR(150) NOT NULL,
  \`description\` TEXT NOT NULL,
  \`connectivity_highlights\` TEXT NOT NULL,
  \`image\` VARCHAR(500) NOT NULL,
  \`badge\` ENUM('Coming Soon', 'Upcoming', 'Pre-Launch') DEFAULT 'Coming Soon',
  \`status\` VARCHAR(50) DEFAULT 'Upcoming',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO \`upcoming_projects\` (\`id\`, \`project_name\`, \`location\`, \`project_category\`, \`corridor\`, \`description\`, \`connectivity_highlights\`, \`image\`, \`badge\`) VALUES
(101, 'NH-48 Milestone Valley Farm Greens', 'NH-48 Delhi–Jaipur Highway Corridor', 'Boutique Farmhouse Enclave', 'NH-48 Delhi–Jaipur Highway', 'An upcoming eco-conscious farmhouse sanctuary planned along the scenic foothills flanking NH-48.', 'Direct service lane off NH-48 Delhi-Jaipur Highway\\n20 minutes from Dharuhera cloverleaf\\nClean scenic backdrop with natural Aravali hillocks', 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80', 'Coming Soon'),
(102, 'Sohna KMP Luxury Agri-Estates', 'Sohna / Western Peripheral Corridor', 'Luxury Country Estate Plots', 'Sohna / Western Peripheral region', 'Thoughtfully conceptualized luxury country estate land parcels in the emerging high-speed Western Peripheral cluster.', 'Seamless link to Kundli-Manesar-Palwal (KMP) Expressway\\n15 minutes from Sohna town\\nConnected via newly widened 6-lane elevated highway', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80', 'Pre-Launch'),
(103, 'Delhi–Mumbai Corridor Gateway Land', 'Delhi–Mumbai Expressway Growth Node', 'Strategic Land Investment', 'Delhi–Mumbai Expressway corridor', 'Early-stage land opportunities positioned at the gateway node of the 1,350 km Delhi–Mumbai Industrial corridor.', 'Under 5 minutes from upcoming cloverleaf interchange\\nProximity to multimodal transit nodes\\nRapid infrastructure under Bharatmala Pariyojana', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', 'Upcoming'),
(104, 'Vrindavan Divya Dham Living', 'Vrindavan Heritage Spiritual Corridor, UP', 'Plotted Spiritual Living Retreat', 'Vrindavan', 'Serene planned enclave dedicated to spiritual seekers wishing to build a home in the timeless, sacred lands of Braj.', '7 minutes from Yamuna Expressway Vrindavan toll gate\\n10 minutes to Chandrodaya Temple & ISKCON\\nConnected via 4-lane religious tourism corridor', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80', 'Coming Soon');

-- --------------------------------------------------------
-- Table structure for table \`testimonials\`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`testimonials\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`customer_name\` VARCHAR(150) NOT NULL,
  \`testimonial\` TEXT NOT NULL,
  \`rating\` INT DEFAULT 5,
  \`location_tag\` VARCHAR(150) DEFAULT NULL,
  \`status\` ENUM('published', 'pending') DEFAULT 'published',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO \`testimonials\` (\`id\`, \`customer_name\`, \`testimonial\`, \`rating\`, \`location_tag\`, \`status\`) VALUES
(1, 'SUBHASMITA', 'We were genuinely impressed by the vision, planning, and quality of the project. RD Infra combines modern development with a strong focus on long-term value.', 5, 'Gurgaon Property Investor', 'published'),
(2, 'NEHUL SHARMA', 'From our first interaction to every stage of the investment, RD Infra demonstrated exceptional professionalism and attention to detail. We felt confident and well supported throughout.', 5, 'NH-48 Land Investor', 'published'),
(3, 'PREET CHAUHAN', 'The project is beautifully planned, thoughtfully developed, and offers a sense of exclusivity. The RD Infra team made the entire experience seamless and reassuring.', 5, 'Farmhouse Owner', 'published'),
(4, 'MADHAVI', 'From the quality of the project to the professionalism of the team, every aspect reflects thoughtful planning and attention to detail. RD Infra delivers an experience that inspires confidence.', 5, 'Land Investment Client', 'published'),
(5, 'DEEPANSHU BHARDWAJ', 'RD Infra combines refined planning, quality development, and a customer-first approach. It’s reassuring to invest with a company that thinks beyond today and focuses on lasting value.', 5, 'Plotted Development Investor', 'published');

-- --------------------------------------------------------
-- Table structure for table \`enquiries\`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`enquiries\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(150) NOT NULL,
  \`phone\` VARCHAR(50) NOT NULL,
  \`email\` VARCHAR(150) DEFAULT NULL,
  \`project\` VARCHAR(255) NOT NULL,
  \`requirement\` VARCHAR(150) NOT NULL,
  \`message\` TEXT DEFAULT NULL,
  \`status\` ENUM('new', 'contacted', 'closed') DEFAULT 'new',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Sample Enquiries
INSERT INTO \`enquiries\` (\`id\`, \`name\`, \`phone\`, \`email\`, \`project\`, \`requirement\`, \`message\`, \`status\`) VALUES
(1, 'Rajesh Malhotra', '+91 98112 34567', 'rajesh.m@example.com', 'Aravali View Luxury Farmhouse Estates', '1.5 Acre Farmhouse Plot', 'Interested in scheduling a site visit this coming Saturday. Looking for clear boundary registry.', 'new'),
(2, 'Vikramaditya Rao', '+91 99201 88231', 'vikram.rao@outlook.com', 'Delhi–Mumbai Expressway Growth Belt', 'Long-term Land Investment', 'Please send detailed layout coordinates and corridor development roadmap.', 'contacted'),
(3, 'Ananya Deshmukh', '+91 97110 54321', 'ananya.d@gmail.com', 'Vrindavan Sacred Land Enclave', '500 sq. yds plot for family retreat', 'Looking for a plot close to the temple corridor.', 'new');

-- --------------------------------------------------------
-- Table structure for table \`site_settings\`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`site_settings\` (
  \`setting_key\` VARCHAR(100) PRIMARY KEY,
  \`setting_value\` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO \`site_settings\` (\`setting_key\`, \`setting_value\`) VALUES
('company_name', 'RD INFRA'),
('tagline', 'Building Better Tomorrows'),
('domain', 'rd-infra.in'),
('email', 'rdinfra.98@gmail.com'),
('phone', '+91 97170 77699'),
('whatsapp', '919717077699'),
('instagram', 'https://www.instagram.com/gurgaonluxuryfarms/'),
('facebook', 'https://www.facebook.com/share/1LG7WHyxmA/?mibextid=wwXIfr'),
('office_location', 'Strategic Corridor Hub, Gurugram, Haryana, India');

COMMIT;
`;

  const phpDbConfig = `<?php
// ==========================================================
// RD INFRA - config/db.php
// Domain: rd-infra.in | Tagline: "Building Better Tomorrows"
// ==========================================================

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'rd_infra');
define('DB_CHARSET', 'utf8mb4');

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch (PDOException $e) {
    // In production, log error to secure file instead of printing raw message
    error_log("Database Connection Error: " . $e->getMessage());
    die("A secure database error occurred. Please verify your MySQL credentials in config/db.php.");
}
?>`;

  const downloadSql = () => {
    const blob = new Blob([sqlCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rd_infra.sql';
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex justify-between items-center shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-300">
              <Server className="w-4 h-4" />
              <span>XAMPP & PHP/MySQL Deployment Package</span>
            </div>
            <h3 className="text-xl font-extrabold mt-1">RD INFRA Full-Stack Production Architecture</h3>
            <p className="text-xs text-slate-400">Complete setup instructions, MySQL database schema, and PHP backend files</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-t border-x ${
              activeTab === 'guide'
                ? 'bg-white text-[#0A4D92] border-slate-200 shadow-xs'
                : 'bg-transparent text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            10-Step Setup Guide
          </button>

          <button
            onClick={() => setActiveTab('sql')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-t border-x ${
              activeTab === 'sql'
                ? 'bg-white text-[#0A4D92] border-slate-200 shadow-xs'
                : 'bg-transparent text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            rd_infra.sql Schema
          </button>

          <button
            onClick={() => setActiveTab('php_config')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-t border-x ${
              activeTab === 'php_config'
                ? 'bg-white text-[#0A4D92] border-slate-200 shadow-xs'
                : 'bg-transparent text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            PHP db.php Config
          </button>

          <button
            onClick={() => setActiveTab('tree')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-t border-x ${
              activeTab === 'tree'
                ? 'bg-white text-[#0A4D92] border-slate-200 shadow-xs'
                : 'bg-transparent text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            Folder Structure
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: 10-STEP SETUP GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-6 text-slate-800">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-3">
                <Database className="w-5 h-5 text-[#0A4D92] shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700 leading-relaxed">
                  <p className="font-bold text-[#0A4D92] text-sm mb-1">Production-Ready PHP & MySQL Architecture</p>
                  <p>
                    Follow these 10 straightforward steps to run the complete RD INFRA website with Apache, PHP, and MySQL on your local machine using XAMPP and VS Code, and connect your live domain <strong>rd-infra.in</strong>.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <div className="flex items-center gap-2 mb-1 text-[#0A4D92] font-bold text-sm">
                    <span className="h-6 w-6 rounded-full bg-blue-100 text-[#0A4D92] flex items-center justify-center text-xs">1</span>
                    <h4>Installing XAMPP</h4>
                  </div>
                  <p className="text-xs text-slate-600 ml-8 leading-relaxed">
                    Download and install XAMPP from <a href="https://www.apachefriends.org" target="_blank" rel="noreferrer" className="text-[#0A4D92] underline">apachefriends.org</a> (PHP 8.1 or 8.2 recommended). Choose components: <strong>Apache</strong> and <strong>MySQL</strong>.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <div className="flex items-center gap-2 mb-1 text-[#0A4D92] font-bold text-sm">
                    <span className="h-6 w-6 rounded-full bg-blue-100 text-[#0A4D92] flex items-center justify-center text-xs">2</span>
                    <h4>Starting Apache and MySQL</h4>
                  </div>
                  <p className="text-xs text-slate-600 ml-8 leading-relaxed">
                    Open the <strong>XAMPP Control Panel</strong>. Click the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">Start</code> button next to <strong>Apache</strong> and next to <strong>MySQL</strong>. Both should turn green.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <div className="flex items-center gap-2 mb-1 text-[#0A4D92] font-bold text-sm">
                    <span className="h-6 w-6 rounded-full bg-blue-100 text-[#0A4D92] flex items-center justify-center text-xs">3</span>
                    <h4>Creating the rd_infra Database</h4>
                  </div>
                  <p className="text-xs text-slate-600 ml-8 leading-relaxed">
                    In your browser, visit <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-bold">http://localhost/phpmyadmin</code>. Click on <strong>Databases</strong>, enter <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-bold">rd_infra</code> as the database name with Collation <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">utf8mb4_unicode_ci</code>, and click <strong>Create</strong>.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <div className="flex items-center gap-2 mb-1 text-[#0A4D92] font-bold text-sm">
                    <span className="h-6 w-6 rounded-full bg-blue-100 text-[#0A4D92] flex items-center justify-center text-xs">4</span>
                    <h4>Importing the SQL File</h4>
                  </div>
                  <p className="text-xs text-slate-600 ml-8 leading-relaxed mb-2">
                    Click the <code className="bg-slate-100 px-1.5 py-0.5 rounded font-bold">Import</code> tab in phpMyAdmin. Choose the file <code className="bg-slate-100 px-1.5 py-0.5 rounded font-bold">rd_infra.sql</code> (download it via the button below or copy from the tab above) and click <strong>Go</strong>. All tables (<code className="text-slate-800 font-semibold">admins, projects, upcoming_projects, testimonials, enquiries, site_settings</code>) will be created and seeded.
                  </p>
                  <div className="ml-8">
                    <button
                      onClick={downloadSql}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0A4D92] text-white text-xs font-bold rounded-lg hover:bg-blue-800"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download rd_infra.sql</span>
                    </button>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <div className="flex items-center gap-2 mb-1 text-[#0A4D92] font-bold text-sm">
                    <span className="h-6 w-6 rounded-full bg-blue-100 text-[#0A4D92] flex items-center justify-center text-xs">5</span>
                    <h4>Putting the Project Inside htdocs</h4>
                  </div>
                  <p className="text-xs text-slate-600 ml-8 leading-relaxed">
                    Navigate to your XAMPP installation directory (typically <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">C:\xampp\htdocs\</code> on Windows or <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">/Applications/XAMPP/htdocs/</code> on macOS). Create a folder named <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-bold">rd-infra</code> and place all project files there.
                  </p>
                </div>

                {/* Step 6 */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <div className="flex items-center gap-2 mb-1 text-[#0A4D92] font-bold text-sm">
                    <span className="h-6 w-6 rounded-full bg-blue-100 text-[#0A4D92] flex items-center justify-center text-xs">6</span>
                    <h4>Configuring Database Credentials</h4>
                  </div>
                  <p className="text-xs text-slate-600 ml-8 leading-relaxed">
                    Open <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-bold">config/db.php</code> in VS Code. Ensure host is <code className="bg-slate-100 px-1.5 py-0.5 rounded">localhost</code>, user is <code className="bg-slate-100 px-1.5 py-0.5 rounded">root</code>, password is <code className="bg-slate-100 px-1.5 py-0.5 rounded">""</code> (empty by default in XAMPP), and database is <code className="bg-slate-100 px-1.5 py-0.5 rounded font-bold">rd_infra</code>.
                  </p>
                </div>

                {/* Step 7 */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <div className="flex items-center gap-2 mb-1 text-[#0A4D92] font-bold text-sm">
                    <span className="h-6 w-6 rounded-full bg-blue-100 text-[#0A4D92] flex items-center justify-center text-xs">7</span>
                    <h4>Running the Website Locally</h4>
                  </div>
                  <p className="text-xs text-slate-600 ml-8 leading-relaxed">
                    Open your web browser and visit: <code className="bg-slate-100 px-2 py-0.5 rounded text-[#0A4D92] font-bold">http://localhost/rd-infra/</code>. The complete responsive RD INFRA homepage will load with all sections, filters, and forms.
                  </p>
                </div>

                {/* Step 8 */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <div className="flex items-center gap-2 mb-1 text-[#0A4D92] font-bold text-sm">
                    <span className="h-6 w-6 rounded-full bg-blue-100 text-[#0A4D92] flex items-center justify-center text-xs">8</span>
                    <h4>Opening the Admin Panel</h4>
                  </div>
                  <p className="text-xs text-slate-600 ml-8 leading-relaxed">
                    Visit <code className="bg-slate-100 px-2 py-0.5 rounded text-[#0A4D92] font-bold">http://localhost/rd-infra/admin/login.php</code>.
                    <br />
                    <span className="font-semibold text-slate-700">Admin 1 Credentials:</span>
                    <br />
                    • Admin 1 ID: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-bold">ravinder deswal 001</code>
                    <br />
                    • Passcode: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-bold">rdinfra@2026</code>
                  </p>
                </div>

                {/* Step 9 */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <div className="flex items-center gap-2 mb-1 text-[#0A4D92] font-bold text-sm">
                    <span className="h-6 w-6 rounded-full bg-blue-100 text-[#0A4D92] flex items-center justify-center text-xs">9</span>
                    <h4>Adding Projects and Testimonials</h4>
                  </div>
                  <p className="text-xs text-slate-600 ml-8 leading-relaxed">
                    Use the secure Admin Dashboard to add new Farmhouse or Land parcels, update upcoming project pipelines, approve client testimonials, manage customer leads, or export enquiries to CSV.
                  </p>
                </div>

                {/* Step 10 */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <div className="flex items-center gap-2 mb-1 text-[#0A4D92] font-bold text-sm">
                    <span className="h-6 w-6 rounded-full bg-blue-100 text-[#0A4D92] flex items-center justify-center text-xs">10</span>
                    <h4>Connecting the Live Domain rd-infra.in</h4>
                  </div>
                  <p className="text-xs text-slate-600 ml-8 leading-relaxed space-y-1">
                    <span>1. Upload all files to your production cPanel / VPS public_html directory.</span><br />
                    <span>2. In cPanel MySQL Databases, create user and import <code className="bg-slate-100 px-1 py-0.5 rounded">rd_infra.sql</code>.</span><br />
                    <span>3. In your DNS Registrar (GoDaddy / Hostinger / Cloudflare), configure:</span><br />
                    <span className="font-mono text-[11px] bg-slate-100 p-1.5 rounded block my-1">
                      A Record: @ → [Your Server IP Address]<br />
                      CNAME Record: www → rd-infra.in
                    </span>
                    <span>4. Enable free Let’s Encrypt SSL for <code className="font-bold">https://rd-infra.in/</code>.</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SQL SCHEMA */}
          {activeTab === 'sql' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">rd_infra.sql (Full MySQL Database Script)</h4>
                  <p className="text-xs text-slate-500">Includes all tables, primary keys, and authentic seed records</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy('sql', sqlCode)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors"
                  >
                    {copiedKey === 'sql' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'sql' ? 'Copied!' : 'Copy SQL'}</span>
                  </button>
                  <button
                    onClick={downloadSql}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0A4D92] hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .sql</span>
                  </button>
                </div>
              </div>

              <pre className="p-4 bg-slate-900 text-slate-200 rounded-2xl text-xs font-mono overflow-x-auto max-h-[50vh] leading-relaxed border border-slate-800">
                {sqlCode}
              </pre>
            </div>
          )}

          {/* TAB 3: PHP DB CONFIG */}
          {activeTab === 'php_config' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">config/db.php (PDO Connection File)</h4>
                  <p className="text-xs text-slate-500">Secure PDO database driver with exception handling and UTF-8 collation</p>
                </div>
                <button
                  onClick={() => handleCopy('db_config', phpDbConfig)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors"
                >
                  {copiedKey === 'db_config' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'db_config' ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="p-4 bg-slate-900 text-slate-200 rounded-2xl text-xs font-mono overflow-x-auto max-h-[50vh] leading-relaxed border border-slate-800">
                {phpDbConfig}
              </pre>
            </div>
          )}

          {/* TAB 4: FOLDER STRUCTURE */}
          {activeTab === 'tree' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">Recommended Production Folder Hierarchy</h4>
              <p className="text-xs text-slate-500">Clean modular structure for XAMPP htdocs/rd-infra</p>

              <pre className="p-4 bg-slate-900 text-slate-200 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
{`rd-infra/
├── .htaccess                      # Pretty URLs & security headers
├── rd_infra.sql                   # Complete MySQL database import
├── index.php                      # Homepage (Hero, Highlights, Corridors, Testimonials)
├── about.php                      # About RD INFRA (Story, Experience, Mission)
├── projects.php                   # Full filterable project catalog
├── upcoming.php                   # Upcoming pipeline & register interest
├── testimonials.php               # Client reviews and quotes
├── contact.php                    # Contact page & map
├── submit-enquiry.php             # Secure backend enquiry handler (AJAX & POST)
│
├── config/
│   ├── db.php                     # PDO MySQL Database connection
│   └── config.php                 # Site constants, email settings & domain
│
├── includes/
│   ├── header.php                 # Brand metadata, SEO, and top bar
│   ├── navbar.php                 # Navigation bar with RD INFRA brand identity
│   └── footer.php                 # Footer with disclaimers & social links
│
├── admin/
│   ├── index.php                  # Redirect to login or dashboard
│   ├── login.php                  # Secure Admin Login with password_verify
│   ├── dashboard.php              # Operational dashboard & stats
│   ├── projects.php               # Project CRUD (Add/Edit/Delete)
│   ├── upcoming.php               # Upcoming project management
│   ├── testimonials.php           # Testimonials approval & editor
│   ├── enquiries.php              # Inquiries lead manager & CSV export
│   ├── settings.php               # Contact & site info updates
│   ├── auth_check.php             # Session authentication middleware
│   └── logout.php                 # Session termination
│
├── assets/
│   ├── css/
│   │   ├── style.css              # Custom styling & brand colors
│   │   └── bootstrap.min.css      # Bootstrap 5
│   ├── js/
│   │   └── main.js                # Form validation, filter pills & smooth scrolling
│   └── images/
│       └── projects/              # Curated property photography
`}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center shrink-0">
          <span className="text-xs text-slate-500">Target Domain: <strong>rd-infra.in</strong></span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0A4D92] text-white text-xs font-bold rounded-xl hover:bg-blue-800 transition-colors"
          >
            Close Package
          </button>
        </div>
      </div>
    </div>
  );
};
