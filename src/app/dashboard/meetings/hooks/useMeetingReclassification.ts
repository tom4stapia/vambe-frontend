import { useState, useEffect } from 'react';
import { workersService } from '@/api';
import { fetchClassifications, getMeetingDetail, fetchMeetingTranscript } from '../services/meetingsApi';

interface UseMeetingReclassificationProps {
  meetingId: number;
  onDataReload: (meeting: any, transcript: any) => void;
}

export const useMeetingReclassification = ({ meetingId, onDataReload }: UseMeetingReclassificationProps) => {
  const [reclassifying, setReclassifying] = useState(false);
  const [taskStatus, setTaskStatus] = useState<any>(null);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [pollingInterval, progressInterval]);

  const startProgressSimulation = () => {
    setSimulatedProgress(0);
    const interval = setInterval(() => {
      setSimulatedProgress(prev => {
        if (prev >= 90) {
          return prev;
        }
        return prev + Math.random() * 15; 
      });
    }, 500); 
    setProgressInterval(interval);
  };

  const stopProgressSimulation = () => {
    if (progressInterval) {
      clearInterval(progressInterval);
      setProgressInterval(null);
    }
  };

  const handleReclassify = async () => {
    try {
      setReclassifying(true);
      setTaskStatus(null);
      setSimulatedProgress(0);
      
      startProgressSimulation();
      
      const taskResponse = await workersService.classifyMeeting(meetingId);
      setTaskStatus(taskResponse);
      
      const interval = setInterval(async () => {
        try {
          const status = await workersService.getTaskStatus(taskResponse.task_id);
          setTaskStatus(status);
          
          if (status.status === 'completed') {
            clearInterval(interval);
            setPollingInterval(null);
            stopProgressSimulation();
            setSimulatedProgress(100);
            
            const [classifications, transcriptData] = await Promise.all([
              fetchClassifications(),
              fetchMeetingTranscript(meetingId)
            ]);
            
            const meetingDetail = getMeetingDetail(classifications, meetingId);
            
            if (meetingDetail) {
              onDataReload(meetingDetail, transcriptData);
            }
            
            setTimeout(() => {
              setReclassifying(false);
              setTaskStatus(null);
              setSimulatedProgress(0);
            }, 1000);
          } else if (status.status === 'failed') {
            clearInterval(interval);
            setPollingInterval(null);
            stopProgressSimulation();
            setReclassifying(false);
            setTaskStatus(null);
            setSimulatedProgress(0);
            console.error('Task failed:', status.error);
          }
        } catch (err) {
          console.error('Error checking task status:', err);
        }
      }, 2000);
      
      setPollingInterval(interval);
    } catch (err) {
      console.error('Error reclassifying meeting:', err);
      setReclassifying(false);
      setTaskStatus(null);
      stopProgressSimulation();
      setSimulatedProgress(0);
    }
  };

  const cancelReclassification = () => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
    stopProgressSimulation();
    setReclassifying(false);
    setTaskStatus(null);
    setSimulatedProgress(0);
  };

  return {
    reclassifying,
    taskStatus,
    simulatedProgress,
    handleReclassify,
    cancelReclassification
  };
};
