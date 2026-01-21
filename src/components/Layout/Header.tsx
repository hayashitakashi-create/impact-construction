import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  AccountCircle,
} from '@mui/icons-material';

interface MenuItemType {
  label: string;
  path: string;
}

const menuItems: MenuItemType[] = [];

const constructionMenuItems = [
  { label: '工事一覧', path: '/construction/list' },
  { label: '工事登録', path: '/construction/register' },
];

const quotationMenuItems = [
  { label: '見積積算一覧', path: '/quotation/list' },
  { label: '見積積算承認一覧', path: '/quotation/approval-list' },
];

const budgetMenuItems = [
  { label: '実行予算一覧', path: '/budget/list' },
  { label: '実行予算承認一覧', path: '/budget/approval-list' },
];

const procurementMenuItems = [
  { label: '発注業者選定依頼', path: '/procurement/vendor-selection-request' },
  { label: '発注業者選定依頼一覧', path: '/procurement/vendor-selection-list' },
  { label: '発注一覧', path: '/procurement/order-list' },
  { label: '発注実績一覧', path: '/procurement/order-result-list' },
  { label: '発注業者一覧', path: '/procurement/vendor-list' },
  { label: '発注承認一覧', path: '/procurement/approval-list' },
  { label: '注文書管理', path: '/procurement/purchase-order-management' },
  { label: '注文書管理(参照)', path: '/procurement/purchase-order-reference' },
];

const progressMenuItems = [
  { label: '出来高査定対象一覧', path: '/progress/assessment-target-list' },
  { label: '出来高報告書', path: '/progress/report' },
];

const paymentMenuItems = [
  { label: '支払登録一覧', path: '/payment/registration-list' },
  { label: '支払登録', path: '/payment/registration' },
  { label: '支払承認一覧', path: '/payment/approval-list' },
  { label: '支払予想額給与表', path: '/payment/estimated-payment-table' },
  { label: '入金予定一覧', path: '/payment/scheduled-receipts-list' },
];

const budgetManagementMenuItems = [
  { label: '損益表', path: '/budget-management/profit-loss' },
  { label: '工事総括一覧', path: '/budget-management/construction-summary-list' },
];

const settingsMenuItems = [
  { label: 'ユーザー登録', path: '/settings/user' },
  { label: '発注者登録', path: '/settings/client' },
  { label: '外注業者一括登録', path: '/settings/subcontractor-bulk' },
  { label: '外注業者登録', path: '/settings/subcontractor' },
  { label: '工事分類登録', path: '/settings/construction-category' },
  { label: '工種登録', path: '/settings/work-type' },
  { label: '建物用途登録', path: '/settings/building-usage' },
  { label: '資材登録', path: '/settings/material' },
  { label: '社内リース品目登録', path: '/settings/lease-item' },
  { label: '共通仮設費項目設定', path: '/settings/common-temporary' },
  { label: '現場経費科目設定', path: '/settings/site-expense' },
  { label: '画面操作権限登録', path: '/settings/screen-permission' },
  { label: '画面操作権限テンプレート登録', path: '/settings/screen-permission-template' },
  { label: 'ワークフローテンプレート登録', path: '/settings/workflow-template' },
  { label: '会計ソフト連携設定', path: '/settings/accounting-integration' },
  { label: '原価登録', path: '/settings/cost' },
  { label: '会計登録情報設定', path: '/settings/accounting-info' },
];

const userMenuItems = [
  { label: '操作ガイド', path: '/user/guide' },
  { label: '管理者用マニュアル', path: '/user/admin-manual' },
  { label: 'マイアカウント', path: '/user/account' },
  { label: 'ログアウト', path: '/logout' },
];

interface HeaderProps {
  onNavigate?: (page: 'landing' | 'login' | 'dashboard' | 'construction-registration' | 'construction-category' | 'construction-type' | 'building-usage') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [selectedMenu, setSelectedMenu] = React.useState<string>('');
  const [constructionAnchorEl, setConstructionAnchorEl] = React.useState<null | HTMLElement>(null);
  const [quotationAnchorEl, setQuotationAnchorEl] = React.useState<null | HTMLElement>(null);
  const [budgetAnchorEl, setBudgetAnchorEl] = React.useState<null | HTMLElement>(null);
  const [procurementAnchorEl, setProcurementAnchorEl] = React.useState<null | HTMLElement>(null);
  const [progressAnchorEl, setProgressAnchorEl] = React.useState<null | HTMLElement>(null);
  const [paymentAnchorEl, setPaymentAnchorEl] = React.useState<null | HTMLElement>(null);
  const [budgetManagementAnchorEl, setBudgetManagementAnchorEl] = React.useState<null | HTMLElement>(null);
  const [settingsAnchorEl, setSettingsAnchorEl] = React.useState<null | HTMLElement>(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleConstructionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setConstructionAnchorEl(event.currentTarget);
  };

  const handleConstructionClose = () => {
    setConstructionAnchorEl(null);
  };

  const handleConstructionMenuClick = (path: string) => {
    console.log('Menu clicked:', path);
    setSelectedMenu(path);
    handleConstructionClose();
    if (path === '/construction/register') {
      console.log('Navigating to construction-registration');
      if (onNavigate) {
        onNavigate('construction-registration');
      }
    }
  };

  const handleQuotationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setQuotationAnchorEl(event.currentTarget);
  };

  const handleQuotationClose = () => {
    setQuotationAnchorEl(null);
  };

  const handleQuotationMenuClick = (path: string) => {
    setSelectedMenu(path);
    handleQuotationClose();
  };

  const handleBudgetClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setBudgetAnchorEl(event.currentTarget);
  };

  const handleBudgetClose = () => {
    setBudgetAnchorEl(null);
  };

  const handleBudgetMenuClick = (path: string) => {
    setSelectedMenu(path);
    handleBudgetClose();
  };

  const handleProcurementClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProcurementAnchorEl(event.currentTarget);
  };

  const handleProcurementClose = () => {
    setProcurementAnchorEl(null);
  };

  const handleProcurementMenuClick = (path: string) => {
    setSelectedMenu(path);
    handleProcurementClose();
  };

  const handleProgressClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProgressAnchorEl(event.currentTarget);
  };

  const handleProgressClose = () => {
    setProgressAnchorEl(null);
  };

  const handleProgressMenuClick = (path: string) => {
    setSelectedMenu(path);
    handleProgressClose();
  };

  const handlePaymentClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPaymentAnchorEl(event.currentTarget);
  };

  const handlePaymentClose = () => {
    setPaymentAnchorEl(null);
  };

  const handlePaymentMenuClick = (path: string) => {
    setSelectedMenu(path);
    handlePaymentClose();
  };

  const handleBudgetManagementClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setBudgetManagementAnchorEl(event.currentTarget);
  };

  const handleBudgetManagementClose = () => {
    setBudgetManagementAnchorEl(null);
  };

  const handleBudgetManagementMenuClick = (path: string) => {
    setSelectedMenu(path);
    handleBudgetManagementClose();
  };

  const handleSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };

  const handleSettingsMenuClick = (path: string) => {
    setSelectedMenu(path);
    handleSettingsClose();
    if (path === '/settings/construction-category') {
      if (onNavigate) {
        onNavigate('construction-category');
      }
    } else if (path === '/settings/work-type') {
      if (onNavigate) {
        onNavigate('construction-type');
      }
    } else if (path === '/settings/building-usage') {
      if (onNavigate) {
        onNavigate('building-usage');
      }
    }
  };

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleUserMenuItemClick = (path: string) => {
    setSelectedMenu(path);
    handleUserMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#0078C8',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ minHeight: '56px !important', px: 3 }}>
        {/* 会社名とロゴ */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
          <IconButton
            sx={{
              backgroundColor: '#FFFFFF',
              width: 32,
              height: 32,
              mr: 1.5,
              '&:hover': {
                backgroundColor: '#F6F6F6',
              },
            }}
          >
            <ScheduleIcon sx={{ color: '#0078C8', fontSize: 20 }} />
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              color: '#FFFFFF',
              fontWeight: 400,
              fontSize: '0.875rem',
              whiteSpace: 'nowrap',
            }}
          >
            株式会社ダンドリワーク
          </Typography>
        </Box>

        {/* メニュー項目 */}
        <Box sx={{ display: 'flex', gap: 0.5, flexGrow: 1 }}>
          {/* 工事メニュー */}
          <Button
            onClick={handleConstructionClick}
            sx={{
              color: '#FFFFFF',
              fontSize: '0.875rem',
              fontWeight: 400,
              px: 2,
              py: 0.5,
              minWidth: 'auto',
              textTransform: 'none',
              borderRadius: 0,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              ...(Boolean(constructionAnchorEl) && {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderBottom: '2px solid #FFFFFF',
              }),
            }}
          >
            工事
          </Button>
          <Menu
            anchorEl={constructionAnchorEl}
            open={Boolean(constructionAnchorEl)}
            onClose={handleConstructionClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
              sx: {
                backgroundColor: '#A4D8E6',
                minWidth: 180,
                mt: 0.5,
              },
            }}
          >
            {constructionMenuItems.map((item) => (
              <MenuItem
                key={item.path}
                onClick={() => handleConstructionMenuClick(item.path)}
                sx={{
                  color: '#1C2026',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  py: 1.5,
                  px: 2,
                  borderBottom: '1px solid #FFFFFF',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>

          {/* 見積メニュー */}
          <Button
            onClick={handleQuotationClick}
            sx={{
              color: '#FFFFFF',
              fontSize: '0.875rem',
              fontWeight: 400,
              px: 2,
              py: 0.5,
              minWidth: 'auto',
              textTransform: 'none',
              borderRadius: 0,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              ...(Boolean(quotationAnchorEl) && {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderBottom: '2px solid #FFFFFF',
              }),
            }}
          >
            見積
          </Button>
          <Menu
            anchorEl={quotationAnchorEl}
            open={Boolean(quotationAnchorEl)}
            onClose={handleQuotationClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
              sx: {
                backgroundColor: '#A4D8E6',
                minWidth: 180,
                mt: 0.5,
              },
            }}
          >
            {quotationMenuItems.map((item) => (
              <MenuItem
                key={item.path}
                onClick={() => handleQuotationMenuClick(item.path)}
                sx={{
                  color: '#1C2026',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  py: 1.5,
                  px: 2,
                  borderBottom: '1px solid #FFFFFF',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>

          {/* 実行予算メニュー */}
          <Button
            onClick={handleBudgetClick}
            sx={{
              color: '#FFFFFF',
              fontSize: '0.875rem',
              fontWeight: 400,
              px: 2,
              py: 0.5,
              minWidth: 'auto',
              textTransform: 'none',
              borderRadius: 0,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              ...(Boolean(budgetAnchorEl) && {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderBottom: '2px solid #FFFFFF',
              }),
            }}
          >
            実行予算
          </Button>
          <Menu
            anchorEl={budgetAnchorEl}
            open={Boolean(budgetAnchorEl)}
            onClose={handleBudgetClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
              sx: {
                backgroundColor: '#A4D8E6',
                minWidth: 180,
                mt: 0.5,
              },
            }}
          >
            {budgetMenuItems.map((item) => (
              <MenuItem
                key={item.path}
                onClick={() => handleBudgetMenuClick(item.path)}
                sx={{
                  color: '#1C2026',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  py: 1.5,
                  px: 2,
                  borderBottom: '1px solid #FFFFFF',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>

          {/* 購買発注メニュー */}
          <Button
            onClick={handleProcurementClick}
            sx={{
              color: '#FFFFFF',
              fontSize: '0.875rem',
              fontWeight: 400,
              px: 2,
              py: 0.5,
              minWidth: 'auto',
              textTransform: 'none',
              borderRadius: 0,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              ...(Boolean(procurementAnchorEl) && {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderBottom: '2px solid #FFFFFF',
              }),
            }}
          >
            購買発注
          </Button>
          <Menu
            anchorEl={procurementAnchorEl}
            open={Boolean(procurementAnchorEl)}
            onClose={handleProcurementClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
              sx: {
                backgroundColor: '#A4D8E6',
                minWidth: 240,
                maxHeight: 500,
                overflowY: 'auto',
                mt: 0.5,
              },
            }}
          >
            {procurementMenuItems.map((item) => (
              <MenuItem
                key={item.path}
                onClick={() => handleProcurementMenuClick(item.path)}
                sx={{
                  color: '#1C2026',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  py: 1.5,
                  px: 2,
                  borderBottom: '1px solid #FFFFFF',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>

          {/* 出来高管理メニュー */}
          <Button
            onClick={handleProgressClick}
            sx={{
              color: '#FFFFFF',
              fontSize: '0.875rem',
              fontWeight: 400,
              px: 2,
              py: 0.5,
              minWidth: 'auto',
              textTransform: 'none',
              borderRadius: 0,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              ...(Boolean(progressAnchorEl) && {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderBottom: '2px solid #FFFFFF',
              }),
            }}
          >
            出来高管理
          </Button>
          <Menu
            anchorEl={progressAnchorEl}
            open={Boolean(progressAnchorEl)}
            onClose={handleProgressClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
              sx: {
                backgroundColor: '#A4D8E6',
                minWidth: 240,
                mt: 0.5,
              },
            }}
          >
            {progressMenuItems.map((item) => (
              <MenuItem
                key={item.path}
                onClick={() => handleProgressMenuClick(item.path)}
                sx={{
                  color: '#1C2026',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  py: 1.5,
                  px: 2,
                  borderBottom: '1px solid #FFFFFF',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>

          {/* 支払管理メニュー */}
          <Button
            onClick={handlePaymentClick}
            sx={{
              color: '#FFFFFF',
              fontSize: '0.875rem',
              fontWeight: 400,
              px: 2,
              py: 0.5,
              minWidth: 'auto',
              textTransform: 'none',
              borderRadius: 0,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              ...(Boolean(paymentAnchorEl) && {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderBottom: '2px solid #FFFFFF',
              }),
            }}
          >
            支払管理
          </Button>
          <Menu
            anchorEl={paymentAnchorEl}
            open={Boolean(paymentAnchorEl)}
            onClose={handlePaymentClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
              sx: {
                backgroundColor: '#A4D8E6',
                minWidth: 240,
                mt: 0.5,
              },
            }}
          >
            {paymentMenuItems.map((item) => (
              <MenuItem
                key={item.path}
                onClick={() => handlePaymentMenuClick(item.path)}
                sx={{
                  color: '#1C2026',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  py: 1.5,
                  px: 2,
                  borderBottom: '1px solid #FFFFFF',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>

          {/* 実行予算管理メニュー */}
          <Button
            onClick={handleBudgetManagementClick}
            sx={{
              color: '#FFFFFF',
              fontSize: '0.875rem',
              fontWeight: 400,
              px: 2,
              py: 0.5,
              minWidth: 'auto',
              textTransform: 'none',
              borderRadius: 0,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              ...(Boolean(budgetManagementAnchorEl) && {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderBottom: '2px solid #FFFFFF',
              }),
            }}
          >
            実行予算管理
          </Button>
          <Menu
            anchorEl={budgetManagementAnchorEl}
            open={Boolean(budgetManagementAnchorEl)}
            onClose={handleBudgetManagementClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
              sx: {
                backgroundColor: '#A4D8E6',
                minWidth: 240,
                mt: 0.5,
              },
            }}
          >
            {budgetManagementMenuItems.map((item) => (
              <MenuItem
                key={item.path}
                onClick={() => handleBudgetManagementMenuClick(item.path)}
                sx={{
                  color: '#1C2026',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  py: 1.5,
                  px: 2,
                  borderBottom: '1px solid #FFFFFF',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>

          {menuItems.map((item) => (
            <Button
              key={item.path}
              onClick={() => setSelectedMenu(item.path)}
              sx={{
                color: '#FFFFFF',
                fontSize: '0.875rem',
                fontWeight: 400,
                px: 2,
                py: 0.5,
                minWidth: 'auto',
                textTransform: 'none',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                ...(selectedMenu === item.path && {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  borderBottom: '2px solid #FFFFFF',
                }),
              }}
            >
              {item.label}
            </Button>
          ))}

          {/* その他・設定メニュー */}
          <Button
            onClick={handleSettingsClick}
            sx={{
              color: '#FFFFFF',
              fontSize: '0.875rem',
              fontWeight: 400,
              px: 2,
              py: 0.5,
              minWidth: 'auto',
              textTransform: 'none',
              borderRadius: 0,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              ...(Boolean(settingsAnchorEl) && {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderBottom: '2px solid #FFFFFF',
              }),
            }}
          >
            その他・設定
          </Button>
          <Menu
            anchorEl={settingsAnchorEl}
            open={Boolean(settingsAnchorEl)}
            onClose={handleSettingsClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
              sx: {
                backgroundColor: '#A4D8E6',
                minWidth: 240,
                maxHeight: 500,
                overflowY: 'auto',
                mt: 0.5,
              },
            }}
          >
            {settingsMenuItems.map((item) => (
              <MenuItem
                key={item.path}
                onClick={() => handleSettingsMenuClick(item.path)}
                sx={{
                  color: '#1C2026',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  py: 1.5,
                  px: 2,
                  borderBottom: '1px solid #FFFFFF',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* ユーザー情報 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
          onClick={handleUserMenuClick}
        >
          <AccountCircle sx={{ color: '#FFFFFF', fontSize: 24 }} />
          <Typography
            variant="body2"
            sx={{
              color: '#FFFFFF',
              fontSize: '0.875rem',
            }}
          >
            テスト 太郎
          </Typography>
        </Box>
        <Menu
          anchorEl={userMenuAnchorEl}
          open={Boolean(userMenuAnchorEl)}
          onClose={handleUserMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              backgroundColor: '#A4D8E6',
              minWidth: 200,
              mt: 0.5,
            },
          }}
        >
          {userMenuItems.map((item) => (
            <MenuItem
              key={item.path}
              onClick={() => handleUserMenuItemClick(item.path)}
              sx={{
                color: '#1C2026',
                fontSize: '0.875rem',
                fontWeight: 400,
                py: 1.5,
                px: 2,
                borderBottom: '1px solid #FFFFFF',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:last-child': {
                  borderBottom: 'none',
                },
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
