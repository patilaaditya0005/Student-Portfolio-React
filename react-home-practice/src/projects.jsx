
import { useMemo, useState } from "react";
import "./projects.css";

const projects = [
  {
    id: 1,
    title: "Soil Advisory System",
    category: "machine-learning",
    description:
      "A soil analysis and crop recommendation system that helps users understand soil conditions and make informed agricultural decisions.",
    technologies: ["Python", "Machine Learning", "Web Technologies"],
    images: ["/soil1.jpg", "/soil2.jpg"],
    video: "/demo.mp4",
    github: "https://github.com/patilaaditya0005/soil-advisory-system",
  },
  {
    id: 2,
    title: "Student Portfolio Website",
    category: "web-development",
    description:
      "A personal portfolio showcasing my background, education, technical skills, and projects.",
    technologies: ["HTML", "CSS", "JavaScript", "React"],
  },
];

const filters = [
  { label: "All Projects", value: "all" },
  { label: "Machine Learning", value: "machine-learning" },
  { label: "Web Development", value: "web-development" },
];

function Projects() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState([]);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory =
        filter === "all" || project.category === filter;

      const searchableText = [
        project.title,
        project.description,
        ...project.technologies,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });
  }, [search, filter]);

  const allExpanded =
    filteredProjects.length > 0 &&
    filteredProjects.every((project) => expanded.includes(project.id));

  function toggleProject(id) {
    setExpanded((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  function toggleAll() {
    if (allExpanded) {
      setExpanded((previous) =>
        previous.filter(
          (id) => !filteredProjects.some((project) => project.id === id)
        )
      );
    } else {
      setExpanded((previous) => [
        ...new Set([
          ...previous,
          ...filteredProjects.map((project) => project.id),
        ]),
      ]);
    }
  }

  return (
    <div className="page-container projects-page">
      <a className="skip-link" href="#projects-content">
        Skip to main content
      </a>

      <header className="site-header">
        <a className="brand" href="/">
          AP<span>.</span>
        </a>

        <nav className="site-nav" aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/education">Education</a>
          <a href="/skills">Skills</a>
          <a className="active" href="/projects" aria-current="page">
            Projects
          </a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <main id="projects-content" className="content-page">
        <section className="page-heading">
          <p className="eyebrow">SELECTED WORK</p>
          <h1>
            Things I've <span>Built</span>
          </h1>
          <p>
            Projects that help me apply what I learn and keep improving.
          </p>
        </section>

        <section className="panel project-explorer">
          <p className="eyebrow">EXPLORE MY WORK</p>
          <h2>Find a Project</h2>

          <label className="project-search-label" htmlFor="projectSearch">
            Search projects
          </label>

          <input
            id="projectSearch"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Try soil, Python, portfolio..."
            autoComplete="off"
          />

          <div className="project-filters" aria-label="Filter projects">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`project-filter ${
                  filter === item.value ? "active" : ""
                }`}
                aria-pressed={filter === item.value}
                onClick={() => setFilter(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="project-explorer-actions">
            <p className="muted" aria-live="polite">
              Showing {filteredProjects.length}{" "}
              {filteredProjects.length === 1 ? "project" : "projects"}
            </p>

            <button
              type="button"
              className="project-action-button"
              onClick={toggleAll}
              disabled={filteredProjects.length === 0}
            >
              {allExpanded ? "Collapse All" : "Expand All"}
            </button>
          </div>
        </section>

        {filteredProjects.map((project) => {
          const isExpanded = expanded.includes(project.id);

          return (
            <section className="project-card" key={project.id}>
              <div
                className="project-summary"
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onClick={() => toggleProject(project.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggleProject(project.id);
                  }
                }}
              >
                <span className="project-number">
                  {String(project.id).padStart(2, "0")}
                </span>

                <span className="project-title">{project.title}</span>

                <span className="open-label">
                  {isExpanded ? "Close −" : "View project ＋"}
                </span>
              </div>

              {isExpanded && (
                <div className="project-details">
                  {project.images && (
                    <div className="project-gallery">
                      {project.images.map((image, index) => (
                        <figure key={image}>
                          <img
                            src={image}
                            alt={`${project.title} preview ${index + 1}`}
                            loading="lazy"
                          />
                          <figcaption>
                            {index === 0
                              ? "Project interface"
                              : "System preview"}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )}

                  <p>{project.description}</p>

                  <p>
                    <strong>Technologies:</strong>{" "}
                    {project.technologies.join(", ")}
                  </p>

                  {project.video && (
                    <>
                      <h3>Video demo</h3>
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

                  {project.github && (
                    <a
                      className="button button-outline project-github-link"
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on GitHub ↗
                    </a>
                  )}
                </div>
              )}
            </section>
          );
        })}

        {filteredProjects.length === 0 && (
          <p className="panel muted" role="status">
            No matching projects found. Try another search or filter.
          </p>
        )}

        <div className="projects-home-action">
          <a href="/" className="back-home-button">
            <span aria-hidden="true">←</span> Back to Home
          </a>
        </div>

        <button
          className="projects-back-to-top"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          ↑ Top
        </button>
      </main>

      <footer className="site-footer">
        <span>© 2026 Aaditya Patil</span>
        <a href="/contact">Contact ↗</a>
      </footer>
    </div>
  );
}

export default Projects;
