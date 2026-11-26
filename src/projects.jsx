import { useEffect, useMemo, useRef, useState } from "react";
import "./projects.css";

const projects = [
  {
    id: 1,
    number: "01",
    title: "Soil Advisory System",
    category: "machine-learning",
    description:
      "A soil health analysis and advisory system designed to help users understand soil conditions and make informed crop recommendations.",
    technologies: ["Python", "Machine Learning", "React", "FastAPI"],
    features: [
      "Soil parameter analysis",
      "Crop recommendation",
      "Nutrient deficiency identification",
      "Farmer-focused advisory",
    ],
    images: [
      {
        src: "/soil1.jpg",
        alt: "Soil Advisory System interface",
        caption: "Project interface",
      },
      {
        src: "/soil2.jpg",
        alt: "Soil Advisory System preview",
        caption: "System preview",
      },
    ],
    video: "/demo.mp4",
    github: "https://github.com/patilaaditya0005/soil-advisory-system",
    featured: true,
  },
  {
    id: 2,
    number: "02",
    title: "Student Portfolio Website",
    category: "web-development",
    description:
      "A personal portfolio website created to introduce my background, education, technical skills, and development projects.",
    technologies: ["HTML", "CSS", "JavaScript", "React"],
    features: [
      "Responsive website layout",
      "Multi-page navigation",
      "Project showcase",
      "Personal introduction",
    ],
    images: [],
    video: null,
    github: "https://github.com/patilaaditya0005",
    featured: false,
  },
];

const filters = [
  { label: "All Projects", value: "all" },
  { label: "Machine Learning", value: "machine-learning" },
  { label: "Web Development", value: "web-development" },
];

const getCategoryLabel = (category) => {
  const categoryLabels = {
    "machine-learning": "Machine Learning",
    "web-development": "Web Development",
  };

  return categoryLabels[category] || "Other";
};

export default function Projects() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedProjects, setExpandedProjects] = useState([1]);
  const [previewImage, setPreviewImage] = useState(null);

  const previewTriggerRef = useRef(null);
  const lightboxCloseRef = useRef(null);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesFilter =
        activeFilter === "all" || project.category === activeFilter;

      const searchableContent = [
        project.title,
        project.category,
        getCategoryLabel(project.category),
        project.description,
        ...project.technologies,
        ...project.features,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableContent.includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  const allExpanded =
    filteredProjects.length > 0 &&
    filteredProjects.every((project) => expandedProjects.includes(project.id));

  const toggleProject = (id) => {
    setExpandedProjects((current) =>
      current.includes(id)
        ? current.filter((projectId) => projectId !== id)
        : [...current, id]
    );
  };

  const toggleAllProjects = () => {
    const visibleProjectIds = filteredProjects.map((project) => project.id);

    if (allExpanded) {
      setExpandedProjects((current) =>
        current.filter((id) => !visibleProjectIds.includes(id))
      );
    } else {
      setExpandedProjects((current) => [
        ...new Set([...current, ...visibleProjectIds]),
      ]);
    }
  };

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    setExpandedProjects([]);
  };

  const clearFilters = () => {
    setSearch("");
    setActiveFilter("all");
    setExpandedProjects([]);
  };

  const openImagePreview = (image, event) => {
    previewTriggerRef.current = event.currentTarget;
    setPreviewImage(image);
  };

  const closeImagePreview = () => {
    setPreviewImage(null);
  };

  useEffect(() => {
    if (!previewImage) return undefined;

    const closeButton = lightboxCloseRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeImagePreview();
      }

      if (event.key === "Tab") {
        event.preventDefault();
        closeButton?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previewTriggerRef.current?.focus();
    };
  }, [previewImage]);

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="projects-page">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header">
        <a className="brand" href="/" aria-label="Aaditya Patil - Home">
          AP<span>.</span>
        </a>

        <nav className="site-nav" aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/education">Education</a>
          <a href="/skills">Skills</a>
          <a href="/#work">My Goals</a>
          <a className="active" href="/projects" aria-current="page">
            Projects
          </a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <main id="main-content" className="content-page">
        <button
          className="page-back-button"
          type="button"
          onClick={handleBack}
          aria-label="Go back to previous page"
        >
          <span aria-hidden="true">←</span>
          Back
        </button>

        <section className="page-heading">
          <p className="eyebrow">SELECTED WORK</p>

          <h1>
            Things I've <span>Built.</span>
          </h1>

          <p>Projects that help me apply what I learn and keep improving.</p>
        </section>

        <section
          className="panel project-explorer"
          aria-labelledby="projectExplorerTitle"
        >
          <p className="eyebrow">EXPLORE MY WORK</p>

          <h2 id="projectExplorerTitle">Find a Project</h2>

          <label className="project-search-label" htmlFor="projectSearch">
            Search projects
          </label>

          <input
            id="projectSearch"
            type="search"
            placeholder="Try soil, Python, portfolio..."
            autoComplete="off"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div
            className="project-filters"
            role="group"
            aria-label="Filter projects by category"
          >
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                className={`project-filter ${
                  activeFilter === filter.value ? "active" : ""
                }`}
                aria-pressed={activeFilter === filter.value}
                onClick={() => handleFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="project-explorer-actions">
            <p className="muted" aria-live="polite" aria-atomic="true">
              Showing {filteredProjects.length}{" "}
              {filteredProjects.length === 1 ? "project" : "projects"}
            </p>

            <button
              type="button"
              className="project-action-button"
              onClick={toggleAllProjects}
              disabled={filteredProjects.length === 0}
            >
              {allExpanded ? "Collapse All" : "Expand All"}
            </button>
          </div>
        </section>

        <section className="project-list" aria-label="My projects">
          {filteredProjects.map((project) => {
            const isExpanded = expandedProjects.includes(project.id);

            return (
              <article
                className={`project-card ${
                  isExpanded ? "project-card-expanded" : ""
                }`}
                key={project.id}
              >
                <button
                  type="button"
                  className="project-summary"
                  aria-expanded={isExpanded}
                  aria-controls={
                    isExpanded ? `project-details-${project.id}` : undefined
                  }
                  onClick={() => toggleProject(project.id)}
                >
                  <span className="project-number">{project.number}</span>

                  <span className="project-summary-main">
                    <span className="project-title">{project.title}</span>

                    <span className="project-card-category">
                      {getCategoryLabel(project.category)}
                    </span>
                  </span>

                  <span className="open-label">
                    {isExpanded ? "Close project −" : "View project +"}
                  </span>
                </button>

                {isExpanded && (
                  <div
                    className="project-details"
                    id={`project-details-${project.id}`}
                  >
                    {project.featured && (
                      <span className="featured-label">FEATURED PROJECT</span>
                    )}

                    <p className="project-description">{project.description}</p>

                    <h3>Technologies used</h3>

                    <div className="project-tags">
                      {project.technologies.map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </div>

                    <h3>Key features</h3>

                    <ul className="project-feature-list">
                      {project.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>

                    {project.images.length > 0 && (
                      <>
                        <h3>Project screenshots</h3>

                        <div className="project-gallery">
                          {project.images.map((image) => (
                            <button
                              type="button"
                              className="project-image-button"
                              key={image.src}
                              onClick={(event) =>
                                openImagePreview(image, event)
                              }
                              aria-label={`Preview ${image.caption}`}
                            >
                              <img
                                src={image.src}
                                alt={image.alt}
                                loading="lazy"
                              />

                              <span className="image-preview-label">
                                View image ↗
                              </span>

                              <span className="project-image-caption">
                                {image.caption}
                              </span>
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {project.video && (
                      <>
                        <h3>Project demo</h3>

                        <p className="muted">
                          Watch the project walkthrough below.
                        </p>

                        <video
                          className="demo-video"
                          controls
                          playsInline
                          preload="metadata"
                        >
                          <source src={project.video} type="video/mp4" />
                          Your browser does not support video playback.
                        </video>
                      </>
                    )}

                    <div className="project-details-actions">
                      <a
                        className="project-github-link"
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} on GitHub (opens in a new tab)`}
                      >
                        View on GitHub ↗
                      </a>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </section>

        {filteredProjects.length === 0 && (
          <div className="panel no-projects" role="status">
            <h3>No matching projects found.</h3>

            <p className="muted">
              Try another search term or select All Projects.
            </p>

            <button
              type="button"
              className="project-action-button"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="projects-home-action">
          <a className="back-home-button" href="/">
            ← Back to Home
          </a>
        </div>

        <button
          type="button"
          className="projects-back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          ↑ Top
        </button>
      </main>

      {previewImage && (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Project image preview"
          onClick={closeImagePreview}
        >
          <button
            ref={lightboxCloseRef}
            type="button"
            className="lightbox-close"
            onClick={closeImagePreview}
            aria-label="Close image preview"
          >
            ×
          </button>

          <div
            className="lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={previewImage.src} alt={previewImage.alt} />

            <p>{previewImage.caption}</p>
          </div>
        </div>
      )}

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Aaditya Patil</span>
        <a href="/contact">Contact ↗</a>
      </footer>
    </div>
  );
}