// User types
export interface GuestData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface User extends GuestData {
  id: string;
  created_at?: string;
}

// Material types
export type Material = 'pvc' | 'alluminio';

export interface MaterialOption {
  id: Material;
  name: string;
  description: string;
  image: string;
  features: string[];
}

// Category types
export type Category =
  | 'finestra'
  | 'porta-finestra'
  | 'porta-garage'
  | 'persiane'
  | 'scuri'
  | 'tapparelle';

export interface CategoryOption {
  id: Category;
  name: string;
  description: string;
  image: string;
  materials: Material[];
  basePrice: number;
}

// Configuration types
export interface Dimensions {
  width: number;
  height: number;
  depth?: number;
}

export interface Colors {
  esterno: string;
  interno: string;
  profili: string;
}

export interface Accessory {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  materials: Material[];
}

export type GlassType =
  | 'singolo'
  | 'doppio'
  | 'triplo'
  | 'antisfondamento'
  | 'acustico'
  | 'termico';

export interface GlassOption {
  id: GlassType;
  name: string;
  description: string;
  price: number;
  features: string[];
}

// Wizard state types
export interface WizardState {
  currentStep: number;
  isGuest: boolean;
  guestData?: GuestData;
  user?: User;
  material?: Material;
  category?: Category;
  dimensions?: Dimensions;
  colors?: Colors;
  glassType?: GlassType;
  accessories: string[];
  configurationId?: string;
  isCompleted: boolean;
}

// Configuration record from database
export interface ConfigurationRecord {
  id: string;
  user_id: string | null;
  guest_data: GuestData | null;
  material: Material | null;
  category: Category | null;
  dimensions: Dimensions | null;
  colors: Colors | null;
  glass_type: GlassType | null;
  accessories: string[] | null;
  current_step: number;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

// Quote request types
export interface QuoteRequest {
  id: string;
  configuration_id: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  notes: string | null;
  created_at: string;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
