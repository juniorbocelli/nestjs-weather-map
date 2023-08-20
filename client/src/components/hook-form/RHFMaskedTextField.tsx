// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';
// mask (https://www.npmjs.com/package/react-text-mask)
import MaskedInput, { Mask } from 'react-text-mask';

// ----------------------------------------------------------------------


type Props = TextFieldProps & {
  name: string;
  mask: (v: string) => Mask;
};

export default function RHFMaskedTextField({ name, mask: _mask, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MaskedInput
          mask={_mask}
          render={(ref, props) => (
            <TextField
              {...field}
              inputRef={ref}
              fullWidth
              value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
              error={!!error}
              helperText={error ? error?.message : helperText}

              {...other}

              onChange={(event) => {
                props.onChange(event);
                field.onChange(event);

                if (typeof other.onChange !== 'undefined')
                  other.onChange(event);
              }}

              onBlur={(event) => {
                props.onBlur(event);
                field.onBlur();

                if (typeof other.onBlur !== 'undefined')
                  other.onBlur(event);
              }}
            />
          )}
        />
      )}
    />
  );
}
