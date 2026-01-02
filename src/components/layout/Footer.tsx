import styles from "./Footer.module.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className={styles.footer}>
      {/* Background Ambience */}
      {/* <div className={styles.backgroundAmbience} /> */}

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandColumn}>
            <div className={styles.brandLogo}>
              <div className={styles.brandIcon}>RC</div>
              <span className={styles.brandText}>Ricardo Carvalho</span>
            </div>
            <p className={styles.brandDescription}>
              Desenvolvendo o futuro digital com precisão, criatividade e
              tecnologia de ponta. Vamos construir algo inesquecível.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className={styles.columnHeader}>Navegação</h4>
            <ul className={styles.linkList}>
              {["Início", "Sobre", "Serviços", "Portfólio"].map((item) => (
                <li key={item} className={styles.linkItem}>
                  <a
                    href={`#${item
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace("inicio", "hero")
                      .replace("servicos", "skills")}`}
                    className={styles.link}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className={styles.columnHeader}>Social</h4>
            <ul className={styles.linkList}>
              {[
                {
                  name: "LinkedIn",
                  url: "https://www.linkedin.com/in/jricardoc/",
                },
                { name: "GitHub", url: "https://github.com/jricardoc" },
                {
                  name: "Instagram",
                  url: "https://www.instagram.com/jricardodev/",
                },
              ].map((item) => (
                <li key={item.name} className={styles.linkItem}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    {item.name}
                    <svg
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 17L17 7M17 7H7M17 7V17"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className={styles.columnHeader}>Contato</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <a
                  href="mailto:ricardo@jricardodev.com.br"
                  className={styles.contactEmail}
                >
                  ricardo@jricardodev.com.br
                </a>
              </li>
              <li className={styles.linkItem}>
                <a
                  href="https://wa.me/5579998590846"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  (79) 99859-0846
                </a>
              </li>
              <li style={{ fontSize: "14px", color: "#A1A1AA" }}>
                Salvador, Bahia - Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} Ricardo Carvalho. Todos os direitos reservados.
          </p>

          <button
            onClick={scrollToTop}
            className={styles.scrollTopButton}
            aria-label="Voltar ao topo"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7 7 7M12 19V3"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
