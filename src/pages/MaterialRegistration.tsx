import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Collapse,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import Sidebar from '../components/Layout/Sidebar';

type PageType = 'dashboard' | 'construction-list' | 'estimate-list' | 'construction-registration' | 'construction-detail' | 'construction-category' | 'construction-type' | 'building-usage' | 'client' | 'user' | 'company' | 'subcontractor-bulk' | 'subcontractor' | 'work-type' | 'material' | 'lease-item' | 'common-temporary' | 'site-expense' | 'screen-permission' | 'screen-permission-template' | 'workflow-template' | 'accounting-integration';

interface MaterialRegistrationProps {
  onNavigate?: (page: PageType) => void;
}

interface Material {
  id: number;
  規格番号: number;
  資材名: string;
}

const MaterialRegistration: React.FC<MaterialRegistrationProps> = ({ onNavigate }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const [formData, setFormData] = useState({
    科目番号: '',
    資材名: '',
  });

  // サンプルデータ
  const [materials, setMaterials] = useState<Material[]>([
    { id: 1, 規格番号: 1, 資材名: '生コン' },
    { id: 2, 規格番号: 2, 資材名: 'C20の場合' },
    { id: 3, 規格番号: 3, 資材名: '鋼材' },
  ]);

  const handleOpenDialog = (material?: Material) => {
    if (material) {
      setEditingMaterial(material);
      setFormData({
        科目番号: String(material.規格番号),
        資材名: material.資材名,
      });
    } else {
      setEditingMaterial(null);
      setFormData({
        科目番号: '',
        資材名: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingMaterial(null);
  };

  const handleSave = () => {
    // TODO: 実際の保存処理を実装
    console.log('保存:', formData);
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('この資材を削除しますか？')) {
      setMaterials(materials.filter(m => m.id !== id));
    }
  };

  const filteredMaterials = materials.filter((material) => {
    const matchesKeyword = !searchKeyword || material.資材名.includes(searchKeyword);
    return matchesKeyword;
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "linear-gradient(to bottom right, #F8F9FA 0%, #E8EAF6 50%, #F3E5F5 100%)", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <Sidebar currentPage="material" onNavigate={onNavigate} />
      <Box sx={{ flex: 1, p: 3 }}>
        {/* ページタイトルと新規登録ボタン */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ bgcolor: '#007AFF', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2 }}>
              <SettingsIcon sx={{ color: '#FFFFFF', fontSize: 28 }} />
            </Box>
            <Typography variant="h5" sx={{ color: '#1D1D1F', fontWeight: 600 }}>
              資材登録
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()} sx={{ bgcolor: '#007AFF', color: '#FFFFFF', '&:hover': { bgcolor: '#0051D5' }, borderRadius: '8px' }}>
            + 新規登録
          </Button>
        </Box>

      {/* 検索条件 */}
      <Box sx={{ mb: 2 }}>
        <Box
          onClick={() => setSearchOpen(!searchOpen)}
          sx={{
            bgcolor: '#F0F0F0',
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: 1,
            '&:hover': {
              bgcolor: '#E8E8E8',
            },
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#333333' }}>
            検索条件
          </Typography>
          <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
            {searchOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            <Typography variant="body2" sx={{ color: '#007AFF', ml: 0.5 }}>
              （{searchOpen ? '閉じる' : '開く'}）
            </Typography>
          </Box>
        </Box>
        <Collapse in={searchOpen}>
          <Box sx={{ p: 2, background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(0, 0, 0, 0.08)', boxShadow: 'none', mt: 1 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'flex-end' }}>
              <TextField
                label="資材名"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                size="small"
                sx={{ flex: 1 }}
              />
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                sx={{
                  bgcolor: '#007AFF',
                  '&:hover': {
                    bgcolor: '#0051D5',
                  },
                  textTransform: 'none',
                  borderRadius: '8px',
                }}
              >
                検　索
              </Button>
              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                sx={{
                  textTransform: 'none',
                  borderColor: '#007AFF',
                  color: '#007AFF',
                  '&:hover': {
                    borderColor: '#0051D5',
                    bgcolor: 'rgba(0, 122, 255, 0.1)',
                  },
                  borderRadius: '8px',
                }}
                onClick={() => {
                  setSearchKeyword('');
                }}
              >
                クリア
              </Button>
            </Box>
          </Box>
        </Collapse>
      </Box>

        {/* テーブル */}
        <Paper sx={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(0, 0, 0, 0.08)', boxShadow: 'none', overflow: 'hidden' }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#E3F2FD' }}>
                <TableCell sx={{ fontWeight: 600, width: 60, fontSize: '0.75rem' }}>修正</TableCell>
                <TableCell sx={{ fontWeight: 600, width: 60, fontSize: '0.75rem' }}>削除</TableCell>
                <TableCell sx={{ fontWeight: 600, width: 100, fontSize: '0.75rem' }}>規格番号</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem' }}>資材名</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMaterials.map((material) => (
                <TableRow key={material.id} sx={{ '&:hover': { bgcolor: '#F9F9F9' } }}>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(material)}
                      sx={{ color: '#007AFF' }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(material.id)}
                      sx={{ color: '#007AFF' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{material.規格番号}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{material.資材名}</TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* 新規登録/編集ダイアログ */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {editingMaterial ? '編集' : '新規登録'}
            </Typography>
            <IconButton onClick={handleCloseDialog} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Typography variant="body2" sx={{ mb: 3, color: '#666666' }}>
              項目を入力し、よろしければ『登録』を押してください。
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* 科目番号 */}
              <Box>
                <TextField
                  label="科目番号"
                  value={formData.科目番号}
                  onChange={(e) => setFormData({ ...formData, 科目番号: e.target.value })}
                  fullWidth
                  size="small"
                />
                {!formData.科目番号 && (
                  <Typography variant="caption" sx={{ color: '#D32F2F', mt: 0.5, display: 'block' }}>
                    必須です
                  </Typography>
                )}
              </Box>

              {/* 資材名 */}
              <Box>
                <TextField
                  label="資材名"
                  value={formData.資材名}
                  onChange={(e) => setFormData({ ...formData, 資材名: e.target.value })}
                  fullWidth
                  size="small"
                />
                {!formData.資材名 && (
                  <Typography variant="caption" sx={{ color: '#D32F2F', mt: 0.5, display: 'block' }}>
                    必須です
                  </Typography>
                )}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={handleCloseDialog}
              variant="contained"
              sx={{
                bgcolor: '#007AFF',
                '&:hover': {
                  bgcolor: '#0051D5',
                },
                textTransform: 'none',
                borderRadius: '8px',
              }}
            >
              キャンセル
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{
                bgcolor: '#007AFF',
                color: '#FFFFFF',
                '&:hover': {
                  bgcolor: '#0051D5',
                },
                textTransform: 'none',
                borderRadius: '8px',
              }}
            >
              登録
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default MaterialRegistration;
