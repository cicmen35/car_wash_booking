function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div>
        <h2>Umyvanie aut Nitra</h2>
        <p>Phone: +420 123 456 789</p>
        <p>Email: info@autoglow.example</p>
      </div>

      <div>
        <h2>Follow us</h2>
        <p>Instagram · Facebook · TikTok</p>
      </div>

      <p className="copyright">
        &copy; {currentYear} All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
