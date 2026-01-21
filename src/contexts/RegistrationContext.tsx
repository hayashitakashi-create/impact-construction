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

// 工事の型定義
export interface Construction {
  id: number;
  orderStatus: string;
  constructionCategory: string;
  constructionDivision: string;
  buildingUsage: string;
  constructionName: string;
  clientId: number;
  prefecture: string;
  constructionLocation: string;
  contractPeriodStart: string;
  contractPeriodEnd: string;
  plannedPeriodStart: string;
  plannedPeriodEnd: string;
  constructionAmount: string;
  consumptionTax: string;
  estimatedOrderAmount: string;
  contractDate: string;
  deliveryPeriod: string;
  taxRate: number;
  siteAgent: string;
  assignedStaff: string;
  systemUser: string;
  salesPerson: string;
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
  companyCode: string;
  setCompanyCode: (code: string) => void;
  constructions: Construction[];
  setConstructions: (constructions: Construction[]) => void;
}

// コンテキストの作成
const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

// プロバイダーコンポーネント
export const RegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [companyCode, setCompanyCode] = useState<string>('dandori');

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

  const [constructions, setConstructions] = useState<Construction[]>([
    {
      id: 1,
      orderStatus: '見積中',
      constructionCategory: '大工事',
      constructionDivision: '元請',
      buildingUsage: '事務所',
      constructionName: '東京駅前オフィスビル新築工事',
      clientId: 1,
      prefecture: '東京都',
      constructionLocation: '千代田区丸の内1-1-1',
      contractPeriodStart: '2024-04-01',
      contractPeriodEnd: '2025-03-31',
      plannedPeriodStart: '2024-04-15',
      plannedPeriodEnd: '2025-03-15',
      constructionAmount: '500,000,000',
      consumptionTax: '50,000,000',
      estimatedOrderAmount: '450,000,000',
      contractDate: '2024-03-15',
      deliveryPeriod: '30',
      taxRate: 10,
      siteAgent: '1',
      assignedStaff: '2',
      systemUser: '1',
      salesPerson: '1',
    },
    {
      id: 2,
      orderStatus: '見積中',
      constructionCategory: '小工事',
      constructionDivision: '下請',
      buildingUsage: '店舗',
      constructionName: '渋谷商業施設リフォーム工事',
      clientId: 2,
      prefecture: '東京都',
      constructionLocation: '渋谷区道玄坂2-2-2',
      contractPeriodStart: '2024-05-01',
      contractPeriodEnd: '2024-08-31',
      plannedPeriodStart: '2024-05-10',
      plannedPeriodEnd: '2024-08-20',
      constructionAmount: '80,000,000',
      consumptionTax: '8,000,000',
      estimatedOrderAmount: '75,000,000',
      contractDate: '2024-04-20',
      deliveryPeriod: '15',
      taxRate: 10,
      siteAgent: '2',
      assignedStaff: '1',
      systemUser: '2',
      salesPerson: '1',
    },
    {
      id: 3,
      orderStatus: '見積中',
      constructionCategory: '大工事',
      constructionDivision: 'JV',
      buildingUsage: '工場',
      constructionName: '神奈川工業団地建設工事',
      clientId: 1,
      prefecture: '神奈川県',
      constructionLocation: '横浜市鶴見区大黒町3-3-3',
      contractPeriodStart: '2024-06-01',
      contractPeriodEnd: '2025-05-31',
      plannedPeriodStart: '2024-06-15',
      plannedPeriodEnd: '2025-05-15',
      constructionAmount: '1,200,000,000',
      consumptionTax: '120,000,000',
      estimatedOrderAmount: '1,150,000,000',
      contractDate: '2024-05-10',
      deliveryPeriod: '45',
      taxRate: 10,
      siteAgent: '1',
      assignedStaff: '3',
      systemUser: '1',
      salesPerson: '2',
    },
    {
      id: 4,
      orderStatus: '見積中',
      constructionCategory: '小工事',
      constructionDivision: '元請',
      buildingUsage: '共同住宅',
      constructionName: '品川マンション外壁塗装工事',
      clientId: 2,
      prefecture: '東京都',
      constructionLocation: '品川区東品川4-4-4',
      contractPeriodStart: '2024-07-01',
      contractPeriodEnd: '2024-09-30',
      plannedPeriodStart: '2024-07-10',
      plannedPeriodEnd: '2024-09-20',
      constructionAmount: '35,000,000',
      consumptionTax: '3,500,000',
      estimatedOrderAmount: '33,000,000',
      contractDate: '2024-06-15',
      deliveryPeriod: '10',
      taxRate: 10,
      siteAgent: '3',
      assignedStaff: '2',
      systemUser: '3',
      salesPerson: '1',
    },
    {
      id: 5,
      orderStatus: '見積中',
      constructionCategory: '大工事',
      constructionDivision: '元請',
      buildingUsage: '病院',
      constructionName: '千葉総合病院増築工事',
      clientId: 1,
      prefecture: '千葉県',
      constructionLocation: '千葉市中央区新町5-5-5',
      contractPeriodStart: '2024-08-01',
      contractPeriodEnd: '2026-03-31',
      plannedPeriodStart: '2024-08-15',
      plannedPeriodEnd: '2026-03-15',
      constructionAmount: '2,500,000,000',
      consumptionTax: '250,000,000',
      estimatedOrderAmount: '2,400,000,000',
      contractDate: '2024-07-10',
      deliveryPeriod: '60',
      taxRate: 10,
      siteAgent: '1',
      assignedStaff: '2',
      systemUser: '1',
      salesPerson: '2',
    },
    {
      id: 6,
      orderStatus: '見積中',
      constructionCategory: '小工事',
      constructionDivision: '下請',
      buildingUsage: '学校',
      constructionName: '埼玉県立高校体育館改修工事',
      clientId: 2,
      prefecture: '埼玉県',
      constructionLocation: 'さいたま市浦和区高砂6-6-6',
      contractPeriodStart: '2024-09-01',
      contractPeriodEnd: '2024-12-20',
      plannedPeriodStart: '2024-09-10',
      plannedPeriodEnd: '2024-12-10',
      constructionAmount: '120,000,000',
      consumptionTax: '12,000,000',
      estimatedOrderAmount: '115,000,000',
      contractDate: '2024-08-20',
      deliveryPeriod: '20',
      taxRate: 10,
      siteAgent: '2',
      assignedStaff: '3',
      systemUser: '2',
      salesPerson: '1',
    },
    {
      id: 7,
      orderStatus: '見積中',
      constructionCategory: '大工事',
      constructionDivision: 'JV',
      buildingUsage: 'ホテル',
      constructionName: '箱根リゾートホテル新築工事',
      clientId: 1,
      prefecture: '神奈川県',
      constructionLocation: '足柄下郡箱根町湯本7-7-7',
      contractPeriodStart: '2024-10-01',
      contractPeriodEnd: '2025-12-31',
      plannedPeriodStart: '2024-10-15',
      plannedPeriodEnd: '2025-12-15',
      constructionAmount: '1,800,000,000',
      consumptionTax: '180,000,000',
      estimatedOrderAmount: '1,750,000,000',
      contractDate: '2024-09-15',
      deliveryPeriod: '30',
      taxRate: 10,
      siteAgent: '1',
      assignedStaff: '2',
      systemUser: '1',
      salesPerson: '2',
    },
    {
      id: 8,
      orderStatus: '見積中',
      constructionCategory: '小工事',
      constructionDivision: '下請',
      buildingUsage: '倉庫',
      constructionName: '川崎物流センター内装工事',
      clientId: 2,
      prefecture: '神奈川県',
      constructionLocation: '川崎市川崎区東扇島8-8-8',
      contractPeriodStart: '2024-11-01',
      contractPeriodEnd: '2025-01-31',
      plannedPeriodStart: '2024-11-10',
      plannedPeriodEnd: '2025-01-20',
      constructionAmount: '65,000,000',
      consumptionTax: '6,500,000',
      estimatedOrderAmount: '62,000,000',
      contractDate: '2024-10-15',
      deliveryPeriod: '15',
      taxRate: 10,
      siteAgent: '3',
      assignedStaff: '1',
      systemUser: '3',
      salesPerson: '1',
    },
    {
      id: 9,
      orderStatus: '見積中',
      constructionCategory: '大工事',
      constructionDivision: '元請',
      buildingUsage: '事務所',
      constructionName: '横浜みなとみらいオフィスタワー新築工事',
      clientId: 1,
      prefecture: '神奈川県',
      constructionLocation: '横浜市西区みなとみらい9-9-9',
      contractPeriodStart: '2024-12-01',
      contractPeriodEnd: '2026-11-30',
      plannedPeriodStart: '2024-12-15',
      plannedPeriodEnd: '2026-11-15',
      constructionAmount: '3,200,000,000',
      consumptionTax: '320,000,000',
      estimatedOrderAmount: '3,100,000,000',
      contractDate: '2024-11-10',
      deliveryPeriod: '60',
      taxRate: 10,
      siteAgent: '1',
      assignedStaff: '2',
      systemUser: '1',
      salesPerson: '2',
    },
    {
      id: 10,
      orderStatus: '見積中',
      constructionCategory: '小工事',
      constructionDivision: '下請',
      buildingUsage: '店舗',
      constructionName: '新宿駅構内店舗改装工事',
      clientId: 2,
      prefecture: '東京都',
      constructionLocation: '新宿区新宿3-10-10',
      contractPeriodStart: '2025-01-15',
      contractPeriodEnd: '2025-03-31',
      plannedPeriodStart: '2025-01-20',
      plannedPeriodEnd: '2025-03-25',
      constructionAmount: '45,000,000',
      consumptionTax: '4,500,000',
      estimatedOrderAmount: '42,000,000',
      contractDate: '2025-01-05',
      deliveryPeriod: '10',
      taxRate: 10,
      siteAgent: '2',
      assignedStaff: '3',
      systemUser: '2',
      salesPerson: '1',
    },
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
        companyCode,
        setCompanyCode,
        constructions,
        setConstructions,
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
