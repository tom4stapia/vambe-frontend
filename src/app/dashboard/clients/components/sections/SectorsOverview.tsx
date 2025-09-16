'use client'
import { 
  Typography, 
  Card,
  CardContent,
  Box,
  LinearProgress,
  Chip
} from '@mui/material';
import { IconBuilding } from '@tabler/icons-react';
import { SectorData } from '../../services/clientApi';
import { getSpanishBusinessSector } from '@/utils/mappings';

interface SectorsOverviewProps {
  sectors: SectorData[];
}

const SectorsOverview = ({ sectors }: SectorsOverviewProps) => {

  const getProgressColor = (percentage: number) => {
    if (percentage >= 50) return 'success';
    if (percentage >= 25) return 'warning';
    return 'error';
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <IconBuilding size={24} color="#667eea" />
          <Typography variant="h6" fontWeight="bold">
            Sectores Principales
          </Typography>
        </Box>
        
        <Box display="flex" flexDirection="column" gap={2}>
          {sectors.slice(0, 5).map((sector, index) => (
            <Box key={sector.sector}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {sector.sector.charAt(0).toUpperCase()}
                  </Box>
                  <Typography variant="body2" fontWeight="medium">
                    {getSpanishBusinessSector(sector.sector)}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Chip 
                    label={`${sector.count}`} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                  <Typography variant="body2">
                    {sector.percentage.toFixed(1)}%
                  </Typography>
                </Box>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={sector.percentage} 
                color={getProgressColor(sector.percentage)}
                sx={{ height: 6, borderRadius: 3 }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SectorsOverview;
