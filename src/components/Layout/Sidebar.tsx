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
  User,
} from 'lucide-react';

type PageType = 'dashboard' | 'construction-list' | 'estimate-list' | 'construction-registration' | 'construction-detail' | 'construction-category' | 'construction-type' | 'building-usage' | 'client' | 'user' | 'company' | 'subcontractor-bulk' | 'subcontractor' | 'work-type' | 'material' | 'lease-item' | 'common-temporary' | 'site-expense' | 'screen-permission' | 'screen-permission-template' | 'workflow-template' | 'accounting-integration';

interface SidebarProps {
  currentPage?: PageType;
  onNavigate?: (page: PageType) => void;
}

// サイドバーメニュー項目
const sidebarItems = [
  { icon: Building2, label: "工事", page: 'construction-list' as PageType },
  { icon: FileText, label: "見積", page: 'estimate-list' as PageType },
  { icon: DollarSign, label: "実行予算", page: null },
  { icon: ShoppingCart, label: "購買発注", page: null },
  { icon: TrendingUp, label: "出来高管理", page: null },
  { icon: Wallet, label: "支払管理", page: null },
  { icon: Layers, label: "実行予算費目", page: null },
  { icon: Settings, label: "その他・設定", page: 'accounting-integration' as PageType },
];

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  return (
    <div
      style={{
        width: "216px",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        borderRight: "1px solid rgba(0, 0, 0, 0.08)",
        padding: "24px 0",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
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
            cursor: "pointer",
          }}
          onClick={() => {
            if (onNavigate) {
              onNavigate('dashboard');
            }
          }}
        >
          <Building2 size={28} color="#FFFFFF" />
        </div>
        <div style={{ fontSize: "16px", fontWeight: 600, color: "#1D1D1F" }}>IMPACT</div>
        <div style={{ fontSize: "12px", color: "#86868B" }}>工事原価管理</div>
      </div>

      {/* メニュー */}
      <nav style={{ flex: 1 }}>
        {sidebarItems.map((item, index) => {
          const isActive = item.page === currentPage;
          return (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => {
                if (item.page && onNavigate) {
                  onNavigate(item.page);
                }
              }}
              style={{
                width: "100%",
                padding: "12px 24px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: isActive ? "#007AFF" : "transparent",
                color: isActive ? "#FFFFFF" : "#1D1D1F",
                border: "none",
                cursor: item.page ? "pointer" : "default",
                fontSize: "14px",
                fontWeight: isActive ? 600 : 400,
                transition: "all 0.2s",
                opacity: item.page ? 1 : 0.5,
              }}
              onMouseEnter={(e) => {
                if (!isActive && item.page) {
                  e.currentTarget.style.backgroundColor = "rgba(0, 122, 255, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </motion.button>
          );
        })}
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
  );
};

export default Sidebar;
