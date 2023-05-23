const theme: object = {
  // typography: {
  //   fontFamily: [
  //     'Inter',
  //     'Roboto',
  //     '-apple-system',
  //     'BlinkMacSystemFont',
  //     '"Segoe UI"',
  //     '"Helvetica Neue"',
  //     'sans-serif',
  //     '"Apple Color Emoji"',
  //     '"Segoe UI Emoji"',
  //     '"Segoe UI Symbol"',
  //   ].join(','),
  //   h1: {
  //     fontWeight: 700,
  //     fontSize: '2.25rem', // 36px
  //     lineHeight: 2.75, // 44px
  //   },
  //   h2: {
  //     fontWeight: 700,
  //     fontSize: '1.625rem', // 26px
  //     lineHeight: 2.125, // 34px
  //   },
  //   h3: {
  //     fontWeight: 600,
  //     fontSize: '1.25rem', // 20px
  //     lineHeight: 1.875, // 30px
  //   },
  //   h4: {
  //     fontWeight: 600,
  //     fontSize: '1rem', // 16px
  //     lineHeight: 1.5, // 24px
  //   },
  //   h5: {
  //     fontWeight: 600,
  //     fontSize: '0.875rem', // 14px
  //     lineHeight: 1.375, // 22px
  //   },
  //   h6: {
  //     fontWeight: 600,
  //     fontSize: '0.75rem', // 12px
  //     lineHeight: 1.125, // 18px
  //   },
  //   subtitle1: {
  //     fontWeight: 500,
  //     fontSize: '1rem', // 16px
  //     lineHeight: 1.5, // 24px
  //   },
  //   subtitle2: {
  //     fontWeight: 500,
  //     fontSize: '0.875rem', // 14px
  //     lineHeight: 1.375, // 22px
  //   },
  //   body1: {
  //     fontSize: '0.875rem', // 14px
  //     fontWeight: 400,
  //     lineHeight: 1.375, // 22px
  //   },
  //   body2: {
  //     fontWeight: 400,
  //     fontSize: '0.75rem', // 12px
  //     lineHeight: 1.125, // 18px
  //   },
  //    button: {
  //      fontWeight: 600,
  //      fontSize: '0.75rem', // 12px
  //      lineHeight: 1.125, // 18px
  //   },
  //   caption: {
  //     fontWeight: 400,
  //     fontSize: '0.75rem', // 12px
  //     lineHeight: 1.125, // 18px
  //   },
  //   // overline: {},
  // },
  palette: {
    mode: 'light',
    primary: {
      light: '#eaf3fe',
      main: '#187AE8',
      dark: '#0052AD',
      contrastText: '#FFF'
    },
    secondary: {
      main: '#001762',
      dark: '#000D34',
      contrastText: '#FFF'
    },
    surface: {
      main: '#FFFFFF',
      contrastText: '#000D34'
    },
    background: {
      default: '#f8fbff'
    },
    text: {
      primary: '#767893'
    },
    error: {
      main: '#E25D3D',
      contrastText: '#FFFFFF'
    },
    warning: {
      light: '#fff0de',
      main: '#fd9a28'
    },
    success: {
      light: '#e9f9f0',
      main: '#17a36a'
    },
    // info: {
    //   main: '#000',
    // },
    border: {
      light: '#F8F8FA',
      main: '#E8E8ED',
      dark: '#C2C6D4'
    }
  },
  shadows: [
    'none', // 0
    '0px 2px 1px -1px rgba(0,0,0,0.15),0px 1px 1px 0px rgba(0,0,0,0.08),0px 1px 3px 0px rgba(0,0,0,0.05)', // 1
    '0px 3px 1px -2px rgba(0,0,0,0.15),0px 2px 2px 0px rgba(0,0,0,0.08),0px 1px 5px 0px rgba(0,0,0,0.05)', // 2
    '0 3px 6px rgba(0,0,0,0.08), 0 3px 6px rgba(0,0,0,0.08); transition: all 0.3s cubic-bezier(.25,.8,.25,1);', // 3
    'inset 0 1.5px 6px 0 rgba(0, 0, 0, 0.05)', // 4
    '0 -3px 22px 0 rgba(0, 0, 0, 0.16)', // 5
    '0px 3px 5px -1px rgba(0,0,0,0.15),0px 6px 10px 0px rgba(0,0,0,0.08),0px 1px 18px 0px rgba(0,0,0,0.05)', // 6
    '0px 4px 5px -2px rgba(0,0,0,0.15),0px 7px 10px 1px rgba(0,0,0,0.08),0px 2px 16px 1px rgba(0,0,0,0.05)',
    '0px 5px 5px -3px rgba(0,0,0,0.15),0px 8px 10px 1px rgba(0,0,0,0.08),0px 3px 14px 2px rgba(0,0,0,0.05)',
    '0 6px 12px rgba(0,0,0,0.10), 0 6px 12px rgba(0,0,0,0.08);', // 9
    '0px 6px 6px -3px rgba(0,0,0,0.15),0px 10px 14px 1px rgba(0,0,0,0.08),0px 4px 18px 3px rgba(0,0,0,0.05)',
    '0px 6px 7px -4px rgba(0,0,0,0.15),0px 11px 15px 1px rgba(0,0,0,0.08),0px 4px 20px 3px rgba(0,0,0,0.05)',
    '0px 7px 8px -4px rgba(0,0,0,0.15),0px 12px 17px 2px rgba(0,0,0,0.08),0px 5px 22px 4px rgba(0,0,0,0.05)',
    '0px 7px 8px -4px rgba(0,0,0,0.15),0px 13px 19px 2px rgba(0,0,0,0.08),0px 5px 24px 4px rgba(0,0,0,0.05)',
    '0px 7px 9px -4px rgba(0,0,0,0.15),0px 14px 21px 2px rgba(0,0,0,0.08),0px 5px 26px 4px rgba(0,0,0,0.05)',
    '0px 8px 9px -5px rgba(0,0,0,0.15),0px 15px 22px 2px rgba(0,0,0,0.08),0px 6px 28px 5px rgba(0,0,0,0.05)',
    '0px 8px 10px -5px rgba(0,0,0,0.15),0px 16px 24px 2px rgba(0,0,0,0.08),0px 6px 30px 5px rgba(0,0,0,0.05)',
    '0px 8px 11px -5px rgba(0,0,0,0.15),0px 17px 26px 2px rgba(0,0,0,0.08),0px 6px 32px 5px rgba(0,0,0,0.05)',
    '0px 9px 11px -5px rgba(0,0,0,0.15),0px 18px 28px 2px rgba(0,0,0,0.08),0px 7px 34px 6px rgba(0,0,0,0.05)',
    '0px 9px 12px -6px rgba(0,0,0,0.15),0px 19px 29px 2px rgba(0,0,0,0.08),0px 7px 36px 6px rgba(0,0,0,0.05)',
    '0px 10px 13px -6px rgba(0,0,0,0.15),0px 20px 31px 3px rgba(0,0,0,0.08),0px 8px 38px 7px rgba(0,0,0,0.05)',
    '0px 10px 13px -6px rgba(0,0,0,0.15),0px 21px 33px 3px rgba(0,0,0,0.08),0px 8px 40px 7px rgba(0,0,0,0.05)',
    '0px 10px 14px -6px rgba(0,0,0,0.15),0px 22px 35px 3px rgba(0,0,0,0.08),0px 8px 42px 7px rgba(0,0,0,0.05)',
    '0px 11px 14px -7px rgba(0,0,0,0.15),0px 23px 36px 3px rgba(0,0,0,0.08),0px 9px 44px 8px rgba(0,0,0,0.05)',
    '0px 11px 15px -7px rgba(0,0,0,0.15),0px 24px 38px 3px rgba(0,0,0,0.08),0px 9px 46px 8px rgba(0,0,0,0.05)'
  ]
};

export default theme;
