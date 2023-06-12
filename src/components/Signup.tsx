import React from 'react';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, signup } from 'react-package-bt';
import FormInputTextField from './common/FormInputTextField';
import SelectField from './common/SelectField';
import FormDateField from './common/FormDateField';
import SearchLocation from './common/SearchLocation';
import { Checkbox, FormControlLabel, FormHelperText, Typography } from '@mui/material';
import { GENDER_OPTIONS } from '../constants/AppVarConstant';
import { useDispatch } from 'react-redux';

export const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .required('Full name is required.'),
  email: Yup.string()
    .required('Email is required.')
    .email('Invalid email address.')
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\\.]+$/, 'Invalid email address.'),
  gender: Yup.string()
    .required('Gender is required.'),
  date: Yup.date()
    .typeError('Date format should be MM/DD/YYYY.')
    .required('Birth Date is required.'),
  phoneNumber: Yup.number()
    .required('Phone Number is required.'),
  location: Yup.string()
    .required('Address is required.'),
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

  const defaultValues = {
    name: '',
    email: '',
    gender: null,
    date: '',
    location: '',
    phoneNumber: undefined,
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

  const getPlaceId = (locationId: string, location: any): void => {
    setValue('location', location?.description);
  };

  const onSubmit = (data: any): void => {
    if (data) {
      dispatch(signup('https://api.gamestoppedout.com/auth/v1.0/signup', data, () => { alert('Signup successful'); }, () => { alert('Opps Something went wrong!'); }));
    }
  };

  return (
    <Form
      title='Sign Up'
      logoUrl='https://images.pexels.com/photos/2835170/pexels-photo-2835170.jpeg?auto=compress&cs=tinysrgb&w=180&h=250&dpr=2'
      formSx={{ width: { xs: '90%', md: '70%' }, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
      fields={[
        {
          label: 'Name',
          type: 'component',
          component: <FormInputTextField width="100%" name='name' control={control} errorMessage={errors.name?.message} placeholder='Enter Name' />
        },
        {
          label: 'Email',
          type: 'component',
          component: <FormInputTextField width="100%" name='email' control={control} errorMessage={errors.email?.message} placeholder='Enter Email' />
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
        {
          label: 'Phone Number',
          type: 'component',
          component: <FormInputTextField width="100%" name='phoneNumber' control={control} type='number' placeholder='Enter Phone Number' />
        },
        {
          label: 'Address',
          type: 'component',
          component: (
            <Controller
              name='location'
              control={control}
              render={({ field }) => (
                <SearchLocation
                  width="100%"
                  field={field}
                  getPlaceId={getPlaceId}
                  validationError={!!errors?.location}
                  helperText={errors.location?.message}
                  placeHolder='Enter Address'
                />
              )}
            />
          )
        },
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
      showSocialLogin={false}
      handleSubmit={handleSubmit}
      socialProviders={['facebook', 'google', 'twitter']}
      onSocialLogin={() => { console.log('Social Login'); }}
      buttonLabel='Sign Up'
      buttonXS={{ width: { xs: '100%', md: '50%' }, p: 1, fontSixe: '24px', fontWeight: 'bold', color: 'secondary' }}
      onSubmit={onSubmit}
    />
  );
};

export default SignupMain;
