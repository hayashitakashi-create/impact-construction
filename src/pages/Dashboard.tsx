import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import {
  TrendingUp,
  Construction,
  CheckCircle,
  Warning,
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  MenuBook as MenuBookIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useRegistration } from '../contexts/RegistrationContext';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement;
  color: string;
  change?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, change }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            backgroundColor: color,
            borderRadius: 2,
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
            color: '#FFFFFF',
          }}
        >
          {icon}
        </Box>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        {value}
      </Typography>
      {change && (
        <Typography variant="caption" sx={{ color: '#009F77' }}>
          {change}
        </Typography>
      )}
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  const { constructions, clients } = useRegistration();
  const [searchOpen, setSearchOpen] = React.useState(false);

  // 検索条件の状態
  const [searchConstructionNumber, setSearchConstructionNumber] = React.useState('');
  const [searchConstructionName, setSearchConstructionName] = React.useState('');
  const [searchSiteManager, setSearchSiteManager] = React.useState('');

  // 受注状態のチェックボックス
  const [orderEstimating, setOrderEstimating] = React.useState(true);
  const [orderReceived, setOrderReceived] = React.useState(true);
  const [orderLost, setOrderLost] = React.useState(false);
  const [orderStopped, setOrderStopped] = React.useState(false);

  // 工事状況のチェックボックス
  const [statusInProgress, setStatusInProgress] = React.useState(true);
  const [statusCompleted, setStatusCompleted] = React.useState(false);

  // 発注者名を取得
  const getClientName = (clientId: number) => {
    const client = clients.find(c => c.id === clientId);
    if (!client) return '';
    return client.corporateName || client.individualName;
  };

  // 請負金額を計算（工事金額 + 消費税）
  const getTotalAmount = (constructionAmount: string, consumptionTax: string) => {
    const amount = parseFloat(constructionAmount.replace(/,/g, '')) || 0;
    const tax = parseFloat(consumptionTax.replace(/,/g, '')) || 0;
    return (amount + tax).toLocaleString();
  };

  // 引渡し月を計算（契約工期終了日から引渡し期間を加算）
  const getDeliveryMonth = (contractPeriodEnd: string, deliveryPeriod: string) => {
    if (!contractPeriodEnd || !deliveryPeriod) return '';
    const endDate = new Date(contractPeriodEnd);
    const days = parseInt(deliveryPeriod, 10);
    endDate.setDate(endDate.getDate() + days);
    return `${endDate.getFullYear()}年${endDate.getMonth() + 1}月`;
  };

  // 検索条件でフィルタリング
  const filteredConstructions = React.useMemo(() => {
    return constructions.filter((construction) => {
      // 工事番号でフィルタ（現在はダミーなのでスキップ）
      // 実際には工事番号フィールドがないため省略

      // 工事名でフィルタ
      if (searchConstructionName && !construction.constructionName.toLowerCase().includes(searchConstructionName.toLowerCase())) {
        return false;
      }

      // 現場担当者でフィルタ（siteAgentは数値IDなので文字列で比較）
      if (searchSiteManager && construction.siteAgent !== searchSiteManager) {
        return false;
      }

      // 受注状態でフィルタ - 少なくとも1つがチェックされている必要がある
      const hasOrderStatusFilter = orderEstimating || orderReceived || orderLost || orderStopped;
      if (hasOrderStatusFilter) {
        const orderStatusMatches =
          (orderEstimating && construction.orderStatus === '見積中') ||
          (orderReceived && construction.orderStatus === '受注') ||
          (orderLost && construction.orderStatus === '失注') ||
          (orderStopped && construction.orderStatus === '中止');

        if (!orderStatusMatches) {
          return false;
        }
      }

      // 工事状況でフィルタ - 現在は簡易実装
      // 進行中: 受注状態、完成: なし（完成データがないため）
      const hasStatusFilter = statusInProgress || statusCompleted;
      if (hasStatusFilter) {
        const isInProgress = construction.orderStatus === '受注' || construction.orderStatus === '見積中';
        const isCompleted = false; // 完成データがないため常にfalse

        const statusMatches =
          (statusInProgress && isInProgress) ||
          (statusCompleted && isCompleted);

        if (!statusMatches) {
          return false;
        }
      }

      return true;
    });
  }, [constructions, searchConstructionName, searchSiteManager,
      orderEstimating, orderReceived, orderLost, orderStopped, statusInProgress, statusCompleted]);

  const handleSearch = () => {
    // フィルタリングはuseMemoで自動的に行われる
    console.log('検索実行: ', filteredConstructions.length, '件');
  };

  const handleClear = () => {
    setSearchConstructionNumber('');
    setSearchConstructionName('');
    setSearchSiteManager('');
    setOrderEstimating(true);
    setOrderReceived(true);
    setOrderLost(false);
    setOrderStopped(false);
    setStatusInProgress(true);
    setStatusCompleted(false);
  };

  const handleDetail = (id: number) => {
    alert(`工事詳細: ID ${id}`);
  };

  const handleEdit = (id: number) => {
    alert(`工事編集: ID ${id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('この工事を削除しますか？')) {
      alert(`工事削除: ID ${id}`);
    }
  };

  return (
    <Box sx={{ bgcolor: '#FFFFFF', minHeight: 'calc(100vh - 56px)' }}>
      {/* ページタイトル */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: 4,
          py: 3,
          borderBottom: '1px solid #E4E4E5',
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: '#0078C8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Construction sx={{ color: '#FFFFFF', fontSize: 28 }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 500, color: '#1C2026' }}>
          ダッシュボード
        </Typography>
      </Box>

      {/* 検索条件セクション */}
      <Accordion
        expanded={searchOpen}
        onChange={() => setSearchOpen(!searchOpen)}
        sx={{ mx: 4, mt: 3, bgcolor: '#EFEFF0', boxShadow: 'none' }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ px: 3, py: 1 }}
        >
          <Typography variant="body2" sx={{ color: '#1C2026', fontWeight: 500 }}>
            検索条件 {searchOpen ? '（閉じる）' : '（開く）'}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: '#FFFFFF', px: 3, py: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {/* 1行目: 工事番号、工事名 */}
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                <Typography sx={{ minWidth: 100, fontSize: '0.875rem' }}>工事番号</Typography>
                <TextField
                  value={searchConstructionNumber}
                  onChange={(e) => setSearchConstructionNumber(e.target.value)}
                  size="small"
                  sx={{ flex: 1 }}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                <Typography sx={{ minWidth: 100, fontSize: '0.875rem' }}>工事名</Typography>
                <TextField
                  value={searchConstructionName}
                  onChange={(e) => setSearchConstructionName(e.target.value)}
                  size="small"
                  sx={{ flex: 1 }}
                />
              </Box>
            </Box>

            {/* 2行目: 現場担当者 */}
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                <Typography sx={{ minWidth: 100, fontSize: '0.875rem' }}>現場担当者</Typography>
                <TextField
                  value={searchSiteManager}
                  onChange={(e) => setSearchSiteManager(e.target.value)}
                  size="small"
                  sx={{ flex: 1 }}
                />
              </Box>
              <Box sx={{ flex: 1 }} />
            </Box>

            {/* 3行目: 受注状態、工事状況 */}
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                <Typography sx={{ minWidth: 100, fontSize: '0.875rem' }}>受注状態</Typography>
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
                <Typography sx={{ minWidth: 100, fontSize: '0.875rem' }}>工事状況</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={statusInProgress}
                      onChange={(e) => setStatusInProgress(e.target.checked)}
                      size="small"
                    />
                  }
                  label="進行中"
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={statusCompleted}
                      onChange={(e) => setStatusCompleted(e.target.checked)}
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

      {/* アクションボタン */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          px: 4,
          py: 3,
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#C1E6EF',
            color: '#1C2026',
            fontWeight: 500,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#B0D9E5',
              boxShadow: 'none',
            },
          }}
        >
          お知らせ (2025/05/21)
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#C1E6EF',
            color: '#1C2026',
            fontWeight: 500,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#B0D9E5',
              boxShadow: 'none',
            },
          }}
        >
          マイ工事
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#C1E6EF',
            color: '#1C2026',
            fontWeight: 500,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#B0D9E5',
              boxShadow: 'none',
            },
          }}
        >
          申請/承認
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#C1E6EF',
            color: '#1C2026',
            fontWeight: 500,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#B0D9E5',
              boxShadow: 'none',
            },
          }}
        >
          報告
        </Button>
      </Box>

      {/* コンテンツエリア */}
      <Box sx={{ px: 4, pb: 4 }}>
        {/* 統計カード */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 3,
            mb: 3,
          }}
        >
          <StatCard
            title="進行中の工事"
            value="12"
            icon={<Construction />}
            color="#0078C8"
            change="+2 from last month"
          />
          <StatCard
            title="完了工事"
            value="45"
            icon={<CheckCircle />}
            color="#009F77"
            change="+5 from last month"
          />
          <StatCard
            title="総予算"
            value="5.2億円"
            icon={<TrendingUp />}
            color="#95CCC5"
          />
          <StatCard
            title="要注意案件"
            value="3"
            icon={<Warning />}
            color="#DC1D1D"
          />
        </Box>

        {/* 工事一覧 */}
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  進行中の工事一覧
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
                  {filteredConstructions.length}件表示
                </Typography>
              </Box>
              <Button variant="contained" size="small">
                すべて表示
              </Button>
            </Box>
            <TableContainer component={Paper} elevation={0}>
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
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
