document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-button");
    const navbar = document.getElementById("navbar");
    const settingsButton = document.getElementById("settings-button");
    const settingsMenu = document.getElementById("settings-menu");
    const themeToggle = document.getElementById("theme-toggle");
    const languageSelect = document.getElementById("language-select");
    const settingsContact = document.getElementById("settings-contact");
    const year = document.getElementById("year");
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Setting menu
    if (menuButton && navbar) {
        menuButton.addEventListener("click", () => {
            const isOpen = navbar.classList.toggle("open");

            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            const menuIcon = menuButton.querySelector("span");
            if (menuIcon) {
                menuIcon.textContent = isOpen ? "✕" : "☰";
            }
        });

        navbar.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navbar.classList.remove("open");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Open navigation");

                const menuIcon = menuButton.querySelector("span");
                if (menuIcon) {
                    menuIcon.textContent = "☰";
                }
            });
        });
    }

    function closeSettings() {
        if (!settingsMenu || !settingsButton) return;

        settingsMenu.hidden = true;
        settingsButton.setAttribute("aria-expanded", "false");
    }

    if (settingsButton && settingsMenu) {
        settingsButton.addEventListener("click", (event) => {
            event.stopPropagation();

            const willOpen = settingsMenu.hidden;
            settingsMenu.hidden = !willOpen;

            settingsButton.setAttribute(
                "aria-expanded",
                String(willOpen)
            );
        });

        document.addEventListener("click", (event) => {
            if (
                !settingsMenu.contains(event.target) &&
                !settingsButton.contains(event.target)
            ) {
                closeSettings();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeSettings();
                settingsButton.focus();
            }
        });
    }

    // Dark/light mode. Dark mode is the default.
    function setTheme(lightMode) {
        document.body.classList.toggle("light-mode", lightMode);

        if (themeToggle) {
            themeToggle.setAttribute("aria-checked", String(lightMode));
            themeToggle.setAttribute(
                "aria-label",
                lightMode ? "Switch to dark mode" : "Switch to light mode"
            );
        }

        const themeColor = document.querySelector(
            'meta[name="theme-color"]'
        );

        if (themeColor) {
            themeColor.setAttribute(
                "content",
                lightMode ? "#F5F7FF" : "#080F26"
            );
        }
    }

    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem("portfolio-theme");
    } catch (_) {
        // The website still works if storage is disabled.
    }

    setTheme(savedTheme === "light");

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const lightMode =
                !document.body.classList.contains("light-mode");

            setTheme(lightMode);

            try {
                localStorage.setItem(
                    "portfolio-theme",
                    lightMode ? "light" : "dark"
                );
            } catch (_) {
                // Theme still changes for this page view.
            }
        });
    }

        if (themeToggle) {
            themeToggle.setAttribute(
                "aria-label",
                "Toggle light or dark mode"
            );
        }

        try {
            localStorage.setItem("portfolio-language", "en");
        } catch (_) {
            // English remains active for this page view.
        }
    }

    setLanguage();

    if (settingsContact) {
        settingsContact.addEventListener("click", closeSettings);
    }

    // Highlight the navigation link for the visible section
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = navbar
        ? navbar.querySelectorAll('a[href^="#"]')
        : [];

    if ("IntersectionObserver" in window && navLinks.length) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        navLinks.forEach((link) => {
                            const active =
                                link.getAttribute("href") ===
                                "#" + entry.target.id;

                            link.classList.toggle("active", active);
                        });
                    }
                });
            },
            { rootMargin: "-35% 0px -55% 0px" }
        );

        sections.forEach((section) => observer.observe(section));
    }

    // Contact 
if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        alert("Your message has been submitted.");

        contactForm.reset();

        if (formStatus) {
            formStatus.textContent =
                "Your message has been submitted.";
        }
    });
}

    // Warn about placeholder project links
    document.querySelectorAll("[data-project-link]").forEach((link) => {
        link.addEventListener("click", (event) => {
            if (link.getAttribute("href") === "#") {
                event.preventDefault();

                const message =
"";
                if (formStatus) {
                    formStatus.textContent = message;
                    formStatus.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    });
                } else {
                    alert(message);
                }
            }
        });
    });
});
