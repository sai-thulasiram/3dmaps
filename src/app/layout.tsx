import * as React from 'react';
import Box from '@mui/material/Box';

import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';

import CustomDrawer from '@/components/CustomDrawer';

export const metadata = {
  title: 'Next.js App Router + Material UI v5',
  description: 'Next.js App Router + Material UI v5',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <body style={{ height: '100%' }}>
        <ThemeRegistry>
          <CustomDrawer />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              ml: `${70}px`,
              mt: ['38px'],
              p: 3,
              height: '85%'
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
