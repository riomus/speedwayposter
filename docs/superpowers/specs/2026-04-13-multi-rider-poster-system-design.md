# Multi-Rider Speedway Poster System Design

**Date:** 2026-04-13
**Status:** Approved
**Author:** Claude Code

## Overview

Transform the single-rider MISIEK speedway poster generator into a multi-rider system supporting both MISIEK and AKŻ riders with completely different visual designs while sharing the same configuration structure.

## Goals

1. Support multiple riders (MISIEK, AKŻ) with route-based selection
2. Maintain current MISIEK design unchanged
3. Create 3 completely new visual designs for AKŻ (red/yellow/white/black palette)
4. Share configuration logic and options between riders
5. Default to MISIEK rider
6. Allow users to switch between rider designs via routes

## Non-Goals

- Real-time rider switching without route change
- Backend/database integration
- User authentication
- Multiple riders in single poster

## Architecture

### Routing

**Note:** react-router is already installed as a dependency.

- `/` → Redirects to `/misiek` (default)
- `/misiek` → MisiekPage component
- `/akz` → AkzPage component

**Implementation:** Refactor existing `src/app/App.tsx` to use BrowserRouter with route definitions. The current single-page App.tsx will become the router setup file.

### Project Structure

**Note:** All asset paths are relative to `src/assets/` root directory (Vite convention).

```
src/
├── app/
│   ├── components/
│   │   ├── posters/
│   │   │   ├── MisiekPoster.tsx          # Current blue/gold design
│   │   │   ├── AkzPoster.tsx             # Router for 3 AKŻ layouts
│   │   │   ├── akz/
│   │   │   │   ├── BoldStrikerLayout.tsx
│   │   │   │   ├── CleanPowerLayout.tsx
│   │   │   │   └── SpeedDemonLayout.tsx
│   │   │   └── shared/
│   │   │       ├── types.ts              # Shared interfaces
│   │   │       ├── usePosterConfig.ts    # Config state hook
│   │   │       └── usePosterExport.ts    # Export logic hook
│   │   ├── ui/                           # Existing shadcn components
│   │   └── config/
│   │       ├── ConfigPanel.tsx           # Shared config panel
│   │       └── fields/                   # Reusable form fields
│   ├── pages/
│   │   ├── MisiekPage.tsx                # /misiek route
│   │   ├── AkzPage.tsx                   # /akz route
│   │   └── RootRedirect.tsx              # / redirect handler
│   └── App.tsx                           # Refactored to router setup
├── assets/                               # Root: src/assets/
│   ├── misiek/                           # Reorganized existing assets
│   │   ├── backgrounds/                  # Move existing bg images here
│   │   ├── logo.png                      # Current: 7e44f...png
│   │   └── sponsors/                     # Move existing sponsors here
│   └── akz/
│       ├── backgrounds/
│       │   └── 1.png                     # Existing: bg/akz/1.png
│       ├── logo.png                      # Existing: logos/akż/logo.png
│       └── sponsors/                     # From logos/akż/ folder
```

## Data Model

### Shared Types

All riders share the same configuration interface:

```typescript
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
```

### Layout Options

**MISIEK:**
- `wynik` - Results layout (current)
- `match_day` - Match preview layout (current)

**AKŻ:**
- `bold_striker` - Diagonal red stripe, aggressive design
- `clean_power` - Modern minimal, geometric
- `speed_demon` - Dynamic racing, motion effects

## Component Design

### Shared Hooks

#### usePosterConfig

Manages all configuration state and updates:

```typescript
export function usePosterConfig(defaultConfig: PosterConfig) {
  const [config, setConfig] = useState(defaultConfig);

  const updateConfig = (key: keyof PosterConfig, value: string) => { ... };
  const updateHeat = (id: string, field: keyof Heat, value: string) => { ... };
  const addHeat = () => { ... };
  const removeHeat = (id: string) => { ... };
  const addCustomText = () => { ... };
  const removeCustomText = (id: string) => { ... };
  const updateCustomText = (id: string, field: keyof CustomText, value: any) => { ... };
  const moveCustomText = (id: string, x: number, y: number) => { ... };

  return { config, updateConfig, ... };
}
```

#### usePosterExport

Handles PNG export via html2canvas:

```typescript
export function usePosterExport() {
  const [exporting, setExporting] = useState(false);

  const exportPoster = async (ref: RefObject<HTMLDivElement>, filename: string) => {
    setExporting(true);
    await new Promise(resolve => setTimeout(resolve, 100));
    const canvas = await html2canvas(ref.current, {
      scale: 4,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#060b18'
    });
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setExporting(false);
  };

  return { exporting, exportPoster };
}
```

### ConfigPanel Component

Shared configuration panel that adapts to rider context:

**Props:**
- `config: PosterConfig`
- `riderConfig: RiderConfig` - Rider-specific options (backgrounds, layouts, defaults)
- Update handlers from `usePosterConfig`
- `activeTab: 'preview' | 'config'`
- `onTabChange: (tab) => void`

**Sections:**
1. Layout & Appearance (rider-specific layout options)
2. Match Data (teams, scores)
3. Headers (PL/EN titles)
4. Heats (grid with add/remove)
5. Background Images (rider-specific backgrounds)
6. Social Media (hashtag)
7. Custom Text (add/edit draggable text)

### MisiekPoster Component

Keep existing implementation with minimal changes:
- Extract to separate file
- Accept standardized `PosterProps`
- Use existing blue/gold color scheme
- Support existing 2 layouts (wynik, match_day)
- Support existing 9 backgrounds

### AkzPoster Component

Router component that renders one of 3 layouts based on `config.layoutId`:

```typescript
export const AkzPoster = forwardRef<HTMLDivElement, PosterProps>(
  ({ config, scale = 1, isExporting = false, onCustomTextMove }, ref) => {
    const { layoutId = 'bold_striker' } = config;

    switch(layoutId) {
      case 'bold_striker':
        return <BoldStrikerLayout {...props} />;
      case 'clean_power':
        return <CleanPowerLayout {...props} />;
      case 'speed_demon':
        return <SpeedDemonLayout {...props} />;
      default:
        return <BoldStrikerLayout {...props} />;
    }
  }
);
```

### AKŻ Layout Designs

All three layouts use AKŻ brand colors: **Red (#DC2626), Yellow (#FBBF24), White (#FFFFFF), Black (#000000)**

**Sponsor Footer:** All layouts use pure black background (#000000) for sponsor footer with white-filtered logos (`filter: brightness(0) invert(1)`)

#### 1. Bold Striker Layout

**Visual Style:** Aggressive diagonal design with sharp angles

**Structure:**
- **Top Left:** AKŻ logo (white version)
- **Header:** Black bar with red gradient bottom edge, white text
- **Background:** Large diagonal red stripe (45°) cutting from top-right to bottom-left
- **Score Section:** Massive white scores, winner in yellow glow
- **Heats:** Grid with red borders, white text, yellow accent on scores
- **Footer:** Black background, 3x3 grid of white sponsor logos

**Key Features:**
- High contrast black/red/white
- Diagonal elements for dynamic feel
- Yellow reserved for highlights/winners
- Sharp geometric shapes

#### 2. Clean Power Layout

**Visual Style:** Modern minimal design with geometric precision

**Structure:**
- **Header:** Solid red bar across top, logo left, white text
- **Background:** Pure black with subtle red radial gradient
- **Score Section:** Centered huge white numbers, yellow for winner, thin red divider
- **Heats:** Clean white grid on black, yellow highlight cells
- **Footer:** White horizontal separator, sponsors in white below

**Key Features:**
- Clean lines and geometric shapes
- High readability
- Professional and polished
- Minimal decorative elements

#### 3. Speed Demon Layout

**Visual Style:** Dynamic racing energy with motion effects

**Structure:**
- **Top:** Logo left, red/yellow motion lines from top-right
- **Background:** Black with red-to-black gradient, yellow speed streaks
- **Score Section:** Asymmetric placement, dramatic shadows
- **Heats:** Staggered/offset grid for motion feel
- **Custom Text:** Positioned at angles
- **Footer:** Sponsors on black with yellow underline accent

**Key Features:**
- Motion blur and speed line effects
- Diagonal/asymmetric elements
- Racing intensity
- Grunge texture overlays

## Asset Management

**Note:** All paths below are relative to `src/assets/` directory. During implementation, assets will be reorganized into rider-specific folders for clarity.

### MISIEK Assets

**Current location → Target location after reorganization:**

**Logo:**
- Current: `src/assets/7e44f37685ad3f3cf69ea7a3d89ed6e9c1d46460.png`
- Target: `src/assets/misiek/logo.png`

**Backgrounds (9 total):**
- Current locations:
  - `src/assets/a9f444eda0b68d242315e46ad4c961ed74f42334.png` → `src/assets/misiek/backgrounds/1.png`
  - `src/assets/633cb56e126361bd8bafb54b2dc4059b83ba5b67.png` → `src/assets/misiek/backgrounds/2.png`
  - `src/assets/a58ea5c412dbad40193fcd735703fe4be406ebd5.png` → `src/assets/misiek/backgrounds/3.png`
  - `src/assets/5bb7d630512919f24bd2c3a692eb7f93e17f393a.png` → `src/assets/misiek/backgrounds/4.png`
  - `src/assets/bg/bg5.png` → `src/assets/misiek/backgrounds/5.png`
  - `src/assets/bg/bg6.png` → `src/assets/misiek/backgrounds/6.png`
  - `src/assets/bg/bg7.png` → `src/assets/misiek/backgrounds/7.png`
  - `src/assets/bg/bg8.png` → `src/assets/misiek/backgrounds/8.png`
  - `src/assets/bg/bg9.png` → `src/assets/misiek/backgrounds/9.png`

**Sponsors (4):**
- Current: `src/assets/sponsors/`
- Target: `src/assets/misiek/sponsors/`
  - f2.png
  - arche_hotel.png
  - logo_brand_claim.png
  - wrobel.png

### AKŻ Assets

**Logo:**
- Current: `src/assets/logos/akż/logo.png`
- Target: `src/assets/akz/logo.png`

**Backgrounds:**
- Current: `src/assets/bg/akz/1.png`
- Target: `src/assets/akz/backgrounds/1.png`
- Additional backgrounds can be added later

**Sponsors (9 total, all displayed as white in footer):**

Current location: `src/assets/logos/akż/`
Target location: `src/assets/akz/sponsors/`

Ready to use (no conversion needed):
- Haj.png ✓
- roosters.png ✓
- wts.png ✓
- Grantland ver 1 (shadows).png ✓

Require conversion to PNG (target resolution: 1200px width, maintain aspect ratio, 72dpi):
- mcs.jpg → mcs.png (convert JPEG to PNG for consistent filter behavior)
- automax.pdf → automax.png
- Betonlit.pdf → Betonlit.png
- Causality-logos_black-_1_ (1).svg → Causality.png
- rrspeedwayruszkiewicz.pdf → rrspeedway.png

**Conversion Method:** Use ImageMagick or similar tool with settings:
```bash
# For PDFs (extract first page, white background):
convert -density 300 input.pdf[0] -background white -flatten -resize 1200x -quality 100 output.png

# For SVG:
convert -background none input.svg -resize 1200x output.png

# For JPEG to PNG:
convert input.jpg -resize 1200x -quality 100 output.png
```

**Sponsor Display:** All sponsors filtered to white using CSS: `filter: brightness(0) invert(1)` - works consistently on PNG format at 4K export resolution.

### Shared Assets

**Club Logos (8, shared between riders):**
- Location: `src/assets/logos/` (keep in place, no reorganization needed)
- CZE.png (Włókniarz Częstochowa)
- GOR.png (Stal Gorzów)
- GRU.png (GKM Grudziądz)
- LES.png (Unia Leszno)
- LUB.png (Motor Lublin)
- TOR.png (Apator Toruń)
- WRO.png (Sparta Wrocław)
- ZIE.png (Falubaz Zielona Góra)

## Implementation Plan

### Phase 1: Foundation
1. Extract shared types to `shared/types.ts`
2. Create `usePosterConfig` hook
3. Create `usePosterExport` hook
4. Set up routing structure (/, /misiek, /akz)

### Phase 2: MISIEK Refactor
1. Move current poster to `MisiekPoster.tsx`
2. Extract config panel to shared component
3. Create `MisiekPage.tsx` using new hooks
4. Verify existing functionality:
   - Export at all 3 aspect ratios (9:16, 1:1, 4:5)
   - Both layouts render correctly (wynik, match_day)
   - All 9 backgrounds work
   - Custom text dragging works
   - Heats add/remove/edit works
   - Club logos display correctly

### Phase 3: Asset Preparation
1. Convert sponsors to PNG (see Asset Management section for conversion specs):
   - mcs.jpg → mcs.png
   - automax.pdf → automax.png
   - Betonlit.pdf → Betonlit.png
   - Causality SVG → Causality.png
   - rrspeedwayruszkiewicz.pdf → rrspeedway.png
2. Reorganize assets into rider-specific folders (misiek/, akz/)
3. Create asset import maps for each rider
4. Update import paths in MISIEK poster component

### Phase 4: AKŻ Implementation
1. Create `AkzPoster.tsx` router component
2. Implement Bold Striker layout
3. Implement Clean Power layout
4. Implement Speed Demon layout
5. Create `AkzPage.tsx` with AKŻ defaults

### Phase 5: Testing & Polish
1. Test all layouts on different aspect ratios
2. Verify export quality on all designs
3. Test draggable custom text on all layouts
4. Cross-browser testing
5. Mobile responsive testing

## Success Criteria

- [ ] `/` redirects to `/misiek`
- [ ] MISIEK design unchanged and fully functional
- [ ] All 3 AKŻ layouts render correctly
- [ ] Same config options work for both riders
- [ ] PNG export works for all layouts at high quality (scale: 4)
- [ ] All 9 AKŻ sponsor logos display correctly as white
- [ ] Draggable custom text works on all layouts
- [ ] Aspect ratio switching works (9:16, 1:1, 4:5)
- [ ] Layout switching works within each rider
- [ ] No regressions in existing MISIEK functionality

## Technical Considerations

### Performance
- html2canvas export may be slow on complex layouts - acceptable for one-time export
- Asset lazy loading not needed (small number of images)
- No virtualization needed for heats grid (max ~15 items)

### Browser Support
- Modern browsers only (React 18, ES2020+)
- Chrome, Firefox, Safari, Edge
- Mobile browsers for responsive preview

### Accessibility
- Not a primary concern for poster generator tool
- Focus on functional UI controls in config panel
- Poster itself is exported as static image

### Error Handling
- Missing assets: show placeholder or skip
- Invalid config values: validate on input
- Export failures: show error message, allow retry

## Open Questions

None - design approved by user.

## Future Enhancements (Out of Scope)

- Additional riders
- Custom asset uploads
- Save/load configurations
- Template sharing
- Real-time collaboration
- Print-ready PDF export
- Animated poster variants
