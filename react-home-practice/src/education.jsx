
import { useState } from "react";
import "./education.css";

const academicJourney = [
  {
    number: "01",
    status: "CURRENTLY PURSUING",
    level: "UNDERGRADUATE",
    degree: "B.Tech — Computer Science and Engineering",
    institution: "MIT ADT University, Pune",
    description:
      "Currently studying computer science while strengthening programming fundamentals, problem-solving, and AI knowledge.",
    topics: ["Computer Science", "Programming", "AI"],
  },
  {
    number: "02",
    status: "PREVIOUS EDUCATION",
    level: "HIGHER SECONDARY",
    degree: "Higher Secondary School",
    institution: "Fergusson College",
    description:
      "Completed higher secondary education before continuing my academic journey in computer science.",
    topics: ["Academic Foundation", "Learning", "Growth"],
  },
];

const learningGoals = [
  {
    number: "01",
    symbol: "</>",
    title: "Core Computer Science",
    description:
      "Build a deeper understanding of programming fundamentals and computer science concepts.",
    tags: ["Programming", "Fundamentals"],
  },
  {
    number: "02",
    symbol: "↗",
    title: "Data Structures & Algorithms",
    description:
      "Improve logical thinking, problem-solving ability, and confidence through consistent practice.",
    tags: ["DSA", "Problem Solving"],
  },
  {
    number: "03",
    symbol: "✳",
    title: "Practical Projects",
    description:
      "Apply what I learn by creating useful projects and strengthening my development skills.",
    tags: ["React", "Projects"],
  },
];

export default function Education() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="education-page">
      <a className="education-skip-link" href="#education-main">
        Skip to content
      </a>

      <div className="education-container">
        <header className="education-header">
          <a className="education-brand" href="/">
            AP<span>.</span>
          </a>

          <nav className="education-nav" aria-label="Main navigation">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a className="active" href="/education" aria-current="page">
              Education
            </a>
            <a href="/#work">My Goals</a>
            <a href="/#projects">Projects</a>
            <a href="/#contact">Contact</a>
          </nav>
        </header>

        <main id="education-main">
          <section className="education-hero">
            <div className="education-hero-copy">
              <p className="education-eyebrow">
                THE FOUNDATION · MY ACADEMIC JOURNEY
              </p>

              <h1>
                Learning today.
                <br />
                <span>Building tomorrow.</span>
              </h1>

              <p className="education-hero-description">
                My education is the foundation of my journey into technology.
                I am focused on strengthening my computer science knowledge,
                developing practical skills, and growing one step at a time.
              </p>

              <div className="education-hero-actions">
                <a className="education-button education-button-light" href="#academic-journey">
                  Explore my journey <span>↘</span>
                </a>
                <a className="education-button education-button-outline" href="/#projects">
                  View my projects <span>↗</span>
                </a>
              </div>
            </div>

            <aside className="education-hero-card">
              <span className="education-card-index">ACADEMIC PROFILE / 01</span>
              <div className="education-monogram" aria-hidden="true">
                <span>AP</span>
                <span className="education-monogram-dot">.</span>
              </div>
              <p className="education-card-label">CURRENT FOCUS</p>
              <h2>Computer Science & Engineering</h2>
              <p className="education-card-description">
                Learning the fundamentals. Practising consistently. Building
                real projects.
              </p>
              <div className="education-card-bottom">
                <span className="education-status-dot" />
                <span>Currently pursuing B.Tech</span>
              </div>
            </aside>
          </section>

          <section className="education-intro" id="academic-journey">
            <div>
              <p className="education-eyebrow">01 / WHERE IT STARTED</p>
              <h2>
                My academic <span>journey.</span>
              </h2>
            </div>
            <p>
              Every stage of education has helped shape the way I learn,
              approach challenges, and prepare for a career in technology.
            </p>
          </section>

          <section className="education-timeline-section">
            <div className="education-section-topline">
              <span>ACADEMIC HISTORY</span>
              <span>02 RECORDS</span>
            </div>

            <div className="education-timeline">
              {academicJourney.map((item) => (
                <article className="education-timeline-item" key={item.number}>
                  <div className="education-timeline-marker">
                    <span>{item.number}</span>
                  </div>

                  <div className="education-record">
                    <div className="education-record-top">
                      <span className="education-record-level">{item.level}</span>
                      <span className="education-record-status">
                        <span />
                        {item.status}
                      </span>
                    </div>

                    <h3>{item.degree}</h3>
                    <p className="education-institution">{item.institution}</p>
                    <p className="education-record-description">
                      {item.description}
                    </p>

                    <div className="education-tags">
                      {item.topics.map((topic) => (
                        <span key={topic}>{topic}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="education-more-section">
            <div className="education-more-copy">
              <p className="education-eyebrow">02 / BEYOND THE CLASSROOM</p>
              <h2>
                Education is more than <span>a qualification.</span>
              </h2>
              <p>
                I want to turn the concepts I study into skills I can use.
                That means practising code, exploring new technologies,
                solving problems, and learning through hands-on projects.
              </p>
            </div>

            <div className="education-more-panel">
              <div className="education-more-panel-heading">
                <span className="education-panel-symbol">+</span>
                <div>
                  <p className="education-eyebrow">CONTINUOUS DEVELOPMENT</p>
                  <h3>My learning approach</h3>
                </div>
              </div>

              {showMore && (
                <div className="education-expanded-content">
                  <p>
                    I am working to strengthen my computer science fundamentals
                    through programming practice, Data Structures and
                    Algorithms, and hands-on development.
                  </p>
                  <p>
                    My goal is to connect academic concepts with practical
                    experience, build meaningful projects, and keep improving
                    as a software developer.
                  </p>
                </div>
              )}

              <button
                className="education-more-button"
                type="button"
                aria-expanded={showMore}
                onClick={() => setShowMore((current) => !current)}
              >
                {showMore ? "Show less" : "Read more"}
                <span className={showMore ? "education-arrow rotated" : "education-arrow"}>
                  ↗
                </span>
              </button>
            </div>
          </section>

          <section className="education-goals-section">
            <div className="education-goals-heading">
              <div>
                <p className="education-eyebrow">03 / WHAT COMES NEXT</p>
                <h2>
                  What I’m working <span>toward.</span>
                </h2>
              </div>
              <p>
                My current priorities for turning knowledge into practical
                ability.
              </p>
            </div>

            <div className="education-goals-grid">
              {learningGoals.map((goal) => (
                <article className="education-goal-card" key={goal.number}>
                  <div className="education-goal-top">
                    <span>{goal.number} / LEARNING GOAL</span>
                    <span className="education-goal-symbol">{goal.symbol}</span>
                  </div>

                  <h3>{goal.title}</h3>
                  <p>{goal.description}</p>

                  <div className="education-tags">
                    {goal.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="education-closing">
            <p className="education-eyebrow">THE JOURNEY CONTINUES</p>
            <h2>
              Learn with purpose.
              <br />
              <span>Build with confidence.</span>
            </h2>
            <p>
              I believe consistent learning and practical experience are
              essential to becoming a better developer.
            </p>
            <a className="education-button education-button-light" href="/#projects">
              Explore my work <span>↗</span>
            </a>
          </section>
        </main>

        <footer className="education-footer">
          <span>© 2026 Aaditya Patil</span>
          <span>Learning · Building · Improving</span>
          <a href="/">Back to Home ↑</a>
        </footer>
      </div>
    </div>
  );
}
