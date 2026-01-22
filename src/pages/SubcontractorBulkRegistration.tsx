import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Alert,
  AlertTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';
import {
  Upload as UploadIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Close as CloseIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

interface SubcontractorData {
  業者コード: string;
  業者名: string;
  ふりがな?: string;
  部署名?: string;
  郵便番号?: string;
  住所?: string;
  住所2?: string;
  Email?: string;
  電話番号?: string;
  FAX?: string;
  担当部署名?: string;
  担当役職名?: string;
  担当者?: string;
  出来高割合?: number;
  現金支払月?: string;
  現金支払率?: number;
  支払月数?: number;
  支払率?: number;
}

interface ErrorMessage {
  行番号?: number;
  ファイル名: string;
  タイトル: string;
  エラーメッセージ: string;
}

const SubcontractorBulkRegistration: React.FC = () => {
  const [torihikisakiFile, setTorihikisakiFile] = useState<File | null>(null);
  const [hiritsuFile, setHiritsuFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errors, setErrors] = useState<ErrorMessage[]>([]);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewData] = useState<SubcontractorData | null>(null);

  // ファイル選択ハンドラー
  const handleTorihikisakiFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.csv')) {
      setTorihikisakiFile(file);
      setUploadSuccess(false);
      setErrors([]);
    } else {
      alert('CSVファイルを選択してください');
    }
  };

  const handleHiritsuFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.csv')) {
      setHiritsuFile(file);
      setUploadSuccess(false);
      setErrors([]);
    } else {
      alert('CSVファイルを選択してください');
    }
  };

  // CSVファイルの検証
  const validateCSV = (file: File, type: 'torihikisaki' | 'hiritsu'): Promise<ErrorMessage[]> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      const errors: ErrorMessage[] = [];

      reader.onload = (e) => {
        const content = e.target?.result as string;
        const lines = content.split('\n').filter(line => line.trim());

        // ファイルが空の場合
        if (lines.length === 0) {
          errors.push({
            ファイル名: file.name,
            タイトル: 'CSVファイルは空です。',
            エラーメッセージ: `${type === 'torihikisaki' ? '取引先' : '比率'}CSVファイルは空です。`,
          });
          resolve(errors);
          return;
        }

        // データ行を検証
        lines.forEach((line, index) => {
          if (index === 0) return; // ヘッダー行はスキップ

          const values = line.split(',');

          if (type === 'torihikisaki') {
            // A列（取引先コード）が空
            if (!values[0] || !values[0].trim()) {
              errors.push({
                行番号: index + 1,
                ファイル名: file.name,
                タイトル: '値が空です。',
                エラーメッセージ: '取引先CSVファイル：A列（取引先コード）は入力必須項目です。全て入力してください。',
              });
            }

            // C列（取引先正式名1）が空
            if (!values[2] || !values[2].trim()) {
              errors.push({
                行番号: index + 1,
                ファイル名: file.name,
                タイトル: '値が空です。',
                エラーメッセージ: '取引先CSVファイル：C列（取引先正式名1）は入力必須項目です。全て入力してください。',
              });
            }
          } else if (type === 'hiritsu') {
            // A列（仕入先コード）が空
            if (!values[0] || !values[0].trim()) {
              errors.push({
                行番号: index + 1,
                ファイル名: file.name,
                タイトル: '値が空です。',
                エラーメッセージ: '比率CSVファイル：A列（仕入先コード）は入力必須項目です。全て入力してください。',
              });
            }

            // L列（決済条件コード1）が空
            if (!values[11] || !values[11].trim()) {
              errors.push({
                行番号: index + 1,
                ファイル名: file.name,
                タイトル: '値が空です。',
                エラーメッセージ: '比率CSVファイル：L列（決済条件コード1）は入力必須項目です。全て入力してください。',
              });
            } else {
              // 支払条件のフォーマット検証（4桁の数字であること）
              const paymentCondition = values[11].trim();
              if (!/^\d{4}$/.test(paymentCondition)) {
                errors.push({
                  行番号: index + 1,
                  ファイル名: file.name,
                  タイトル: '支払条件のフォーマットが不正です。',
                  エラーメッセージ: '比率CSVファイルの決済条件コードは、L列（決済条件コード1）に4桁で入力してください。',
                });
              }
            }
          }
        });

        resolve(errors);
      };

      reader.readAsText(file);
    });
  };

  // アップロード処理
  const handleUpload = async () => {
    if (!torihikisakiFile || !hiritsuFile) {
      alert('取引先CSVと比率CSVの両方を選択してください');
      return;
    }

    setUploading(true);
    setErrors([]);
    setUploadSuccess(false);

    try {
      // CSVファイルを検証
      const torihikisakiErrors = await validateCSV(torihikisakiFile, 'torihikisaki');
      const hiritsuErrors = await validateCSV(hiritsuFile, 'hiritsu');
      const allErrors = [...torihikisakiErrors, ...hiritsuErrors];

      if (allErrors.length > 0) {
        setErrors(allErrors);
        setUploading(false);
        return;
      }

      // TODO: 実際のアップロード処理をここに実装
      // APIを呼び出してデータを登録する
      await new Promise(resolve => setTimeout(resolve, 2000)); // 仮の待機時間

      setUploadSuccess(true);
      setTorihikisakiFile(null);
      setHiritsuFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      setErrors([{
        ファイル名: '',
        タイトル: 'アップロードエラー',
        エラーメッセージ: 'ファイルのアップロード中にエラーが発生しました。',
      }]);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* ページタイトル */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1C2026' }}>
          外注業者一括登録
        </Typography>
      </Box>

      {/* 外注業者一括登録カード */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
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
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            外注業者一括登録
          </Typography>
        </Box>

        {/* ファイルアップロードセクション */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
          {/* 取引先CSV */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, fontSize: '0.875rem' }}>
              取引先CSV
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Button
                variant="outlined"
                component="label"
                sx={{
                  width: '100%',
                  justifyContent: 'space-between',
                  textTransform: 'none',
                  color: '#666666',
                  borderColor: '#CCCCCC',
                  bgcolor: '#FFFFFF',
                  py: 1,
                  px: 2,
                  fontSize: '0.875rem',
                  '&:hover': {
                    borderColor: '#999999',
                    bgcolor: '#FAFAFA',
                  },
                }}
              >
                <Box component="span" sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Box
                    component="span"
                    sx={{
                      bgcolor: '#E0E0E0',
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}
                  >
                    ファイルを選択
                  </Box>
                  <Box component="span" sx={{ color: torihikisakiFile ? '#1C2026' : '#999999' }}>
                    {torihikisakiFile ? torihikisakiFile.name : '選択されていません'}
                  </Box>
                </Box>
                <input
                  type="file"
                  accept=".csv"
                  hidden
                  onChange={handleTorihikisakiFileChange}
                />
              </Button>
            </Box>
          </Box>

          {/* 比率CSV */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, fontSize: '0.875rem' }}>
              比率CSV
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Button
                variant="outlined"
                component="label"
                sx={{
                  width: '100%',
                  justifyContent: 'space-between',
                  textTransform: 'none',
                  color: '#666666',
                  borderColor: '#CCCCCC',
                  bgcolor: '#FFFFFF',
                  py: 1,
                  px: 2,
                  fontSize: '0.875rem',
                  '&:hover': {
                    borderColor: '#999999',
                    bgcolor: '#FAFAFA',
                  },
                }}
              >
                <Box component="span" sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Box
                    component="span"
                    sx={{
                      bgcolor: '#E0E0E0',
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}
                  >
                    ファイルを選択
                  </Box>
                  <Box component="span" sx={{ color: hiritsuFile ? '#1C2026' : '#999999' }}>
                    {hiritsuFile ? hiritsuFile.name : '選択されていません'}
                  </Box>
                </Box>
                <input
                  type="file"
                  accept=".csv"
                  hidden
                  onChange={handleHiritsuFileChange}
                />
              </Button>
            </Box>
          </Box>

          {/* アップロードボタン */}
          <Box>
            <Button
              variant="contained"
              startIcon={<UploadIcon />}
              onClick={handleUpload}
              disabled={!torihikisakiFile || !hiritsuFile || uploading}
              sx={{
                bgcolor: '#5DADE2',
                color: '#FFFFFF',
                '&:hover': {
                  bgcolor: '#3498DB',
                },
                '&:disabled': {
                  bgcolor: '#CCCCCC',
                  color: '#FFFFFF',
                },
                textTransform: 'none',
                px: 3,
                py: 1,
                fontSize: '0.875rem',
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}
            >
              {uploading ? 'アップロード中...' : 'アップロード'}
            </Button>
          </Box>
        </Box>

        {/* 成功メッセージ */}
        {uploadSuccess && (
          <Alert
            icon={<CheckCircleIcon />}
            severity="success"
            sx={{ mt: 3 }}
          >
            <AlertTitle>アップロード成功</AlertTitle>
            外注業者データが正常に登録されました。
          </Alert>
        )}

        {/* エラーメッセージ */}
        {errors.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Alert
              icon={<ErrorIcon />}
              severity="error"
              sx={{ mb: 2 }}
            >
              <AlertTitle>取り込みエラー</AlertTitle>
              入力内容に誤りがあると、取り込みに失敗し、エラー詳細が表示されます。
            </Alert>

            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#F6F6F6' }}>
                    <TableCell sx={{ fontWeight: 600 }}>ファイル名</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>行番号</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>タイトル</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>エラーメッセージ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {errors.map((error, index) => (
                    <TableRow key={index}>
                      <TableCell>{error.ファイル名}</TableCell>
                      <TableCell>{error.行番号 || '—'}</TableCell>
                      <TableCell>{error.タイトル}</TableCell>
                      <TableCell>{error.エラーメッセージ}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Paper>

      {/* ポイント */}
      <Paper
        sx={{
          p: 2,
          bgcolor: '#FFF9E6',
          borderRadius: 2,
          borderLeft: '4px solid #FF9800',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#FF9800', mb: 1 }}>
          ●ポイント
        </Typography>
        <Typography variant="body2" sx={{ color: '#666666', mb: 0.5 }}>
          • 外注業者一括登録で使用するCSVファイルは、その他・設定 &gt; 外注業者登録画面から出力したCSVファイルと同じフォーマットです。
        </Typography>
        <Typography variant="body2" sx={{ color: '#666666', mb: 0.5 }}>
          • 取り込みは何度でも可能です。業者コードに紐づいて上書き登録されます。
        </Typography>
        <Typography variant="body2" sx={{ color: '#666666', mb: 0.5 }}>
          • 出来高割合(%)は、90%で取り込まれます。
        </Typography>
        <Typography variant="body2" sx={{ color: '#666666' }}>
          • 比率CSVの仕入先コードは、取引先CSVファイルに入力した業者コードと一致させてください。同一の外注業者と判断して登録します。
        </Typography>
      </Paper>

      {/* プレビューダイアログ */}
      <Dialog
        open={previewDialogOpen}
        onClose={() => setPreviewDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          登録内容修正
          <IconButton onClick={() => setPreviewDialogOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2, color: '#666666' }}>
            項目を修正し、よろしければ「保存」を押してください。
          </Typography>

          {previewData && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="業者名"
                value={previewData.業者名}
                fullWidth
                size="small"
              />
              <TextField
                label="業者コード"
                value={previewData.業者コード}
                fullWidth
                size="small"
              />
              <TextField
                label="ふりがな"
                value={previewData.ふりがな}
                fullWidth
                size="small"
              />
              <TextField
                label="部署名"
                value={previewData.部署名}
                fullWidth
                size="small"
              />
              <TextField
                label="郵便番号"
                value={previewData.郵便番号}
                fullWidth
                size="small"
              />
              <TextField
                label="住所"
                value={previewData.住所}
                fullWidth
                size="small"
              />
              <TextField
                label="住所(営業所)"
                value={previewData.住所2}
                fullWidth
                size="small"
              />
              <TextField
                label="Email"
                value={previewData.Email}
                fullWidth
                size="small"
              />
              <TextField
                label="電話番号"
                value={previewData.電話番号}
                fullWidth
                size="small"
              />
              <TextField
                label="FAX"
                value={previewData.FAX}
                fullWidth
                size="small"
              />
              <TextField
                label="担当部署名"
                value={previewData.担当部署名}
                fullWidth
                size="small"
              />
              <TextField
                label="担当役職名"
                value={previewData.担当役職名}
                fullWidth
                size="small"
              />
              <TextField
                label="担当者"
                value={previewData.担当者}
                fullWidth
                size="small"
              />
              <Box sx={{ display: 'flex', gap: 2, bgcolor: '#F6F6F6', p: 2, borderRadius: 1 }}>
                <TextField
                  label="出来高割合"
                  value={previewData.出来高割合}
                  size="small"
                  InputProps={{
                    endAdornment: '%',
                  }}
                  sx={{ flex: 1 }}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, bgcolor: '#F6F6F6', p: 2, borderRadius: 1 }}>
                <TextField
                  label="現金支払"
                  value={previewData.現金支払月}
                  size="small"
                  sx={{ width: 100 }}
                />
                <TextField
                  value={previewData.現金支払率}
                  size="small"
                  InputProps={{
                    endAdornment: '%',
                  }}
                  sx={{ width: 100 }}
                />
                <TextField
                  value={`${previewData.支払月数}ヶ月`}
                  size="small"
                  sx={{ width: 100 }}
                />
                <TextField
                  value={previewData.支払率}
                  size="small"
                  InputProps={{
                    endAdornment: '%',
                  }}
                  sx={{ width: 100 }}
                />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setPreviewDialogOpen(false)} variant="outlined">
            キャンセル
          </Button>
          <Button onClick={() => setPreviewDialogOpen(false)} variant="contained">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubcontractorBulkRegistration;
