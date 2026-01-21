import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  Construction as ConstructionIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  MenuBook as MenuBookIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileDownload as FileDownloadIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { useRegistration } from '../contexts/RegistrationContext';
import * as XLSX from 'xlsx';

interface ConstructionListProps {
  onViewDetail?: (id: number) => void;
  onEdit?: (id: number) => void;
  onNew?: () => void;
}

const ConstructionList: React.FC<ConstructionListProps> = ({ onViewDetail, onEdit, onNew }) => {
  const { constructions, clients, setConstructions } = useRegistration();
  const [searchExpanded, setSearchExpanded] = useState(false);

  // 検索条件の状態
  const [searchConstructionNumber, setSearchConstructionNumber] = useState('');
  const [searchEstimateNumber, setSearchEstimateNumber] = useState('');
  const [searchConstructionCategory, setSearchConstructionCategory] = useState('');
  const [searchClient, setSearchClient] = useState('');
  const [searchArea, setSearchArea] = useState('');
  const [searchBasementFloors, setSearchBasementFloors] = useState('');
  const [searchGroundFloors, setSearchGroundFloors] = useState('');
  const [searchOrderEstimating, setSearchOrderEstimating] = useState(true);
  const [searchOrderReceived, setSearchOrderReceived] = useState(true);
  const [searchOrderLost, setSearchOrderLost] = useState(false);
  const [searchOrderStopped, setSearchOrderStopped] = useState(false);

  const [searchConstructionName, setSearchConstructionName] = useState('');
  const [searchDeliveryMonthFrom, setSearchDeliveryMonthFrom] = useState('');
  const [searchDeliveryMonthTo, setSearchDeliveryMonthTo] = useState('');
  const [searchBuildingUsage, setSearchBuildingUsage] = useState('');
  const [searchContractAmountFrom, setSearchContractAmountFrom] = useState('');
  const [searchContractAmountTo, setSearchContractAmountTo] = useState('');
  const [searchBuildingAreaFrom, setSearchBuildingAreaFrom] = useState('');
  const [searchBuildingAreaTo, setSearchBuildingAreaTo] = useState('');
  const [searchSiteManager, setSearchSiteManager] = useState('');
  const [searchStatusInProgress, setSearchStatusInProgress] = useState(true);
  const [searchStatusCompleted, setSearchStatusCompleted] = useState(false);

  // 発注者名を取得
  const getClientName = useCallback((clientId: number) => {
    const client = clients.find(c => c.id === clientId);
    if (!client) return '';
    return client.corporateName || client.individualName;
  }, [clients]);

  // 請負金額を計算（工事金額 + 消費税）
  const getTotalAmount = useCallback((constructionAmount: string, consumptionTax: string) => {
    const amount = parseFloat(constructionAmount.replace(/,/g, '')) || 0;
    const tax = parseFloat(consumptionTax.replace(/,/g, '')) || 0;
    return (amount + tax).toLocaleString();
  }, []);

  // 引渡し月を計算（契約工期終了日から引渡し期間を加算）
  const getDeliveryMonth = useCallback((contractPeriodEnd: string, deliveryPeriod: string) => {
    if (!contractPeriodEnd || !deliveryPeriod) return '';
    const endDate = new Date(contractPeriodEnd);
    const days = parseInt(deliveryPeriod, 10);
    endDate.setDate(endDate.getDate() + days);
    return `${endDate.getFullYear()}年${endDate.getMonth() + 1}月`;
  }, []);

  // 検索条件でフィルタリング
  const filteredConstructions = React.useMemo(() => {
    return constructions.filter((construction) => {
      // 工事名でフィルタ
      if (searchConstructionName && !construction.constructionName.toLowerCase().includes(searchConstructionName.toLowerCase())) {
        return false;
      }

      // 工事分類でフィルタ
      if (searchConstructionCategory && construction.constructionCategory !== searchConstructionCategory) {
        return false;
      }

      // 建物用途でフィルタ
      if (searchBuildingUsage && construction.buildingUsage !== searchBuildingUsage) {
        return false;
      }

      // 発注者でフィルタ
      if (searchClient) {
        const clientName = getClientName(construction.clientId);
        if (!clientName.toLowerCase().includes(searchClient.toLowerCase())) {
          return false;
        }
      }

      // 地区でフィルタ（都道府県で判定）
      if (searchArea && !construction.prefecture.includes(searchArea)) {
        return false;
      }

      // 現場担当者でフィルタ
      if (searchSiteManager && construction.siteAgent !== searchSiteManager) {
        return false;
      }

      // 請負金額範囲でフィルタ
      if (searchContractAmountFrom || searchContractAmountTo) {
        const totalAmount = parseFloat(construction.constructionAmount.replace(/,/g, '')) +
                           parseFloat(construction.consumptionTax.replace(/,/g, ''));

        if (searchContractAmountFrom && totalAmount < parseFloat(searchContractAmountFrom)) {
          return false;
        }
        if (searchContractAmountTo && totalAmount > parseFloat(searchContractAmountTo)) {
          return false;
        }
      }

      // 受注状態でフィルタ
      const hasOrderStatusFilter = searchOrderEstimating || searchOrderReceived || searchOrderLost || searchOrderStopped;
      if (hasOrderStatusFilter) {
        const orderStatusMatches =
          (searchOrderEstimating && construction.orderStatus === '見積中') ||
          (searchOrderReceived && construction.orderStatus === '受注') ||
          (searchOrderLost && construction.orderStatus === '失注') ||
          (searchOrderStopped && construction.orderStatus === '中止');

        if (!orderStatusMatches) {
          return false;
        }
      }

      // 工事状況でフィルタ
      const hasStatusFilter = searchStatusInProgress || searchStatusCompleted;
      if (hasStatusFilter) {
        const isInProgress = construction.orderStatus === '受注' || construction.orderStatus === '見積中';
        const isCompleted = false;

        const statusMatches =
          (searchStatusInProgress && isInProgress) ||
          (searchStatusCompleted && isCompleted);

        if (!statusMatches) {
          return false;
        }
      }

      return true;
    });
  }, [constructions, searchConstructionName, searchConstructionCategory, searchBuildingUsage,
      searchClient, searchArea, searchSiteManager, searchContractAmountFrom, searchContractAmountTo,
      searchOrderEstimating, searchOrderReceived, searchOrderLost, searchOrderStopped,
      searchStatusInProgress, searchStatusCompleted, getClientName]);

  const handleSearch = () => {
    console.log('検索実行: ', filteredConstructions.length, '件');
  };

  const handleClear = () => {
    setSearchConstructionNumber('');
    setSearchEstimateNumber('');
    setSearchConstructionCategory('');
    setSearchClient('');
    setSearchArea('');
    setSearchBasementFloors('');
    setSearchGroundFloors('');
    setSearchOrderEstimating(true);
    setSearchOrderReceived(true);
    setSearchOrderLost(false);
    setSearchOrderStopped(false);
    setSearchConstructionName('');
    setSearchDeliveryMonthFrom('');
    setSearchDeliveryMonthTo('');
    setSearchBuildingUsage('');
    setSearchContractAmountFrom('');
    setSearchContractAmountTo('');
    setSearchBuildingAreaFrom('');
    setSearchBuildingAreaTo('');
    setSearchSiteManager('');
    setSearchStatusInProgress(true);
    setSearchStatusCompleted(false);
  };

  const handleExport = () => {
    // 現在の日付を取得
    const today = new Date();
    const dateStr = `${today.getFullYear()}年${String(today.getMonth() + 1).padStart(2, '0')}月${String(today.getDate()).padStart(2, '0')}日`;

    // ワークブックとワークシートを作成
    const wb = XLSX.utils.book_new();
    const ws_data: any[][] = [];

    // 1行目: 作成日
    const row1 = new Array(15).fill(null);
    row1[11] = `作成日 : ${dateStr}`;
    ws_data.push(row1);

    // 2行目: 単位
    const row2 = new Array(15).fill(null);
    row2[11] = '（単位：円）';
    ws_data.push(row2);

    // 3行目: ヘッダー
    ws_data.push([
      '工事番号',
      '工事名',
      '発注者',
      '工事箇所',
      '請負金額（税込）',
      '受注状態',
      '契約日',
      '契約工期',
      '完成月',
      '予算内訳',
      'ステータス',
      '現場代理人',
      null,
      null,
      null
    ]);

    // 4行目: 空行
    ws_data.push(new Array(15).fill(null));

    // 5行目以降: データ行
    filteredConstructions.forEach((construction) => {
      const clientName = getClientName(construction.clientId);
      const totalAmount = getTotalAmount(construction.constructionAmount, construction.consumptionTax);
      const deliveryMonth = getDeliveryMonth(construction.contractPeriodEnd, construction.deliveryPeriod);

      // 契約工期
      const contractPeriod = construction.contractPeriodStart && construction.contractPeriodEnd
        ? `${construction.contractPeriodStart} 〜 ${construction.contractPeriodEnd}`
        : '〜';

      ws_data.push([
        '—', // 工事番号（ダミー）
        construction.constructionName,
        clientName,
        `${construction.prefecture}${construction.constructionLocation}`,
        parseInt(totalAmount.replace(/,/g, '')), // 数値として出力
        construction.orderStatus,
        construction.contractDate || '',
        contractPeriod,
        deliveryMonth,
        '当初', // 予算内訳（固定）
        construction.orderStatus === '見積中' ? '見積作成中' : '進行中', // ステータス
        '', // 現場代理人（未実装）
        null,
        null,
        null
      ]);
    });

    // ワークシートを作成
    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    // 列幅を設定
    ws['!cols'] = [
      { wch: 12 }, // 工事番号
      { wch: 35 }, // 工事名
      { wch: 18 }, // 発注者
      { wch: 25 }, // 工事箇所
      { wch: 15 }, // 請負金額
      { wch: 10 }, // 受注状態
      { wch: 12 }, // 契約日
      { wch: 25 }, // 契約工期
      { wch: 12 }, // 完成月
      { wch: 10 }, // 予算内訳
      { wch: 12 }, // ステータス
      { wch: 15 }, // 現場代理人
    ];

    // ワークシートをワークブックに追加
    XLSX.utils.book_append_sheet(wb, ws, 'koujiitiran');

    // ファイルをダウンロード
    const fileName = `工事一覧_${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  const handleDetail = (id: number) => {
    if (onViewDetail) {
      onViewDetail(id);
    }
  };

  const handleEdit = (id: number) => {
    if (onEdit) {
      onEdit(id);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('この工事を削除してもよろしいですか？\nこの操作は取り消せません。')) {
      // 工事を削除
      const updatedConstructions = constructions.filter(c => c.id !== id);
      setConstructions(updatedConstructions);
    }
  };

  const handleNewConstruction = () => {
    if (onNew) {
      onNew();
    }
  };

  return (
    <Box sx={{ bgcolor: '#F6F6F6', minHeight: 'calc(100vh - 56px)', py: 3 }}>
      <Container maxWidth="xl">
        {/* ヘッダー */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
              工事一覧
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleNewConstruction}
            sx={{
              bgcolor: '#42A5F5',
              color: '#FFFFFF',
              '&:hover': { bgcolor: '#1E88E5' },
            }}
          >
            新規登録
          </Button>
        </Box>

        {/* 検索条件 */}
        <Accordion
          expanded={searchExpanded}
          onChange={() => setSearchExpanded(!searchExpanded)}
          sx={{ mb: 2, bgcolor: '#E0E0E0' }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>
              検索条件 ({searchExpanded ? '閉じる' : '開く'})
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: '#FFFFFF' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {/* 1行目: 工事番号、工事名 */}
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>工事番号</Typography>
                  <TextField
                    value={searchConstructionNumber}
                    onChange={(e) => setSearchConstructionNumber(e.target.value)}
                    size="small"
                    sx={{ flex: 1 }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>工事名</Typography>
                  <TextField
                    value={searchConstructionName}
                    onChange={(e) => setSearchConstructionName(e.target.value)}
                    size="small"
                    sx={{ flex: 1 }}
                  />
                </Box>
              </Box>

              {/* 2行目: 見積番号、引渡し月 */}
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>見積番号</Typography>
                  <TextField
                    value={searchEstimateNumber}
                    onChange={(e) => setSearchEstimateNumber(e.target.value)}
                    size="small"
                    sx={{ flex: 1 }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>引渡し月</Typography>
                  <TextField
                    value={searchDeliveryMonthFrom}
                    onChange={(e) => setSearchDeliveryMonthFrom(e.target.value)}
                    size="small"
                    sx={{ width: 150 }}
                  />
                  <Typography sx={{ fontSize: '0.875rem' }}>〜</Typography>
                  <TextField
                    value={searchDeliveryMonthTo}
                    onChange={(e) => setSearchDeliveryMonthTo(e.target.value)}
                    size="small"
                    sx={{ width: 150 }}
                  />
                </Box>
              </Box>

              {/* 3行目: 工事分類、建物用途 */}
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>工事分類</Typography>
                  <FormControl size="small" sx={{ flex: 1 }}>
                    <Select
                      value={searchConstructionCategory}
                      onChange={(e) => setSearchConstructionCategory(e.target.value)}
                    >
                      <MenuItem value="">すべて</MenuItem>
                      <MenuItem value="大工事">大工事</MenuItem>
                      <MenuItem value="小工事">小工事</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>建物用途</Typography>
                  <FormControl size="small" sx={{ flex: 1 }}>
                    <Select
                      value={searchBuildingUsage}
                      onChange={(e) => setSearchBuildingUsage(e.target.value)}
                    >
                      <MenuItem value="">すべて</MenuItem>
                      <MenuItem value="事務所">事務所</MenuItem>
                      <MenuItem value="店舗">店舗</MenuItem>
                      <MenuItem value="工場">工場</MenuItem>
                      <MenuItem value="倉庫">倉庫</MenuItem>
                      <MenuItem value="住宅">住宅</MenuItem>
                      <MenuItem value="マンション">マンション</MenuItem>
                      <MenuItem value="学校">学校</MenuItem>
                      <MenuItem value="病院">病院</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              {/* 4行目: 発注者、請負金額 */}
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>発注者</Typography>
                  <TextField
                    value={searchClient}
                    onChange={(e) => setSearchClient(e.target.value)}
                    size="small"
                    sx={{ flex: 1 }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      bgcolor: '#757575',
                      color: '#FFFFFF',
                      minWidth: 60,
                      '&:hover': { bgcolor: '#616161' },
                    }}
                  >
                    選択
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>請負金額</Typography>
                  <TextField
                    value={searchContractAmountFrom}
                    onChange={(e) => setSearchContractAmountFrom(e.target.value)}
                    size="small"
                    sx={{ width: 150 }}
                  />
                  <Typography sx={{ fontSize: '0.875rem' }}>〜</Typography>
                  <TextField
                    value={searchContractAmountTo}
                    onChange={(e) => setSearchContractAmountTo(e.target.value)}
                    size="small"
                    sx={{ width: 150 }}
                  />
                </Box>
              </Box>

              {/* 5行目: 地区、建築面積 */}
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>地区</Typography>
                  <FormControl size="small" sx={{ flex: 1 }}>
                    <Select
                      value={searchArea}
                      onChange={(e) => setSearchArea(e.target.value)}
                    >
                      <MenuItem value="">すべて</MenuItem>
                      <MenuItem value="東京">東京</MenuItem>
                      <MenuItem value="神奈川">神奈川</MenuItem>
                      <MenuItem value="千葉">千葉</MenuItem>
                      <MenuItem value="埼玉">埼玉</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>建築面積</Typography>
                  <TextField
                    value={searchBuildingAreaFrom}
                    onChange={(e) => setSearchBuildingAreaFrom(e.target.value)}
                    size="small"
                    sx={{ width: 150 }}
                  />
                  <Typography sx={{ fontSize: '0.875rem' }}>〜</Typography>
                  <TextField
                    value={searchBuildingAreaTo}
                    onChange={(e) => setSearchBuildingAreaTo(e.target.value)}
                    size="small"
                    sx={{ width: 150 }}
                  />
                </Box>
              </Box>

              {/* 6行目: 階数、現場担当者 */}
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>階数</Typography>
                  <Typography sx={{ fontSize: '0.875rem' }}>地下</Typography>
                  <TextField
                    value={searchBasementFloors}
                    onChange={(e) => setSearchBasementFloors(e.target.value)}
                    size="small"
                    sx={{ width: 80 }}
                  />
                  <Typography sx={{ fontSize: '0.875rem' }}>階</Typography>
                  <Typography sx={{ fontSize: '0.875rem', ml: 2 }}>地上</Typography>
                  <TextField
                    value={searchGroundFloors}
                    onChange={(e) => setSearchGroundFloors(e.target.value)}
                    size="small"
                    sx={{ width: 80 }}
                  />
                  <Typography sx={{ fontSize: '0.875rem' }}>階</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>現場担当者</Typography>
                  <TextField
                    value={searchSiteManager}
                    onChange={(e) => setSearchSiteManager(e.target.value)}
                    size="small"
                    sx={{ flex: 1 }}
                  />
                </Box>
              </Box>

              {/* 7行目: 受注状態、工事状況 */}
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>受注状態</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchOrderEstimating}
                        onChange={(e) => setSearchOrderEstimating(e.target.checked)}
                        size="small"
                      />
                    }
                    label="見積中"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchOrderReceived}
                        onChange={(e) => setSearchOrderReceived(e.target.checked)}
                        size="small"
                      />
                    }
                    label="受注"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchOrderLost}
                        onChange={(e) => setSearchOrderLost(e.target.checked)}
                        size="small"
                      />
                    }
                    label="失注"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchOrderStopped}
                        onChange={(e) => setSearchOrderStopped(e.target.checked)}
                        size="small"
                      />
                    }
                    label="中止"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>工事状況</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchStatusInProgress}
                        onChange={(e) => setSearchStatusInProgress(e.target.checked)}
                        size="small"
                      />
                    }
                    label="進行中"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchStatusCompleted}
                        onChange={(e) => setSearchStatusCompleted(e.target.checked)}
                        size="small"
                      />
                    }
                    label="完成"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                  />
                </Box>
              </Box>

              {/* 検索・クリアボタン */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<SearchIcon />}
                  onClick={handleSearch}
                  sx={{
                    bgcolor: '#42A5F5',
                    color: '#FFFFFF',
                    minWidth: 120,
                    '&:hover': { bgcolor: '#1E88E5' },
                  }}
                >
                  検 索
                </Button>
                <Button
                  variant="contained"
                  startIcon={<ClearIcon />}
                  onClick={handleClear}
                  sx={{
                    bgcolor: '#42A5F5',
                    color: '#FFFFFF',
                    minWidth: 120,
                    '&:hover': { bgcolor: '#1E88E5' },
                  }}
                >
                  クリア
                </Button>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* 出力ボタンと件数表示 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" sx={{ color: '#666' }}>
            {filteredConstructions.length}件表示
          </Typography>
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={handleExport}
            sx={{
              borderColor: '#4CAF50',
              color: '#4CAF50',
              '&:hover': {
                borderColor: '#45A049',
                bgcolor: '#F1F8F4',
              },
            }}
          >
            出力
          </Button>
        </Box>

        {/* テーブル */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#B0BEC5' }}>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, minWidth: 120 }}>
                  工事番号
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, minWidth: 300 }}>
                  工事名
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, minWidth: 150 }}>
                  発注者
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, minWidth: 150 }}>
                  請負金額（税込）
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, minWidth: 100 }}>
                  引渡し月
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, minWidth: 100 }}>
                  受注状態
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, minWidth: 100 }}>
                  完成月
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, width: 60 }}>
                  詳細
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, width: 60 }}>
                  修正
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, width: 60 }}>
                  削除
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredConstructions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} sx={{ textAlign: 'center', py: 4 }}>
                    <Typography sx={{ color: '#666', fontSize: '0.875rem' }}>
                      検索条件に一致する工事が見つかりません
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredConstructions.map((construction) => (
                  <TableRow key={construction.id} sx={{ '&:hover': { bgcolor: '#F5F5F5' } }}>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.875rem' }}>—</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.875rem' }}>
                        {construction.constructionName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.875rem' }}>
                        {getClientName(construction.clientId)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.875rem' }}>
                        ¥{getTotalAmount(construction.constructionAmount, construction.consumptionTax)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.875rem' }}>
                        {getDeliveryMonth(construction.contractPeriodEnd, construction.deliveryPeriod)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.875rem' }}>
                        {construction.orderStatus}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.875rem' }}>—</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleDetail(construction.id)}
                        sx={{ color: '#42A5F5' }}
                      >
                        <MenuBookIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(construction.id)}
                        sx={{ color: '#42A5F5' }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(construction.id)}
                        sx={{ color: '#42A5F5' }}
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
      </Container>
    </Box>
  );
};

export default ConstructionList;
