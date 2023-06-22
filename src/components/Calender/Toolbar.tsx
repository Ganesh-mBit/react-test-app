import React from 'react';
import { Box, MenuItem, Select, type SelectChangeEvent, Typography, FormControl } from '@mui/material';
import { IoAddCircleSharp } from 'react-icons/io5';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

interface CustomToolbarProps {
  date: Date
  view: string
  onView: any
  onNavigate: any
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ date, view, onView, onNavigate }): JSX.Element => {
  const handleSelect = (event: SelectChangeEvent): void => {
    onView(event.target.value);
  };

  const formatMonthYear = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short'
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', border: '1px solid #ddd', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: { xs: 'space-between', md: 'flex-start' }, flex: 5, alignItems: 'center', gap: 4 }}>
        <Box>
          <Typography
            variant="h4"
            noWrap
            color="secondary"
            sx={{ flexGrow: 1, fontWeight: 'bold' }}
          >
            Calendar
          </Typography>
        </Box>
        <Box>
          <IoAddCircleSharp color='#001762' size={40} />
        </Box>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flex: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, gap: 2 }}>
          <FaCaretLeft size={20} style={{ cursor: 'pointer', color: '#001762' }} onClick={() => { onNavigate('PREV'); }} />
          <Typography variant='h6'>{formatMonthYear(date)}</Typography>
          <FaCaretRight size={20} style={{ cursor: 'pointer', color: '#001762' }} onClick={() => { onNavigate('NEXT'); }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <FormControl fullWidth>
            <Select
              value={view}
              onChange={handleSelect}
              sx={{ color: '#001762', fontWeight: 'bold' }}
            >
              <MenuItem value='month'>Month</MenuItem>
              <MenuItem value='week'>Week</MenuItem>
              <MenuItem value='agenda'>Agenda</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomToolbar;
