
import { useState } from "react";
import "./contact.css";

const EMAIL = "patilaaditya0005@gmail.com";
const MAX_MESSAGE_LENGTH = 1000;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    reason: "Internship",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [copyStatus, setCopyStatus] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setFormStatus("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (form.name.trim().length < 2) {
      newErrors.name = "Please enter your full name.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (form.message.trim().length < 10) {
      newErrors.message = "Message must contain at least 10 characters.";
    }

    if (form.message.trim().length > MAX_MESSAGE_LENGTH) {
      newErrors.message = "Message cannot exceed 1000 characters.";
    }

    return newErrors;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyStatus("Email copied successfully!");
    } catch {
      setCopyStatus(`Please copy manually: ${EMAIL}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (submitting) return;

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setFormStatus("Please correct the highlighted fields.");
      return;
    }

    const subject = `${form.reason} - Contact from ${form.name.trim()}`;

    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Reason: ${form.reason}`,
      "",
      "Message:",
      form.message.trim(),
    ].join("\n");

    const mailtoLink = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setSubmitting(true);
    setFormStatus("Opening your default email application...");

    window.location.href = mailtoLink;

    // Reset the button state if the email application does not open.
    window.setTimeout(() => {
      setSubmitting(false);
    }, 1500);
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
            Interested in a project, internship, or collaboration?
            Send me a message.
          </p>
        </section>

        <section className="contact-layout">
          <div className="contact-note">
            <p className="portfolio-eyebrow">GET IN TOUCH</p>

            <h2>Good things start with a conversation.</h2>

            <p>
              I'm interested in learning opportunities, project
              collaborations, and connecting with people who enjoy
              building things.
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

          <form
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
          >
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
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              required
            />

            {errors.name && (
              <span className="contact-error" id="name-error">
                {errors.name}
              </span>
            )}

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
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              required
            />

            {errors.email && (
              <span className="contact-error" id="email-error">
                {errors.email}
              </span>
            )}

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
              maxLength={MAX_MESSAGE_LENGTH}
              rows={5}
              value={form.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? "message-error" : undefined
              }
              required
            />

            {errors.message && (
              <span className="contact-error" id="message-error">
                {errors.message}
              </span>
            )}

            <div className="contact-message-meta">
              <span>
                {form.message.length} / {MAX_MESSAGE_LENGTH} characters
              </span>
            </div>

            <button
              className="contact-submit-button"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Opening email..." : "Send message"}
              <span>↗</span>
            </button>

            <p
              className="contact-form-note"
              role="status"
              aria-live="polite"
            >
              {formStatus}
            </p>

            <p className="contact-form-note">
              Submitting opens your default email application with
              your message pre-filled. Direct website submissions
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
