import React, { useState } from 'react';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, signup } from 'react-package-bt';
import FormInputTextField from './common/FormInputTextField';
import SelectField from './common/SelectField';
import FormDateField from './common/FormDateField';
// import SearchLocation from './common/SearchLocation';
import { Box, Button, Checkbox, FormControlLabel, FormHelperText, Typography } from '@mui/material';
import { GENDER_OPTIONS } from '../constants/AppVarConstant';
import { useDispatch } from 'react-redux';
import FormInputPhoneNumber from './common/FormInputPhoneNumber';
import { USER_SIGNUP_URL } from '../redux/api/config';
import { useNavigate } from 'react-router-dom';
import { setErrorMessage, setSuccessMessage } from '../redux/actions/appActions';

export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required.'),
  lastName: Yup.string()
    .required('Last name is required.'),
  email: Yup.string()
    .required('Email is required.')
    .email('Invalid email address.')
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\\.]+$/, 'Invalid email address.'),
  gender: Yup.string()
    .required('Gender is required.'),
  date: Yup.date()
    .typeError('Date format should be MM/DD/YYYY.')
    .required('Birth Date is required.'),
  phoneArray: Yup.array().of(
    Yup.object().shape({
      isoCode: Yup.string(),
      phoneNumber: Yup.string()
        .required('Phone Number is required.')
    })
  ),
  password: Yup.string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters.'),
  confirmPassword: Yup.string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters.')
    .oneOf([Yup.ref('password')], 'Password did not match.'),
  tnc: Yup.bool().oneOf([true], 'Accept Terms is required.')
});

const SignupMain = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const appendValues = {
    phoneNumber: '',
    isoCode: 'US',
    dialCode: '+1'
  };

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    date: '',
    phoneArray: [appendValues],
    password: '',
    confirmPassword: '',
    tnc: false
  };

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignUpSchema),
    reValidateMode: 'onChange'
  });

  // const getPlaceId = (locationId: string, location: any): void => {
  //   setValue('location', location?.description);
  // };

  const onSuccess = (res: any): void => {
    dispatch(setSuccessMessage(res?.message));
    navigate('/login');
  };

  const onError = (err: any): void => {
    setErrorMsg(err?.errorMsg);
    dispatch(setErrorMessage(err?.message));
  };

  const onSubmit = (data: any): void => {
    if (data) {
      const payload = {
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        password: data?.password,
        phone: data?.phoneArray?.[0]?.phoneNumber ? `${data?.phoneArray?.[0]?.dialCode as string}${data?.phoneArray?.[0]?.phoneNumber as string}` : '',
        isoCode: data?.phoneArray?.[0]?.phoneNumber ? data?.phoneArray?.[0].isoCode : ''
      };
      dispatch(signup(USER_SIGNUP_URL, payload, onSuccess, onError));
    }
  };

  return (
    <Form
      title='Sign Up'
      logoUrl='https://images.pexels.com/photos/2835170/pexels-photo-2835170.jpeg?auto=compress&cs=tinysrgb&w=180&h=250&dpr=2'
      formSx={{ width: { xs: '90%', md: '70%' }, gap: 4 }}
      fields={[
        {
          label: 'First Name',
          type: 'component',
          component: <FormInputTextField width="100%" name='firstName' control={control} errorMessage={errors.firstName?.message} placeholder='Enter Name' />
        },
        {
          label: 'Last Name',
          type: 'component',
          component: <FormInputTextField width="100%" name='lastName' control={control} errorMessage={errors.lastName?.message} placeholder='Enter Name' />
        },
        {
          label: 'Email',
          type: 'component',
          component: <FormInputTextField width="100%" name='email' control={control} errorMessage={errors.email?.message} placeholder='Enter Email' />
        },
        {
          label: 'Phone Number',
          type: 'component',
          component: <FormInputPhoneNumber width="100%" name="phoneArray" control={control} setValue={setValue} countries={['us', 'ca', 'au', 'in', 'fr', 'gb']} maxLen={10} />
        },
        {
          label: 'Gender',
          type: 'component',
          component: <SelectField width="100%" name='gender' control={control} options={GENDER_OPTIONS} />
        },
        {
          label: 'Date Of Birth',
          type: 'component',
          component: <FormDateField width="100%" name='date' control={control} />
        },
        // {
        //   label: 'Address',
        //   type: 'component',
        //   component: (
        //     <Controller
        //       name='location'
        //       control={control}
        //       render={({ field }) => (
        //         <SearchLocation
        //           width="100%"
        //           field={field}
        //           getPlaceId={getPlaceId}
        //           validationError={!!errors?.location}
        //           helperText={errors.location?.message}
        //           placeHolder='Enter Address'
        //         />
        //       )}
        //     />
        //   )
        // },
        {
          label: 'Password',
          type: 'component',
          component: <FormInputTextField width="100%" name='password' control={control} password placeholder='Enter Password' />
        },
        {
          label: 'Confirm Password',
          type: 'component',
          component: <FormInputTextField width="100%" name='confirmPassword' control={control} password placeholder='Enter Password' />
        },
        {
          label: 'Terms & Conditions',
          type: 'component',
          component: (
            <>
              <FormControlLabel
                control={(
                  <Controller
                    control={control}
                    name="tnc"
                    defaultValue={false}
                    render={({ field: { onChange } }) => (
                      <Checkbox
                        color="primary"
                        onChange={(e): void => { onChange(e.target.checked); }}
                      />
                    )}
                  />
                )}
                label={(
                  <Typography variant='body2' color="GrayText">I have read and agree with <b>Terms & Privacy Policy</b></Typography>
                )}
              />
              <FormHelperText error>{errors.tnc ? errors.tnc.message : ' '}</FormHelperText>
            </>
          )
        }
      ]}
      error={errorMsg}
      showSocialLogin={false}
      handleSubmit={handleSubmit}
      socialProviders={['facebook', 'google', 'twitter']}
      onSocialLogin={() => { console.log('Social Login'); }}
      buttonLabel='Sign Up'
      buttonXS={{ width: { xs: '100%', md: '50%' }, fontSixe: '24px', fontWeight: 'bold', fill: 'secondary' }}
      onSubmit={onSubmit}
      slotProps={(
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 4 }}>
          <Typography variant="body2" color="GrayText">Already have an account</Typography>
          <Button onClick={() => { navigate('/login'); }} color="primary">
            Log In
          </Button>
        </Box>
      )}
    />
  );
};

export default SignupMain;
