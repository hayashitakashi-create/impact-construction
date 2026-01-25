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
import Sidebar from '../components/Layout/Sidebar';

type PageType = 'dashboard' | 'construction-list' | 'estimate-list' | 'construction-registration' | 'construction-detail' | 'construction-category' | 'construction-type' | 'building-usage' | 'client' | 'user' | 'company' | 'subcontractor-bulk' | 'subcontractor' | 'work-type' | 'material' | 'lease-item' | 'common-temporary' | 'site-expense' | 'screen-permission' | 'screen-permission-template' | 'workflow-template' | 'accounting-integration';

interface ConstructionCategoryRegistrationProps {
  onNavigate?: (page: PageType) => void;
}

const ConstructionCategoryRegistration: React.FC<ConstructionCategoryRegistrationProps> = ({ onNavigate }) => {
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
    <div style={{ display: "flex", minHeight: "100vh", background: "linear-gradient(to bottom right, #F8F9FA 0%, #E8EAF6 50%, #F3E5F5 100%)", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <Sidebar currentPage="construction-category" onNavigate={onNavigate} />
      <Box sx={{ flex: 1, p: 3 }}>
        <Container maxWidth="lg">
          {/* ヘッダー */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  bgcolor: '#007AFF',
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
              <Typography variant="h5" sx={{ color: '#1D1D1F', fontWeight: 600, fontSize: 28 }}>
                工事分類登録
              </Typography>
            </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
              sx={{
                bgcolor: '#007AFF',
                color: '#FFFFFF',
                '&:hover': { bgcolor: '#0051D5' },
                borderRadius: '8px',
              }}
            >
              新規登録
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{
                bgcolor: '#007AFF',
                color: '#FFFFFF',
                '&:hover': { bgcolor: '#0051D5' },
                borderRadius: '8px',
              }}
            >
              保存
            </Button>
          </Box>
        </Box>

        {/* テーブル */}
        <TableContainer sx={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: 'none',
        }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#E3F2FD' }}>
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
                      sx={{ color: '#007AFF' }}
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
                bgcolor: '#007AFF',
                color: '#FFFFFF',
                '&:hover': { bgcolor: '#0051D5' },
                borderRadius: '8px',
              }}
            >
              キャンセル
            </Button>
            <Button
              onClick={handleAddCategory}
              variant="contained"
              sx={{
                bgcolor: '#007AFF',
                color: '#FFFFFF',
                '&:hover': { bgcolor: '#0051D5' },
                borderRadius: '8px',
              }}
            >
              登録
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
    </div>
  );
};

export default ConstructionCategoryRegistration;
