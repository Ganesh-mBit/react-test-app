import { Box } from '@mui/material';
import { CAPTION, H5 } from './Typography';

interface LabelDescriptionFieldProps {
  label?: string
  sideLabel?: string
}

const LabelDescriptionField: React.FC<LabelDescriptionFieldProps> = (props: any): JSX.Element => {
  const {
    label,
    sideLabel
  } = props;

  return (
    <Box mb={label ? 1 : 0}>
      <H5 display="inline">{label}</H5>
      {sideLabel && (
        <CAPTION>{sideLabel}</CAPTION>
      )}
    </Box>
  );
};

LabelDescriptionField.defaultProps = {
  label: '',
  sideLabel: ''
};

export default LabelDescriptionField;
