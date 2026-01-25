import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronDown,
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
  { icon: Settings, label: "その他・設定", page: null, hasSubmenu: true },
];

// その他・設定のサブメニュー項目
const settingsSubmenuItems = [
  { label: "ユーザー登録", page: 'user' as PageType },
  { label: "発注者登録", page: 'client' as PageType },
  { label: "外注業者一括登録", page: 'subcontractor-bulk' as PageType },
  { label: "外注業者登録", page: 'subcontractor' as PageType },
  { label: "工事分類登録", page: 'construction-category' as PageType },
  { label: "工種登録", page: 'work-type' as PageType },
  { label: "資材登録", page: 'material' as PageType },
  { label: "出向リース品目登録", page: 'lease-item' as PageType },
  { label: "共通仮設費目登録", page: 'common-temporary' as PageType },
  { label: "現場経費科目登録", page: 'site-expense' as PageType },
  { label: "画面操作権限登録", page: 'screen-permission' as PageType },
  { label: "画面操作権限テンプレート登録", page: 'screen-permission-template' as PageType },
  { label: "ワークフローテンプレート登録", page: 'workflow-template' as PageType },
  { label: "会計ソフト連携設定", page: 'accounting-integration' as PageType },
  { label: "会社登録情報設定", page: 'company' as PageType },
];

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  // 設定ページのいずれかが選択されているかチェック
  const isSettingsPageActive = settingsSubmenuItems.some(item => item.page === currentPage);

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
          const isSettings = item.hasSubmenu;
          const isSettingsActive = isSettings && isSettingsPageActive;

          return (
            <div key={item.label}>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => {
                  if (isSettings) {
                    setSettingsOpen(!settingsOpen);
                  } else if (item.page && onNavigate) {
                    onNavigate(item.page);
                  }
                }}
                style={{
                  width: "100%",
                  padding: "12px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: isSettingsActive ? "#007AFF" : isActive ? "#007AFF" : "transparent",
                  color: isSettingsActive ? "#FFFFFF" : isActive ? "#FFFFFF" : "#1D1D1F",
                  border: "none",
                  cursor: (item.page || isSettings) ? "pointer" : "default",
                  fontSize: "14px",
                  fontWeight: (isActive || isSettingsActive) ? 600 : 400,
                  transition: "all 0.2s",
                  opacity: (item.page || isSettings) ? 1 : 0.5,
                }}
                onMouseEnter={(e) => {
                  if (!isActive && !isSettingsActive && (item.page || isSettings)) {
                    e.currentTarget.style.backgroundColor = "rgba(0, 122, 255, 0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive && !isSettingsActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <item.icon size={20} />
                <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>
                {isSettings && (
                  <motion.div
                    animate={{ rotate: settingsOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                )}
              </motion.button>

              {/* サブメニュー */}
              {isSettings && (
                <AnimatePresence>
                  {settingsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: "hidden" }}
                    >
                      {settingsSubmenuItems.map((subItem) => {
                        const isSubActive = subItem.page === currentPage;
                        return (
                          <button
                            key={subItem.label}
                            onClick={() => {
                              if (onNavigate) {
                                onNavigate(subItem.page);
                              }
                            }}
                            style={{
                              width: "100%",
                              padding: "10px 24px 10px 56px",
                              display: "flex",
                              alignItems: "center",
                              background: isSubActive ? "rgba(0, 122, 255, 0.15)" : "transparent",
                              color: isSubActive ? "#007AFF" : "#1D1D1F",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "13px",
                              fontWeight: isSubActive ? 600 : 400,
                              transition: "all 0.2s",
                              textAlign: "left",
                            }}
                            onMouseEnter={(e) => {
                              if (!isSubActive) {
                                e.currentTarget.style.backgroundColor = "rgba(0, 122, 255, 0.08)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSubActive) {
                                e.currentTarget.style.backgroundColor = "transparent";
                              }
                            }}
                          >
                            {subItem.label}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
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
