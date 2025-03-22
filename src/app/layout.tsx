"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./global.css";
import { ReactQueryProvider } from "../providers/ReactQueryProvider";
import WrapMessage from "@/component/WrapMessage";
import { useEffect } from "react";
import { UserProvider } from "@/context/useUserContext";
function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (args[0] && typeof args[0] === 'string' && args[0].includes("Expected server HTML to contain a matching")) {
        return;
      }
      originalConsoleError(...args);
    };
  }, []);
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body>
          <ThemeProvider theme={baselightTheme}>
            <UserProvider>
              <CssBaseline />
              <WrapMessage>{children}</WrapMessage>
            </UserProvider>
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
export default RootLayout;
