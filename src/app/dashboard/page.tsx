'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/components/shared/PageContainer';
import MeetingTrends from '@/app/dashboard/components/dashboard/MeetingTrends';
import KPIOverview from '@/app/dashboard/components/dashboard/KPIOverview';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="Vambe main panel">
      <Box>
        <Grid container spacing={3}>
          <Grid size={12}>
            <KPIOverview />
          </Grid>
          <Grid size={12}>
            <MeetingTrends />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

export default Dashboard;
