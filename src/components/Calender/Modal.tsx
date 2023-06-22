import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface ModalProps {
  title: string
  open: boolean
  onClose: () => void
  children: React.ReactNode
  actions: React.ReactNode[]
};

const Modal: React.FC<ModalProps> = ({ title, open, onClose, children, actions }) => {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
    >
      <DialogTitle fontWeight='bold' color='secondary'>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        {actions.map((item, id) => {
          return item;
        })}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
