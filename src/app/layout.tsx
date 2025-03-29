"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./global.css";
import { ReactQueryProvider } from "../providers/ReactQueryProvider";
import WrapMessage from "@/component/WrapMessage";
import { useEffect, useCallback } from "react";
import { UserProvider } from "@/context/useUserContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleConsoleError = useCallback((...args: any[]) => {
    if (args[0] && typeof args[0] === 'string' && args[0].includes("Expected server HTML to contain a matching")) {
      return;
    }
    console.error(...args);
  }, []);

  useEffect(() => {
    const originalConsoleError = console.error;
    return () => {
      console.error = originalConsoleError;
    };
  }, [handleConsoleError]);

  return (
    <ReactQueryProvider>
      <html lang="en">
        <body>
          <ThemeProvider theme={baselightTheme}>
            <UserProvider>
              <CssBaseline />
              <WrapMessage>
                {children}
                <ToastContainer
                  position="bottom-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </WrapMessage>
            </UserProvider>
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}

export default RootLayout;
