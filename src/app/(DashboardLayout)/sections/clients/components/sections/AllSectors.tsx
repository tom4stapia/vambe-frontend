'use client'
import { 
  Typography, 
  Card,
  CardContent,
  Box,
  LinearProgress,
  Chip,
  Paper,
  Pagination
} from '@mui/material';
import { IconBuilding } from '@tabler/icons-react';
import { SectorData } from '../../services/clientApi';
import { useState } from 'react';

interface AllSectorsProps {
  sectors: SectorData[];
}

const AllSectors = ({ sectors }: AllSectorsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18; // Mostrar 18 sectores por página (3 filas de 6)

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

  // Funciones de paginación
  const totalPages = Math.ceil(sectors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSectors = sectors.slice(startIndex, endIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <IconBuilding size={24} color="#667eea" />
            <Typography variant="h6" fontWeight="bold">
              Todos los Sectores
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Página {currentPage} de {totalPages} • {sectors.length} sectores total
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(3, 1fr)',
            lg: 'repeat(6, 1fr)' 
          },
          gap: 1.5,
          mb: 3
        }}>
          {currentSectors.map((sector, index) => (
            <Paper 
              key={sector.sector}
              sx={{ 
                p: 1.5, 
                textAlign: 'center',
                border: index < 3 && currentPage === 1 ? '2px solid #667eea' : '1px solid #e0e0e0',
                position: 'relative',
                overflow: 'visible',
                minHeight: 120,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {index < 3 && currentPage === 1 && (
                <Chip 
                  label={`#${index + 1}`}
                  size="small"
                  sx={{ 
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    bgcolor: '#667eea',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.7rem',
                    height: 20
                  }}
                />
              )}
              
              <Box>
                <Typography variant="body2" fontWeight="medium" mb={1} sx={{ fontSize: '0.8rem', lineHeight: 1.2 }}>
                  {getSectorName(sector.sector)}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="h6" color="primary" fontWeight="bold" sx={{ fontSize: '1.1rem' }}>
                  {sector.count}
                </Typography>
                
                <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                  {sector.percentage.toFixed(1)}%
                </Typography>
                
                <LinearProgress 
                  variant="determinate" 
                  value={sector.percentage} 
                  color={getProgressColor(sector.percentage)}
                  sx={{ height: 4, borderRadius: 2, mt: 0.5 }}
                />
              </Box>
            </Paper>
          ))}
        </Box>
        
        {/* Paginación */}
        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AllSectors;
