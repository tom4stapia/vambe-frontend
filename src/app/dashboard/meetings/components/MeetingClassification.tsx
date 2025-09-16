import React from 'react';
import { Box, Typography, Chip, Divider } from '@mui/material';
import { MeetingDetail } from '@/api';
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

interface MeetingClassificationProps {
  meeting: MeetingDetail;
}

const MeetingClassification: React.FC<MeetingClassificationProps> = ({ meeting }) => {
  return (
    <>
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
    </>
  );
};

export default MeetingClassification;
