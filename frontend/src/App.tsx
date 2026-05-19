import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import AdminContactMessagesPage from './pages/AdminContactMessagesPage'
import AdminReservationDetailPage from './pages/AdminReservationDetailPage'
import AdminReservationsPage from './pages/AdminReservationsPage'
import BookingPage from './pages/BookingPage'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route
            path="/admin/reservations"
            element={<AdminReservationsPage />}
          />
          <Route
            path="/admin/reservations/:id"
            element={<AdminReservationDetailPage />}
          />
          <Route path="/admin/form" element={<AdminContactMessagesPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
