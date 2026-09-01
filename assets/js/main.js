// Mealnova static site — minimal vanilla JS.
(function () {
  "use strict";

  // GA4 lead tracking — safe no-op if analytics is blocked or absent
  function track(name, params) {
    if (typeof window.gtag === "function") window.gtag("event", name, params || {});
  }

  // Sticky header border on scroll
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Language dropdown — native <details>, just close on outside click / Escape
  var langD = document.querySelector("details.lang");
  if (langD) {
    document.addEventListener("click", function (e) {
      if (!e.target.closest("details.lang")) langD.open = false;
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") langD.open = false;
    });
  }

  // Enquiry form → opens WhatsApp with details prefilled (no backend needed)
  var form = document.getElementById("enquiry-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form.elements;
      var g = function (n) { return f[n] && f[n].value ? f[n].value : "-"; };
      var lines = [
        "New catering enquiry — Mealnova",
        "Name: " + g("name"),
        "Company: " + g("company"),
        "Type: " + g("type"),
        "Guests / meals: " + g("count"),
        "Date: " + g("date"),
        "Details: " + g("message")
      ];
      var wa = form.getAttribute("data-wa") || "917733727832";
      track("generate_lead", { method: "whatsapp_form", lead_type: g("type") });
      window.open("https://wa.me/" + wa + "?text=" + encodeURIComponent(lines.join("\n")), "_blank");
    });
  }

  // Lead tracking on WhatsApp / phone-call links (GA4 conversion)
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    var href = a.getAttribute("href") || "";
    if (href.indexOf("wa.me") !== -1 || href.indexOf("whatsapp.com") !== -1) {
      track("generate_lead", { method: "whatsapp_click" });
    } else if (href.indexOf("tel:") === 0) {
      track("generate_lead", { method: "phone_call" });
    }
  });

  // Scroll reveal
  var revealables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealables.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("in"); });
  }
})();
