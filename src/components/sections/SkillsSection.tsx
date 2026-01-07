import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SkillsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Desenvolvimento Web",
    description:
      "Sites modernos, responsivos e otimizados para performance. Landing pages de alta conversão, e-commerces robustos e aplicações web complexas.",
    techs: ["React", "Next.js", "TypeScript", "Node.js"],
    gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Aplicativos Mobile",
    description:
      "Apps nativos e híbridos para iOS e Android que proporcionam experiências incríveis e engajamento real com os usuários.",
    techs: ["React Native", "Flutter", "iOS", "Android"],
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
        />
      </svg>
    ),
    title: "Sistemas Personalizados",
    description:
      "Soluções sob medida para automatizar processos, integrar sistemas e resolver desafios específicos do seu negócio.",
    techs: ["APIs REST", "Microservices", "Cloud", "PostgreSQL"],
    gradient: "linear-gradient(135deg, #10B981 0%, #06B6D4 100%)",
  },
];

// Technologies using skillicons.dev
// Using the icon IDs from https://github.com/tandpfun/skill-icons
const technologies = [
  { name: "JavaScript", iconId: "js" },
  { name: "TypeScript", iconId: "ts" },
  { name: "React", iconId: "react" },
  { name: "Next.js", iconId: "nextjs" },
  { name: "Node.js", iconId: "nodejs" },
  { name: "Python", iconId: "python" },
  { name: "React Native", iconId: "react" },
  { name: "Flutter", iconId: "flutter" },
  { name: "MongoDB", iconId: "mongodb" },
  { name: "PostgreSQL", iconId: "postgresql" },
  { name: "AWS", iconId: "aws" },
  { name: "Docker", iconId: "docker" },
  { name: "Git", iconId: "git" },
  { name: "Figma", iconId: "figma" },
  { name: "Tailwind", iconId: "tailwind" },
  { name: "GraphQL", iconId: "graphql" },
];

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll(`.${styles.serviceCard}`);

    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
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
    <section id="skills" ref={sectionRef} className={styles.skills}>
      {/* Background Decoration */}
      <div className={styles.backgroundDecoration} />

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>O que eu faço</h2>
          <p className={styles.description}>
            Transformo ideias em produtos digitais de alta qualidade, desde o
            conceito até a entrega
          </p>
        </div>

        {/* Services Grid - Now 3 columns */}
        <div ref={cardsRef} className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div
              key={index}
              className={styles.serviceCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#6366F1";
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 25px 50px rgba(99, 102, 241, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1F1F1F";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Icon */}
              <div
                className={styles.iconContainer}
                style={{
                  background: service.gradient,
                }}
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3 className={styles.cardTitle}>{service.title}</h3>

              {/* Description */}
              <p className={styles.cardDescription}>{service.description}</p>

              {/* Tech Tags */}
              <div className={styles.techTags}>
                {service.techs.map((tech) => (
                  <span key={tech} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technologies Section */}
        <div className={styles.techSection}>
          {/* Title */}
          <h3 className={styles.techTitle}>Tecnologias que domino</h3>

          {/* Marquee Container */}
          <div className={styles.marqueeContainer}>
            {/* Left Fade */}
            {/* <div className={styles.fadeLeft} /> */}

            {/* Right Fade */}
            {/* <div className={styles.fadeRight} /> */}

            {/* Marquee Track */}
            <div className={styles.marqueeTrack}>
              {[...technologies, ...technologies, ...technologies].map(
                (tech, index) => (
                  <div
                    key={index}
                    className={styles.techItem}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#6366F1";
                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(99, 102, 241, 0.3)";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#1F1F1F";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div className={styles.techIconWrapper}>
                      <img
                        src={`https://skillicons.dev/icons?i=${tech.iconId}&theme=dark`}
                        alt={tech.name}
                        width="48"
                        height="48"
                        className={styles.techIcon}
                        loading="lazy"
                      />
                    </div>

                    <span className={styles.techName}>{tech.name}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
