import './App.css'
import Education from './components/Education'
import Experience from './components/Experience'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <div className="pt-16">
          <Education />
          <Experience />
          <Projects />
        </div>
      </main>
      <footer className="site-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="italic">Double Fold Blessing</p>
        </div>
      </footer>
    </div>
  )
}

export default App
