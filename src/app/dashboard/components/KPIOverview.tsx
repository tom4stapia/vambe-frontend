import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Alert, Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconUsers, IconUser, IconTarget } from '@tabler/icons-react';
import { kpisService, KPIData } from '@/api';
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const KPIOverview = () => {
  const [kpiData, setKpiData] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();

  const fetchKPIData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await kpisService.getKPIOverview();
      setKpiData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error fetching KPI data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKPIData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={200}>
        <Typography>Cargando...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  if (!kpiData) {
    return null;
  }

  const KPICard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    subtitle 
  }: { 
    title: string; 
    value: string | number; 
    icon: any; 
    color: string; 
    subtitle?: string; 
  }) => (
    <Card 
      sx={{ 
        height: '100%',
        boxShadow: 'none',
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: `${color}15`,
              color: color,
            }}
          >
            <Icon size={32} />
          </Box>
        </Box>
        <Typography variant="h3" fontWeight="700" color={color} mb={2}>
          {value}
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={1}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  const ConversionCard = ({ 
    title, 
    rate, 
    icon: Icon, 
    color 
  }: { 
    title: string; 
    rate: number; 
    icon: any; 
    color: string; 
  }) => {
    const percentage = Math.round(rate * 100);
    const remaining = 100 - percentage;
    
    const donutOptions: any = {
      chart: {
        type: 'donut',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 155,
      },
      colors: [color, '#F9F9FD'],
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          donut: {
            size: '75%',
            background: 'transparent',
          },
        },
      },
      tooltip: {
        theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
        fillSeriesColor: false,
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 991,
          options: {
            chart: {
              width: 120,
            },
          },
        },
      ],
    };
    
    const donutSeries = [percentage, remaining];
    
    return (
    <Card 
      sx={{ 
        height: '100%',
        boxShadow: 'none',
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: `${color}15`,
              color: color,
            }}
          >
            <Icon size={32} />
          </Box>
          <Typography variant="h5" color="text.primary" fontWeight="600">
            {title}
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid size={{ xs: 7, sm: 7 }}>
            <Typography variant="h3" fontWeight="700" color={color}>
              {percentage}%
            </Typography>
            <Typography variant="h6" color="text.secondary" mt={1}>
              Tasa de conversión
            </Typography>
          </Grid>
          <Grid size={{ xs: 5, sm: 5 }}>
            <Chart
              options={donutOptions}
              series={donutSeries}
              type="donut"
              height={150}
              width={"100%"}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    );
  };

  return (
    <Box mb={4}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <KPICard
            title="Total Vendedores"
            value={kpiData.totalSellers}
            icon={IconUser}
            color={theme.palette.primary.main}
            subtitle="Equipo de ventas activo"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <KPICard
            title="Total Clientes"
            value={kpiData.totalClients}
            icon={IconUsers}
            color={theme.palette.secondary.main}
            subtitle="Base de clientes registrados"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
          <ConversionCard
            title="Tasa de Conversión"
            rate={kpiData.averageConversionRate}
            icon={IconTarget}
            color={theme.palette.success.main}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default KPIOverview;