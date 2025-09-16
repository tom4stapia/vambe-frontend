'use client'
import { 
  Typography, 
  Card,
  CardContent,
  Box,
  LinearProgress,
  Chip
} from '@mui/material';
import { IconBox } from '@tabler/icons-react';
import { TechnologyData } from '../../services/clientApi';
import { capitalizeWord } from '@/utils/mappings';

interface ProductsSectionProps {
  technologies: TechnologyData[];
}

const ProductsSection = ({ technologies }: ProductsSectionProps) => {
  const getProductImage = (product: string) => {
    switch (product) {
      case 'mercur': return 'https://cdn.prod.website-files.com/680c0d216c6540b659f79bad/6851ac57b6594ba2a467bbc7_Mercur-MB.png';
      case 'iris': return 'https://cdn.prod.website-files.com/680c0d216c6540b659f79bad/6851ac9649d8b0b491540dc3_Iris_MB.png';
      case 'ads': return 'https://cdn.prod.website-files.com/680c0d216c6540b659f79bad/6855923491c58969f8bd7173_Vambe_Ads.svg';
      case 'axis': return 'https://cdn.prod.website-files.com/680c0d216c6540b659f79bad/6851acc31a88938ecbbff4db_Axis_MB.png';
      default: return null;
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 50) return 'success';
    if (percentage >= 25) return 'warning';
    return 'error';
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <IconBox size={24} color="#667eea" />
          <Typography variant="h6" fontWeight="bold">
            Productos Vambe
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: 'repeat(1, 1fr)', 
            md: 'repeat(3, 1fr)' 
          },
          gap: 3
        }}>
          {technologies.map((tech, index) => {
            const productImage = getProductImage(tech.vambe_product);
            const backgroundColor = '#2c3e50'
            const textColor = '#ffffff';
            
            return (
              <Box 
                key={tech.vambe_product}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  backgroundColor: backgroundColor,
                  border: '1px solid #e0e0e0',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'visible',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <Box>
                  <Box mb={3}>
                    {productImage ? (
                      <Box
                        component="img"
                        src={productImage}
                        alt={capitalizeWord(tech.vambe_product)}
                        sx={{
                          width: 170,
                          objectFit: 'contain',
                          mb: 2
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '2rem',
                          fontWeight: 'bold',
                          mb: 2
                        }}
                      >
                        ?
                      </Box>
                    )}
                  </Box>
                </Box>
                
                <Box>
                  <Box display="flex" flexDirection="column" gap={2} mb={3}>
                    <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                      <Chip 
                        label={`${tech.count} ${tech.count === 1 ? 'reunión' : 'reuniones'}`} 
                        size="medium" 
                        sx={{
                          backgroundColor: textColor === '#ffffff' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                          color: textColor,
                          borderColor: textColor,
                          fontSize: '0.9rem',
                          height: 32
                        }}
                      />
                    </Box>
                    <Typography 
                      variant="h3" 
                      fontWeight="bold"
                      sx={{ color: textColor }}
                    >
                      {tech.percentage.toFixed(1)}%
                    </Typography>
                  </Box>
                  
                  <LinearProgress 
                    variant="determinate" 
                    value={tech.percentage} 
                    color={getProgressColor(tech.percentage)}
                    sx={{ 
                      height: 12, 
                      borderRadius: 6,
                      backgroundColor: textColor === '#ffffff' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductsSection;
