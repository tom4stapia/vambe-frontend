import React from 'react';
import { Box, Typography, Chip, Divider, List, ListItem, ListItemText, Paper } from '@mui/material';
import { MeetingDetail, MeetingTranscript } from '@/api';
import { capitalizeWord } from '@/utils/mappings';

interface MeetingContentProps {
  meeting: MeetingDetail;
  transcript: MeetingTranscript | null;
}

const MeetingContent: React.FC<MeetingContentProps> = ({ meeting, transcript }) => {
  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Resumen de la Reunión
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {capitalizeWord(meeting.summary)}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Próximos Pasos
        </Typography>
        <Typography variant="body1">
          {meeting.next_steps}
        </Typography>
      </Box>

      {meeting.key_topics && meeting.key_topics.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Temas Clave
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {meeting.key_topics.map((topic, index) => (
              <Chip key={index} label={capitalizeWord(topic)} size="small" variant="outlined" />
            ))}
          </Box>
        </Box>
      )}

      {meeting.action_items && meeting.action_items.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Elementos de Acción
          </Typography>
          <List dense>
            {meeting.action_items.map((item, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemText 
                  primary={`• ${capitalizeWord(item)}`}
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {transcript && (
        <>
          <Divider sx={{ my: 3 }} />
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Transcripción de la Reunión
            </Typography>
            <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                {transcript.transcript}
              </Typography>
            </Paper>
          </Box>
        </>
      )}
    </>
  );
};

export default MeetingContent;
