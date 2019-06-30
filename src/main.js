import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: "DM Serif Display"
    }
})

ReactDOM.render(<MuiThemeProvider theme={theme}><App/></MuiThemeProvider>, document.getElementById('app'));

