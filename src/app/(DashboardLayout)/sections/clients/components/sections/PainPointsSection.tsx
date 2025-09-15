'use client'
import { 
  Typography, 
  Card,
  CardContent,
  Box,
  LinearProgress,
  Chip
} from '@mui/material';
import { IconAlertTriangle } from '@tabler/icons-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PainPointData } from '../../services/clientApi';

interface PainPointsSectionProps {
  painPoints: PainPointData[];
}

const PainPointsSection = ({ painPoints }: PainPointsSectionProps) => {
  const getPainPointName = (painPoint: string) => {
    switch (painPoint) {
      case 'lack_visibility': return 'Falta de Visibilidad';
      case 'high_churn': return 'Alta Rotación';
      case 'scalability': return 'Escalabilidad';
      case 'difficult_integrations': return 'Integraciones Difíciles';
      case 'high_advertising_costs': return 'Costos Publicitarios Altos';
      case 'regulatory_compliance': return 'Cumplimiento Regulatorio';
      case 'saturated_support': return 'Soporte Saturado';
      case 'slow_reporting': return 'Reportes Lentos';
      case 'dispersed_data': return 'Datos Dispersos';
      case 'low_conversion': return 'Baja Conversión';
      default: return painPoint.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 50) return 'success';
    if (percentage >= 25) return 'warning';
    return 'error';
  };

  // Colores para gráficos de torta
  const COLORS = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#ffecd2', '#a8edea', '#d299c2', '#ffd89b', '#89f7fe'];

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <IconAlertTriangle size={24} color="#fa709a" />
          <Typography variant="h6" fontWeight="bold">
            Puntos de Dolor Principales
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 3, 
          alignItems: 'center',
          flexDirection: { xs: 'column', md: 'row' }
        }}>
          {/* Gráfico de torta */}
          <Box sx={{ 
            width: { xs: '100%', md: '40%' }, 
            height: 200,
            display: 'flex',
            justifyContent: 'center'
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={painPoints.slice(0, 5)}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="percentage"
                >
                  {painPoints.slice(0, 5).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[(index + 5) % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number, name, props) => [
                    `${value.toFixed(1)}%`, 
                    `${getPainPointName(props.payload.primary_pain_point)}`
                  ]}
                  labelFormatter={() => ''}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          
          {/* Lista de puntos de dolor */}
          <Box sx={{ width: { xs: '100%', md: '60%' } }}>
            <Box display="flex" flexDirection="column" gap={1.5}>
              {painPoints.slice(0, 5).map((painPoint, index) => (
                <Box key={painPoint.primary_pain_point}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: COLORS[(index + 5) % COLORS.length]
                        }}
                      />
                      <Typography variant="body2" fontWeight="medium" sx={{ fontSize: '0.8rem' }}>
                        {getPainPointName(painPoint.primary_pain_point)}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Chip 
                        label={`${painPoint.count}`} 
                        size="small" 
                        color="secondary" 
                        variant="outlined"
                        sx={{ fontSize: '0.7rem', height: 20 }}
                      />
                      <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                        {painPoint.percentage.toFixed(1)}%
                      </Typography>
                    </Box>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={painPoint.percentage} 
                    color={getProgressColor(painPoint.percentage)}
                    sx={{ height: 4, borderRadius: 2 }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PainPointsSection;
