import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !imageRef.current) return;

    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
      "-=0.7"
    );
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Content - 7 columns on desktop */}
          <div ref={contentRef} className={styles.contentColumn}>
            {/* Available Badge */}
            <div className={styles.availableBadge}>
              <span className={styles.badgeDot} />
              <span className={styles.badgeText}>
                Disponível para novos projetos
              </span>
            </div>

            {/* Main Headline */}
            <h1 className={styles.headline}>
              Transformando ideias em{" "}
              <span className={styles.highlightText}>
                experiências digitais
              </span>
            </h1>

            {/* Subheadline */}
            <p className={styles.subheadline}>
              Desenvolvedor Full Stack com{" "}
              <span className={styles.experienceText}>7 anos</span> criando
              soluções que fazem a diferença
            </p>

            {/* CTA Buttons */}
            <div className={styles.ctaContainer}>
              <a href="#portfolio" className={styles.primaryCta}>
                Veja Meus Projetos
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>

              <a
                href="https://wa.me/5579998590846"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryCta}
              >
                Entre em Contato
              </a>
            </div>

            {/* Stats */}
            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>7+</div>
                <div className={styles.statLabel}>Anos de Experiência</div>
              </div>

              <div className={styles.statItem}>
                <div className={styles.statValue}>50+</div>
                <div className={styles.statLabel}>Projetos Entregues</div>
              </div>

              <div className={styles.statItem}>
                <div className={styles.statValue}>100%</div>
                <div className={styles.statLabel}>Satisfação</div>
              </div>
            </div>
          </div>

          {/* Image - 5 columns on desktop */}
          <div ref={imageRef} className={styles.imageColumn}>
            {/* Glow Effect */}
            <div className={styles.glowEffect} />

            {/* Decorative Ring */}
            <div className={styles.decorativeRing} />

            {/* Main Photo Container */}
            <div className={styles.imageContainer}>
              <img
                src="/images/ricardo-1.webp"
                alt="Ricardo Carvalho"
                className={styles.image}
              />
            </div>

            {/* Floating Badge */}
            <div className={styles.floatingBadge}>
              <div className={styles.floatingBadgeContent}>
                <span className={styles.badgeIcon}>🚀</span>
                <div>
                  <div className={styles.badgeLabel}>CEO</div>
                  <div className={styles.badgeTitle}>RICCS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll</span>
        <svg
          width="16"
          height="16"
          fill="none"
          stroke="#6366F1"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
