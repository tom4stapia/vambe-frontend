'use client'
import { Grid, Box, Typography, Card, CardContent } from '@mui/material';
import PageContainer from '@/components/shared/PageContainer';
import { IconUser } from '@tabler/icons-react';

const Perfil = () => {
  return (
    <PageContainer title="Profile" description="User profile management">
      <Box>
        <Grid container spacing={3}>
          <Grid size={12}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <IconUser size={24} />
                  <Typography variant="h5">My Profile</Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                  Manage your personal information, account settings and preferences.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Profile management functionality will be available soon.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

export default Perfil;
