// https://viclafouch.github.io/mui-color-input/docs/getting-started/
import { MuiColorInput } from 'mui-color-input'
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextFieldProps } from '@mui/material';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
};

export default function RHFColorPicker({ name, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MuiColorInput
          {...field}
          fullWidth
          error={!!error}
          helperText={error ? error?.message : helperText}
        />
      )}
    />
  );
};
