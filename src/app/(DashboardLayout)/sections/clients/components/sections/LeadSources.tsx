'use client'
import { 
  Typography, 
  Card,
  CardContent,
  Box,
  LinearProgress,
  Chip
} from '@mui/material';
import { IconLink } from '@tabler/icons-react';
import { LeadSourceData } from '../../services/clientApi';
import { getSpanishLeadSource, getLeadSourceInitial } from '@/utils/mappings';

interface LeadSourcesProps {
  leadSources: LeadSourceData[];
}

const LeadSources = ({ leadSources }: LeadSourcesProps) => {

  const getProgressColor = (percentage: number) => {
    if (percentage >= 50) return 'success';
    if (percentage >= 25) return 'warning';
    return 'error';
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <IconLink size={24} color="#f093fb" />
          <Typography variant="h6" fontWeight="bold">
            Fuentes de Leads
          </Typography>
        </Box>
        
        <Box display="flex" flexDirection="column" gap={2}>
          {leadSources.map((source, index) => (
            <Box key={source.source}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: 'secondary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {getLeadSourceInitial(source.source)}
                  </Box>
                  <Typography variant="body2" fontWeight="medium">
                    {getSpanishLeadSource(source.source)}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Chip 
                    label={`${source.count}`} 
                    size="small" 
                    color="secondary" 
                    variant="outlined"
                  />
                  <Typography variant="body2">
                    {source.percentage.toFixed(1)}%
                  </Typography>
                </Box>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={source.percentage} 
                color={getProgressColor(source.percentage)}
                sx={{ height: 6, borderRadius: 3 }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default LeadSources;
