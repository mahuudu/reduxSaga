import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

export interface NumerologyFormProps {
}

export function NumerologyForm(props: NumerologyFormProps) {
    const [value, setValue] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );

    const handleChange = (newValue: Date | null) => {
        setValue(newValue);
        const month :number = newValue!.getMonth() + 1;
        const day :number = newValue!.getDate();
        const year :number = newValue!.getFullYear();

        console.log(day);
    };
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                    <DesktopDatePicker
                        label="Date desktop"
                        inputFormat="dd/MM/yyyy"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params :any) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider>
        </>
    );
}
