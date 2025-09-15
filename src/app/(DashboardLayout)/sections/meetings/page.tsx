'use client'
import { Grid, Box, Typography, Card, CardContent } from '@mui/material';
import PageContainer from '@/components/shared/PageContainer';
import MeetingsTable from './components/MeetingsTable';

const Reuniones = () => {
  return (
    <PageContainer title="Meetings" description="Meetings and appointments management">
      <Box>
        <Grid container spacing={3}>
          <Grid size={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Meetings Management</Typography>
      </Box>
          <MeetingsTable />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

export default Reuniones;
