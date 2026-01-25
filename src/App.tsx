import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Dashboard from './pages/Dashboard';
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
import SubcontractorBulkRegistration from './pages/SubcontractorBulkRegistration';
import SubcontractorRegistration from './pages/SubcontractorRegistration';
import WorkTypeRegistration from './pages/WorkTypeRegistration';
import MaterialRegistration from './pages/MaterialRegistration';
import LeaseItemRegistration from './pages/LeaseItemRegistration';
import CommonTemporarySettings from './pages/CommonTemporarySettings';
import SiteExpenseSettings from './pages/SiteExpenseSettings';
import ScreenPermissionRegistration from './pages/ScreenPermissionRegistration';
import ScreenPermissionTemplateRegistration from './pages/ScreenPermissionTemplateRegistration';
import WorkflowTemplateRegistration from './pages/WorkflowTemplateRegistration';
import AccountingSoftwareIntegration from './pages/AccountingSoftwareIntegration';
import { RegistrationProvider } from './contexts/RegistrationContext';

function App() {
  const [currentPage, setCurrentPage] = React.useState<'landing' | 'login' | 'dashboard' | 'construction-list' | 'construction-registration' | 'construction-detail' | 'estimate-list' | 'construction-category' | 'construction-type' | 'building-usage' | 'client' | 'user' | 'company' | 'subcontractor-bulk' | 'subcontractor' | 'work-type' | 'material' | 'lease-item' | 'common-temporary' | 'site-expense' | 'screen-permission' | 'screen-permission-template' | 'workflow-template' | 'accounting-integration'>('dashboard');
  const [selectedConstructionId, setSelectedConstructionId] = React.useState<number | null>(null);
  const [editMode, setEditMode] = React.useState<boolean>(false);

  const handleViewConstructionDetail = (id: number) => {
    setSelectedConstructionId(id);
    setCurrentPage('construction-detail');
  };

  const handleEditConstruction = (id: number) => {
    setSelectedConstructionId(id);
    setEditMode(true);
    setCurrentPage('construction-registration');
  };

  const handleNewConstruction = () => {
    setSelectedConstructionId(null);
    setEditMode(false);
    setCurrentPage('construction-registration');
  };

  const handleBackToList = () => {
    setCurrentPage('construction-list');
    setSelectedConstructionId(null);
    setEditMode(false);
  };

  const handleSaveConstruction = () => {
    if (editMode && selectedConstructionId) {
      setEditMode(false);
      setCurrentPage('construction-detail');
    } else {
      setCurrentPage('construction-list');
      setSelectedConstructionId(null);
      setEditMode(false);
    }
  };

  // 設定ページかどうかをチェック
  const settingsPages = ['user', 'client', 'company', 'subcontractor-bulk', 'subcontractor', 'construction-category', 'work-type', 'material', 'lease-item', 'common-temporary', 'site-expense', 'screen-permission', 'screen-permission-template', 'workflow-template', 'accounting-integration'];
  const isSettingsPage = settingsPages.includes(currentPage);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RegistrationProvider>
        {currentPage === 'dashboard' ? (
          <Dashboard onNavigate={setCurrentPage} />
        ) : isSettingsPage ? (
          <>
            {currentPage === 'user' && <UserRegistration onNavigate={setCurrentPage} />}
            {currentPage === 'client' && <ClientRegistration onNavigate={setCurrentPage} />}
            {currentPage === 'company' && <CompanyRegistration onNavigate={setCurrentPage} />}
            {currentPage === 'subcontractor-bulk' && <SubcontractorBulkRegistration onNavigate={setCurrentPage} />}
            {currentPage === 'subcontractor' && <SubcontractorRegistration onNavigate={setCurrentPage} />}
            {currentPage === 'construction-category' && <ConstructionCategoryRegistration onNavigate={setCurrentPage} />}
            {currentPage === 'work-type' && <WorkTypeRegistration onNavigate={setCurrentPage} />}
            {currentPage === 'material' && <MaterialRegistration onNavigate={setCurrentPage} />}
            {currentPage === 'lease-item' && <LeaseItemRegistration onNavigate={setCurrentPage} />}
            {currentPage === 'common-temporary' && <CommonTemporarySettings onNavigate={setCurrentPage} />}
            {currentPage === 'site-expense' && <SiteExpenseSettings onNavigate={setCurrentPage} />}
            {currentPage === 'screen-permission' && <ScreenPermissionRegistration onNavigate={setCurrentPage} />}
            {currentPage === 'screen-permission-template' && <ScreenPermissionTemplateRegistration onNavigate={setCurrentPage} />}
            {currentPage === 'workflow-template' && <WorkflowTemplateRegistration onNavigate={setCurrentPage} />}
            {currentPage === 'accounting-integration' && <AccountingSoftwareIntegration onNavigate={setCurrentPage} />}
          </>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header onNavigate={setCurrentPage} />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: (currentPage === 'construction-registration' || currentPage === 'construction-list' || currentPage === 'construction-detail' || currentPage === 'estimate-list' || currentPage === 'construction-type' || currentPage === 'building-usage') ? '#F6F6F6' : '#FFFFFF',
                mt: '56px',
              }}
            >
              {currentPage === 'construction-list' && (
                <ConstructionList
                  onViewDetail={handleViewConstructionDetail}
                  onEdit={handleEditConstruction}
                  onNew={handleNewConstruction}
                  onNavigate={setCurrentPage}
                />
              )}
              {currentPage === 'construction-registration' && (
                <ConstructionRegistration
                  constructionId={selectedConstructionId}
                  editMode={editMode}
                  onSave={handleSaveConstruction}
                  onNavigate={setCurrentPage}
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
              {currentPage === 'construction-type' && <ConstructionTypeRegistration />}
              {currentPage === 'building-usage' && <BuildingUsageRegistration />}
            </Box>
            <Footer />
          </Box>
        )}
      </RegistrationProvider>
    </ThemeProvider>
  );
}

export default App;
