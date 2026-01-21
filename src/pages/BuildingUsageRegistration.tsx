import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormHelperText,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useRegistration, BuildingUsage } from '../contexts/RegistrationContext';

const BuildingUsageRegistration: React.FC = () => {
  const { buildingUsages, setBuildingUsages } = useRegistration();

  const [openDialog, setOpenDialog] = useState(false);
  const [newUsage, setNewUsage] = useState({
    name: '',
  });
  const [errors, setErrors] = useState({
    name: false,
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setNewUsage({ name: '' });
    setErrors({ name: false });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddUsage = () => {
    // バリデーション
    const newErrors = {
      name: newUsage.name === '',
    };
    setErrors(newErrors);

    if (newErrors.name) {
      return;
    }

    // 新規追加
    const newId = Math.max(...buildingUsages.map(u => u.id), 0) + 1;
    setBuildingUsages([...buildingUsages, { id: newId, ...newUsage }]);
    handleCloseDialog();
  };

  const handleDeleteUsage = (id: number) => {
    setBuildingUsages(buildingUsages.filter(u => u.id !== id));
  };

  const handleUsageChange = (id: number, field: keyof BuildingUsage, value: any) => {
    setBuildingUsages(buildingUsages.map(u =>
      u.id === id ? { ...u, [field]: value } : u
    ));
  };

  return (
    <Box sx={{ bgcolor: '#F6F6F6', minHeight: 'calc(100vh - 56px)', py: 3 }}>
      <Container maxWidth="lg">
        {/* ヘッダー */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                bgcolor: '#0078C8',
                borderRadius: '50%',
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <SettingsIcon sx={{ color: '#FFFFFF', fontSize: 28 }} />
            </Box>
            <Typography variant="h4" sx={{ color: '#1C2026', fontWeight: 600 }}>
              建物用途登録
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            sx={{
              bgcolor: '#42A5F5',
              color: '#FFFFFF',
              '&:hover': { bgcolor: '#1E88E5' },
            }}
          >
            新規登録
          </Button>
        </Box>

        {/* テーブル */}
        <TableContainer sx={{ bgcolor: '#FFFFFF' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#B0BEC5' }}>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, width: 80 }}>削除</TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600 }}>建物用途名</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buildingUsages.map((usage) => (
                <TableRow key={usage.id}>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDeleteUsage(usage.id)}
                      sx={{ color: '#42A5F5' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      value={usage.name}
                      onChange={(e) => handleUsageChange(usage.id, 'name', e.target.value)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 新規登録ダイアログ */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>新規登録</Typography>
            <IconButton onClick={handleCloseDialog} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 3, color: '#666666' }}>
              項目を入力し、よろしければ「登録」を押してください。
            </Typography>

            <Box>
              <TextField
                fullWidth
                label="建物用途名"
                value={newUsage.name}
                onChange={(e) => setNewUsage({ ...newUsage, name: e.target.value })}
                error={errors.name}
              />
              <FormHelperText sx={{ color: '#DC1D1D' }}>必須です</FormHelperText>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={handleCloseDialog}
              sx={{
                bgcolor: '#42A5F5',
                color: '#FFFFFF',
                '&:hover': { bgcolor: '#1E88E5' },
              }}
            >
              キャンセル
            </Button>
            <Button
              onClick={handleAddUsage}
              variant="contained"
              sx={{
                bgcolor: '#42A5F5',
                color: '#FFFFFF',
                '&:hover': { bgcolor: '#1E88E5' },
              }}
            >
              登録
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default BuildingUsageRegistration;
