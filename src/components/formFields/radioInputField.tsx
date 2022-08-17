import * as React from 'react';
import { Control, useController } from 'react-hook-form';
import { FormHelperText } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export interface RadioOtion {
    label: string;
    value : number | string;
}

export interface RadioGroupFieldProps{
    children?: React.ReactNode;
    name : string;
    control : Control<any>;
    label?: string; 
    disabled?: boolean;
    options: RadioOtion[]; 
}

export function RadioGroupFields ({ name,control, label, disabled, options}: RadioGroupFieldProps) {

  const {
      field: {value,onChange,onBlur},
      fieldState : {invalid,error},
  } = useController({
      name,
      control
  })
  return (
    <FormControl disabled={disabled} margin="normal" error={invalid}>
    <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    >
     {options.map((option) => (
            <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
     ))}
    </RadioGroup>
    <FormHelperText>{error?.message}</FormHelperText>
  </FormControl>
  );
}
