// Research / Industry view switch.
// The first paint already has the right view (inline script in <head>);
// this file wires the buttons, remembers the choice and keeps the URL shareable.
(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll("[data-set-view]");

  function sync(view) {
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-set-view") === view));
    });
  }

  function setView(view) {
    if (view !== "research" && view !== "industry") return;
    root.setAttribute("data-view", view);
    sync(view);
    try { localStorage.setItem("ll-view", view); } catch (e) {}
    try {
      var url = new URL(window.location.href);
      url.searchParams.set("view", view);
      history.replaceState(null, "", url.pathname + url.search + url.hash);
    } catch (e) {}
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { setView(b.getAttribute("data-set-view")); });
  });

  sync(root.getAttribute("data-view") || "research");
})();
