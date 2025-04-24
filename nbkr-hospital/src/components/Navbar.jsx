import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <style>{`
          :root {
            --navbar-bg: #005f73;
            --navbar-scrolled-bg: rgba(0, 95, 115, 0.95);
            --navbar-text: #ffffff;
            --navbar-accent: #ee9b00;
            --navbar-hover: #0a9396;
            --navbar-transition: all 0.3s ease-in-out;
          }

          .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-color: var(--navbar-bg);
            color: var(--navbar-text);
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 1000;
            transition: var(--navbar-transition);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }

          .navbar.scrolled {
            background-color: var(--navbar-scrolled-bg);
            padding: 0.8rem 2rem;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          }

          .navbar .logo {
            font-size: 1.6rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
            color: var(--navbar-text);
          }

          .logo-icon {
            font-size: 2rem;
          }

          .navbar-links {
            display: flex;
            gap: 2rem;
            align-items: center;
          }

          .nav-link {
            color: var(--navbar-text);
            text-decoration: none;
            font-size: 1.1rem;
            font-weight: 500;
            position: relative;
            padding: 0.5rem 0;
            transition: var(--navbar-transition);
            opacity: 0.9;
          }

          .nav-link:hover,
          .nav-link.active {
            opacity: 1;
            color: var(--navbar-accent);
          }

          .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: var(--navbar-accent);
            transition: var(--navbar-transition);
          }

          .nav-link:hover::after,
          .nav-link.active::after {
            width: 100%;
          }

          .emergency-button {
            background-color: var(--navbar-accent);
            color: var(--navbar-text);
            padding: 0.6rem 1.2rem;
            border-radius: 50px;
            font-weight: 600;
            transition: var(--navbar-transition);
            margin-left: 1rem;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .emergency-button:hover {
            background-color: #d90429;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .mobile-menu-button {
            display: none;
            background: none;
            border: none;
            color: var(--navbar-text);
            font-size: 1.8rem;
            cursor: pointer;
          }

          @media (max-width: 768px) {
            .navbar-links {
              position: fixed;
              top: 70px;
              left: 0;
              width: 100%;
              background-color: var(--navbar-scrolled-bg);
              flex-direction: column;
              gap: 1rem;
              padding: 2rem;
              backdrop-filter: blur(10px);
              transform: translateY(-150%);
              transition: var(--navbar-transition);
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            }

            .navbar.mobile-open .navbar-links {
              transform: translateY(0);
            }

            .mobile-menu-button {
              display: block;
            }

            .emergency-button {
              margin-left: 0;
              margin-top: 1rem;
              justify-content: center;
            }

            .nav-link {
              width: 100%;
              text-align: center;
              padding: 1rem 0;
            }

            .nav-link::after {
              bottom: 0.8rem;
            }
          }

          /* Animation for nav links */
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .navbar:not(.mobile-open) .nav-link {
            animation: fadeIn 0.5s ease forwards;
          }

          .navbar:not(.mobile-open) .nav-link:nth-child(1) { animation-delay: 0.1s; }
          .navbar:not(.mobile-open) .nav-link:nth-child(2) { animation-delay: 0.2s; }
          .navbar:not(.mobile-open) .nav-link:nth-child(3) { animation-delay: 0.3s; }
          .navbar:not(.mobile-open) .nav-link:nth-child(4) { animation-delay: 0.4s; }
          .navbar:not(.mobile-open) .nav-link:nth-child(5) { animation-delay: 0.5s; }
          .navbar:not(.mobile-open) .emergency-button { animation-delay: 0.6s; }
        `}</style>

        <Link to="/" className="logo">
          <span className="logo-icon">🏥</span>
          <span>NBKR Hospital</span>
        </Link>

        <button 
          className="mobile-menu-button" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        <div className="navbar-links">
          <Link 
            to="/" 
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            About
          </Link>
          <Link 
            to="/services" 
            className={`nav-link ${pathname === '/services' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Services
          </Link>
          <Link 
            to="/appointments" 
            className={`nav-link ${pathname === '/appointments' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Appointments
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Contact
          </Link>
          <Link 
            to="/emergency" 
            className="emergency-button"
            onClick={closeMobileMenu}
          >
            <span>🆘</span> Emergency
          </Link>
        </div>
      </nav>

      {/* Add space to account for fixed navbar */}
      <div style={{ height: '80px' }}></div>
    </>
  );
}

export default Navbar;