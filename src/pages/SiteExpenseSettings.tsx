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
} from '@mui/material';
import {
  Settings as SettingsIcon,
  DragIndicator as DragIndicatorIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

interface SiteExpenseItem {
  id: number;
  科目番号: number;
  科目名: string;
  表示: '表示' | '非表示';
}

const SiteExpenseSettings: React.FC = () => {
  // 初期データ（UIスクリーンショットに基づく12項目）
  const [items, setItems] = useState<SiteExpenseItem[]>([
    { id: 1, 科目番号: 1, 科目名: '給与人件費', 表示: '表示' },
    { id: 2, 科目番号: 2, 科目名: '旅費交通費', 表示: '表示' },
    { id: 3, 科目番号: 3, 科目名: '法定福利', 表示: '表示' },
    { id: 4, 科目番号: 4, 科目名: '事務用品費', 表示: '表示' },
    { id: 5, 科目番号: 5, 科目名: '通信費', 表示: '表示' },
    { id: 6, 科目番号: 6, 科目名: '租税公課', 表示: '表示' },
    { id: 7, 科目番号: 7, 科目名: '地代家賃', 表示: '表示' },
    { id: 8, 科目番号: 8, 科目名: '雑費', 表示: '表示' },
    { id: 9, 科目番号: 9, 科目名: '部門共通費', 表示: '表示' },
    { id: 10, 科目番号: 10, 科目名: '一般管理費', 表示: '表示' },
    { id: 11, 科目番号: 11, 科目名: '補償費', 表示: '非表示' },
    { id: 12, 科目番号: 12, 科目名: '一式', 表示: '非表示' },
  ]);

  const [draggedItem, setDraggedItem] = useState<SiteExpenseItem | null>(null);

  // 表示/非表示の変更
  const handleDisplayChange = (id: number, value: '表示' | '非表示') => {
    setItems(items.map(item =>
      item.id === id ? { ...item, 表示: value } : item
    ));
  };

  // ドラッグ開始
  const handleDragStart = (item: SiteExpenseItem) => {
    setDraggedItem(item);
  };

  // ドラッグオーバー
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // ドロップ
  const handleDrop = (targetItem: SiteExpenseItem) => {
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
            現場経費科目設定
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

      {/* テーブル */}
      <Paper sx={{ borderRadius: 1, overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#E8E8E8' }}>
                <TableCell sx={{ fontWeight: 600, width: 60, fontSize: '0.875rem' }}>
                  科目<br />番号
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  科目名
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: 180, fontSize: '0.875rem' }}>
                  表示
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
                    <RadioGroup
                      row
                      value={item.表示}
                      onChange={(e) => handleDisplayChange(item.id, e.target.value as '表示' | '非表示')}
                    >
                      <FormControlLabel
                        value="表示"
                        control={<Radio size="small" />}
                        label={<Typography sx={{ fontSize: '0.875rem' }}>表示</Typography>}
                      />
                      <FormControlLabel
                        value="非表示"
                        control={<Radio size="small" />}
                        label={<Typography sx={{ fontSize: '0.875rem' }}>非表示</Typography>}
                      />
                    </RadioGroup>
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

export default SiteExpenseSettings;
