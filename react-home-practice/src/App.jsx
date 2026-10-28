import { useEffect, useState } from "react";
import "./App.css";
import About from "./about";
import Education from "./education";
import Skills from "./skills";


const roles = [
  "Computer Science Student",
  "Aspiring Software Developer",
  "AI Enthusiast",
];

const soilProject = {
  id: "soil-advisory-system",
  name: "Soil Advisory System",
  description:
    "Explore my Soil Advisory System project, its implementation, and source code on GitHub.",
  html_url: "https://github.com/patilaaditya0005/soil-advisory-system",
  language: null,
  stargazers_count: null,
  featured: true,
};

function useTypingEffect(words) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    const finishedTyping = text === word;
    const finishedDeleting = text === "";

    const delay = finishedTyping
      ? 1400
      : deleting && finishedDeleting
        ? 350
        : deleting
          ? 45
          : 85;

    const timer = setTimeout(() => {
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

    return () => clearTimeout(timer);
  }, [words, wordIndex, text, deleting]);

  return text;
}

function GitHubProjects() {
  const [projects, setProjects] = useState([soilProject]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      try {
        const response = await fetch(
          "https://api.github.com/users/patilaaditya0005/repos?sort=updated&per_page=100",
        );

        if (!response.ok) {
          throw new Error("GitHub request failed");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Unexpected GitHub response");
        }

        const otherProjects = data
          .filter(
            (repo) =>
              !repo.fork && repo.name.toLowerCase() !== "soil-advisory-system",
          )
          .map((repo) => ({
            ...repo,
            featured: false,
          }));

        const featuredRepo = data.find(
          (repo) => repo.name.toLowerCase() === "soil-advisory-system",
        );

        const featuredProject = {
          ...soilProject,
          ...(featuredRepo
            ? {
                html_url: featuredRepo.html_url,
                description:
                  featuredRepo.description || soilProject.description,
                language: featuredRepo.language,
                stargazers_count: featuredRepo.stargazers_count,
              }
            : {}),
        };

        if (!cancelled) {
          setProjects([featuredProject, ...otherProjects]);
        }
      } catch {
        if (!cancelled) {
          setProjects([soilProject]);
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {loading && (
        <p className="projects-message">Loading GitHub projects...</p>
      )}

      {error && (
        <p className="projects-message">
          GitHub repositories could not load. Showing the featured project
          instead.
        </p>
      )}

      <div className="project-showcase-grid">
        {projects.map((project, index) => (
          <article className="showcase-card" key={project.id}>
            <div className="showcase-number">
              {project.featured
                ? "FEATURED PROJECT / 01"
                : `GITHUB PROJECT / ${String(index + 1).padStart(2, "0")}`}
            </div>

            <div className="showcase-icon">
              {project.featured ? "🌱" : "</>"}
            </div>

            <h3>
              {project.featured
                ? "Soil Advisory System"
                : project.name.replaceAll("-", " ")}
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

            <a
              className="showcase-link"
              href={project.html_url}
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub ↗
            </a>
          </article>
        ))}
      </div>
    </>
  );
}

export default function App() {
  const animatedRole = useTypingEffect(roles);
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/about") return <About />;
  if (path === "/education") return <Education />;
  if (path === "/skills") return <Skills />;

  return (
    <div className="portfolio">
      <header className="portfolio-header">
        <a className="portfolio-brand" href="#home">
          AP<span>.</span>
        </a>

        <nav className="portfolio-nav" aria-label="Main navigation">
          <a className="active" href="#home">
            Home
          </a>
          <a href="/about">About</a>
          <a href="/education">Education</a>
          <a href="/skills">Skills</a>
          <a href="#work">My Goals</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
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
              <span className="typing-cursor">|</span>
            </p>

            <p className="portfolio-description">
              I'm a Computer Science student at MIT ADT University, learning
              Python, DSA, AI, and web development while building practical
              projects.
            </p>

            <div className="portfolio-actions">
              <a className="action-primary" href="#projects">
                Explore my projects ↗
              </a>

              <a className="action-secondary" href="#contact">
                Let's connect
              </a>
            </div>

            <p className="portfolio-status">
              <span /> Currently learning · Open to opportunities
            </p>
          </div>

          <div className="portfolio-portrait">
            <div className="portrait-frame">
              <img
                src="/assets/portrait-cinematic.jpeg"
                alt="Portrait of Aaditya Patil"
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
            My goal is to become a strong software developer by strengthening my
            problem-solving skills and creating useful, real-world projects.
          </p>

     
<div className="intro-page-links">
  <a className="showcase-link" href="/about">
    Get to know me ↗
  </a>

  <a className="showcase-link" href="/education">
    Explore my education ↗
  </a>

  <a className="showcase-link" href="/skills">
    Have a look on my Skills ↗
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
              href="https://github.com/patilaaditya0005"
              target="_blank"
              rel="noreferrer"
            >
              View GitHub profile ↗
            </a>
          </div>
        </section>
      </main>

      <footer className="portfolio-footer" id="contact">
        <span>© 2026 Aaditya Patil</span>

        <a href="mailto:patilaaditya0005@gmail.com">Get in touch ↗</a>
      </footer>
    </div>
  );
}
