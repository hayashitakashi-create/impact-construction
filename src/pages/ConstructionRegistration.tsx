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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Link,
} from '@mui/material';
import {
  Construction as ConstructionIcon,
  Close as CloseIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  AttachFile as AttachFileIcon,
  Visibility as VisibilityIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import { useRegistration, Client } from '../contexts/RegistrationContext';

// テキストファイルプレビューコンポーネント
const TextFilePreview: React.FC<{ file: File }> = ({ file }) => {
  const [textContent, setTextContent] = React.useState<string>('読み込み中...');

  React.useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setTextContent(e.target?.result as string || 'テキストを読み込めませんでした');
    };
    reader.onerror = () => {
      setTextContent('テキストの読み込み中にエラーが発生しました');
    };
    reader.readAsText(file);
  }, [file]);

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto', bgcolor: '#FFFFFF', p: 2, borderRadius: 1 }}>
      <Typography component="pre" sx={{ fontSize: '0.875rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        {textContent}
      </Typography>
    </Box>
  );
};

const ConstructionRegistration: React.FC = () => {
  const { categories, constructionTypes, buildingUsages, clients, users } = useRegistration();
  const [orderStatus, setOrderStatus] = useState('見積中');
  const [constructionCategory, setConstructionCategory] = useState('');
  const [constructionDivision, setConstructionDivision] = useState('');
  const [buildingUsage, setBuildingUsage] = useState('');
  const [constructionName, setConstructionName] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [openClientDialog, setOpenClientDialog] = useState(false);
  const [prefecture, setPrefecture] = useState('');
  const [constructionLocation, setConstructionLocation] = useState('');
  const [siteArea, setSiteArea] = useState('');
  const [constructionAmount, setConstructionAmount] = useState('');
  const [contractPeriodStart, setContractPeriodStart] = useState('');
  const [contractPeriodEnd, setContractPeriodEnd] = useState('');
  const [plannedPeriodStart, setPlannedPeriodStart] = useState('');
  const [plannedPeriodEnd, setPlannedPeriodEnd] = useState('');
  const [consumptionTax, setConsumptionTax] = useState('0');
  const [estimatedOrderAmount, setEstimatedOrderAmount] = useState('');
  const [contractDate, setContractDate] = useState('');
  const [deliveryPeriod, setDeliveryPeriod] = useState('');
  const [taxRate, setTaxRate] = useState(10); // 消費税率（デフォルト10%）
  const [openTaxDialog, setOpenTaxDialog] = useState(false);

  // 関係者情報
  const [siteAgent, setSiteAgent] = useState(''); // 現場代理人
  const [assignedStaff, setAssignedStaff] = useState(''); // 配置職員
  const [systemUser, setSystemUser] = useState(''); // システム利用者
  const [salesPerson, setSalesPerson] = useState(''); // 営業担当者

  // ファイル添付
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // ファイルプレビュー
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  // 支払い条件
  const [paymentRows, setPaymentRows] = useState([
    { id: 1, memo: '1回目', deadline: '', amount: '' },
    { id: 2, memo: '2回目', deadline: '', amount: '' },
    { id: 3, memo: '3回目', deadline: '', amount: '' },
  ]);

  // 支払い回数は行数と連動
  const paymentCount = paymentRows.length;

  // 工種グループの重複を除いたリストを作成
  const workGroups = useMemo(() => {
    const uniqueGroups = Array.from(new Set(constructionTypes.map(type => type.workGroup)));
    return uniqueGroups;
  }, [constructionTypes]);

  // 契約工期の日数を計算
  const contractPeriodDays = useMemo(() => {
    if (!contractPeriodStart || !contractPeriodEnd) return 0;
    const start = new Date(contractPeriodStart);
    const end = new Date(contractPeriodEnd);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : 0;
  }, [contractPeriodStart, contractPeriodEnd]);

  // 計画工期の日数を計算
  const plannedPeriodDays = useMemo(() => {
    if (!plannedPeriodStart || !plannedPeriodEnd) return 0;
    const start = new Date(plannedPeriodStart);
    const end = new Date(plannedPeriodEnd);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : 0;
  }, [plannedPeriodStart, plannedPeriodEnd]);

  // 工事金額の数値を取得（カンマなし）
  const constructionAmountNumber = useMemo(() => {
    const num = parseFloat(constructionAmount.replace(/,/g, ''));
    return isNaN(num) ? 0 : num;
  }, [constructionAmount]);

  // 消費税額を自動計算
  const calculatedConsumptionTax = useMemo(() => {
    return Math.floor(constructionAmountNumber * (taxRate / 100));
  }, [constructionAmountNumber, taxRate]);

  // 消費税額が計算値と異なる場合は自動更新
  React.useEffect(() => {
    setConsumptionTax(calculatedConsumptionTax.toLocaleString());
  }, [calculatedConsumptionTax]);

  // 工事金額の入力処理（カンマ区切り）
  const handleConstructionAmountChange = (value: string) => {
    // 数字とカンマ以外を除去
    const numericValue = value.replace(/[^\d]/g, '');
    // 数値にカンマを追加
    if (numericValue) {
      const formatted = parseInt(numericValue, 10).toLocaleString();
      setConstructionAmount(formatted);
    } else {
      setConstructionAmount('');
    }
  };

  // 受注想定額の入力処理（カンマ区切り）
  const handleEstimatedOrderAmountChange = (value: string) => {
    // 数字とカンマ以外を除去
    const numericValue = value.replace(/[^\d]/g, '');
    // 数値にカンマを追加
    if (numericValue) {
      const formatted = parseInt(numericValue, 10).toLocaleString();
      setEstimatedOrderAmount(formatted);
    } else {
      setEstimatedOrderAmount('');
    }
  };

  // 支払い行を追加
  const handleAddPaymentRow = () => {
    const newId = Math.max(...paymentRows.map(row => row.id), 0) + 1;
    const newRow = { id: newId, memo: `${paymentRows.length + 1}回目`, deadline: '', amount: '' };
    setPaymentRows([...paymentRows, newRow]);
  };

  // 支払い行を削除
  const handleDeletePaymentRow = (id: number) => {
    setPaymentRows(paymentRows.filter(row => row.id !== id));
  };

  // 支払い行の値を更新
  const handlePaymentRowChange = (id: number, field: 'memo' | 'deadline' | 'amount', value: string) => {
    setPaymentRows(paymentRows.map(row => {
      if (row.id === id) {
        if (field === 'amount') {
          // 金額の場合はカンマ区切りで処理
          const numericValue = value.replace(/[^\d]/g, '');
          const formatted = numericValue ? parseInt(numericValue, 10).toLocaleString() : '';
          return { ...row, [field]: formatted };
        }
        return { ...row, [field]: value };
      }
      return row;
    }));
  };

  // 支払い合計金額を計算
  const paymentTotalAmount = useMemo(() => {
    const total = paymentRows.reduce((sum, row) => {
      const amount = parseFloat(row.amount.replace(/,/g, ''));
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
    return total.toLocaleString();
  }, [paymentRows]);

  // 都道府県リスト
  const prefectures = [
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
    '岐阜県', '静岡県', '愛知県', '三重県',
    '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
    '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県',
    '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県',
    '沖縄県'
  ];

  // 発注者の表示名を取得
  const getClientDisplayName = (client: Client) => {
    return client.corporateName || client.individualName;
  };

  // 発注者を選択
  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setOpenClientDialog(false);
  };

  // ファイルサイズチェック（20MB制限）
  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

  // ファイルのバリデーションと追加
  const handleFileAdd = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newFiles: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name} のサイズが20MBを超えています。`);
      } else {
        newFiles.push(file);
      }
    });

    if (errors.length > 0) {
      setFileError(errors.join('\n'));
      setTimeout(() => setFileError(''), 5000);
    }

    if (newFiles.length > 0) {
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  // ドラッグオーバー
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // ドラッグリーブ
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // ドロップ
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileAdd(e.dataTransfer.files);
  };

  // ファイル選択
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileAdd(e.target.files);
    // inputをリセット（同じファイルを再選択できるように）
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // ファイル削除
  const handleFileDelete = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  // ファイルサイズをフォーマット
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  // ファイルタイプを判定
  const getFileType = (file: File): 'image' | 'pdf' | 'text' | 'other' => {
    const type = file.type.toLowerCase();
    const name = file.name.toLowerCase();

    if (type.startsWith('image/')) return 'image';
    if (type === 'application/pdf' || name.endsWith('.pdf')) return 'pdf';
    if (type.startsWith('text/') || name.endsWith('.txt') || name.endsWith('.csv')) return 'text';
    return 'other';
  };

  // ファイルプレビューを開く
  const handleFilePreview = (index: number) => {
    const file = uploadedFiles[index];
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setPreviewIndex(index);
    setOpenPreviewDialog(true);
  };

  // プレビューダイアログを閉じる
  const handleClosePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setOpenPreviewDialog(false);
    setPreviewUrl('');
  };

  // 前のファイルへ移動
  const handlePreviousFile = () => {
    if (previewIndex > 0) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      handleFilePreview(previewIndex - 1);
    }
  };

  // 次のファイルへ移動
  const handleNextFile = () => {
    if (previewIndex < uploadedFiles.length - 1) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      handleFilePreview(previewIndex + 1);
    }
  };

  // クリーンアップ: プレビューURLを解放
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // 必須項目のバリデーション
  const isFormValid = useMemo(() => {
    return (
      constructionCategory !== '' &&
      constructionDivision !== '' &&
      buildingUsage !== '' &&
      constructionName.trim() !== '' &&
      selectedClient !== null &&
      prefecture !== '' &&
      constructionLocation.trim() !== '' &&
      salesPerson !== ''
    );
  }, [
    constructionCategory,
    constructionDivision,
    buildingUsage,
    constructionName,
    selectedClient,
    prefecture,
    constructionLocation,
    salesPerson,
  ]);

  // 保存処理
  const handleSave = () => {
    if (!isFormValid) return;

    // TODO: 実際の保存処理を実装
    alert('工事情報を保存しました');
  };

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
            {!isFormValid ? (
              <Typography sx={{ color: '#DC1D1D', fontSize: '0.875rem' }}>
                入力内容に誤りのある箇所があるため保存できません。
              </Typography>
            ) : (
              <Box />
            )}
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!isFormValid}
              sx={{
                bgcolor: isFormValid ? '#42A5F5' : '#B0BEC5',
                color: '#FFFFFF',
                '&:hover': { bgcolor: isFormValid ? '#1E88E5' : '#90A4AE' },
                '&:disabled': {
                  bgcolor: '#B0BEC5',
                  color: '#FFFFFF',
                },
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
                  value="見積中"
                  control={<Radio sx={{ color: '#0078C8', '&.Mui-checked': { color: '#0078C8' } }} />}
                  label="見積中"
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
                <FormControl fullWidth required error={!constructionCategory}>
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
                  <FormHelperText>{!constructionCategory ? '必須です' : ''}</FormHelperText>
                </FormControl>
                <TextField
                  fullWidth
                  label="工事番号"
                  helperText="※ 1文字以上・契約工期の入力後に表示されます"
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl fullWidth required error={!constructionDivision}>
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
                  <FormHelperText>{!constructionDivision ? '必須です' : ''}</FormHelperText>
                </FormControl>
                <FormControl fullWidth required error={!buildingUsage}>
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
                  <FormHelperText>{!buildingUsage ? '必須です' : ''}</FormHelperText>
                </FormControl>
              </Box>

              <TextField
                fullWidth
                required
                error={!constructionName.trim()}
                label="工事名"
                value={constructionName}
                onChange={(e) => setConstructionName(e.target.value)}
                helperText={!constructionName.trim() ? '必須です' : ''}
              />

              <TextField fullWidth label="工事メモ" multiline rows={2} />

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <TextField
                  fullWidth
                  required
                  error={!selectedClient}
                  label="発注者"
                  value={selectedClient ? getClientDisplayName(selectedClient) : ''}
                  helperText={!selectedClient ? "必須です" : ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => setOpenClientDialog(true)}
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
                <FormControl fullWidth required error={!prefecture}>
                  <InputLabel>都道府県</InputLabel>
                  <Select
                    label="都道府県"
                    value={prefecture}
                    onChange={(e) => setPrefecture(e.target.value)}
                  >
                    <MenuItem value="">選択してください</MenuItem>
                    {prefectures.map((pref) => (
                      <MenuItem key={pref} value={pref}>
                        {pref}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{!prefecture ? '必須です' : ''}</FormHelperText>
                </FormControl>
                <TextField
                  fullWidth
                  required
                  error={!constructionLocation}
                  label="工事場所"
                  value={constructionLocation}
                  onChange={(e) => setConstructionLocation(e.target.value)}
                  helperText={!constructionLocation ? '必須です' : ''}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80 }}>契約工期</Typography>
                  <TextField
                    type="date"
                    value={contractPeriodStart}
                    onChange={(e) => setContractPeriodStart(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                  <Typography>〜</Typography>
                  <TextField
                    type="date"
                    value={contractPeriodEnd}
                    onChange={(e) => setContractPeriodEnd(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                  <Typography>({contractPeriodDays}日)</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    label="工事金額"
                    value={constructionAmount}
                    onChange={(e) => handleConstructionAmountChange(e.target.value)}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">円</InputAdornment>,
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80 }}>計画工期</Typography>
                  <TextField
                    type="date"
                    value={plannedPeriodStart}
                    onChange={(e) => setPlannedPeriodStart(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                  <Typography>〜</Typography>
                  <TextField
                    type="date"
                    value={plannedPeriodEnd}
                    onChange={(e) => setPlannedPeriodEnd(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                  <Typography>({plannedPeriodDays}日)</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    label="消費税額"
                    value={consumptionTax}
                    InputProps={{
                      readOnly: true,
                      endAdornment: <InputAdornment position="end">円</InputAdornment>,
                    }}
                    helperText={
                      <Link
                        component="button"
                        variant="body2"
                        onClick={() => setOpenTaxDialog(true)}
                        sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        工事金額の{taxRate}%で自動計算
                      </Link>
                    }
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    label="契約日"
                    type="date"
                    value={contractDate}
                    onChange={(e) => setContractDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    label="受注想定額"
                    value={estimatedOrderAmount}
                    onChange={(e) => handleEstimatedOrderAmountChange(e.target.value)}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">円</InputAdornment>,
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ minWidth: 80 }}>引渡し期間</Typography>
                <Typography>契約工期終了日から</Typography>
                <TextField
                  value={deliveryPeriod}
                  onChange={(e) => setDeliveryPeriod(e.target.value)}
                  size="small"
                  sx={{ width: 100 }}
                />
                <Typography>日以内</Typography>
              </Box>

              {/* 支払い条件 */}
              <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Typography>支払い回数 {paymentCount}回</Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddPaymentRow}
                    size="small"
                    sx={{
                      borderColor: '#0078C8',
                      color: '#0078C8',
                      '&:hover': { borderColor: '#005A9C', bgcolor: '#F5F5F5' },
                    }}
                  >
                    行追加
                  </Button>
                </Box>

                <TableContainer component={Paper} sx={{ mb: 2 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#B0BEC5' }}>
                        <TableCell sx={{ color: '#1C2026', fontWeight: 600, width: 60 }}>削除</TableCell>
                        <TableCell sx={{ color: '#1C2026', fontWeight: 600 }}>メモ</TableCell>
                        <TableCell sx={{ color: '#1C2026', fontWeight: 600 }}>期限</TableCell>
                        <TableCell sx={{ color: '#1C2026', fontWeight: 600 }}>金額</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paymentRows.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>
                            <IconButton
                              onClick={() => handleDeletePaymentRow(row.id)}
                              size="small"
                              sx={{ color: '#DC1D1D' }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={row.memo}
                              onChange={(e) => handlePaymentRowChange(row.id, 'memo', e.target.value)}
                              size="small"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="date"
                              value={row.deadline}
                              onChange={(e) => handlePaymentRowChange(row.id, 'deadline', e.target.value)}
                              size="small"
                              InputLabelProps={{ shrink: true }}
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={row.amount}
                              onChange={(e) => handlePaymentRowChange(row.id, 'amount', e.target.value)}
                              size="small"
                              fullWidth
                              InputProps={{
                                endAdornment: <InputAdornment position="end">円</InputAdornment>,
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600 }}>合計金額</Typography>
                  <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: '#0078C8' }}>
                    {paymentTotalAmount}円
                  </Typography>
                </Box>
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
                <Select
                  label="現場代理人"
                  value={siteAgent}
                  onChange={(e) => setSiteAgent(e.target.value)}
                >
                  <MenuItem value="">選択してください</MenuItem>
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id.toString()}>
                      {user.lastName} {user.firstName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>配置職員</InputLabel>
                <Select
                  label="配置職員"
                  value={assignedStaff}
                  onChange={(e) => setAssignedStaff(e.target.value)}
                >
                  <MenuItem value="">選択してください</MenuItem>
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id.toString()}>
                      {user.lastName} {user.firstName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>システム利用者</InputLabel>
                <Select
                  label="システム利用者"
                  value={systemUser}
                  onChange={(e) => setSystemUser(e.target.value)}
                >
                  <MenuItem value="">選択してください</MenuItem>
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id.toString()}>
                      {user.lastName} {user.firstName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth required error={!salesPerson}>
                <InputLabel>営業担当者</InputLabel>
                <Select
                  label="営業担当者"
                  value={salesPerson}
                  onChange={(e) => setSalesPerson(e.target.value)}
                >
                  <MenuItem value="">選択してください</MenuItem>
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id.toString()}>
                      {user.lastName} {user.firstName}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{!salesPerson ? '必須です' : ''}</FormHelperText>
              </FormControl>
            </Box>
          </Box>

          {/* 注文書 */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 3, color: '#1C2026' }}
            >
              注文書
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="注文書支払条件(その他)"
                multiline
                rows={4}
              />
              <TextField
                fullWidth
                label="注文請書支払条件(その他)"
                multiline
                rows={4}
              />
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField fullWidth label="備考" multiline rows={4} />
              <Box>
                <Typography sx={{ mb: 1, color: '#666666' }}>
                  ファイル（1ファイル最大20MB）
                </Typography>

                {/* ファイルエラーメッセージ */}
                {fileError && (
                  <Box sx={{ mb: 2, p: 2, bgcolor: '#FFEBEE', borderRadius: 1, border: '1px solid #FFCDD2' }}>
                    <Typography sx={{ color: '#C62828', fontSize: '0.875rem', whiteSpace: 'pre-line' }}>
                      {fileError}
                    </Typography>
                  </Box>
                )}

                {/* ドラッグ&ドロップエリア */}
                <Box
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    border: `2px dashed ${isDragging ? '#0078C8' : '#B0BEC5'}`,
                    borderRadius: 1,
                    p: 4,
                    textAlign: 'center',
                    bgcolor: isDragging ? '#E3F2FD' : '#F5F5F5',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: '#EEEEEE',
                      borderColor: '#90A4AE',
                    },
                  }}
                >
                  <AttachFileIcon sx={{ fontSize: 48, color: '#B0BEC5', mb: 1 }} />
                  <Typography sx={{ color: '#666666', mb: 0.5 }}>
                    ファイルをドラッグ&ドロップ
                  </Typography>
                  <Typography sx={{ color: '#666666', fontSize: '0.875rem' }}>
                    または クリックして選択
                  </Typography>
                </Box>

                {/* 隠しファイル入力 */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />

                {/* 添付ファイルリスト */}
                {uploadedFiles.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#666666', mb: 1 }}>
                      添付ファイル（{uploadedFiles.length}件）
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {uploadedFiles.map((file, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 1.5,
                            bgcolor: '#FFFFFF',
                            border: '1px solid #E0E0E0',
                            borderRadius: 1,
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                            <AttachFileIcon sx={{ fontSize: 20, color: '#666666' }} />
                            <Box sx={{ flex: 1 }}>
                              <Typography sx={{ fontSize: '0.875rem', color: '#1C2026' }}>
                                {file.name}
                              </Typography>
                              <Typography sx={{ fontSize: '0.75rem', color: '#999999' }}>
                                {formatFileSize(file.size)}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleFilePreview(index)}
                              sx={{ color: '#42A5F5' }}
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleFileDelete(index)}
                              sx={{ color: '#DC1D1D' }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* 発注者選択ダイアログ */}
        <Dialog
          open={openClientDialog}
          onClose={() => setOpenClientDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>発注者を選択</Typography>
            <IconButton onClick={() => setOpenClientDialog(false)} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#B0BEC5' }}>
                    <TableCell sx={{ color: '#1C2026', fontWeight: 600, width: 100 }}>選択</TableCell>
                    <TableCell sx={{ color: '#1C2026', fontWeight: 600 }}>発注者名</TableCell>
                    <TableCell sx={{ color: '#1C2026', fontWeight: 600 }}>住所</TableCell>
                    <TableCell sx={{ color: '#1C2026', fontWeight: 600 }}>電話番号</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow
                      key={client.id}
                      sx={{
                        '&:hover': { bgcolor: '#F5F5F5', cursor: 'pointer' },
                        bgcolor: selectedClient?.id === client.id ? '#E3F2FD' : 'inherit'
                      }}
                    >
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleSelectClient(client)}
                          sx={{
                            bgcolor: '#42A5F5',
                            color: '#FFFFFF',
                            '&:hover': { bgcolor: '#1E88E5' },
                          }}
                        >
                          選択
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Typography>{getClientDisplayName(client)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{client.address}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{client.phone}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={() => setOpenClientDialog(false)}
              sx={{
                bgcolor: '#B0BEC5',
                color: '#FFFFFF',
                '&:hover': { bgcolor: '#90A4AE' },
              }}
            >
              キャンセル
            </Button>
          </DialogActions>
        </Dialog>

        {/* 消費税設定ダイアログ */}
        <Dialog
          open={openTaxDialog}
          onClose={() => setOpenTaxDialog(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>消費税率設定</Typography>
            <IconButton onClick={() => setOpenTaxDialog(false)} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 3, color: '#666666' }}>
              消費税率を設定してください。
            </Typography>
            <TextField
              fullWidth
              label="消費税率"
              type="number"
              value={taxRate}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value) && value >= 0 && value <= 100) {
                  setTaxRate(value);
                }
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              inputProps={{
                min: 0,
                max: 100,
                step: 0.1,
              }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={() => setOpenTaxDialog(false)}
              sx={{
                bgcolor: '#B0BEC5',
                color: '#FFFFFF',
                '&:hover': { bgcolor: '#90A4AE' },
              }}
            >
              キャンセル
            </Button>
            <Button
              onClick={() => setOpenTaxDialog(false)}
              variant="contained"
              sx={{
                bgcolor: '#42A5F5',
                color: '#FFFFFF',
                '&:hover': { bgcolor: '#1E88E5' },
              }}
            >
              設定
            </Button>
          </DialogActions>
        </Dialog>

        {/* ファイルプレビューダイアログ */}
        <Dialog
          open={openPreviewDialog}
          onClose={handleClosePreview}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: {
              height: '90vh',
              maxHeight: '90vh',
            },
          }}
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                ファイルプレビュー
              </Typography>
              {uploadedFiles.length > 0 && (
                <Typography sx={{ color: '#666666', fontSize: '0.875rem' }}>
                  {previewIndex + 1} / {uploadedFiles.length}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={handlePreviousFile}
                disabled={previewIndex === 0}
                size="small"
                sx={{ color: previewIndex === 0 ? '#B0BEC5' : '#42A5F5' }}
              >
                <NavigateBeforeIcon />
              </IconButton>
              <IconButton
                onClick={handleNextFile}
                disabled={previewIndex === uploadedFiles.length - 1}
                size="small"
                sx={{ color: previewIndex === uploadedFiles.length - 1 ? '#B0BEC5' : '#42A5F5' }}
              >
                <NavigateNextIcon />
              </IconButton>
              <IconButton onClick={handleClosePreview} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {uploadedFiles.length > 0 && uploadedFiles[previewIndex] && (
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* ファイル情報 */}
                <Box sx={{ p: 2, borderBottom: '1px solid #E0E0E0', bgcolor: '#F5F5F5' }}>
                  <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                    {uploadedFiles[previewIndex].name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.875rem', color: '#666666' }}>
                    サイズ: {formatFileSize(uploadedFiles[previewIndex].size)}
                  </Typography>
                </Box>

                {/* プレビューコンテンツ */}
                <Box sx={{ flex: 1, overflow: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#FAFAFA', p: 2 }}>
                  {(() => {
                    const file = uploadedFiles[previewIndex];
                    const fileType = getFileType(file);

                    switch (fileType) {
                      case 'image':
                        return (
                          <Box
                            component="img"
                            src={previewUrl}
                            alt={file.name}
                            sx={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              objectFit: 'contain',
                            }}
                          />
                        );

                      case 'pdf':
                        return (
                          <iframe
                            src={previewUrl}
                            title={file.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              border: 'none',
                            }}
                          />
                        );

                      case 'text':
                        return <TextFilePreview file={file} />;

                      default:
                        return (
                          <Box sx={{ textAlign: 'center', p: 4 }}>
                            <AttachFileIcon sx={{ fontSize: 64, color: '#B0BEC5', mb: 2 }} />
                            <Typography sx={{ color: '#666666', mb: 2 }}>
                              このファイル形式はプレビューできません
                            </Typography>
                            <Typography sx={{ fontSize: '0.875rem', color: '#999999', mb: 3 }}>
                              ファイル名: {file.name}
                            </Typography>
                            <Button
                              variant="contained"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = previewUrl;
                                link.download = file.name;
                                link.click();
                              }}
                              sx={{
                                bgcolor: '#42A5F5',
                                color: '#FFFFFF',
                                '&:hover': { bgcolor: '#1E88E5' },
                              }}
                            >
                              ダウンロード
                            </Button>
                          </Box>
                        );
                    }
                  })()}
                </Box>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ConstructionRegistration;
