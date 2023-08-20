import React from 'react';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText } from '@mui/material';
//
import { Upload, UploadProps } from 'src/components/upload';
// services
import { uploadImageAPI } from 'src/services/system';

// ----------------------------------------------------------------------

interface Props extends Omit<UploadProps, 'file'> {
  name: string;
  multiple?: boolean;
}

// ----------------------------------------------------------------------

export default function RHFUploadSync({ name, multiple, helperText, ...other }: Props) {
  const { control, watch, setValue } = useFormContext();
  // TODO: Methods to delete files when remove from component
  const [files, setFiles] = React.useState<string[]>([]);
  const _value = watch(name);

  const onDrop = async (acceptedFiles: File[]) => {
    // Do something with the files
    const formData = new FormData();
    formData.append('FileToUpload', acceptedFiles[0] as Blob);

    const response = await uploadImageAPI(formData);
    const { link } = response.data;

    // States
    if (multiple)
      setFiles((f) => [...f, link as string]);
    else
      setFiles([link as string]);

    // HF values
    if (multiple)
      setValue(name, [link as string]); // TODO
    else
      setValue(name, link as string);
  };

  // Effects
  React.useEffect(() => {
    if (_value !== files[0])  // TODO: when is multiple uploads
      setFiles([_value]);
  }, [_value, files]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) =>
        multiple ? (
          <Upload
            multiple
            accept={{ 'image/*': [] }}
            files={files}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }

            onDrop={onDrop}

            {...other}
          />
        ) : (
          <Upload
            accept={{ 'image/*': [] }}
            file={typeof files !== 'undefined' ? files[0] : null}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            onDrop={onDrop}
            {...other}
          />
        )
      }
    />
  );
};
