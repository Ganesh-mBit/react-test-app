import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { API } from 'react-package-bt';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { USER_PROFILE_URL } from '../redux/api/config';
import { setUser } from '../redux/actions/appActions';

const Home = (): JSX.Element => {
  const dispatch = useDispatch();

  const onSuccess = (res: any): void => {
    dispatch(setUser(res));
  };

  const onError = (error: any): void => {
    console.log(error);
  };

  useEffect(() => {
    dispatch(API(USER_PROFILE_URL, 'GET', {}, onSuccess, onError));
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <hr />
      <Box sx={{ display: 'flex', gap: 5, px: 3 }}>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/user/profile">Edit Profile</Link>
      </Box>
    </div>
  );
};

export default Home;
