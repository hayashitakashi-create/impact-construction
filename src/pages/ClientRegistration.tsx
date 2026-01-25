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
  IconButton,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useRegistration, Client } from '../contexts/RegistrationContext';
import Sidebar from '../components/Layout/Sidebar';

type PageType = 'dashboard' | 'construction-list' | 'estimate-list' | 'construction-registration' | 'construction-detail' | 'construction-category' | 'construction-type' | 'building-usage' | 'client' | 'user' | 'company' | 'subcontractor-bulk' | 'subcontractor' | 'work-type' | 'material' | 'lease-item' | 'common-temporary' | 'site-expense' | 'screen-permission' | 'screen-permission-template' | 'workflow-template' | 'accounting-integration';

interface ClientRegistrationProps {
  onNavigate?: (page: PageType) => void;
}

const ClientRegistration: React.FC<ClientRegistrationProps> = ({ onNavigate }) => {
  const { clients, setClients } = useRegistration();

  const [searchExpanded, setSearchExpanded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [newClient, setNewClient] = useState({
    corporateName: '',
    individualName: '',
    furigana: '',
    postalCode: '',
    address: '',
    email: '',
    phone: '',
    fax: '',
    rating: '',
  });
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setEditingClient(null);
    setNewClient({
      corporateName: '',
      individualName: '',
      furigana: '',
      postalCode: '',
      address: '',
      email: '',
      phone: '',
      fax: '',
      rating: '',
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingClient(null);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setNewClient({
      corporateName: client.corporateName,
      individualName: client.individualName,
      furigana: client.furigana,
      postalCode: client.postalCode,
      address: client.address,
      email: client.email,
      phone: client.phone,
      fax: client.fax,
      rating: client.rating,
    });
    setOpenDialog(true);
  };

  const handleSaveClient = () => {
    if (editingClient) {
      // 編集
      setClients(clients.map(c =>
        c.id === editingClient.id
          ? { ...c, ...newClient }
          : c
      ));
    } else {
      // 新規追加
      const newId = Math.max(...clients.map(c => c.id), 0) + 1;
      setClients([...clients, { id: newId, ...newClient }]);
    }
    handleCloseDialog();
  };

  const handleDeleteClient = (id: number) => {
    setClients(clients.filter(c => c.id !== id));
  };

  const handlePostalCodeChange = async (postalCode: string) => {
    // 郵便番号の更新
    setNewClient({ ...newClient, postalCode });

    // ハイフンを除去して7桁の数字のみにする
    const cleanedPostalCode = postalCode.replace(/-/g, '');

    // 7桁の数字でない場合は住所検索をスキップ
    if (!/^\d{7}$/.test(cleanedPostalCode)) {
      return;
    }

    // 住所を検索
    setIsLoadingAddress(true);
    try {
      const response = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${cleanedPostalCode}`
      );
      const data = await response.json();

      if (data.status === 200 && data.results && data.results.length > 0) {
        const result = data.results[0];
        const fullAddress = `${result.address1}${result.address2}${result.address3}`;
        setNewClient((prev) => ({ ...prev, address: fullAddress, postalCode }));
      }
    } catch (error) {
      console.error('郵便番号の検索に失敗しました:', error);
    } finally {
      setIsLoadingAddress(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #F8F9FA 0%, #E8EAF6 50%, #F3E5F5 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <Sidebar currentPage="client" onNavigate={onNavigate} />

      <Box sx={{ flex: 1, p: 3 }}>
        {/* ヘッダー */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                bgcolor: '#007AFF',
                borderRadius: '50%',
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <SettingsIcon sx={{ color: '#FFFFFF', fontSize: 28 }} />
            </Box>
            <Typography variant="h5" sx={{ color: '#1D1D1F', fontWeight: 600 }}>
              発注者登録
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            sx={{
              bgcolor: '#007AFF',
              color: '#FFFFFF',
              '&:hover': { bgcolor: '#0051D5' },
              borderRadius: '8px',
            }}
          >
            新規登録
          </Button>
        </Box>

        {/* 検索条件 */}
        <Accordion
          expanded={searchExpanded}
          onChange={() => setSearchExpanded(!searchExpanded)}
          sx={{
            mb: 2,
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: 'none',
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>
              検索条件 ({searchExpanded ? '閉じる' : '開く'})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label="発注者名" size="small" />
              <TextField label="住所" size="small" />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* テーブル */}
        <TableContainer
          component={Paper}
          sx={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: 'none',
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#E3F2FD' }}>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, width: 80 }}>修正</TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, width: 80 }}>削除</TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600 }}>発注者(法人名)</TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600 }}>発注者(個人名)</TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600 }}>郵便番号</TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600 }}>住所</TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600 }}>電話番号</TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600 }}>FAX</TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600 }}>評価</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEditClient(client)}
                      sx={{ color: '#007AFF' }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDeleteClient(client.id)}
                      sx={{ color: '#007AFF' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Typography>{client.corporateName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{client.individualName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{client.postalCode}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{client.address}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{client.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{client.phone}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{client.fax}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{client.rating}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 新規登録・編集ダイアログ */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>新規登録</Typography>
            <IconButton onClick={handleCloseDialog} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 3, color: '#666666' }}>
              項目を入力し、よろしければ「登録」を押してください。
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="発注者(法人名)"
                value={newClient.corporateName}
                onChange={(e) => setNewClient({ ...newClient, corporateName: e.target.value })}
              />
              <TextField
                fullWidth
                label="発注者(個人名)"
                value={newClient.individualName}
                onChange={(e) => setNewClient({ ...newClient, individualName: e.target.value })}
              />
              <TextField
                fullWidth
                label="検索用ふりがな"
                value={newClient.furigana}
                onChange={(e) => setNewClient({ ...newClient, furigana: e.target.value })}
              />
              <TextField
                fullWidth
                label="郵便番号"
                value={newClient.postalCode}
                onChange={(e) => handlePostalCodeChange(e.target.value)}
                placeholder="例: 111-2222 または 1112222"
                helperText="郵便番号を入力すると自動で住所が入力されます"
              />
              <TextField
                fullWidth
                label="住所"
                value={newClient.address}
                onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                disabled={isLoadingAddress}
                helperText={isLoadingAddress ? '住所を検索中...' : ''}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
              />
              <TextField
                fullWidth
                label="電話番号"
                value={newClient.phone}
                onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
              />
              <TextField
                fullWidth
                label="FAX"
                value={newClient.fax}
                onChange={(e) => setNewClient({ ...newClient, fax: e.target.value })}
              />
              <FormControl fullWidth>
                <InputLabel>評価</InputLabel>
                <Select
                  value={newClient.rating}
                  label="評価"
                  onChange={(e) => setNewClient({ ...newClient, rating: e.target.value })}
                >
                  <MenuItem value="">選択してください</MenuItem>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={handleCloseDialog}
              sx={{
                bgcolor: '#007AFF',
                color: '#FFFFFF',
                '&:hover': { bgcolor: '#0051D5' },
                borderRadius: '8px',
              }}
            >
              キャンセル
            </Button>
            <Button
              onClick={handleSaveClient}
              variant="contained"
              sx={{
                bgcolor: '#007AFF',
                color: '#FFFFFF',
                '&:hover': { bgcolor: '#0051D5' },
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

export default ClientRegistration;
