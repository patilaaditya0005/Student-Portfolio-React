
import { useState } from "react";
import "./contact.css";

const EMAIL = "patilaaditya0005@gmail.com";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    reason: "Internship",
    message: "",
  });

  const [copyStatus, setCopyStatus] = useState("");
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setFormStatus("");
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyStatus("Email copied successfully!");
    } catch {
      setCopyStatus(`Please copy the email manually: ${EMAIL}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = `${form.reason} - Contact from ${form.name}`;

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Reason: ${form.reason}`,
      "",
      "Message:",
      form.message,
    ].join("\n");

    const mailtoLink = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setFormStatus("Opening your default email application...");
    window.location.href = mailtoLink;
  };

  return (
    <div className="portfolio contact-page">
      <header className="portfolio-header">
        <a className="portfolio-brand" href="/">
          AP<span>.</span>
        </a>

        <nav className="portfolio-nav" aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/education">Education</a>
          <a href="/skills">Skills</a>
          <a href="/projects">Projects</a>
          <a className="active" href="/contact">Contact</a>
        </nav>
      </header>

      <main className="contact-content">
        <section className="contact-heading">
          <p className="portfolio-eyebrow">HAVE AN IDEA?</p>

          <h1>
            Let's <span>Connect</span>
          </h1>

          <p>
            Interested in a project, internship, or collaboration? Send me a
            message.
          </p>
        </section>

        <section className="contact-layout">
          <div className="contact-note">
            <p className="portfolio-eyebrow">GET IN TOUCH</p>

            <h2>Good things start with a conversation.</h2>

            <p>
              I'm interested in learning opportunities, project collaborations,
              and connecting with people who enjoy building things.
            </p>

            <a className="contact-email" href={`mailto:${EMAIL}`}>
              {EMAIL} ↗
            </a>

            <button
              className="contact-copy-button"
              type="button"
              onClick={handleCopyEmail}
            >
              Copy email
            </button>

            <p className="contact-form-note" role="status" aria-live="polite">
              {copyStatus}
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="contact-name">Full name</label>

            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Your name"
              autoComplete="name"
              minLength={2}
              maxLength={80}
              value={form.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="contact-email">Email address</label>

            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              maxLength={254}
              value={form.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="contact-reason">Reason for contact</label>

            <select
              id="contact-reason"
              name="reason"
              value={form.reason}
              onChange={handleChange}
            >
              <option value="Internship">Internship</option>
              <option value="Project collaboration">
                Project collaboration
              </option>
              <option value="Other">Other</option>
            </select>

            <label htmlFor="contact-message">Your message</label>

            <textarea
              id="contact-message"
              name="message"
              placeholder="Tell me a little about it..."
              minLength={10}
              maxLength={1000}
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
            />

            <div className="contact-message-meta">
              <span>{form.message.length} / 1000 characters</span>
            </div>

            <button className="contact-submit-button" type="submit">
              Send message <span>↗</span>
            </button>

            <p className="contact-form-note" role="status" aria-live="polite">
              {formStatus}
            </p>

            <p className="contact-form-note">
              This opens your default email app. Direct website form submissions
              require a backend or form service.
            </p>
          </form>
        </section>
      </main>

      <footer className="portfolio-footer">
        <span>© 2026 Aaditya Patil</span>
        <a href="/">Back to home ↑</a>
      </footer>
    </div>
  );
}
