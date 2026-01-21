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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

interface WorkType {
  id: number;
  料目番号: number;
  工種名: string;
  工種グループ: string;
  客出工種名: string;
}

const WorkTypeRegistration: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingWorkType, setEditingWorkType] = useState<WorkType | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchGroup, setSearchGroup] = useState('');

  const [formData, setFormData] = useState({
    科目番号: '',
    工種グループ: '',
    工種名: '',
    客出工種名: '',
  });

  const workTypeGroups = ['躯体工事', '仕上げ工事', '設備工事', 'その他工事'];

  // サンプルデータ
  const [workTypes, setWorkTypes] = useState<WorkType[]>([
    { id: 1, 料目番号: 1, 工種名: '直接仮設工事', 工種グループ: '躯体工事', 客出工種名: '直接仮設工事' },
    { id: 2, 料目番号: 2, 工種名: '土工事', 工種グループ: '躯体工事', 客出工種名: '土工事' },
    { id: 3, 料目番号: 3, 工種名: '杭工事', 工種グループ: '躯体工事', 客出工種名: '杭工事' },
    { id: 4, 料目番号: 4, 工種名: '鉄筋工事', 工種グループ: '躯体工事', 客出工種名: '鉄筋工事' },
    { id: 5, 料目番号: 5, 工種名: '型枠工事', 工種グループ: '躯体工事', 客出工種名: '型枠工事' },
    { id: 6, 料目番号: 6, 工種名: 'コンクリート工事', 工種グループ: '躯体工事', 客出工種名: 'コンクリート工事' },
    { id: 7, 料目番号: 7, 工種名: '鉄骨工事', 工種グループ: '躯体工事', 客出工種名: '鉄骨工事' },
    { id: 8, 料目番号: 8, 工種名: '組積工事', 工種グループ: '仕上げ工事', 客出工種名: '組積工事' },
    { id: 9, 料目番号: 9, 工種名: '防水工事', 工種グループ: '仕上げ工事', 客出工種名: '防水工事' },
    { id: 10, 料目番号: 10, 工種名: '石工事', 工種グループ: '仕上げ工事', 客出工種名: '石工事' },
    { id: 11, 料目番号: 11, 工種名: 'タイル工事', 工種グループ: '仕上げ工事', 客出工種名: 'タイル工事' },
    { id: 12, 料目番号: 12, 工種名: '木工事', 工種グループ: '仕上げ工事', 客出工種名: '木工事' },
    { id: 13, 料目番号: 13, 工種名: '屋根板金工事', 工種グループ: '仕上げ工事', 客出工種名: '屋根板金工事' },
    { id: 14, 料目番号: 14, 工種名: '金属工事', 工種グループ: '仕上げ工事', 客出工種名: '金属工事' },
    { id: 15, 料目番号: 15, 工種名: '左官工事', 工種グループ: '仕上げ工事', 客出工種名: '左官工事' },
    { id: 16, 料目番号: 16, 工種名: '金属製建具工事', 工種グループ: '仕上げ工事', 客出工種名: '金属製建具工事' },
    { id: 17, 料目番号: 17, 工種名: '木製建具工事', 工種グループ: '仕上げ工事', 客出工種名: '木製建具工事' },
    { id: 18, 料目番号: 18, 工種名: '硝子工事', 工種グループ: '仕上げ工事', 客出工種名: '硝子工事' },
    { id: 19, 料目番号: 19, 工種名: '塗装工事', 工種グループ: '仕上げ工事', 客出工種名: '塗装工事' },
    { id: 20, 料目番号: 20, 工種名: '内装工事', 工種グループ: '仕上げ工事', 客出工種名: '内装工事' },
    { id: 21, 料目番号: 21, 工種名: '仕上げユニット工事', 工種グループ: '仕上げ工事', 客出工種名: '仕上げユニット工事' },
    { id: 22, 料目番号: 22, 工種名: '雑工事', 工種グループ: '仕上げ工事', 客出工種名: '雑工事' },
    { id: 23, 料目番号: 23, 工種名: '電気設備工事', 工種グループ: '設備工事', 客出工種名: '電気設備工事' },
    { id: 24, 料目番号: 24, 工種名: '給排水衛生設備工事', 工種グループ: '設備工事', 客出工種名: '給排水衛生設備工事' },
    { id: 25, 料目番号: 25, 工種名: '空調換気設備工事', 工種グループ: '設備工事', 客出工種名: '空調換気設備工事' },
    { id: 26, 料目番号: 26, 工種名: '昇降機設備工事', 工種グループ: '設備工事', 客出工種名: '昇降機設備工事' },
    { id: 27, 料目番号: 27, 工種名: 'その他設備工事', 工種グループ: '設備工事', 客出工種名: 'その他設備工事' },
    { id: 28, 料目番号: 28, 工種名: '外構工事', 工種グループ: 'その他工事', 客出工種名: '外構工事' },
    { id: 29, 料目番号: 29, 工種名: '開発工事', 工種グループ: 'その他工事', 客出工種名: '開発工事' },
    { id: 30, 料目番号: 30, 工種名: '解体工事', 工種グループ: 'その他工事', 客出工種名: '解体工事' },
    { id: 31, 料目番号: 31, 工種名: '総合工事', 工種グループ: 'その他工事', 客出工種名: '総合工事' },
    { id: 32, 料目番号: 32, 工種名: 'その他工事', 工種グループ: 'その他工事', 客出工種名: 'その他工事' },
    { id: 33, 料目番号: 33, 工種名: '外注設計費', 工種グループ: 'その他工事', 客出工種名: '外注設計費' },
  ]);

  const handleOpenDialog = (workType?: WorkType) => {
    if (workType) {
      setEditingWorkType(workType);
      setFormData({
        科目番号: String(workType.料目番号),
        工種グループ: workType.工種グループ,
        工種名: workType.工種名,
        客出工種名: workType.客出工種名,
      });
    } else {
      setEditingWorkType(null);
      setFormData({
        科目番号: '',
        工種グループ: '',
        工種名: '',
        客出工種名: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingWorkType(null);
  };

  const handleSave = () => {
    // TODO: 実際の保存処理を実装
    console.log('保存:', formData);
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('この工種を削除しますか？')) {
      setWorkTypes(workTypes.filter(w => w.id !== id));
    }
  };

  const filteredWorkTypes = workTypes.filter((workType) => {
    const matchesKeyword = !searchKeyword || workType.工種名.includes(searchKeyword);
    const matchesGroup = !searchGroup || workType.工種グループ === searchGroup;
    return matchesKeyword && matchesGroup;
  });

  return (
    <Box sx={{ p: 3 }}>
      {/* ページタイトルと新規登録ボタン */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: '#0078C8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            <SettingsIcon sx={{ color: '#FFFFFF', fontSize: 24 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#1C2026' }}>
            工種登録
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            bgcolor: '#5DADE2',
            '&:hover': {
              bgcolor: '#3498DB',
            },
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
            <Typography variant="body2" sx={{ color: '#0078C8', ml: 0.5 }}>
              （{searchOpen ? '閉じる' : '開く'}）
            </Typography>
          </Box>
        </Box>
        <Collapse in={searchOpen}>
          <Box sx={{ p: 2, bgcolor: '#FAFAFA', borderRadius: 1, mt: 1 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'flex-end' }}>
              <TextField
                label="工種名"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                size="small"
                sx={{ flex: 1 }}
              />
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>工種グループ</InputLabel>
                <Select
                  value={searchGroup}
                  label="工種グループ"
                  onChange={(e) => setSearchGroup(e.target.value)}
                >
                  <MenuItem value="">すべて</MenuItem>
                  {workTypeGroups.map((group) => (
                    <MenuItem key={group} value={group}>
                      {group}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                sx={{
                  bgcolor: '#5DADE2',
                  '&:hover': {
                    bgcolor: '#3498DB',
                  },
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
                  borderColor: '#5DADE2',
                  color: '#5DADE2',
                  '&:hover': {
                    borderColor: '#3498DB',
                    bgcolor: 'rgba(93, 173, 226, 0.1)',
                  },
                }}
                onClick={() => {
                  setSearchKeyword('');
                  setSearchGroup('');
                }}
              >
                クリア
              </Button>
            </Box>
          </Box>
        </Collapse>
      </Box>

      {/* テーブル */}
      <Paper sx={{ borderRadius: 1, overflow: 'hidden' }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#E8E8E8' }}>
                <TableCell sx={{ fontWeight: 600, width: 60, fontSize: '0.75rem' }}>修正</TableCell>
                <TableCell sx={{ fontWeight: 600, width: 60, fontSize: '0.75rem' }}>削除</TableCell>
                <TableCell sx={{ fontWeight: 600, width: 100, fontSize: '0.75rem' }}>科目番号</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem' }}>工種グループ</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem' }}>工種名</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem' }}>客出工種名</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredWorkTypes.map((workType) => (
                <TableRow key={workType.id} sx={{ '&:hover': { bgcolor: '#F9F9F9' } }}>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(workType)}
                      sx={{ color: '#0078C8' }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(workType.id)}
                      sx={{ color: '#5DADE2' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{workType.料目番号}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{workType.工種グループ}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{workType.工種名}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{workType.客出工種名}</TableCell>
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
            {editingWorkType ? '編集' : '新規登録'}
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

            {/* 工種グループ */}
            <Box>
              <FormControl size="small" fullWidth>
                <InputLabel>工種グループ</InputLabel>
                <Select
                  value={formData.工種グループ}
                  onChange={(e) => setFormData({ ...formData, 工種グループ: e.target.value })}
                  label="工種グループ"
                >
                  {workTypeGroups.map((group) => (
                    <MenuItem key={group} value={group}>
                      {group}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {!formData.工種グループ && (
                <Typography variant="caption" sx={{ color: '#D32F2F', mt: 0.5, display: 'block' }}>
                  必須です
                </Typography>
              )}
            </Box>

            {/* 工種名 */}
            <Box>
              <TextField
                label="工種名"
                value={formData.工種名}
                onChange={(e) => setFormData({ ...formData, 工種名: e.target.value })}
                fullWidth
                size="small"
              />
              {!formData.工種名 && (
                <Typography variant="caption" sx={{ color: '#D32F2F', mt: 0.5, display: 'block' }}>
                  必須です
                </Typography>
              )}
            </Box>

            {/* 客出工種名 */}
            <Box>
              <TextField
                label="客出工種名"
                value={formData.客出工種名}
                onChange={(e) => setFormData({ ...formData, 客出工種名: e.target.value })}
                fullWidth
                size="small"
              />
              {!formData.客出工種名 && (
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
              bgcolor: '#5DADE2',
              '&:hover': {
                bgcolor: '#3498DB',
              },
              textTransform: 'none',
            }}
          >
            キャンセル
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              bgcolor: '#D3E8F5',
              color: '#666666',
              '&:hover': {
                bgcolor: '#B8D9ED',
              },
              textTransform: 'none',
            }}
          >
            登録
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WorkTypeRegistration;
