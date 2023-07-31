import { useEffect } from 'react';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { FormHelperText, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { ReactQuillProps } from 'react-quill';
import Editor from '~/components/Editor';
// ----------------------------------------------------------------------
export interface EditorProps extends ReactQuillProps {
  id?: string;
  error?: boolean;
  simple?: boolean;
  helperText?: React.ReactNode;
  sx?: SxProps<Theme>;
}

interface Props extends EditorProps {
  name: string;
}

export default function RHFEditor({ name, helperText, ...other }: Props) {
  const {
    control,
    watch,
    setValue,
    formState: { isSubmitSuccessful },
  } = useFormContext();

  const values = watch();

  useEffect(() => {
    if (values[name] === '<p><br></p>') {
      setValue(name, '', {
        shouldValidate: !isSubmitSuccessful,
      });
    }
  }, [isSubmitSuccessful, name, setValue, values]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Editor
          id={name}
          value={field.value}
          onChange={field.onChange}
          error={!!error}
          helperText={
            (!!error || helperText) && (
              <FormHelperText error={!!error} sx={{ px: 2 }}>
                {error ? error?.message : helperText}
              </FormHelperText>
            )
          }
          {...other}
        />
      )}
    />
  );
}
