// Centralized shared layout: header, industry strip, footer, dropdown behavior.
(function () {
  function getBasePath() {
    var path = window.location.pathname.replace(/\\/g, "/");
    if (
      path.indexOf("/industries/") !== -1 ||
      path.indexOf("/products/") !== -1 ||
      path.indexOf("/webdesign/") !== -1
    ) {
      return "../";
    }
    return "";
  }

  function buildHeader(base) {
    return `
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="container nav-wrap">
    <a class="brand" href="${base}/" aria-label="IT Squad LLC Home">
      <span class="brand-badge" aria-hidden="true">IT</span>
      <span class="brand-text">Squad</span>
    </a>

    <nav class="nav" aria-label="Primary">
      <a class="nav-link" href="${base}/">Home</a>
      <a class="nav-link" href="${base}contact">Contact</a>

      <details class="dropdown">
        <summary class="nav-link nav-link--dropdown">
          Services <span class="chev" aria-hidden="true">&#9662;</span>
        </summary>

        <div class="dropdown-panel" role="menu" aria-label="Services menu">
          <a role="menuitem" href="${base}services#managed-it">Managed IT</a>
          <a role="menuitem" href="${base}services#cybersecurity">Cybersecurity</a>
          <a role="menuitem" href="${base}services#microsoft-365">Microsoft 365</a>
          <a role="menuitem" href="${base}services#backup-dr">Backup &amp; DR</a>
          <a role="menuitem" href="${base}services#network-cabling">Network &amp; Cabling</a>
          <a role="menuitem" href="${base}services#ip-phones">IP Phones</a>
          <a role="menuitem" href="${base}services#security-cameras">Security Cameras</a>
          <a role="menuitem" href="${base}services#remote-work">Remote Work</a>
          <a role="menuitem" href="${base}services#hardware-software">Hardware &amp; Software</a>
        </div>
      </details>

      <details class="dropdown">
        <summary class="nav-link nav-link--dropdown">
          Products <span class="chev" aria-hidden="true">&#9662;</span>
        </summary>

        <div class="dropdown-panel" role="menu" aria-label="Products menu">
          <a role="menuitem" href="${base}products/servers">Servers</a>
          <a role="menuitem" href="${base}products/computers">Computers</a>
          <a role="menuitem" href="${base}products/printers">Printers</a>
          <a role="menuitem" href="${base}products/accessories">Computer Accessories</a>
        </div>
      </details>

      <details class="dropdown">
        <summary class="nav-link nav-link--dropdown">
          Web Design <span class="chev" aria-hidden="true">&#9662;</span>
        </summary>

        <div class="dropdown-panel" role="menu" aria-label="Web Design menu">
          <a role="menuitem" href="${base}webdesign/website-design">Website Design &amp; Development</a>
          <a role="menuitem" href="${base}webdesign/wordpress">WordPress Development</a>
          <a role="menuitem" href="${base}webdesign/mobile-app">Mobile App Development</a>
          <a role="menuitem" href="${base}webdesign/marketing">Digital Marketing &amp; Local SEO</a>
        </div>
      </details>
    </nav>
  </div>
</header>`;
  }

  function buildIndustryStrip(base) {
    return `
<section class="industry-strip">
  <div class="container">
    <h2 class="industry-title">Experience with real business environments</h2>
    <p class="industry-sub">
      We support teams that need compliance, uptime, and clear communication.
    </p>

    <div class="pill-row" aria-label="Industries we support">
      <a class="pill-chip" href="${base}industries/healthcare">Healthcare practices</a>
      <a class="pill-chip" href="${base}industries/law-offices">Law offices</a>
      <a class="pill-chip" href="${base}industries/professional-services">Professional services</a>
      <a class="pill-chip" href="${base}industries/small-business">Small business &amp; multi-site</a>
    </div>
  </div>
</section>`;
  }

  function buildFooter(base) {
    return `
<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <h4>IT Squad LLC</h4>
      <p class="footer-text">
        Managed IT services, cybersecurity, Microsoft 365 support, and web services for growing businesses.
      </p>
    </div>

    <div>
      <h4>Pages</h4>
      <ul class="footer-links">
        <li><a href="${base}/">Home</a></li>
        <li><a href="${base}services">Services</a></li>
        <li><a href="${base}aboutus">About Us</a></li>
        <li><a href="${base}contact">Contact</a></li>
      </ul>
    </div>

    <div>
      <h4>Contact</h4>
      <p class="footer-text">
        Phone: <a href="tel:+17036778636">(703) 677-8636</a><br>
        Email: <a href="mailto:info@itsquad-llc.com">info@itsquad-llc.com</a><br>
        Great Falls, VA
      </p>
    </div>
  </div>

  <div class="container footer-bottom">
    <div class="footer-rule"></div>
    <p class="copyright">
      &copy; <span id="year"></span> IT Squad LLC. All rights reserved.
    </p>
  </div>
</footer>`;
  }

  function injectSharedLayout() {
    var base = getBasePath();

    var header = document.getElementById("site-header");
    if (header) header.innerHTML = buildHeader(base);

    var industry = document.getElementById("industry-strip");
    if (industry) industry.innerHTML = buildIndustryStrip(base);

    var footer = document.getElementById("site-footer");
    if (footer) footer.innerHTML = buildFooter(base);
  }

  function injectLocalBusinessSchema() {
    if (document.getElementById("local-business-schema")) return;

    var schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "IT Squad LLC",
      url: "https://itsquad-llc.com/",
      telephone: "+17036778636",
      email: "info@itsquad-llc.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Great Falls",
        addressRegion: "VA",
        addressCountry: "US"
      },
      areaServed: ["Great Falls, VA", "Virginia", "United States"],
      description: "Managed IT services, cybersecurity, Microsoft 365 support, business technology products, and web design services."
    };

    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "local-business-schema";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  function setFooterYear() {
    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function setCurrentNav() {
    var currentPath = window.location.pathname.replace(/\\/g, "/");

    document.querySelectorAll(".nav-link[href]").forEach(function (link) {
      var linkPath = new URL(link.getAttribute("href"), window.location.href).pathname;
      if (
        linkPath === currentPath ||
        (currentPath.endsWith("/") && linkPath.endsWith("/index.html"))
      ) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function setupDropdowns() {
    document.querySelectorAll("details.dropdown").forEach(function (dropdown) {
      dropdown.addEventListener("toggle", function () {
        if (dropdown.open) {
          document.querySelectorAll("details.dropdown[open]").forEach(function (other) {
            if (other !== dropdown) other.removeAttribute("open");
          });
        }
      });
    });

    document.addEventListener("click", function (e) {
      document.querySelectorAll("details.dropdown[open]").forEach(function (dropdown) {
        if (!dropdown.contains(e.target)) dropdown.removeAttribute("open");
      });
    });

    document.querySelectorAll("details.dropdown a").forEach(function (link) {
      link.addEventListener("click", function () {
        var dropdown = link.closest("details.dropdown");
        if (dropdown) dropdown.removeAttribute("open");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.querySelectorAll("details.dropdown[open]").forEach(function (dropdown) {
          dropdown.removeAttribute("open");
        });
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectSharedLayout();
    injectLocalBusinessSchema();
    setFooterYear();
    setCurrentNav();
    setupDropdowns();
  });
})();
