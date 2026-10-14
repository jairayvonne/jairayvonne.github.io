
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

    if (year) year.textContent = new Date().getFullYear();

    // Mobile navigation menu
    if (menuButton && navbar) {
        menuButton.addEventListener("click", () => {
            const isOpen = navbar.classList.toggle("open");
            menuButton.setAttribute("aria-expanded", String(isOpen));form

            menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
            menuButton.querySelector("span").textContent = isOpen ? "✕" : "☰";
        });

        navbar.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navbar.classList.remove("open");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Open navigation");
                menuButton.querySelector("span").textContent = "☰";
            });
        });
    }

    // Settings dropdown
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
            settingsButton.setAttribute("aria-expanded", String(willOpen));
        });

        document.addEventListener("click", (event) => {
            if (!settingsMenu.contains(event.target) && !settingsButton.contains(event.target)) {
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
            themeToggle.setAttribute("aria-label", lightMode ? "Switch to dark mode" : "Switch to light mode");
        }
        const themeColor = document.querySelector('meta[name="theme-color"]');
        if (themeColor) themeColor.setAttribute("content", lightMode ? "#F5F7FF" : "#080F26");
    }

    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem("portfolio-theme");
    } catch (_) {
        // Storage may be disabled; the site still works without it.
    }
    setTheme(savedTheme === "light");

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const lightMode = !document.body.classList.contains("light-mode");
            setTheme(lightMode);
            try {
                localStorage.setItem("portfolio-theme", lightMode ? "light" : "dark");
            } catch (_) {
                // Theme still changes for this page view.
            }
        });
    }

    // English and Filipino text. English is the initial language.
    const translations = {
        en: {
            siteTitle: "My Personal Portfolio", navHome: "Home", navAbout: "About",
            navSkills: "Skills", navProjects: "Projects", navContact: "Contact",
            settingsTitle: "Website Settings", languageLabel: "Language", themeLabel: "Light mode",
            contactShortcut: "Send a message", heroEyebrow: "HELLO, WELCOME TO MY PORTFOLIO",
            heroIntro: "Hi, I'm", heroCourse: "BS in Information Technology",
            heroDescription: "I am an IT student who enjoys learning about technology, designing websites, and developing my programming skills.",
            heroButton: "Explore My Projects", aboutEyebrow: "GET TO KNOW ME",
            aboutTitle: 'About <span class="accent-text">Me</span>',
            aboutIntro: "My journey, goals, and the things that keep me inspired.",
            storyTitle: "My IT Journey",
            storyText: "I chose Information Technology because I am curious about how technology works and how websites and applications are created. IT is important because it helps people communicate, learn, solve problems, and make everyday tasks easier. I want to use what I learn to create useful and accessible digital solutions.",
            educationTitle: "Educational Background", primaryLabel: "Primary:", secondaryLabel: "Secondary:",
            tertiaryLabel: "College:", courseLabel: "Program:", yearLabel: "Year Level:",
            goalsTitle: "My Goals",
            goalsText: "My goal is to become a capable IT professional who can build helpful websites and applications and keep learning as technology changes.",
                hobbiesTitle: "My Hobbies", hobbyGaming: "Mobile gaming", hobbyCooking: "Cooking", hobbyDrama: "Watching K-dramas",
            skillsEyebrow: "WHAT I AM LEARNING", skillsTitle: "My Skills",
            skillsIntro: "Skills and tools I am practicing through classes and personal projects.",
            htmlText: "Building the structure of web pages.", cssText: "Styling websites and creating responsive layouts.",
            jsText: "Adding interaction and functionality to websites.", javaText: "Practicing programming logic and problem-solving.",
            projectsEyebrow: "MY WORK", projectsTitle: 'My <span class="accent-text">Projects</span>',
            projectsIntro: "A selection of projects I have made or am developing. Replace the sample links with your own files and repositories.",
            projectOneLabel: "PROJECT 01", projectOneTitle: "Personal Portfolio Website",
            projectOneText: "A responsive website introducing my background, skills, hobbies, and projects.",
            projectTwoLabel: "PROJECT 02", projectTwoTitle: "Food Ordering App Prototype",
            projectTwoText: "A sample food ordering interface designed to make browsing menu items and choosing orders easier.",
            projectThreeLabel: "PROJECT 03", projectThreeTitle: "Java Programming Exercises",
            projectThreeText: "A collection of beginner Java programs for practicing logic, loops, input, and output.",
            liveDemo: "Live Demo", sourceCode: "Source Code", downloadFiles: "Download files", viewProject: "View Project",
            
            contactEyebrow: "LET'S CONNECT", contactTitle: 'Contact <span class="accent-text">Me</span>',
            contactIntro: "Feel free to contact me for questions, collaboration, or opportunities related to Information Technology.",
            locationText: "Bambang, Nueva Vizcaya, Philippines",
            privacyNote: "Tip: consider showing only your municipality and province on a public website.",
            nameLabel: "Your Name", emailLabel: "Your Email", messageLabel: "Message",
            namePlaceholder: "Enter your name", emailPlaceholder: "Enter your email",
            messagePlaceholder: "Write your message here...", sendMessage: "Send Message",
            formSetupNote: "Your message has been submitted",
            footerText: "| Information Technology Student", backToTop: "Back to top ↑",
            formNotConfigured: "Your message has been submitted."
        },
        fil: {
            siteTitle: "Aking Personal na Portfolio", navHome: "Home", navAbout: "Tungkol sa Akin",
            navSkills: "Mga Kasanayan", navProjects: "Mga Proyekto", navContact: "Kontak",
            settingsTitle: "Mga Setting ng Website", languageLabel: "Wika", themeLabel: "Light mode",
            contactShortcut: "Magpadala ng mensahe", heroEyebrow: "KUMUSTA, MALIGAYANG PAGDATING SA AKING PORTFOLIO",
            heroIntro: "Ako si", heroCourse: "BS sa Information Technology",
            heroDescription: "Isa akong estudyante ng IT na gustong matuto tungkol sa teknolohiya, paggawa ng website, at programming.",
            heroButton: "Tingnan ang Aking mga Proyekto", aboutEyebrow: "KILALANIN AKO",
            aboutTitle: 'Tungkol sa <span class="accent-text">Akin</span>',
            aboutIntro: "Ang aking paglalakbay, mga layunin, at mga bagay na nagbibigay-inspirasyon sa akin.",
            storyTitle: "Ang Aking Paglalakbay sa IT",
            storyText: "Pinili ko ang Information Technology dahil interesado akong malaman kung paano gumagana ang teknolohiya at kung paano ginagawa ang mga website at application. Mahalaga ang IT dahil nakatutulong ito sa komunikasyon, pag-aaral, paglutas ng problema, at pagpapadali ng mga gawain. Gusto kong gamitin ang aking natututuhan upang makagawa ng mga kapaki-pakinabang at madaling gamitin na digital solution.",
            educationTitle: "Pinag-aralan", primaryLabel: "Primarya:", secondaryLabel: "Sekondarya:",
            tertiaryLabel: "Kolehiyo:", courseLabel: "Programa:", yearLabel: "Taon:",
            goalsTitle: "Aking mga Layunin",
            goalsText: "Layunin kong maging mahusay na IT professional na makagagawa ng kapaki-pakinabang na website at application at patuloy na matututo habang nagbabago ang teknolohiya.",
            stepsTitle: "Paano Ko Inaabot ang mga Layunin Ko",
            stepsText: "Nagsasanay ako sa coding, gumagawa ng mga proyekto sa paaralan, natututo mula sa tutorials, nagtatanong kapag kailangan, at pinagbubuti ang aking gawa sa pamamagitan ng feedback at pagsasanay.",
            hobbiesTitle: "Aking mga Libangan", hobbyGaming: "Mobile games", hobbyCooking: "Pagluluto", hobbyDrama: "Panonood ng K-drama",
            skillsEyebrow: "MGA TINUTUKLASAN KO", skillsTitle: "Aking mga Kasanayan",
            skillsIntro: "Mga kasanayan at tool na pinag-aaralan ko sa klase at sa mga personal na proyekto.",
            htmlText: "Pagbuo ng istruktura ng mga web page.", cssText: "Pagdidisenyo ng website at paggawa ng responsive na layout.",
            jsText: "Pagdaragdag ng interaksiyon at mga function sa website.", javaText: "Pagsasanay sa programming logic at paglutas ng problema.",
            projectsEyebrow: "AKING MGA GAWA", projectsTitle: 'Aking mga <span class="accent-text">Proyekto</span>',
            projectsIntro: "Ilan sa mga proyektong nagawa ko o kasalukuyang ginagawa. Palitan ang mga sample link ng sarili mong files at repository.",
            projectOneLabel: "PROYEKTO 01", projectOneTitle: "Personal Portfolio Website",
            projectOneText: "Responsive na website na nagpapakilala sa aking background, kasanayan, libangan, at mga proyekto.",
            projectTwoLabel: "PROYEKTO 02", projectTwoTitle: "Food Ordering App Prototype",
            projectTwoText: "Halimbawang interface para mas madaling mag-browse ng menu at pumili ng pagkain.",
            projectThreeLabel: "PROYEKTO 03", projectThreeTitle: "Java Programming Exercises",
            projectThreeText: "Koleksiyon ng mga beginner Java program para magsanay sa logic, loops, input, at output.",
            liveDemo: "Live Demo", sourceCode: "Source Code", downloadFiles: "I-download ang files", viewProject: "Tingnan ang Proyekto",
            projectNote: "Bago i-publish, palitan ang mga sample # link at idagdag ang sarili mong ZIP files. Kailangang may totoong file o URL ang bawat link.",
            contactEyebrow: "MAKIPAG-UGNAYAN", contactTitle: 'Makipag-ugnayan sa <span class="accent-text">Akin</span>',
            contactIntro: "Maaari kang makipag-ugnayan sa akin para sa mga tanong, kolaborasyon, o oportunidad na may kaugnayan sa Information Technology.",
            locationText: "Bambang, Nueva Vizcaya, Pilipinas",
            privacyNote: "Paalala: mas ligtas na bayan at probinsiya lamang ang ilagay sa pampublikong website.",
            nameLabel: "Pangalan", emailLabel: "Email", messageLabel: "Mensahe",
            namePlaceholder: "Ilagay ang iyong pangalan", emailPlaceholder: "Ilagay ang iyong email",
            messagePlaceholder: "Isulat ang iyong mensahe...", sendMessage: "Ipadala ang Mensahe",
            formSetupNote: "Kailangan ng setup: ikonekta ang form sa isang form service bago i-publish. Hindi ito makakapagpadala hangga't hindi naka-configure.",
            footerText: "| Estudyante ng Information Technology", backToTop: "Bumalik sa itaas ↑",
            formNotConfigured: "Hindi pa nakakonekta ang form na ito. Gamitin muna ang email link o ikonekta ito sa isang form service bago i-publish."
        }
    };

    function setLanguage(language) {
        const dictionary = translations[language] || translations.en;
        document.documentElement.lang = language === "fil" ? "fil" : "en";

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.dataset.i18n;
            if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
                // Only authored translation strings are inserted as HTML for the two headings
                // that contain a styled span. All other translated content is plain text.
                if (key === "aboutTitle" || key === "projectsTitle" || key === "contactTitle") {
                    element.innerHTML = dictionary[key];
                } else {
                    element.textContent = dictionary[key];
                }
            }
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
            const key = element.dataset.i18nPlaceholder;
            if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
                element.placeholder = dictionary[key];
            }
        });

        if (themeToggle) {
            themeToggle.setAttribute("aria-label", language === "fil" ? "Palitan ang light o dark mode" : "Toggle light or dark mode");
        }
        if (languageSelect) languageSelect.value = language;
        try { localStorage.setItem("portfolio-language", language); } catch (_) {}
    }

    let savedLanguage = "en";
    try { savedLanguage = localStorage.getItem("portfolio-language") || "en"; } catch (_) {}
    if (languageSelect) {
        languageSelect.value = savedLanguage;
        languageSelect.addEventListener("change", () => setLanguage(languageSelect.value));
    }
    setLanguage(savedLanguage);

    if (settingsContact) settingsContact.addEventListener("click", closeSettings);

    // Highlight the navigation link for the section currently in view.
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = navbar ? navbar.querySelectorAll('a[href^="#"]') : [];
    if ("IntersectionObserver" in window && navLinks.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navLinks.forEach((link) => {
                        const active = link.getAttribute("href") === "#" + entry.target.id;
                        link.classList.toggle("active", active);
                    });
                }
            });
        }, { rootMargin: "-35% 0px -55% 0px" });
        sections.forEach((section) => observer.observe(section));
    }

    // Contact form: intentionally does not pretend to send.
    // Configure a form endpoint (e.g. Formspree or your own backend) before going live.
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const language = languageSelect ? languageSelect.value : "en";
            formStatus.textContent = translations[language].formNotConfigured;
            formStatus.focus?.();
        });
    }

    // Placeholder project links must be replaced before publishing.
    document.querySelectorAll("[data-project-link]").forEach((link) => {
        link.addEventListener("click", (event) => {
            if (link.getAttribute("href") === "#") {
                event.preventDefault();
                const language = languageSelect ? languageSelect.value : "en";
                if (formStatus) {
                    formStatus.textContent = language === "fil"
                        ? "Palitan muna ang sample link na ito ng totoong project URL."
                        : "Replace this sample link with your actual project URL first.";
                    formStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
                } else {
                    alert(language === "fil"
                        ? "Palitan muna ang sample link na ito ng totoong project URL."
                        : "Replace this sample link with your actual project URL first.");
                }
            }
        });
    });
});
