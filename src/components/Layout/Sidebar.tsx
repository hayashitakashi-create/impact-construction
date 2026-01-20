import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Construction as ConstructionIcon,
  Description as DescriptionIcon,
  Assessment as AssessmentIcon,
  Schedule as ScheduleIcon,
  Payment as PaymentIcon,
  Approval as ApprovalIcon,
  Settings as SettingsIcon,
  People as PeopleIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

interface MenuItem {
  text: string;
  icon: React.ReactElement;
  path: string;
}

const menuItems: MenuItem[] = [
  { text: 'ダッシュボード', icon: <DashboardIcon />, path: '/' },
  { text: '工事管理', icon: <ConstructionIcon />, path: '/construction' },
  { text: '見積', icon: <DescriptionIcon />, path: '/quotation' },
  { text: '実行予算', icon: <AssessmentIcon />, path: '/budget' },
  { text: '購買発注', icon: <PaymentIcon />, path: '/procurement' },
  { text: '工程管理', icon: <ScheduleIcon />, path: '/schedule' },
  { text: '支払管理', icon: <PaymentIcon />, path: '/payment' },
  { text: '電子決裁', icon: <ApprovalIcon />, path: '/approval' },
];

const settingsItems: MenuItem[] = [
  { text: 'マスタ管理', icon: <SettingsIcon />, path: '/master' },
  { text: 'ユーザー管理', icon: <PeopleIcon />, path: '/users' },
];

const Sidebar: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E4E4E5',
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#E5F0FE',
                  borderRight: '3px solid #0078C8',
                  '& .MuiListItemIcon-root': {
                    color: '#0078C8',
                  },
                  '& .MuiListItemText-primary': {
                    color: '#0078C8',
                    fontWeight: 600,
                  },
                },
                '&:hover': {
                  backgroundColor: '#F6F6F6',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#494D51', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  color: '#1C2026',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <List>
        {settingsItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              sx={{
                '&:hover': {
                  backgroundColor: '#F6F6F6',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#494D51', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  color: '#1C2026',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
