function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer" id="contact">
      <div>
        <h2>Umývanie áut Nitra</h2>
        <p>Phone: +421 911 841 495</p>
        <p>Email: detailing@nitra.com</p>
      </div>

      <div>
        <h2>Sledujte nás</h2>
        <p>
          Instagram:{' '}
          <a
            href="https://www.instagram.com/umyvanie_aut_nitra/"
            target="_blank"
            rel="noreferrer"
          >
            @umyvanie_aut_nitra
          </a>
        </p>
        <p>
          Facebook:{' '}
          <a
            href="https://www.facebook.com/profile.php?id=100083469782516"
            target="_blank"
            rel="noreferrer"
          >
            Umývanie áut Nitra
          </a>
        </p>
      </div>

      <p className="copyright">
        Copyright &copy; {currentYear} Oliver Hinca
      </p>
    </footer>
  )
}

export default Footer
