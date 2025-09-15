'use client';
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Autocomplete,
  Grid
} from '@mui/material';
import { fetchClassifications, transformClassificationsToTableData } from '../services/meetingsApi';
import { MeetingTableRow, Classification } from '../types';
import { useRouter } from 'next/navigation';
import { getSpanishRole, capitalizeWord } from '@/utils/mappings';


const MeetingsTable: React.FC = () => {
  const router = useRouter();
  const [meetings, setMeetings] = useState<MeetingTableRow[]>([]);
  const [filteredMeetings, setFilteredMeetings] = useState<MeetingTableRow[]>([]);
  const [classifications, setClassifications] = useState<Classification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [productFilter, setProductFilter] = useState<string>('all');
  const [sellerFilter, setSellerFilter] = useState<string>('all');
  const [clientFilter, setClientFilter] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  useEffect(() => {
    const loadMeetings = async () => {
      try {
        setLoading(true);
        setError(null);
        const classificationsData = await fetchClassifications();
        const tableData = transformClassificationsToTableData(classificationsData);
        setClassifications(classificationsData);
        setMeetings(tableData);
        setFilteredMeetings(tableData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading meetings');
      } finally {
        setLoading(false);
      }
    };

    loadMeetings();
  }, []);

  useEffect(() => {
    let filtered = meetings;

    if (urgencyFilter !== 'all') {
      const isUrgent = urgencyFilter === 'urgent';
      filtered = filtered.filter(meeting => meeting.urgency === isUrgent);
    }

    if (productFilter !== 'all') {
      filtered = filtered.filter(meeting => 
        meeting.vambeProduct.toLowerCase() === productFilter.toLowerCase()
      );
    }

    if (sellerFilter !== 'all') {
      filtered = filtered.filter(meeting => 
        meeting.sellerName.toLowerCase() === sellerFilter.toLowerCase()
      );
    }

    if (clientFilter.trim() !== '') {
      filtered = filtered.filter(meeting => 
        meeting.clientName.toLowerCase().includes(clientFilter.toLowerCase())
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(meeting => 
        meeting.decisionMakerRole.toLowerCase() === roleFilter.toLowerCase()
      );
    }

    setFilteredMeetings(filtered);
  }, [meetings, urgencyFilter, productFilter, sellerFilter, clientFilter, roleFilter]);

  const uniqueProducts = Array.from(new Set(meetings.map(meeting => meeting.vambeProduct)));
  const uniqueSellers = Array.from(new Set(meetings.map(meeting => meeting.sellerName)));
  const uniqueRoles = Array.from(new Set(meetings.map(meeting => meeting.decisionMakerRole)));

  const handleMeetingClick = (meetingId: number) => {
    router.push(`/sections/meetings/${meetingId}`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Filters */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 2,
          '& > *': { minWidth: '200px', flex: '1 1 200px' }
        }}>
          <FormControl size="small">
            <InputLabel>Urgencia</InputLabel>
            <Select
              value={urgencyFilter}
              label="Urgencia"
              onChange={(e) => setUrgencyFilter(e.target.value)}
            >
              <MenuItem value="all">Todas</MenuItem>
              <MenuItem value="urgent">Urgentes</MenuItem>
              <MenuItem value="normal">Normales</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl size="small">
            <InputLabel>Producto</InputLabel>
            <Select
              value={productFilter}
              label="Producto"
              onChange={(e) => setProductFilter(e.target.value)}
            >
              <MenuItem value="all">Todos</MenuItem>
              {uniqueProducts.map((product) => (
                <MenuItem key={product} value={product}>
                  {capitalizeWord(product)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl size="small">
            <InputLabel>Vendedor</InputLabel>
            <Select
              value={sellerFilter}
              label="Vendedor"
              onChange={(e) => setSellerFilter(e.target.value)}
            >
              <MenuItem value="all">Todos</MenuItem>
              {uniqueSellers.map((seller) => (
                <MenuItem key={seller} value={seller}>
                  {seller}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            size="small"
            label="Cliente"
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            placeholder="Buscar por nombre..."
          />
          
          <FormControl size="small">
            <InputLabel>Rol del Cliente</InputLabel>
            <Select
              value={roleFilter}
              label="Rol del Cliente"
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <MenuItem value="all">Todos</MenuItem>
              {uniqueRoles.map((role) => (
                <MenuItem key={role} value={role}>
                  {getSpanishRole(role)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <TableContainer 
          component={Paper} 
          sx={{ 
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              height: '6px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f5f5f5',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#c1c1c1',
              borderRadius: '3px',
              '&:hover': {
                backgroundColor: '#a8a8a8',
              },
            },
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="subtitle2" fontWeight="bold">Meeting ID</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight="bold">Cliente</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight="bold">Vendedor</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight="bold">Urgencia</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight="bold">Rol del Cliente</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight="bold">Producto</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMeetings.map((meeting) => (
                <TableRow 
                  key={meeting.meetingId} 
                  hover 
                  onClick={() => handleMeetingClick(meeting.meetingId)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>
                    <Typography variant="body2">
                      {meeting.meetingId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {meeting.clientName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {meeting.sellerName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={meeting.urgency ? 'Urgente' : 'Normal'}
                      color={meeting.urgency ? 'error' : 'default'}
                      size="small"
                      variant={meeting.urgency ? 'filled' : 'outlined'}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {getSpanishRole(meeting.decisionMakerRole)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={capitalizeWord(meeting.vambeProduct)}
                      color="primary"
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {filteredMeetings.map((meeting) => (
          <Card 
            key={meeting.meetingId} 
            sx={{ mb: 2, p: 2, cursor: 'pointer' }}
            onClick={() => handleMeetingClick(meeting.meetingId)}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Meeting #{meeting.meetingId}
                </Typography>
                <Chip
                  label={meeting.urgency ? 'Urgente' : 'Normal'}
                  color={meeting.urgency ? 'error' : 'default'}
                  size="small"
                  variant={meeting.urgency ? 'filled' : 'outlined'}
                />
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="body2">
                  <strong>Cliente:</strong> {meeting.clientName}
                </Typography>
                <Typography variant="body2">
                  <strong>Vendedor:</strong> {meeting.sellerName}
                </Typography>
                <Typography variant="body2">
                  <strong>Rol:</strong> {getSpanishRole(meeting.decisionMakerRole)}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2">
                    <strong>Producto:</strong>
                  </Typography>
                  <Chip
                    label={capitalizeWord(meeting.vambeProduct)}
                    color="primary"
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MeetingsTable;
