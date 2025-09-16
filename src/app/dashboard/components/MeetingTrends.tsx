import React, { useState, useEffect } from 'react';
import { Select, MenuItem, Box, CircularProgress, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import { kpisService, MeetingData } from '@/api';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const MeetingTrends = () => {
  const [period, setPeriod] = useState<'monthly' | 'quarterly'>('monthly');
  const [meetingType, setMeetingType] = useState<'all' | 'completed' | 'cancelled' | 'all-series'>('all-series');
  const [meetingData, setMeetingData] = useState<MeetingData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const errorColor = theme.palette.error.main;

  const fetchMeetingData = async (periodType: 'monthly' | 'quarterly') => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await kpisService.getMeetingTrends(periodType);
      setMeetingData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error fetching meeting data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetingData(period);
  }, [period]);

  const handlePeriodChange = (event: any) => {
    const newPeriod = event.target.value as 'monthly' | 'quarterly';
    setPeriod(newPeriod);
  };

  const handleMeetingTypeChange = (event: any) => {
    const newType = event.target.value as 'all' | 'completed' | 'cancelled' | 'all-series';
    setMeetingType(newType);
  };

  const processChartData = () => {
    const categories = meetingData.map(item => {
      if (period === 'quarterly') {
        return item.period.replace(/^\d{4}/, '');
      } else {
        const [year, month] = item.period.split('-');
        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
                           'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        return monthNames[parseInt(month) - 1];
      }
    });

    const totalData = meetingData.map(item => item.totalMeetings);
    const completedData = meetingData.map(item => item.completedMeetings);
    const cancelledData = meetingData.map(item => item.cancelledMeetings);

    let filteredData;
    let showAllSeries = false;
    
    switch (meetingType) {
      case 'completed':
        filteredData = completedData;
        break;
      case 'cancelled':
        filteredData = cancelledData;
        break;
      case 'all':
        filteredData = totalData;
        break;
      case 'all-series':
      default:
        filteredData = totalData;
        showAllSeries = true;
        break;
    }

    return { categories, totalData, completedData, cancelledData, filteredData, showAllSeries };
  };

  const { categories, totalData, completedData, cancelledData, filteredData, showAllSeries } = processChartData();

  const chartOptions: any = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      },
      height: 370,
      responsive: [{
        breakpoint: 768,
        options: {
          chart: {
            height: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
    colors: showAllSeries 
      ? [primary, secondary, errorColor] 
      : meetingType === 'completed' 
        ? [secondary]
        : meetingType === 'cancelled'
          ? [errorColor]
          : [primary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '42%',
        borderRadius: [6],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      fontSize: '14px',
      markers: {
        radius: 12,
      },
      responsive: [{
        breakpoint: 768,
        options: {
          position: 'bottom',
          horizontalAlign: 'center'
        }
      }]
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
      title: {
        text: 'Número de Reuniones'
      }
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          fontSize: '12px',
        },
        rotate: -45,
        rotateAlways: false,
        hideOverlappingLabels: true,
        trim: true,
      },
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
      y: {
        formatter: function (val: number) {
          return val + " reuniones";
        }
      }
    },
  };

  const getChartSeries = () => {
    if (showAllSeries) {
      return [
        {
          name: 'Total Reuniones',
          data: totalData,
        },
        {
          name: 'Completadas',
          data: completedData,
        },
        {
          name: 'Canceladas',
          data: cancelledData,
        },
      ];
    } else {
      const getSeriesInfo = () => {
        switch (meetingType) {
          case 'completed':
            return { name: 'Reuniones Completadas', data: completedData };
          case 'cancelled':
            return { name: 'Reuniones Canceladas', data: cancelledData };
          case 'all':
          default:
            return { name: 'Total Reuniones', data: totalData };
        }
      };

      const seriesInfo = getSeriesInfo();
      return [
        {
          name: seriesInfo.name,
          data: seriesInfo.data,
        },
      ];
    }
  };

  const chartSeries: any = getChartSeries();
  
  const getTotalStats = () => {
    if (meetingData.length === 0) return { total: 0, completed: 0, cancelled: 0, avgCompletion: 0 };
    
    const total = meetingData.reduce((sum, item) => sum + item.totalMeetings, 0);
    const completed = meetingData.reduce((sum, item) => sum + item.completedMeetings, 0);
    const cancelled = meetingData.reduce((sum, item) => sum + item.cancelledMeetings, 0);
    const avgCompletion = meetingData.reduce((sum, item) => sum + item.completionRate, 0) / meetingData.length;
    
    return { total, completed, cancelled, avgCompletion };
  };

  const stats = getTotalStats();

  return (
    <DashboardCard 
      title="Tendencias de Reuniones" 
      action={
        <Box display="flex" gap={2}>
          <Select
            labelId="period-dd"
            id="period-dd"
            value={period}
            size="small"
            onChange={handlePeriodChange}
            disabled={loading}
          >
            <MenuItem value="monthly">Mensual</MenuItem>
            <MenuItem value="quarterly">Trimestral</MenuItem>
          </Select>
          <Select
            labelId="type-dd"
            id="type-dd"
            value={meetingType}
            size="small"
            onChange={handleMeetingTypeChange}
            disabled={loading}
          >
            <MenuItem value="all-series">Todas</MenuItem>
            <MenuItem value="all">Totales</MenuItem>
            <MenuItem value="completed">Completadas</MenuItem>
            <MenuItem value="cancelled">Canceladas</MenuItem>
          </Select>
        </Box>
      }
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={370}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box 
            display="flex" 
            flexDirection={{ xs: 'column', sm: 'row' }}
            justifyContent="space-around" 
            alignItems="center"
            mb={3} 
            p={2} 
            sx={{ 
              backgroundColor: 'grey.50', 
              borderRadius: 2,
              gap: { xs: 2, sm: 0 }
            }}
          >
            <Box 
              textAlign="center" 
              flex={1}
              minWidth={{ xs: 'auto', sm: '120px' }}
            >
              <Box 
                fontSize={{ xs: "h6", sm: "h5" }} 
                fontWeight="bold" 
                color="primary.main"
              >
                {stats.total}
              </Box>
              <Box 
                fontSize={{ xs: "caption", sm: "body2" }} 
                color="text.secondary"
              >
                Total Reuniones
              </Box>
            </Box>
            <Box 
              textAlign="center" 
              flex={1}
              minWidth={{ xs: 'auto', sm: '120px' }}
            >
              <Box 
                fontSize={{ xs: "h6", sm: "h5" }} 
                fontWeight="bold" 
                color="secondary.main"
              >
                {stats.completed}
              </Box>
              <Box 
                fontSize={{ xs: "caption", sm: "body2" }} 
                color="text.secondary"
              >
                Completadas
              </Box>
            </Box>
            <Box 
              textAlign="center" 
              flex={1}
              minWidth={{ xs: 'auto', sm: '120px' }}
            >
              <Box 
                fontSize={{ xs: "h6", sm: "h5" }} 
                fontWeight="bold" 
                color="error.main"
              >
                {stats.cancelled}
              </Box>
              <Box 
                fontSize={{ xs: "caption", sm: "body2" }} 
                color="text.secondary"
              >
                Canceladas
              </Box>
            </Box>
            <Box 
              textAlign="center" 
              flex={1}
              minWidth={{ xs: 'auto', sm: '120px' }}
            >
              <Box 
                fontSize={{ xs: "h6", sm: "h5" }} 
                fontWeight="bold" 
                color="success.main"
              >
                {(stats.avgCompletion * 100).toFixed(1)}%
              </Box>
              <Box 
                fontSize={{ xs: "caption", sm: "body2" }} 
                color="text.secondary"
              >
                Tasa Completado
              </Box>
            </Box>
          </Box>

          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={370}
            width={"100%"}
          />
        </>
      )}
    </DashboardCard>
  );
};

export default MeetingTrends;