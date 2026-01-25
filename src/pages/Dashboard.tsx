import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  FileText,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Wallet,
  Layers,
  Settings,
  Search,
  Grid,
  List,
  Plus,
  User,
} from 'lucide-react';

// TypeScript型定義
interface Project {
  id: number;
  projectNumber: string;
  projectName: string;
  client: string;
  endDate: string;
  progress: number;
  budget: number;
  actual: number;
  status: "受注" | "施工中" | "検査中" | "完了" | "引き渡し済み";
  manager: string;
}

// サンプルデータ
const projects: Project[] = [
  {
    id: 1,
    projectNumber: "2024-0001",
    projectName: "○○マンション新築工事",
    client: "株式会社○○不動産",
    endDate: "2024-12-31",
    progress: 65,
    budget: 150000000,
    actual: 97500000,
    status: "施工中",
    manager: "山田太郎",
  },
  {
    id: 2,
    projectNumber: "2024-0002",
    projectName: "△△ビル大規模改修工事",
    client: "△△商事株式会社",
    endDate: "2024-11-30",
    progress: 80,
    budget: 85000000,
    actual: 68000000,
    status: "施工中",
    manager: "佐藤花子",
  },
  {
    id: 3,
    projectNumber: "2023-0156",
    projectName: "駅前再開発プロジェクト",
    client: "都市開発株式会社",
    endDate: "2024-10-31",
    progress: 88,
    budget: 580000000,
    actual: 510400000,
    status: "施工中",
    manager: "鈴木一郎",
  },
  {
    id: 4,
    projectNumber: "2024-0004",
    projectName: "工場内設備工事",
    client: "株式会社製造業A",
    endDate: "2024-09-30",
    progress: 45,
    budget: 42000000,
    actual: 18900000,
    status: "施工中",
    manager: "高橋健",
  },
  {
    id: 5,
    projectNumber: "2024-0005",
    projectName: "商業施設内装工事",
    client: "株式会社リテールB",
    endDate: "2024-08-31",
    progress: 30,
    budget: 28000000,
    actual: 8400000,
    status: "施工中",
    manager: "田中美咲",
  },
  {
    id: 6,
    projectNumber: "2024-0006",
    projectName: "道路舗装工事（第2期）",
    client: "○○県土木部",
    endDate: "2024-11-15",
    progress: 55,
    budget: 95000000,
    actual: 52250000,
    status: "施工中",
    manager: "伊藤誠",
  },
  {
    id: 7,
    projectNumber: "2024-0007",
    projectName: "老人ホーム新築工事",
    client: "社会福祉法人○○会",
    endDate: "2025-03-31",
    progress: 25,
    budget: 280000000,
    actual: 70000000,
    status: "受注",
    manager: "小林麻美",
  },
  {
    id: 8,
    projectNumber: "2023-0189",
    projectName: "橋梁補修工事",
    client: "国土交通省",
    endDate: "2024-08-31",
    progress: 100,
    budget: 128000000,
    actual: 125440000,
    status: "完了",
    manager: "中村大輔",
  },
];

// 金額フォーマット
const formatCurrency = (value: number): string => {
  return `¥${(value / 10000).toLocaleString()}万`;
};

// ステータス別カラー設定
const statusColors = {
  受注: {
    bg: "#EFF6FF",
    text: "#2563EB",
    border: "#DBEAFE",
    gradient: "linear-gradient(135deg, rgba(96, 165, 250, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)",
  },
  施工中: {
    bg: "#EEF2FF",
    text: "#4F46E5",
    border: "#E0E7FF",
    gradient: "linear-gradient(135deg, rgba(129, 140, 248, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)",
  },
  完了: {
    bg: "#ECFDF5",
    text: "#059669",
    border: "#D1FAE5",
    gradient: "linear-gradient(135deg, rgba(52, 211, 153, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)",
  },
  検査中: {
    bg: "#FFFBEB",
    text: "#D97706",
    border: "#FEF3C7",
    gradient: "linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.15) 100%)",
  },
  引き渡し済み: {
    bg: "#F8FAFC",
    text: "#475569",
    border: "#F1F5F9",
    gradient: "linear-gradient(135deg, rgba(148, 163, 184, 0.15) 0%, rgba(100, 116, 139, 0.15) 100%)",
  },
};

// サイドバーメニュー項目
const sidebarItems = [
  { icon: Building2, label: "工事", active: true },
  { icon: FileText, label: "見積", active: false },
  { icon: DollarSign, label: "実行予算", active: false },
  { icon: ShoppingCart, label: "購買発注", active: false },
  { icon: TrendingUp, label: "出来高管理", active: false },
  { icon: Wallet, label: "支払管理", active: false },
  { icon: Layers, label: "実行予算費目", active: false },
  { icon: Settings, label: "その他・設定", active: false },
];

const Dashboard: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #F8F9FA 0%, #E8EAF6 50%, #F3E5F5 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* サイドバー */}
      <div
        style={{
          width: "216px",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          borderRight: "1px solid rgba(0, 0, 0, 0.08)",
          padding: "24px 0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ロゴ */}
        <div style={{ paddingLeft: "24px", paddingRight: "24px", marginBottom: "32px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#007AFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "8px",
            }}
          >
            <Building2 size={28} color="#FFFFFF" />
          </div>
          <div style={{ fontSize: "16px", fontWeight: 600, color: "#1D1D1F" }}>IMPACT</div>
          <div style={{ fontSize: "12px", color: "#86868B" }}>工事原価管理</div>
        </div>

        {/* メニュー */}
        <nav style={{ flex: 1 }}>
          {sidebarItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              style={{
                width: "100%",
                padding: "12px 24px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: item.active ? "#007AFF" : "transparent",
                color: item.active ? "#FFFFFF" : "#1D1D1F",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: item.active ? 600 : 400,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!item.active) {
                  e.currentTarget.style.backgroundColor = "rgba(0, 122, 255, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (!item.active) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </motion.button>
          ))}
        </nav>

        {/* ユーザー情報 */}
        <div
          style={{
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(0, 0, 0, 0.08)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#5E5CE6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={20} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#1D1D1F" }}>山田太郎</div>
            <div style={{ fontSize: "12px", color: "#86868B" }}>現場監督</div>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div style={{ flex: 1, padding: "32px" }}>
        {/* ヘッダー */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: 600, color: "#1D1D1F", margin: 0 }}>工事管理</h1>
              <p style={{ fontSize: "14px", color: "#86868B", margin: "4px 0 0 0" }}>全9件のプロジェクト</p>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  background: "rgba(255, 255, 255, 0.7)",
                  borderRadius: "8px",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                }}
              >
                <Search size={18} color="#86868B" />
                <input
                  type="text"
                  placeholder="工事番号、工事名で検索..."
                  style={{
                    border: "none",
                    background: "transparent",
                    outline: "none",
                    fontSize: "14px",
                    width: "200px",
                    color: "#1D1D1F",
                  }}
                />
              </div>
              <button
                style={{
                  padding: "8px 12px",
                  background: "rgba(255, 255, 255, 0.7)",
                  borderRadius: "8px",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Grid size={18} color="#1D1D1F" />
                <span style={{ fontSize: "14px", color: "#1D1D1F" }}>カード</span>
              </button>
              <button
                style={{
                  padding: "8px 12px",
                  background: "rgba(255, 255, 255, 0.7)",
                  borderRadius: "8px",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  cursor: "pointer",
                }}
              >
                <List size={18} color="#1D1D1F" />
              </button>
              <button
                style={{
                  padding: "8px 16px",
                  background: "#007AFF",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                <Plus size={18} />
                <span>新規登録</span>
              </button>
            </div>
          </div>
        </div>

        {/* サマリーカード */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          {[
            { label: "予算", value: "¥15,000万", actual: "¥9,750万", icon: DollarSign, bgColor: "#DBEAFE" },
            { label: "予算", value: "¥8,500万", actual: "¥6,800万", icon: DollarSign, bgColor: "#D1FAE5" },
            { label: "予算", value: "¥32,000万", actual: "¥30,400万", icon: DollarSign, bgColor: "#FED7AA" },
            { label: "予算", value: "¥4,200万", actual: "¥1,890万", icon: DollarSign, bgColor: "#FECACA" },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              style={{
                background: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                padding: "20px",
                border: "1px solid rgba(0, 0, 0, 0.08)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: card.bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <card.icon size={24} color="#1D1D1F" />
                </div>
                <div style={{ fontSize: "12px", color: "#86868B" }}>{card.label}</div>
              </div>
              <div style={{ fontSize: "24px", fontWeight: 700, color: "#1D1D1F", marginBottom: "4px" }}>
                {card.value}
              </div>
              <div style={{ fontSize: "14px", color: "#007AFF" }}>実績 {card.actual}</div>
            </motion.div>
          ))}
        </div>

        {/* プロジェクトカード */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {projects.map((project, index) => {
            const colors = statusColors[project.status];
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                style={{
                  position: "relative",
                  background: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  padding: "20px",
                  border: `1px solid ${colors.border}`,
                  cursor: "pointer",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget;
                  const glow = card.querySelector('[data-glow]') as HTMLElement;
                  const neon = card.querySelector('[data-neon]') as HTMLElement;
                  const accent = card.querySelector('[data-accent]') as HTMLElement;
                  if (glow) glow.style.opacity = "1";
                  if (neon) neon.style.opacity = "1";
                  if (accent) accent.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  const glow = card.querySelector('[data-glow]') as HTMLElement;
                  const neon = card.querySelector('[data-neon]') as HTMLElement;
                  const accent = card.querySelector('[data-accent]') as HTMLElement;
                  if (glow) glow.style.opacity = "0";
                  if (neon) neon.style.opacity = "0";
                  if (accent) accent.style.opacity = "0";
                }}
              >
                {/* グラデーション背景グロー */}
                <div
                  data-glow
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0,
                    transition: "opacity 0.5s",
                    background: colors.gradient,
                    filter: "blur(60px)",
                    zIndex: -1,
                  }}
                />

                {/* ネオンボーダーグロー */}
                <div
                  data-neon
                  style={{
                    position: "absolute",
                    inset: "-1px",
                    opacity: 0,
                    transition: "opacity 0.5s",
                    background: colors.gradient,
                    filter: "blur(20px)",
                    borderRadius: "16px",
                    zIndex: -1,
                  }}
                />

                {/* トップアクセントライン */}
                <div
                  data-accent
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    opacity: 0,
                    transition: "opacity 0.5s",
                    background: colors.gradient,
                  }}
                />

                {/* カード内容 */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  {/* ステータスバッジと工事番号 */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span
                      style={{
                        padding: "4px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 600,
                        background: colors.bg,
                        color: colors.text,
                      }}
                    >
                      {project.status}
                    </span>
                    <span style={{ fontSize: "12px", color: "#007AFF", fontWeight: 600 }}>{project.projectNumber}</span>
                  </div>

                  {/* 工事名 */}
                  <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1D1D1F", margin: "0 0 8px 0" }}>
                    {project.projectName}
                  </h3>

                  {/* 顧客名 */}
                  <div style={{ fontSize: "13px", color: "#86868B", marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <User size={14} />
                    {project.client}
                  </div>

                  {/* 進捗率 */}
                  <div style={{ marginBottom: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "12px", color: "#86868B" }}>進捗率</span>
                      <span style={{ fontSize: "14px", fontWeight: 700, color: "#1D1D1F" }}>{project.progress}%</span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "8px",
                        background: "#F5F5F7",
                        borderRadius: "4px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${project.progress}%`,
                          height: "100%",
                          background: colors.text,
                          transition: "width 0.5s",
                        }}
                      />
                    </div>
                  </div>

                  {/* 予算・実績 */}
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <div>
                      <div style={{ fontSize: "11px", color: "#86868B" }}>予算</div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#1D1D1F" }}>{formatCurrency(project.budget)}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "11px", color: "#86868B" }}>実績</div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#007AFF" }}>{formatCurrency(project.actual)}</div>
                    </div>
                  </div>

                  {/* 担当者・完了予定日 */}
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid rgba(0, 0, 0, 0.08)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          background: "#5E5CE6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <User size={14} color="#FFFFFF" />
                      </div>
                      <span style={{ fontSize: "12px", color: "#1D1D1F" }}>{project.manager}</span>
                    </div>
                    <span style={{ fontSize: "12px", color: "#86868B" }}>{project.endDate}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
