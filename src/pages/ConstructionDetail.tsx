import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Divider,
} from '@mui/material';
import {
  Construction as ConstructionIcon,
  Edit as EditIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useRegistration } from '../contexts/RegistrationContext';

interface ConstructionDetailProps {
  constructionId: number;
  onBack: () => void;
  onEdit: () => void;
}

const ConstructionDetail: React.FC<ConstructionDetailProps> = ({ constructionId, onBack, onEdit }) => {
  const { constructions, clients, users } = useRegistration();
  const construction = constructions.find(c => c.id === constructionId);

  if (!construction) {
    return (
      <Box sx={{ bgcolor: '#F6F6F6', minHeight: 'calc(100vh - 56px)', py: 3 }}>
        <Container maxWidth="xl">
          <Typography>工事が見つかりません</Typography>
          <Button onClick={onBack} sx={{ mt: 2 }}>
            一覧に戻る
          </Button>
        </Container>
      </Box>
    );
  }

  const client = clients.find(c => c.id === construction.clientId);
  const clientName = client ? (client.corporateName || client.individualName) : '';

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id.toString() === userId);
    return user ? `${user.lastName} ${user.firstName}` : '';
  };

  const totalAmount = (
    parseFloat(construction.constructionAmount.replace(/,/g, '')) +
    parseFloat(construction.consumptionTax.replace(/,/g, ''))
  ).toLocaleString();

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
              工事詳細
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={onBack}
              sx={{
                borderColor: '#757575',
                color: '#757575',
                '&:hover': {
                  borderColor: '#616161',
                  bgcolor: '#F5F5F5',
                },
              }}
            >
              一覧に戻る
            </Button>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={onEdit}
              sx={{
                bgcolor: '#42A5F5',
                color: '#FFFFFF',
                '&:hover': { bgcolor: '#1E88E5' },
              }}
            >
              編集
            </Button>
          </Box>
        </Box>

        {/* 詳細情報 */}
        <Paper sx={{ p: 4 }}>
          {/* 基本情報 */}
          <Typography variant="h6" sx={{ mb: 3, color: '#0078C8', fontWeight: 600 }}>
            基本情報
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
            <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                受注状態
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {construction.orderStatus}
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                工事分類
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {construction.constructionCategory}
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                元下区分
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {construction.constructionDivision}
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                建物用途
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {construction.buildingUsage}
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 100%' }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                工事名
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {construction.constructionName}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* 発注者情報 */}
          <Typography variant="h6" sx={{ mb: 3, color: '#0078C8', fontWeight: 600 }}>
            発注者情報
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
            <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                発注者名
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {clientName}
              </Typography>
            </Box>
            {client && (
              <>
                <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
                  <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                    電話番号
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {client.phone || '—'}
                  </Typography>
                </Box>
                <Box sx={{ flex: '1 1 100%' }}>
                  <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                    住所
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {client.address || '—'}
                  </Typography>
                </Box>
              </>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* 工事場所 */}
          <Typography variant="h6" sx={{ mb: 3, color: '#0078C8', fontWeight: 600 }}>
            工事場所
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
            <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                都道府県
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {construction.prefecture}
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 100%' }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                工事場所
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {construction.constructionLocation}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* 工期 */}
          <Typography variant="h6" sx={{ mb: 3, color: '#0078C8', fontWeight: 600 }}>
            工期
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
            <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                契約工期
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {construction.contractPeriodStart} 〜 {construction.contractPeriodEnd}
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                計画工期
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {construction.plannedPeriodStart} 〜 {construction.plannedPeriodEnd}
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                契約日
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {construction.contractDate || '—'}
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                引渡し期間
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {construction.deliveryPeriod} 日
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* 金額 */}
          <Typography variant="h6" sx={{ mb: 3, color: '#0078C8', fontWeight: 600 }}>
            金額
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
            <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                工事金額
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                ¥{construction.constructionAmount}
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                消費税
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                ¥{construction.consumptionTax}
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                請負金額（税込）
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: '#0078C8' }}>
                ¥{totalAmount}
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                概算発注予定額
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                ¥{construction.estimatedOrderAmount}
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                税率
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {construction.taxRate}%
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* 担当者 */}
          <Typography variant="h6" sx={{ mb: 3, color: '#0078C8', fontWeight: 600 }}>
            担当者
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                現場代理人
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {getUserName(construction.siteAgent) || '—'}
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                配員（配置技術者）
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {getUserName(construction.assignedStaff) || '—'}
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                システム使用者
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {getUserName(construction.systemUser) || '—'}
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                営業担当者
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {getUserName(construction.salesPerson) || '—'}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ConstructionDetail;
