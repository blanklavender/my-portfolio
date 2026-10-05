import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Work from './pages/Work'
import Contact from './pages/Contact'
import ProjectPage from './pages/ProjectPage'

// Project pages used to live under /projects; keep old links working.
const OldProjectRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/work/${slug}`} replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<ProjectPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="projects" element={<Navigate to="/work" replace />} />
          <Route path="projects/:slug" element={<OldProjectRedirect />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
