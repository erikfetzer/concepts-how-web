/* concepts.how theme picker: light / dark / system.
   Pages render dark from prefers-color-scheme unless <html data-theme="light|dark"> overrides it.
   An inline snippet in each <head> applies the saved choice before first paint. */
(function () {
  var KEY = "theme";
  var root = document.documentElement;
  var mq = window.matchMedia ? matchMedia("(prefers-color-scheme: dark)") : null;

  function saved() { try { var t = localStorage.getItem(KEY); return t === "light" || t === "dark" ? t : "system"; } catch (e) { return "system"; } }
  function store(t) { try { t === "system" ? localStorage.removeItem(KEY) : localStorage.setItem(KEY, t); } catch (e) {} }
  function effective(t) { return t === "system" ? (mq && mq.matches ? "dark" : "light") : t; }

  function apply(t) {
    if (t === "system") root.removeAttribute("data-theme"); else root.setAttribute("data-theme", t);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", effective(t) === "dark" ? "#0A0F17" : "#0E1A2B");
    document.querySelectorAll(".tp button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.t === t ? "true" : "false"); });
    window.dispatchEvent(new CustomEvent("themechange", { detail: { theme: t, effective: effective(t) } }));
  }

  var css = ".tp{display:inline-flex;gap:2px;padding:3px;border:1px solid var(--line);border-radius:999px;background:var(--card)}" +
    ".tp button{display:grid;place-items:center;width:32px;height:32px;border:0;border-radius:999px;background:transparent;color:var(--muted);cursor:pointer;padding:0}" +
    ".tp button:hover{color:var(--ink)}" +
    ".tp button[aria-pressed=true]{background:var(--ink);color:var(--paper)}" +
    ".tp button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}" +
    ".tp svg{width:16px;height:16px}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var icons = {
    light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    dark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    system: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>'
  };
  var labels = { light: "Light theme", dark: "Dark theme", system: "Match system theme" };

  function build(el) {
    el.className = (el.className ? el.className + " " : "") + "tp";
    el.setAttribute("role", "group");
    el.setAttribute("aria-label", "Color theme");
    el.innerHTML = ["light", "dark", "system"].map(function (t) {
      return '<button type="button" data-t="' + t + '" aria-label="' + labels[t] + '" title="' + labels[t] + '">' + icons[t] + "</button>";
    }).join("");
    el.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-t]"); if (!b) return;
      store(b.dataset.t); apply(b.dataset.t);
    });
  }

  function init() {
    document.querySelectorAll("[data-theme-picker]").forEach(build);
    apply(saved());
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();

  if (mq) {
    var onSys = function () { if (saved() === "system") apply("system"); };
    mq.addEventListener ? mq.addEventListener("change", onSys) : mq.addListener(onSys);
  }
})();
