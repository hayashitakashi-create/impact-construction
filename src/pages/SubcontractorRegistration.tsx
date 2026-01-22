import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
  InputAdornment,
  Collapse,
  Pagination,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  GetApp as GetAppIcon,
  Settings as SettingsIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

interface Subcontractor {
  id: number;
  業者コード: string;
  業者名: string;
  ふりがな: string;
  部署名: string;
  郵便番号: string;
  住所: string;
  住所2: string;
  Email: string;
  工種: string[];
  支払先: string;
  FAX: string;
  登録済み: boolean;
}

const SubcontractorRegistration: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [prefectureFilter, setPrefectureFilter] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSubcontractor, setEditingSubcontractor] = useState<Subcontractor | null>(null);
  const [openExistingDialog, setOpenExistingDialog] = useState(false);
  const [existingCode, setExistingCode] = useState('');
  const [searchOpen, setSearchOpen] = useState(true);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // フォームの状態
  const [formData, setFormData] = useState({
    業者名: '',
    業者コード: '',
    ふりがな: '',
    部署名: '',
    郵便番号: '',
    住所: '',
    住所2: '',
    Email: '',
    電話番号: '',
    FAX: '',
    担当部署名: '',
    担当役職名: '',
    担当者: '',
    出来高割合: '90',
    現金支払月: '当月',
    現金支払率: '100',
    支払月数: '4',
    支払率: '0',
    工種: [] as string[],
    評価: 'A',
  });

  // サンプルデータ
  const [subcontractors, setSubcontractors] = useState<Subcontractor[]>([
    {
      id: 1,
      業者コード: '1111111',
      業者名: '◯◯工業㈱',
      ふりがな: '◯◯こうぎょう',
      部署名: '',
      郵便番号: '',
      住所: '静岡県三島市◯◯町1-2-3',
      住所2: '',
      Email: '',
      工種: ['建築', '土木'],
      支払先: '債権',
      FAX: '',
      登録済み: true,
    },
    {
      id: 2,
      業者コード: '2222222',
      業者名: '××産業㈱',
      ふりがな: '××さんぎょう',
      部署名: '',
      郵便番号: '',
      住所: '静岡県三島市△△町2-3-4',
      住所2: '',
      Email: '',
      工種: [],
      支払先: '債権',
      FAX: '',
      登録済み: true,
    },
    {
      id: 3,
      業者コード: '3333333',
      業者名: '㈲◯△工業',
      ふりがな: '◯△こうぎょう',
      部署名: '',
      郵便番号: '',
      住所: '静岡県磐田市◯△町2-3-4',
      住所2: '',
      Email: '',
      工種: [],
      支払先: '債権',
      FAX: '',
      登録済み: true,
    },
  ]);

  const [unregisteredSubcontractors] = useState<Subcontractor[]>([
    {
      id: 100,
      業者コード: '1',
      業者名: '◯◯土建',
      ふりがな: '',
      部署名: '',
      郵便番号: '',
      住所: '',
      住所2: '',
      Email: '',
      工種: ['経常JV①支店', '直接JV'],
      支払先: '債権',
      FAX: '',
      登録済み: false,
    },
  ]);

  const prefectures = [
    '東京都', '神奈川県', '千葉県', '埼玉県', '静岡県', '愛知県', '大阪府', '福岡県',
  ];

  const handleOpenDialog = (subcontractor?: Subcontractor) => {
    if (subcontractor) {
      setEditingSubcontractor(subcontractor);
      setFormData({
        業者名: subcontractor.業者名,
        業者コード: subcontractor.業者コード,
        ふりがな: subcontractor.ふりがな,
        部署名: '',
        郵便番号: '',
        住所: subcontractor.住所,
        住所2: '',
        Email: '',
        電話番号: '',
        FAX: subcontractor.FAX,
        担当部署名: '',
        担当役職名: '',
        担当者: '',
        出来高割合: '90',
        現金支払月: '当月',
        現金支払率: '100',
        支払月数: '4',
        支払率: '0',
        工種: subcontractor.工種,
        評価: 'A',
      });
    } else {
      setEditingSubcontractor(null);
      setFormData({
        業者名: '',
        業者コード: '',
        ふりがな: '',
        部署名: '',
        郵便番号: '',
        住所: '',
        住所2: '',
        Email: '',
        電話番号: '',
        FAX: '',
        担当部署名: '',
        担当役職名: '',
        担当者: '',
        出来高割合: '90',
        現金支払月: '当月',
        現金支払率: '100',
        支払月数: '4',
        支払率: '0',
        工種: [],
        評価: 'A',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSubcontractor(null);
  };

  const handleSave = () => {
    // TODO: 実際の保存処理を実装
    console.log('保存:', formData);
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('この外注業者を削除しますか？')) {
      setSubcontractors(subcontractors.filter(s => s.id !== id));
    }
  };

  const handleRegisterExisting = (unregistered: Subcontractor) => {
    setEditingSubcontractor(unregistered);
    setExistingCode('');
    setOpenExistingDialog(true);
  };

  const handleCheckExistingCode = () => {
    // 既存の業者コードが存在するかチェック
    const existing = subcontractors.find(s => s.業者コード === existingCode);
    if (existing) {
      alert(`この業者コード(${existingCode})は登録されています。`);
      // 上書き登録の処理
    } else {
      alert('この業者コードは未登録です。');
    }
  };

  const handleDownloadCSV = () => {
    // TODO: CSV出力処理を実装
    console.log('CSVダウンロード');
  };

  const filteredSubcontractors = subcontractors.filter(s => {
    const matchesSearch =
      s.業者名.includes(searchKeyword) ||
      s.業者コード.includes(searchKeyword) ||
      s.ふりがな.includes(searchKeyword);
    const matchesPrefecture = !prefectureFilter || s.住所.includes(prefectureFilter);
    return matchesSearch && matchesPrefecture;
  });

  const currentList = tabValue === 0 ? unregisteredSubcontractors : filteredSubcontractors;

  // ページネーション
  const totalPages = Math.ceil(currentList.length / rowsPerPage);
  const paginatedList = currentList.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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
            外注業者登録
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

      {/* タブと出力ボタン */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant={tabValue === 0 ? 'contained' : 'outlined'}
            onClick={() => setTabValue(0)}
            sx={{
              bgcolor: tabValue === 0 ? '#5DADE2' : 'transparent',
              color: tabValue === 0 ? '#FFFFFF' : '#666666',
              borderColor: '#CCCCCC',
              textTransform: 'none',
              fontSize: '0.875rem',
              px: 3,
              '&:hover': {
                bgcolor: tabValue === 0 ? '#3498DB' : 'rgba(93, 173, 226, 0.1)',
              },
            }}
          >
            未登録
          </Button>
          <Button
            variant={tabValue === 1 ? 'contained' : 'outlined'}
            onClick={() => setTabValue(1)}
            sx={{
              bgcolor: tabValue === 1 ? '#FFFFFF' : 'transparent',
              color: tabValue === 1 ? '#666666' : '#666666',
              borderColor: '#CCCCCC',
              textTransform: 'none',
              fontSize: '0.875rem',
              px: 3,
              '&:hover': {
                bgcolor: tabValue === 1 ? '#FFFFFF' : 'rgba(0, 0, 0, 0.05)',
              },
            }}
          >
            登録済
          </Button>
        </Box>
        {tabValue === 1 && (
          <Button
            variant="outlined"
            startIcon={<GetAppIcon />}
            onClick={handleDownloadCSV}
            sx={{
              textTransform: 'none',
              borderColor: '#8BC34A',
              color: '#8BC34A',
              bgcolor: '#FFFFFF',
              '&:hover': {
                borderColor: '#7CB342',
                bgcolor: '#F1F8E9',
              },
              fontSize: '0.875rem',
            }}
          >
            出　力
          </Button>
        )}
      </Box>

      {/* 検索条件 */}
      {tabValue === 1 && (
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
                  label="検索（業者名、コード等）"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  size="small"
                  sx={{ flex: 1 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon sx={{ color: '#999999' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>都道府県</InputLabel>
                  <Select
                    value={prefectureFilter}
                    label="都道府県"
                    onChange={(e) => setPrefectureFilter(e.target.value)}
                  >
                    <MenuItem value="">すべて</MenuItem>
                    {prefectures.map((pref) => (
                      <MenuItem key={pref} value={pref}>
                        {pref}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  startIcon={<SearchIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  検索
                </Button>
                <Button
                  variant="outlined"
                  sx={{ textTransform: 'none' }}
                  onClick={() => {
                    setSearchKeyword('');
                    setPrefectureFilter('');
                  }}
                >
                  クリア
                </Button>
              </Box>
            </Box>
          </Collapse>
        </Box>
      )}

      {/* テーブル */}
      <Paper sx={{ borderRadius: 1, overflow: 'hidden' }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#E8E8E8' }}>
                <TableCell sx={{ fontWeight: 600, width: 60, fontSize: '0.75rem' }}>修正</TableCell>
                <TableCell sx={{ fontWeight: 600, width: 60, fontSize: '0.75rem' }}>削除</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem' }}>業者名</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem' }}>業者コード</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem' }}>ふりがな</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem' }}>部署名</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem' }}>郵便番号</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem' }}>住所</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem' }}>住所(営業所)</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem' }}>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedList.map((subcontractor) => (
                <TableRow key={subcontractor.id} sx={{ '&:hover': { bgcolor: '#F9F9F9' } }}>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => tabValue === 0 ? handleRegisterExisting(subcontractor) : handleOpenDialog(subcontractor)}
                      sx={{ color: '#0078C8' }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(subcontractor.id)}
                      sx={{ color: '#5DADE2' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{subcontractor.業者名}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{subcontractor.業者コード}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{subcontractor.ふりがな}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{subcontractor.部署名}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{subcontractor.郵便番号}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{subcontractor.住所}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{subcontractor.住所2}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{subcontractor.Email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ページネーション */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, bgcolor: '#FAFAFA' }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Paper>

      {/* 新規登録/編集ダイアログ */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            maxHeight: '90vh',
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {editingSubcontractor ? '編集' : '新規登録'}
          </Typography>
          <IconButton onClick={handleCloseDialog} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" sx={{ mb: 2, color: '#666666' }}>
            項目を入力し、よろしければ「登録」を押してください。
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="業者名"
              value={formData.業者名}
              onChange={(e) => setFormData({ ...formData, 業者名: e.target.value })}
              required
              fullWidth
              size="small"
              error={!formData.業者名}
              helperText={!formData.業者名 ? '必須です' : ''}
              FormHelperTextProps={{
                sx: { color: '#D32F2F' }
              }}
            />

            <TextField
              label="業者コード"
              value={formData.業者コード}
              onChange={(e) => setFormData({ ...formData, 業者コード: e.target.value })}
              required
              fullWidth
              size="small"
              error={!formData.業者コード}
              helperText={!formData.業者コード ? '必須です' : ''}
              FormHelperTextProps={{
                sx: { color: '#D32F2F' }
              }}
            />

            <TextField
              label="ふりがな"
              value={formData.ふりがな}
              onChange={(e) => setFormData({ ...formData, ふりがな: e.target.value })}
              fullWidth
              size="small"
            />

            <TextField
              label="部署名"
              value={formData.部署名}
              onChange={(e) => setFormData({ ...formData, 部署名: e.target.value })}
              fullWidth
              size="small"
            />

            <TextField
              label="郵便番号"
              value={formData.郵便番号}
              onChange={(e) => setFormData({ ...formData, 郵便番号: e.target.value })}
              fullWidth
              size="small"
            />

            <TextField
              label="住所"
              value={formData.住所}
              onChange={(e) => setFormData({ ...formData, 住所: e.target.value })}
              required
              fullWidth
              size="small"
              error={!formData.住所}
              helperText={!formData.住所 ? '必須です' : ''}
              FormHelperTextProps={{
                sx: { color: '#D32F2F' }
              }}
            />

            <TextField
              label="住所(営業所)"
              value={formData.住所2}
              onChange={(e) => setFormData({ ...formData, 住所2: e.target.value })}
              fullWidth
              size="small"
            />

            <TextField
              label="Email"
              value={formData.Email}
              onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
              fullWidth
              size="small"
            />

            <TextField
              label="電話番号"
              value={formData.電話番号}
              onChange={(e) => setFormData({ ...formData, 電話番号: e.target.value })}
              fullWidth
              size="small"
            />

            <TextField
              label="FAX"
              value={formData.FAX}
              onChange={(e) => setFormData({ ...formData, FAX: e.target.value })}
              fullWidth
              size="small"
            />

            <TextField
              label="担当部署名"
              value={formData.担当部署名}
              onChange={(e) => setFormData({ ...formData, 担当部署名: e.target.value })}
              fullWidth
              size="small"
            />

            <TextField
              label="担当役職名"
              value={formData.担当役職名}
              onChange={(e) => setFormData({ ...formData, 担当役職名: e.target.value })}
              fullWidth
              size="small"
            />

            <TextField
              label="担当者"
              value={formData.担当者}
              onChange={(e) => setFormData({ ...formData, 担当者: e.target.value })}
              fullWidth
              size="small"
            />

            {/* 出来高割合 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                label="出来高割合"
                value={formData.出来高割合}
                onChange={(e) => setFormData({ ...formData, 出来高割合: e.target.value })}
                required
                size="small"
                sx={{ width: 150 }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                error={!formData.出来高割合}
                helperText={!formData.出来高割合 ? '必須です' : ''}
                FormHelperTextProps={{
                  sx: { color: '#D32F2F' }
                }}
              />
            </Box>

            {/* 現金支払 */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ minWidth: 80 }}>
                  現金支払
                </Typography>
                <Typography variant="body2">当月</Typography>
                <TextField
                  value={formData.現金支払率}
                  onChange={(e) => setFormData({ ...formData, 現金支払率: e.target.value })}
                  size="small"
                  sx={{ width: 100 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  error={!formData.現金支払率}
                />
                <Typography variant="body2">4ヶ月</Typography>
                <TextField
                  value={formData.支払率}
                  onChange={(e) => setFormData({ ...formData, 支払率: e.target.value })}
                  size="small"
                  sx={{ width: 100 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  error={!formData.支払率}
                />
              </Box>
              {(!formData.現金支払率 || !formData.支払率) && (
                <Typography variant="caption" sx={{ color: '#D32F2F', mt: 0.5, display: 'block', ml: 10 }}>
                  必須です
                </Typography>
              )}
            </Box>

            {/* 評価 */}
            <FormControl size="small" fullWidth>
              <InputLabel>評価</InputLabel>
              <Select
                value={formData.評価}
                label="評価"
                onChange={(e) => setFormData({ ...formData, 評価: e.target.value })}
              >
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
              </Select>
            </FormControl>
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

      {/* 既存業者に本登録ダイアログ */}
      <Dialog
        open={openExistingDialog}
        onClose={() => setOpenExistingDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>新規登録</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2, color: '#666666' }}>
            項目を入力し、よろしければ「登録」を押してください。
          </Typography>

          <TextField
            label="業者名"
            value={editingSubcontractor?.業者名 || ''}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            disabled
          />

          <TextField
            label="業者コード"
            value={existingCode}
            onChange={(e) => setExistingCode(e.target.value)}
            fullWidth
            size="small"
            required
            error={!existingCode}
            helperText={!existingCode ? '必須です' : ''}
          />

          {existingCode && (
            <Button
              variant="contained"
              onClick={handleCheckExistingCode}
              fullWidth
              sx={{ mt: 2, textTransform: 'none' }}
            >
              登録情報で上書き
            </Button>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenExistingDialog(false)} variant="outlined">
            キャンセル
          </Button>
          <Button onClick={() => setOpenExistingDialog(false)} variant="contained">
            登録
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubcontractorRegistration;
