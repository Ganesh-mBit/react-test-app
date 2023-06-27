import React from 'react';
import { Box, MenuItem, Select, type SelectChangeEvent, Typography, FormControl } from '@mui/material';
import { IoAddCircleSharp } from 'react-icons/io5';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { type View, type ToolbarProps } from 'react-big-calendar';

interface CustomToolbarProps extends ToolbarProps {
  selectSlot: any
}

const CustomToolbar: React.FC<CustomToolbarProps> = (props): JSX.Element => {
  const { onView, onNavigate, view, label, selectSlot } = props;

  const handleSelect = (event: SelectChangeEvent): void => {
    onView(event.target.value as View);
  };

  return (
    <Box sx={{ p: { xs: 1, md: 2 }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', border: '1px solid #ddd', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: { xs: 'space-between', md: 'flex-start' }, flex: 5, alignItems: 'center', gap: 4 }}>
        <Box>
          <Typography
            variant="h4"
            noWrap
            color="secondary"
            sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => {
              onNavigate('TODAY');
              onView('month');
            }}
          >
            Calendar
          </Typography>
        </Box>
        <Box sx={{ cursor: 'pointer' }}>
          <IoAddCircleSharp onClick={selectSlot} color='#001762' size={40} />
        </Box>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flex: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 2, gap: 1 }}>
          <FaCaretLeft id='leftArrow' size={20} style={{ cursor: 'pointer', color: '#001762' }} onClick={() => { onNavigate('PREV'); }} />
          <Typography noWrap variant='body1'>{label}</Typography>
          <FaCaretRight id='rightArrow' size={20} style={{ cursor: 'pointer', color: '#001762' }} onClick={() => { onNavigate('NEXT'); }} />
        </Box>
        <Box sx={{ minWidth: '130px' }}>
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
    </Box >
  );
};

export default CustomToolbar;
