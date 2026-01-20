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
  Chip,
  Button,
  Paper,
} from '@mui/material';
import {
  TrendingUp,
  Construction,
  CheckCircle,
  Warning,
} from '@mui/icons-material';
import { labelColors } from '../theme';

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

interface Project {
  id: string;
  name: string;
  customer: string;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  progress: number;
  deadline: string;
  budget: string;
}

const getStatusLabel = (status: string) => {
  const statusMap: Record<string, { label: string; color: string }> = {
    planning: { label: '計画中', color: labelColors.label04 },
    in_progress: { label: '進行中', color: labelColors.label02 },
    completed: { label: '完了', color: labelColors.label06 },
    on_hold: { label: '保留', color: labelColors.label08 },
  };
  return statusMap[status] || statusMap.planning;
};

const mockProjects: Project[] = [
  {
    id: 'PRJ-001',
    name: '〇〇マンション新築工事',
    customer: '株式会社〇〇建設',
    status: 'in_progress',
    progress: 65,
    deadline: '2024/03/31',
    budget: '¥85,000,000',
  },
  {
    id: 'PRJ-002',
    name: '△△ビル改修工事',
    customer: '△△不動産',
    status: 'in_progress',
    progress: 42,
    deadline: '2024/02/28',
    budget: '¥42,000,000',
  },
  {
    id: 'PRJ-003',
    name: '□□住宅増築工事',
    customer: '個人（□□様）',
    status: 'planning',
    progress: 15,
    deadline: '2024/04/15',
    budget: '¥12,500,000',
  },
  {
    id: 'PRJ-004',
    name: '××工場建設工事',
    customer: '株式会社××製作所',
    status: 'in_progress',
    progress: 78,
    deadline: '2024/03/10',
    budget: '¥120,000,000',
  },
];

const Dashboard: React.FC = () => {
  const [searchOpen, setSearchOpen] = React.useState(false);

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
      <Box
        sx={{
          backgroundColor: '#EFEFF0',
          mx: 4,
          mt: 3,
          px: 3,
          py: 2,
          cursor: 'pointer',
        }}
        onClick={() => setSearchOpen(!searchOpen)}
      >
        <Typography
          variant="body2"
          sx={{
            color: '#1C2026',
            fontWeight: 500,
          }}
        >
          検索条件 {searchOpen ? '（閉じる）' : '（開く）'}
        </Typography>
      </Box>

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
            value="¥520M"
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
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                進行中の工事一覧
              </Typography>
              <Button variant="contained" size="small">
                すべて表示
              </Button>
            </Box>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#F6F6F6' }}>
                    <TableCell sx={{ fontWeight: 600 }}>工事番号</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>工事名</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>発注者</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>ステータス</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>進捗率</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>納期</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>予算</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockProjects.map((project) => {
                    const statusInfo = getStatusLabel(project.status);
                    return (
                      <TableRow
                        key={project.id}
                        hover
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: '#F6F6F6',
                          },
                        }}
                      >
                        <TableCell>{project.id}</TableCell>
                        <TableCell sx={{ fontWeight: 500 }}>{project.name}</TableCell>
                        <TableCell>{project.customer}</TableCell>
                        <TableCell>
                          <Chip
                            label={statusInfo.label}
                            size="small"
                            sx={{
                              backgroundColor: statusInfo.color,
                              color: '#1C2026',
                              fontWeight: 500,
                            }}
                          />
                        </TableCell>
                        <TableCell>{project.progress}%</TableCell>
                        <TableCell>{project.deadline}</TableCell>
                        <TableCell>{project.budget}</TableCell>
                      </TableRow>
                    );
                  })}
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
