import { useState, useEffect } from "react";
import styles from "./Header.module.css";

const navItems = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#about" },
  { label: "Serviços", href: "#skills" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "RICCS", href: "#riccs" },
  { label: "Contato", href: "#contact" },
  // { label: "Admin", href: "/admin" }, // Removido ou comentado se não for usado no menu principal
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`${styles.header} ${
          isScrolled ? styles.headerScrolled : styles.headerTransparent
        }`}
      >
        <div className={styles.container}>
          {/* Logo */}
          <a
            href="#hero"
            className={styles.logo}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className={styles.logoIcon}>
              <span className={styles.logoIconText}>RC</span>
            </div>
            <span className={styles.logoText}>Ricardo Carvalho</span>
          </a>

          {/* Desktop Navigation */}
          <nav
            className={`${styles.desktopNav} ${
              isScrolled ? styles.navScrolled : styles.navTransparent
            }`}
          >
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className={styles.navItem}>
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className={styles.ctaContainer}>
            <a
              href="https://wa.me/5579998590846"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              Vamos Conversar
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={styles.mobileMenuButton}
            aria-label="Toggle menu"
          >
            <span
              className={styles.menuIconBar}
              style={{
                transform: isMenuOpen
                  ? "rotate(45deg) translate(5px, 5px)"
                  : "none",
              }}
            />
            <span
              className={styles.menuIconBar}
              style={{
                opacity: isMenuOpen ? 0 : 1,
              }}
            />
            <span
              className={styles.menuIconBar}
              style={{
                transform: isMenuOpen
                  ? "rotate(-45deg) translate(5px, -5px)"
                  : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`${styles.mobileMenuOverlay} ${
          isMenuOpen ? styles.mobileMenuOpen : styles.mobileMenuClosed
        }`}
      >
        {/* Decorative Background */}
        <div className={styles.mobileMenuBackground} />

        <nav className={styles.mobileNav}>
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`${styles.mobileNavItem} ${
                isMenuOpen ? styles.mobileNavItemAnimate : ""
              }`}
              style={{
                animationDelay: `${0.1 + index * 0.1}s`,
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="https://wa.me/5579998590846"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsMenuOpen(false)}
          className={`${styles.mobileCta} ${
            isMenuOpen ? styles.mobileCtaAnimate : ""
          }`}
        >
          Vamos Conversar
        </a>
      </div>
    </>
  );
}
