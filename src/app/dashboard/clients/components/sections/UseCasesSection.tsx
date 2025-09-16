'use client'
import { 
  Typography, 
  Card,
  CardContent,
  Box,
  LinearProgress,
  Chip
} from '@mui/material';
import { IconTarget } from '@tabler/icons-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { UseCaseData } from '../../services/clientApi';
import { getSpanishUseCase } from '@/utils/mappings';

interface UseCasesSectionProps {
  useCases: UseCaseData[];
}

const UseCasesSection = ({ useCases }: UseCasesSectionProps) => {

  const getProgressColor = (percentage: number) => {
    if (percentage >= 50) return 'success';
    if (percentage >= 25) return 'warning';
    return 'error';
  };

  const COLORS = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#ffecd2', '#a8edea', '#d299c2', '#ffd89b', '#89f7fe'];

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <IconTarget size={24} color="#4facfe" />
          <Typography variant="h6" fontWeight="bold">
            Casos de Uso Principales
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 3, 
          alignItems: 'center',
          flexDirection: { xs: 'column', md: 'row' }
        }}>
          <Box sx={{ 
            width: { xs: '100%', md: '40%' }, 
            height: 200,
            display: 'flex',
            justifyContent: 'center'
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={useCases.slice(0, 5)}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="percentage"
                >
                  {useCases.slice(0, 5).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number, name, props) => [
                    `${value.toFixed(1)}%`, 
                    `${getSpanishUseCase(props.payload.use_case)}`
                  ]}
                  labelFormatter={() => ''}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          
          <Box sx={{ width: { xs: '100%', md: '60%' } }}>
            <Box display="flex" flexDirection="column" gap={1.5}>
              {useCases.slice(0, 5).map((useCase, index) => (
                <Box key={useCase.use_case}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: COLORS[index % COLORS.length]
                        }}
                      />
                      <Typography variant="body2" fontWeight="medium" sx={{ fontSize: '0.8rem' }}>
                        {getSpanishUseCase(useCase.use_case)}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Chip 
                        label={`${useCase.count}`} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                        sx={{ fontSize: '0.7rem', height: 20 }}
                      />
                      <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                        {useCase.percentage.toFixed(1)}%
                      </Typography>
                    </Box>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={useCase.percentage} 
                    color={getProgressColor(useCase.percentage)}
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

export default UseCasesSection;
