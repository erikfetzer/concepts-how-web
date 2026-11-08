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

/* Topics menu: the topic links fold into a "Topics" button (⋮ on phones) that opens a grouped grid. */
(function () {
  var es = (document.documentElement.lang || "").slice(0, 2) === "es";
  var L = es ? { btn: "Temas", menu: "Todos los temas", set: "Idioma y tema" } : { btn: "Topics", menu: "All topics", set: "Language & theme" };
  var GROUPS = es
    ? [["Matemáticas y lógica", ["logic", "probability", "infinity", "gametheory"]], ["Física y espacio", ["quantum", "light", "universe", "time", "dimensions"]], ["Sociedad", ["voting", "money", "language", "maps"]], ["Tecnología y medida", ["blockchain", "codes", "units"]]]
    : [["Maths & logic", ["logic", "probability", "infinity", "gametheory"]], ["Physics & space", ["quantum", "light", "universe", "time", "dimensions"]], ["People & society", ["voting", "money", "language", "maps"]], ["Tech & measurement", ["blockchain", "codes", "units"]]];
  var SM = 640;
  var css = ".site{position:relative}.site a.nl{display:none!important}.site .ctl{margin-left:auto}.site .wrap{flex-wrap:nowrap;padding-bottom:0}" +
    ".kb{display:inline-flex;align-items:center;gap:8px;height:40px;padding:0 14px 0 12px;border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--ink);cursor:pointer;font:600 14px/1 var(--body,system-ui)}" +
    ".kb:hover,.kb[aria-expanded=true]{border-color:var(--accent);color:var(--accent)}" +
    ".kb svg{width:16px;height:16px}.kb .dots{display:none}" +
    ".kbm{position:absolute;right:clamp(16px,4vw,40px);top:calc(100% + 6px);z-index:900;width:min(780px,calc(100vw - 32px));max-height:calc(100vh - 90px);overflow:auto;background:var(--card);border:1px solid var(--line);border-radius:16px;box-shadow:0 18px 40px rgba(0,0,0,.18);padding:10px;display:grid;gap:4px}" +
    ".kbm[hidden]{display:none}" +
    ".kbm .h{font-family:var(--mono,monospace);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);padding:8px 10px 4px}" +
    ".kbm .grp{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px 12px}" +
    ".kbm .col{display:grid;align-content:start;gap:1px}" +
    ".kbm a{display:block;padding:9px 10px;border-radius:9px;color:var(--ink);text-decoration:none;font-size:15px}" +
    ".kbm a:hover,.kbm a:focus-visible{background:var(--paper)}" +
    ".kbm a[aria-current=page]{background:var(--accent-soft,var(--paper));color:var(--accent);font-weight:600}" +
    ".kbm .home{border-top:1px solid var(--line);margin-top:6px;padding-top:8px;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}" +
    ".kbm .home a{font-size:14px;color:var(--muted)}" +
    ".kbm .set{border-top:1px solid var(--line);margin-top:4px;padding:10px 10px 6px;display:grid;gap:8px}" +
    ".kbm .set .ctl{display:flex!important;gap:8px;margin:0!important;flex-wrap:wrap}" +
    "@media (max-width:860px){.kbm .grp{grid-template-columns:repeat(2,minmax(0,1fr))}}" +
    "@media (max-width:" + SM + "px){.wrap{padding-left:12px!important;padding-right:12px!important}.kbm{right:12px;left:12px;width:auto}.kbm .grp{grid-template-columns:1fr 1fr}" +
    ".kb{width:40px;padding:0;justify-content:center}.kb .lbl2,.kb .grid{display:none}.kb .dots{display:block}}" +
    "@media (max-width:360px){.kbm .grp{grid-template-columns:1fr}}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  function init() {
    var wrap = document.querySelector("nav.site .wrap");
    var links = wrap ? [].slice.call(wrap.querySelectorAll("a.nl")) : [];
    if (!links.length) return;
    var bySlug = {};
    links.forEach(function (a) { bySlug[(a.getAttribute("href") || "").replace(/^.*\//, "").replace(/\.html$/, "")] = a; });
    var btn = document.createElement("button");
    btn.type = "button"; btn.className = "kb";
    btn.setAttribute("aria-label", L.btn); btn.setAttribute("aria-haspopup", "true");
    btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", "kbm");
    btn.innerHTML = '<svg class="grid" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/></svg><span class="lbl2">' + L.btn + '</span><svg class="dots" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>';
    var menu = document.createElement("div");
    menu.className = "kbm"; menu.id = "kbm"; menu.hidden = true;
    menu.setAttribute("role", "menu"); menu.setAttribute("aria-label", L.menu);
    var item = function (a) { var cur = a.getAttribute("aria-current") === "page"; return '<a role="menuitem" href="' + a.getAttribute("href") + '"' + (cur ? ' aria-current="page"' : "") + ">" + a.textContent + "</a>"; };
    var used = {}, html = '<div class="grp">';
    GROUPS.forEach(function (g) {
      var inner = g[1].filter(function (s) { return bySlug[s]; }).map(function (s) { used[s] = 1; return item(bySlug[s]); }).join("");
      if (inner) html += '<div class="col"><div class="h">' + g[0] + "</div>" + inner + "</div>";
    });
    var rest = links.filter(function (a) { var s = (a.getAttribute("href") || "").replace(/^.*\//, "").replace(/\.html$/, ""); return !used[s]; });
    if (rest.length) html += '<div class="col"><div class="h">' + (es ? "Más" : "More") + "</div>" + rest.map(item).join("") + "</div>";
    html += "</div>";
    var home = wrap.querySelector("a.brand");
    if (home) html += '<div class="home"><a role="menuitem" href="' + home.getAttribute("href") + '">' + (es ? "← Todos los temas en la portada" : "← All topics on the home page") + "</a></div>";
    menu.innerHTML = html;
    wrap.appendChild(btn);
    wrap.parentNode.appendChild(menu);
    var ctl = wrap.querySelector(".ctl"), set = null;
    if (ctl && window.matchMedia) {
      set = document.createElement("div"); set.className = "set";
      set.innerHTML = '<div class="h" style="padding:0">' + L.set + "</div>";
      var small = matchMedia("(max-width:" + SM + "px)");
      var place = function () {
        if (small.matches) { set.appendChild(ctl); if (!set.parentNode) menu.appendChild(set); }
        else { wrap.insertBefore(ctl, btn); if (set.parentNode) set.remove(); }
      };
      place();
      small.addEventListener ? small.addEventListener("change", place) : small.addListener(place);
    }
    function open(v) {
      menu.hidden = !v; btn.setAttribute("aria-expanded", v ? "true" : "false");
      if (v) { var f = menu.querySelector("a[aria-current]") || menu.querySelector("a"); f && f.focus({ preventScroll: true }); }
    }
    btn.addEventListener("click", function (e) { e.stopPropagation(); open(menu.hidden); });
    document.addEventListener("click", function (e) { if (!menu.hidden && !menu.contains(e.target)) open(false); });
    document.addEventListener("keydown", function (e) {
      if (menu.hidden) return;
      if (e.key === "Escape") { open(false); btn.focus(); }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        var items = [].slice.call(menu.querySelectorAll("a")), i = items.indexOf(document.activeElement);
        i = e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
        items[i].focus(); e.preventDefault();
      }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
