import React from 'react';
import { Box, ListItem } from '@mui/material';

interface ColorPickerProps {
  value: string
  onChange: (value: any) => void
  options: string[]
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, options }): React.ReactElement => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: 2, py: 1 }}>
      {options.map((color) => (
        <ListItem
          aria-label={color}
          value={color}
          key={color}
          onClick={(e: any) => { onChange(e.target?.ariaLabel); }}
          sx={{
            width: '28px',
            height: '28px',
            borderRadius: '100%',
            backgroundColor: color,
            p: 0,
            cursor: 'pointer',
            outline: value === color ? '2px solid gray' : ''
          }} />
      ))}
    </Box>
  );
};

export default ColorPicker;
