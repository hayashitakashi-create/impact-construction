import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Speed as SpeedIcon,
  AccountBalance as AccountBalanceIcon,
  Link as LinkIcon,
  Construction as ConstructionIcon,
  Payment as PaymentIcon,
  ShoppingCart as ShoppingCartIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  RequestQuote as RequestQuoteIcon,
} from '@mui/icons-material';

interface LandingPageProps {
  onNavigateToLogin?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToLogin }) => {
  return (
    <Box sx={{ bgcolor: '#2C3E5C' }}>
      {/* ヘッダー */}
      <Box
        sx={{
          py: 2,
          px: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ConstructionIcon sx={{ color: '#FFFFFF', fontSize: 32 }} />
          <Typography
            variant="h5"
            sx={{
              color: '#FFFFFF',
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            IMPACT CONSTRUCTION
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              color: '#FFFFFF',
              borderColor: '#FFFFFF',
              '&:hover': {
                borderColor: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            お問い合わせ
          </Button>
          <Button
            variant="contained"
            onClick={onNavigateToLogin}
            sx={{
              backgroundColor: '#0078C8',
              '&:hover': {
                backgroundColor: '#0066AA',
              },
            }}
          >
            無料で始める
          </Button>
        </Box>
      </Box>

      {/* ヒーローセクション */}
      <Container maxWidth="lg" sx={{ py: 12, textAlign: 'center' }}>
        <Typography
          variant="overline"
          sx={{
            color: '#95CCC5',
            fontSize: '1rem',
            fontWeight: 500,
            mb: 2,
            display: 'block',
          }}
        >
          建設業界のDX推進
        </Typography>
        <Typography
          variant="h2"
          sx={{
            color: '#FFFFFF',
            fontWeight: 700,
            mb: 3,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
          }}
        >
          建設現場を、見える化する
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            mb: 5,
            maxWidth: 800,
            mx: 'auto',
            lineHeight: 1.8,
          }}
        >
          見積から工事完了まで、建設業務の全工程を一元管理。
          <br />
          クラウド型だから、現場でもオフィスでもリアルタイムで情報共有できます。
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3 }}>
          <Button
            variant="contained"
            size="large"
            onClick={onNavigateToLogin}
            sx={{
              backgroundColor: '#0078C8',
              px: 5,
              py: 2,
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: '#0066AA',
              },
            }}
          >
            今すぐ始める
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              color: '#FFFFFF',
              borderColor: '#FFFFFF',
              px: 5,
              py: 2,
              fontSize: '1.1rem',
              '&:hover': {
                borderColor: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            資料請求
          </Button>
        </Box>
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255, 255, 255, 0.6)',
            display: 'block',
          }}
        >
          初期費用0円・月額費用のみで始められます。
          <br />
          まずは無料トライアルで、すべての機能をお試しいただけます。
        </Typography>
      </Container>

      {/* 特徴カード */}
      <Container maxWidth="lg" sx={{ pb: 12 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
            gap: 3,
          }}
        >
          {[
            {
              icon: <VisibilityIcon sx={{ fontSize: 40 }} />,
              title: '見える',
              description: '工事進捗をリアルタイムで可視化。現場の状況を一目で把握できます。',
            },
            {
              icon: <SpeedIcon sx={{ fontSize: 40 }} />,
              title: '早くつく',
              description: '直感的な操作で簡単入力。工数削減で業務スピードが大幅に向上します。',
            },
            {
              icon: <AccountBalanceIcon sx={{ fontSize: 40 }} />,
              title: '儲かる',
              description: '原価管理を徹底し、利益率を向上。経営判断に必要なデータを提供します。',
            },
            {
              icon: <LinkIcon sx={{ fontSize: 40 }} />,
              title: 'つなぐ',
              description: 'オフィスと現場をシームレスに連携。チーム全体で情報を共有できます。',
            },
          ].map((feature, index) => (
            <Card
              key={index}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '100%',
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Box sx={{ color: '#95CCC5', mb: 2 }}>{feature.icon}</Box>
                  <Typography
                    variant="h6"
                    sx={{ color: '#FFFFFF', fontWeight: 600, mb: 1.5 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.7 }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
          ))}
        </Box>
      </Container>

      {/* 主要機能セクション */}
      <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.2)', py: 12 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              color: '#FFFFFF',
              fontWeight: 700,
              textAlign: 'center',
              mb: 2,
            }}
          >
            5つの主要機能
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
              mb: 8,
            }}
          >
            建設業務に特化した、現場で使える機能が揃っています
          </Typography>

          {/* 機能1: 見積→契約→発注 */}
          <Box sx={{ mb: 12 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 6,
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: 2,
                  p: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                }}
              >
                <Box
                  sx={{
                    height: 300,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F6F6F6',
                    borderRadius: 1,
                  }}
                >
                  <RequestQuoteIcon sx={{ fontSize: 120, color: '#0078C8' }} />
                </Box>
              </Box>
              <Box>
                <Box
                  sx={{
                    display: 'inline-block',
                    backgroundColor: '#0078C8',
                    color: '#FFFFFF',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  機能01
                </Box>
                <Typography
                  variant="h4"
                  sx={{ color: '#FFFFFF', fontWeight: 700, mb: 3 }}
                >
                  見積→契約→発注
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3, lineHeight: 1.8 }}
                >
                  見積作成から契約、発注まで一連の流れをシステム化。
                  過去の見積データを活用し、精度の高い見積を素早く作成できます。
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {[
                    '見積書の自動作成',
                    'PDFエクスポート機能',
                    '過去データの再利用',
                    '承認フロー・電子決裁',
                  ].map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon sx={{ color: '#95CCC5', fontSize: 20 }} />
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* 機能2: 工事台帳 */}
          <Box sx={{ mb: 12 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 6,
                alignItems: 'center',
              }}
            >
              <Box sx={{ order: { xs: 1, md: 2 } }}>
                <Box
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: 2,
                    p: 3,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <Box
                    sx={{
                      height: 300,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#F6F6F6',
                      borderRadius: 1,
                    }}
                  >
                    <ConstructionIcon sx={{ fontSize: 120, color: '#0078C8' }} />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ order: { xs: 2, md: 1 } }}>
                <Box
                  sx={{
                    display: 'inline-block',
                    backgroundColor: '#0078C8',
                    color: '#FFFFFF',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  機能02
                </Box>
                <Typography
                  variant="h4"
                  sx={{ color: '#FFFFFF', fontWeight: 700, mb: 3 }}
                >
                  工事台帳（予算・実績）
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3, lineHeight: 1.8 }}
                >
                  工事ごとの予算と実績を一元管理。
                  進捗状況や原価状況をリアルタイムで確認し、適切な経営判断をサポートします。
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {[
                    '予算・実績の一覧管理',
                    'リアルタイム原価把握',
                    '利益率の自動計算',
                    '多角的な分析レポート',
                  ].map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon sx={{ color: '#95CCC5', fontSize: 20 }} />
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* 機能3: 請求・入金・帳簿 */}
          <Box sx={{ mb: 12 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 6,
                alignItems: 'center',
              }}
            >
              <Box>
                <Box
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: 2,
                    p: 3,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <Box
                    sx={{
                      height: 300,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#F6F6F6',
                      borderRadius: 1,
                    }}
                  >
                    <PaymentIcon sx={{ fontSize: 120, color: '#0078C8' }} />
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box
                  sx={{
                    display: 'inline-block',
                    backgroundColor: '#0078C8',
                    color: '#FFFFFF',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  機能03
                </Box>
                <Typography
                  variant="h4"
                  sx={{ color: '#FFFFFF', fontWeight: 700, mb: 3 }}
                >
                  請求・入金・帳簿
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3, lineHeight: 1.8 }}
                >
                  請求書の発行から入金管理まで自動化。
                  未入金の把握や経理業務の効率化を実現します。
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {[
                    '請求書の自動発行',
                    '入金状況の一覧管理',
                    '未入金アラート機能',
                    '会計ソフトとの連携',
                  ].map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon sx={{ color: '#95CCC5', fontSize: 20 }} />
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* 機能4: キャッシュフロー予測 */}
          <Box sx={{ mb: 12 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 6,
                alignItems: 'center',
              }}
            >
              <Box sx={{ order: { xs: 1, md: 2 } }}>
                <Box
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: 2,
                    p: 3,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <Box
                    sx={{
                      height: 300,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#F6F6F6',
                      borderRadius: 1,
                    }}
                  >
                    <TrendingUpIcon sx={{ fontSize: 120, color: '#0078C8' }} />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ order: { xs: 2, md: 1 } }}>
                <Box
                  sx={{
                    display: 'inline-block',
                    backgroundColor: '#0078C8',
                    color: '#FFFFFF',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  機能04
                </Box>
                <Typography
                  variant="h4"
                  sx={{ color: '#FFFFFF', fontWeight: 700, mb: 3 }}
                >
                  キャッシュフロー予測
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3, lineHeight: 1.8 }}
                >
                  将来の資金繰りを予測し、経営の安定化をサポート。
                  入出金予定を可視化し、適切な資金計画を立てられます。
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {[
                    'カレンダー形式での予測',
                    'グラフで直感的に把握',
                    '複数パターンのシミュレーション',
                    'アラート・通知機能',
                  ].map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon sx={{ color: '#95CCC5', fontSize: 20 }} />
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* 機能5: 購買発注管理 */}
          <Box sx={{ mb: 12 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 6,
                alignItems: 'center',
              }}
            >
              <Box>
                <Box
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: 2,
                    p: 3,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <Box
                    sx={{
                      height: 300,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#F6F6F6',
                      borderRadius: 1,
                    }}
                  >
                    <ShoppingCartIcon sx={{ fontSize: 120, color: '#0078C8' }} />
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box
                  sx={{
                    display: 'inline-block',
                    backgroundColor: '#0078C8',
                    color: '#FFFFFF',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  機能05
                </Box>
                <Typography
                  variant="h4"
                  sx={{ color: '#FFFFFF', fontWeight: 700, mb: 3 }}
                >
                  購買発注管理
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3, lineHeight: 1.8 }}
                >
                  資材の発注から納品までを一元管理。
                  業者選定から注文書発行まで、購買業務を効率化します。
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {[
                    '発注業者の一元管理',
                    '注文書の自動作成',
                    '発注実績の追跡',
                    '承認ワークフロー',
                  ].map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon sx={{ color: '#95CCC5', fontSize: 20 }} />
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CTAセクション */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #4A5FCC 0%, #7B4EC3 50%, #9B3EB8 100%)',
          py: 12,
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: 4,
              p: 8,
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: '#FFFFFF',
                fontWeight: 700,
                mb: 2,
              }}
            >
              今すぐIMPACT CONSTRUCTIONを始めましょう
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 4,
              }}
            >
              デモアカウントで全機能をお試しいただけます
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={onNavigateToLogin}
              sx={{
                backgroundColor: '#FFFFFF',
                color: '#4A5FCC',
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#F0F0F0',
                },
              }}
            >
              無料でログイン
            </Button>
          </Box>
        </Container>
      </Box>

      {/* フッター */}
      <Box
        sx={{
          backgroundColor: '#1A2332',
          py: 6,
          px: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Powered by Dandoriwork.co
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              © 2026 KAWATA Construction Co., Ltd. All Right Reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
