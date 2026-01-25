import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  DragIndicator as DragIndicatorIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import Sidebar from '../components/Layout/Sidebar';

type PageType = 'dashboard' | 'construction-list' | 'estimate-list' | 'construction-registration' | 'construction-detail' | 'construction-category' | 'construction-type' | 'building-usage' | 'client' | 'user' | 'company' | 'subcontractor-bulk' | 'subcontractor' | 'work-type' | 'material' | 'lease-item' | 'common-temporary' | 'site-expense' | 'screen-permission' | 'screen-permission-template' | 'workflow-template' | 'accounting-integration';

interface CommonTemporarySettingsProps {
  onNavigate?: (page: PageType) => void;
}

interface CommonTemporaryItem {
  id: number;
  科目番号: number;
  科目名: string;
  表示: '表示' | '非表示';
  客出科目名: string;
}

const CommonTemporarySettings: React.FC<CommonTemporarySettingsProps> = ({ onNavigate }) => {
  // 初期データ（UIスクリーンショットに基づく13項目）
  const [items, setItems] = useState<CommonTemporaryItem[]>([
    { id: 1, 科目番号: 1, 科目名: '環境安全費', 表示: '表示', 客出科目名: '安全施設費' },
    { id: 2, 科目番号: 2, 科目名: '屋外整理清掃費', 表示: '表示', 客出科目名: '準備費' },
    { id: 3, 科目番号: 3, 科目名: '動力用水光熱費', 表示: '表示', 客出科目名: '動力用水光熱費' },
    { id: 4, 科目番号: 4, 科目名: '機械器具費', 表示: '表示', 客出科目名: '機械器具費' },
    { id: 5, 科目番号: 5, 科目名: '仮設建物費', 表示: '表示', 客出科目名: '仮設建物費' },
    { id: 6, 科目番号: 6, 科目名: '準備費', 表示: '表示', 客出科目名: '仮設道路費' },
    { id: 7, 科目番号: 7, 科目名: '丁張り', 表示: '表示', 客出科目名: '準備費' },
    { id: 8, 科目番号: 8, 科目名: '試験費・調査費', 表示: '表示', 客出科目名: '試験費' },
    { id: 9, 科目番号: 9, 科目名: 'その他', 表示: '表示', 客出科目名: 'その他' },
    { id: 10, 科目番号: 10, 科目名: '社内損料費', 表示: '表示', 客出科目名: 'その他' },
    { id: 11, 科目番号: 11, 科目名: '一式', 表示: '非表示', 客出科目名: '一式' },
    { id: 12, 科目番号: 12, 科目名: '運搬費', 表示: '非表示', 客出科目名: '運搬費' },
    { id: 13, 科目番号: 13, 科目名: '工事施設費', 表示: '非表示', 客出科目名: '工事施設費' },
  ]);

  const [draggedItem, setDraggedItem] = useState<CommonTemporaryItem | null>(null);

  // 表示/非表示の変更
  const handleDisplayChange = (id: number, value: '表示' | '非表示') => {
    setItems(items.map(item => {
      // 社内損料費は非表示に設定できない
      if (item.id === id) {
        if (item.科目名 === '社内損料費' && value === '非表示') {
          return item; // 変更を無視
        }
        return { ...item, 表示: value };
      }
      return item;
    }));
  };

  // 客出科目名の変更
  const handleClientOutputNameChange = (id: number, value: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, 客出科目名: value } : item
    ));
  };

  // ドラッグ開始
  const handleDragStart = (item: CommonTemporaryItem) => {
    setDraggedItem(item);
  };

  // ドラッグオーバー
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // ドロップ
  const handleDrop = (targetItem: CommonTemporaryItem) => {
    if (!draggedItem || draggedItem.id === targetItem.id) {
      return;
    }

    const draggedIndex = items.findIndex(item => item.id === draggedItem.id);
    const targetIndex = items.findIndex(item => item.id === targetItem.id);

    const newItems = [...items];
    newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);

    // 科目番号を振り直す
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      科目番号: index + 1,
    }));

    setItems(updatedItems);
    setDraggedItem(null);
  };

  // 保存処理
  const handleSave = () => {
    // TODO: 実際の保存処理を実装
    console.log('保存:', items);
    alert('設定を保存しました');
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
      <Sidebar currentPage="common-temporary" onNavigate={onNavigate} />

      <Box sx={{ flex: 1, p: 3 }}>
        {/* ページタイトルと保存ボタン */}
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
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#1D1D1F', fontSize: 28 }}>
              共通仮設費科目設定
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{
              bgcolor: '#007AFF',
              '&:hover': {
                bgcolor: '#0051D5',
              },
              textTransform: 'none',
              fontSize: '0.875rem',
              borderRadius: '8px',
            }}
          >
            保存
          </Button>
        </Box>

      {/* 説明文 */}
      <Box sx={{ mb: 3, p: 2, bgcolor: '#FFF9E6', borderRadius: 1, border: '1px solid #FFE082' }}>
        <Typography variant="body2" sx={{ color: '#666666', mb: 1 }}>
          表示・非表示を設定します。
        </Typography>
        <Typography variant="body2" sx={{ color: '#666666', fontSize: '0.75rem' }}>
          ※科目内現場は非表示にできません
        </Typography>
      </Box>

        {/* テーブル */}
        <TableContainer
          component={Paper}
          sx={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: 'none',
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#E3F2FD' }}>
                <TableCell sx={{ fontWeight: 600, width: 60, fontSize: '0.875rem' }}>
                  科目<br />番号
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  科目名
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: 180, fontSize: '0.875rem' }}>
                  表示
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  客出科目名
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(item)}
                  sx={{
                    '&:hover': { bgcolor: '#F9F9F9' },
                    cursor: 'grab',
                    '&:active': { cursor: 'grabbing' },
                  }}
                >
                  <TableCell sx={{ fontSize: '0.875rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton size="small" sx={{ color: '#999999', cursor: 'grab' }}>
                        <DragIndicatorIcon fontSize="small" />
                      </IconButton>
                      {item.科目番号}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    {item.科目名}
                  </TableCell>
                  <TableCell>
                    {item.科目名 === '社内損料費' ? (
                      <Box>
                        <RadioGroup
                          row
                          value={item.表示}
                          onChange={(e) => handleDisplayChange(item.id, e.target.value as '表示' | '非表示')}
                        >
                          <FormControlLabel
                            value="表示"
                            control={<Radio size="small" sx={{ color: '#007AFF', '&.Mui-checked': { color: '#007AFF' } }} />}
                            label={<Typography sx={{ fontSize: '0.875rem' }}>表示</Typography>}
                          />
                          <FormControlLabel
                            value="非表示"
                            control={<Radio size="small" disabled />}
                            label={<Typography sx={{ fontSize: '0.875rem' }}>非表示</Typography>}
                          />
                        </RadioGroup>
                        <Typography sx={{ fontSize: '0.75rem', color: '#FF9800', mt: 0.5 }}>
                          社内損料費は非表示に設定できません
                        </Typography>
                      </Box>
                    ) : (
                      <RadioGroup
                        row
                        value={item.表示}
                        onChange={(e) => handleDisplayChange(item.id, e.target.value as '表示' | '非表示')}
                      >
                        <FormControlLabel
                          value="表示"
                          control={<Radio size="small" sx={{ color: '#007AFF', '&.Mui-checked': { color: '#007AFF' } }} />}
                          label={<Typography sx={{ fontSize: '0.875rem' }}>表示</Typography>}
                        />
                        <FormControlLabel
                          value="非表示"
                          control={<Radio size="small" sx={{ color: '#007AFF', '&.Mui-checked': { color: '#007AFF' } }} />}
                          label={<Typography sx={{ fontSize: '0.875rem' }}>非表示</Typography>}
                        />
                      </RadioGroup>
                    )}
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={item.客出科目名}
                      onChange={(e) => handleClientOutputNameChange(item.id, e.target.value)}
                      size="small"
                      fullWidth
                      sx={{
                        '& .MuiInputBase-input': {
                          fontSize: '0.875rem',
                        },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 注意事項 */}
        <Box sx={{ mt: 2, p: 2, bgcolor: '#F5F5F5', borderRadius: 1 }}>
          <Typography variant="body2" sx={{ color: '#666666', fontSize: '0.75rem', mb: 0.5 }}>
            ・営出科目名を設定します。
          </Typography>
          <Typography variant="body2" sx={{ color: '#666666', fontSize: '0.75rem', mb: 0.5 }}>
            ・見積書に出力される営出科目名（デフォルト）
          </Typography>
          <Typography variant="body2" sx={{ color: '#666666', fontSize: '0.75rem', mb: 0.5 }}>
            ※見積積算修正画面で任意の営出科目名に変更可
          </Typography>
          <Typography variant="body2" sx={{ color: '#666666', fontSize: '0.75rem', mb: 0.5 }}>
            ・科目番号を変更します。
          </Typography>
          <Typography variant="body2" sx={{ color: '#666666', fontSize: '0.75rem', mb: 0.5 }}>
            ・ドラッグで並び順えをします。
          </Typography>
          <Typography variant="body2" sx={{ color: '#666666', fontSize: '0.75rem' }}>
            ※見積積算、実行予算には反映されません
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default CommonTemporarySettings;
