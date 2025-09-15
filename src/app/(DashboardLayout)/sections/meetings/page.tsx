'use client'
import { Grid, Box, Typography, Card, CardContent } from '@mui/material';
import PageContainer from '@/components/shared/PageContainer';
import { IconCalendar } from '@tabler/icons-react';

const Reuniones = () => {
  return (
    <PageContainer title="Meetings" description="Meetings and appointments management">
      <Box>
        <Grid container spacing={3}>
          <Grid size={12}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <IconCalendar size={24} />
                  <Typography variant="h5">Meeting Management</Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                  Schedule, manage and track all your meetings and client appointments.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Meeting Calendar
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Meeting management functionality will be available soon.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

export default Reuniones;
