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

interface SectorsOverviewProps {
  sectors: SectorData[];
}

const SectorsOverview = ({ sectors }: SectorsOverviewProps) => {
  const getSectorName = (sector: string) => {
    switch (sector) {
      case 'tourism_hospitality': return 'Turismo y Hospitalidad';
      case 'retail': return 'Retail';
      case 'media_entertainment': return 'Medios y Entretenimiento';
      case 'ecommerce': return 'E-commerce';
      case 'software_saas': return 'Software y SaaS';
      case 'healthcare': return 'Salud';
      case 'education': return 'Educación';
      case 'transportation_logistics': return 'Transporte y Logística';
      case 'ngo': return 'ONG';
      case 'fashion': return 'Moda';
      case 'real_estate': return 'Bienes Raíces';
      case 'financial_services': return 'Servicios Financieros';
      case 'legal': return 'Legal';
      case 'construction': return 'Construcción';
      case 'food_beverages': return 'Alimentos y Bebidas';
      case 'consulting': return 'Consultoría';
      case 'security': return 'Seguridad';
      case 'human_resources': return 'Recursos Humanos';
      case 'energy': return 'Energía';
      case 'services': return 'Servicios';
      case 'agroindustry': return 'Agroindustria';
      default: return sector.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

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
                    {getSectorName(sector.sector)}
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
