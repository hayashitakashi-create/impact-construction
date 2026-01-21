import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import ConstructionRegistration from './pages/ConstructionRegistration';
import ConstructionCategoryRegistration from './pages/ConstructionCategoryRegistration';
import ConstructionTypeRegistration from './pages/ConstructionTypeRegistration';
import BuildingUsageRegistration from './pages/BuildingUsageRegistration';
import { RegistrationProvider } from './contexts/RegistrationContext';

function App() {
  const [currentPage, setCurrentPage] = React.useState<'landing' | 'login' | 'dashboard' | 'construction-registration' | 'construction-category' | 'construction-type' | 'building-usage'>('landing');

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

  // ダッシュボードまたは工事登録を表示（ログイン後）
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RegistrationProvider>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header onNavigate={setCurrentPage} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: (currentPage === 'construction-registration' || currentPage === 'construction-category' || currentPage === 'construction-type' || currentPage === 'building-usage') ? '#F6F6F6' : '#FFFFFF',
              mt: '56px', // ヘッダーの高さ分のマージン
            }}
          >
            {currentPage === 'dashboard' && <Dashboard />}
            {currentPage === 'construction-registration' && <ConstructionRegistration />}
            {currentPage === 'construction-category' && <ConstructionCategoryRegistration />}
            {currentPage === 'construction-type' && <ConstructionTypeRegistration />}
            {currentPage === 'building-usage' && <BuildingUsageRegistration />}
          </Box>
          <Footer />
        </Box>
      </RegistrationProvider>
    </ThemeProvider>
  );
}

export default App;
