import { createTheme } from "@mui/material/styles";

export const palette = { bg: "#16151a", surface: "#1f1e25", border: "rgba(255,255,255,.09)", text: "#f1eee8", muted: "#a7a4ae", accent: "#b9a7ff", accent2: "#7c8cff" };

const theme = createTheme({
  breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1600 } },
  palette: {
    mode: "dark",
    primary: { main: palette.accent, contrastText: palette.bg },
    secondary: { main: palette.accent2 },
    background: { default: palette.bg, paper: palette.surface },
    text: { primary: palette.text, secondary: palette.muted },
    divider: palette.border,
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: '"Instrument Sans", system-ui, sans-serif',
    h1: { fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", fontSize: "clamp(2.4rem, 7vw, 4.6rem)" },
    h2: { fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700, letterSpacing: "-0.02em", fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)" },
    h5: { fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 500 },
    h6: { fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 500 },
    body1: { lineHeight: 1.7 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, padding: "10px 24px", transition: "transform .2s, background .2s", "&:active": { transform: "scale(.97)" } },
        containedPrimary: { "&:hover": { background: "#cdbfff" } },
        outlined: { borderColor: palette.border, "&:hover": { borderColor: palette.accent, background: "rgba(185,167,255,.08)" } },
      },
    },
    MuiCard: { styleOverrides: { root: { backgroundImage: "none", border: `1px solid ${palette.border}`, borderRadius: 20 } } },
    MuiChip: { styleOverrides: { root: { borderRadius: 8, background: "rgba(185,167,255,.1)", color: palette.accent } } },
    MuiTextField: { defaultProps: { variant: "outlined", fullWidth: true } },
  },
});
export default theme;
