import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Button, Typography, Box, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';

const useStyles = makeStyles(() => ({
  loginForm: {
    width: 400,
    margin: '0 auto',
    padding: 40,
    borderRadius: 8,
    boxSizing: 'border-box'
  },
  topSection: {
    textAlign: 'center',
    marginBottom: 20
  },
  logo: {
    width: 100,
    height: 100
  },
  formTitle: {
    fontSize: 20,
    marginBottom: 10
  },
  formFieldContainer: {
    height: 90,
    marginBottom: 10
  },
  formField: {
    marginBottom: 20
  },
  errorMessage: {
    color: '#ff4d4f',
    fontSize: 12,
    marginTop: 5
  },
  socialLoginContainer: {
    marginTop: 20,
    textAlign: 'center'
  },
  socialLoginButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10
  },
  forgotPassword: {
    textAlign: 'center',
    marginTop: 20
  },
  createAccount: {
    textAlign: 'center',
    marginTop: 20
  }
}));

interface Field {
  name: string
  label: string
  type: string
  required: boolean
}

interface LoginProps {
  title: string
  logoUrl?: string
  fields: Field[]
  error?: string
  showSocialLogin: boolean
  socialProviders: string[]
  showForgotPassword: boolean
  showCreateAccount: boolean
  onSocialLogin: (provider: string) => void
  onForgotPassword: () => void
  onCreateAccount: () => void
  onSubmit: (data: object) => void
  customForm?: JSX.Element
}

const Login: React.FC<LoginProps> = ({
  title,
  logoUrl,
  fields,
  error,
  showSocialLogin,
  socialProviders,
  showForgotPassword,
  showCreateAccount,
  onSocialLogin,
  onForgotPassword,
  onCreateAccount,
  onSubmit,
  customForm
}) => {
  const classes = useStyles();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const validationErrors: Record<string, string> = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', formData);
      onSubmit(formData);
    }
  };

  const validateForm = (): Record<string, string> => {
    const validationErrors: Record<string, string> = {};
    for (const field of fields) {
      if (field.required && !formData[field.name]) {
        validationErrors[field.name] = `${field.label} is required.`;
      }
    }
    return validationErrors;
  };

  if (customForm) {
    return customForm;
  }

  console.log(error, Object.keys(errors), !Object.keys(errors).length);
  return (
    <div className={classes.loginForm}>
      <div className={classes.topSection}>
        {
          logoUrl ? <img src={logoUrl} alt="Logo" className={classes.logo} /> : null
        }
        <Typography variant="h6" className={classes.formTitle}>
          {title}
        </Typography>
      </div>
      {error && !Object.keys(errors).length && (
      <Typography color="error" className={classes.errorMessage}>
        {error}
      </Typography>
      )}
      <form onSubmit={handleSubmit} noValidate>
        {fields.map((field) => (
            <Box key={field.name} minHeight={110}>
            <Box>
              <Typography variant="subtitle1">{field.label}</Typography>
            </Box>
            <TextField
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              error={!!errors[field.name]}
              helperText={errors[field.name]}
              required={field.required}
              fullWidth
              autoComplete="off"
            />
          </Box>
        ))}
        <Button sx={{ mt: 1 }} type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
      {showSocialLogin && (
        <div className={classes.socialLoginContainer}>
          <Typography variant="body1">Or login with:</Typography>
          <div className={classes.socialLoginButtons}>
            {socialProviders.map((provider, index) => (
              <IconButton style={{ marginLeft: index > 0 ? 10 : 0 }} key={provider} onClick={() => { onSocialLogin(provider); }}>
              <Box
                component="span"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: '50%'
                }}
              >
                {getSocialIcon(provider)}
              </Box>
            </IconButton>
            ))}
          </div>
        </div>
      )}
      {showForgotPassword && (
        <div className={classes.forgotPassword}>
          <Button color="primary" onClick={onForgotPassword}>
            Forgot Password?
          </Button>
        </div>
      )}

      {showCreateAccount && (
        <div className={classes.createAccount}>
          <Typography variant="body1">Don&apos;t have an account?</Typography>
          <Button color="primary" onClick={onCreateAccount}>
            Create an Account
          </Button>
        </div>
      )}
    </div>
  );
};

const getSocialIcon = (provider: string): React.ReactNode | null => {
  switch (provider) {
    case 'facebook':
      return <FacebookIcon sx={{ color: '#3b5998', fontSize: '32px' }} />;
    case 'google':
      return <GoogleIcon sx={{ color: '#db4a39', fontSize: '32px' }} />;
    case 'twitter':
      return <TwitterIcon sx={{ color: '#1da1f2', fontSize: '32px' }} />;
    default:
      return null;
  }
};

export default Login;
