import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#494D51',
        color: '#FFFFFF',
        py: 3,
        px: 4,
        mt: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Link
            href="#"
            sx={{
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: '0.875rem',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            プライバシーポリシー
          </Link>
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.75rem',
              mt: 1,
              color: '#E4E4E5',
            }}
          >
            (c) KAWATA Construction Co., Ltd. All Right Reserved.
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '1.25rem',
              letterSpacing: 1,
            }}
          >
            IMPACT
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '1.25rem',
              letterSpacing: 1,
            }}
          >
            CONSTRUCTION
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: '0.65rem',
              color: '#E4E4E5',
              display: 'block',
              mt: 0.5,
            }}
          >
            クラウド型建設現場工事支援システム
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
