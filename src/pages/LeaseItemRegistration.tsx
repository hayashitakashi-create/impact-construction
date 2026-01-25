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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  DragIndicator as DragIndicatorIcon,
} from '@mui/icons-material';
import Sidebar from '../components/Layout/Sidebar';

type PageType = 'dashboard' | 'construction-list' | 'estimate-list' | 'construction-registration' | 'construction-detail' | 'construction-category' | 'construction-type' | 'building-usage' | 'client' | 'user' | 'company' | 'subcontractor-bulk' | 'subcontractor' | 'work-type' | 'material' | 'lease-item' | 'common-temporary' | 'site-expense' | 'screen-permission' | 'screen-permission-template' | 'workflow-template' | 'accounting-integration';

interface LeaseItemRegistrationProps {
  onNavigate?: (page: PageType) => void;
}

interface LeaseItem {
  id: number;
  入力形式: '月単価-枚-月' | '商品単価-枚' | '一式金額';
  リース材名称: string;
  規格: string;
  商品単価: number | null;
  月単価: number | null;
  単位: string;
  備考: string;
}

const LeaseItemRegistration: React.FC<LeaseItemRegistrationProps> = ({ onNavigate }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingLeaseItem, setEditingLeaseItem] = useState<LeaseItem | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [formData, setFormData] = useState({
    入力形式: '' as '' | '月単価-枚-月' | '商品単価-枚' | '一式金額',
    リース品名: '',
    規格: '',
    商品単価: '',
    月単価: '',
    単位: '',
    備考: '',
  });

  // サンプルデータ
  const [leaseItems, setLeaseItems] = useState<LeaseItem[]>([
    { id: 1, 入力形式: '月単価-枚-月', リース材名称: 'カラーコーン', 規格: '', 商品単価: 450, 月単価: 45, 単位: '個', 備考: '' },
    { id: 2, 入力形式: '月単価-枚-月', リース材名称: 'ガラ コーン緑○', 規格: '', 商品単価: 160, 月単価: 26, 単位: '個', 備考: '' },
    { id: 3, 入力形式: '月単価-枚-月', リース材名称: 'コーンバー', 規格: '2.0m', 商品単価: 360, 月単価: 45, 単位: '本', 備考: '' },
  ]);

  const handleOpenDialog = (leaseItem?: LeaseItem) => {
    if (leaseItem) {
      setEditingLeaseItem(leaseItem);
      setFormData({
        入力形式: leaseItem.入力形式,
        リース品名: leaseItem.リース材名称,
        規格: leaseItem.規格,
        商品単価: leaseItem.商品単価?.toString() || '',
        月単価: leaseItem.月単価?.toString() || '',
        単位: leaseItem.単位,
        備考: leaseItem.備考,
      });
    } else {
      setEditingLeaseItem(null);
      setFormData({
        入力形式: '',
        リース品名: '',
        規格: '',
        商品単価: '',
        月単価: '',
        単位: '',
        備考: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingLeaseItem(null);
  };

  const handleSave = () => {
    // TODO: 実際の保存処理を実装
    console.log('保存:', formData);
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('このリース品目を削除しますか？')) {
      setLeaseItems(leaseItems.filter(item => item.id !== id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedItems.length === 0) {
      alert('削除する項目を選択してください');
      return;
    }
    if (window.confirm(`選択した${selectedItems.length}件のリース品目を削除しますか？`)) {
      setLeaseItems(leaseItems.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedItems(filteredLeaseItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSaveOrder = () => {
    // TODO: 並び順の保存処理を実装
    alert('並び順を保存しました');
  };

  const filteredLeaseItems = leaseItems.filter((item) => {
    const matchesKeyword = !searchKeyword || item.リース材名称.includes(searchKeyword);
    return matchesKeyword;
  });

  // 入力形式に応じた必須項目の判定
  const isFieldRequired = (fieldName: string): boolean => {
    if (!formData.入力形式) return false;

    const requiredFields: Record<string, string[]> = {
      '月単価-枚-月': ['リース品名', '商品単価', '月単価', '単位'],
      '商品単価-枚': ['リース品名', '商品単価', '単位'],
      '一式金額': ['リース品名'],
    };

    return requiredFields[formData.入力形式]?.includes(fieldName) || false;
  };

  const isFormValid = (): boolean => {
    if (!formData.入力形式 || !formData.リース品名) return false;

    if (formData.入力形式 === '月単価-枚-月') {
      return !!(formData.商品単価 && formData.月単価 && formData.単位);
    } else if (formData.入力形式 === '商品単価-枚') {
      return !!(formData.商品単価 && formData.単位);
    } else if (formData.入力形式 === '一式金額') {
      return true; // リース品名のみ必須
    }

    return false;
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #F8F9FA 0%, #E8EAF6 50%, #F3E5F5 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <Sidebar currentPage="lease-item" onNavigate={onNavigate} />

      <Box sx={{ flex: 1, p: 3 }}>
        {/* ページタイトルと新規登録ボタン */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: '#007AFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <SettingsIcon sx={{ color: '#FFFFFF', fontSize: 28 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#1D1D1F' }}>
              社内リース品目登録
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              bgcolor: '#007AFF',
              color: '#FFFFFF',
              '&:hover': { bgcolor: '#0051D5' },
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '0.875rem',
            }}
          >
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
            <Box sx={{ p: 2, bgcolor: '#FAFAFA', borderRadius: 1, mt: 1 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'flex-end' }}>
                <TextField
                  label="リース品名"
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
                    color: '#FFFFFF',
                    '&:hover': { bgcolor: '#0051D5' },
                    borderRadius: '8px',
                    textTransform: 'none',
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

        {/* 一括操作ボタン */}
        <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleBulkDelete}
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
          >
            一括削除
          </Button>
          <Button
            variant="outlined"
            onClick={handleSaveOrder}
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
          >
            並び順保存
          </Button>
        </Box>

        {/* テーブル */}
        <Paper
          sx={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: 'none',
            overflow: 'hidden',
          }}
        >
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#E3F2FD' }}>
                <TableCell padding="checkbox" sx={{ width: 50 }}>
                  <Checkbox
                    checked={selectedItems.length === filteredLeaseItems.length && filteredLeaseItems.length > 0}
                    indeterminate={selectedItems.length > 0 && selectedItems.length < filteredLeaseItems.length}
                    onChange={handleSelectAll}
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: 60, fontSize: '0.75rem' }}>並替</TableCell>
                <TableCell sx={{ fontWeight: 600, width: 60, fontSize: '0.75rem' }}>削除</TableCell>
                <TableCell sx={{ fontWeight: 600, width: 120, fontSize: '0.75rem' }}>入力形式</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem' }}>リース材名称</TableCell>
                <TableCell sx={{ fontWeight: 600, width: 100, fontSize: '0.75rem' }}>規格</TableCell>
                <TableCell sx={{ fontWeight: 600, width: 100, fontSize: '0.75rem' }}>商品単価</TableCell>
                <TableCell sx={{ fontWeight: 600, width: 100, fontSize: '0.75rem' }}>月単価</TableCell>
                <TableCell sx={{ fontWeight: 600, width: 80, fontSize: '0.75rem' }}>単位</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem' }}>備考</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLeaseItems.map((item) => (
                <TableRow key={item.id} sx={{ '&:hover': { bgcolor: '#F9F9F9' } }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      sx={{ color: '#999999', cursor: 'grab' }}
                    >
                      <DragIndicatorIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(item.id)}
                      sx={{ color: '#007AFF' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{item.入力形式}</TableCell>
                  <TableCell
                    sx={{
                      fontSize: '0.875rem',
                      color: '#007AFF',
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                    onClick={() => handleOpenDialog(item)}
                  >
                    {item.リース材名称}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{item.規格}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem', textAlign: 'right' }}>
                    {item.商品単価 !== null ? item.商品単価.toLocaleString() : '-'}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.875rem', textAlign: 'right' }}>
                    {item.月単価 !== null ? item.月単価.toLocaleString() : '-'}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{item.単位}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{item.備考}</TableCell>
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
              {editingLeaseItem ? '編集' : '新規登録'}
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
            {/* 入力形式 */}
            <Box>
              <FormControl fullWidth size="small" disabled={editingLeaseItem !== null}>
                <InputLabel>入力形式</InputLabel>
                <Select
                  value={formData.入力形式}
                  onChange={(e) => setFormData({ ...formData, 入力形式: e.target.value as any })}
                  label="入力形式"
                >
                  <MenuItem value="月単価-枚-月">月単価-枚-月</MenuItem>
                  <MenuItem value="商品単価-枚">商品単価-枚</MenuItem>
                  <MenuItem value="一式金額">一式金額</MenuItem>
                </Select>
              </FormControl>
              {!formData.入力形式 && (
                <Typography variant="caption" sx={{ color: '#D32F2F', mt: 0.5, display: 'block' }}>
                  必須です
                </Typography>
              )}
              {editingLeaseItem && (
                <Typography variant="caption" sx={{ color: '#999999', mt: 0.5, display: 'block' }}>
                  ※選択後の変更はできません
                </Typography>
              )}
            </Box>

            {/* リース品名 */}
            <Box>
              <TextField
                label="リース品名"
                value={formData.リース品名}
                onChange={(e) => setFormData({ ...formData, リース品名: e.target.value })}
                fullWidth
                size="small"
              />
              {isFieldRequired('リース品名') && !formData.リース品名 && (
                <Typography variant="caption" sx={{ color: '#D32F2F', mt: 0.5, display: 'block' }}>
                  必須です
                </Typography>
              )}
            </Box>

            {/* 規格 */}
            <Box>
              <TextField
                label="規格"
                value={formData.規格}
                onChange={(e) => setFormData({ ...formData, 規格: e.target.value })}
                fullWidth
                size="small"
              />
              {isFieldRequired('規格') && !formData.規格 && (
                <Typography variant="caption" sx={{ color: '#D32F2F', mt: 0.5, display: 'block' }}>
                  必須です
                </Typography>
              )}
            </Box>

            {/* 商品単価 */}
            <Box>
              <TextField
                label="商品単価"
                value={formData.商品単価}
                onChange={(e) => setFormData({ ...formData, 商品単価: e.target.value })}
                fullWidth
                size="small"
                type="number"
                disabled={formData.入力形式 === '一式金額'}
              />
              {isFieldRequired('商品単価') && !formData.商品単価 && (
                <Typography variant="caption" sx={{ color: '#D32F2F', mt: 0.5, display: 'block' }}>
                  必須です
                </Typography>
              )}
            </Box>

            {/* 月単価 */}
            <Box>
              <TextField
                label="月単価"
                value={formData.月単価}
                onChange={(e) => setFormData({ ...formData, 月単価: e.target.value })}
                fullWidth
                size="small"
                type="number"
                disabled={formData.入力形式 === '商品単価-枚' || formData.入力形式 === '一式金額'}
              />
              {isFieldRequired('月単価') && !formData.月単価 && (
                <Typography variant="caption" sx={{ color: '#D32F2F', mt: 0.5, display: 'block' }}>
                  必須です
                </Typography>
              )}
            </Box>

            {/* 単位 */}
            <Box>
              <TextField
                label="単位"
                value={formData.単位}
                onChange={(e) => setFormData({ ...formData, 単位: e.target.value })}
                fullWidth
                size="small"
                disabled={formData.入力形式 === '一式金額'}
              />
              {isFieldRequired('単位') && !formData.単位 && (
                <Typography variant="caption" sx={{ color: '#D32F2F', mt: 0.5, display: 'block' }}>
                  必須です
                </Typography>
              )}
            </Box>

              {/* 備考 */}
              <Box>
                <TextField
                  label="備考"
                  value={formData.備考}
                  onChange={(e) => setFormData({ ...formData, 備考: e.target.value })}
                  fullWidth
                  size="small"
                  multiline
                  rows={3}
                />
                {isFieldRequired('備考') && !formData.備考 && (
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
                color: '#FFFFFF',
                '&:hover': { bgcolor: '#0051D5' },
                borderRadius: '8px',
                textTransform: 'none',
              }}
            >
              キャンセル
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              disabled={!isFormValid()}
              sx={{
                bgcolor: '#007AFF',
                color: '#FFFFFF',
                '&:hover': { bgcolor: '#0051D5' },
                '&:disabled': {
                  bgcolor: '#E0E0E0',
                  color: '#999999',
                },
                borderRadius: '8px',
                textTransform: 'none',
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

export default LeaseItemRegistration;
