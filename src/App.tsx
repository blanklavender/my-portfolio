import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import About from './pages/About'
import ProjectsPage from './pages/ProjectsPage'
import ProjectPage from './pages/ProjectPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<About />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
