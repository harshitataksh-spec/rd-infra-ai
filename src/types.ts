export type ProjectType =
  | 'Farmhouse Projects'
  | 'Land Investment Projects'
  | 'Residential Projects'
  | 'Commercial Projects'
  | 'Plotted Developments';

export interface Project {
  id: number;
  project_name: string;
  location: string;
  project_type: ProjectType;
  description: string;
  highlights: string[];
  image: string;
  status: 'Active' | 'Completed' | 'Upcoming';
  plot_size?: string;
  connectivity?: string;
  price_range?: string;
  amenities?: string[];
  featured?: boolean;
  published?: boolean;
  created_at?: string;
}

export interface UpcomingProject {
  id: number;
  project_name: string;
  location: string;
  project_category: string;
  corridor:
    | 'NH-48 Delhi–Jaipur Highway'
    | 'Sohna / Western Peripheral region'
    | 'Delhi–Mumbai Expressway corridor'
    | 'Vrindavan';
  description: string;
  connectivity_highlights: string[];
  image: string;
  badge: 'Coming Soon' | 'Upcoming' | 'Pre-Launch';
  status: 'Upcoming' | 'Planning';
  created_at?: string;
}

export type PropertyType =
  | 'Apartments'
  | 'Villas'
  | 'Independent Houses'
  | 'Plots'
  | 'Residential Projects'
  | 'Commercial Properties'
  | 'Farmhouses'
  | string;

export type TransactionType = 'Buy' | 'Rent' | 'Sell';

export interface Property {
  id: number | string;
  title: string;
  category?: string;
  type?: PropertyType;
  transactionType: TransactionType;
  location: string;
  address?: string;
  corridor?: string;
  price?: number | string;
  priceLabel?: string;
  priceValue?: number;
  area: string;
  bedrooms?: number;
  bathrooms?: number;
  furnishing?: 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished' | string;
  possession?: 'Ready to Move' | 'Under Construction' | 'Upcoming' | string;
  possessionStatus?: 'Ready to Move' | 'Under Construction' | 'Immediate Registry' | string;
  description: string;
  amenities: string[];
  imageUrl?: string;
  images?: string[];
  status: 'Available' | 'Sold' | 'Rented' | 'Under Negotiation' | string;
  featured: boolean;
  published: boolean;
  contactPhone?: string;
  contactWhatsapp?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PropertyFilter {
  query?: string;
  transactionType?: TransactionType | 'All';
  propertyType?: string;
  location?: string;
  priceRange?: string;
}

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Follow-up'
  | 'Site Visit'
  | 'Interested'
  | 'Closed'
  | 'Not Interested';

export type AdminAssignee = 'Admin 1' | 'Admin 2' | 'Admin 3' | 'Unassigned' | string;

export interface Lead {
  id: number | string;
  name: string;
  phone: string;
  email?: string;
  requirement?: string;
  transactionType: TransactionType | 'Investment' | 'General';
  location?: string;
  budget?: string;
  message?: string;
  status: LeadStatus;
  assignedTo?: AdminAssignee;
  internalNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

export type AdminRole = 'superadmin' | 'admin' | 'editor';

export interface AdminSessionUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: AdminRole;
  avatarUrl?: string;
  lastLogin?: string;
}

export interface AdminAuthResponse {
  success: boolean;
  token?: string;
  user?: AdminSessionUser;
  expiresAt?: string;
  error?: string;
  lockoutRemainingMinutes?: number;
}

export interface AdminAuditEntry {
  id: number | string;
  userId?: string;
  adminName: string;
  adminEmail?: string;
  action: string;
  recordType?: string;
  affectedRecord?: string;
  ipAddress?: string;
  status: 'success' | 'failed' | 'warning';
  details?: string;
  timestamp: string;
}

export interface AdminUser {
  id: string;
  label?: 'Admin 1' | 'Admin 2' | 'Admin 3' | string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  lastLogin?: string;
}

export interface ActivityLog {
  id: number | string;
  adminName: string;
  adminLabel?: 'Admin 1' | 'Admin 2' | 'Admin 3' | string;
  action: string;
  recordType?: 'Property' | 'Project' | 'Lead' | 'Settings' | 'Director' | string;
  recordTitle?: string;
  affectedRecord?: string;
  timestamp: string;
}

export interface DirectorHighlight {
  id?: string | number;
  title: string;
  description: string;
  display_order?: number;
  displayOrder?: number;
  stat?: string;
  subtitle?: string;
}

export interface DirectorProfile {
  id?: string | number;
  name: string;
  designation: string;
  subtitle?: string;
  seo_title?: string;
  seoTitle?: string;
  introduction?: string;
  biography?: string;
  bioParagraphs: string[];
  vision: string;
  leadershipPhilosophy?: string;
  achievements?: string[];
  directorsMessage?: string;
  canvaDesignUrl?: string;
  canvaEmbedUrl?: string;
  photo_url?: string;
  photoUrl: string;
  is_visible?: boolean;
  isVisible?: boolean;
  primary_cta_text?: string;
  primaryCtaText?: string;
  primary_cta_link?: string;
  primaryCtaLink?: string;
  secondary_cta_text?: string;
  secondaryCtaText?: string;
  secondary_cta_link?: string;
  secondaryCtaLink?: string;
  updated_at?: string;
  updatedAt?: string;
  updated_by?: string;
  updatedBy?: string;
  highlights: DirectorHighlight[];
  experienceYears?: string;
  familiesGuided?: string;
  dubaiExperience?: string;
  developerCount?: string;
  locations?: string;
  developers?: string;
  coreExpertise?: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface Testimonial {
  id: number;
  customer_name: string;
  testimonial: string;
  rating: number;
  role?: string;
  location_tag?: string;
  image?: string;
  status: 'published' | 'pending';
  created_at?: string;
}

export interface Enquiry {
  id: number;
  name: string;
  phone: string;
  email: string;
  project: string;
  requirement: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  phone: string;
  email: string;
  subject?: string;
  message: string;
  status: 'new' | 'read';
  created_at: string;
}

export interface SiteSettings {
  company_name: string;
  tagline: string;
  domain: string;
  email: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  office_location: string;
  experience_years: string;
  since_year: string;
  logo_url?: string;
  canva_logo_link?: string;
}
