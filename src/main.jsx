import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import ProjectsPage from './pages/Projects/index.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* This is your Home Page */}
        <Route path="/" element={<App />} />

        {/* This is your Projects Page */}
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)