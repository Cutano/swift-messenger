import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import routes from './routes';
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

const App = () => {
    const routing = useRoutes(routes);

    return (
        <ThemeProvider theme={theme}>
            <React.StrictMode>
                <CssBaseline />
                {routing}
            </React.StrictMode>
        </ThemeProvider>
    );
};

export default App;
