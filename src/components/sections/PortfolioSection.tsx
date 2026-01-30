import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PortfolioSection.module.css";
import { ProjectModal, type Project } from "../ui/ProjectModal";

// Project Images - Using WebP for better performance
import raNutriImg from "../../assets/projetos/ranutri.webp";
import warleyImg from "../../assets/projetos/warleymonteiro.webp";
import copyTradeImg from "../../assets/projetos/ocaradocopytrade.webp";
import drawdownImg from "../../assets/projetos/DDG.webp";
import draNataliaImg from "../../assets/projetos/dranataliabarreto.webp";
import acaiImg from "../../assets/projetos/acai.webp";
import designacoesImg from "../../assets/projetos/designacoes.webp";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: "all", label: "Todos" },
  { id: "web", label: "Web" },
  { id: "sistemas", label: "Sistemas" },
];

const projects: Project[] = [
  {
    id: 1,
    title: "RaNutri",
    category: "web",
    image: raNutriImg,
    description:
      "Landing Page de alta performance para Nutricionista Esportivo.",
    longDescription:
      "Site desenvolvido em React + Vite com foco total em performance e conversão. A copy e o layout foram estrategicamente desenhados para capturar leads interessados em nutrição esportiva. O projeto conta com animações fluidas, otimização SEO avançada e uma experiência mobile-first impecável.",
    techs: ["React", "Vite", "CSS Modules", "SEO"],
    link: "https://www.ranutri.com.br/",
    videoUrl: "https://i.imgur.com/zR6uADV.mp4",
    githubUrl: "https://github.com/jricardoc/cliente-rafael",
  },
  {
    id: 2,
    title: "Dra. Natália Barreto",
    category: "web",
    image: draNataliaImg,
    description:
      "Site premium para Dentista especializada em Estética e Reabilitação Oral.",
    longDescription:
      "Landing page elegante desenvolvida em React + Vite para uma dentista especializada em Salvador. O design transmite sofisticação e confiança, com paleta de cores refinada e tipografia premium. O projeto inclui animações suaves, otimização SEO para ranqueamento local e uma experiência responsiva impecável.",
    techs: ["React", "Vite", "CSS Modules", "GSAP"],
    link: "https://dranataliabarreto.com.br/",
    githubUrl: "https://github.com/jricardoc/dranataliabarreto",
  },
  {
    id: 3,
    title: "Açaí na Garrafa",
    category: "web",
    image: acaiImg,
    description:
      "Landing Page de vendas para infoproduto sobre negócio de açaí.",
    longDescription:
      "Página de vendas de alta conversão desenvolvida em React + Vite para um infoproduto sobre como iniciar um negócio de açaí na garrafa. O design utiliza cores vibrantes, prova social e gatilhos mentais estratégicos. Inclui carrossel de depoimentos, seção de FAQs e integração com plataforma de pagamento.",
    techs: ["React", "Vite", "Swiper", "CSS Modules"],
    link: "https://acainagarrafa.site/",
    githubUrl: "https://github.com/jricardoc/acainagarrafa",
  },
  {
    id: 4,
    title: "Warley Monteiro",
    category: "web",
    image: warleyImg,
    description: "Site profissional para Psicólogo Clínico com foco em SEO.",
    longDescription:
      "Projeto desenvolvido em WordPress com Elementor, focado na captação de pacientes para terapia online. Foi realizado um trabalho técnico profundo de Performance e SEO para garantir o ranqueamento orgânico. O layout transmite segurança, profissionalismo e acolhimento.",
    techs: ["WordPress", "Elementor", "SEO", "Performance"],
    link: "https://www.warleymonteiro.site/",
    videoUrl: "https://i.imgur.com/gZrgNdw.mp4",
  },
  {
    id: 5,
    title: "O Cara do CopyTrade",
    category: "web",
    image: copyTradeImg,
    description: "Portal completo de investimentos com Blog e Área de Membros.",
    longDescription:
      "Site robusto desenvolvido com Tema Customizado em PHP para WordPress. Inclui funcionalidades avançadas como Custom Post Types para o Blog, páginas de vendas integradas, área de membros restrita e integrações com plataformas de pagamento. Uma solução completa para infoprodutores.",
    techs: ["WordPress", "PHP", "MySQL", "Custom Theme"],
    link: "https://www.ocaradocopytrade.com/",
    videoUrl: "https://i.imgur.com/s29NU2h.mp4",
  },
  {
    id: 6,
    title: "Drawdown Guard",
    category: "sistemas",
    image: drawdownImg,
    description: "SaaS de análise de dados e gestão de risco para Traders.",
    longDescription:
      "Sistema complexo de análise de dados financeiros. O backend foi construído em Node.js com banco de dados PostgreSQL em container Docker. O frontend em React consome APIs em tempo real para exibir métricas críticas de risco e performance para traders profissionais.",
    techs: ["Node.js", "React", "PostgreSQL", "Docker"],
    link: "https://drawdownguard.com.br/",
    videoUrl: "https://i.imgur.com/V3qiDwT.mp4",
  },
  {
    id: 7,
    title: "Quadro de Designações",
    category: "sistemas",
    image: designacoesImg,
    description:
      "Sistema de gerenciamento de escalas e designações com arquitetura monorepo.",
    longDescription:
      "Sistema completo para gerenciar designações de tarefas e escalas. Arquitetura monorepo com frontend em React + Vite e backend em Node.js com Express e Prisma ORM. Banco de dados PostgreSQL gerenciado via Docker. Inclui interface intuitiva para CRUD de designações, controle de usuários e geração de relatórios.",
    techs: ["React", "Node.js", "PostgreSQL", "Docker", "Prisma"],
    githubUrl: "https://github.com/jricardoc/designacoes-jw",
  },
];

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    if (!gridRef.current) return;

    // Animation for filtering
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.projectCard}`,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          overwrite: "auto",
        },
      );
    }, gridRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="portfolio" ref={sectionRef} className={styles.portfolio}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Meus Projetos</h2>
          <p className={styles.description}>
            Uma seleção de trabalhos reais que geram resultados para meus
            clientes.
          </p>

          {/* Filter Pills */}
          <div className={styles.filterContainer}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`${styles.filterButton} ${
                  activeCategory === cat.id ? styles.filterButtonActive : ""
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className={styles.projectsGrid}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={styles.projectCard}
              onClick={() => handleProjectClick(project)}
            >
              {/* Image Container */}
              <div className={styles.imageContainer}>
                <div className={styles.imageOverlay} />
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.projectImage}
                  loading="lazy"
                  decoding="async"
                />

                {/* Category Badge */}
                <div className={styles.categoryBadge}>{project.category}</div>

                {/* Saiba Mais Badge */}
                <div className={styles.saibaMaisBadge}>
                  <span>Saiba mais</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{project.title}</h3>

                <p className={styles.cardDescription}>{project.description}</p>

                {/* Techs */}
                <div className={styles.techsContainer}>
                  {project.techs.map((tech) => (
                    <span key={tech} className={styles.techBadge}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className={styles.viewMoreContainer}>
          <a href="#contact" className={styles.viewMoreButton}>
            Iniciar um Novo Projeto
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

      {/* Presidential Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
