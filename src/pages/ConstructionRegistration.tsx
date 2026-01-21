import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  Paper,
  InputAdornment,
} from '@mui/material';
import {
  Construction as ConstructionIcon,
} from '@mui/icons-material';
import { useRegistration } from '../contexts/RegistrationContext';

const ConstructionRegistration: React.FC = () => {
  const { categories, constructionTypes, buildingUsages } = useRegistration();
  const [orderStatus, setOrderStatus] = useState('受注中');
  const [constructionCategory, setConstructionCategory] = useState('');
  const [constructionDivision, setConstructionDivision] = useState('');
  const [buildingUsage, setBuildingUsage] = useState('');

  // 工種グループの重複を除いたリストを作成
  const workGroups = useMemo(() => {
    const uniqueGroups = Array.from(new Set(constructionTypes.map(type => type.workGroup)));
    return uniqueGroups;
  }, [constructionTypes]);

  return (
    <Box sx={{ bgcolor: '#F6F6F6', minHeight: 'calc(100vh - 56px)', py: 3 }}>
      <Container maxWidth="lg">
        {/* ヘッダー */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
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
            <ConstructionIcon sx={{ color: '#FFFFFF', fontSize: 28 }} />
          </Box>
          <Typography variant="h4" sx={{ color: '#1C2026', fontWeight: 600 }}>
            工事登録
          </Typography>
        </Box>

        <Paper sx={{ p: 4 }}>
          {/* エラーメッセージとボタン */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Typography sx={{ color: '#DC1D1D', fontSize: '0.875rem' }}>
              入力内容に誤りのある箇所があるため保存できません。
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#B0BEC5',
                color: '#FFFFFF',
                '&:hover': { bgcolor: '#90A4AE' },
              }}
            >
              保存
            </Button>
          </Box>

          {/* 受注状態 */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 2, color: '#1C2026' }}
            >
              受注状態
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <FormControlLabel
                  value="受注中"
                  control={<Radio sx={{ color: '#0078C8', '&.Mui-checked': { color: '#0078C8' } }} />}
                  label="受注中"
                />
              </RadioGroup>
            </FormControl>
            <Typography sx={{ color: '#FF9800', fontSize: '0.875rem', mt: 1 }}>
              ※ 新規登録時の場合は「見積中」のみ選択可能です
            </Typography>
          </Box>

          {/* 基本情報 */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 3, color: '#1C2026' }}
            >
              基本情報
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl fullWidth required error>
                  <InputLabel>工事分類</InputLabel>
                  <Select
                    label="工事分類"
                    value={constructionCategory}
                    onChange={(e) => setConstructionCategory(e.target.value)}
                  >
                    <MenuItem value="">選択してください</MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>必須です</FormHelperText>
                </FormControl>
                <TextField
                  fullWidth
                  label="工事番号"
                  helperText="※ 1文字以上・契約工期の入力後に表示されます"
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl fullWidth required error>
                  <InputLabel>工事区分</InputLabel>
                  <Select
                    label="工事区分"
                    value={constructionDivision}
                    onChange={(e) => setConstructionDivision(e.target.value)}
                  >
                    <MenuItem value="">選択してください</MenuItem>
                    {workGroups.map((group) => (
                      <MenuItem key={group} value={group}>
                        {group}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>必須です</FormHelperText>
                </FormControl>
                <FormControl fullWidth required error>
                  <InputLabel>建物用途</InputLabel>
                  <Select
                    label="建物用途"
                    value={buildingUsage}
                    onChange={(e) => setBuildingUsage(e.target.value)}
                  >
                    <MenuItem value="">選択してください</MenuItem>
                    {buildingUsages.map((usage) => (
                      <MenuItem key={usage.id} value={usage.name}>
                        {usage.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>必須です</FormHelperText>
                </FormControl>
              </Box>

              <TextField
                fullWidth
                required
                error
                label="工事名"
                helperText="必須です"
              />

              <TextField fullWidth label="工事メモ" multiline rows={2} />

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <TextField
                  fullWidth
                  required
                  error
                  label="発注者"
                  helperText="必須です"
                />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#757575',
                    color: '#FFFFFF',
                    minWidth: 100,
                    height: 56,
                    '&:hover': { bgcolor: '#616161' },
                  }}
                >
                  選択
                </Button>
              </Box>

              <FormControl fullWidth>
                <InputLabel>本支店</InputLabel>
                <Select label="本支店" defaultValue="本社">
                  <MenuItem value="本社">本社</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* 工事概要 */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 3, color: '#1C2026' }}
            >
              工事概要
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl fullWidth required error>
                  <InputLabel>都道府県</InputLabel>
                  <Select label="都道府県">
                    <MenuItem value="">選択してください</MenuItem>
                  </Select>
                  <FormHelperText>必須です</FormHelperText>
                </FormControl>
                <TextField
                  fullWidth
                  required
                  error
                  label="工事場所"
                  helperText="必須です"
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  required
                  error
                  label="敷地面積"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">m² (0.00 坪)</InputAdornment>,
                  }}
                  helperText="必須です"
                />
                <TextField
                  fullWidth
                  label="工事金額"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">円</InputAdornment>,
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* 関係者情報 */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 3, color: '#1C2026' }}
            >
              関係者情報
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <FormControl fullWidth>
                <InputLabel>現場代理人</InputLabel>
                <Select label="現場代理人">
                  <MenuItem value="">選択してください</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth required error>
                <InputLabel>営業担当者</InputLabel>
                <Select label="営業担当者">
                  <MenuItem value="">選択してください</MenuItem>
                </Select>
                <FormHelperText>必須です</FormHelperText>
              </FormControl>
            </Box>
          </Box>

          {/* その他 */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 3, color: '#1C2026' }}
            >
              その他
            </Typography>
            <TextField fullWidth label="備考" multiline rows={4} />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ConstructionRegistration;
