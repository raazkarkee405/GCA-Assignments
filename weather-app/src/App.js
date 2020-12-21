import './App.css';
import React, { Component } from 'react'
import {ThemeProvider} from '@material-ui/core/styles';
import { theme } from './theme';
import Routes from './routes';
export default class App extends Component {
  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </div>
    )
  }
}
