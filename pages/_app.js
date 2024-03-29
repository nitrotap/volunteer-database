import React from 'react'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'


import createEmotionCache from '../lib/utils/styleCache'
import lightTheme from '../styles/theme/light'
import '../styles/globals.css'


const clientStyleCache = createEmotionCache()

function App(props) {
  const {
    Component,
    pageProps: { session, ...pageProps },
    emotionCache = clientStyleCache
  } = props


  return (
    <CacheProvider value={clientStyleCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default App
