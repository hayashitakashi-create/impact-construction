import React from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Link,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Person as PersonIcon,
  Lock as LockIcon,
  Login as LoginIcon,
} from '@mui/icons-material';

interface LoginProps {
  onLogin?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [companyId, setCompanyId] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    // ログイン処理を実装
    console.log('Login:', { companyId, email, password });
    // 実際の認証処理はここに実装
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0078C8 0%, #0066AA 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 都市のシルエット背景 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to top, rgba(0, 40, 80, 0.8) 0%, transparent 100%)',
          zIndex: 0,
        }}
      />

      {/* ログインカード */}
      <Card
        sx={{
          display: 'flex',
          maxWidth: 1000,
          width: '90%',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          borderRadius: 3,
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        {/* 左側：ブランディングエリア */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 6,
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* ロゴ */}
          <Box
            sx={{
              width: 200,
              height: 200,
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="200" height="200" viewBox="0 0 200 200">
              {/* 外側の円リング */}
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="#0078C8"
                strokeWidth="8"
                strokeDasharray="20 10"
              />
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#95CCC5"
                strokeWidth="6"
                strokeDasharray="15 8"
              />
              {/* 中央の六角形 */}
              <polygon
                points="100,40 130,55 130,85 100,100 70,85 70,55"
                fill="#0078C8"
              />
              {/* 中央の円 */}
              <circle cx="100" cy="100" r="20" fill="#C1E6EF" />
            </svg>
          </Box>

          {/* ロゴタイトル */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: '#1C2026',
              letterSpacing: 2,
              mb: 1,
            }}
          >
            IMPACT
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#1C2026',
              letterSpacing: 2,
              mb: 2,
            }}
          >
            CONSTRUCTION
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#494D51',
              fontSize: '0.875rem',
              borderTop: '2px solid #0078C8',
              pt: 1,
            }}
          >
            クラウド型建設施工管理支援システム
          </Typography>
        </Box>

        {/* 右側：ログインフォーム */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 6,
            backgroundColor: '#F6F6F6',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: '#1C2026',
              mb: 4,
            }}
          >
            ログイン
          </Typography>

          {/* 会社ID */}
          <TextField
            fullWidth
            placeholder="会社ID"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            sx={{
              mb: 2,
              backgroundColor: '#FFFFFF',
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessIcon sx={{ color: '#494D51' }} />
                </InputAdornment>
              ),
            }}
          />

          {/* メールアドレス */}
          <TextField
            fullWidth
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2,
              backgroundColor: '#FFFFFF',
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: '#494D51' }} />
                </InputAdornment>
              ),
            }}
          />

          {/* パスワード */}
          <TextField
            fullWidth
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 3,
              backgroundColor: '#FFFFFF',
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#494D51' }} />
                </InputAdornment>
              ),
            }}
          />

          {/* ログインボタン */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLogin}
            startIcon={<LoginIcon />}
            sx={{
              backgroundColor: '#95CCC5',
              color: '#1C2026',
              fontWeight: 600,
              py: 1.5,
              mb: 2,
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: '#7FBFB8',
              },
            }}
          >
            ログイン
          </Button>

          {/* パスワードを忘れた方 */}
          <Link
            href="#"
            sx={{
              textAlign: 'center',
              color: '#0078C8',
              fontSize: '0.875rem',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            パスワードを忘れた方はこちら
          </Link>

          {/* デモ用ログイン情報 */}
          <Box
            sx={{
              mt: 4,
              p: 2,
              backgroundColor: '#FFF9E6',
              borderRadius: 1,
              border: '1px solid #F7DE6E',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#1C2026',
                mb: 1,
                textAlign: 'center',
              }}
            >
              デモ用ログイン情報
            </Typography>
            <Box sx={{ fontSize: '0.75rem', color: '#494D51' }}>
              <Box sx={{ display: 'flex', mb: 0.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 600, minWidth: 100 }}>
                  会社ID:
                </Typography>
                <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                  dandori
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 0.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 600, minWidth: 100 }}>
                  メールアドレス:
                </Typography>
                <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                  test@kawata.org
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="caption" sx={{ fontWeight: 600, minWidth: 100 }}>
                  パスワード:
                </Typography>
                <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                  password
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>

      {/* フッター */}
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          bottom: 20,
          color: '#FFFFFF',
          fontSize: '0.75rem',
          zIndex: 1,
        }}
      >
        (c) KAWATA Construction Co., Ltd. All Right Reserved.
      </Typography>
    </Box>
  );
};

export default Login;
