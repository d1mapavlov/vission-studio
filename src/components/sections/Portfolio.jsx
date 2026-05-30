import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ArrowRight from "../ui/ArrowRight";
import Reveal from "../ui/Reveal";

function ProjectCardBody({ project, labels, priority = false }) {
  return (
    <>
      <div className="project-media" aria-hidden="true">
        <img
          src={project.image}
          alt={project.title}
          width={project.imageWidth}
          height={project.imageHeight}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      </div>
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="project-open"
        aria-label={`${labels.openProjectLabel} ${project.title}`}
      >
        <ArrowRight up />
      </a>
      <div className="project-content">
        <span className="project-kicker">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.text}</p>
        {(project.tags?.length > 0 || project.metrics?.length > 0) && (
          <div className="project-extra">
            {project.tags?.length > 0 && (
              <div className="project-tags" aria-label={labels.tagsLabel}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
            {project.metrics?.length > 0 && (
              <div className="project-metrics" aria-label={labels.metricsLabel}>
                {project.metrics.map(([value, label]) => (
                  <span key={`${value}-${label}`}>
                    <strong>{value}</strong>
                    <small>{label}</small>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
        <a href={project.href} target="_blank" rel="noreferrer" className="project-link">
          {labels.projectLink} <ArrowRight up />
        </a>
      </div>
    </>
  );
}

function ProjectCard({ project, labels, index, animated = true, className = "" }) {
  const isModalCard = className.includes("--modal");
  const priority = !isModalCard && index < 4;

  if (!animated) {
    return (
      <article className={`project-card ${className}`} style={{ "--card-delay": `${index * 55}ms` }}>
        <ProjectCardBody project={project} labels={labels} priority={priority} />
      </article>
    );
  }

  return (
    <Reveal className={`project-card ${className}`} as="article" delay={index * 70}>
      <ProjectCardBody project={project} labels={labels} priority={priority} />
    </Reveal>
  );
}

export default function Portfolio({ data }) {
  const { portfolio: labels, portfolioModalProjects, projects } = data;
  const [modalOpen, setModalOpen] = useState(false);
  const landingProjects = projects.slice(0, 4);

  useEffect(() => {
    if (!modalOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setModalOpen(false);
      }
    };

    document.body.classList.add("modal-lock");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-lock");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpen]);

  const modal = modalOpen
    ? createPortal(
        <div className="portfolio-modal" role="dialog" aria-modal="true" aria-labelledby="portfolio-modal-title">
          <button className="portfolio-modal-backdrop" type="button" aria-label={labels.closeLabel} onClick={() => setModalOpen(false)} />
          <div className="portfolio-modal-panel">
            <div className="portfolio-modal-head">
              <div>
                <p className="mono eyebrow">{labels.archiveEyebrow}</p>
                <h2 id="portfolio-modal-title">{labels.modalTitle}</h2>
              </div>
              <button className="portfolio-modal-close" type="button" onClick={() => setModalOpen(false)} aria-label={labels.closeLabel}>
                <span />
                <span />
              </button>
            </div>
            <div className="portfolio-modal-grid">
              {portfolioModalProjects.map((project, index) => (
                <ProjectCard
                  project={project}
                  labels={labels}
                  index={index}
                  animated={false}
                  className="project-card--modal"
                  key={`${project.title}-${project.modalId || index}`}
                />
              ))}
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <section id="portfolio" className="portfolio">
        <div className="container section-block">
          <Reveal>
            <h2 className="mega-title">{labels.title}</h2>
          </Reveal>
          <div className="portfolio-grid">
            {landingProjects.map((project, index) => (
              <ProjectCard project={project} labels={labels} index={index} key={`${project.title}-${index}`} />
            ))}
          </div>
          <Reveal className="portfolio-actions">
            <button className="portfolio-more-button" type="button" onClick={() => setModalOpen(true)}>
              {labels.moreButton}
              <span>{portfolioModalProjects.length}</span>
            </button>
          </Reveal>
        </div>
      </section>
      {modal}
    </>
  );
}
