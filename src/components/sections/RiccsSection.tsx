import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./RiccsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Excelência",
    description:
      "Código limpo, arquitetura robusta e as melhores práticas do mercado em cada entrega.",
    color: "#6366F1",
  },
  {
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Inovação",
    description:
      "Soluções criativas e tecnologias de ponta para resolver problemas complexos.",
    color: "#8B5CF6",
  },
  {
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    title: "Parceria",
    description:
      "Relacionamento próximo e transparente, onde seu sucesso é o nosso compromisso.",
    color: "#06B6D4",
  },
];

export function RiccsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section id="riccs" ref={sectionRef} className={styles.riccs}>
      <div className={styles.container} ref={contentRef}>
        {/* Header Grid */}
        <div className={styles.headerGrid}>
          {/* Logo & Headline */}
          <div>
            <div className={styles.logoBadge}>
              <span className={styles.logoIcon}>R</span>
              <span className={styles.logoText}>RICCS</span>
            </div>

            <h2 className={styles.headline}>
              Além do código,
              <br />
              construímos{" "}
              <span className={styles.highlight}>legados digitais</span>.
            </h2>
          </div>

          {/* Description */}
          <div className={styles.descriptionBox}>
            <p className={styles.descriptionText}>
              A <strong className={styles.strongText}>RICCS</strong> nasceu da
              minha paixão por criar soluções digitais que não apenas funcionam,
              mas impressionam.
            </p>
            <p>
              Somos um estúdio de desenvolvimento focado em transformar visões
              ambiciosas em produtos de alta performance. Aqui, cada pixel
              importa e cada linha de código tem um propósito.
            </p>
          </div>
        </div>

        {/* Values Cards */}
        <div className={styles.valuesGrid}>
          {values.map((item, i) => (
            <div
              key={i}
              className={styles.valueCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = item.color;
                e.currentTarget.style.boxShadow = `0 20px 40px -10px ${item.color}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Decorative Gradient Background */}
              <div
                className={styles.decorativeGradient}
                style={{
                  background: `radial-gradient(circle at top right, ${item.color}20, transparent 70%)`,
                }}
              />

              <div
                className={styles.iconContainer}
                style={{
                  background: `linear-gradient(135deg, ${item.color}20, transparent)`,
                  border: `1px solid ${item.color}40`,
                  color: item.color,
                }}
              >
                {item.icon}
              </div>

              <h3 className={styles.cardTitle}>{item.title}</h3>

              <p className={styles.cardDescription}>{item.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className={styles.ctaContainer}>
          <a
            href="https://wa.me/5579998590846"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            Conheça a RICCS
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
