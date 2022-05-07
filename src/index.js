import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { AppProvider } from './context'
import { initialState } from './reducer'
import reducer from './reducer'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode initialState={initialState} reducer={reducer}>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
)
