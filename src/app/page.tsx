"use client";
import { useAuth } from "@/contexts/AuthContext";
import { Box, CircularProgress, Typography, styled, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import Header from "@/app/dashboard/layout/header/Header";
import Sidebar from "@/app/dashboard/layout/sidebar/Sidebar";

import Dashboard from "./dashboard/page";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/authentication/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        gap={2}
      >
        <CircularProgress size={40} />
        <Typography variant="body2" color="text.secondary">
          Cargando...
        </Typography>
      </Box>
    );
  }

  if (isAuthenticated) {
    return (
      <AuthGuard>
        <MainWrapper className="mainwrapper">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />
          <PageWrapper className="page-wrapper">
            <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
            <Container
              sx={{
                paddingTop: "20px",
                maxWidth: "1200px",
              }}
            >
              <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
                <Dashboard />
              </Box>
            </Container>
          </PageWrapper>
        </MainWrapper>
      </AuthGuard>
    );
  }

  return null;
}
