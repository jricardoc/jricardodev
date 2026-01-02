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

// Icon mapping using paths
const TechIcons = {
  JavaScript: (color: string) => (
    <path
      fill={color}
      d="M3 3h18v18H3V3zm16.5 15V9h-1.5v6h-1.5v-1.5h1.5v-3h-3v4.5h3zm-6 0v-1.5h1.5v-3h-1.5v4.5Zm-1.5-6h-3v1.5h3v4.5h-4.5v-1.5h3V9Z"
    />
  ), // Simplified JS
  TypeScript: (color: string) => (
    <path
      fill={color}
      d="M3 3h18v18H3V3zm15 7.5h-1.5v4.5h-1.5v-4.5H13.5V9h4.5v1.5zm-6 3h-1.5v1.5h1.5v-1.5zm0-3h-3v1.5h1.5v1.5h-1.5v1.5h3V9Z"
    />
  ), // Simplified TS
  React: (color: string) => (
    <g stroke={color} fill="none" strokeWidth="1.5">
      <ellipse cx="12" cy="12" rx="3" ry="1.5" />
      <ellipse cx="12" cy="12" rx="3" ry="1.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="3" ry="1.5" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="0.5" fill={color} />
    </g>
  ),
  Next: (color: string) => (
    <path
      fill={color}
      d="M12 2L2 19h20L12 2zm-1 14l-4-7h2l2 3.5 1.5-2.5 2.5 4h-4z"
    />
  ), // Simplified Triangle N
  Node: (color: string) => (
    <path
      fill={color}
      d="M12 2l8.5 5v10L12 22 3.5 17V7L12 2zm0 2.5L5.5 8v8l6.5 3.5 6.5-3.5V8L12 4.5z"
    />
  ),
  Python: (color: string) => (
    <path
      fill={color}
      d="M12 2c2 0 3 1 3 1v2h-3v1h5v5h-2v-3h-1v3h-2V6H9V4s0-2 3-2zm0 20c-2 0-3-1-3-1v-2h3v-1H7v-5h2v3h1v-3h2v5h3v2s0 2-3 2z"
    />
  ),
  Flutter: (color: string) => (
    <path
      fill={color}
      d="M13.5 2L6 9.5 10.5 14 18 6.5 13.5 2zM6 14.5L10.5 19 18 11.5 13.5 7 6 14.5z"
    />
  ),
  Database: (color: string) => (
    <path
      fill={color}
      d="M12 3c4.5 0 8 1.5 8 3.5s-3.5 3.5-8 3.5-8-1.5-8-3.5S7.5 3 12 3zm0 13c-4.5 0-8-1.5-8-3.5V15c0 2 3.5 3.5 8 3.5s8-1.5 8-3.5v-2.5c0 2-3.5 3.5-8 3.5zm0 5c-4.5 0-8-1.5-8-3.5V20c0 2 3.5 3.5 8 3.5s8-1.5 8-3.5v-2.5c0 2-3.5 3.5-8 3.5z"
    />
  ),
  Cloud: (color: string) => (
    <path
      fill={color}
      d="M17.5 19c2.5 0 4.5-2 4.5-4.5S20 10 17.5 10c-.5 0-1 .1-1.4.3-.6-3.7-3.8-6.3-7.6-6.3-4.1 0-7.5 3.1-7.9 7.1C3.8 11.4 2 13.5 2 16c0 3 2.5 5.5 5.5 5.5h10z"
    />
  ),
  Docker: (color: string) => (
    <path
      fill={color}
      d="M2.5 10h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm-6 3h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm3-3h2v2h-2v-2zm-1.8 5c0 2.2-1.8 4-4 4H1v-2h1.6c1.1 0 2-.9 2-2 0-.3-.1-.5-.2-.7l1.5-.5c.6.9.9 2.1.9 3.2z"
    />
  ),
  Git: (color: string) => (
    <path
      fill={color}
      d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 12h-2v-2h-2v2H9v-4h2V8H9v2H7v2h2v4h4v-2h2v2h2v-2z"
    />
  ),
  Figma: (color: string) => (
    <path
      fill={color}
      d="M8 8V4h4c2.2 0 4 1.8 4 4s-1.8 4-4 4H8zm0 8v-4h4c2.2 0 4 1.8 4 4s-1.8 4-4 4H8zm-4 0c0 2.2 1.8 4 4 4v-4H4zm0-8c0 2.2 1.8 4 4 4H4v-4zm0-4c0 2.2 1.8 4 4 4H4V4z"
    />
  ),
  Tailwind: (color: string) => (
    <path
      fill={color}
      d="M6 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4c0 1.5-.8 2.8-2 3.5 1.2.7 2 2 2 3.5 0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c-1.5 0-2.8-.8-3.5-2 .7-1.2 2-2 3.5-2z"
    />
  ),
  Code: (color: string) => (
    <path
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 18l6-6-6-6M8 6l-6 6 6 6"
    />
  ),
};

const technologies = [
  { name: "JavaScript", color: "#F7DF1E", icon: TechIcons.JavaScript },
  { name: "TypeScript", color: "#3178C6", icon: TechIcons.TypeScript },
  { name: "React", color: "#61DAFB", icon: TechIcons.React },
  { name: "Next.js", color: "#FFFFFF", icon: TechIcons.Next },
  { name: "Node.js", color: "#339933", icon: TechIcons.Node },
  { name: "Python", color: "#3776AB", icon: TechIcons.Python },
  { name: "React Native", color: "#61DAFB", icon: TechIcons.React },
  { name: "Flutter", color: "#02569B", icon: TechIcons.Flutter },
  { name: "MongoDB", color: "#47A248", icon: TechIcons.Database },
  { name: "PostgreSQL", color: "#4169E1", icon: TechIcons.Database },
  { name: "AWS", color: "#FF9900", icon: TechIcons.Cloud },
  { name: "Docker", color: "#2496ED", icon: TechIcons.Docker },
  { name: "Git", color: "#F05032", icon: TechIcons.Git },
  { name: "Figma", color: "#F24E1E", icon: TechIcons.Figma },
  { name: "Tailwind", color: "#06B6D4", icon: TechIcons.Tailwind },
  { name: "GraphQL", color: "#E10098", icon: TechIcons.Code },
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
                      e.currentTarget.style.borderColor = tech.color;
                      e.currentTarget.style.boxShadow = `0 0 20px ${tech.color}33`;
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#1F1F1F";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div className={styles.techIconWrapper}>
                      <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="none"
                        className={styles.techIcon}
                      >
                        {tech.icon(tech.color)}
                      </svg>
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
