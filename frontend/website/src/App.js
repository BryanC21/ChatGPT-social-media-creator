import './App.css';
import RouterContent from './Router';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Helmet } from "react-helmet";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { AuthProvider } from "./hooks/useAuth";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from '@mui/material';



function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Helmet>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Helmet>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthProvider>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
              }}
            >
              <RouterContent />
            </Box>
          </AuthProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
