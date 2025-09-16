import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  CircularProgress,
  LinearProgress,
  Chip,
  Button,
  Alert
} from '@mui/material';

interface ReclassificationModalProps {
  open: boolean;
  taskStatus: any;
  simulatedProgress: number;
  onCancel: () => void;
}

const ReclassificationModal: React.FC<ReclassificationModalProps> = ({
  open,
  taskStatus,
  simulatedProgress,
  onCancel
}) => {
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En cola de procesamiento...';
      case 'processing': return 'Procesando reunión...';
      case 'completed': return 'Clasificación completada';
      case 'failed': return 'Error en la clasificación';
      default: return 'Procesando...';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'info';
      case 'processing': return 'primary';
      case 'completed': return 'success';
      case 'failed': return 'error';
      default: return 'primary';
    }
  };

  return (
    <Dialog 
      open={open} 
      maxWidth="sm" 
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <CircularProgress size={24} />
          <Typography variant="h6">
            Reclasificando Reunión
          </Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ textAlign: 'center', py: 3 }}>
        {taskStatus && (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {getStatusText(taskStatus.status)}
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <LinearProgress 
                variant="determinate" 
                value={taskStatus.status === 'completed' ? 100 : simulatedProgress} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  '& .MuiLinearProgress-bar': {
                    background: taskStatus.status === 'failed' ? '#f44336' : '#6c757d'
                  }
                }} 
              />
              <Typography variant="caption" color="text.secondary" mt={1} display="block">
                {taskStatus.status === 'completed' ? 100 : Math.round(simulatedProgress)}% completado
              </Typography>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1, 
              justifyContent: 'center',
              mt: 2 
            }}>
              <Chip 
                label={`Estado: ${taskStatus.status}`} 
                color={getStatusColor(taskStatus.status) as any}
                size="small" 
              />
              {taskStatus.task_id && (
                <Chip 
                  label={`ID: ${taskStatus.task_id.slice(0, 8)}...`} 
                  variant="outlined"
                  size="small" 
                />
              )}
            </Box>
            
            {taskStatus.error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {taskStatus.error}
              </Alert>
            )}
          </>
        )}
        
        {!taskStatus && (
          <Typography variant="body2" color="text.secondary">
            Iniciando proceso de clasificación...
          </Typography>
        )}
      </DialogContent>
      
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button 
          onClick={onCancel}
          variant="outlined"
          disabled={taskStatus?.status === 'completed'}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReclassificationModal;
