
document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.getElementById("menu-button");
    const navbar = document.getElementById("navbar");

    const settingsButton = document.getElementById("settings-button");
    const settingsMenu = document.getElementById("settings-menu");
    const settingsContact = document.getElementById("settings-contact");

    const themeToggle = document.getElementById("theme-toggle");
    const year = document.getElementById("year");

    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    //settings
    if (menuButton && navbar) {
        menuButton.addEventListener("click", () => {
            const isOpen = navbar.classList.toggle("open");

            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            const icon = menuButton.querySelector("span");

            if (icon) {
                icon.textContent = isOpen ? "✕" : "☰";
            }
        });

        navbar.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navbar.classList.remove("open");

                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Open navigation");

                const icon = menuButton.querySelector("span");

                if (icon) {
                    icon.textContent = "☰";
                }
            });
        });
    }

    // SETTINGS DROPDOWN
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

        settingsMenu.addEventListener("click", (event) => {
            event.stopPropagation();
        });

        document.addEventListener("click", () => {
            closeSettings();
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && !settingsMenu.hidden) {
                closeSettings();
                settingsButton.focus();
            }
        });
    }

    if (settingsContact) {
        settingsContact.addEventListener("click", closeSettings);
    }

    // DARK AND LIGHT MODE
    function setTheme(lightMode) {
        document.body.classList.toggle("light-mode", lightMode);

        if (themeToggle) {
            themeToggle.setAttribute(
                "aria-checked",
                String(lightMode)
            );

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

    let savedTheme = "dark";

    try {
        savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    } catch (error) {
        // Use dark mode if browser storage is unavailable.
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
            } catch (error) {
                // The theme still changes for the current page.
            }
        });
    }

    const sections = document.querySelectorAll("main section[id]");

    const navLinks = navbar
        ? navbar.querySelectorAll('a[href^="#"]')
        : [];

    if ("IntersectionObserver" in window && navLinks.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        navLinks.forEach((link) => {
                            const isActive =
                                link.getAttribute("href") ===
                                "#" + entry.target.id;

                            link.classList.toggle("active", isActive);
                        });
                    }
                });
            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });
    }

    // CONTACT FORM SUBMISSION
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            // Prevent the page from refreshing.
            event.preventDefault();

            // Check that all required fields are valid.
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const successMessage =
                "Your message has been submitted!";

            // Display a message below the form.
            if (formStatus) {
                formStatus.textContent = successMessage;
            }

            // Display the confirmation alert.
            alert(successMessage);

            // Clear the form fields after submission.
            contactForm.reset();
        });
    } 

    // PROJECT LINKS
    document.querySelectorAll("[data-project-link]").forEach((link) => {
        link.addEventListener("click", (event) => {
            if (link.getAttribute("href") === "#") {
                event.preventDefault();

                const message =
                    "Replace this sample link with your actual project URL first.";

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

    console.log("Portfolio JavaScript loaded successfully.");
});
