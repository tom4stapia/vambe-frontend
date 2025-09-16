import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { MeetingDetail } from '@/api';

interface MeetingInfoProps {
  meeting: MeetingDetail;
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const MeetingInfo: React.FC<MeetingInfoProps> = ({ meeting }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 3, 
      mb: 3,
      '& > *': { minWidth: '200px', flex: '1 1 200px' }
    }}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Cliente
        </Typography>
        <Typography variant="h6">
          {meeting.client_name}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Vendedor
        </Typography>
        <Typography variant="h6">
          {meeting.seller_name}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Fecha de Reunión
        </Typography>
        <Typography variant="body1">
          {formatDate(meeting.meeting_at)}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Urgencia
        </Typography>
        <Chip
          label={meeting.urgency ? 'Urgente' : 'Normal'}
          color={meeting.urgency ? 'error' : 'default'}
          variant={meeting.urgency ? 'filled' : 'outlined'}
        />
      </Box>
    </Box>
  );
};

export default MeetingInfo;
