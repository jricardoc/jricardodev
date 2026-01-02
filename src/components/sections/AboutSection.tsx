import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AboutSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const infoCards = [
  {
    icon: (
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
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    label: "Localização",
    value: "Salvador, BA",
    color: "#6366F1",
  },
  {
    icon: (
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
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    label: "Empresa",
    value: "RICCS",
    color: "#8B5CF6",
    gradient: true,
  },
  {
    icon: (
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
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    label: "Formação",
    value: "Senai Cimatec",
    color: "#06B6D4",
  },
  {
    icon: (
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
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    label: "Status",
    value: "Disponível",
    color: "#10B981",
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Image Side */}
          <div className={styles.imageWrapper}>
            {/* Background Glow */}
            <div className={styles.backgroundGlow} />

            {/* Main Image Container */}
            <div className={styles.imageContainer}>
              <img
                src="/images/ricardo-2.webp"
                alt="Ricardo Carvalho - Desenvolvedor"
                className={styles.image}
              />

              {/* Bottom Gradient Overlay */}
              <div className={styles.overlay} />
            </div>

            {/* Experience Badge */}
            <div className={styles.experienceBadge}>
              <div className={styles.experienceValue}>7+</div>
              <div className={styles.experienceLabel}>Anos</div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            {/* Section Title */}
            <h2 className={styles.title}>Quem é Ricardo Carvalho?</h2>

            {/* Bio Paragraphs */}
            <div className={styles.bioContainer}>
              <p className={styles.bioText}>
                Olá! Sou{" "}
                <span className={styles.highlight}>Ricardo Carvalho</span>,
                desenvolvedor apaixonado por tecnologia e inovação. Com 27 anos
                e formado em Desenvolvimento de Sistemas pelo{" "}
                <span className={styles.highlightSecondary}>Senai Cimatec</span>{" "}
                de Salvador-BA, transformo ideias em realidade digital há{" "}
                <span className={styles.highlight}>7 anos</span>.
              </p>

              <p className={styles.bioText}>
                Minha jornada começou com a curiosidade de entender como as
                coisas funcionam. Hoje, essa curiosidade se transformou em
                expertise em desenvolvimento de{" "}
                <span className={styles.highlightWhite}>sites</span>,{" "}
                <span className={styles.highlightWhite}>aplicativos</span> e{" "}
                <span className={styles.highlightWhite}>sistemas</span> que
                resolvem problemas reais.
              </p>

              <p className={styles.bioText}>
                Acredito que a tecnologia deve ser acessível, intuitiva e
                funcional. Cada projeto que desenvolvo carrega esse DNA.
              </p>
            </div>

            {/* Info Cards Grid */}
            <div className={styles.cardsGrid}>
              {infoCards.map((card, index) => (
                <div
                  key={index}
                  className={styles.infoCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = card.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#27272A";
                  }}
                >
                  <div
                    className={styles.iconContainer}
                    style={{
                      background: `linear-gradient(135deg, ${card.color}, ${card.color}99)`,
                    }}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <div className={styles.cardLabel}>{card.label}</div>
                    <div
                      className={`${styles.cardValue} ${
                        card.gradient ? styles.gradientText : ""
                      }`}
                      style={{
                        color:
                          !card.gradient && card.label === "Status"
                            ? card.color
                            : !card.gradient
                            ? "#FFFFFF"
                            : undefined,
                      }}
                    >
                      {card.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
