import React from 'react';
import { Box } from '@mui/material';

type SXProps = Record<string, string | number>;

interface TabPanelProps {
  children: React.ReactNode
  index: string | number
  tabValue: string | number
  mainSX?: SXProps
  tabPanelSX?: SXProps
}

const TabPanel: React.FC<TabPanelProps> = ({ children, index, tabValue, tabPanelSX, mainSX }) => {
  return (
    <Box
      role="tabpanel"
      hidden={tabValue !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ ...mainSX }}
    >
      {tabValue === index && (
        <Box sx={{ ...tabPanelSX }}>
          {children}
        </Box>
      )}
    </Box>
  );
};

export default TabPanel;
