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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RegistrationProvider>
        {currentPage === 'dashboard' ? (
          <Dashboard onNavigate={setCurrentPage} />
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header onNavigate={setCurrentPage} />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: (currentPage === 'construction-registration' || currentPage === 'construction-list' || currentPage === 'construction-detail' || currentPage === 'estimate-list' || currentPage === 'construction-category' || currentPage === 'construction-type' || currentPage === 'building-usage' || currentPage === 'client' || currentPage === 'user' || currentPage === 'company' || currentPage === 'subcontractor-bulk' || currentPage === 'subcontractor' || currentPage === 'work-type' || currentPage === 'material' || currentPage === 'lease-item' || currentPage === 'common-temporary' || currentPage === 'site-expense' || currentPage === 'screen-permission' || currentPage === 'screen-permission-template' || currentPage === 'workflow-template' || currentPage === 'accounting-integration') ? '#F6F6F6' : '#FFFFFF',
                mt: '56px',
              }}
            >
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
              {currentPage === 'subcontractor-bulk' && <SubcontractorBulkRegistration />}
              {currentPage === 'subcontractor' && <SubcontractorRegistration />}
              {currentPage === 'work-type' && <WorkTypeRegistration />}
              {currentPage === 'material' && <MaterialRegistration />}
              {currentPage === 'lease-item' && <LeaseItemRegistration />}
              {currentPage === 'common-temporary' && <CommonTemporarySettings />}
              {currentPage === 'site-expense' && <SiteExpenseSettings />}
              {currentPage === 'screen-permission' && <ScreenPermissionRegistration />}
              {currentPage === 'screen-permission-template' && <ScreenPermissionTemplateRegistration />}
              {currentPage === 'workflow-template' && <WorkflowTemplateRegistration />}
              {currentPage === 'accounting-integration' && <AccountingSoftwareIntegration />}
            </Box>
            <Footer />
          </Box>
        )}
      </RegistrationProvider>
    </ThemeProvider>
  );
}

export default App;
