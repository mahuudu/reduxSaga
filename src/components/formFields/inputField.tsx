import * as React from 'react';
import { Control, useController } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { FormHelperText } from '@mui/material';


export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement>{
    name : string;
    control : Control<any>;
    label?: string;

}

export function InputField ({name,control, label, ...inputProps}: InputFieldProps) {

  const {
      field: {value,onChange,onBlur,ref},
      fieldState : {invalid,error},
  } = useController({
      name,
      control
  })
  return (
    <TextField 
     label={label}
     margin="normal"
     fullWidth 
     value={value}
     onChange={onChange}
     onBlur={onBlur}
     variant="outlined"
     inputRef={ref}
     error={invalid}
     helperText={error?.message}
     inputProps={inputProps}
     >

     </TextField>
  );
}
