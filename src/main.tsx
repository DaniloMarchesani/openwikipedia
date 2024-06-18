import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeProvider.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
      <AuthProvider>
          <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <App />
          </ThemeProvider>
      </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
