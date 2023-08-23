import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,

  ButtonProps,
} from '@mui/material';

interface IConfirmationDialogProps {
  id?: string;
  title: string;
  content: React.ReactNode;
  size?: 'lg' | 'md' | 'sm' | 'xl' | 'xs' | false;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  closeAfterConfirm?: boolean;
  disabledOkButton?: boolean;

  buttonOkProps?: ButtonProps;
  buttonCancelProps?: ButtonProps;

  buttonOkText?: string;
  buttonCancelText?: string;
};

export default function ConfirmationDialog(props: IConfirmationDialogProps) {
  const {
    id,
    title,
    content,
    size,
    open,
    onClose,
    onConfirm,
    closeAfterConfirm,
    disabledOkButton,

    buttonOkProps,
    buttonCancelProps,

    buttonOkText,
    buttonCancelText,
  } = props;

  const _closeAfterConfirm = typeof (closeAfterConfirm) === "undefined" ? true : closeAfterConfirm;

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
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText component="div">
          {content}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={
            () => {
              onConfirm();
              if (_closeAfterConfirm) onClose();
            }
          }
          color='primary'
          disabled={!!disabledOkButton}

          {...buttonOkProps}
        >
          {buttonOkText || `Executar`}
        </Button>

        <Button onClick={handleClose} color='primary' {...buttonCancelProps}>
          {buttonCancelText || `Cancelar`}
        </Button>
      </DialogActions>

    </Dialog>
  );
};