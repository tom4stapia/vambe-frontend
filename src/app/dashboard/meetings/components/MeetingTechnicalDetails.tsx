import React from 'react';
import { Box, Typography, Chip, Divider } from '@mui/material';
import { MeetingDetail } from '@/api';
import { capitalizeWord } from '@/utils/mappings';

interface MeetingTechnicalDetailsProps {
  meeting: MeetingDetail;
}

const MeetingTechnicalDetails: React.FC<MeetingTechnicalDetailsProps> = ({ meeting }) => {
  return (
    <>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Detalles Técnicos
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 3,
        '& > *': { minWidth: '200px', flex: '1 1 200px' }
      }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Puntuación de Confianza
          </Typography>
          <Typography variant="body1">
            {(parseFloat(meeting.confidence_score) * 100).toFixed(1)}%
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Sentimiento
          </Typography>
          <Chip
            label={capitalizeWord(meeting.sentiment)}
            color={meeting.sentiment === 'positive' ? 'success' : 
                   meeting.sentiment === 'negative' ? 'error' : 'default'}
            size="small"
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Modelo Utilizado
          </Typography>
          <Typography variant="body1">
            {capitalizeWord(meeting.model_used)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Tiempo de Procesamiento
          </Typography>
          <Typography variant="body1">
            {meeting.processing_time_ms}ms
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default MeetingTechnicalDetails;
