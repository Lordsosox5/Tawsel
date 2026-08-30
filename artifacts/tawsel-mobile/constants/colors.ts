/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    // Legacy aliases (kept for backward compatibility)
    text: '#0a0a0a',
    tint: '#d9262c',

    // Core surfaces
    background: '#f7f3ed',
    foreground: '#3a2521',

    // Cards / elevated surfaces
    card: '#fffdfa',
    cardForeground: '#3a2521',

    // Primary action color (buttons, links, active states)
    primary: '#d9262c',
    primaryForeground: '#fffaf2',

    // Secondary / less-emphasis interactive surfaces
    secondary: '#efe6d9',
    secondaryForeground: '#3a2521',

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: '#eee8df',
    mutedForeground: '#806f68',

    // Accent highlights (badges, selected items, focus rings)
    accent: '#e9a52d',
    accentForeground: '#3a2521',

    // Destructive actions (delete, error states)
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',
    success: '#39734d',
    heroText: '#fffaf2',
    heroSoft: '#f8dcd0',
    heroKicker: '#ffc6ad',
    restaurantStart: '#f4b083',
    restaurantEnd: '#bc3d27',
    groceryStart: '#b8d1ad',
    groceryEnd: '#467362',
    pharmacyStart: '#b5d9dd',
    pharmacyEnd: '#367582',
    categoryRestaurant: '#f9ddd5',
    categoryGrocery: '#e4ecd9',
    categoryPharmacy: '#dbecee',

    // Borders and input outlines
    border: '#e2d8cb',
    input: '#e2d8cb',
  },

  // Border radius (in px). Sync from the sibling web artifact's --radius
  // CSS variable. This value applies to cards, buttons, inputs, and modals.
  radius: 22,
};

export default colors;
