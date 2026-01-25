import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Popover,
  FormControlLabel,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Add as AddIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import Sidebar from '../components/Layout/Sidebar';

type PageType = 'dashboard' | 'construction-list' | 'estimate-list' | 'construction-registration' | 'construction-detail' | 'construction-category' | 'construction-type' | 'building-usage' | 'client' | 'user' | 'company' | 'subcontractor-bulk' | 'subcontractor' | 'work-type' | 'material' | 'lease-item' | 'common-temporary' | 'site-expense' | 'screen-permission' | 'screen-permission-template' | 'workflow-template' | 'accounting-integration';

interface ScreenPermissionTemplateRegistrationProps {
  onNavigate?: (page: PageType) => void;
}

interface PermissionDetails {
  工事: string[];
  見積積算: string[];
  実行予算: string[];
  購買発注: string[];
  工程管理: string[];
  出来高管理: string[];
  支払管理: string[];
  実行予算管理: string[];
  'その他・設定': string[];
}

interface PermissionTemplate {
  id: number;
  テンプレート名: string;
  permissions: PermissionDetails;
}

const ScreenPermissionTemplateRegistration: React.FC<ScreenPermissionTemplateRegistrationProps> = ({ onNavigate }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [selectedTemplates, setSelectedTemplates] = useState<number[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [currentCategory, setCurrentCategory] = useState<keyof PermissionDetails | null>(null);
  const [currentTemplateId, setCurrentTemplateId] = useState<number | null>(null);

  // 権限項目の定義
  const permissionOptions: PermissionDetails = {
    工事: ['工事一覧', '工事登録'],
    見積積算: ['見積積算一覧', '見積積算承認一覧', '見積積算承認済メール(全工事)', '見積積算承認済メール(担当工事)'],
    実行予算: ['実行予算一覧', '実行予算承認一覧', '実行予算承認済メール(全工事)', '実行予算承認済メール(担当工事)'],
    購買発注: ['発注業者選定依頼', '発注業者選定依頼一覧', '発注一覧', '注文書管理', '注文書管理(参照)', '発注実績一覧', '発注承認一覧', '発注承認済メール(全工事)', '発注承認済メール(担当工事)'],
    工程管理: ['工程進捗詳細(グラフ)', '工程進捗詳細(表)', '工程計画登録'],
    出来高管理: ['出来高査定対象一覧', '出来高報告書'],
    支払管理: ['支払登録一覧', '支払登録', '支払承認一覧', '支払予想額給与表', '入金予定一覧', '入金予定メール(全工事)', '入金予定メール(担当工事)', '支払承認済メール(全工事)', '支払承認済メール(担当工事)'],
    実行予算管理: ['損益表', '工事総括一覧'],
    'その他・設定': ['ユーザー登録', 'ワークフローテンプレート登録', '発注者登録', '外注業者登録', '外注業者一括登録', '工種種別登録', '工種登録', '資材登録', '社内リース品目登録', '共通仮設費科目設定', '現場経費科目設定', '画面操作権限登録', '画面操作権限テンプレート登録', '会社登録情報設定', '全工事参照権限', '会計ソフト連携設定', '原価登録'],
  };

  // デフォルトテンプレート
  const [templates, setTemplates] = useState<PermissionTemplate[]>([
    {
      id: 1,
      テンプレート名: 'システム管理者',
      permissions: {
        工事: ['工事一覧', '工事登録'],
        見積積算: ['見積積算一覧', '見積積算承認一覧'],
        実行予算: ['実行予算一覧', '実行予算承認一覧'],
        購買発注: ['発注業者選定依頼', '発注業者選定依頼一覧', '発注一覧', '注文書管理'],
        工程管理: ['工程進捗詳細(グラフ)', '工程進捗詳細(表)', '工程計画登録'],
        出来高管理: ['出来高査定対象一覧', '出来高報告書'],
        支払管理: ['支払登録一覧', '支払登録', '支払承認一覧'],
        実行予算管理: ['損益表', '工事総括一覧'],
        'その他・設定': [],
      },
    },
    {
      id: 2,
      テンプレート名: '案件-システム管理者',
      permissions: {
        工事: ['工事一覧', '工事登録'],
        見積積算: ['見積積算一覧', '見積積算承認一覧'],
        実行予算: ['実行予算一覧', '実行予算承認一覧'],
        購買発注: ['発注業者選定依頼', '発注業者選定依頼一覧', '発注一覧', '注文書管理'],
        工程管理: ['工程進捗詳細(グラフ)', '工程進捗詳細(表)', '工程計画登録'],
        出来高管理: ['出来高査定対象一覧', '出来高報告書'],
        支払管理: ['支払登録一覧', '支払登録', '支払承認一覧'],
        実行予算管理: ['損益表', '工事総括一覧'],
        'その他・設定': [],
      },
    },
    {
      id: 3,
      テンプレート名: '案件-営業担当者',
      permissions: {
        工事: ['工事一覧', '工事登録'],
        見積積算: ['見積積算一覧', '見積積算承認一覧'],
        実行予算: ['実行予算一覧', '実行予算承認一覧'],
        購買発注: ['発注業者選定依頼', '発注業者選定依頼一覧', '発注一覧', '注文書管理'],
        工程管理: ['工程進捗詳細(グラフ)', '工程進捗詳細(表)'],
        出来高管理: ['出来高査定対象一覧', '出来高報告書'],
        支払管理: ['支払登録一覧', '支払登録', '支払承認一覧'],
        実行予算管理: ['損益表', '工事総括一覧'],
        'その他・設定': [],
      },
    },
    {
      id: 4,
      テンプレート名: '一般ユーザー（デフォルト）',
      permissions: {
        工事: ['工事一覧'],
        見積積算: ['見積積算一覧'],
        実行予算: ['実行予算一覧'],
        購買発注: [],
        工程管理: [],
        出来高管理: [],
        支払管理: [],
        実行予算管理: [],
        'その他・設定': [],
      },
    },
  ]);

  // ポップオーバーを開く
  const handleOpenPermissions = (event: React.MouseEvent<HTMLElement>, category: keyof PermissionDetails, templateId: number) => {
    setAnchorEl(event.currentTarget);
    setCurrentCategory(category);
    setCurrentTemplateId(templateId);
  };

  // ポップオーバーを閉じる
  const handleClosePermissions = () => {
    setAnchorEl(null);
    setCurrentCategory(null);
    setCurrentTemplateId(null);
  };

  // 権限トグル
  const handleTogglePermission = (permission: string) => {
    if (currentTemplateId === null || currentCategory === null) return;

    setTemplates(templates.map(template => {
      if (template.id === currentTemplateId) {
        const currentPerms = template.permissions[currentCategory];
        const newPerms = currentPerms.includes(permission)
          ? currentPerms.filter(p => p !== permission)
          : [...currentPerms, permission];

        return {
          ...template,
          permissions: {
            ...template.permissions,
            [currentCategory]: newPerms,
          },
        };
      }
      return template;
    }));
  };

  // 全選択/全解除
  const handleToggleAll = () => {
    if (currentTemplateId === null || currentCategory === null) return;

    setTemplates(templates.map(template => {
      if (template.id === currentTemplateId) {
        const allOptions = permissionOptions[currentCategory];
        const currentPerms = template.permissions[currentCategory];
        const allSelected = allOptions.every(opt => currentPerms.includes(opt));

        return {
          ...template,
          permissions: {
            ...template.permissions,
            [currentCategory]: allSelected ? [] : [...allOptions],
          },
        };
      }
      return template;
    }));
  };

  // 新規登録ダイアログを開く
  const handleOpenDialog = () => {
    setNewTemplateName('');
    setOpenDialog(true);
  };

  // ダイアログを閉じる
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewTemplateName('');
  };

  // 新規テンプレート登録
  const handleRegisterTemplate = () => {
    if (!newTemplateName.trim()) {
      alert('テンプレート名を入力してください');
      return;
    }

    const newTemplate: PermissionTemplate = {
      id: templates.length + 1,
      テンプレート名: newTemplateName,
      permissions: {
        工事: [],
        見積積算: [],
        実行予算: [],
        購買発注: [],
        工程管理: [],
        出来高管理: [],
        支払管理: [],
        実行予算管理: [],
        'その他・設定': [],
      },
    };

    setTemplates([...templates, newTemplate]);
    handleCloseDialog();
  };

  // テンプレート選択
  const handleSelectTemplate = (id: number) => {
    if (selectedTemplates.includes(id)) {
      setSelectedTemplates(selectedTemplates.filter(tid => tid !== id));
    } else {
      setSelectedTemplates([...selectedTemplates, id]);
    }
  };

  // フィルタリング
  const filteredTemplates = templates.filter((template) => {
    const matchesKeyword = !searchKeyword || template.テンプレート名.includes(searchKeyword);
    return matchesKeyword;
  });

  // 全選択/全解除
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedTemplates(filteredTemplates.map(t => t.id));
    } else {
      setSelectedTemplates([]);
    }
  };

  // 保存
  const handleSave = () => {
    console.log('保存:', templates);
    alert('設定を保存しました');
  };

  const open = Boolean(anchorEl);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "linear-gradient(to bottom right, #F8F9FA 0%, #E8EAF6 50%, #F3E5F5 100%)", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <Sidebar currentPage="screen-permission-template" onNavigate={onNavigate} />
      <Box sx={{ flex: 1, p: 3 }}>
      {/* ページタイトルとボタン */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: '#007AFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            <SettingsIcon sx={{ color: '#FFFFFF', fontSize: 28 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#1D1D1F', fontSize: 28 }}>
            画面操作権限テンプレート登録
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{
              bgcolor: '#007AFF',
              '&:hover': {
                bgcolor: '#0051D5',
              },
              textTransform: 'none',
              fontSize: '0.875rem',
              borderRadius: '8px',
            }}
          >
            保存
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            sx={{
              bgcolor: '#007AFF',
              '&:hover': {
                bgcolor: '#0051D5',
              },
              textTransform: 'none',
              fontSize: '0.875rem',
              borderRadius: '8px',
            }}
          >
            + 新規追加
          </Button>
        </Box>
      </Box>

      {/* 検索条件 */}
      <Box sx={{ mb: 2 }}>
        <Box
          onClick={() => setSearchOpen(!searchOpen)}
          sx={{
            bgcolor: '#F0F0F0',
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: 1,
            '&:hover': {
              bgcolor: '#E8E8E8',
            },
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#333333' }}>
            検索条件
          </Typography>
          <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
            {searchOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            <Typography variant="body2" sx={{ color: '#007AFF', ml: 0.5 }}>
              （{searchOpen ? '閉じる' : '開く'}）
            </Typography>
          </Box>
        </Box>
        <Collapse in={searchOpen}>
          <Box sx={{ p: 2, background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(0, 0, 0, 0.08)', boxShadow: 'none', mt: 1 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
              <TextField
                label="テンプレート名"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                size="small"
                sx={{ flex: 1 }}
                placeholder="テンプレート名で検索"
              />
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                sx={{
                  bgcolor: '#007AFF',
                  '&:hover': {
                    bgcolor: '#0051D5',
                  },
                  textTransform: 'none',
                  borderRadius: '8px',
                }}
              >
                検索
              </Button>
              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={() => setSearchKeyword('')}
                sx={{
                  textTransform: 'none',
                  borderColor: '#007AFF',
                  color: '#007AFF',
                  '&:hover': {
                    borderColor: '#0051D5',
                    bgcolor: 'rgba(0, 122, 255, 0.1)',
                  },
                  borderRadius: '8px',
                }}
              >
                クリア
              </Button>
            </Box>
          </Box>
        </Collapse>
      </Box>

      {/* テンプレートテーブル */}
      <Paper sx={{
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: 'none',
      }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#E3F2FD' }}>
                <TableCell padding="checkbox" sx={{ width: 50 }}>
                  <Checkbox
                    checked={selectedTemplates.length === filteredTemplates.length && filteredTemplates.length > 0}
                    indeterminate={selectedTemplates.length > 0 && selectedTemplates.length < filteredTemplates.length}
                    onChange={handleSelectAll}
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', width: 200 }}>
                  テンプレート名
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  詳細
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTemplates.map((template) => (
                <TableRow key={template.id} sx={{ '&:hover': { bgcolor: '#F9F9F9' } }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedTemplates.includes(template.id)}
                      onChange={() => handleSelectTemplate(template.id)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>
                    {template.テンプレート名}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>共通 -</Typography>
                      {(Object.keys(permissionOptions) as Array<keyof PermissionDetails>).map((category) => (
                        <Button
                          key={category}
                          onClick={(e) => handleOpenPermissions(e, category, template.id)}
                          endIcon={<ArrowDropDownIcon />}
                          sx={{
                            fontSize: '0.75rem',
                            textTransform: 'none',
                            minWidth: 'auto',
                            p: 0.5,
                            color: template.permissions[category].length > 0 ? '#007AFF' : '#666666',
                            '&:hover': {
                              bgcolor: 'rgba(0, 122, 255, 0.1)',
                            },
                          }}
                        >
                          {category} {template.permissions[category].length > 0 ? '○' : '-'}
                        </Button>
                      ))}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* 権限ポップオーバー */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePermissions}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, minWidth: 300, maxWidth: 400 }}>
          {currentCategory && currentTemplateId && (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      permissionOptions[currentCategory].every(opt =>
                        templates.find(t => t.id === currentTemplateId)?.permissions[currentCategory].includes(opt)
                      )
                    }
                    onChange={handleToggleAll}
                    size="small"
                  />
                }
                label={<Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>すべてにチェックを入れる</Typography>}
              />
              <Box sx={{ mt: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                {permissionOptions[currentCategory].map((permission) => (
                  <FormControlLabel
                    key={permission}
                    control={
                      <Checkbox
                        checked={
                          templates.find(t => t.id === currentTemplateId)?.permissions[currentCategory].includes(permission) || false
                        }
                        onChange={() => handleTogglePermission(permission)}
                        size="small"
                      />
                    }
                    label={<Typography sx={{ fontSize: '0.75rem' }}>{permission}</Typography>}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>
      </Popover>

      {/* 新規登録ダイアログ */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            新規登録
          </Typography>
          <IconButton onClick={handleCloseDialog} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" sx={{ mb: 3, color: '#666666' }}>
            テンプレート名を入力し、よろしければ『登録』を押してください。
          </Typography>
          <Box>
            <TextField
              label="テンプレート名"
              value={newTemplateName}
              onChange={(e) => setNewTemplateName(e.target.value)}
              fullWidth
              size="small"
              placeholder="情報部門"
            />
            {!newTemplateName && (
              <Typography variant="caption" sx={{ color: '#D32F2F', mt: 0.5, display: 'block' }}>
                必須です
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{
              bgcolor: '#007AFF',
              '&:hover': {
                bgcolor: '#0051D5',
              },
              textTransform: 'none',
              borderRadius: '8px',
            }}
          >
            キャンセル
          </Button>
          <Button
            onClick={handleRegisterTemplate}
            variant="contained"
            disabled={!newTemplateName.trim()}
            sx={{
              bgcolor: '#D3E8F5',
              color: '#666666',
              '&:hover': {
                bgcolor: '#B8D9ED',
              },
              '&:disabled': {
                bgcolor: '#E0E0E0',
                color: '#999999',
              },
              textTransform: 'none',
              borderRadius: '8px',
            }}
          >
            登録
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
    </div>
  );
};

export default ScreenPermissionTemplateRegistration;
