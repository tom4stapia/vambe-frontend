"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/contexts/AuthContext";
import './global.css'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.prod.website-files.com/680c0d216c6540b659f79bad/68534efa9a146458d73b4c5c_Favicon_2.png" rel="shortcut icon" type="image/x-icon"/>
        <link href="https://cdn.prod.website-files.com/680c0d216c6540b659f79bad/68534efa9a146458d73b4c5c_Favicon_2.png" rel="icon" type="image/png"/>
        <link href="https://cdn.prod.website-files.com/680c0d216c6540b659f79bad/68534e52bbdcd6a3510b104b_Vambe_Glass_Icon_Black_12.png" rel="apple-touch-icon"/>
        <link href="https://cdn.prod.website-files.com/680c0d216c6540b659f79bad/68534e52bbdcd6a3510b104b_Vambe_Glass_Icon_Black_12.png" rel="apple-touch-icon" sizes="180x180"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Vambe Dashboard</title>
      </head>
      <body>
        <ThemeProvider theme={baselightTheme}>
          <AuthProvider>
            <CssBaseline />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
