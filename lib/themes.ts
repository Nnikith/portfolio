export type ThemePreset = "forest" | "sky" | "earth" | "dark" | "light";

export const THEME_PRESETS: ThemePreset[] = ["forest", "sky", "earth", "dark", "light"];

/**
 * Theme tokens are set as CSS variables at runtime using data-theme.
 * Keep tokens minimal and deterministic.
 */
export const themeTokens: Record<ThemePreset, Record<string, string>> = {
  forest: {
    "--bg": "12 18 14",
    "--surface": "17 26 20",
    "--text": "236 245 238",
    "--muted": "170 190 176",
    "--border": "46 70 55",
    "--accent": "120 207 160",
    "--accent-2": "220 180 120",
    "--ring": "120 207 160",
  },
  sky: {
    "--bg": "10 16 24",
    "--surface": "14 22 34",
    "--text": "235 244 255",
    "--muted": "165 190 210",
    "--border": "40 70 110",
    "--accent": "120 190 255",
    "--accent-2": "170 230 255",
    "--ring": "120 190 255",
  },
  earth: {
    "--bg": "24 18 14",
    "--surface": "32 24 18",
    "--text": "247 242 236",
    "--muted": "210 195 180",
    "--border": "92 70 55",
    "--accent": "225 140 90",
    "--accent-2": "240 210 160",
    "--ring": "225 140 90",
  },
  dark: {
    "--bg": "10 10 12",
    "--surface": "18 18 22",
    "--text": "245 245 247",
    "--muted": "170 170 180",
    "--border": "60 60 72",
    "--accent": "180 140 255",
    "--accent-2": "120 220 255",
    "--ring": "180 140 255",
  },
  light: {
    "--bg": "250 250 252",
    "--surface": "255 255 255",
    "--text": "18 18 22",
    "--muted": "90 90 105",
    "--border": "220 220 230",
    "--accent": "80 120 255",
    "--accent-2": "60 190 160",
    "--ring": "80 120 255",
  },
};
