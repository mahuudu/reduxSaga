import { Student } from 'models';
import * as React from 'react';
import { Box, Button, CircularProgress, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { InputField, RadioGroupFields, SelectField } from 'components/formFields';
import { useAppSelector } from 'app/hooks';
import { selectCityList, selectCityOptions, studentAction } from '../studentSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppDispatch } from './../../../app/hooks';
import { useSnackbar } from 'notistack';





export interface StudentFormProps {
    initialValues?: Student;
    onSubmit?: (formValues: Student) => void;
}

const schema = yup.object({
    name: yup.string().required(),
    age: yup.number().min(6, 'Min is 6').max(25, 'Max is 25').integer().required('Age is required').typeError('Please enter value number'),
    mark: yup.number().min(1, 'Min is 1').max(10, 'Max is 10').integer().required(),
    gender: yup.string().oneOf(['male', 'female'], 'Enter male or female').required(),
    city: yup.string().required(),
}).required();

export function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const cityOptions = useAppSelector(selectCityOptions);

    const { control, handleSubmit, formState: { isSubmitting } } = useForm<Student>({
        defaultValues: initialValues,
        resolver: yupResolver(schema)
    })

    const handleSubmitForm = async (formValues: Student) => {
        try {
            dispatch(studentAction.onCommitForm(false))
            const result: any = await onSubmit?.(formValues);
            console.log('submit', result)
            enqueueSnackbar(result.message,{ variant: 'success',anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            },})
            if(result.status === true){
                dispatch(studentAction.onCommitForm(true))
            }
            
        } catch (error) {
            console.log('err form', error);
            dispatch(studentAction.onCommitForm(false));
            enqueueSnackbar(error.message,{ variant: 'error',anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            },})
        }
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <InputField name="name" control={control} label="name"></InputField>
                <InputField name="age" control={control} label="age"></InputField>
                <RadioGroupFields
                    name="gender"
                    control={control}
                    label="Gender"
                    options={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' },
                    ]}
                >

                </RadioGroupFields>
                <InputField name="mark" control={control} label="mark"></InputField>
                {Array.isArray(cityOptions) && cityOptions.length > 0 && (
                    <SelectField name="city" control={control} label="City" options={cityOptions} />
                )}
                <Box mt={3}>
                    <Button type="submit" variant='contained' color='primary'>
                        {isSubmitting && <CircularProgress size={16} color="primary"></CircularProgress>}
                        Save
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
