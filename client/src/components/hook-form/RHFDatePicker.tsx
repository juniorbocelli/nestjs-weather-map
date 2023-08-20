// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';
// @mui/x-date-pickers
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
// hooks
import useResponsive from 'src/hooks/useResponsive';

type Props = TextFieldProps & {
  name: string;
};

export default function RHFDatePicker({
  name,
  label,
  helperText,
  disabled,
  ...other
}: Props) {
  const { control } = useFormContext();
  const Component = useResponsive('down', 'md') ? MobileDatePicker : DesktopDatePicker;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Component
            label={label}
            inputFormat="dd/MM/yyyy"
            value={field.value}
            onChange={field.onChange}
            inputRef={field.ref}
            renderInput={(params) =>
              <TextField
                {...field}
                fullWidth
                value={field.value}
                helperText={error ? error?.message : helperText}
                {...other}
                {...params}

                error={!!error}
              />
            }
            disabled={disabled}
          />
        </LocalizationProvider>
      )}
    />
  )
};