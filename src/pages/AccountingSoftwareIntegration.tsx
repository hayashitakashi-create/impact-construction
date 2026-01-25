import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

interface AccountingItem {
  label: string;
  code: string;
  required: boolean;
}

interface AccountingSoftwareSetting {
  id: number;
  設定名: string;
  会計ソフト: string;
  ヘッダ情報: {
    伝票区分コード: string;
    用途区分: string;
    部門指定方法: string;
    伝票部門コード: string;
    支払日_日: string;
    支払日_処理: string;
    整理区分: string;
    伝票入力形式: string;
  };
  明細情報: {
    部門コード: string;
    税区分コード: string;
    税率区分コード: string;
    税率: string;
    事業区分コード: string;
    消費税計算: string;
    端数処理: string;
    手形割合計算: string;
  };
  勘定科目: AccountingItem[];
  経費: AccountingItem[];
  共通仮設: AccountingItem[];
}

const AccountingSoftwareIntegration: React.FC = () => {
  // 検索用の状態
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  // ダイアログの状態
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // フォームデータ
  const [settingName, setSettingName] = useState('');
  const [accountingSoftware, setAccountingSoftware] = useState('連携なし');
  const [headerInfo, setHeaderInfo] = useState({
    伝票区分コード: '通常伝票',
    用途区分: '振替伝票',
    部門指定方法: '勘定科目単位',
    伝票部門コード: '未使用',
    支払日_日: '25',
    支払日_処理: '翌営業日にする',
    整理区分: '日常仕訳',
    伝票入力形式: '通常入力',
  });
  const [detailInfo, setDetailInfo] = useState({
    部門コード: 'その他部門',
    税区分コード: '自動設定',
    税率区分コード: '日付自動判定',
    税率: '日付自動判定',
    事業区分コード: '自動設定',
    消費税計算: 'しない',
    端数処理: '自動設定',
    手形割合計算: '切り捨てなし',
  });
  const [debitItems, setDebitItems] = useState<AccountingItem[]>([
    { label: '【借方】未成材料費', code: '', required: true },
    { label: '【借方】未成外注費', code: '', required: true },
    { label: '【貸方】現金支払', code: '', required: true },
    { label: '【貸方】手形支払', code: '', required: true },
  ]);
  const [expenseItems, setExpenseItems] = useState<AccountingItem[]>([
    { label: '給与人件費', code: '', required: true },
    { label: '旅費交通費', code: '', required: true },
    { label: '法定福利', code: '', required: true },
    { label: '事務用品費', code: '', required: true },
    { label: '通信費', code: '', required: true },
    { label: '租税公課', code: '', required: true },
    { label: '地代家賃', code: '', required: true },
    { label: '雑費', code: '', required: true },
    { label: '部門共通費', code: '', required: true },
    { label: '一般管理費', code: '', required: true },
    { label: '補償費', code: '', required: true },
    { label: '一式', code: '', required: true },
  ]);
  const [commonTemporaryItems, setCommonTemporaryItems] = useState<AccountingItem[]>([
    { label: '環境安全費', code: '', required: true },
    { label: '屋外整理清掃費', code: '', required: true },
    { label: '動力用水光熱費', code: '', required: true },
    { label: '機械器具費', code: '', required: true },
    { label: '仮設建物費', code: '', required: true },
    { label: '準備費', code: '', required: true },
    { label: '丁張り', code: '', required: true },
    { label: '試験費・調査費', code: '', required: true },
    { label: 'その他', code: '', required: true },
    { label: '社内損料費', code: '', required: true },
    { label: '一式', code: '', required: true },
    { label: '運搬費', code: '', required: true },
    { label: '工事施設費', code: '', required: true },
  ]);

  // サンプルデータ
  const [settings, setSettings] = useState<AccountingSoftwareSetting[]>([
    {
      id: 1,
      設定名: '勘定奉行設定1',
      会計ソフト: '勘定奉行(仕訳伝票)',
      ヘッダ情報: {
        伝票区分コード: '通常伝票',
        用途区分: '振替伝票',
        部門指定方法: '勘定科目単位',
        伝票部門コード: '未使用',
        支払日_日: '25',
        支払日_処理: '翌営業日にする',
        整理区分: '日常仕訳',
        伝票入力形式: '通常入力',
      },
      明細情報: {
        部門コード: 'その他部門',
        税区分コード: '自動設定',
        税率区分コード: '日付自動判定',
        税率: '日付自動判定',
        事業区分コード: '自動設定',
        消費税計算: 'しない',
        端数処理: '自動設定',
        手形割合計算: '切り捨てなし',
      },
      勘定科目: [
        { label: '【借方】未成材料費', code: '1001', required: true },
        { label: '【借方】未成外注費', code: '1002', required: true },
        { label: '【貸方】現金支払', code: '2001', required: true },
        { label: '【貸方】手形支払', code: '2002', required: true },
      ],
      経費: [
        { label: '給与人件費', code: '3001', required: true },
        { label: '旅費交通費', code: '3002', required: true },
        { label: '法定福利', code: '3003', required: true },
        { label: '事務用品費', code: '3004', required: true },
        { label: '通信費', code: '3005', required: true },
        { label: '租税公課', code: '3006', required: true },
        { label: '地代家賃', code: '3007', required: true },
        { label: '雑費', code: '3008', required: true },
        { label: '部門共通費', code: '3009', required: true },
        { label: '一般管理費', code: '3010', required: true },
        { label: '補償費', code: '3011', required: true },
        { label: '一式', code: '3012', required: true },
      ],
      共通仮設: [
        { label: '環境安全費', code: '4001', required: true },
        { label: '屋外整理清掃費', code: '4002', required: true },
        { label: '動力用水光熱費', code: '4003', required: true },
        { label: '機械器具費', code: '4004', required: true },
        { label: '仮設建物費', code: '4005', required: true },
        { label: '準備費', code: '4006', required: true },
        { label: '丁張り', code: '4007', required: true },
        { label: '試験費・調査費', code: '4008', required: true },
        { label: 'その他', code: '4009', required: true },
        { label: '社内損料費', code: '4010', required: true },
        { label: '一式', code: '4011', required: true },
        { label: '運搬費', code: '4012', required: true },
        { label: '工事施設費', code: '4013', required: true },
      ],
    },
  ]);

  // 検索でフィルタリングされた設定
  const filteredSettings = settings.filter((setting) =>
    setting.設定名.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    setting.会計ソフト.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  // 新規登録ダイアログを開く
  const handleOpenNewDialog = () => {
    setEditingId(null);
    setSettingName('');
    setAccountingSoftware('連携なし');
    setHeaderInfo({
      伝票区分コード: '通常伝票',
      用途区分: '振替伝票',
      部門指定方法: '勘定科目単位',
      伝票部門コード: '未使用',
      支払日_日: '25',
      支払日_処理: '翌営業日にする',
      整理区分: '日常仕訳',
      伝票入力形式: '通常入力',
    });
    setDetailInfo({
      部門コード: 'その他部門',
      税区分コード: '自動設定',
      税率区分コード: '日付自動判定',
      税率: '日付自動判定',
      事業区分コード: '自動設定',
      消費税計算: 'しない',
      端数処理: '自動設定',
      手形割合計算: '切り捨てなし',
    });
    setDebitItems([
      { label: '【借方】未成材料費', code: '', required: true },
      { label: '【借方】未成外注費', code: '', required: true },
      { label: '【貸方】現金支払', code: '', required: true },
      { label: '【貸方】手形支払', code: '', required: true },
    ]);
    setExpenseItems([
      { label: '給与人件費', code: '', required: true },
      { label: '旅費交通費', code: '', required: true },
      { label: '法定福利', code: '', required: true },
      { label: '事務用品費', code: '', required: true },
      { label: '通信費', code: '', required: true },
      { label: '租税公課', code: '', required: true },
      { label: '地代家賃', code: '', required: true },
      { label: '雑費', code: '', required: true },
      { label: '部門共通費', code: '', required: true },
      { label: '一般管理費', code: '', required: true },
      { label: '補償費', code: '', required: true },
      { label: '一式', code: '', required: true },
    ]);
    setCommonTemporaryItems([
      { label: '環境安全費', code: '', required: true },
      { label: '屋外整理清掃費', code: '', required: true },
      { label: '動力用水光熱費', code: '', required: true },
      { label: '機械器具費', code: '', required: true },
      { label: '仮設建物費', code: '', required: true },
      { label: '準備費', code: '', required: true },
      { label: '丁張り', code: '', required: true },
      { label: '試験費・調査費', code: '', required: true },
      { label: 'その他', code: '', required: true },
      { label: '社内損料費', code: '', required: true },
      { label: '一式', code: '', required: true },
      { label: '運搬費', code: '', required: true },
      { label: '工事施設費', code: '', required: true },
    ]);
    setOpenDialog(true);
  };

  // 編集ダイアログを開く
  const handleOpenEditDialog = (setting: AccountingSoftwareSetting) => {
    setEditingId(setting.id);
    setSettingName(setting.設定名);
    setAccountingSoftware(setting.会計ソフト);
    setHeaderInfo(setting.ヘッダ情報);
    setDetailInfo(setting.明細情報);
    setDebitItems(setting.勘定科目);
    setExpenseItems(setting.経費);
    setCommonTemporaryItems(setting.共通仮設);
    setOpenDialog(true);
  };

  // ダイアログを閉じる
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // 保存
  const handleSave = () => {
    if (!settingName.trim()) {
      alert('設定名を入力してください');
      return;
    }

    const newSetting: AccountingSoftwareSetting = {
      id: editingId || Date.now(),
      設定名: settingName,
      会計ソフト: accountingSoftware,
      ヘッダ情報: headerInfo,
      明細情報: detailInfo,
      勘定科目: debitItems,
      経費: expenseItems,
      共通仮設: commonTemporaryItems,
    };

    if (editingId) {
      // 編集
      setSettings(settings.map((s) => (s.id === editingId ? newSetting : s)));
    } else {
      // 新規追加
      setSettings([...settings, newSetting]);
    }

    setOpenDialog(false);
    alert('保存しました');
  };

  // 削除
  const handleDelete = (id: number) => {
    if (window.confirm('この設定を削除してもよろしいですか？')) {
      setSettings(settings.filter((s) => s.id !== id));
    }
  };

  const handleCodeChange = (
    items: AccountingItem[],
    setItems: React.Dispatch<React.SetStateAction<AccountingItem[]>>,
    index: number,
    value: string
  ) => {
    const newItems = [...items];
    newItems[index].code = value;
    setItems(newItems);
  };

  const renderAccountingTable = (
    title: string,
    items: AccountingItem[],
    setItems: React.Dispatch<React.SetStateAction<AccountingItem[]>>
  ) => (
    <Box sx={{ mb: 4 }}>
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#9E9E9E' }}>
              <TableCell sx={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.875rem', width: '50%' }}>
                {title}
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.875rem', width: '50%' }}>
                勘定科目コード
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index} sx={{ '&:nth-of-type(even)': { bgcolor: '#F5F5F5' } }}>
                <TableCell sx={{ fontSize: '0.875rem', py: 2 }}>{item.label}</TableCell>
                <TableCell sx={{ py: 1 }}>
                  <Box>
                    <TextField
                      size="small"
                      value={item.code}
                      onChange={(e) => handleCodeChange(items, setItems, index, e.target.value)}
                      sx={{ width: '200px' }}
                    />
                    {item.required && !item.code && (
                      <Typography sx={{ color: '#DC1D1D', fontSize: '0.75rem', mt: 0.5 }}>
                        必須です
                      </Typography>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* ヘッダー */}
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
            会計ソフト連携設定
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenNewDialog}
          sx={{
            bgcolor: '#5DADE2',
            '&:hover': {
              bgcolor: '#3498DB',
            },
            textTransform: 'none',
            fontSize: '0.875rem',
          }}
        >
          新規登録
        </Button>
      </Box>

      {/* 検索エリア */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<SearchIcon />}
            onClick={() => setSearchOpen(!searchOpen)}
            sx={{
              textTransform: 'none',
              borderColor: '#5DADE2',
              color: '#5DADE2',
              '&:hover': {
                borderColor: '#3498DB',
                bgcolor: 'rgba(93, 173, 226, 0.1)',
              },
            }}
          >
            検索
          </Button>
          {searchOpen && (
            <TextField
              size="small"
              placeholder="設定名または会計ソフトで検索"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              sx={{ flex: 1, maxWidth: 400 }}
            />
          )}
        </Box>
      </Paper>

      {/* 設定一覧テーブル */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#E3F2FD' }}>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>設定名</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>会計ソフト</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', width: 120 }}>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSettings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} sx={{ textAlign: 'center', py: 4 }}>
                  <Typography sx={{ color: '#999999' }}>
                    登録されている設定がありません
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredSettings.map((setting) => (
                <TableRow key={setting.id} hover>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{setting.設定名}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{setting.会計ソフト}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenEditDialog(setting)}
                      sx={{ color: '#5DADE2' }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(setting.id)}
                      sx={{ color: '#DC1D1D' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
        <DialogTitle>
          {editingId ? '会計ソフト連携設定の編集' : '会計ソフト連携設定の新規登録'}
        </DialogTitle>
        <DialogContent sx={{ overflow: 'auto', maxHeight: 'calc(90vh - 120px)' }}>
          {/* 設定名 */}
          <Box sx={{ mb: 3, mt: 2 }}>
            <TextField
              fullWidth
              label="設定名"
              value={settingName}
              onChange={(e) => setSettingName(e.target.value)}
              required
            />
          </Box>

          {/* 会計ソフト入力 */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="会計ソフト"
              value={accountingSoftware}
              onChange={(e) => setAccountingSoftware(e.target.value)}
              placeholder="例: 勘定奉行(仕訳伝票)、弥生会計など"
            />
          </Box>

          {/* 勘定奉行が入力されている場合の詳細設定 */}
          {accountingSoftware.includes('勘定奉行') && (
            <Box>
              {/* 注意書き */}
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontSize: '0.875rem', color: '#666666', mb: 0.5 }}>
                  ・必須項目以外は、未入力にするとデフォルト設定になります。
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: '#666666' }}>
                  ・勘定奉行の入力規則に従って入力してください。
                </Typography>
              </Box>

              {/* ヘッダ情報 */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  ヘッダ情報
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '0.875rem' }}>伝票区分コード</Typography>
                  <TextField
                    size="small"
                    value={headerInfo.伝票区分コード}
                    onChange={(e) => setHeaderInfo({ ...headerInfo, 伝票区分コード: e.target.value })}
                  />

                  <Typography sx={{ fontSize: '0.875rem' }}>用途区分</Typography>
                  <TextField
                    size="small"
                    value={headerInfo.用途区分}
                    onChange={(e) => setHeaderInfo({ ...headerInfo, 用途区分: e.target.value })}
                  />

                  <Typography sx={{ fontSize: '0.875rem' }}>部門指定方法</Typography>
                  <TextField
                    size="small"
                    value={headerInfo.部門指定方法}
                    onChange={(e) => setHeaderInfo({ ...headerInfo, 部門指定方法: e.target.value })}
                  />

                  <Typography sx={{ fontSize: '0.875rem' }}>伝票部門コード</Typography>
                  <TextField
                    size="small"
                    value={headerInfo.伝票部門コード}
                    onChange={(e) => setHeaderInfo({ ...headerInfo, 伝票部門コード: e.target.value })}
                  />

                  <Typography sx={{ fontSize: '0.875rem' }}>支払日</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Select
                      size="small"
                      value={headerInfo.支払日_日}
                      onChange={(e) => setHeaderInfo({ ...headerInfo, 支払日_日: e.target.value })}
                      sx={{ width: 100 }}
                    >
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <MenuItem key={day} value={day.toString()}>
                          {day}
                        </MenuItem>
                      ))}
                    </Select>
                    <Typography sx={{ fontSize: '0.875rem' }}>日</Typography>
                    <Typography sx={{ fontSize: '0.875rem', mx: 1 }}>土日祝日が支払日の場合</Typography>
                    <Select
                      size="small"
                      value={headerInfo.支払日_処理}
                      onChange={(e) => setHeaderInfo({ ...headerInfo, 支払日_処理: e.target.value })}
                      sx={{ width: 200 }}
                    >
                      <MenuItem value="翌営業日にする">翌営業日にする</MenuItem>
                      <MenuItem value="前営業日にする">前営業日にする</MenuItem>
                    </Select>
                  </Box>

                  <Typography sx={{ fontSize: '0.875rem' }}>整理区分</Typography>
                  <TextField
                    size="small"
                    value={headerInfo.整理区分}
                    onChange={(e) => setHeaderInfo({ ...headerInfo, 整理区分: e.target.value })}
                  />

                  <Typography sx={{ fontSize: '0.875rem' }}>伝票入力形式</Typography>
                  <TextField
                    size="small"
                    value={headerInfo.伝票入力形式}
                    onChange={(e) => setHeaderInfo({ ...headerInfo, 伝票入力形式: e.target.value })}
                  />
                </Box>
              </Box>

              {/* 明細情報 */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  明細情報
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '0.875rem' }}>部門コード</Typography>
                  <TextField
                    size="small"
                    value={detailInfo.部門コード}
                    onChange={(e) => setDetailInfo({ ...detailInfo, 部門コード: e.target.value })}
                  />

                  <Typography sx={{ fontSize: '0.875rem' }}>税区分コード</Typography>
                  <TextField
                    size="small"
                    value={detailInfo.税区分コード}
                    onChange={(e) => setDetailInfo({ ...detailInfo, 税区分コード: e.target.value })}
                  />

                  <Typography sx={{ fontSize: '0.875rem' }}>税率区分コード</Typography>
                  <TextField
                    size="small"
                    value={detailInfo.税率区分コード}
                    onChange={(e) => setDetailInfo({ ...detailInfo, 税率区分コード: e.target.value })}
                  />

                  <Typography sx={{ fontSize: '0.875rem' }}>税率</Typography>
                  <TextField
                    size="small"
                    value={detailInfo.税率}
                    onChange={(e) => setDetailInfo({ ...detailInfo, 税率: e.target.value })}
                  />

                  <Typography sx={{ fontSize: '0.875rem' }}>事業区分コード</Typography>
                  <TextField
                    size="small"
                    value={detailInfo.事業区分コード}
                    onChange={(e) => setDetailInfo({ ...detailInfo, 事業区分コード: e.target.value })}
                  />

                  <Typography sx={{ fontSize: '0.875rem' }}>消費税計算</Typography>
                  <TextField
                    size="small"
                    value={detailInfo.消費税計算}
                    onChange={(e) => setDetailInfo({ ...detailInfo, 消費税計算: e.target.value })}
                  />

                  <Typography sx={{ fontSize: '0.875rem' }}>端数処理</Typography>
                  <TextField
                    size="small"
                    value={detailInfo.端数処理}
                    onChange={(e) => setDetailInfo({ ...detailInfo, 端数処理: e.target.value })}
                  />

                  <Typography sx={{ fontSize: '0.875rem' }}>手形割合計算</Typography>
                  <FormControl size="small" fullWidth>
                    <Select
                      value={detailInfo.手形割合計算}
                      onChange={(e) => setDetailInfo({ ...detailInfo, 手形割合計算: e.target.value })}
                    >
                      <MenuItem value="切り捨てなし">切り捨てなし</MenuItem>
                      <MenuItem value="10円未満切り捨て">10円未満切り捨て</MenuItem>
                      <MenuItem value="100円未満切り捨て">100円未満切り捨て</MenuItem>
                      <MenuItem value="1,000円未満切り捨て">1,000円未満切り捨て</MenuItem>
                      <MenuItem value="10,000円未満切り捨て">10,000円未満切り捨て</MenuItem>
                      <MenuItem value="100,000円未満切り捨て">100,000円未満切り捨て</MenuItem>
                      <MenuItem value="1,000,000円未満切り捨て">1,000,000円未満切り捨て</MenuItem>
                      <MenuItem value="10,000,000円未満切り捨て">10,000,000円未満切り捨て</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              {/* 勘定科目 */}
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                勘定科目
              </Typography>
              {renderAccountingTable('勘定科目', debitItems, setDebitItems)}

              {/* 経費 */}
              {renderAccountingTable('経費', expenseItems, setExpenseItems)}

              {/* 共通仮設 */}
              {renderAccountingTable('共通仮設', commonTemporaryItems, setCommonTemporaryItems)}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} sx={{ textTransform: 'none' }}>
            キャンセル
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              bgcolor: '#5DADE2',
              '&:hover': {
                bgcolor: '#3498DB',
              },
              textTransform: 'none',
            }}
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountingSoftwareIntegration;
