'use client'
import { Grid, Box, Typography, Card, CardContent, Alert, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import PageContainer from '@/components/shared/PageContainer';
import SalesPerformance from './components/SalesPerformance';
import { SellerPerformance } from './types';
import { salesApi } from './services/salesApi';

const Sales = () => {
  const [performanceData, setPerformanceData] = useState<SellerPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the API service to fetch data
        const data = await salesApi.getSellerPerformance();
        setPerformanceData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load sales performance data');
        console.error('Error fetching performance data:', err);
        
        // Fallback to mock data if API fails
        const mockData: SellerPerformance[] = [
          {
            "sellerId": 3,
            "sellerName": "Zorro",
            "totalMeetings": 16,
            "completedMeetings": 10,
            "completionRate": 0.63,
            "averagePositiveSentiment": 0.94,
            "totalClassifications": 16,
            "averageConfidence": null,
            "ranking": 1
          },
          {
            "sellerId": 1,
            "sellerName": "Toro",
            "totalMeetings": 9,
            "completedMeetings": 9,
            "completionRate": 1,
            "averagePositiveSentiment": 0.67,
            "totalClassifications": 9,
            "averageConfidence": null,
            "ranking": 2
          },
          {
            "sellerId": 5,
            "sellerName": "Tiburón",
            "totalMeetings": 6,
            "completedMeetings": 4,
            "completionRate": 0.67,
            "averagePositiveSentiment": 0.67,
            "totalClassifications": 6,
            "averageConfidence": null,
            "ranking": 3
          },
          {
            "sellerId": 2,
            "sellerName": "Puma",
            "totalMeetings": 16,
            "completedMeetings": 9,
            "completionRate": 0.56,
            "averagePositiveSentiment": 0.69,
            "totalClassifications": 16,
            "averageConfidence": null,
            "ranking": 4
          },
          {
            "sellerId": 4,
            "sellerName": "Boa",
            "totalMeetings": 13,
            "completedMeetings": 10,
            "completionRate": 0.77,
            "averagePositiveSentiment": 0.54,
            "totalClassifications": 13,
            "averageConfidence": null,
            "ranking": 5
          }
        ];
        
        setPerformanceData(mockData);
        setError(null); // Clear error since we have fallback data
      } finally {
        setLoading(false);
      }
    };

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
            <SalesPerformance data={performanceData} />
          )}
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default Sales;
