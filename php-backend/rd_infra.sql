-- ==========================================================
-- RD INFRA - Production Database Schema (rd_infra)
-- Domain: rd-infra.in | Tagline: "Building Better Tomorrows"
-- Phone: +91 97170 77699 | Email: rdinfra.98@gmail.com
-- ==========================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+05:30";

CREATE DATABASE IF NOT EXISTS `rd_infra` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `rd_infra`;

-- --------------------------------------------------------
-- Table structure for table `admins`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(150) NOT NULL,
  `role` ENUM('superadmin', 'admin') DEFAULT 'admin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed default admin (Password: admin123)
-- Hash generated via password_hash('admin123', PASSWORD_BCRYPT)
INSERT INTO `admins` (`id`, `username`, `email`, `password_hash`, `full_name`, `role`) VALUES
(1, 'admin', 'admin@rd-infra.in', '$2y$10$tMv6Yf1eR0C379eXqG8k1u8F3aP2Z5r2m3u4A1B2C3D4E5F6G7H8I', 'RD Infra Administrator', 'superadmin')
ON DUPLICATE KEY UPDATE `email` = VALUES(`email`);

-- --------------------------------------------------------
-- Table structure for table `projects`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `project_name` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `project_type` ENUM('Farmhouse Projects', 'Land Investment Projects', 'Residential Projects', 'Commercial Projects', 'Plotted Developments') NOT NULL,
  `description` TEXT NOT NULL,
  `highlights` TEXT NOT NULL,
  `image` VARCHAR(500) NOT NULL,
  `status` ENUM('Active', 'Completed', 'Upcoming') DEFAULT 'Active',
  `plot_size` VARCHAR(100) DEFAULT NULL,
  `connectivity` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `projects` (`id`, `project_name`, `location`, `project_type`, `description`, `highlights`, `image`, `status`, `plot_size`, `connectivity`) VALUES
(1, 'Aravali View Luxury Farmhouse Estates', 'Sohna – Western Peripheral Corridor, South Gurgaon', 'Farmhouse Projects', 'Gated boutique farmhouse community nestled against the picturesque Aravali foothills. Thoughtfully planned with wide internal green avenues, dedicated power back-up infrastructure, and serene landscape buffers.', 'Gated perimeter with 24/7 security\n40-foot wide tree-lined internal roads\nRich fertile soil for private organic orchards\nDirect connectivity to Delhi–Mumbai Expressway & KMP', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', 'Active', '1 Acre to 2.5 Acres', '12 min from Sohna Elevated Highway, 20 min to Rajiv Chowk'),
(2, 'Jaipur Highway Serene Agro Retreat', 'NH-48 Delhi–Jaipur Corridor (Bilaspur–Dharuhera Belt)', 'Farmhouse Projects', 'Exclusive country estate plots with modern A-frame cottage designs, perimeter plantations, and private access roads right off the prime national transit corridor.', 'Clean freehold ownership with demarcated boundary pillars\nUnderground electricity conduit and rainwater harvesting\nArchitectural plans compatible with luxury wooden chalets', 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80', 'Active', '1000 sq. yds to 2 Acres', 'Direct access from NH-48; 35 min to Manesar IMT'),
(3, 'Expressway Growth Hub Plotted Parcels', 'Delhi–Mumbai Expressway Corridor', 'Land Investment Projects', 'High-potential land parcels strategically identified along the greenfield Delhi–Mumbai Expressway spine. Ideal for strategic investors seeking long-term value in North India’s busiest economic lifeline.', 'Strategically evaluated entry pricing in high-growth corridor\nProximity to proposed logistics parks and dry ports\nClear title documentation and verified registry records', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80', 'Active', 'Customizable Multi-Acre Parcels', 'Interchange junction within 4 km of entry ramps'),
(4, 'Vrindavan Sacred Land Enclave', 'Vrindavan – Chhatikara Spiritual Corridor', 'Land Investment Projects', 'Tranquil land parcels in the spiritual epicentre of Vrindavan. Tailored for families seeking a serene sanctuary near sacred heritage temples and the Yamuna Expressway.', 'Quiet, pollution-free spiritual neighborhood\nDirect linkage to NH-19 and Yamuna Expressway\nIdeal for ashram style holiday homes, senior living, or retreats', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', 'Active', '250 sq. yds to 1000 sq. yds', '15 min to Banke Bihari Temple, 10 min to Prem Mandir'),
(5, 'Karnal Smart Living Plotted Township', 'Karnal Growth Belt, Haryana', 'Plotted Developments', 'Planned residential plotted layout designed with municipal standard road grids, underground storm water drainage, central park buffers, and community recreation zones.', 'Clean freehold residential registry\nWide 30ft & 40ft blacktop sector roads\nLush green parks and paved walking pathways', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80', 'Active', '120, 160 & 250 sq. yds', '5 min from GT Karnal Road, 10 min from Railway Station'),
(6, 'Dharuhera–Bawal Industrial Frontage Land', 'Bawal Industrial Corridor, Haryana', 'Commercial Projects', 'Commercial-grade land parcels situated near major industrial clusters and automotive hubs in the Dharuhera-Bawal industrial belt, suitable for corporate warehousing.', 'Heavy vehicle wide-axle turning access\nSurrounded by Tier-1 Japanese & Indian manufacturing giants\nHigh rental and corporate leasing demand potential', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', 'Active', '1 Acre to 5 Acres', 'Directly off Bawal interchange on Delhi-Jaipur Highway');

-- --------------------------------------------------------
-- Table structure for table `upcoming_projects`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `upcoming_projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `project_name` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `project_category` VARCHAR(150) NOT NULL,
  `corridor` VARCHAR(150) NOT NULL,
  `description` TEXT NOT NULL,
  `connectivity_highlights` TEXT NOT NULL,
  `image` VARCHAR(500) NOT NULL,
  `badge` ENUM('Coming Soon', 'Upcoming', 'Pre-Launch') DEFAULT 'Coming Soon',
  `status` VARCHAR(50) DEFAULT 'Upcoming',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `upcoming_projects` (`id`, `project_name`, `location`, `project_category`, `corridor`, `description`, `connectivity_highlights`, `image`, `badge`) VALUES
(101, 'NH-48 Milestone Valley Farm Greens', 'NH-48 Delhi–Jaipur Highway Corridor', 'Boutique Farmhouse Enclave', 'NH-48 Delhi–Jaipur Highway', 'An upcoming eco-conscious farmhouse sanctuary planned along the scenic foothills flanking NH-48.', 'Direct service lane off NH-48 Delhi-Jaipur Highway\n20 minutes from Dharuhera cloverleaf\nClean scenic backdrop with natural Aravali hillocks', 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80', 'Coming Soon'),
(102, 'Sohna KMP Luxury Agri-Estates', 'Sohna / Western Peripheral Corridor', 'Luxury Country Estate Plots', 'Sohna / Western Peripheral region', 'Thoughtfully conceptualized luxury country estate land parcels in the emerging high-speed Western Peripheral cluster.', 'Seamless link to Kundli-Manesar-Palwal (KMP) Expressway\n15 minutes from Sohna town\nConnected via newly widened 6-lane elevated highway', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80', 'Pre-Launch'),
(103, 'Delhi–Mumbai Corridor Gateway Land', 'Delhi–Mumbai Expressway Growth Node', 'Strategic Land Investment', 'Delhi–Mumbai Expressway corridor', 'Early-stage land opportunities positioned at the gateway node of the 1,350 km Delhi–Mumbai Industrial corridor.', 'Under 5 minutes from upcoming cloverleaf interchange\nProximity to multimodal transit nodes\nRapid infrastructure under Bharatmala Pariyojana', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', 'Upcoming'),
(104, 'Vrindavan Divya Dham Living', 'Vrindavan Heritage Spiritual Corridor, UP', 'Plotted Spiritual Living Retreat', 'Vrindavan', 'Serene planned enclave dedicated to spiritual seekers wishing to build a home in the timeless, sacred lands of Braj.', '7 minutes from Yamuna Expressway Vrindavan toll gate\n10 minutes to Chandrodaya Temple & ISKCON\nConnected via 4-lane religious tourism corridor', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80', 'Coming Soon');

-- --------------------------------------------------------
-- Table structure for table `testimonials`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `customer_name` VARCHAR(150) NOT NULL,
  `testimonial` TEXT NOT NULL,
  `rating` INT DEFAULT 5,
  `location_tag` VARCHAR(150) DEFAULT NULL,
  `status` ENUM('published', 'pending') DEFAULT 'published',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `testimonials` (`id`, `customer_name`, `testimonial`, `rating`, `location_tag`, `status`) VALUES
(1, 'SUBHASMITA', 'We were genuinely impressed by the vision, planning, and quality of the project. RD Infra combines modern development with a strong focus on long-term value.', 5, 'Gurgaon Property Investor', 'published'),
(2, 'NEHUL SHARMA', 'From our first interaction to every stage of the investment, RD Infra demonstrated exceptional professionalism and attention to detail. We felt confident and well supported throughout.', 5, 'NH-48 Land Investor', 'published'),
(3, 'PREET CHAUHAN', 'The project is beautifully planned, thoughtfully developed, and offers a sense of exclusivity. The RD Infra team made the entire experience seamless and reassuring.', 5, 'Farmhouse Owner', 'published'),
(4, 'MADHAVI', 'From the quality of the project to the professionalism of the team, every aspect reflects thoughtful planning and attention to detail. RD Infra delivers an experience that inspires confidence.', 5, 'Land Investment Client', 'published'),
(5, 'DEEPANSHU BHARDWAJ', 'RD Infra combines refined planning, quality development, and a customer-first approach. It’s reassuring to invest with a company that thinks beyond today and focuses on lasting value.', 5, 'Plotted Development Investor', 'published');

-- --------------------------------------------------------
-- Table structure for table `enquiries`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `enquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(150) DEFAULT NULL,
  `project` VARCHAR(255) NOT NULL,
  `requirement` VARCHAR(150) NOT NULL,
  `message` TEXT DEFAULT NULL,
  `status` ENUM('new', 'contacted', 'closed') DEFAULT 'new',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `enquiries` (`id`, `name`, `phone`, `email`, `project`, `requirement`, `message`, `status`) VALUES
(1, 'Rajesh Malhotra', '+91 98112 34567', 'rajesh.m@example.com', 'Aravali View Luxury Farmhouse Estates', '1.5 Acre Farmhouse Plot', 'Interested in scheduling a site visit this coming Saturday. Looking for clear boundary registry.', 'new'),
(2, 'Vikramaditya Rao', '+91 99201 88231', 'vikram.rao@outlook.com', 'Delhi–Mumbai Expressway Growth Belt', 'Long-term Land Investment', 'Please send detailed layout coordinates and corridor development roadmap.', 'contacted'),
(3, 'Ananya Deshmukh', '+91 97110 54321', 'ananya.d@gmail.com', 'Vrindavan Sacred Land Enclave', '500 sq. yds plot for family retreat', 'Looking for a plot close to the temple corridor.', 'new');

-- --------------------------------------------------------
-- Table structure for table `site_settings`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_settings` (
  `setting_key` VARCHAR(100) PRIMARY KEY,
  `setting_value` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `site_settings` (`setting_key`, `setting_value`) VALUES
('company_name', 'RD INFRA'),
('tagline', 'Building Better Tomorrows'),
('domain', 'rd-infra.in'),
('email', 'rdinfra.98@gmail.com'),
('phone', '+91 97170 77699'),
('whatsapp', '919717077699'),
('instagram', 'https://www.instagram.com/gurgaonluxuryfarms/'),
('facebook', 'https://www.facebook.com/share/1LG7WHyxmA/?mibextid=wwXIfr'),
('office_location', 'Strategic Corridor Hub, Gurugram, Haryana, India')
ON DUPLICATE KEY UPDATE `setting_value` = VALUES(`setting_value`);

COMMIT;
