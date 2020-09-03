import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { Theme } from './styles/muiTheme';
import App from './components/app.jsx';


render(
    <MuiThemeProvider theme={Theme}>
      <Router>
        <CssBaseline />
        <App />
      </Router>
    </MuiThemeProvider>, document.getElementById('root')
);
