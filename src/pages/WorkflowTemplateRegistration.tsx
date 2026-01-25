import React, { useState, useMemo } from 'react';
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
  Chip,
  Autocomplete,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  DragIndicator as DragIndicatorIcon,
} from '@mui/icons-material';
import { useRegistration } from '../contexts/RegistrationContext';
import Sidebar from '../components/Layout/Sidebar';

type PageType = 'dashboard' | 'construction-list' | 'estimate-list' | 'construction-registration' | 'construction-detail' | 'construction-category' | 'construction-type' | 'building-usage' | 'client' | 'user' | 'company' | 'subcontractor-bulk' | 'subcontractor' | 'work-type' | 'material' | 'lease-item' | 'common-temporary' | 'site-expense' | 'screen-permission' | 'screen-permission-template' | 'workflow-template' | 'accounting-integration';

interface WorkflowTemplate {
  id: number;
  申請対象: string;
  テンプレート名: string;
  承認者: string[];
  報告者: string;
}

interface WorkflowTemplateRegistrationProps {
  onNavigate?: (page: PageType) => void;
}

const WorkflowTemplateRegistration: React.FC<WorkflowTemplateRegistrationProps> = ({ onNavigate }) => {
  const { users } = useRegistration();
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<WorkflowTemplate | null>(null);

  // ユーザー登録から取得したユーザーリスト（姓 名の形式）
  const userOptions = useMemo(() => {
    return users.map(user => `${user.lastName} ${user.firstName}`);
  }, [users]);

  // 申請対象の選択肢
  const applicationTargets = ['共通', '見積積算', '実行予算', '購買発注', '支払管理'];

  // フォームの状態
  const [formData, setFormData] = useState({
    申請対象: '',
    テンプレート名: '',
    承認者リスト: [''] as string[],
    報告者: '',
  });

  // サンプルデータ
  const [templates, setTemplates] = useState<WorkflowTemplate[]>([
    {
      id: 1,
      申請対象: '共通',
      テンプレート名: 'sample',
      承認者: ['田中 太郎'],
      報告者: '',
    },
  ]);

  const handleOpenDialog = (template?: WorkflowTemplate) => {
    if (template) {
      setEditingTemplate(template);
      setFormData({
        申請対象: template.申請対象,
        テンプレート名: template.テンプレート名,
        承認者リスト: template.承認者.length > 0 ? template.承認者 : [''],
        報告者: template.報告者,
      });
    } else {
      setEditingTemplate(null);
      setFormData({
        申請対象: '',
        テンプレート名: '',
        承認者リスト: [''],
        報告者: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingTemplate(null);
  };

  const handleAddApprover = () => {
    setFormData({
      ...formData,
      承認者リスト: [...formData.承認者リスト, ''],
    });
  };

  const handleApproverChange = (index: number, value: string | null) => {
    const newApprovers = [...formData.承認者リスト];
    newApprovers[index] = value || '';
    setFormData({
      ...formData,
      承認者リスト: newApprovers,
    });
  };

  const handleRemoveApprover = (index: number) => {
    const newApprovers = formData.承認者リスト.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      承認者リスト: newApprovers.length > 0 ? newApprovers : [''],
    });
  };

  const handleSave = () => {
    if (!isFormValid()) return;

    const newTemplate: WorkflowTemplate = {
      id: editingTemplate ? editingTemplate.id : templates.length + 1,
      申請対象: formData.申請対象,
      テンプレート名: formData.テンプレート名,
      承認者: formData.承認者リスト.filter(a => a !== ''),
      報告者: formData.報告者,
    };

    if (editingTemplate) {
      setTemplates(templates.map(t => t.id === editingTemplate.id ? newTemplate : t));
    } else {
      setTemplates([...templates, newTemplate]);
    }

    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('このテンプレートを削除しますか？')) {
      setTemplates(templates.filter(t => t.id !== id));
    }
  };

  const handleSaveOrder = () => {
    alert('並び順を保存しました');
  };

  const isFormValid = () => {
    return (
      formData.申請対象 !== '' &&
      formData.テンプレート名.trim() !== '' &&
      formData.承認者リスト.some(a => a !== '')
    );
  };

  const getApproversDisplay = (approvers: string[]) => {
    if (approvers.length === 0) return '';
    return approvers.map((approver, index) => `${index + 1}人目：${approver}`).join('、');
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "linear-gradient(to bottom right, #F8F9FA 0%, #E8EAF6 50%, #F3E5F5 100%)", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <Sidebar currentPage="workflow-template" onNavigate={onNavigate} />
      <Box sx={{ flex: 1, p: 3 }}>
          {/* ページタイトルと新規登録ボタン */}
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
              <Typography variant="h5" sx={{ fontWeight: 600, fontSize: 28, color: '#1D1D1F' }}>
                ワークフローテンプレート登録
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
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
              + 新規登録
            </Button>
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
                {/* 検索フィールドは必要に応じて追加 */}
              </Box>
            </Collapse>
          </Box>

          {/* 並び順保存ボタン */}
          <Box sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              onClick={handleSaveOrder}
              sx={{
                textTransform: 'none',
                borderColor: '#007AFF',
                color: '#007AFF',
                borderRadius: '8px',
                '&:hover': {
                  borderColor: '#0051D5',
                  bgcolor: 'rgba(0, 122, 255, 0.1)',
                },
              }}
            >
              並び順保存
            </Button>
          </Box>

          {/* テーブル */}
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
                    <TableCell sx={{ fontWeight: 600, width: 60, fontSize: '0.75rem', color: '#1D1D1F' }}>並替</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: 60, fontSize: '0.75rem', color: '#1D1D1F' }}>修正</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: 60, fontSize: '0.75rem', color: '#1D1D1F' }}>削除</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: 150, fontSize: '0.75rem', color: '#1D1D1F' }}>申請対象</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: '#1D1D1F' }}>テンプレート名</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: '#1D1D1F' }}>承認者一覧</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id} sx={{ '&:hover': { bgcolor: '#F9F9F9' } }}>
                      <TableCell>
                        <IconButton
                          size="small"
                          sx={{ color: '#999999', cursor: 'grab' }}
                        >
                          <DragIndicatorIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(template)}
                          sx={{ color: '#007AFF' }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(template.id)}
                          sx={{ color: '#007AFF' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.875rem' }}>{template.申請対象}</TableCell>
                      <TableCell sx={{ fontSize: '0.875rem' }}>{template.テンプレート名}</TableCell>
                      <TableCell sx={{ fontSize: '0.875rem' }}>{getApproversDisplay(template.承認者)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* 新規登録/編集ダイアログ */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {editingTemplate ? '登録内容修正' : '新規登録'}
              </Typography>
              <IconButton onClick={handleCloseDialog} size="small">
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="body2" sx={{ mb: 3, color: '#666666' }}>
                項目を{editingTemplate ? '修正' : '入力'}し、よろしければ「{editingTemplate ? '修正' : '登録'}」を押してください。
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* 申請対象 */}
                <FormControl fullWidth size="small" required error={!formData.申請対象}>
                  <InputLabel>申請対象</InputLabel>
                  <Select
                    value={formData.申請対象}
                    label="申請対象"
                    onChange={(e) => setFormData({ ...formData, 申請対象: e.target.value })}
                  >
                    {applicationTargets.map((target) => (
                      <MenuItem key={target} value={target}>
                        {target}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* テンプレート名 */}
                <TextField
                  label="テンプレート名"
                  value={formData.テンプレート名}
                  onChange={(e) => setFormData({ ...formData, テンプレート名: e.target.value })}
                  required
                  fullWidth
                  size="small"
                  error={!formData.テンプレート名.trim()}
                  helperText={!formData.テンプレート名.trim() ? '必須です' : ''}
                />

                {/* 承認者 */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      承認者
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleAddApprover}
                      sx={{
                        bgcolor: '#999999',
                        color: '#FFFFFF',
                        textTransform: 'none',
                        fontSize: '0.75rem',
                        minWidth: 'auto',
                        px: 2,
                        borderRadius: '8px',
                        '&:hover': {
                          bgcolor: '#777777',
                        },
                      }}
                    >
                      行追加
                    </Button>
                  </Box>

                  {formData.承認者リスト.map((approver, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                        {index + 1}人目
                      </Typography>
                      <Autocomplete
                        value={approver || null}
                        onChange={(event, newValue) => handleApproverChange(index, newValue)}
                        options={userOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="選択してください"
                            size="small"
                          />
                        )}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              label={option}
                              {...getTagProps({ index })}
                              size="small"
                            />
                          ))
                        }
                      />
                    </Box>
                  ))}
                </Box>

                {/* 報告者 */}
                <Box>
                  <Typography variant="body2" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                    報告者
                  </Typography>
                  <Autocomplete
                    value={formData.報告者 || null}
                    onChange={(event, newValue) => setFormData({ ...formData, 報告者: newValue || '' })}
                    options={userOptions}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="選択してください"
                        size="small"
                      />
                    )}
                  />
                </Box>
              </Box>

              {/* バリデーションエラーメッセージ */}
              {!isFormValid() && (
                <Typography variant="body2" sx={{ color: '#DC1D1D', mt: 2, textAlign: 'right' }}>
                  未入力の項目があります
                </Typography>
              )}
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
                onClick={handleSave}
                variant="contained"
                disabled={!isFormValid()}
                sx={{
                  bgcolor: isFormValid() ? '#D3E8F5' : '#E0E0E0',
                  color: isFormValid() ? '#666666' : '#999999',
                  '&:hover': {
                    bgcolor: isFormValid() ? '#B8D9ED' : '#E0E0E0',
                  },
                  textTransform: 'none',
                  borderRadius: '8px',
                }}
              >
                {editingTemplate ? '修正' : '登録'}
              </Button>
            </DialogActions>
          </Dialog>
      </Box>
    </div>
  );
};

export default WorkflowTemplateRegistration;
