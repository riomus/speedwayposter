export interface Heat {
  id: string;
  name: string;
  scoreHome: string;
}

export interface CustomText {
  id: string;
  text: string;
  x: number;        // percentage 0-100
  y: number;        // percentage 0-100
  fontSize: number;
  color: string;
  fontWeight: number;
}

export interface PosterConfig {
  teamName: string;
  scoreHome: string;
  scoreAway: string;
  homeTeamName?: string;
  awayTeamName?: string;
  heats: Heat[];
  hashtag: string;
  matchInfo: string;
  headerLeft: string;
  headerRight: string;
  backgroundImageId?: string;
  homeLogoId?: string;
  awayLogoId?: string;
  showHome?: boolean;
  showAway?: boolean;
  layoutId?: string;          // Rider-specific layout options
  aspectRatio?: string;       // '9:16' | '1:1' | '4:5'
  customTexts?: CustomText[];
}

export interface PosterProps {
  config: PosterConfig;
  scale?: number;
  isExporting?: boolean;
  onCustomTextMove?: (id: string, x: number, y: number) => void;
}

export interface BackgroundOption {
  id: string;
  label: string;
  thumb: string;  // Import path to thumbnail
}

export interface LayoutOption {
  id: string;
  label: string;
}

export interface RiderConfig {
  riderId: string;                    // 'misiek' | 'akz'
  riderName: string;                  // Display name
  defaultConfig: PosterConfig;        // Default poster config
  backgrounds: BackgroundOption[];    // Available background images
  layouts: LayoutOption[];            // Available layout options
  logoPath: string;                   // Path to rider logo
  sponsorPaths: string[];             // Array of sponsor image paths
  primaryColor: string;               // Primary brand color
  accentColor: string;                // Accent/highlight color
}
