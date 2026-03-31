# Creator Scans Brand Guidelines

## Colour Palette

### Primary Blues
| Name | Hex | Usage |
|---|---|---|
| CS Blue (Primary) | `#294ff6` | CTAs, primary accents, key metric values, active states |
| CS Blue 2 | `#4466f8` | Secondary buttons, chart fills, hover states |
| CS Blue 3 | `#5e7bf6` | Tertiary accents, progress bars, icon tints |
| CS Blue 4 | `#7a93ff` | Lighter accents, secondary text on dark backgrounds |
| CS Blue 5 | `#879cf7` | Lightest blue accent, subtle highlights |

### Dark Navy
| Name | Hex | Usage |
|---|---|---|
| Navy | `#000f4d` | Headings, bold metric values, dark card backgrounds |
| Navy 2 | `#001364` | Secondary dark backgrounds, avatar fallbacks |
| Navy 3 | `#152237` | Profile header background, dark sections |

### Light Backgrounds
| Name | Hex | Usage |
|---|---|---|
| Light 1 | `#f8fbff` | Card backgrounds, section fills |
| Light 2 | `#eef4fd` | Chart track backgrounds, empty state fills |
| Light 3 | `#fafbff` | Page background tint |
| Lavender | `#d8d8ff` | Subtle accent backgrounds, tag fills |

### Accent
| Name | Hex | Usage |
|---|---|---|
| CS Red | `#fe2c55` | TikTok-aligned red, live indicators, hearts, alerts |

## CSS Variable Reference

```css
--cs-blue: #294ff6;
--cs-blue-2: #4466f8;
--cs-blue-3: #5e7bf6;
--cs-blue-4: #7a93ff;
--cs-blue-5: #879cf7;
--cs-navy: #000f4d;
--cs-navy-2: #001364;
--cs-navy-3: #152237;
--cs-light-1: #f8fbff;
--cs-light-2: #eef4fd;
--cs-light-3: #fafbff;
--cs-lavender: #d8d8ff;
--cs-red: #fe2c55;
```

## JS Constant (for Softr code blocks)

```javascript
const CS = {
  blue: "#294ff6",
  blue2: "#4466f8",
  blue3: "#5e7bf6",
  blue4: "#7a93ff",
  blue5: "#879cf7",
  navy: "#000f4d",
  navy2: "#001364",
  navy3: "#152237",
  light1: "#f8fbff",
  light2: "#eef4fd",
  light3: "#fafbff",
  lavender: "#d8d8ff",
  red: "#fe2c55",
};
```

## Typography

- Headings: bold, colour `#000f4d` (navy)
- Body text: default, standard foreground
- Muted/secondary: `text-muted-foreground` (Tailwind)
- Metric values: bold, colour `#294ff6` (CS blue) or `#000f4d` (navy)
- Links on dark backgrounds: `#7a93ff` (CS blue 4), hover to white

## Component Patterns

### Cards
- Background: `#f8fbff` (light 1)
- Border: none (`border-0`)
- Shadow: `shadow-sm`
- Card titles: `text-base`, colour `#000f4d`

### Dark Header Cards
- Background: linear gradient `135deg, #152237 0%, #000f4d 100%`
- Text: white
- Secondary text: `#7a93ff` (CS blue 4)
- Avatar ring: gradient `#294ff6` to `#7a93ff`

### Badges
- Primary: background `#294ff6`, white text
- Growth/status: background `#294ff6`, white text, no border

### Metric Cards
- Icon container: `${colour}15` background (15% opacity tint), icon in full colour
- Value: `text-2xl font-bold`, colour `#000f4d`
- Label: `text-xs font-medium uppercase tracking-wide text-muted-foreground`

### Charts (CSS-based, no external libraries)
- Donut: SVG circles, track colour `#eef4fd`, segment colours from blue palette
- Horizontal bars: track `#eef4fd`, fill from blue palette (lightest to darkest for sequential data)
- Bar labels: `text-sm text-muted-foreground`, values `font-semibold` colour `#000f4d`

### Location Badges
- Circular number badge: `w-7 h-7 rounded-full`, background `#294ff6` (top 2) or `#7a93ff` (rest), white text

### Loading State
- Spinner: `border-2` with `border-color: #294ff6`, `border-top-color: transparent`, `animate-spin`

## Softr Code Block Rules

- NEVER use TypeScript syntax in Softr code blocks. Softr runs plain JavaScript/JSX only.
- No type annotations: `(n: string)` must be `(n)`, `Record<string, any>` must be `{}`, `useState<string | null>` must be `useState`
- No TypeScript interfaces or type definitions
- All code must be valid plain JSX that runs without a TypeScript compiler

## Do / Don't

- DO use the blue palette for data visualisation, progress, and positive states
- DO use navy for text that needs to feel authoritative (headings, key values)
- DO use light backgrounds for cards instead of white to add warmth
- DO use the red accent sparingly: live indicators, hearts, alerts only
- DON'T use generic greys for chart elements — use the blue palette
- DON'T use borders on cards — use shadow-sm instead
- DON'T mix external colour systems — stick to the CS palette
- DON'T use em dashes in any copy or AI-generated text
