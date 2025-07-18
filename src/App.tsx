import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { blink } from './blink/client'
import { Toaster } from './components/ui/toaster'

// Pages
import HomePage from './pages/HomePage'
import BrowseAdvisorsPage from './pages/BrowseAdvisorsPage'
import AdvisorProfilePage from './pages/AdvisorProfilePage'
import AdvisorRegistrationPage from './pages/AdvisorRegistrationPage'
import CEODashboardPage from './pages/CEODashboardPage'
import ClientDashboardPage from './pages/ClientDashboardPage'

// Components
import Header from './components/layout/Header'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header user={user} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowseAdvisorsPage />} />
            <Route path="/advisor/:id" element={<AdvisorProfilePage />} />
            <Route path="/register-advisor" element={<AdvisorRegistrationPage />} />
            <Route path="/ceo-dashboard" element={<CEODashboardPage />} />
            <Route path="/dashboard" element={<ClientDashboardPage />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  )
}

export default App