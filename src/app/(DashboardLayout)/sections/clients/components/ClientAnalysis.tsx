'use client'
import { Typography, Box } from '@mui/material';
import { ClientAnalysisData } from '../services/clientApi';
import SectorsOverview from './sections/SectorsOverview';
import LeadSources from './sections/LeadSources';
import AllSectors from './sections/AllSectors';
import ProductsSection from './sections/ProductsSection';
import UseCasesSection from './sections/UseCasesSection';
import PainPointsSection from './sections/PainPointsSection';

interface ClientAnalysisProps {
  data: ClientAnalysisData;
}

const ClientAnalysis = ({ data }: ClientAnalysisProps) => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Client Analysis</Typography>
      </Box>
      
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { 
          xs: '1fr', 
          lg: 'repeat(2, 1fr)' 
        },
        gap: 3
      }}>
        <SectorsOverview sectors={data.topSectors} />
        <LeadSources leadSources={data.topLeadSources.slice(0, 5)} />
      </Box>

      <ProductsSection technologies={data.topTechnologies} />

      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { 
          xs: '1fr', 
          lg: 'repeat(2, 1fr)' 
        },
        gap: 3,
        mt: 3
      }}>
        <UseCasesSection useCases={data.topUseCases} />
        <PainPointsSection painPoints={data.topPrimaryPainPoints} />
      </Box>

      <AllSectors sectors={data.topSectors} />
    </Box>
  );
};

export default ClientAnalysis;
