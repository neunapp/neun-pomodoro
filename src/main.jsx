import React from 'react'
import ReactDOM from 'react-dom/client'

import { SuccessProvider } from './context/SuccessContext'

import App from './App.jsx'
import 'bulma/css/bulma.min.css'



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SuccessProvider>
    <App />
    </SuccessProvider>
    
  </React.StrictMode>
);
