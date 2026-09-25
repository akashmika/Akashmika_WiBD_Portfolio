// Mobile navigation toggle and current-section highlight.
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  function closeNav() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Menu";
  }

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  });

  // Close the menu after choosing a link or pressing Escape.
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeNav();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      closeNav();
      toggle.focus();
    }
  });

  // Mark the nav link for the section currently in view.
  if (!("IntersectionObserver" in window)) return;
  var links = nav.querySelectorAll('a[href^="#"]');
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (a) { a.removeAttribute("aria-current"); });
      var link = byId[entry.target.id];
      if (link) link.setAttribute("aria-current", "true");
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  Object.keys(byId).forEach(function (id) {
    var section = document.getElementById(id);
    if (section) observer.observe(section);
  });
})();
