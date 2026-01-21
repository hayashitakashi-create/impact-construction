import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import ConstructionList from './pages/ConstructionList';
import ConstructionRegistration from './pages/ConstructionRegistration';
import ConstructionDetail from './pages/ConstructionDetail';
import EstimateList from './pages/EstimateList';
import ConstructionCategoryRegistration from './pages/ConstructionCategoryRegistration';
import ConstructionTypeRegistration from './pages/ConstructionTypeRegistration';
import BuildingUsageRegistration from './pages/BuildingUsageRegistration';
import ClientRegistration from './pages/ClientRegistration';
import UserRegistration from './pages/UserRegistration';
import CompanyRegistration from './pages/CompanyRegistration';
import { RegistrationProvider } from './contexts/RegistrationContext';

function App() {
  // LPページを一時的に非表示：後で表示する場合は 'dashboard' を 'landing' に戻す
  const [currentPage, setCurrentPage] = React.useState<'landing' | 'login' | 'dashboard' | 'construction-list' | 'construction-registration' | 'construction-detail' | 'estimate-list' | 'construction-category' | 'construction-type' | 'building-usage' | 'client' | 'user' | 'company'>('dashboard');
  const [selectedConstructionId, setSelectedConstructionId] = React.useState<number | null>(null);
  const [editMode, setEditMode] = React.useState<boolean>(false);

  // 工事詳細表示
  const handleViewConstructionDetail = (id: number) => {
    setSelectedConstructionId(id);
    setCurrentPage('construction-detail');
  };

  // 工事編集
  const handleEditConstruction = (id: number) => {
    setSelectedConstructionId(id);
    setEditMode(true);
    setCurrentPage('construction-registration');
  };

  // 新規工事登録
  const handleNewConstruction = () => {
    setSelectedConstructionId(null);
    setEditMode(false);
    setCurrentPage('construction-registration');
  };

  // 工事一覧に戻る
  const handleBackToList = () => {
    setCurrentPage('construction-list');
    setSelectedConstructionId(null);
    setEditMode(false);
  };

  // 工事保存後の処理
  const handleSaveConstruction = () => {
    if (editMode && selectedConstructionId) {
      // 編集モードの場合は工事詳細に戻る
      setEditMode(false);
      setCurrentPage('construction-detail');
    } else {
      // 新規登録の場合は工事一覧に戻る
      setCurrentPage('construction-list');
      setSelectedConstructionId(null);
      setEditMode(false);
    }
  };

  // LPページを表示（一時的にコメントアウト）
  // if (currentPage === 'landing') {
  //   return (
  //     <ThemeProvider theme={theme}>
  //       <CssBaseline />
  //       <LandingPage onNavigateToLogin={() => setCurrentPage('login')} />
  //     </ThemeProvider>
  //   );
  // }

  // ログイン画面を表示（一時的にコメントアウト）
  // if (currentPage === 'login') {
  //   return (
  //     <ThemeProvider theme={theme}>
  //       <CssBaseline />
  //       <Login onLogin={() => setCurrentPage('dashboard')} />
  //     </ThemeProvider>
  //   );
  // }

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
              bgcolor: (currentPage === 'construction-registration' || currentPage === 'construction-list' || currentPage === 'construction-detail' || currentPage === 'estimate-list' || currentPage === 'construction-category' || currentPage === 'construction-type' || currentPage === 'building-usage' || currentPage === 'client' || currentPage === 'user' || currentPage === 'company') ? '#F6F6F6' : '#FFFFFF',
              mt: '56px', // ヘッダーの高さ分のマージン
            }}
          >
            {currentPage === 'dashboard' && <Dashboard />}
            {currentPage === 'construction-list' && (
              <ConstructionList
                onViewDetail={handleViewConstructionDetail}
                onEdit={handleEditConstruction}
                onNew={handleNewConstruction}
              />
            )}
            {currentPage === 'construction-registration' && (
              <ConstructionRegistration
                constructionId={selectedConstructionId}
                editMode={editMode}
                onSave={handleSaveConstruction}
              />
            )}
            {currentPage === 'construction-detail' && selectedConstructionId && (
              <ConstructionDetail
                constructionId={selectedConstructionId}
                onBack={handleBackToList}
                onEdit={() => handleEditConstruction(selectedConstructionId)}
              />
            )}
            {currentPage === 'estimate-list' && <EstimateList />}
            {currentPage === 'construction-category' && <ConstructionCategoryRegistration />}
            {currentPage === 'construction-type' && <ConstructionTypeRegistration />}
            {currentPage === 'building-usage' && <BuildingUsageRegistration />}
            {currentPage === 'client' && <ClientRegistration />}
            {currentPage === 'user' && <UserRegistration />}
            {currentPage === 'company' && <CompanyRegistration />}
          </Box>
          <Footer />
        </Box>
      </RegistrationProvider>
    </ThemeProvider>
  );
}

export default App;
