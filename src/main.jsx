import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "./App.css";
import { useTheme } from './ThemeContext';
import { BrowserRouter } from 'react-router-dom'
import { SavedMeetingsContext } from './SavedMeetingContext.jsx'
import { ThemeProvider } from './ThemeContext';
ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
  <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
  
  

)
