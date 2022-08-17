import * as React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { NumerologyForm } from '../components/numerologyForm';

export interface NumerlogyPageProps {
}

export function NumerlogyPage(props: NumerlogyPageProps) {
  return (
    <div>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Typography variant="h5" >
              Numerology 
          </Typography>

        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex' }}>
              <NumerologyForm />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
