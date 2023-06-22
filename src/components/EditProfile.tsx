import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Box, Divider, Tab, Tabs } from '@mui/material';
import TabPanel from './common/TabPanel';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { API, Form } from 'react-package-bt';
import FormInputTextField from './common/FormInputTextField';
import FormInputPhoneNumber from './common/FormInputPhoneNumber';
import SelectField from './common/SelectField';
import FormDateField from './common/FormDateField';
import { GENDER_OPTIONS } from '../constants/AppVarConstant';
import { useDispatch, useSelector } from 'react-redux';
import baseCountries from './json/country_data';
import ProfileCard from './common/ProfileCard';
import dayjs from 'dayjs';
import { USER_PROFILE_URL, USER_SECURITY_URL } from '../redux/api/config';
import { setErrorMessage, setSuccessMessage, setUser } from '../redux/actions/appActions';
import { isEmpty } from 'lodash';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../constants/MessageContants';

export const EditProfileSchema = Yup.object().shape({
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
  oldPassword: Yup.string()
    .test('tabCheck', '', function (value) {
      const { path, parent, createError } = this;
      if (!value && parent.activeTab === 'security') {
        return createError({
          path,
          message: 'Password is required.'
        });
      }
      return true;
    }),
  newPassword: Yup.string()
    .test('tabCheck', '', function (value) {
      const { path, parent, createError } = this;
      if (!value && parent?.activeTab === 'security') {
        return createError({
          path,
          message: 'Password is required.'
        });
      }
      return true;
    }),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Password did not match.')
    .test('tabCheck', '', function (value) {
      const { path, parent, createError } = this;
      if (!value && parent?.activeTab === 'security') {
        return createError({
          path,
          message: 'Password is required.'
        });
      }
      return true;
    })
});

const EditProfile = (): JSX.Element => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state?.app);

  const [errorMsg, setErrorMsg] = useState('');
  const [tabValue, setTabValue] = useState('profile');

  const phoneArr = baseCountries.filter((item) => item.isoCode === user?.isoCode);
  const appendValues = {
    phoneNumber: user?.phone ? user?.phone.split(`${phoneArr?.[0]?.dialCode}`).pop() : '',
    isoCode: user?.isoCode || 'US',
    dialCode: phoneArr?.[0]?.dialCode || '+1'
  };

  const defaultValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    gender: user?.gender || '',
    date: dayjs(user?.birthdate) || '',
    phoneArray: [appendValues],
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    activeTab: 'profile'
  };

  const {
    handleSubmit,
    control,
    setValue
    // formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(EditProfileSchema),
    reValidateMode: 'onChange'
  });

  const onProfileSuccess = (res: any): void => {
    dispatch(setUser(res.result));
  };

  const onProfleError = (err: any): void => {
    setErrorMsg(err?.errorMsg);
    dispatch(setErrorMessage(err?.message ?? ERROR_MESSAGE));
  };

  useEffect(() => {
    if (isEmpty(user)) {
      dispatch(API(USER_PROFILE_URL, 'GET', {}, onProfileSuccess, onProfleError));
    } else {
      setValue('firstName', user?.firstName);
      setValue('lastName', user?.lastName);
      setValue('email', user?.email);
      setValue('phoneArray', [appendValues]);
      setValue('gender', user?.gender);
      setValue('date', dayjs(new Date(user?.birthdate)));
    }
  }, [user]);

  const handleChange = (event: React.SyntheticEvent, newValue: string): void => {
    setTabValue(newValue);
    setValue('activeTab', newValue);
  };

  const onSuccess = (res: any): void => {
    if (tabValue === 'profile') {
      dispatch(setUser(res.result));
    };
    dispatch(setSuccessMessage(res?.message ?? SUCCESS_MESSAGE));
  };

  const onError = (err: any): void => {
    setErrorMsg(err?.errorMsg);
    dispatch(setErrorMessage(err?.message ?? err?.errorMsg ?? ERROR_MESSAGE));
  };

  const onSubmit = (data: any): void => {
    setErrorMsg('');
    let payload = {};
    if (tabValue === 'profile') {
      payload = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        gender: data.gender,
        phone: `${data?.phoneArray?.[0]?.dialCode as string}${data?.phoneArray?.[0]?.phoneNumber as string}`,
        isoCode: data.phoneArray?.[0]?.isoCode,
        birthdate: data.date
      };
      dispatch(API(USER_PROFILE_URL, 'POST', payload, onSuccess, onError));
    } else if (tabValue === 'security') {
      payload = {
        currentPassword: data.oldPassword,
        newPassword: data.newPassword
      };
      dispatch(API(USER_SECURITY_URL, 'POST', payload, onSuccess, onError));
    }
  };

  return (
    <Box sx={{ width: '100%', py: 2, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
      <Box sx={{ width: { xs: '100%', md: '75%' }, p: { xs: 1, md: 5 } }}>
        <ProfileCard data={user} />
        <Tabs onChange={handleChange} value={tabValue} >
          <Tab value="profile" label="Profile" />
          <Tab value="security" label="Security" />
        </Tabs>
        <Divider />
        <TabPanel tabValue={tabValue} index="profile" tabPanelSX={{ p: 2 }}>
          <Form
            title=''
            logoUrl=''
            error={errorMsg ?? ''}
            mainSX={{ minHeight: '100%', justifyContent: 'start', p: 0 }}
            formSx={{ width: { xs: '95%', md: '100%' }, gap: 4, p: 0 }}
            fields={[
              {
                label: 'First Name',
                type: 'component',
                component: <FormInputTextField width="100%" name='firstName' control={control} placeholder='Enter Name' />
              },
              {
                label: 'Last Name',
                type: 'component',
                component: <FormInputTextField width="100%" name='lastName' control={control} placeholder='Enter Name' />
              },
              {
                label: 'Email',
                type: 'component',
                component: <FormInputTextField width="100%" name='email' control={control} placeholder='Enter Email' disabled />
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
                component: <FormDateField width="100%" name='date' control={control} disableFuture />
              }
            ]}
            showSocialLogin={false}
            handleSubmit={handleSubmit}
            socialProviders={['facebook', 'google', 'twitter']}
            onSocialLogin={() => { console.log('Social Login'); }}
            buttonLabel='Save Changes'
            buttonXS={{ width: { xs: '100%', md: '50%' }, fontSixe: '24px', fontWeight: 'bold', fill: 'secondary' }}
            onSubmit={onSubmit}
          />
        </TabPanel>
        <TabPanel tabValue={tabValue} index="security" tabPanelSX={{ p: 3 }}>
          <Form
            title=''
            logoUrl=''
            error={errorMsg ?? ''}
            mainSX={{ minHeight: '100%', justifyContent: 'start', p: 0 }}
            formSx={{ width: { xs: '90%', md: '40%' }, alignItems: 'start', gap: 4, p: 0 }}
            fields={[
              {
                label: 'Old Password',
                type: 'component',
                sxField: { grid: { xs: 12, md: 12 } },
                component: <FormInputTextField width="100%" name='oldPassword' control={control} password placeholder='Enter Password' />
              },
              {
                label: 'New Password',
                type: 'component',
                sxField: { grid: { xs: 12, md: 12 } },
                component: <FormInputTextField width="100%" name='newPassword' control={control} password placeholder='Enter Password' />
              },
              {
                label: 'Confirm Password',
                type: 'component',
                sxField: { grid: { xs: 12, md: 12 } },
                component: <FormInputTextField width="100%" name='confirmPassword' control={control} password placeholder='Enter Password' />
              }
            ]}
            showSocialLogin={false}
            handleSubmit={handleSubmit}
            socialProviders={['facebook', 'google', 'twitter']}
            onSocialLogin={() => { console.log('Social Login'); }}
            buttonLabel='Save Changes'
            buttonXS={{ width: { xs: '100%', md: '100%' }, fontSixe: '24px', fontWeight: 'bold', fill: 'secondary' }}
            onSubmit={onSubmit}
          />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default EditProfile;
