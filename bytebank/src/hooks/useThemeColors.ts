export const colors = {
  primary: "#004D61",
  secondary: "#00474b",
  green: "#1C7C30",
  red: "#B42318",
  lightBlue: "#EEF2FF",
  gray: "#6B7280",
  lightGray: "#a7a7a7",
  white: "#FFFFFF",
  black: "#000000",
  bgGreen: "#E4EDE3",
  bgGray: "#CBCBCB",
  bgRed: "#F7ECEC",
  teal: "#00767c",
  textMuted: "#444949",
} as const;

export type ThemeColors = typeof colors;

export function useThemeColors(): ThemeColors {
  return colors;
}
