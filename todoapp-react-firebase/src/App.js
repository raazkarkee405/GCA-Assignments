import React, {useEffect, useState} from 'react'
import './App.css'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import {CircularProgress, CssBaseline} from '@material-ui/core'
import firebase from './services/firebase'
import Routes from './routes'

const theme = createMuiTheme()

function App() {

    const [firebaseInitialized, setFirebaseInitialized] = useState(false)

    const isInitialized = () => {
      return new Promise(resolve => {
        firebase.auth().onAuthStateChanged(resolve)
      })
    }

    useEffect(() => {
      isInitialized().then(val => {
        setFirebaseInitialized(val)
      })
    })

    return firebaseInitialized != false ? (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </MuiThemeProvider>
    ) : <div><CircularProgress /></div>
}

export default App;
