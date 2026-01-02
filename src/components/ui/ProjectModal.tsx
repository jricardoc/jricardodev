import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ProjectModal.module.css";

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  longDescription: string;
  techs: string[];
  link: string;
  videoUrl?: string; // Optional video URL
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted || !project) return null;

  return createPortal(
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
      onClick={onClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Hero Image */}
        <div className={styles.heroImageContainer}>
          <img
            src={project.image}
            alt={project.title}
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.categoryBadge}>{project.category}</span>
            <h2 className={styles.title}>{project.title}</h2>
          </div>

          <div className={styles.body}>
            <div className={styles.sectionTitle}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Sobre o Projeto
            </div>
            <p className={styles.description}>{project.longDescription}</p>

            {/* Video Player */}
            {project.videoUrl && (
              <div className={styles.videoContainer}>
                <video
                  src={project.videoUrl}
                  className={styles.videoFrame}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            )}

            <div className={styles.sectionTitle}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              Tecnologias
            </div>
            <div className={styles.techGrid}>
              {project.techs.map((tech) => (
                <span key={tech} className={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>

            <div className={styles.footer}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.actionButton} ${styles.primaryButton}`}
              >
                Acessar Projeto
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
