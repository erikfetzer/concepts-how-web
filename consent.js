/* Cookie consent banner for Google Consent Mode v2.
   The inline head snippet sets every storage type to "denied" before Google Tag Manager loads.
   This file shows the banner, saves the choice in localStorage and sends the consent update. */
(function () {
  var KEY = "consent";
  var es = (document.documentElement.lang || "").slice(0, 2) === "es";
  var T = es
    ? { msg: "Usamos cookies de analítica para saber qué páginas se usan y mejorar el sitio. Solo se activan si las aceptas.", ok: "Aceptar", no: "Rechazar", label: "Consentimiento de cookies", link: "Cookies" }
    : { msg: "We use analytics cookies to see which pages get used and make the site better. They only switch on if you accept.", ok: "Accept", no: "Decline", label: "Cookie consent", link: "Cookies" };

  function gtag() { window.dataLayer = window.dataLayer || []; window.dataLayer.push(arguments); }
  function apply(v) {
    var g = v === "granted" ? "granted" : "denied";
    gtag("consent", "update", { analytics_storage: g, ad_storage: g, ad_user_data: g, ad_personalization: g });
    window.dataLayer.push({ event: "consent_update", consent: g });
  }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} apply(v); hide(); }

  var css = ".cc{position:fixed;left:12px;right:12px;bottom:12px;z-index:1000;max-width:560px;margin:0 auto;background:var(--card,#fff);color:var(--ink,#0E1A2B);border:1px solid var(--line,#D3DAE3);border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.18);padding:14px 16px;display:grid;gap:10px;font:14px/1.5 var(--body,system-ui,sans-serif)}" +
    ".cc p{margin:0}.cc .r{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap}" +
    ".cc button{font:inherit;font-weight:500;border-radius:999px;padding:8px 16px;min-height:40px;cursor:pointer;border:1px solid var(--ink,#0E1A2B)}" +
    ".cc .y{background:var(--ink,#0E1A2B);color:var(--paper,#fff)}.cc .y:hover{background:var(--accent,#1D47F0);border-color:var(--accent,#1D47F0);color:var(--accent-ink,#fff)}" +
    ".cc .n{background:transparent;color:var(--ink,#0E1A2B);border-color:var(--line,#D3DAE3)}.cc .n:hover{border-color:var(--accent,#1D47F0)}" +
    ".cc-link{background:none;border:0;padding:0;font:inherit;color:inherit;text-decoration:underline;cursor:pointer}";
  var box;
  function show() {
    if (box) return;
    box = document.createElement("div");
    box.className = "cc"; box.setAttribute("role", "dialog"); box.setAttribute("aria-label", T.label);
    box.innerHTML = "<p>" + T.msg + "</p><div class=\"r\"><button type=\"button\" class=\"n\">" + T.no + "</button><button type=\"button\" class=\"y\">" + T.ok + "</button></div>";
    box.querySelector(".y").onclick = function () { save("granted"); };
    box.querySelector(".n").onclick = function () { save("denied"); };
    document.body.appendChild(box);
  }
  function hide() { if (box) { box.remove(); box = null; } }

  function init() {
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    // "Cookies" link in the footer bar to change your mind later
    var foot = document.querySelector(".sitefoot span:last-child");
    if (foot) {
      var b = document.createElement("button"); b.type = "button"; b.className = "cc-link"; b.textContent = T.link;
      b.onclick = show; foot.insertBefore(document.createTextNode(" · "), foot.firstChild); foot.insertBefore(b, foot.firstChild);
    }
    var v = null; try { v = localStorage.getItem(KEY); } catch (e) {}
    if (v !== "granted" && v !== "denied") show();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
