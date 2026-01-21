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
  Collapse,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

interface User {
  id: number;
  利用者ID: string;
  email: string;
  姓: string;
  名: string;
  権限テンプレート: string;
  詳細: {
    共通: string;
    工事: string;
    見積積算: string;
    実行予算: string;
    購買発注: string;
    工程管理: string;
    出来高管理: string;
    支払管理: string;
    実行予算管理: string;
    'その他・設定': string;
  };
}

const ScreenPermissionRegistration: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    利用者ID: '',
    email: '',
    姓: '',
    名: '',
  });

  // サンプルユーザーデータ
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      利用者ID: 'test001',
      email: 'test.taro@example.com',
      姓: 'テスト',
      名: '太郎',
      権限テンプレート: 'システム管理者',
      詳細: {
        共通: '○',
        工事: '○',
        見積積算: '○',
        実行予算: '○',
        購買発注: '○',
        工程管理: '○',
        出来高管理: '○',
        支払管理: '○',
        実行予算管理: '○',
        'その他・設定': '○',
      },
    },
    {
      id: 2,
      利用者ID: 'test002',
      email: 'test.jiro@example.com',
      姓: 'テスト',
      名: '二郎',
      権限テンプレート: 'システム管理者',
      詳細: {
        共通: '○',
        工事: '○',
        見積積算: '○',
        実行予算: '○',
        購買発注: '○',
        工程管理: '○',
        出来高管理: '○',
        支払管理: '○',
        実行予算管理: '○',
        'その他・設定': '○',
      },
    },
    {
      id: 3,
      利用者ID: 'test003',
      email: 'test.saburo@example.com',
      姓: 'テスト',
      名: '三郎',
      権限テンプレート: 'システム管理者',
      詳細: {
        共通: '○',
        工事: '○',
        見積積算: '○',
        実行予算: '○',
        購買発注: '○',
        工程管理: '○',
        出来高管理: '○',
        支払管理: '○',
        実行予算管理: '○',
        'その他・設定': '○',
      },
    },
    {
      id: 4,
      利用者ID: 'hayashi',
      email: 'hayashi.takashi@example.com',
      姓: '林',
      名: '崇',
      権限テンプレート: 'システム管理者',
      詳細: {
        共通: '○',
        工事: '○',
        見積積算: '○',
        実行予算: '○',
        購買発注: '○',
        工程管理: '○',
        出来高管理: '○',
        支払管理: '○',
        実行予算管理: '○',
        'その他・設定': '○',
      },
    },
  ]);

  // 権限テンプレートのオプション
  const permissionTemplates = [
    'システム管理者',
    '案件-システム管理者',
    '案件-営業担当者',
    '一般ユーザー（デフォルト）',
  ];

  // 権限テンプレート変更
  const handleTemplateChange = (userId: number, template: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, 権限テンプレート: template };
      }
      return user;
    }));
  };

  // 検索クリア
  const handleClearSearch = () => {
    setSearchParams({
      利用者ID: '',
      email: '',
      姓: '',
      名: '',
    });
  };

  // 保存
  const handleSave = () => {
    // TODO: 実際の保存処理を実装
    console.log('保存:', users);
    alert('設定を保存しました');
  };

  // フィルタリングされたユーザー
  const filteredUsers = users.filter(user => {
    const matchUserId = !searchParams.利用者ID || user.利用者ID.includes(searchParams.利用者ID);
    const matchEmail = !searchParams.email || user.email.includes(searchParams.email);
    const matchLastName = !searchParams.姓 || user.姓.includes(searchParams.姓);
    const matchFirstName = !searchParams.名 || user.名.includes(searchParams.名);
    return matchUserId && matchEmail && matchLastName && matchFirstName;
  });

  return (
    <Box sx={{ p: 3 }}>
      {/* ページタイトルと保存ボタン */}
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
            画面操作権限登録
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{
            bgcolor: '#5DADE2',
            '&:hover': {
              bgcolor: '#3498DB',
            },
            textTransform: 'none',
            fontSize: '0.875rem',
          }}
        >
          保存
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
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
              <TextField
                label="利用者ID"
                value={searchParams.利用者ID}
                onChange={(e) => setSearchParams({ ...searchParams, 利用者ID: e.target.value })}
                size="small"
              />
              <TextField
                label="Email"
                value={searchParams.email}
                onChange={(e) => setSearchParams({ ...searchParams, email: e.target.value })}
                size="small"
              />
              <TextField
                label="姓"
                value={searchParams.姓}
                onChange={(e) => setSearchParams({ ...searchParams, 姓: e.target.value })}
                size="small"
              />
              <TextField
                label="名"
                value={searchParams.名}
                onChange={(e) => setSearchParams({ ...searchParams, 名: e.target.value })}
                size="small"
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
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
                onClick={handleClearSearch}
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
                クリア
              </Button>
            </Box>
          </Box>
        </Collapse>
      </Box>

      {/* ユーザーテーブル */}
      <Paper sx={{ borderRadius: 1, overflow: 'hidden' }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#9E9E9E' }}>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#FFFFFF' }}>
                  ユーザー名
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#FFFFFF', width: 200 }}>
                  権限テンプレート
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#FFFFFF' }}>
                  詳細
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} sx={{ '&:hover': { bgcolor: '#F9F9F9' } }}>
                  <TableCell sx={{ fontSize: '0.875rem' }}>
                    {user.姓} {user.名}
                  </TableCell>
                  <TableCell>
                    <FormControl size="small" fullWidth>
                      <Select
                        value={user.権限テンプレート}
                        onChange={(e) => handleTemplateChange(user.id, e.target.value)}
                        sx={{ fontSize: '0.875rem' }}
                      >
                        {permissionTemplates.map((template) => (
                          <MenuItem key={template} value={template} sx={{ fontSize: '0.875rem' }}>
                            {template}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                        共通 {user.詳細.共通}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                        工事 {user.詳細.工事}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                        見積積算 {user.詳細.見積積算}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                        実行予算 {user.詳細.実行予算}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                        購買発注 {user.詳細.購買発注}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                        工程管理 {user.詳細.工程管理}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                        出来高管理 {user.詳細.出来高管理}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                        支払管理 {user.詳細.支払管理}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                        実行予算管理 {user.詳細.実行予算管理}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                        その他・設定 {user.詳細['その他・設定']}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ScreenPermissionRegistration;
