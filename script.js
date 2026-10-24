console.log("Portfolio JavaScript loaded!");

// ===== HOME PAGE: CHANGE HEADING =====
const heading = document.getElementById("title");
const button = document.getElementById("changeBtn");

if (heading && button) {
  button.addEventListener("click", function () {
    if (heading.textContent.includes("Welcome to my Portfolio!")) {
      heading.textContent = "Hello, I am Aaditya Patil";
    } else {
      heading.textContent = "Welcome to my Portfolio!";
    }
  });
}

// ===== BACK TO TOP =====
const backtotop = document.getElementById("backtotop");

if (backtotop) {
  function updateBackToTop() {
    backtotop.style.display =
      window.scrollY > 300 ? "block" : "none";
  }

  window.addEventListener("scroll", updateBackToTop);
  updateBackToTop();

  backtotop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ===== HOME PAGE: ROTATING ROLE TEXT =====
const typingText = document.getElementById("typingText");

const roles = [
  "Computer Science Student",
  "Aspiring AI Engineer",
  "Web Developer",
];

let roleIndex = 0;

if (typingText) {
  setInterval(function () {
    roleIndex = (roleIndex + 1) % roles.length;
    typingText.textContent = roles[roleIndex];
  }, 2000);
}

// ===== ABOUT PAGE: READ MORE =====
const moreabout = document.getElementById("moreabout");
const readmorebtn = document.getElementById("readmorebtn");

if (moreabout && readmorebtn) {
  readmorebtn.addEventListener("click", function () {
    if (moreabout.hidden) {
      moreabout.hidden = false;
      readmorebtn.textContent = "Read Less";
      readmorebtn.setAttribute("aria-expanded", "true");
    } else {
      moreabout.hidden = true;
      readmorebtn.textContent = "Read More";
      readmorebtn.setAttribute("aria-expanded", "false");
    }
  });
}

// ===== ABOUT PAGE: MY JOURNEY =====
const journeybtn = document.getElementById("journeybtn");
const journey = document.querySelectorAll(".journey");

if (journeybtn && journey.length > 0) {
  journeybtn.addEventListener("click", function () {
    const isHidden = journey[0].hidden;

    journey.forEach(function (paragraph) {
      paragraph.hidden = !isHidden;
    });

    journeybtn.textContent = isHidden
      ? "Hide My Journey"
      : "Show My Journey";
    journeybtn.setAttribute("aria-expanded", String(isHidden));
  });
}

// ===== ABOUT PAGE: STATS REVEAL =====
const statsSection = document.querySelector(".stats-reveal");

if (statsSection) {
  if ("IntersectionObserver" in window) {
    const statsObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("show-stats");
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    statsObserver.observe(statsSection);
  } else {
    statsSection.classList.add("show-stats");
  }
}

// ===== EDUCATION PAGE: SHOW MORE =====
const educationExtra = document.getElementById("educationExtra");
const educationBtn = document.getElementById("educationBtn");

if (educationExtra && educationBtn) {
  educationBtn.addEventListener("click", function () {
    if (educationExtra.hidden) {
      educationExtra.hidden = false;
      educationBtn.textContent = "Show Less";
      educationBtn.setAttribute("aria-expanded", "true");
    } else {
      educationExtra.hidden = true;
      educationBtn.textContent = "Show More";
      educationBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// ===== EDUCATION PAGE: TIMELINE REVEAL =====
const educationTimeline = document.querySelector(".education-timeline");

if (educationTimeline) {
  const educationItems =
    educationTimeline.querySelectorAll(".timeline-item");

  if ("IntersectionObserver" in window) {
    const educationObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("show-education");
            educationObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    educationItems.forEach(function (item) {
      educationObserver.observe(item);
    });
  } else {
    educationItems.forEach(function (item) {
      item.classList.add("show-education");
    });
  }
}

// ===== SKILLS PAGE FEATURES =====
const skillGrid = document.getElementById("skillGrid");

if (skillGrid) {
  const searchInput = document.getElementById("skillSearch");
  const filterButtons = document.querySelectorAll(".skill-filter");
  const categories = document.querySelectorAll(".skill-category");
  const skillCount = document.getElementById("skillCount");
  const noSkills = document.getElementById("noSkills");

  let activeFilter = "all";

  function updateSkills() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    let visibleSkills = 0;

    categories.forEach(function (category) {
      const categoryMatches =
        activeFilter === "all" ||
        category.dataset.category === activeFilter;

      const skillItems = category.querySelectorAll(".skill-item");
      let visibleInCategory = 0;

      skillItems.forEach(function (item) {
        const skillName =
          item.querySelector("span").textContent.toLowerCase();

        const matchesSearch = skillName.includes(searchTerm);
        const shouldShow = categoryMatches && matchesSearch;

        item.hidden = !shouldShow;

        if (shouldShow) {
          visibleInCategory++;
          visibleSkills++;
        }
      });

      category.hidden = visibleInCategory === 0;
    });

    skillCount.textContent =
      "Showing " +
      visibleSkills +
      (visibleSkills === 1 ? " skill" : " skills");

    noSkills.hidden = visibleSkills !== 0;
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activeFilter = button.dataset.filter;

      filterButtons.forEach(function (filterButton) {
        const isActive = filterButton === button;

        filterButton.classList.toggle("active", isActive);
        filterButton.setAttribute(
          "aria-pressed",
          String(isActive)
        );
      });

      updateSkills();
    });
  });

  searchInput.addEventListener("input", updateSkills);

  if ("IntersectionObserver" in window) {
    const skillObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("show-skill");
            skillObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    categories.forEach(function (category) {
      skillObserver.observe(category);
    });
  } else {
    categories.forEach(function (category) {
      category.classList.add("show-skill");
    });
  }

  updateSkills();
}

// ===== PROJECTS PAGE FEATURES =====
const projectExplorer = document.querySelector(".project-explorer");

if (projectExplorer) {
  const projectSearch = document.getElementById("projectSearch");
  const projectFilters = document.querySelectorAll(".project-filter");
  const projectCards = document.querySelectorAll(".project-reveal");
  const projectCount = document.getElementById("projectCount");
  const noProjects = document.getElementById("noProjects");
  const toggleAllProjects =
    document.getElementById("toggleAllProjects");

  let activeProjectFilter = "all";

  // Search projects and filter by category
  function updateProjects() {
    const searchTerm = projectSearch.value.trim().toLowerCase();
    let visibleProjects = 0;

    projectCards.forEach(function (card) {
      const categoryMatches =
        activeProjectFilter === "all" ||
        card.dataset.projectCategory === activeProjectFilter;

      const textMatches =
        card.textContent.toLowerCase().includes(searchTerm);

      const shouldShow = categoryMatches && textMatches;

      card.hidden = !shouldShow;

      if (shouldShow) {
        visibleProjects++;
      }
    });

    projectCount.textContent =
      "Showing " +
      visibleProjects +
      (visibleProjects === 1 ? " project" : " projects");

    noProjects.hidden = visibleProjects !== 0;

    if (toggleAllProjects) {
      toggleAllProjects.disabled = visibleProjects === 0;
      toggleAllProjects.textContent = "Expand All";
    }
  }

  // Project filter buttons
  projectFilters.forEach(function (button) {
    button.addEventListener("click", function () {
      activeProjectFilter = button.dataset.filter;

      projectFilters.forEach(function (filterButton) {
        const isActive = filterButton === button;

        filterButton.classList.toggle("active", isActive);
        filterButton.setAttribute(
          "aria-pressed",
          String(isActive)
        );
      });

      updateProjects();
    });
  });

  // Live project search
  projectSearch.addEventListener("input", updateProjects);

  // Expand or collapse all visible projects
  if (toggleAllProjects) {
    toggleAllProjects.addEventListener("click", function () {
      const visibleCards = Array.from(projectCards).filter(
        function (card) {
          return !card.hidden;
        }
      );

      const shouldExpand = visibleCards.some(function (card) {
        const details = card.querySelector("details");
        return details && !details.open;
      });

      visibleCards.forEach(function (card) {
        const details = card.querySelector("details");

        if (details) {
          details.open = shouldExpand;
        }
      });

      toggleAllProjects.textContent = shouldExpand
        ? "Collapse All"
        : "Expand All";
    });
  }

  // Reveal project cards on scroll
  if ("IntersectionObserver" in window) {
    const projectObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            projectObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    projectCards.forEach(function (card) {
      projectObserver.observe(card);
    });
  } else {
    projectCards.forEach(function (card) {
      card.classList.add("is-visible");
    });
  }

  updateProjects();
}


/* =========================================
   CONTACT PAGE FEATURES
========================================= */

(function () {
  const contactForm = document.getElementById("contactForm");

  // Do nothing on pages other than contact.html.
  if (!contactForm) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const reasonInput = document.getElementById("reason");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  const messageCounter = document.getElementById("messageCounter");
  const formStatus = document.getElementById("formStatus");
  const sendMessageBtn = document.getElementById("sendMessageBtn");

  const copyEmailBtn = document.getElementById("copyEmailBtn");
  const copyEmailStatus = document.getElementById("copyEmailStatus");

  const contactEmail = "patilaaditya0005@gmail.com";

  // Show validation feedback for a field.
  function showFieldError(input, errorElement, message) {
    errorElement.textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");

    if (message) {
      input.setAttribute("aria-describedby", errorElement.id);
    } else {
      input.removeAttribute("aria-describedby");
    }
  }

  // Validate the name.
  function validateName() {
    const value = nameInput.value.trim();
    let error = "";

    if (!value) {
      error = "Please enter your name.";
    } else if (value.length < 2) {
      error = "Name must contain at least 2 characters.";
    } else if (value.length > 80) {
      error = "Name cannot exceed 80 characters.";
    }

    showFieldError(nameInput, nameError, error);
    return !error;
  }

  // Validate the email.
  function validateEmail() {
    const value = emailInput.value.trim();
    let error = "";

    if (!value) {
      error = "Please enter your email address.";
    } else if (
      value.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      error = "Please enter a valid email address.";
    }

    showFieldError(emailInput, emailError, error);
    return !error;
  }

  // Validate the message.
  function validateMessage() {
    const value = messageInput.value.trim();
    let error = "";

    if (!value) {
      error = "Please enter a message.";
    } else if (value.length < 10) {
      error = "Your message must contain at least 10 characters.";
    } else if (value.length > 1000) {
      error = "Your message cannot exceed 1000 characters.";
    }

    showFieldError(messageInput, messageError, error);
    return !error;
  }

  // Update the live message character counter.
  function updateMessageCounter() {
    const count = messageInput.value.length;

    messageCounter.textContent = count + " / 1000 characters";

    messageCounter.classList.toggle("counter-limit", count >= 900);
  }

  messageInput.addEventListener("input", function () {
    updateMessageCounter();

    if (messageInput.getAttribute("aria-invalid") === "true") {
      validateMessage();
    }
  });

  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);
  messageInput.addEventListener("blur", validateMessage);

  // Clear the relevant error while the user corrects the field.
  nameInput.addEventListener("input", function () {
    if (nameInput.getAttribute("aria-invalid") === "true") {
      validateName();
    }
  });

  emailInput.addEventListener("input", function () {
    if (emailInput.getAttribute("aria-invalid") === "true") {
      validateEmail();
    }
  });

  // Handle form submission.
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    formStatus.textContent = "";
    formStatus.classList.remove("status-success", "status-error");

    const nameIsValid = validateName();
    const emailIsValid = validateEmail();
    const messageIsValid = validateMessage();

    if (!nameIsValid || !emailIsValid || !messageIsValid) {
      formStatus.textContent = "Please correct the errors above.";
      formStatus.classList.add("status-error");

      const firstInvalidField = contactForm.querySelector(
        '[aria-invalid="true"]'
      );

      if (firstInvalidField) {
        firstInvalidField.focus();
      }

      return;
    }

    // Build an email draft. This does not send an email automatically.
    const subject = encodeURIComponent(
      "Portfolio Contact: " + reasonInput.value
    );

    const body = encodeURIComponent(
      "Name: " + nameInput.value.trim() + "\n" +
      "Email: " + emailInput.value.trim() + "\n" +
      "Reason: " + reasonInput.value + "\n\n" +
      "Message:\n" + messageInput.value.trim()
    );

    const mailtoURL =
      "mailto:" + contactEmail +
      "?subject=" + subject +
      "&body=" + body;

    formStatus.textContent =
      "Your email draft is being prepared. Please send it from your email app.";
    formStatus.classList.add("status-success");

    sendMessageBtn.disabled = true;
    sendMessageBtn.textContent = "Opening email app...";

    // Give the browser a chance to open the user's email application.
    window.location.href = mailtoURL;

    window.setTimeout(function () {
      sendMessageBtn.disabled = false;
      sendMessageBtn.innerHTML = 'Send message <span>&nearrow;</span>';
    }, 1500);
  });

  // Copy the email address to the clipboard.
  copyEmailBtn.addEventListener("click", async function () {
    copyEmailStatus.textContent = "";

    try {
      if (!navigator.clipboard || !window.isSecureContext) {
        throw new Error("Clipboard access unavailable");
      }

      await navigator.clipboard.writeText(contactEmail);

      copyEmailStatus.textContent = "Email address copied!";
      copyEmailStatus.classList.add("status-success");
      copyEmailStatus.classList.remove("status-error");
    } catch (error) {
      // Fallback for browsers where Clipboard API is unavailable.
      const temporaryInput = document.createElement("textarea");
      temporaryInput.value = contactEmail;
      temporaryInput.setAttribute("readonly", "");
      temporaryInput.style.position = "fixed";
      temporaryInput.style.opacity = "0";

      document.body.appendChild(temporaryInput);
      temporaryInput.select();

      let copied = false;

      try {
        copied = document.execCommand("copy");
      } catch (copyError) {
        copied = false;
      }

      temporaryInput.remove();

      if (copied) {
        copyEmailStatus.textContent = "Email address copied!";
        copyEmailStatus.classList.add("status-success");
        copyEmailStatus.classList.remove("status-error");
      } else {
        copyEmailStatus.textContent =
          "Copy failed. Please copy: " + contactEmail;
        copyEmailStatus.classList.add("status-error");
        copyEmailStatus.classList.remove("status-success");
      }
    }
  });

  // Contact page entrance animations.
  const revealElements = document.querySelectorAll(".contact-reveal");

  if ("IntersectionObserver" in window) {
    const contactObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("contact-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach(function (element) {
      contactObserver.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("contact-visible");
    });
  }

  // Initialize the counter.
  updateMessageCounter();
})();
