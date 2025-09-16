'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  CircularProgress,
  Alert,
  Button,
  Paper
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import PageContainer from '@/components/shared/PageContainer';
import { fetchClassifications, getMeetingDetail, fetchMeetingTranscript } from '../services/meetingsApi';
import { MeetingDetail, MeetingTranscript } from '@/api';
import { useMeetingReclassification } from '../hooks/useMeetingReclassification';

import MeetingHeader from '../components/MeetingHeader';
import MeetingInfo from '../components/MeetingInfo';
import MeetingClassification from '../components/MeetingClassification';
import MeetingContent from '../components/MeetingContent';
import MeetingTechnicalDetails from '../components/MeetingTechnicalDetails';
import ReclassificationModal from '../components/ReclassificationModal';

const MeetingDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const meetingId = parseInt(params.id as string);
  
  const [meeting, setMeeting] = useState<MeetingDetail | null>(null);
  const [transcript, setTranscript] = useState<MeetingTranscript | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    reclassifying,
    taskStatus,
    simulatedProgress,
    handleReclassify,
    cancelReclassification
  } = useMeetingReclassification({
    meetingId,
    onDataReload: (meetingDetail, transcriptData) => {
      setMeeting(meetingDetail);
      setTranscript(transcriptData);
    }
  });

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
        <MeetingHeader
          meetingId={meeting.meeting_id}
          onBack={handleBack}
          onReclassify={handleReclassify}
          reclassifying={reclassifying}
        />

        <Paper sx={{ p: 3 }}>
          <MeetingInfo meeting={meeting} />
          
          <MeetingClassification meeting={meeting} />
          
          <MeetingContent meeting={meeting} transcript={transcript} />
          
          <MeetingTechnicalDetails meeting={meeting} />
        </Paper>

        <ReclassificationModal
          open={reclassifying}
          taskStatus={taskStatus}
          simulatedProgress={simulatedProgress}
          onCancel={cancelReclassification}
        />
      </Box>
    </PageContainer>
  );
};

export default MeetingDetailPage;
