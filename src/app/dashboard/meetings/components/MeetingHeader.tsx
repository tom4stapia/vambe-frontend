import React from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Refresh as RefreshIcon } from '@mui/icons-material';

interface MeetingHeaderProps {
  meetingId: number;
  onBack: () => void;
  onReclassify: () => void;
  reclassifying: boolean;
}

const MeetingHeader: React.FC<MeetingHeaderProps> = ({
  meetingId,
  onBack,
  onReclassify,
  reclassifying
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={onBack} size="small">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">
          Reunión #{meetingId}
        </Typography>
      </Box>
      
      <Button
        variant="outlined"
        startIcon={<RefreshIcon />}
        onClick={onReclassify}
        disabled={reclassifying}
        sx={{
          borderColor: '#6c757d',
          color: '#6c757d',
          '&:hover': {
            borderColor: '#5a6268',
            backgroundColor: 'rgba(108, 117, 125, 0.04)'
          }
        }}
      >
        {reclassifying ? 'Reclasificando...' : 'Reclasificar Reunión'}
      </Button>
    </Box>
  );
};

export default MeetingHeader;
