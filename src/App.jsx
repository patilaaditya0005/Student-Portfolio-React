import { useEffect, useState } from "react";
import "./App.css";

import About from "./about";
import Education from "./education";
import Skills from "./skills";
import Projects from "./projects";
import Contact from "./contact";

const roles = [
  "Computer Science Student",
  "Aspiring Software Developer",
  "AI Enthusiast",
];

const GITHUB_USERNAME = "patilaaditya0005";

const soilProject = {
  id: "soil-advisory-system",
  name: "Soil Advisory System",
  description:
    "Explore my Soil Advisory System project, its implementation, and source code on GitHub.",
  html_url: `https://github.com/${GITHUB_USERNAME}/soil-advisory-system`,
  language: "Python",
  stargazers_count: 0,
  featured: true,
};

function normalizePath(rawPath) {
  const clean = rawPath.replace(/\.html$/i, "").replace(/\/+$/, "");
  return clean === "" || clean === "/index" ? "/" : clean;
}

function useTypingEffect(words) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return undefined;

    const word = words[wordIndex] || "";
    const finishedTyping = text === word;
    const finishedDeleting = text === "";

    const delay = finishedTyping
      ? 1400
      : deleting && finishedDeleting
        ? 350
        : deleting
          ? 45
          : 85;

    const timer = window.setTimeout(() => {
      if (!deleting && finishedTyping) {
        setDeleting(true);
      } else if (deleting && finishedDeleting) {
        setDeleting(false);
        setWordIndex((current) => (current + 1) % words.length);
      } else if (deleting) {
        setText(word.slice(0, text.length - 1));
      } else {
        setText(word.slice(0, text.length + 1));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [words, wordIndex, text, deleting]);

  return text;
}

function GitHubProjects() {
  const [projects, setProjects] = useState([soilProject]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`GitHub request failed: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Unexpected GitHub response");
        }

        const featuredRepo = data.find(
          (repo) => repo.name?.toLowerCase() === "soil-advisory-system"
        );

        const featuredProject = {
          ...soilProject,
          ...(featuredRepo
            ? {
                id: featuredRepo.id || soilProject.id,
                html_url: featuredRepo.html_url || soilProject.html_url,
                description:
                  featuredRepo.description || soilProject.description,
                language: featuredRepo.language || soilProject.language,
                stargazers_count: featuredRepo.stargazers_count ?? 0,
              }
            : {}),
        };

        const otherProjects = data
          .filter(
            (repo) =>
              !repo.fork &&
              repo.name?.toLowerCase() !== "soil-advisory-system"
          )
          .map((repo) => ({
            ...repo,
            featured: false,
          }));

        setProjects([featuredProject, ...otherProjects]);
        setError(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          setProjects([soilProject]);
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => controller.abort();
  }, []);

  return (
    <>
      {loading && (
        <p className="projects-message" role="status">
          Loading GitHub projects...
        </p>
      )}

      {error && (
        <p className="projects-message" role="status">
          GitHub repositories could not load. Showing the featured project
          instead.
        </p>
      )}

      <div className="project-showcase-grid">
        {projects.map((project, index) => (
          <article
            className="showcase-card"
            key={project.id || project.name}
          >
            <div className="showcase-number">
              {project.featured
                ? "FEATURED PROJECT / 01"
                : `GITHUB PROJECT / ${String(index + 1).padStart(2, "0")}`}
            </div>

            <div className="showcase-icon" aria-hidden="true">
              {project.featured ? "🌱" : "</>"}
            </div>

            <h3>
              {project.featured
                ? "Soil Advisory System"
                : (project.name || "Untitled Project").replaceAll("-", " ")}
            </h3>

            <p>
              {project.description ||
                "Explore this project and its source code on GitHub."}
            </p>

            <div className="project-tags">
              {project.featured && <span>Soil Technology</span>}
              {project.language && <span>{project.language}</span>}
              {project.stargazers_count > 0 && (
                <span>★ {project.stargazers_count}</span>
              )}
            </div>

            {project.html_url && (
              <a
                className="showcase-link"
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.name || "project"} on GitHub`}
              >
                View on GitHub ↗
              </a>
            )}
          </article>
        ))}
      </div>
    </>
  );
}

export default function App() {
  const animatedRole = useTypingEffect(roles);
  const [currentPath, setCurrentPath] = useState(() =>
    normalizePath(window.location.pathname)
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    const handleInternalNavigation = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = event.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        anchor.target === "_blank" ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("http")
      ) {
        return;
      }

      if (href.startsWith("#")) {
        return;
      }

      const url = new URL(anchor.href, window.location.origin);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      const nextPath = normalizePath(url.pathname);
      window.history.pushState({}, "", url.pathname + url.hash);
      setCurrentPath(nextPath);

      if (url.hash) {
        window.requestAnimationFrame(() => {
          const targetEl = document.querySelector(url.hash);
          targetEl?.scrollIntoView({ behavior: "smooth" });
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleInternalNavigation);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleInternalNavigation);
    };
  }, []);

  if (currentPath === "/about") return <About />;
  if (currentPath === "/education") return <Education />;
  if (currentPath === "/skills") return <Skills />;
  if (currentPath === "/projects") return <Projects />;
  if (currentPath === "/contact") return <Contact />;

  return (
    <div className="portfolio">
      <header className="portfolio-header">
        <a
          className="portfolio-brand"
          href="/"
          aria-label="Aaditya Patil home"
        >
          AP<span>.</span>
        </a>

        <nav className="portfolio-nav" aria-label="Main navigation">
          <a className="active" href="/" aria-current="page">
            Home
          </a>
          <a href="/about">About</a>
          <a href="/education">Education</a>
          <a href="/skills">Skills</a>
          <a href="#work">My Goals</a>
          <a href="/projects">Projects</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="portfolio-hero" id="home">
          <div className="portfolio-copy">
            <p className="portfolio-eyebrow">
              COMPUTER SCIENCE STUDENT · AI ENTHUSIAST
            </p>

            <h1>
              Hi, I'm <span>Aaditya Patil.</span>
              <br />
              Building my future
              <br />
              one line at a time.
            </h1>

            <p className="role-button typing-role" aria-live="polite">
              {animatedRole}
              <span className="typing-cursor" aria-hidden="true">
                |
              </span>
            </p>

            <p className="portfolio-description">
              I'm a Computer Science student at MIT ADT University, learning
              Python, DSA, AI, and web development while building practical
              projects.
            </p>

            <div className="portfolio-actions">
              <a className="action-primary" href="/projects">
                Explore my projects ↗
              </a>

              <a className="action-secondary" href="/contact">
                Let's connect
              </a>
            </div>

            <p className="portfolio-status">
              <span aria-hidden="true" />
              Currently learning · Open to opportunities
            </p>
          </div>

          <div className="portfolio-portrait">
            <div className="portrait-frame">
              <img
                src="/assets/me.jpeg"
                alt="Portrait of Aaditya Patil"
                loading="eager"
              />
            </div>

            <span className="portrait-stamp">LEARN. BUILD. IMPROVE.</span>
          </div>
        </section>

        <section className="portfolio-intro" id="about">
          <p className="portfolio-eyebrow">A LITTLE ABOUT ME</p>

          <h2>
            Curious mind.
            <br />
            <span>Consistent progress.</span>
          </h2>

          <p>
            My goal is to become a strong software developer by strengthening
            my problem-solving skills and creating useful, real-world projects.
          </p>

          <div className="intro-page-links">
            <a className="showcase-link" href="/about">
              Get to know me ↗
            </a>

            <a className="showcase-link" href="/education">
              Explore my education ↗
            </a>

            <a className="showcase-link" href="/skills">
              Have a look at my skills ↗
            </a>
          </div>
        </section>

        <section className="goals-section" id="work">
          <p className="portfolio-eyebrow">MY LEARNING JOURNEY</p>

          <h2 className="section-heading">
            Things I'm <span>building towards.</span>
          </h2>

          <div className="goal-grid">
            <article className="goal-card">
              <span>01 / PROGRAMMING</span>
              <h3>Python &amp; DSA</h3>

              <p>
                Strengthening programming fundamentals and problem-solving
                through consistent practice.
              </p>

              <div className="project-tags">
                <span>Python</span>
                <span>Algorithms</span>
              </div>
            </article>

            <article className="goal-card">
              <span>02 / WEB DEVELOPMENT</span>
              <h3>React Portfolio</h3>

              <p>
                Turning my existing portfolio into a responsive, interactive
                React experience.
              </p>

              <div className="project-tags">
                <span>React</span>
                <span>CSS</span>
                <span>Vite</span>
              </div>
            </article>

            <article className="goal-card">
              <span>03 / EXPLORATION</span>
              <h3>AI &amp; Innovation</h3>

              <p>
                Exploring AI concepts and working towards practical projects
                that solve real problems.
              </p>

              <div className="project-tags">
                <span>AI</span>
                <span>Learning</span>
              </div>
            </article>
          </div>
        </section>

        <section className="projects-showcase" id="projects">
          <p className="portfolio-eyebrow">SELECTED WORK</p>

          <h2 className="section-heading">
            Projects &amp; <span>experiments.</span>
          </h2>

          <p className="projects-intro">
            Explore my featured project and public GitHub repositories.
          </p>

          <GitHubProjects />

          <div className="github-profile-link">
            <a
              className="action-secondary"
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub profile ↗
            </a>
          </div>
        </section>
      </main>

      <footer className="portfolio-footer" id="contact">
        <span>© {new Date().getFullYear()} Aaditya Patil</span>
        <a href="/contact">Get in touch ↗</a>
      </footer>
    </div>
  );
}