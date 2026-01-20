import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';

function App() {
  const [currentPage, setCurrentPage] = React.useState<'landing' | 'login' | 'dashboard'>('landing');

  // LPページを表示
  if (currentPage === 'landing') {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LandingPage onNavigateToLogin={() => setCurrentPage('login')} />
      </ThemeProvider>
    );
  }

  // ログイン画面を表示
  if (currentPage === 'login') {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Login onLogin={() => setCurrentPage('dashboard')} />
      </ThemeProvider>
    );
  }

  // ダッシュボードを表示（ログイン後）
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: '#FFFFFF',
            mt: '56px', // ヘッダーの高さ分のマージン
          }}
        >
          <Dashboard />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
