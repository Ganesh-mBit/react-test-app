import React, { useState } from 'react';
import Flags from 'country-flag-icons/react/3x2';
import {
  TextField,
  FormControl, Input, useTheme,
  Button, Box, Menu, MenuItem, IconButton, InputAdornment, SvgIcon
} from '@mui/material';
import baseCountries from '../json/country_data';
import type { BaseCountriesType } from '../json/country_data';
import { Controller, useFieldArray } from 'react-hook-form';
import LabelDescriptionField from './LabelDescriptionField';

interface FormInputPhoneNumberProps {
  name: any
  control: any
  label?: string
  sideLabel?: string
  width?: string | number
  buttonLabel?: string
  maxLen?: number
  countries?: string[] | undefined
  outterSX?: React.CSSProperties
  disableButton?: boolean
  handleButton?: (() => void) | undefined
  setValue?: any
}

const FormInputPhoneNumber: React.FC<FormInputPhoneNumberProps> = (props): JSX.Element => {
  const {
    name,
    control,
    outterSX,
    disableButton,
    label,
    width,
    sideLabel,
    buttonLabel,
    countries,
    handleButton,
    setValue,
    maxLen
  } = props;

  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const customCountries = baseCountries.filter((item: any) => countries?.includes(item?.isoCode.toLowerCase()));
  const { fields } = useFieldArray({ control, name });

  const handleFlagItemClick = (country: BaseCountriesType, onChange: (...event: any[]) => void, index: number): void => {
    setAnchorEl(null);
    onChange(country.isoCode);
    setValue(`${name as string}.${index}.dialCode`, `${country.dialCode}`);
  };

  return (
    <Box>
      <LabelDescriptionField
        label={label}
        sideLabel={sideLabel}
      />
      {fields.map((item, index) => {
        return (
          <Controller
            key={item?.id}
            name={`${name as string}.${index}.phoneNumber`}
            control={control}
            render={({
              field,
              fieldState: { error }
            }) => {
              return (
                <FormControl sx={{ width: { width }, ...outterSX }}>
                  <TextField
                    value={field?.value}
                    type="tel"
                    onChange={(e) => {
                      const regex = /^[0-9\b]+$/;
                      if (e.target.value === '' || regex.test(e.target.value)) {
                        field.onChange(maxLen && e.target.value.length > maxLen ? e.target.value.slice(0, maxLen) : e.target.value);
                      }
                    }}
                    error={!!error}
                    helperText={error?.message ?? ' '}
                    fullWidth
                    sx={{
                      '.MuiOutlinedInput-root': { bgcolor: 'white', color: 'secondary.main', paddingLeft: 1 },
                      '.MuiOutlinedInput-notchedOutline': { borderColor: 'border.main' },
                      '& svg': { height: '1em' }
                    }}
                    variant="outlined"
                    inputMode="numeric"
                    autoComplete="tel"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                        >
                          <Controller
                            name={`${name as string}.${index}.isoCode`}
                            control={control}
                            render={({
                              field: { onChange, value }
                            }) => {
                              return (
                                <Box>
                                  <IconButton
                                    onClick={(e: any) => { setAnchorEl(e.currentTarget); }}
                                  >
                                    <SvgIcon component={Flags[(!value ? customCountries?.[0]?.isoCode : value) as keyof typeof Flags]} inheritViewBox fontSize="medium" />
                                  </IconButton>
                                  <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={(): void => { setAnchorEl(null); }}
                                  >
                                    {customCountries.map((country) => {
                                      return (
                                        <MenuItem
                                          key={country?.isoCode}
                                          onClick={(): void => { handleFlagItemClick(country, onChange, index); }}
                                        >
                                          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                                            <SvgIcon component={Flags[country?.isoCode as keyof typeof Flags]} inheritViewBox fontSize="small" />
                                            <Box>{country?.name}</Box>
                                            <Box>{country?.dialCode}</Box>
                                          </Box>
                                        </MenuItem>
                                      );
                                    })}
                                  </Menu>
                                </Box>
                              );
                            }}
                          />
                          <Controller
                            name={`${name as string}.${index}.dialCode`}
                            control={control}
                            render={({
                              field: { value }
                            }) => {
                              return (
                                <Input
                                  sx={{
                                    '& .MuiInput-input.Mui-disabled': {
                                      WebkitTextFillColor: theme.palette.secondary.main,
                                      color: theme.palette.secondary.main,
                                      textAlign: 'center',
                                      width: 35 // Control width of flag & country IsCode
                                    },
                                    '&.MuiInput-root': {
                                      ':before': {
                                        borderBottom: 'none'
                                      }
                                    }
                                  }}
                                  value={!value ? customCountries?.[0]?.dialCode : value}
                                  disabled
                                />
                              );
                            }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (buttonLabel && (
                        <InputAdornment position="end">
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            sx={{ borderRadius: 50, px: 2 }}
                            onClick={handleButton}
                            disabled={disableButton}
                          >
                            {buttonLabel}
                          </Button>
                        </InputAdornment>
                      ))
                    }}
                  />
                </FormControl>
              );
            }}
          />
        );
      })}
    </Box>
  );
};

FormInputPhoneNumber.defaultProps = {
  width: '',
  buttonLabel: '',
  sideLabel: '',
  outterSX: {},
  maxLen: 0,
  countries: [''],
  disableButton: false,
  setValue: () => { },
  handleButton: () => { }
};

export default FormInputPhoneNumber;
