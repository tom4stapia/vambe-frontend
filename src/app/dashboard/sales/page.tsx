'use client'
import { Grid, Box, Typography, Card, CardContent, Alert, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import PageContainer from '@/components/shared/PageContainer';
import SalesPerformance from './components/SalesPerformance';
import { SellerPerformance } from '@/api';
import { salesApi } from './services/salesApi';

const Sales = () => {
  const [performanceData, setPerformanceData] = useState<SellerPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPerformanceData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await salesApi.getSellerPerformance();
      setPerformanceData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sales performance data');
      console.error('Error fetching performance data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformanceData();
  }, []);

  return (
    <PageContainer title="Sales" description="Sales team management">
      <Grid container spacing={3}>
        <Grid size={12}>
          {loading ? (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress />
                <Typography variant="body2" color="text.secondary" mt={2}>
                  Loading sales performance data...
                </Typography>
              </CardContent>
            </Card>
          ) : error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          ) : (
            <SalesPerformance data={performanceData} onRefresh={fetchPerformanceData} />
          )}
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default Sales;
