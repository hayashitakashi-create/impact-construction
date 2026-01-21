import React, { useState } from 'react';
import {
  Box,
  Container,
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
  FormHelperText,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useRegistration, ConstructionType } from '../contexts/RegistrationContext';

const ConstructionTypeRegistration: React.FC = () => {
  const { constructionTypes, setConstructionTypes } = useRegistration();

  const [searchExpanded, setSearchExpanded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newType, setNewType] = useState({
    itemNumber: '',
    workGroup: '',
    workName: '',
    clientWorkName: '',
  });
  const [errors, setErrors] = useState({
    itemNumber: false,
    workGroup: false,
    workName: false,
    clientWorkName: false,
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setNewType({
      itemNumber: '',
      workGroup: '',
      workName: '',
      clientWorkName: '',
    });
    setErrors({
      itemNumber: false,
      workGroup: false,
      workName: false,
      clientWorkName: false,
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddType = () => {
    // バリデーション
    const newErrors = {
      itemNumber: newType.itemNumber === '',
      workGroup: newType.workGroup === '',
      workName: newType.workName === '',
      clientWorkName: newType.clientWorkName === '',
    };
    setErrors(newErrors);

    if (newErrors.itemNumber || newErrors.workGroup || newErrors.workName || newErrors.clientWorkName) {
      return;
    }

    // 新規追加
    const newId = Math.max(...constructionTypes.map(t => t.id), 0) + 1;
    setConstructionTypes([...constructionTypes, {
      id: newId,
      itemNumber: parseInt(newType.itemNumber),
      workGroup: newType.workGroup,
      workName: newType.workName,
      clientWorkName: newType.clientWorkName,
    }]);
    handleCloseDialog();
  };

  const handleDeleteType = (id: number) => {
    setConstructionTypes(constructionTypes.filter(t => t.id !== id));
  };

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
              <SettingsIcon sx={{ color: '#FFFFFF', fontSize: 28 }} />
            </Box>
            <Typography variant="h4" sx={{ color: '#1C2026', fontWeight: 600 }}>
              工種登録
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            sx={{
              bgcolor: '#42A5F5',
              color: '#FFFFFF',
              '&:hover': { bgcolor: '#1E88E5' },
            }}
          >
            新規登録
          </Button>
        </Box>

        {/* 検索条件 */}
        <Accordion
          expanded={searchExpanded}
          onChange={() => setSearchExpanded(!searchExpanded)}
          sx={{ mb: 2, bgcolor: '#E0E0E0' }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>
              検索条件 ({searchExpanded ? '閉じる' : '開く'})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label="工種グループ" size="small" />
              <TextField label="工種名" size="small" />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* テーブル */}
        <TableContainer sx={{ bgcolor: '#FFFFFF' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#B0BEC5' }}>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, width: 80 }}>修正</TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, width: 80 }}>削除</TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, width: 100 }}>科目番号</TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600, width: 200 }}>工種グループ</TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600 }}>工種名</TableCell>
                <TableCell sx={{ color: '#1C2026', fontWeight: 600 }}>客出工種名</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {constructionTypes.map((type) => (
                <TableRow key={type.id}>
                  <TableCell>
                    <IconButton sx={{ color: '#42A5F5' }}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDeleteType(type.id)}
                      sx={{ color: '#42A5F5' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Typography>{type.itemNumber}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{type.workGroup}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{type.workName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{type.clientWorkName}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 新規登録ダイアログ */}
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

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <TextField
                  fullWidth
                  label="科目番号"
                  type="number"
                  value={newType.itemNumber}
                  onChange={(e) => setNewType({ ...newType, itemNumber: e.target.value })}
                  error={errors.itemNumber}
                />
                <FormHelperText sx={{ color: '#DC1D1D' }}>必須です</FormHelperText>
              </Box>

              <Box>
                <FormControl fullWidth error={errors.workGroup}>
                  <InputLabel>工種グループ</InputLabel>
                  <Select
                    value={newType.workGroup}
                    label="工種グループ"
                    onChange={(e) => setNewType({ ...newType, workGroup: e.target.value })}
                  >
                    <MenuItem value="">選択してください</MenuItem>
                    <MenuItem value="躯体工事">躯体工事</MenuItem>
                    <MenuItem value="仕上げ工事">仕上げ工事</MenuItem>
                    <MenuItem value="設備工事">設備工事</MenuItem>
                    <MenuItem value="その他工事">その他工事</MenuItem>
                  </Select>
                </FormControl>
                <FormHelperText sx={{ color: '#DC1D1D' }}>必須です</FormHelperText>
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="工種名"
                  value={newType.workName}
                  onChange={(e) => setNewType({ ...newType, workName: e.target.value })}
                  error={errors.workName}
                />
                <FormHelperText sx={{ color: '#DC1D1D' }}>必須です</FormHelperText>
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="客出工種名"
                  value={newType.clientWorkName}
                  onChange={(e) => setNewType({ ...newType, clientWorkName: e.target.value })}
                  error={errors.clientWorkName}
                />
                <FormHelperText sx={{ color: '#DC1D1D' }}>必須です</FormHelperText>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={handleCloseDialog}
              sx={{
                bgcolor: '#42A5F5',
                color: '#FFFFFF',
                '&:hover': { bgcolor: '#1E88E5' },
              }}
            >
              キャンセル
            </Button>
            <Button
              onClick={handleAddType}
              variant="contained"
              sx={{
                bgcolor: '#42A5F5',
                color: '#FFFFFF',
                '&:hover': { bgcolor: '#1E88E5' },
              }}
            >
              登録
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ConstructionTypeRegistration;
