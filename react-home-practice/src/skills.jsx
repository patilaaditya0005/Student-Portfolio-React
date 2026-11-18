
import { useMemo, useState } from "react";
import "./skills.css";

const skills = [
  { name: "C", category: "programming", status: "Learning" },
  { name: "C++", category: "programming", status: "Learning" },
  { name: "Python", category: "programming", status: "Learning" },
  { name: "HTML & CSS", category: "programming", status: "Learning" },
  { name: "JavaScript", category: "programming", status: "Learning" },
  { name: "SQL", category: "programming", status: "Learning" },
  { name: "Visual Studio Code", category: "tools", status: "Using" },
  { name: "Git & GitHub", category: "tools", status: "Using" },
  { name: "Jupyter Notebook", category: "tools", status: "Using" },
  { name: "Google Colab", category: "tools", status: "Using" },
  { name: "MySQL", category: "tools", status: "Learning" },
  { name: "Machine Learning", category: "tools", status: "Learning" },
];

const filters = [
  { label: "All skills", value: "all" },
  { label: "Programming", value: "programming" },
  { label: "Tools & Technologies", value: "tools" },
];

function Skills() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesSearch = skill.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesFilter =
        activeFilter === "all" || skill.category === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const programmingSkills = filteredSkills.filter(
    (skill) => skill.category === "programming"
  );

  const toolSkills = filteredSkills.filter(
    (skill) => skill.category === "tools"
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderSkillCard = (skill, index) => (
    <article className="skill-card" key={skill.name}>
      <div className="skill-card-top">
        <span className="skill-number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`skill-status ${
            skill.status === "Using" ? "status-using" : ""
          }`}
        >
          <span className="status-dot" />
          {skill.status}
        </span>
      </div>

      <h3>{skill.name}</h3>

      <div className="skill-card-bottom">
        <span>
          {skill.category === "programming"
            ? "Programming"
            : "Tools & Technologies"}
        </span>
        <span className="skill-arrow" aria-hidden="true">↗</span>
      </div>
    </article>
  );

  return (
    <div className="skills-page">
      <div className="skills-container">
        <header className="skills-nav">
          <a className="skills-brand" href="/">
            AP<span>.</span>
          </a>

          <nav aria-label="Main navigation">
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/education">Education</a>
  <a className="active" href="/skills" aria-current="page">
    Skills
  </a>
  <a href="/#work">My Goals</a>
  <a href="/#projects">Projects</a>
  <a href="/#contact">Contact</a>
</nav>
        </header>

        <main id="skills-main">
          <section className="skills-hero">
            <p className="skills-eyebrow">
              <span className="hero-line" />
              TOOLS IN MY TOOLKIT
            </p>

            <h1>
              My <span>Skills</span>
            </h1>

            <p className="skills-hero-description">
              Technologies I'm learning and using as a Computer Science student.
              Building my foundation, one skill at a time.
            </p>

            <div className="skills-hero-meta">
              <span>01 — TECHNICAL TOOLKIT</span>
              <span>{String(skills.length).padStart(2, "0")} SKILLS</span>
            </div>
          </section>

          <section className="skills-explorer">
            <div className="explorer-heading">
              <div>
                <p className="skills-eyebrow">EXPLORE MY TOOLKIT</p>
                <h2>Find a skill<span>.</span></h2>
              </div>

              <span className="result-count">
                {filteredSkills.length} / {skills.length}
              </span>
            </div>

            <label className="skills-search">
              <span className="search-icon" aria-hidden="true">⌕</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Python, HTML, Git..."
                aria-label="Search by skill name"
              />
              {search && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </label>

            <div className="skills-filters" aria-label="Filter skills">
              {filters.map((filter) => (
                <button
                  type="button"
                  key={filter.value}
                  className={
                    activeFilter === filter.value ? "filter-active" : ""
                  }
                  aria-pressed={activeFilter === filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <p className="skills-results" aria-live="polite">
              Showing {filteredSkills.length}{" "}
              {filteredSkills.length === 1 ? "skill" : "skills"}
            </p>
          </section>

          {filteredSkills.length > 0 ? (
            <div className="skills-groups">
              {programmingSkills.length > 0 && (
                <section className="skills-category">
                  <div className="category-heading">
                    <div>
                      <p className="skills-eyebrow">01 / LANGUAGES</p>
                      <h2>Programming</h2>
                    </div>
                    <span>{String(programmingSkills.length).padStart(2, "0")}</span>
                  </div>

                  <div className="skills-grid">
                    {programmingSkills.map(renderSkillCard)}
                  </div>
                </section>
              )}

              {toolSkills.length > 0 && (
                <section className="skills-category">
                  <div className="category-heading">
                    <div>
                      <p className="skills-eyebrow">02 / WORKFLOW</p>
                      <h2>Tools & Technologies</h2>
                    </div>
                    <span>{String(toolSkills.length).padStart(2, "0")}</span>
                  </div>

                  <div className="skills-grid">
                    {toolSkills.map((skill, index) =>
                      renderSkillCard(skill, index)
                    )}
                  </div>
                </section>
              )}
            </div>
          ) : (
            <div className="skills-empty" role="status">
              <span className="empty-symbol">?</span>
              <h2>No matching skills found.</h2>
              <p>Try another search or reset the filters.</p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveFilter("all");
                }}
              >
                Show all skills ↗
              </button>
            </div>
          )}

          <section className="skills-learning">
            <div className="learning-symbol" aria-hidden="true">↗</div>
            <div>
              <p className="skills-eyebrow">GROWTH MINDSET</p>
              <h2>Always learning<span>.</span></h2>
              <p>
                I'm continuously improving these skills through coursework,
                coding practice, and personal projects. The labels describe my
                current learning focus, not professional proficiency.
              </p>
            </div>
          </section>

          <div className="skills-bottom">
            <a href="/education">← Previous: Education</a>
            <button type="button" onClick={scrollToTop}>
              Back to top ↑
            </button>
            <a href="/">Back to Home ↑</a>
          </div>
        </main>

        <footer className="skills-footer">
          <a className="skills-brand" href="/">
            AP<span>.</span>
          </a>
          <span>© 2026 Aaditya Patil</span>
          <span>LEARN. BUILD. IMPROVE.</span>
        </footer>
      </div>
    </div>
  );
}

export default Skills;
