import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  InputAdornment,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Save as SaveIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useRegistration } from '../contexts/RegistrationContext';
import Sidebar from '../components/Layout/Sidebar';

type PageType = 'dashboard' | 'construction-list' | 'estimate-list' | 'construction-registration' | 'construction-detail' | 'construction-category' | 'construction-type' | 'building-usage' | 'client' | 'user' | 'company' | 'subcontractor-bulk' | 'subcontractor' | 'work-type' | 'material' | 'lease-item' | 'common-temporary' | 'site-expense' | 'screen-permission' | 'screen-permission-template' | 'workflow-template' | 'accounting-integration';

interface CompanyRegistrationProps {
  onNavigate?: (page: PageType) => void;
}

const FormRow = ({ label, children, alignStart = false }: { label: string; children: React.ReactNode; alignStart?: boolean }) => (
  <Box sx={{ display: 'flex', alignItems: alignStart ? 'flex-start' : 'center', mb: 2 }}>
    <Typography sx={{ minWidth: 180, textAlign: 'right', mr: 2, mt: alignStart ? 1 : 0, fontSize: '0.875rem' }}>{label}</Typography>
    <Box sx={{ flexGrow: 1 }}>{children}</Box>
  </Box>
);

const CompanyRegistration: React.FC<CompanyRegistrationProps> = ({ onNavigate }) => {
  const { companyCode, setCompanyCode } = useRegistration();

  const [selectedOffice, setSelectedOffice] = useState('本社');
  const [companyName, setCompanyName] = useState('株式会社ダンドリワーク');
  const [menuCompanyName, setMenuCompanyName] = useState('株式会社ダンドリワーク');
  const [representative, setRepresentative] = useState('');
  const [postalCode1, setPostalCode1] = useState('');
  const [postalCode2, setPostalCode2] = useState('');
  const [address, setAddress] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const [fax1, setFax1] = useState('');
  const [fax2, setFax2] = useState('');
  const [fax3, setFax3] = useState('');
  const [licenseAuthority, setLicenseAuthority] = useState('知事');
  const [licensePrefecture, setLicensePrefecture] = useState('東京都');
  const [licenseType, setLicenseType] = useState('般');
  const [licenseYear, setLicenseYear] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [fiscalMonth, setFiscalMonth] = useState(12);
  const [decimalHandling, setDecimalHandling] = useState('四捨五入');
  const [hundredYenHandling, setHundredYenHandling] = useState('なし');
  const [thousandYenHandling, setThousandYenHandling] = useState('なし');
  const [tenThousandYenHandling, setTenThousandYenHandling] = useState('なし');
  const [paymentClosingDay, setPaymentClosingDay] = useState('25');
  const [paymentDay, setPaymentDay] = useState('20');
  const [showQuotationNumber, setShowQuotationNumber] = useState(true);
  const [showOrderNumber, setShowOrderNumber] = useState(true);
  const [nextMonthPaymentName, setNextMonthPaymentName] = useState('当月払い');
  const [cashPaymentCurrentMonth, setCashPaymentCurrentMonth] = useState(false);
  const [cashPayment1Month, setCashPayment1Month] = useState(false);
  const [cashPayment2Months, setCashPayment2Months] = useState(false);
  const [cashPayment3Months, setCashPayment3Months] = useState(false);
  const [cashPayment4Months, setCashPayment4Months] = useState(true);
  const [showPaymentBill, setShowPaymentBill] = useState(false);
  const [accidentInsuranceRateUnder, setAccidentInsuranceRateUnder] = useState('6.84');
  const [laborCostRateUnder, setLaborCostRateUnder] = useState('23.00');
  const [accidentInsuranceRateOver, setAccidentInsuranceRateOver] = useState('11.00');
  const [laborCostRateOver, setLaborCostRateOver] = useState('23.00');
  const [departmentCommonFeeRate, setDepartmentCommonFeeRate] = useState('3.00');
  const [departmentCommonFeeThreshold, setDepartmentCommonFeeThreshold] = useState('0');
  const [orderPaymentTerms, setOrderPaymentTerms] = useState('');
  const [orderAcceptancePaymentTerms, setOrderAcceptancePaymentTerms] = useState('');
  const [lostOrderPerson, setLostOrderPerson] = useState('');
  const [lostOrderPhone1, setLostOrderPhone1] = useState('');
  const [lostOrderPhone2, setLostOrderPhone2] = useState('');
  const [lostOrderPhone3, setLostOrderPhone3] = useState('');
  const [lostOrderFax1, setLostOrderFax1] = useState('');
  const [lostOrderFax2, setLostOrderFax2] = useState('');
  const [lostOrderFax3, setLostOrderFax3] = useState('');
  const [lostOrderEmail, setLostOrderEmail] = useState('');
  const [progressClosingDay, setProgressClosingDay] = useState('25');
  const [vendorEvaluationStartMonth, setVendorEvaluationStartMonth] = useState(4);
  const [vendorEvaluationEndMonth, setVendorEvaluationEndMonth] = useState(3);

  const calculatedRateUnder = (parseFloat(accidentInsuranceRateUnder || '0') * parseFloat(laborCostRateUnder || '0') / 100).toFixed(4);

  const handleSave = () => {
    alert('会社情報を保存しました');
  };

  const handleAddBranch = () => {
    alert('支店を追加します');
  };

  const handleVendorEvaluationStartMonthChange = (month: number) => {
    setVendorEvaluationStartMonth(month);
    // 開始月の前月を終了月に設定（12ヶ月後の前月）
    const endMonth = month === 1 ? 12 : month - 1;
    setVendorEvaluationEndMonth(endMonth);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "linear-gradient(to bottom right, #F8F9FA 0%, #E8EAF6 50%, #F3E5F5 100%)", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <Sidebar currentPage="company" onNavigate={onNavigate} />
      <Box sx={{ flex: 1, p: 3 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ bgcolor: '#007AFF', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SettingsIcon sx={{ color: '#FFFFFF', fontSize: 28 }} />
              </Box>
              <Typography variant="h5" sx={{ color: '#1C2026', fontWeight: 600 }}>会社登録情報設定</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ minWidth: 200, bgcolor: '#FFFFFF' }} size="small">
                <Select value={selectedOffice} onChange={(e) => setSelectedOffice(e.target.value)}>
                  <MenuItem value="本社">本社</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} sx={{ bgcolor: '#007AFF', color: '#FFFFFF', '&:hover': { bgcolor: '#0051D5' }, borderRadius: '8px' }}>保存</Button>
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddBranch} sx={{ bgcolor: '#007AFF', color: '#FFFFFF', '&:hover': { bgcolor: '#0051D5' }, borderRadius: '8px' }}>支店追加</Button>
            </Box>
          </Box>

          <Box sx={{
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            p: 4,
            borderRadius: 2,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
          <FormRow label="会社名">
            <TextField fullWidth value={companyName} onChange={(e) => setCompanyName(e.target.value)} size="small" />
          </FormRow>

          <FormRow label="メニュー表示用会社名">
            <TextField value={menuCompanyName} onChange={(e) => setMenuCompanyName(e.target.value)} size="small" sx={{ width: 400 }} />
          </FormRow>

          <FormRow label="会社コード">
            <TextField fullWidth value={companyCode} onChange={(e) => setCompanyCode(e.target.value)} size="small" />
          </FormRow>

          <FormRow label="代表取締役">
            <TextField fullWidth value={representative} onChange={(e) => setRepresentative(e.target.value)} size="small" />
          </FormRow>

          <FormRow label="郵便番号">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField value={postalCode1} onChange={(e) => setPostalCode1(e.target.value)} size="small" sx={{ width: 100 }} />
              <Typography>-</Typography>
              <TextField value={postalCode2} onChange={(e) => setPostalCode2(e.target.value)} size="small" sx={{ width: 120 }} />
            </Box>
          </FormRow>

          <FormRow label="住所">
            <TextField fullWidth value={address} onChange={(e) => setAddress(e.target.value)} size="small" />
          </FormRow>

          <FormRow label="電話番号">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField value={phone1} onChange={(e) => setPhone1(e.target.value)} size="small" sx={{ width: 80 }} />
              <Typography>-</Typography>
              <TextField value={phone2} onChange={(e) => setPhone2(e.target.value)} size="small" sx={{ width: 100 }} />
              <Typography>-</Typography>
              <TextField value={phone3} onChange={(e) => setPhone3(e.target.value)} size="small" sx={{ width: 100 }} />
            </Box>
          </FormRow>

          <FormRow label="FAX">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField value={fax1} onChange={(e) => setFax1(e.target.value)} size="small" sx={{ width: 80 }} />
              <Typography>-</Typography>
              <TextField value={fax2} onChange={(e) => setFax2(e.target.value)} size="small" sx={{ width: 100 }} />
              <Typography>-</Typography>
              <TextField value={fax3} onChange={(e) => setFax3(e.target.value)} size="small" sx={{ width: 100 }} />
            </Box>
          </FormRow>

          <FormRow label="建設業許可番号">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              {licenseAuthority === '知事' && (
                <>
                  <FormControl sx={{ minWidth: 120 }} size="small">
                    <Select value={licensePrefecture} onChange={(e) => setLicensePrefecture(e.target.value)}>
                      <MenuItem value="北海道">北海道</MenuItem>
                      <MenuItem value="青森県">青森県</MenuItem>
                      <MenuItem value="岩手県">岩手県</MenuItem>
                      <MenuItem value="宮城県">宮城県</MenuItem>
                      <MenuItem value="秋田県">秋田県</MenuItem>
                      <MenuItem value="山形県">山形県</MenuItem>
                      <MenuItem value="福島県">福島県</MenuItem>
                      <MenuItem value="茨城県">茨城県</MenuItem>
                      <MenuItem value="栃木県">栃木県</MenuItem>
                      <MenuItem value="群馬県">群馬県</MenuItem>
                      <MenuItem value="埼玉県">埼玉県</MenuItem>
                      <MenuItem value="千葉県">千葉県</MenuItem>
                      <MenuItem value="東京都">東京都</MenuItem>
                      <MenuItem value="神奈川県">神奈川県</MenuItem>
                      <MenuItem value="新潟県">新潟県</MenuItem>
                      <MenuItem value="富山県">富山県</MenuItem>
                      <MenuItem value="石川県">石川県</MenuItem>
                      <MenuItem value="福井県">福井県</MenuItem>
                      <MenuItem value="山梨県">山梨県</MenuItem>
                      <MenuItem value="長野県">長野県</MenuItem>
                      <MenuItem value="岐阜県">岐阜県</MenuItem>
                      <MenuItem value="静岡県">静岡県</MenuItem>
                      <MenuItem value="愛知県">愛知県</MenuItem>
                      <MenuItem value="三重県">三重県</MenuItem>
                      <MenuItem value="滋賀県">滋賀県</MenuItem>
                      <MenuItem value="京都府">京都府</MenuItem>
                      <MenuItem value="大阪府">大阪府</MenuItem>
                      <MenuItem value="兵庫県">兵庫県</MenuItem>
                      <MenuItem value="奈良県">奈良県</MenuItem>
                      <MenuItem value="和歌山県">和歌山県</MenuItem>
                      <MenuItem value="鳥取県">鳥取県</MenuItem>
                      <MenuItem value="島根県">島根県</MenuItem>
                      <MenuItem value="岡山県">岡山県</MenuItem>
                      <MenuItem value="広島県">広島県</MenuItem>
                      <MenuItem value="山口県">山口県</MenuItem>
                      <MenuItem value="徳島県">徳島県</MenuItem>
                      <MenuItem value="香川県">香川県</MenuItem>
                      <MenuItem value="愛媛県">愛媛県</MenuItem>
                      <MenuItem value="高知県">高知県</MenuItem>
                      <MenuItem value="福岡県">福岡県</MenuItem>
                      <MenuItem value="佐賀県">佐賀県</MenuItem>
                      <MenuItem value="長崎県">長崎県</MenuItem>
                      <MenuItem value="熊本県">熊本県</MenuItem>
                      <MenuItem value="大分県">大分県</MenuItem>
                      <MenuItem value="宮崎県">宮崎県</MenuItem>
                      <MenuItem value="鹿児島県">鹿児島県</MenuItem>
                      <MenuItem value="沖縄県">沖縄県</MenuItem>
                    </Select>
                  </FormControl>
                </>
              )}
              <FormControl sx={{ minWidth: 140 }} size="small">
                <Select value={licenseAuthority} onChange={(e) => setLicenseAuthority(e.target.value)}>
                  <MenuItem value="知事">知事</MenuItem>
                  <MenuItem value="国土交通大臣">国土交通大臣</MenuItem>
                </Select>
              </FormControl>
              <Typography sx={{ fontSize: '0.875rem' }}>許可</Typography>
              <Typography sx={{ fontSize: '0.875rem' }}>(</Typography>
              <FormControl sx={{ minWidth: 70 }} size="small">
                <Select value={licenseType} onChange={(e) => setLicenseType(e.target.value)}>
                  <MenuItem value="般">般</MenuItem>
                  <MenuItem value="特">特</MenuItem>
                </Select>
              </FormControl>
              <Typography sx={{ fontSize: '0.875rem' }}>-</Typography>
              <TextField value={licenseYear} onChange={(e) => setLicenseYear(e.target.value)} size="small" sx={{ width: 70 }} placeholder="30" />
              <Typography sx={{ fontSize: '0.875rem' }}>)</Typography>
              <Typography sx={{ fontSize: '0.875rem' }}>第</Typography>
              <TextField value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} size="small" sx={{ width: 120 }} placeholder="123456" />
              <Typography sx={{ fontSize: '0.875rem' }}>号</Typography>
            </Box>
          </FormRow>

          <FormRow label="決算月">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FormControl sx={{ minWidth: 80 }} size="small">
                <Select value={fiscalMonth} onChange={(e) => setFiscalMonth(Number(e.target.value))}>
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                </Select>
              </FormControl>
              <Typography>月</Typography>
            </Box>
          </FormRow>

          <FormRow label="小数の扱い">
            <FormControl sx={{ minWidth: 150 }} size="small">
              <Select value={decimalHandling} onChange={(e) => setDecimalHandling(e.target.value)}>
                <MenuItem value="四捨五入">四捨五入</MenuItem>
                <MenuItem value="切り上げ">切り上げ</MenuItem>
                <MenuItem value="切り捨て">切り捨て</MenuItem>
              </Select>
            </FormControl>
          </FormRow>

          <FormRow label="単価の扱い">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '0.875rem' }}>百円</Typography>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select value={hundredYenHandling} onChange={(e) => setHundredYenHandling(e.target.value)}>
                  <MenuItem value="なし">なし</MenuItem>
                  <MenuItem value="四捨五入">四捨五入</MenuItem>
                  <MenuItem value="切り上げ">切り上げ</MenuItem>
                  <MenuItem value="切り捨て">切り捨て</MenuItem>
                </Select>
              </FormControl>
              <Typography sx={{ ml: 2, fontSize: '0.875rem' }}>千円</Typography>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select value={thousandYenHandling} onChange={(e) => setThousandYenHandling(e.target.value)}>
                  <MenuItem value="なし">なし</MenuItem>
                  <MenuItem value="四捨五入">四捨五入</MenuItem>
                  <MenuItem value="切り上げ">切り上げ</MenuItem>
                  <MenuItem value="切り捨て">切り捨て</MenuItem>
                </Select>
              </FormControl>
              <Typography sx={{ ml: 2, fontSize: '0.875rem' }}>万円</Typography>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select value={tenThousandYenHandling} onChange={(e) => setTenThousandYenHandling(e.target.value)}>
                  <MenuItem value="なし">なし</MenuItem>
                  <MenuItem value="四捨五入">四捨五入</MenuItem>
                  <MenuItem value="切り上げ">切り上げ</MenuItem>
                  <MenuItem value="切り捨て">切り捨て</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </FormRow>

          <FormRow label="支払条件">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '0.875rem' }}>毎月</Typography>
              <TextField value={paymentClosingDay} onChange={(e) => setPaymentClosingDay(e.target.value)} size="small" sx={{ width: 60 }} />
              <Typography sx={{ fontSize: '0.875rem' }}>日締め</Typography>
              <Typography sx={{ ml: 2, fontSize: '0.875rem' }}>翌月</Typography>
              <TextField value={paymentDay} onChange={(e) => setPaymentDay(e.target.value)} size="small" sx={{ width: 60 }} />
              <Typography sx={{ fontSize: '0.875rem' }}>日支払</Typography>
            </Box>
          </FormRow>

          <FormRow label="見積番号">
            <FormControlLabel control={<Checkbox checked={showQuotationNumber} onChange={(e) => setShowQuotationNumber(e.target.checked)} />} label="表示する" />
          </FormRow>

          <FormRow label="注文番号">
            <FormControlLabel control={<Checkbox checked={showOrderNumber} onChange={(e) => setShowOrderNumber(e.target.checked)} />} label="表示する" />
          </FormRow>

          <FormRow label="翌月支払呼称">
            <FormControl sx={{ minWidth: 150 }} size="small">
              <Select value={nextMonthPaymentName} onChange={(e) => setNextMonthPaymentName(e.target.value)}>
                <MenuItem value="当月払い">当月払い</MenuItem>
                <MenuItem value="翌月払い">翌月払い</MenuItem>
              </Select>
            </FormControl>
          </FormRow>

          <FormRow label="現金支払">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <FormControlLabel control={<Checkbox checked={cashPaymentCurrentMonth} onChange={(e) => setCashPaymentCurrentMonth(e.target.checked)} />} label="当月現金" />
              <FormControlLabel control={<Checkbox checked={cashPayment1Month} onChange={(e) => setCashPayment1Month(e.target.checked)} />} label="1ヶ月後支払" />
              <FormControlLabel control={<Checkbox checked={cashPayment2Months} onChange={(e) => setCashPayment2Months(e.target.checked)} />} label="2ヶ月後支払" />
              <FormControlLabel control={<Checkbox checked={cashPayment3Months} onChange={(e) => setCashPayment3Months(e.target.checked)} />} label="3ヶ月後支払" />
              <FormControlLabel control={<Checkbox checked={cashPayment4Months} onChange={(e) => setCashPayment4Months(e.target.checked)} />} label="4ヶ月後支払" />
            </Box>
          </FormRow>

          <FormRow label="支払手形">
            <FormControlLabel control={<Checkbox checked={showPaymentBill} onChange={(e) => setShowPaymentBill(e.target.checked)} />} label="表示する" />
          </FormRow>

          <FormRow label="法定福利" alignStart>
            <Box>
              <Typography sx={{ fontSize: '0.875rem', mb: 1 }}>【請負金額(税抜)が1億8000万円未満の場合】</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography sx={{ fontSize: '0.875rem' }}>労災保険率</Typography>
                <TextField value={accidentInsuranceRateUnder} onChange={(e) => setAccidentInsuranceRateUnder(e.target.value)} size="small" sx={{ width: 110 }} InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }} />
                <Typography sx={{ fontSize: '0.875rem' }}>× 労務費率</Typography>
                <TextField value={laborCostRateUnder} onChange={(e) => setLaborCostRateUnder(e.target.value)} size="small" sx={{ width: 110 }} InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }} />
                <Typography sx={{ fontSize: '0.875rem' }}>= {calculatedRateUnder}</Typography>
              </Box>
              <Typography sx={{ fontSize: '0.875rem', mb: 1 }}>【請負金額(税抜)が1億8000万円以上の場合】</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: '0.875rem' }}>労災保険率</Typography>
                <TextField value={accidentInsuranceRateOver} onChange={(e) => setAccidentInsuranceRateOver(e.target.value)} size="small" sx={{ width: 110 }} InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }} />
                <Typography sx={{ fontSize: '0.875rem' }}>労務費率</Typography>
                <TextField value={laborCostRateOver} onChange={(e) => setLaborCostRateOver(e.target.value)} size="small" sx={{ width: 110 }} InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }} />
              </Box>
            </Box>
          </FormRow>

          <FormRow label="部門共通費" alignStart>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography sx={{ fontSize: '0.875rem' }}>掛け率</Typography>
                <TextField value={departmentCommonFeeRate} onChange={(e) => setDepartmentCommonFeeRate(e.target.value)} size="small" sx={{ width: 110 }} InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }} />
                <Typography sx={{ fontSize: '0.875rem', ml: 2 }}>適用下限金額</Typography>
                <TextField value={departmentCommonFeeThreshold} onChange={(e) => setDepartmentCommonFeeThreshold(e.target.value)} size="small" sx={{ width: 140 }} InputProps={{ endAdornment: <InputAdornment position="end">円</InputAdornment> }} />
              </Box>
              <Typography sx={{ fontSize: '0.75rem', color: '#666666' }}>部門共通費は、当初工事または請負金額が適用下限金額以上の場合に計算されます。</Typography>
            </Box>
          </FormRow>

          <FormRow label="注文書支払条件（その他）" alignStart>
            <TextField fullWidth multiline rows={4} value={orderPaymentTerms} onChange={(e) => setOrderPaymentTerms(e.target.value)} />
          </FormRow>

          <FormRow label="注文請書支払条件（その他）" alignStart>
            <TextField fullWidth multiline rows={4} value={orderAcceptancePaymentTerms} onChange={(e) => setOrderAcceptancePaymentTerms(e.target.value)} />
          </FormRow>

          <FormRow label="失注書担当者">
            <TextField fullWidth value={lostOrderPerson} onChange={(e) => setLostOrderPerson(e.target.value)} size="small" />
          </FormRow>

          <FormRow label="失注書電話番号">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField value={lostOrderPhone1} onChange={(e) => setLostOrderPhone1(e.target.value)} size="small" sx={{ width: 80 }} />
              <Typography>-</Typography>
              <TextField value={lostOrderPhone2} onChange={(e) => setLostOrderPhone2(e.target.value)} size="small" sx={{ width: 100 }} />
              <Typography>-</Typography>
              <TextField value={lostOrderPhone3} onChange={(e) => setLostOrderPhone3(e.target.value)} size="small" sx={{ width: 100 }} />
            </Box>
          </FormRow>

          <FormRow label="失注書FAX">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField value={lostOrderFax1} onChange={(e) => setLostOrderFax1(e.target.value)} size="small" sx={{ width: 80 }} />
              <Typography>-</Typography>
              <TextField value={lostOrderFax2} onChange={(e) => setLostOrderFax2(e.target.value)} size="small" sx={{ width: 100 }} />
              <Typography>-</Typography>
              <TextField value={lostOrderFax3} onChange={(e) => setLostOrderFax3(e.target.value)} size="small" sx={{ width: 100 }} />
            </Box>
          </FormRow>

          <FormRow label="失注書メールアドレス">
            <TextField fullWidth value={lostOrderEmail} onChange={(e) => setLostOrderEmail(e.target.value)} size="small" placeholder="example@company.com" />
          </FormRow>

          <FormRow label="出来高査定締め日">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '0.875rem' }}>毎月</Typography>
              <TextField value={progressClosingDay} onChange={(e) => setProgressClosingDay(e.target.value)} size="small" sx={{ width: 60 }} />
              <Typography sx={{ fontSize: '0.875rem' }}>日</Typography>
            </Box>
          </FormRow>

          <FormRow label="業者評価期間">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FormControl sx={{ minWidth: 80 }} size="small">
                <Select value={vendorEvaluationStartMonth} onChange={(e) => handleVendorEvaluationStartMonthChange(Number(e.target.value))}>
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                </Select>
              </FormControl>
              <Typography>月</Typography>
              <Typography sx={{ mx: 1 }}>〜</Typography>
              <FormControl sx={{ minWidth: 80 }} size="small">
                <Select value={vendorEvaluationEndMonth} onChange={(e) => setVendorEvaluationEndMonth(Number(e.target.value))}>
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                </Select>
              </FormControl>
              <Typography>月</Typography>
            </Box>
          </FormRow>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default CompanyRegistration;
