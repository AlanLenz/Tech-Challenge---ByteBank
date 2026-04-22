const colors = {
  primary: "#004D61",
  secondary: "#00474b",
  deposit: "#1C7C30",
  transfer: "#B42318",
  highlight: "#EEF2FF",
  textMuted: "#6B7280",
  white: "#FFFFFF",
  black: "#000000",
  backgroundPage: "#E4EDE3",
  backgroundCard: "#CBCBCB",
} as const;

export type ThemeColors = typeof colors;

export function useThemeColors(): ThemeColors {
  return colors;
}
