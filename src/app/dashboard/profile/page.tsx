'use client'
import { 
  Grid, 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip, 
  Avatar, 
  Button,
  TextField,
  Badge,
  LinearProgress,
  Stack
} from '@mui/material';
import PageContainer from '@/components/shared/PageContainer';
import { 
  IconUser, 
  IconMail, 
  IconShield, 
  IconLogout, 
  IconEdit,
  IconCheck,
  IconX,
  IconKey,
  IconSettings,
  IconCalendar,
  IconActivity,
  IconStar
} from '@tabler/icons-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

const Perfil = () => {
  const { user, logout } = useAuth();
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  if (!user) {
    return (
      <PageContainer title="Profile" description="User profile management">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Typography>Cargando información del usuario...</Typography>
        </Box>
      </PageContainer>
    );
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'super_admin': return 'Super Administrador';
      case 'admin': return 'Administrador';
      case 'user': return 'Usuario';
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'error';
      case 'admin': return 'warning';
      case 'user': return 'primary';
      default: return 'default';
    }
  };

  return (
    <PageContainer title="Profile" description="User profile management">
      <Box>
        <Grid container spacing={4}>
          <Grid size={12}>
            <Card 
              sx={{ 
                background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  zIndex: 1
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -30,
                  left: -30,
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)',
                  zIndex: 1
                }}
              />
              <CardContent sx={{ position: 'relative', zIndex: 2, p: 4 }}>
                <Box display="flex" alignItems="center" gap={4} mb={3}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          background: user.active ? '#4caf50' : '#f44336',
                          border: '3px solid white'
                        }}
                      />
                    }
                  >
                    <Avatar 
                      sx={{ 
                        width: 120, 
                        height: 120, 
                        bgcolor: 'rgba(255,255,255,0.2)',
                        fontSize: '3rem',
                        border: '4px solid rgba(255,255,255,0.3)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                  </Badge>
                  <Box flex={1}>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Typography variant="h3" fontWeight="bold">
                      {user.name}
                      </Typography>
                      
                    </Box>
                    <Box display="flex" gap={2} flexWrap="wrap">
                      <Chip 
                        label={getRoleDisplayName(user.role)} 
                        sx={{ 
                          background: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          fontWeight: 'bold',
                          backdropFilter: 'blur(10px)'
                        }}
                        icon={<IconShield size={16} color="white"/>}
                      />
                      <Chip 
                        label={user.active ? "Activo" : "Inactivo"} 
                        sx={{ 
                          background: user.active ? 'rgba(76,175,80,0.3)' : 'rgba(244,67,54,0.3)',
                          color: 'white',
                          fontWeight: 'bold',
                          backdropFilter: 'blur(10px)'
                        }}
                        icon={<IconActivity size={16} color="white"/>}
                      />
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

        
            <Grid size={12}>
              <Card sx={{ height: '100%', width: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      background: '#6c757d',
                      color: 'white'
                    }}
                  >
                    <IconLogout size={24} />
                  </Box>
                  <Typography variant="h6" fontWeight="bold">
                    Gestión de Sesión
                  </Typography>
                </Box>
                
                <Box mb={3}>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Estado de la sesión
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={100} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      background: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        background: '#6c757d'
                      }
                    }} 
                  />
                  <Typography variant="caption" color="text.secondary" mt={1} display="block">
                    Sesión activa y segura
                  </Typography>
                </Box>
                
                <Button 
                  variant="contained" 
                  startIcon={<IconLogout size={20} />}
                  onClick={logout}
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    background: '#6c757d',
                    '&:hover': {
                      background: '#5a6268'
                    }
                  }}
                >
                  Cerrar Sesión
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

export default Perfil;
