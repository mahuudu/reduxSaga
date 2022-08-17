import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { FormControl, Box, Grid, InputLabel, Select, MenuItem, SelectChangeEvent, Button } from '@mui/material';
import { ListParams } from 'models';
import { City } from './../../../models/city';

export interface StudentSearchProps {
    filter: ListParams;
    onChangeFilter?: (newFilter: ListParams) => void;
    onSearchChange?: (newFilter: ListParams) => void;
    cityList: City[];
}

export function StudentSearch({ filter, onSearchChange, cityList, onChangeFilter }: StudentSearchProps) {

    const [filterCity, setfilterCity] = React.useState("all");
    const inputSearch = React.useRef<HTMLInputElement>();
    const hangleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!onSearchChange) {
            return;
        }
        const keyword = e.target.value;

        const data = {
            ...filter,
            name_like: keyword,
            page: 1,
            city: filterCity === 'all' ? '' : filterCity,
        }
        onSearchChange(data);
    }

    const handleChange = (event: SelectChangeEvent) => {
        setfilterCity(event.target.value);
        if (!onChangeFilter) { return };

        const newFilter = {
            ...filter,
            page: 1,
            city: event.target.value === 'all' ? '' : event.target.value,
        }

        onChangeFilter(newFilter);
    }

    const clearFilter = () => {
        if (!onChangeFilter) { return };
        setfilterCity('all')
        const newFilter = {
            ...filter,
            page: 1,
            city: '',
            name_like : undefined,
        }

        onChangeFilter(newFilter);

        if(inputSearch.current){
            inputSearch.current.value = '';
        }
    }

    return (
        <Box>
            <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid item xs={5}>
                    <FormControl fullWidth>
                        <TextField label="Search name.." color="primary" inputRef={inputSearch} onChange={hangleSearchChange} />
                    </FormControl>
                </Grid>
                <Grid item xs={5}>
                    <FormControl fullWidth variant='outlined'>
                        <InputLabel id="demo-simple-select-label" color="primary">City</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filterCity}
                            label="City"
                            onChange={handleChange}
                            color="primary"
                            variant='outlined'
                        >
                            <MenuItem value="all">
                                <em>All</em>
                            </MenuItem>
                            {cityList.map(city => {
                                return (
                                    <MenuItem key={city.code} value={city.code}>{city.name}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <Button sx={{height: 56}} variant='contained' color='primary' size="large" onClick={clearFilter}> CLEAR</Button>
                </Grid>
            </Grid>
        </Box>
    );
}
