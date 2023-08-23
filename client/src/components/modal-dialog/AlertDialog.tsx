import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ButtonProps,

  DialogProps
} from '@mui/material';

interface IAlertDialogProps {
  id?: string;
  title?: string;
  content: React.ReactNode;
  size?: 'lg' | 'md' | 'sm' | 'xl' | 'xs' | false;
  open: boolean;
  onClose: () => void;

  dialogProps?: DialogProps;
  buttonProps?: ButtonProps;
  buttonText?: string;
};

export default function AlertDialog(props: IAlertDialogProps) {
  const {
    id,
    title,
    content,
    size,
    open,
    onClose,

    dialogProps,
    buttonProps,
    buttonText,
  } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      id={id}
      open={open}
      onClose={handleClose}
      maxWidth={size || 'sm'}
      fullWidth

      {...dialogProps}
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText component="div">
          {content}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color='primary' {...buttonProps}>
          {typeof buttonText === 'undefined' ? 'Fechar' : buttonText}
        </Button>
      </DialogActions>

    </Dialog>
  );
};