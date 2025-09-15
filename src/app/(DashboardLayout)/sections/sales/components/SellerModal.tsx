'use client'
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Alert,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import { 
  IconUser,
  IconMail,
  IconPhone,
  IconMessage
} from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { Seller, CreateSellerRequest, UpdateSellerRequest } from '../types';

interface SellerModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: CreateSellerRequest | UpdateSellerRequest) => Promise<void>;
  editingSeller?: Seller | null;
  isCreating?: boolean;
  loading?: boolean;
  error?: string | null;
}

const SellerModal = ({ 
  open, 
  onClose, 
  onSave, 
  editingSeller, 
  isCreating = false, 
  loading = false, 
  error = null 
}: SellerModalProps) => {
  const [formData, setFormData] = useState<CreateSellerRequest>({
    name: '',
    email: '',
    phone: '',
    active: true,
    prompt: ''
  });

  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (editingSeller) {
      setFormData({
        name: editingSeller.name,
        email: editingSeller.email,
        phone: editingSeller.phone,
        active: editingSeller.active,
        prompt: editingSeller.prompt
      });
    } else if (isCreating) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        active: true,
        prompt: ''
      });
    }
    setLocalError(null);
  }, [editingSeller, isCreating, open]);

  const handleSave = async () => {
    setLocalError(null);
    
    if (!formData.name.trim()) {
      setLocalError('El nombre es requerido');
      return;
    }

    if (!formData.prompt.trim()) {
      setLocalError('El prompt es requerido');
      return;
    }

    try {
      await onSave(formData);
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Error al guardar vendedor');
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {isCreating ? 'Agregar Nuevo Vendedor' : 'Editar Vendedor'}
      </DialogTitle>
      <DialogContent>
        {(error || localError) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || localError}
          </Alert>
        )}
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Información Básica
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
              <TextField
                fullWidth
                label="Nombre del Vendedor"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                InputProps={{
                  startAdornment: <IconUser size={20} style={{ marginRight: 8 }} />
                }}
                disabled={loading}
              />
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  InputProps={{
                    startAdornment: <IconMail size={20} style={{ marginRight: 8 }} />
                  }}
                  disabled={loading}
                />
                
                <TextField
                  fullWidth
                  label="Teléfono"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  InputProps={{
                    startAdornment: <IconPhone size={20} style={{ marginRight: 8 }} />
                  }}
                  disabled={loading}
                />
              </Box>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.active}
                    onChange={(e) => setFormData({...formData, active: e.target.checked})}
                    disabled={loading}
                  />
                }
                label="Vendedor Activo"
              />
            </Box>
          </Box>

          {/* Prompt */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Prompt de IA
            </Typography>
            <TextField
              fullWidth
              multiline
              sx={{ marginTop: 1 }}
              rows={6}
              label="Prompt del Vendedor"
              placeholder="Describe la personalidad, especialización y enfoque de este vendedor de IA..."
              value={formData.prompt}
              onChange={(e) => setFormData({...formData, prompt: e.target.value})}
              disabled={loading}
              helperText="Este prompt define cómo se comportará el vendedor de IA en las conversaciones"
            />
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          disabled={loading || !formData.name.trim() || !formData.prompt.trim()}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {loading ? 'Guardando...' : (isCreating ? 'Crear' : 'Actualizar')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SellerModal;
