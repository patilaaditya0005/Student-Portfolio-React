import { useState } from "react";
import "./contact.css";

const EMAIL = "patilaaditya0005@gmail.com";
const MAX_MESSAGE_LENGTH = 1000;

const INITIAL_FORM = {
  name: "",
  email: "",
  reason: "Internship",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
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

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedMessage = form.message.trim();

    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/;

    if (trimmedName.length < 2) {
      newErrors.name = "Please enter at least 2 characters.";
    } else if (trimmedName.length > 80) {
      newErrors.name = "Name cannot exceed 80 characters.";
    }

    if (!emailPattern.test(trimmedEmail) || trimmedEmail.length > 254) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (trimmedMessage.length < 10) {
      newErrors.message = "Message must contain at least 10 characters.";
    } else if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = "Message cannot exceed 1000 characters.";
    }

    return newErrors;
  };

  const handleCopyEmail = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(EMAIL);
      setCopyStatus("Email copied successfully!");
    } catch {
      setCopyStatus(`Automatic copy unavailable. Email: ${EMAIL}`);
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

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedMessage = form.message.trim();

    const subject = `${form.reason} - Contact from ${trimmedName}`;

    const body = [
      `Name: ${trimmedName}`,
      `Email: ${trimmedEmail}`,
      `Reason: ${form.reason}`,
      "",
      "Message:",
      trimmedMessage,
    ].join("\n");

    const mailtoLink =
      `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    setSubmitting(true);
    setFormStatus("Opening your default email application...");

    try {
      window.location.href = mailtoLink;
    } catch {
      setFormStatus(
        "Unable to open your email application. Please contact me directly."
      );
    }

    window.setTimeout(() => {
      setSubmitting(false);
    }, 2000);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="portfolio contact-page">
      <a className="skip-link" href="#contact-main">
        Skip to main content
      </a>

      {/* HEADER */}
      <header className="portfolio-header">
        <a
          className="portfolio-brand"
          href="/"
          aria-label="Aaditya Patil - Home"
        >
          AP<span>.</span>
        </a>

        <nav className="portfolio-nav" aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/education">Education</a>
          <a href="/skills">Skills</a>
          <a href="/#work">My Goals</a>
          <a href="/projects">Projects</a>
          <a className="active" href="/contact" aria-current="page">
            Contact
          </a>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main id="contact-main" className="contact-content">
        <button
          className="page-back-button"
          type="button"
          onClick={handleBack}
          aria-label="Go back to previous page"
        >
          <span aria-hidden="true">←</span>
          Back
        </button>

        {/* PAGE HEADING */}
        <section className="contact-heading">
          <p className="portfolio-eyebrow">HAVE AN IDEA?</p>

          <h1>
            Let's <span>Connect.</span>
          </h1>

          <p>
            Interested in a project, internship, or collaboration? Send me a
            message.
          </p>
        </section>

        {/* CONTACT LAYOUT */}
        <section
          className="contact-layout"
          aria-label="Contact information and message form"
        >
          {/* CONTACT INFORMATION */}
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

            <p
              className="contact-form-note"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {copyStatus}
            </p>
          </div>

          {/* CONTACT FORM */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {/* NAME */}
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
              <span className="contact-error" id="name-error" role="alert">
                {errors.name}
              </span>
            )}

            {/* EMAIL */}
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
              <span className="contact-error" id="email-error" role="alert">
                {errors.email}
              </span>
            )}

            {/* REASON */}
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

            {/* MESSAGE */}
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
                errors.message
                  ? "message-error message-counter"
                  : "message-counter"
              }
              required
            />

            {errors.message && (
              <span className="contact-error" id="message-error" role="alert">
                {errors.message}
              </span>
            )}

            {/* CHARACTER COUNTER */}
            <div
              className="contact-message-meta"
              id="message-counter"
              aria-live="polite"
              aria-atomic="true"
            >
              <span>
                {form.message.length} / {MAX_MESSAGE_LENGTH} characters
              </span>
            </div>

            {/* SUBMIT */}
            <button
              className="contact-submit-button"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Opening email..." : "Send message"}
              <span aria-hidden="true">↗</span>
            </button>

            <p
              className="contact-form-note"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {formStatus}
            </p>

            <p className="contact-form-note">
              Submitting opens your default email application with your message
              pre-filled.
            </p>
          </form>
        </section>

        {/* BACK HOME
        <div className="contact-home-action">
          <a className="page-back-button" href="/">
            ← Back to Home
          </a>
        </div>*/}
      </main>

      {/* FOOTER */}
      <footer className="portfolio-footer">
        <span>© {new Date().getFullYear()} Aaditya Patil</span>
        <a href="/">Back to home ↑</a>
      </footer>
    </div>
  );
}