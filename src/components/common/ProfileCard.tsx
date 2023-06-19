import React from 'react';
import { Box, Grid, Paper } from '@mui/material';
import { BODY1, H3 } from './Typography';
import ProfilePicture from './ProfilePicture';
import { FaUserCircle } from 'react-icons/fa';

interface ProfileCardProps {
  data: Record<string, any>
};

const ProfileCard: React.FC<ProfileCardProps> = ({ data }): JSX.Element => {
  const { firstName, lastName, email, phone } = data;
  return (
    <Paper
      sx={{
        backgroundColor: 'secondary.light',
        mb: 4,
        p: 1
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={3} md={2}>
              <Box p="1rem">
                {/* <Avatar
                  src='https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                  sx={{ width: { xs: '3.5rem', sm: '5.5rem' }, height: { xs: '3.5rem', sm: '5.5rem' } }}
                  alt='profile'
                /> */}
                <ProfilePicture
                  src='https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                  alt=''
                  enableUpload
                  changeLogoLabel="Change Profile Picture"
                  removeLogoLable="Remove Profile Picture"
                  toggleImageRemove={() => { }}
                  toggleImageUpload={() => { }}
                  avatarSX={{ width: { xs: '3.5rem', sm: '5.5rem' }, height: { xs: '3.5rem', sm: '5.5rem' } }}
                  defaultAvatar={(
                    <Box sx={{ width: { xs: '3.5rem', sm: '5.5rem' }, height: { xs: '3.5rem', sm: '5.5rem' } }}>
                      <FaUserCircle size={90} color="white" />
                    </Box>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={9} md={10}>
              <Grid container>
                <Grid item xs={12} md={8}>
                  <Box display="flex" flexDirection="column" gap={1} justifyContent="center" p={1}>
                    <Box>
                      <H3 sx={{ overflowWrap: 'anywhere', lineHeight: 'unset' }} color="white" align="left">{firstName ?? 'Joe'}&nbsp;{lastName ?? 'Doe'}</H3>
                    </Box>
                    <Box display="flex" flexDirection="row" gap={1} alignItems="center">
                      <BODY1 noWrap color="white" align="left">{email ?? ''}</BODY1>
                    </Box>
                    <Box display="flex" flexDirection="row" gap={1} alignItems="center">
                      <BODY1 noWrap color="white" align="left">{phone ?? ''}</BODY1>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileCard;
