'use client'
import { Grid, Box, Typography, Card, CardContent, Alert, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import PageContainer from '@/components/shared/PageContainer';
import ClientAnalysis from './components/ClientAnalysis';
import { ClientAnalysisData } from './services/clientApi';
import { clientApi } from './services/clientApi';

const Clientes = () => {
  const [analysisData, setAnalysisData] = useState<ClientAnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await clientApi.getClientAnalysis();
        console.log(data);
        setAnalysisData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load client analysis data');
        console.error('Error fetching analysis data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysisData();
  }, []);

  return (
    <PageContainer title="Client Analysis" description="Client analysis and insights">
      <Grid container spacing={3}>
        <Grid size={12}>
          {loading ? (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress />
                <Typography variant="body2" color="text.secondary" mt={2}>
                  Loading client analysis data...
                </Typography>
              </CardContent>
            </Card>
          ) : error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          ) : analysisData ? (
            <ClientAnalysis data={analysisData} />
          ) : null}
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default Clientes;
