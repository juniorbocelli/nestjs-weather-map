import React from 'react';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  FormControl,
  FormControlLabel,
  FormHelperText,

  SxProps,
  FormControlProps,
  FormControlLabelProps,
  FormHelperTextProps,
} from '@mui/material';
// compoments
import { IncrementerButton } from 'src/components/custom-input';

// ----------------------------------------------------------------------

type Props = {
  name: string;

  // Controls
  label?: string;
  helperText?: string;

  // Min, max and step values
  minVal?: number,
  maxVal?: number,
  step?: number,

  // Styles Props
  incrementerSxProps?: SxProps;
  formControlProps?: FormControlProps;
  formControlLabelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
  formHelperTextProps?: FormHelperTextProps;
};

export default function RHFIncrementerButton({
  name,

  // Controls
  label,
  helperText,

  // Min, max and step values
  minVal,
  maxVal,
  step,

  // Styles Props
  incrementerSxProps,
  formControlProps,
  formControlLabelProps,
  formHelperTextProps
}: Props) {
  const {
    control,
    setValue,
    getValues,
  } = useFormContext();
  const _step: number = typeof step !== 'undefined' ? step : 1;

  /**
   * Incrementer Button
   */
  const handleIncrease = (value: string | number) => {
    if (typeof maxVal !== 'undefined')
      if (Number(value) > maxVal)
        return;

    setValue(name, Number(value) + _step);
  };

  const handleDecrease = (value: string | number) => {
    if (typeof minVal !== 'undefined')
      if (Number(value) < minVal)
        return;

    setValue(name, Number(value) - _step);
  };

  const isDisabledIncreaseButton = (value: string | number): boolean => {
    if (typeof maxVal === 'undefined')
      return false;

    return Number(value) + _step > maxVal;
  };

  const isDisabledDecreaseButton = (value: string | number): boolean => {
    if (typeof minVal === 'undefined')
      return false;

    return Number(value) - _step < minVal;
  };

  // Effect
  React.useEffect(() => {
    if (typeof getValues(name) !== 'number')
      setValue(name, '0');
  }, [name, getValues, setValue]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl {...formControlProps}>
          <FormControlLabel
            control={
              <IncrementerButton
                onIncrease={() => handleIncrease(field.value)}
                onDecrease={() => handleDecrease(field.value)}

                disabledIncrease={isDisabledIncreaseButton(field.value)}
                disabledDecrease={isDisabledDecreaseButton(field.value)}

                quantity={field.value}
                sx={{ ...incrementerSxProps }}
              />
            }
            label={label}
            labelPlacement="top"
            {...formControlLabelProps}
          />
          <input
            id={`id-incrementer-bt-${name}`}
            aria-describedby={`my-helper-text-${name}`}
            type="hidden"
            {...field}
          />
          <FormHelperText id={`my-helper-text-${name}`} {...formHelperTextProps}>
            {error ? error?.message : helperText}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};