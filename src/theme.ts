import { createTheme } from '@mui/material/styles';

// DandoriWork デザインシステム - カラーパレット定義
const theme = createTheme({
  palette: {
    primary: {
      main: '#0078C8', // D-blue (Brand Color)
      dark: '#0066AA', // Hover
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#494D51', // Sub text
      light: '#8D8F92', // Disable
      dark: '#1C2026', // Primary text
    },
    error: {
      main: '#DC1D1D',
      dark: '#B01717',
      light: '#FDEFEF',
    },
    success: {
      main: '#009F77',
    },
    warning: {
      main: '#F7DE6E',
    },
    background: {
      default: '#F6F6F6', // Light
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1C2026',
      secondary: '#494D51',
      disabled: '#8D8F92',
    },
    divider: '#E4E4E5',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Hiragino Kaku Gothic ProN"',
      'Meiryo',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

// カスタムカラー（ラベル用アクセントカラー）
export const labelColors = {
  label01: '#F7DE6E',
  label02: '#95CCC5',
  label03: '#C1E6EF',
  label04: '#B9CED6',
  label05: '#FFCA98',
  label06: '#BEE185',
  label07: '#C1E6EF',
  label08: '#F8ABB0',
};

export const customColors = {
  background: {
    light: '#F6F6F6',
    soft: '#EFEFF0',
    medium: '#E4E4E5',
    dark: '#606367',
    selected: '#D9EBF7',
    active: '#E5F0FE',
  },
  line: {
    light: '#E5F0FE',
    dark: '#A4A6A8',
    separator: '#E4E4E5',
  },
};

export default theme;
