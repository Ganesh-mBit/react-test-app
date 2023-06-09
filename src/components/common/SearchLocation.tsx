// /* eslint-disable*/
import React, { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import {
  FormControl,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  ClickAwayListener
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

interface SearchLocationProps {
  field?: any
  width?: string | number
  outterSX?: React.CSSProperties
  defaultValue?: string
  placeHolder?: string
  helperText?: string
  disabled?: boolean
  validationError?: boolean
  clearLocation?: boolean
  getPlaceId?: ((locationId: string, locationData: any) => void) | undefined
  handleSelection?: ((location: any, locationText: string, locationId: string) => void) | undefined
  clearErrors?: (() => void) | undefined
}

const SearchLocation: React.FC<SearchLocationProps> = (props): JSX.Element => {
  const {
    field,
    width,
    outterSX,
    defaultValue,
    placeHolder,
    helperText,
    disabled,
    validationError,
    clearLocation,
    getPlaceId,
    handleSelection,
    clearErrors
  } = props;

  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [results, setResults] = useState([]);
  const [errorApi, setErrorApi] = useState('');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const storedResultsString = localStorage.getItem('locations');
  const storedResults = storedResultsString ? JSON.parse(storedResultsString) : [];

  const getAddressAutocomplete = async (query: string, sessionId: string): Promise<any> => {
    const BASE_URL = 'https://api.gamestoppedout.com';
    const ADDRESS_URL = `${BASE_URL}/address/v1.0/autocomplete?q=${query}&st=${sessionId}`;
    const response = await axios.get(ADDRESS_URL);
    const data = await response.data;
    return data;
  };

  const getResults = (query: any): void => {
    getAddressAutocomplete(query, '2922eecb-11f9-4d74-8123-ad2fc32078f')
      .then((data) => {
        setLoading(false);
        setResults(data?.result);
      })
      .catch((err) => {
        setLoading(false);
        setErrorApi(err?.response?.data?.message);
      });
  };

  const debounceLoadData = useMemo(() => debounce(getResults, 400), []);

  useEffect(() => {
    if (value && focus) {
      debounceLoadData(value);
    }
  }, [value, debounceLoadData]);

  // Additional useEffect for Clearing Location
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    } else {
      setValue('');
    }
  }, [clearLocation]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, location?: any): void => {
    setOpen(true);
    setSelected(false);
    setValue(e.target.value);
    if (getPlaceId) {
      getPlaceId(location?.placeId, location);
    }
  };

  const handleSelect = (location: any): void => {
    setSelected(true);
    setValue(location?.description);
    if (getPlaceId) {
      getPlaceId(location?.placeId, location);
    }
  };

  const handleClickAway = (): void => {
    setOpen(false);
  };

  const handleClick = (): void => {
    setOpen((prev) => !prev);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <FormControl sx={{ width: { width }, ...outterSX }}>
        <TextField
          {...field}
          variant="outlined"
          onClick={handleClick}
          fullWidth
          sx={{
            '.MuiOutlinedInput-root': {
              backgroundColor: 'white',
              color: 'secondary.main'
            }
          }}
          onChange={(e) => { handleAddressChange(e); }}
          onBlur={clearErrors}
          value={value}
          autoComplete="off"
          disabled={disabled}
          onFocus={() => { setFocus(true); }}
          error={validationError}
          placeholder={placeHolder}
          helperText={helperText ?? errorApi}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="secondary" fontSize='medium' />
              </InputAdornment>
            )
          }}
        />
        {open
          ? (
            <List
              sx={{
                width: '100%',
                position: 'absolute',
                marginTop: '4rem',
                backgroundColor: 'white',
                borderRadius: '5px',
                padding: '0',
                zIndex: '1000',
                ...(focus && storedResults && storedResults.length && !value && {
                  border: '1px solid',
                  borderColor: 'border.main',
                  maxHeight: '300px'
                }),
                ...(
                  results?.length &&
                  !selected &&
                  value && {
                    border: '1px solid',
                    borderColor: 'border.main',
                    maxHeight: '300px'
                  }
                ),
                overflowY: 'scroll',
                '::-webkit-scrollbar': {
                  width: '5px'
                },

                '::-webkit-scrollbar-track': {
                  borderRadius: '5px'
                },

                '::-webkit-scrollbar-thumb': {
                  background: '#bebfcc',
                  borderRadius: '5px'
                }
              }}
              aria-label="contacts"
            >
              {focus && loading && !selected
                ? (<ListItem disablePadding divider>
                  <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress color='primary' />
                  </ListItemButton>
                </ListItem>)
                : (
                  <>
                    {
                      focus && storedResults.length && !value
                        ? storedResults.map((item: any) => {
                          return (
                            <ListItem
                              key={item.description}
                              disablePadding
                              onClick={() => {
                                handleSelect(item);
                                if (handleSelection) {
                                  handleSelection(item?.structuredFormatting?.mainText, item?.description, item?.placeId);
                                }
                                setFocus(false);
                              }}
                              divider
                            >
                              <ListItemButton>
                                <ListItemText
                                  primary={item.description}
                                />
                              </ListItemButton>
                            </ListItem>
                          );
                        })
                        : null
                    }
                    {results?.length && !selected && value
                      ? results.map((item: any) => {
                        return (
                          <ListItem
                            key={item.description}
                            disablePadding
                            onClick={() => {
                              handleSelect(item);
                              if (handleSelection) {
                                handleSelection(item?.structuredFormatting?.mainText, item?.description, item?.placeId);
                              }
                            }}
                            divider
                          >
                            <ListItemButton>
                              <ListItemText
                                primary={item.description}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })
                      : null}
                  </>)
              }
            </List>)
          : ' '}
      </FormControl>
    </ClickAwayListener>
  );
};

SearchLocation.defaultProps = {
  field: undefined,
  width: '',
  outterSX: undefined,
  defaultValue: '',
  placeHolder: '',
  helperText: '',
  disabled: false,
  validationError: false,
  clearLocation: false,
  getPlaceId: () => { },
  handleSelection: () => { },
  clearErrors: () => { }
};

export default SearchLocation;
