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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
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
  Save as SaveIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useRegistration, ConstructionCategory } from '../contexts/RegistrationContext';

const ConstructionCategoryRegistration: React.FC = () => {
  const { categories, setCategories } = useRegistration();

  const [openDialog, setOpenDialog] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    type: '',
    isDefault: false,
  });
  const [errors, setErrors] = useState({
    name: false,
    type: false,
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setNewCategory({ name: '', type: '', isDefault: false });
    setErrors({ name: false, type: false });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddCategory = () => {
    // バリデーション
    const newErrors = {
      name: newCategory.name === '',
      type: newCategory.type === '',
    };
    setErrors(newErrors);

    if (newErrors.name || newErrors.type) {
      return;
    }

    // 新規追加
    const newId = Math.max(...categories.map(c => c.id), 0) + 1;
    setCategories([...categories, { id: newId, ...newCategory }]);
    handleCloseDialog();
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const handleCategoryChange = (id: number, field: keyof ConstructionCategory, value: any) => {
    setCategories(categories.map(c =>
      c.id === id ? { ...c, [field]: value } : c
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
              工事分類登録
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
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
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{
                bgcolor: '#42A5F5',
                color: '#FFFFFF',
                '&:hover': { bgcolor: '#1E88E5' },
              }}
            >
              保存
            </Button>
          </Box>
        </Box>

        {/* テーブル */}
        <TableContainer sx={{ bgcolor: '#FFFFFF' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#B0BEC5' }}>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, width: 80 }}>削除</TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600 }}>工事分類名</TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600 }}>工事分類種別</TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, width: 150 }}>初期検索対象</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDeleteCategory(category.id)}
                      sx={{ color: '#42A5F5' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      value={category.name}
                      onChange={(e) => handleCategoryChange(category.id, 'name', e.target.value)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth size="small">
                      <Select
                        value={category.type}
                        onChange={(e) => handleCategoryChange(category.id, 'type', e.target.value)}
                      >
                        <MenuItem value="大工事">大工事</MenuItem>
                        <MenuItem value="小工事">小工事</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Checkbox
                      checked={category.isDefault}
                      onChange={(e) => handleCategoryChange(category.id, 'isDefault', e.target.checked)}
                      sx={{
                        color: '#DC1D1D',
                        '&.Mui-checked': { color: '#DC1D1D' },
                      }}
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

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <FormControl fullWidth error={errors.name}>
                <TextField
                  label="工事分類名"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  error={errors.name}
                />
                {errors.name && <FormHelperText sx={{ color: '#DC1D1D' }}>必須です</FormHelperText>}
              </FormControl>

              <FormControl fullWidth error={errors.type}>
                <InputLabel>工事分類種別</InputLabel>
                <Select
                  value={newCategory.type}
                  label="工事分類種別"
                  onChange={(e) => setNewCategory({ ...newCategory, type: e.target.value })}
                  error={errors.type}
                >
                  <MenuItem value="">選択してください</MenuItem>
                  <MenuItem value="大工事">大工事</MenuItem>
                  <MenuItem value="小工事">小工事</MenuItem>
                </Select>
                {errors.type && <FormHelperText sx={{ color: '#DC1D1D' }}>必須です</FormHelperText>}
              </FormControl>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ mr: 2 }}>初期検索対象</Typography>
                <Checkbox
                  checked={newCategory.isDefault}
                  onChange={(e) => setNewCategory({ ...newCategory, isDefault: e.target.checked })}
                  sx={{
                    color: '#666666',
                    '&.Mui-checked': { color: '#DC1D1D' },
                  }}
                />
              </Box>
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
              onClick={handleAddCategory}
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

export default ConstructionCategoryRegistration;
