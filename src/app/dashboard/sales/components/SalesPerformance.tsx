'use client'
import { 
  Typography, 
  Card,
  Chip,
  Box,
  Avatar,
  LinearProgress,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Paper
} from '@mui/material';
import { 
  IconEdit, 
  IconPlus,
  IconArrowUp,
  IconArrowDown,
  IconSortAscending,
  IconSortDescending,
  IconRefresh,
  IconUserOff
} from '@tabler/icons-react';
import { useState, useMemo, useEffect } from 'react';
import { SellerPerformance, Seller } from '../types';
import SellerModal from './SellerModal';
import { salesApi } from '../services/salesApi';

interface SalesPerformanceProps {
  data: SellerPerformance[];
}

type SortField = 'ranking' | 'sellerName' | 'totalMeetings' | 'completionRate' | 'averagePositiveSentiment';
type SortDirection = 'asc' | 'desc';

const SalesPerformance = ({ data }: SalesPerformanceProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSeller, setEditingSeller] = useState<Seller | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para filtros
  const [sortField, setSortField] = useState<SortField>('ranking');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filterActive, setFilterActive] = useState<string>('all');
  const [sellersData, setSellersData] = useState<Seller[]>([]);

  // Cargar datos de vendedores al montar el componente
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const sellers = await salesApi.getSellers();
        setSellersData(sellers);
      } catch (err) {
        console.error('Error al cargar vendedores:', err);
        // Si falla, usar datos mock
        const mockSellers: Seller[] = [
          { id: 1, name: 'Toro', email: 'toro@vambe.com', phone: '56912345678', active: true, prompt: 'Prompt del Toro' },
          { id: 2, name: 'Puma', email: 'puma@vambe.com', phone: '56912345678', active: true, prompt: 'Prompt del Puma' },
          { id: 3, name: 'Zorro', email: 'zorro@vambe.com', phone: '56912345678', active: false, prompt: 'Prompt del Zorro' }
        ];
        setSellersData(mockSellers);
      }
    };
    
    fetchSellers();
  }, []);

  const getRankingColor = (ranking: number) => {
    switch (ranking) {
      case 1: return '#FFD700'; // Gold
      case 2: return '#C0C0C0'; // Silver
      case 3: return '#CD7F32'; // Bronze
      default: return 'primary.main';
    }
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 0.8) return 'success';
    if (rate >= 0.6) return 'warning';
    return 'error';
  };

  // Función para manejar cambios en los filtros
  const handleSortFieldChange = (event: SelectChangeEvent) => {
    setSortField(event.target.value as SortField);
  };

  const handleSortDirectionChange = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleFilterActiveChange = (event: SelectChangeEvent) => {
    setFilterActive(event.target.value);
  };

  const resetFilters = () => {
    setSortField('ranking');
    setSortDirection('asc');
    setFilterActive('all');
  };

  // Lógica de filtrado y ordenamiento
  const filteredAndSortedData = useMemo(() => {
    let filteredData = [...data];

    // Filtrar por estado activo
    if (filterActive !== 'all') {
      filteredData = filteredData.filter(sellerPerformance => {
        // Buscar el vendedor correspondiente en sellersData
        const seller = sellersData.find(s => s.id === sellerPerformance.sellerId);
        if (!seller) return filterActive === 'active'; // Si no encontramos el vendedor, asumimos activo por defecto
        
        if (filterActive === 'active') {
          return seller.active === true;
        } else if (filterActive === 'inactive') {
          return seller.active === false;
        }
        return true;
      });
    }

    // Ordenar los datos
    filteredData.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case 'ranking':
          aValue = a.ranking;
          bValue = b.ranking;
          break;
        case 'sellerName':
          aValue = a.sellerName.toLowerCase();
          bValue = b.sellerName.toLowerCase();
          break;
        case 'totalMeetings':
          aValue = a.totalMeetings;
          bValue = b.totalMeetings;
          break;
        case 'completionRate':
          aValue = a.completionRate;
          bValue = b.completionRate;
          break;
        case 'averagePositiveSentiment':
          aValue = a.averagePositiveSentiment;
          bValue = b.averagePositiveSentiment;
          break;
        default:
          return 0;
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    return filteredData;
  }, [data, sortField, sortDirection, filterActive, sellersData]);

  const handleEditSeller = async (seller: SellerPerformance) => {
    try {
      // Buscar la información completa del vendedor
      const sellers = await salesApi.getSellers();
      const fullSeller = sellers.find(s => s.id === seller.sellerId);
      
      if (fullSeller) {
        setEditingSeller(fullSeller);
        setIsCreating(false);
        setOpenDialog(true);
      } else {
        // Si no encontramos el vendedor completo, crear uno básico
        const basicSeller: Seller = {
          id: seller.sellerId,
          name: seller.sellerName,
          email: '',
          phone: '',
          active: true,
          prompt: ''
        };
        setEditingSeller(basicSeller);
        setIsCreating(false);
        setOpenDialog(true);
      }
    } catch (err) {
      console.error('Error al cargar información del vendedor:', err);
      // Fallback: crear seller básico
      const basicSeller: Seller = {
        id: seller.sellerId,
        name: seller.sellerName,
        email: '',
        phone: '',
        active: true,
        prompt: ''
      };
      setEditingSeller(basicSeller);
      setIsCreating(false);
      setOpenDialog(true);
    }
  };

  const handleCreateSeller = () => {
    setEditingSeller(null);
    setIsCreating(true);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSeller(null);
    setIsCreating(false);
    setError(null);
  };

  const handleSaveSeller = async (formData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      if (isCreating) {
        await salesApi.createSeller(formData);
      } else if (editingSeller) {
        await salesApi.updateSeller(editingSeller.id!, formData);
      }
      
      // Recargar la lista de vendedores
      const updatedSellers = await salesApi.getSellers();
      setSellersData(updatedSellers);
      
      handleCloseDialog();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar vendedor');
      throw err; // Re-lanzar para que el modal maneje el error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Header con título y botón */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Sales Team Performance</Typography>
        <Button
          variant="contained"
          startIcon={<IconPlus size={20} />}
          onClick={handleCreateSeller}
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'bold'
          }}
        >
          Agregar Vendedor
        </Button>
      </Box>

      {/* Filtros de ordenamiento */}
      <Card sx={{ p: 2, mb: 3, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(5, 1fr)' 
          },
          gap: 2,
          alignItems: 'center'
        }}>
          <FormControl fullWidth size="small">
            <InputLabel>Ordenar por</InputLabel>
            <Select
              value={sortField}
              label="Ordenar por"
              onChange={handleSortFieldChange}
            >
              <MenuItem value="ranking">Ranking</MenuItem>
              <MenuItem value="sellerName">Nombre</MenuItem>
              <MenuItem value="totalMeetings">Total Reuniones</MenuItem>
              <MenuItem value="completionRate">Tasa de Completado</MenuItem>
              <MenuItem value="averagePositiveSentiment">Sentimiento Promedio</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth size="small">
            <InputLabel>Dirección</InputLabel>
            <Select
              value={sortDirection}
              label="Dirección"
              onChange={handleSortDirectionChange}
            >
              <MenuItem value="asc">
                <Box display="flex" alignItems="center" gap={1}>
                  <IconArrowUp size={16} />
                  Ascendente
                </Box>
              </MenuItem>
              <MenuItem value="desc">
                <Box display="flex" alignItems="center" gap={1}>
                  <IconArrowDown size={16} />
                  Descendente
                </Box>
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Estado</InputLabel>
            <Select
              value={filterActive}
              label="Estado"
              onChange={handleFilterActiveChange}
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="active">Activos</MenuItem>
              <MenuItem value="inactive">Inactivos</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            onClick={handleSortDirectionChange}
            startIcon={sortDirection === 'asc' ? <IconSortAscending size={16} /> : <IconSortDescending size={16} />}
            sx={{ 
              height: '40px',
              textTransform: 'none'
            }}
          >
            {sortDirection === 'asc' ? 'Ascendente' : 'Descendente'}
          </Button>

          <Button
            variant="outlined"
            onClick={resetFilters}
            startIcon={<IconRefresh size={16} />}
            sx={{ 
              height: '40px',
              textTransform: 'none'
            }}
            title="Resetear filtros"
          >
            Limpiar Filtros
          </Button>
        </Box>
      </Card>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="body2" color="text.secondary">
          Mostrando {filteredAndSortedData.length} de {data.length} vendedores
          {sortField !== 'ranking' || sortDirection !== 'asc' ? ' (filtrados)' : ''}
        </Typography>
        <Chip 
          label={`Ordenado por: ${sortField === 'sellerName' ? 'Nombre' : 
                              sortField === 'totalMeetings' ? 'Total Reuniones' :
                              sortField === 'completionRate' ? 'Tasa de Completado' :
                              sortField === 'averagePositiveSentiment' ? 'Sentimiento Promedio' : 'Ranking'}`}
          size="small"
          color={sortDirection === 'asc' ? 'primary' : 'secondary'}
          icon={sortDirection === 'asc' ? <IconArrowUp size={16} /> : <IconArrowDown size={16} />}
        />
      </Box>
      
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { 
          xs: '1fr', 
          sm: 'repeat(2, 1fr)', 
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)'
        },
        gap: 3
      }}>
        {filteredAndSortedData.map((seller) => (
          <Card key={seller.sellerId} sx={{ 
            p: 2,
            border: seller.ranking <= 3 ? `2px solid ${getRankingColor(seller.ranking)}` : '1px solid #e0e0e0',
            position: 'relative',
            overflow: 'visible'
          }}>
            <Chip 
              label={`#${seller.ranking}`}
              size="small"
              sx={{ 
                position: 'absolute',
                top: -10,
                right: 10,
                bgcolor: getRankingColor(seller.ranking),
                color: 'white',
                fontWeight: 'bold'
              }}
            />

            {/* Información del vendedor */}
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Avatar sx={{ 
                bgcolor: 'primary.main', 
                width: 48, 
                height: 48,
                fontSize: '1.2rem'
              }}>
                {seller.sellerName.charAt(0)}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {seller.sellerName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Seller ID: {seller.sellerId}
                </Typography>
              </Box>
              
              <IconButton
                size="small"
                onClick={() => handleEditSeller(seller)}
                sx={{ 
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <IconEdit size={16} />
              </IconButton>
            </Box>

            {/* Métricas */}
            <Box display="flex" flexDirection="column" gap={2}>
              {/* Meetings */}
              <Box>
                <Typography variant="body2" color="text.secondary" mb={0.5}>
                  Meetings
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {seller.completedMeetings}/{seller.totalMeetings}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  completed
                </Typography>
              </Box>

              {/* Completion Rate */}
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                  <Typography variant="body2" color="text.secondary">
                    Completion Rate
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {(seller.completionRate * 100).toFixed(1)}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={seller.completionRate * 100}
                  color={getCompletionColor(seller.completionRate)}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              {/* Classifications */}
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Classifications
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {seller.totalClassifications}
                </Typography>
              </Box>

              {/* Sentiment Score */}
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Sentiment
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="success.main">
                  {(seller.averagePositiveSentiment * 100).toFixed(1)}%
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Placeholder cuando no hay resultados */}
      {filteredAndSortedData.length === 0 && (
        <Paper sx={{ 
          p: 4, 
          textAlign: 'center',
          mt: 3,
          bgcolor: 'grey.50',
          border: '1px dashed #e0e0e0'
        }}>
          <IconUserOff size={64} style={{ color: '#9e9e9e', marginBottom: 16 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No hay agentes que cumplan con los requisitos pedidos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {filterActive === 'active' 
              ? 'No se encontraron vendedores activos con los criterios seleccionados.'
              : filterActive === 'inactive'
              ? 'No se encontraron vendedores inactivos con los criterios seleccionados.'
              : 'No se encontraron vendedores con los criterios seleccionados.'
            }
          </Typography>
          <Button
            variant="outlined"
            onClick={resetFilters}
            startIcon={<IconRefresh size={16} />}
            sx={{ mt: 2 }}
          >
            Limpiar Filtros
          </Button>
        </Paper>
      )}

      {/* Modal de edición/creación */}
      <SellerModal
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={handleSaveSeller}
        editingSeller={editingSeller}
        isCreating={isCreating}
        loading={loading}
        error={error}
      />
    </Box>
  );
};

export default SalesPerformance;