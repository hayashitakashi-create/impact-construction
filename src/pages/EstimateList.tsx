import React, { useState } from 'react';
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
  Select,
  MenuItem,
  Paper,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  Description as DescriptionIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  MenuBook as MenuBookIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
  FileCopy as FileCopyIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

const EstimateList: React.FC = () => {
  const [searchExpanded, setSearchExpanded] = useState(false);

  // 検索条件の状態
  const [searchConstructionNumber, setSearchConstructionNumber] = useState('');
  const [searchEstimateNumber, setSearchEstimateNumber] = useState('');
  const [searchConstructionName, setSearchConstructionName] = useState('');
  const [searchSalesYear, setSearchSalesYear] = useState('');
  const [searchSalesYearValue, setSearchSalesYearValue] = useState('');
  const [searchDeliveryMonthFrom, setSearchDeliveryMonthFrom] = useState('');
  const [searchDeliveryMonthTo, setSearchDeliveryMonthTo] = useState('');
  const [searchClient, setSearchClient] = useState('');
  const [searchContractAmountFrom, setSearchContractAmountFrom] = useState('');
  const [searchContractAmountTo, setSearchContractAmountTo] = useState('');
  const [searchConstructionCategory, setSearchConstructionCategory] = useState('');
  const [searchBuildingUsage, setSearchBuildingUsage] = useState('');
  const [searchStructure, setSearchStructure] = useState('');
  const [searchBasementFloors, setSearchBasementFloors] = useState('');
  const [searchGroundFloors, setSearchGroundFloors] = useState('');
  const [searchSiteManager, setSearchSiteManager] = useState('');
  const [searchItemName, setSearchItemName] = useState('');
  const [searchStandardSize, setSearchStandardSize] = useState('');

  // 受注状態
  const [orderEstimating, setOrderEstimating] = useState(true);
  const [orderReceived, setOrderReceived] = useState(false);
  const [orderLost, setOrderLost] = useState(false);
  const [orderStopped, setOrderStopped] = useState(false);

  // 申請状況
  const [statusDraft, setStatusDraft] = useState(true);
  const [statusSubmitted, setStatusSubmitted] = useState(false);
  const [statusApproved, setStatusApproved] = useState(false);
  const [statusInspection, setStatusInspection] = useState(false);
  const [statusRejected, setStatusRejected] = useState(false);

  // ダミーデータ
  const estimates = [
    {
      id: 1,
      constructionNumber: '—',
      estimateNumber: '26-1-001-001',
      constructionName: '東京駅前オフィスビル新築工事',
      estimateAmount: 0,
      budgetCategory: '当初',
      orderStatus: '見積中',
      applicationStatus: '作成中',
      memo: '',
    },
  ];

  const handleSearch = () => {
    console.log('検索実行');
  };

  const handleClear = () => {
    setSearchConstructionNumber('');
    setSearchEstimateNumber('');
    setSearchConstructionName('');
    setSearchSalesYear('');
    setSearchSalesYearValue('');
    setSearchDeliveryMonthFrom('');
    setSearchDeliveryMonthTo('');
    setSearchClient('');
    setSearchContractAmountFrom('');
    setSearchContractAmountTo('');
    setSearchConstructionCategory('');
    setSearchBuildingUsage('');
    setSearchStructure('');
    setSearchBasementFloors('');
    setSearchGroundFloors('');
    setSearchSiteManager('');
    setSearchItemName('');
    setSearchStandardSize('');
    setOrderEstimating(true);
    setOrderReceived(false);
    setOrderLost(false);
    setOrderStopped(false);
    setStatusDraft(true);
    setStatusSubmitted(false);
    setStatusApproved(false);
    setStatusInspection(false);
    setStatusRejected(false);
  };

  const handleNewEstimate = () => {
    alert('見積積算登録ページへ遷移します');
  };

  const handleDetail = (id: number) => {
    alert(`見積詳細: ID ${id}`);
  };

  const handleEdit = (id: number) => {
    alert(`見積編集: ID ${id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('この見積を削除しますか？')) {
      alert(`見積削除: ID ${id}`);
    }
  };

  const handleSubmit = (id: number) => {
    alert(`申請: ID ${id}`);
  };

  const handleCopy = (id: number) => {
    alert(`見積積算複製: ID ${id}`);
  };

  const handleCreateBudget = (id: number) => {
    alert(`実行予算作成: ID ${id}`);
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
              <DescriptionIcon sx={{ color: '#FFFFFF', fontSize: 28 }} />
            </Box>
            <Typography variant="h4" sx={{ color: '#1C2026', fontWeight: 600 }}>
              見積一覧
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleNewEstimate}
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
              {/* 1行目: 工事番号、見積番号 */}
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
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>見積番号</Typography>
                  <TextField
                    value={searchEstimateNumber}
                    onChange={(e) => setSearchEstimateNumber(e.target.value)}
                    size="small"
                    sx={{ flex: 1 }}
                  />
                </Box>
              </Box>

              {/* 2行目: 工事名、売上年度 */}
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>工事名</Typography>
                  <TextField
                    value={searchConstructionName}
                    onChange={(e) => setSearchConstructionName(e.target.value)}
                    size="small"
                    sx={{ flex: 1 }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>売上年度</Typography>
                  <FormControl size="small" sx={{ width: 120 }}>
                    <Select
                      value={searchSalesYear}
                      onChange={(e) => setSearchSalesYear(e.target.value)}
                    >
                      <MenuItem value="">年号</MenuItem>
                      <MenuItem value="令和">令和</MenuItem>
                      <MenuItem value="平成">平成</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    value={searchSalesYearValue}
                    onChange={(e) => setSearchSalesYearValue(e.target.value)}
                    size="small"
                    sx={{ width: 80 }}
                  />
                  <Typography sx={{ fontSize: '0.875rem' }}>年</Typography>
                </Box>
              </Box>

              {/* 3行目: 引渡し月、発注者 */}
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
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
              </Box>

              {/* 4行目: 請負金額、工事分類 */}
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
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
              </Box>

              {/* 5行目: 建物用途、構造 */}
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>構造</Typography>
                  <FormControl size="small" sx={{ flex: 1 }}>
                    <Select
                      value={searchStructure}
                      onChange={(e) => setSearchStructure(e.target.value)}
                    >
                      <MenuItem value="">すべて</MenuItem>
                      <MenuItem value="RC造">RC造</MenuItem>
                      <MenuItem value="SRC造">SRC造</MenuItem>
                      <MenuItem value="S造">S造</MenuItem>
                      <MenuItem value="木造">木造</MenuItem>
                    </Select>
                  </FormControl>
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

              {/* 7行目: 名称、規格寸法 */}
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>名称</Typography>
                  <TextField
                    value={searchItemName}
                    onChange={(e) => setSearchItemName(e.target.value)}
                    size="small"
                    sx={{ flex: 1 }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>規格寸法</Typography>
                  <TextField
                    value={searchStandardSize}
                    onChange={(e) => setSearchStandardSize(e.target.value)}
                    size="small"
                    sx={{ flex: 1 }}
                  />
                </Box>
              </Box>

              {/* 8行目: 受注状態、申請状況 */}
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>受注状態</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={orderEstimating}
                        onChange={(e) => setOrderEstimating(e.target.checked)}
                        size="small"
                      />
                    }
                    label="見積中"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={orderReceived}
                        onChange={(e) => setOrderReceived(e.target.checked)}
                        size="small"
                      />
                    }
                    label="受注"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={orderLost}
                        onChange={(e) => setOrderLost(e.target.checked)}
                        size="small"
                      />
                    }
                    label="失注"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={orderStopped}
                        onChange={(e) => setOrderStopped(e.target.checked)}
                        size="small"
                      />
                    }
                    label="中止"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Typography sx={{ minWidth: 80, fontSize: '0.875rem' }}>申請状況</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={statusDraft}
                        onChange={(e) => setStatusDraft(e.target.checked)}
                        size="small"
                      />
                    }
                    label="作成中"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={statusSubmitted}
                        onChange={(e) => setStatusSubmitted(e.target.checked)}
                        size="small"
                      />
                    }
                    label="申請中"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={statusApproved}
                        onChange={(e) => setStatusApproved(e.target.checked)}
                        size="small"
                      />
                    }
                    label="承認済"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={statusInspection}
                        onChange={(e) => setStatusInspection(e.target.checked)}
                        size="small"
                      />
                    }
                    label="検査"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={statusRejected}
                        onChange={(e) => setStatusRejected(e.target.checked)}
                        size="small"
                      />
                    }
                    label="作成中(否認)"
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

        {/* 件数表示 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" sx={{ color: '#666' }}>
            {estimates.length}件表示
          </Typography>
        </Box>

        {/* テーブル */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#B0BEC5' }}>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, minWidth: 100 }}>
                  工事番号
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, minWidth: 120 }}>
                  見積番号
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, minWidth: 300 }}>
                  工事名<br />（工事メモ）
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, minWidth: 120 }}>
                  見積金額
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, minWidth: 100 }}>
                  予算<br />内訳
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, minWidth: 100 }}>
                  受注<br />状態
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, minWidth: 100 }}>
                  申請状況
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, minWidth: 150 }}>
                  見積積算書<br />作成メモ
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, width: 60 }}>
                  参照
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, width: 60 }}>
                  修正
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, width: 60 }}>
                  削除
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, width: 60 }}>
                  申請
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, width: 80 }}>
                  見積積算<br />複製
                </TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, width: 80 }}>
                  実行予算<br />作成
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {estimates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={14} sx={{ textAlign: 'center', py: 4 }}>
                    <Typography sx={{ color: '#666', fontSize: '0.875rem' }}>
                      検索条件に一致する見積が見つかりません
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                estimates.map((estimate) => (
                  <TableRow key={estimate.id} sx={{ '&:hover': { bgcolor: '#F5F5F5' } }}>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.875rem' }}>
                        {estimate.constructionNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.875rem' }}>
                        {estimate.estimateNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.875rem' }}>
                        {estimate.constructionName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.875rem' }}>
                        {estimate.estimateAmount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.875rem' }}>
                        {estimate.budgetCategory}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.875rem' }}>
                        {estimate.orderStatus}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.875rem' }}>
                        {estimate.applicationStatus}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.875rem' }}>
                        {estimate.memo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleDetail(estimate.id)}
                        sx={{ color: '#42A5F5' }}
                      >
                        <MenuBookIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(estimate.id)}
                        sx={{ color: '#42A5F5' }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(estimate.id)}
                        sx={{ color: '#42A5F5' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleSubmit(estimate.id)}
                        sx={{ color: '#42A5F5' }}
                      >
                        <SendIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleCopy(estimate.id)}
                        sx={{ color: '#42A5F5' }}
                      >
                        <FileCopyIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleCreateBudget(estimate.id)}
                        sx={{ color: '#42A5F5' }}
                      >
                        <AssignmentTurnedInIcon fontSize="small" />
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

export default EstimateList;
