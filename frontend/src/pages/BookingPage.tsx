import ReservationForm from '../components/ReservationForm'

function BookingPage() {
  return (
    <main className="booking-page">
      <section className="page-heading">
        <h1>Book a reservation</h1>
        <p>
          Fill in your contact details, choose a service, and select your
          preferred date and time.
        </p>
      </section>
      <ReservationForm />
    </main>
  )
}

export default BookingPage
