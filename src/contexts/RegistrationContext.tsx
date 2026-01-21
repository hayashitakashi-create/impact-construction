import React, { createContext, useContext, useState, ReactNode } from 'react';

// 工事分類の型定義
export interface ConstructionCategory {
  id: number;
  name: string;
  type: string;
  isDefault: boolean;
}

// 工種の型定義
export interface ConstructionType {
  id: number;
  itemNumber: number;
  workGroup: string;
  workName: string;
  clientWorkName: string;
}

// 建物用途の型定義
export interface BuildingUsage {
  id: number;
  name: string;
}

// 発注者の型定義
export interface Client {
  id: number;
  corporateName: string;
  individualName: string;
  furigana: string;
  postalCode: string;
  address: string;
  email: string;
  phone: string;
  fax: string;
  rating: string;
}

// ユーザーの型定義
export interface User {
  id: number;
  userId: string;
  lastName: string;
  firstName: string;
  email: string;
  permission: string;
  memo: string;
}

// コンテキストの型定義
interface RegistrationContextType {
  categories: ConstructionCategory[];
  setCategories: (categories: ConstructionCategory[]) => void;
  constructionTypes: ConstructionType[];
  setConstructionTypes: (types: ConstructionType[]) => void;
  buildingUsages: BuildingUsage[];
  setBuildingUsages: (usages: BuildingUsage[]) => void;
  clients: Client[];
  setClients: (clients: Client[]) => void;
  users: User[];
  setUsers: (users: User[]) => void;
}

// コンテキストの作成
const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

// プロバイダーコンポーネント
export const RegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<ConstructionCategory[]>([
    { id: 1, name: '大工事', type: '大工事', isDefault: true },
    { id: 2, name: '小工事', type: '小工事', isDefault: true },
  ]);

  const [buildingUsages, setBuildingUsages] = useState<BuildingUsage[]>([
    { id: 1, name: '事務所' },
    { id: 2, name: '店舗' },
    { id: 3, name: '工場' },
    { id: 4, name: '倉庫' },
    { id: 5, name: '共同住宅' },
    { id: 6, name: '病院' },
    { id: 7, name: '学校' },
    { id: 8, name: 'ホテル' },
  ]);

  const [clients, setClients] = useState<Client[]>([
    { id: 1, corporateName: '', individualName: '鈴木 一郎', furigana: 'すずき いちろう', postalCode: '111-222', address: '静岡県浜松市中区砂山1-1-1', email: '', phone: '053-111-222', fax: '053-222-333', rating: '' },
    { id: 2, corporateName: '三島市', individualName: '', furigana: 'みしまし', postalCode: '', address: '', email: '', phone: '', fax: '', rating: '' },
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: 1, userId: 'dandori_0', lastName: '田中', firstName: '太郎', email: 'tanaka@example.com', permission: 'システム管理者', memo: '営業担当' },
    { id: 2, userId: 'dandori_1', lastName: '佐藤', firstName: '花子', email: 'sato@example.com', permission: '業作システム管理者', memo: '現場監督' },
    { id: 3, userId: 'dandori_2', lastName: '鈴木', firstName: '一郎', email: 'suzuki@example.com', permission: '一般ユーザー(デフォルト)', memo: '管理者' },
  ]);

  const [constructionTypes, setConstructionTypes] = useState<ConstructionType[]>([
    { id: 1, itemNumber: 1, workGroup: '躯体工事', workName: '直接仮設工事', clientWorkName: '直接仮設工事' },
    { id: 2, itemNumber: 2, workGroup: '躯体工事', workName: '土工事', clientWorkName: '土工事' },
    { id: 3, itemNumber: 3, workGroup: '躯体工事', workName: '杭工事', clientWorkName: '杭工事' },
    { id: 4, itemNumber: 4, workGroup: '躯体工事', workName: '鉄筋工事', clientWorkName: '鉄筋工事' },
    { id: 5, itemNumber: 5, workGroup: '躯体工事', workName: '型枠工事', clientWorkName: '型枠工事' },
    { id: 6, itemNumber: 6, workGroup: '躯体工事', workName: 'コンクリート工事', clientWorkName: 'コンクリート工事' },
    { id: 7, itemNumber: 7, workGroup: '躯体工事', workName: '鉄骨工事', clientWorkName: '鉄骨工事' },
    { id: 8, itemNumber: 8, workGroup: '仕上げ工事', workName: '組積工事', clientWorkName: '組積工事' },
    { id: 9, itemNumber: 9, workGroup: '仕上げ工事', workName: '防水工事', clientWorkName: '防水工事' },
    { id: 10, itemNumber: 10, workGroup: '仕上げ工事', workName: '石工事', clientWorkName: '石工事' },
    { id: 11, itemNumber: 11, workGroup: '仕上げ工事', workName: 'タイル工事', clientWorkName: 'タイル工事' },
    { id: 12, itemNumber: 12, workGroup: '仕上げ工事', workName: '木工事', clientWorkName: '木工事' },
    { id: 13, itemNumber: 13, workGroup: '仕上げ工事', workName: '屋根板金工事', clientWorkName: '屋根板金工事' },
    { id: 14, itemNumber: 14, workGroup: '仕上げ工事', workName: '金属工事', clientWorkName: '金属工事' },
    { id: 15, itemNumber: 15, workGroup: '仕上げ工事', workName: '左官工事', clientWorkName: '左官工事' },
    { id: 16, itemNumber: 16, workGroup: '仕上げ工事', workName: '金属製建具工事', clientWorkName: '金属製建具工事' },
    { id: 17, itemNumber: 17, workGroup: '仕上げ工事', workName: '木製建具工事', clientWorkName: '木製建具工事' },
    { id: 18, itemNumber: 18, workGroup: '仕上げ工事', workName: '硝子工事', clientWorkName: '硝子工事' },
    { id: 19, itemNumber: 19, workGroup: '仕上げ工事', workName: '塗装工事', clientWorkName: '塗装工事' },
    { id: 20, itemNumber: 20, workGroup: '仕上げ工事', workName: '内装工事', clientWorkName: '内装工事' },
    { id: 21, itemNumber: 21, workGroup: '仕上げ工事', workName: '仕上げユニット工事', clientWorkName: '仕上げユニット工事' },
    { id: 22, itemNumber: 22, workGroup: '仕上げ工事', workName: '雑工事', clientWorkName: '雑工事' },
    { id: 23, itemNumber: 23, workGroup: '設備工事', workName: '電気設備工事', clientWorkName: '電気設備工事' },
    { id: 24, itemNumber: 24, workGroup: '設備工事', workName: '給排水衛生設備工事', clientWorkName: '給排水衛生設備工事' },
    { id: 25, itemNumber: 25, workGroup: '設備工事', workName: '空調換気設備工事', clientWorkName: '空調換気設備工事' },
    { id: 26, itemNumber: 26, workGroup: '設備工事', workName: '昇降機設備工事', clientWorkName: '昇降機設備工事' },
    { id: 27, itemNumber: 27, workGroup: '設備工事', workName: 'その他設備工事', clientWorkName: 'その他設備工事' },
    { id: 28, itemNumber: 28, workGroup: 'その他工事', workName: '外構工事', clientWorkName: '外構工事' },
    { id: 29, itemNumber: 29, workGroup: 'その他工事', workName: '開発工事', clientWorkName: '開発工事' },
    { id: 30, itemNumber: 30, workGroup: 'その他工事', workName: '解体工事', clientWorkName: '解体工事' },
    { id: 31, itemNumber: 31, workGroup: 'その他工事', workName: '総合工事', clientWorkName: '総合工事' },
    { id: 32, itemNumber: 32, workGroup: 'その他工事', workName: 'その他工事', clientWorkName: 'その他工事' },
    { id: 33, itemNumber: 33, workGroup: 'その他工事', workName: '外注設計費', clientWorkName: '外注設計費' },
  ]);

  return (
    <RegistrationContext.Provider
      value={{
        categories,
        setCategories,
        constructionTypes,
        setConstructionTypes,
        buildingUsages,
        setBuildingUsages,
        clients,
        setClients,
        users,
        setUsers,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

// カスタムフック
export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};
