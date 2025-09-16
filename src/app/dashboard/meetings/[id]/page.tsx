'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Typography,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import PageContainer from '@/components/shared/PageContainer';
import { fetchClassifications, getMeetingDetail, fetchMeetingTranscript } from '../services/meetingsApi';
import { MeetingDetail, MeetingTranscript } from '@/api';
import {
  getSpanishBusinessSector,
  getSpanishLeadSource,
  getSpanishPainPoint,
  getSpanishUseCase,
  getSpanishRole,
  getSpanishCompanySize,
  getSpanishRegion,
  getSpanishPurchaseStage,
  capitalizeWord
} from '@/utils/mappings';

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const MeetingDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const meetingId = parseInt(params.id as string);
  
  const [meeting, setMeeting] = useState<MeetingDetail | null>(null);
  const [transcript, setTranscript] = useState<MeetingTranscript | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMeetingDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [classifications, transcriptData] = await Promise.all([
          fetchClassifications(),
          fetchMeetingTranscript(meetingId)
        ]);
        
        const meetingDetail = getMeetingDetail(classifications, meetingId);
        
        if (meetingDetail) {
          setMeeting(meetingDetail);
          setTranscript(transcriptData);
        } else {
          setError('Reunión no encontrada');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error cargando detalles de la reunión');
      } finally {
        setLoading(false);
      }
    };

    if (meetingId) {
      loadMeetingDetail();
    }
  }, [meetingId]);

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <PageContainer title="Detalle de Reunión" description="Cargando detalles de la reunión">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </PageContainer>
    );
  }

  if (error || !meeting) {
    return (
      <PageContainer title="Detalle de Reunión" description="Error al cargar detalles">
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'Reunión no encontrada'}
        </Alert>
        <Button onClick={handleBack} startIcon={<ArrowBackIcon />}>
          Volver
        </Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Detalle de Reunión" description="Información completa de la reunión">
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <IconButton onClick={handleBack} size="small">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4">
            Reunión #{meeting.meeting_id}
          </Typography>
        </Box>

        <Paper sx={{ p: 3 }}>
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

          <Divider sx={{ my: 3 }} />

          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 3, 
            mb: 3,
            '& > *': { minWidth: '200px', flex: '1 1 200px' }
          }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Rol del Cliente
              </Typography>
              <Typography variant="body1">
                {getSpanishRole(meeting.decision_maker_role)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Producto Vambe
              </Typography>
              <Chip
                label={capitalizeWord(meeting.vambe_product)}
                color="primary"
                variant="outlined"
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Sector de Negocio
              </Typography>
              <Typography variant="body1">
                {getSpanishBusinessSector(meeting.business_sector)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Tamaño de Empresa
              </Typography>
              <Typography variant="body1">
                {getSpanishCompanySize(meeting.company_size)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Región
              </Typography>
              <Typography variant="body1">
                {getSpanishRegion(meeting.region)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Fuente del Lead
              </Typography>
              <Typography variant="body1">
                {getSpanishLeadSource(meeting.lead_source)}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Información Adicional de Clasificación
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 3, 
              mb: 3,
              '& > *': { minWidth: '200px', flex: '1 1 200px' }
            }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Caso de Uso
                </Typography>
                <Typography variant="body1">
                  {getSpanishUseCase(meeting.use_case)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Punto de Dolor Principal
                </Typography>
                <Typography variant="body1">
                  {getSpanishPainPoint(meeting.primary_pain_point)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Etapa de Compra
                </Typography>
                <Typography variant="body1">
                  {getSpanishPurchaseStage(meeting.purchase_stage)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Idioma
                </Typography>
                <Typography variant="body1">
                  {meeting.language.toUpperCase()}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

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
        </Paper>
      </Box>
    </PageContainer>
  );
};

export default MeetingDetailPage;
