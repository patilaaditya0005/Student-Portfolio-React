import { useState } from "react";
import "./about.css";

const learningSteps = [
  {
    number: "01",
    title: "Learn",
    description: "Understand concepts and explore new tools.",
    detail:
      "I focus on programming fundamentals, Python, DSA, AI concepts, and modern web development.",
  },
  {
    number: "02",
    title: "Build",
    description: "Apply what I learn through practical projects.",
    detail:
      "I turn ideas into working projects and use React, JavaScript, HTML, and CSS to strengthen my skills.",
  },
  {
    number: "03",
    title: "Improve",
    description: "Review my work, solve problems, and iterate.",
    detail:
      "I learn from mistakes, practise coding problems, improve existing projects, and keep moving forward.",
  },
];

const focusAreas = [
  {
    number: "01",
    title: "Programming",
    description:
      "Strengthening Python fundamentals, logical thinking, and problem-solving.",
    tags: ["Python", "Problem solving"],
  },
  {
    number: "02",
    title: "Data Structures & Algorithms",
    description:
      "Practising coding questions and developing a stronger approach to algorithmic problems.",
    tags: ["DSA", "LeetCode"],
  },
  {
    number: "03",
    title: "Web Development",
    description:
      "Building responsive interfaces and converting my portfolio into a React application.",
    tags: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    number: "04",
    title: "AI & Technology",
    description:
      "Exploring artificial intelligence and finding ways to apply technology to practical problems.",
    tags: ["AI", "Projects"],
  },
];

export default function About() {
  const [readMore, setReadMore] = useState(false);
  const [showJourney, setShowJourney] = useState(false);

  return (
    <div className="about-page">
      <header className="about-header">
        <a className="about-brand" href="/">
          AP<span>.</span>
        </a>

        <nav className="about-nav" aria-label="Main navigation">
          <a href="/">Home</a>
          <a className="active" href="/about" aria-current="page">
            About
          </a>
          <a href="/#work">My Goals</a>
          <a href="/#projects">Projects</a>
          <a href="/#contact">Contact</a>
        </nav>
      </header>

      <main className="about-main" id="main-content">
        <section className="about-heading">
          <p className="about-eyebrow">GET TO KNOW ME</p>

          <h1>
            About <span>Me.</span>
          </h1>

          <p>
            A little about who I am, what I'm learning, and where I
            want to go.
          </p>
        </section>

        <section className="about-profile">
          <div className="about-image-wrap">
            <img
              src="/assets/portrait-professional.png"
              alt="Portrait of Aaditya Patil"
            />
            <span className="about-image-label">
              LEARN. BUILD. IMPROVE.
            </span>
          </div>

          <article className="about-panel about-biography">
            <p className="about-eyebrow">MY INTRODUCTION</p>
            <h2>Who am I?</h2>

            <p>
              I am a Computer Science and Engineering student at MIT
              ADT University. I enjoy learning programming, solving
              problems, and building projects that turn concepts into
              practical skills.
            </p>

            {readMore && (
              <div className="about-extra">
                <p>
                  My learning journey is focused on Python, Data
                  Structures and Algorithms, Artificial Intelligence,
                  and web development. I enjoy exploring how technology
                  works and applying what I learn to real projects.
                </p>

                <p>
                  I am also working on my React development skills by
                  improving my portfolio and making it more interactive,
                  responsive, and maintainable.
                </p>

                <p>
                  I believe consistent practice, curiosity, and learning
                  from mistakes are important parts of becoming a better
                  developer.
                </p>
              </div>
            )}

            <button
              className="about-button"
              type="button"
              onClick={() => setReadMore((value) => !value)}
              aria-expanded={readMore}
            >
              {readMore ? "Read Less ↑" : "Read More ↓"}
            </button>

            <div className="about-goal">
              <p className="about-eyebrow">WHERE I'M HEADED</p>
              <h2>My goal</h2>

              <p>
                To keep improving my technical skills, create useful
                projects, strengthen my problem-solving ability, and
                prepare for internship opportunities through consistent
                practice and hands-on learning.
              </p>
            </div>

            <div className="about-tags">
              <span>Problem solving</span>
              <span>Learning by building</span>
              <span>AI &amp; technology</span>
              <span>Continuous learning</span>
            </div>
          </article>
        </section>

        <section className="about-panel">
          <p className="about-eyebrow">WHAT I'M FOCUSING ON</p>
          <h2>Skills I'm developing.</h2>

          <p>
            These are the areas I'm actively exploring and improving
            through learning, practice, and project work.
          </p>

          <div className="about-learning-grid">
            {focusAreas.map((area) => (
              <article className="about-step" key={area.number}>
                <span className="about-step-number">
                  {area.number}
                </span>

                <h3>{area.title}</h3>
                <p>{area.description}</p>

                <div className="about-tags">
                  {area.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-panel about-learning">
          <p className="about-eyebrow">MY LEARNING APPROACH</p>

          <h2>
            Small steps, <span>real progress.</span>
          </h2>

          <p>
            I try to turn what I learn into practical experience rather
            than stopping at theory.
          </p>

          <div className="about-learning-grid">
            {learningSteps.map((step) => (
              <article className="about-step" key={step.number}>
                <span className="about-step-number">
                  {step.number}
                </span>

                <h3>{step.title}</h3>
                <p>{step.description}</p>

                {showJourney && (
                  <p className="about-step-detail">
                    {step.detail}
                  </p>
                )}
              </article>
            ))}
          </div>

          <button
            className="about-button"
            type="button"
            onClick={() => setShowJourney((value) => !value)}
            aria-expanded={showJourney}
          >
            {showJourney ? "Hide My Journey ↑" : "Show My Journey ↓"}
          </button>
        </section>

        <section className="about-panel">
          <p className="about-eyebrow">WHAT MOTIVATES ME</p>
          <h2>Learning through action.</h2>

          <div className="about-learning-grid">
            <article className="about-step">
              <span className="about-step-number">01</span>
              <h3>Curiosity</h3>
              <p>
                Exploring new ideas, understanding how things work,
                and asking questions.
              </p>
            </article>

            <article className="about-step">
              <span className="about-step-number">02</span>
              <h3>Consistency</h3>
              <p>
                Making steady progress through regular coding practice
                and continuous learning.
              </p>
            </article>

            <article className="about-step">
              <span className="about-step-number">03</span>
              <h3>Practical work</h3>
              <p>
                Building projects that help me apply concepts and
                develop real-world skills.
              </p>
            </article>
          </div>
        </section>

        <section className="about-panel about-stats">
          <p className="about-eyebrow">MY PROGRESS</p>
          <h2>Learning stats.</h2>

          <p className="about-stats-note">
            A snapshot of my learning journey based on my original
            portfolio information.
          </p>

          <div className="about-stats-grid">
            <article>
              <strong>20</strong>
              <span>LeetCode problems solved</span>
            </article>

            <article>
              <strong>2</strong>
              <span>Projects worked on</span>
            </article>

            <article>
              <strong>04</strong>
              <span>Core focus areas</span>
              <p>Python · DSA · Web Development · AI</p>
            </article>
          </div>

          <p className="about-stats-note">
            Update these figures as your experience and project work
            grow.
          </p>
        </section>

        <section className="about-panel">
          <p className="about-eyebrow">WHAT'S NEXT</p>
          <h2>Turning learning into opportunities.</h2>

          <p>
            My next steps are to keep practising DSA, strengthen my
            React skills, improve my projects, and prepare for
            opportunities where I can learn and contribute as a
            developer.
          </p>

          <div className="about-bottom-actions">
            <a
              className="about-button about-button-light"
              href="/#projects"
            >
              Explore my projects ↗
            </a>

            <a
              className="about-text-link"
              href="mailto:patilaaditya0005@gmail.com"
            >
              Let's connect →
            </a>
          </div>
        </section>

        <button
          className="about-top-button"
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
        >
          ↑ Top
        </button>
      </main>

      <footer className="about-footer">
        <span>© 2026 Aaditya Patil</span>

        <a href="mailto:patilaaditya0005@gmail.com">
          Get in touch ↗
        </a>

        <a href="/#work">Explore my goals ↑</a>
      </footer>
    </div>
  );
}