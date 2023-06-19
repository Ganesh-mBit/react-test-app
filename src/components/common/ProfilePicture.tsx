import React, { useState, useRef } from 'react';
import { isEmpty } from 'lodash';
import {
  Badge, IconButton, Avatar, MenuItem, Popper, Grow, Paper, ClickAwayListener, MenuList, ListItemIcon, ListItem
} from '@mui/material';
import { BsCameraFill, BsRepeat } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';

type SXType = Record<string, any>;

interface ProfilePictureProps {
  src: string
  alt: string
  enableUpload: boolean
  changeLogoLabel: string
  removeLogoLable: string
  toggleImageUpload: () => void
  toggleImageRemove: () => void
  avatarSX?: SXType
  defaultAvatar?: React.ReactNode
}

const ProfilePicture: React.FC<ProfilePictureProps> = (props): JSX.Element => {
  const {
    src,
    alt,
    enableUpload,
    changeLogoLabel,
    removeLogoLable,
    toggleImageUpload,
    toggleImageRemove,
    avatarSX,
    defaultAvatar
  } = props;

  const anchorRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleToggle = (): void => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  const handleClose = (): void => {
    setOpenMenu(false);
  };

  return (
    <>
      {enableUpload
        ? (<Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={(
            <>
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  ref={anchorRef}
                  aria-label="upload picture"
                  component="span"
                  sx={{
                    bgcolor: 'white',
                    '&:hover': {
                      bgcolor: 'background.default'
                    }
                  }}
                  onClick={() => {
                    (isEmpty(src) ? toggleImageUpload() : handleToggle());
                  }}
                >
                  <BsCameraFill />
                </IconButton>
              </label>
              <Popper
                open={openMenu}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
                style={{ zIndex: 50 }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom'
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={openMenu}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                        >
                          <MenuItem onClick={() => {
                            toggleImageUpload();
                          }}
                          >
                            <ListItemIcon>
                              <BsRepeat size={20} fontSize="small" color="blue" />
                            </ListItemIcon>
                            <ListItem>
                              {changeLogoLabel}
                            </ListItem>
                          </MenuItem>
                          {isEmpty(src)
                            ? null
                            : (
                              <MenuItem onClick={() => {
                                toggleImageRemove();
                              }}>
                                <ListItemIcon>
                                  <MdDeleteForever size={20} fontSize="small" color="red" />
                                </ListItemIcon>
                                <ListItem>
                                  {removeLogoLable}
                                </ListItem>
                              </MenuItem>)}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>

                  </Grow>
                )}
              </Popper>
            </>
          )}
        >
          {isEmpty(src)
            ? (<>
              {defaultAvatar ?? null}
            </>)
            : (<Avatar
              alt={alt}
              src={src}
              sx={{ ...avatarSX }}
            />)}
        </Badge>)
        : (<>
          {isEmpty(src)
            ? (<>
              {defaultAvatar ?? null}
            </>)
            : (<Avatar
              alt={alt}
              src={src}
              sx={{ ...avatarSX }}
            />)}
        </>)}
    </>
  );
};

export default ProfilePicture;
