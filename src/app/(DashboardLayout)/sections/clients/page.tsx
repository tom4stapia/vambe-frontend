'use client'
import { Grid, Box, Typography, Card, CardContent } from '@mui/material';
import PageContainer from '@/components/shared/PageContainer';
import { IconUsers } from '@tabler/icons-react';

const Clientes = () => {
  return (
    <PageContainer title="Clients" description="Client management">
      <Box>
        <Grid container spacing={3}>
          <Grid size={12}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <IconUsers size={24} />
                  <Typography variant="h5">Client Management</Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                  Here you can manage all your clients, view their information, sales history and more.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Client List
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Client list functionality will be available soon.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

export default Clientes;
