import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// 🔥 IMPORTANT: Leaflet CSS imports for real map
import "leaflet/dist/leaflet.css";
import "./leaflet.css";

// Tailwind styles
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
