/* Cookie consent banner for Google Consent Mode v2.
   The inline head snippet sets every storage type to "denied" before Google Tag Manager loads.
   This file shows the banner, saves the choice in localStorage and sends the consent update. */
(function () {
  var KEY = "consent";
  var es = (document.documentElement.lang || "").slice(0, 2) === "es";
  var T = es
    ? { ok: "Aceptar", no: "Rechazar", label: "Consentimiento de cookies", link: "Cookies" }
    : { ok: "Accept", no: "Decline", label: "Cookie consent", link: "Cookies" };
  // One playful line per topic. Every version still says the same thing: analytics cookies, only if you accept.
  var COPY = {
    en: {
      index: ["A cookie, explained", "We use analytics cookies to learn which explainers people actually use. They only switch on if you say yes."],
      units: ["1 cookie (SI unit: yum)", "Analytics cookies measure which pages get used. Metric, imperial or not at all: they only switch on if you accept."],
      voting: ["Put it to a vote", "Analytics cookies show us which pages people use. It’s a one-voter election and you’re the voter: they only switch on if you accept."],
      time: ["A cookie from the future", "Analytics cookies help future-us see which pages got used. No paradoxes: they only switch on if you accept."],
      blockchain: ["No consensus needed", "Analytics cookies tell us which pages get used. One node, one vote, and that node is you: they only switch on if you accept."],
      quantum: ["Schrödinger’s cookie", "Our analytics cookies are neither on nor off until you look. Accept and we see which pages get used; decline and they collapse to off."],
      dimensions: ["A cookie in 3D", "A four-dimensional being could peek without asking. We won’t: analytics cookies only switch on if you accept."],
      universe: ["A very small object", "Each analytics cookie is a few dozen bytes in a very big universe. They help us see which pages get used, and only switch on if you accept."],
      gametheory: ["Your move", "Accept and analytics cookies help us see which pages get used. Decline and nothing switches on. No dilemma: both choices are fine with us."],
      probability: ["What are the odds?", "Accept and analytics cookies help us see which pages get used. Decline and the chance they switch on is exactly 0%."],
      codes: ["Nothing encrypted here", "In plain text: analytics cookies help us see which pages get used, and they only switch on if you accept."],
      infinity: ["A finite request", "Analytics cookies help us see which pages get used. Not infinitely many, just one small yes or no, and they only switch on if you accept."],
      language: ["Cookie (n.)", "A small file that helps us see which pages get used. Our analytics cookies only switch on if you accept. Not to be confused with galleta."],
      maps: ["You are here", "Analytics cookies help us see which pages get used, not where you are. They only switch on if you accept."],
      money: ["Free, no interest", "Analytics cookies cost you nothing and help us see which pages get used. They only switch on if you accept."],
      light: ["Shedding some light", "Analytics cookies help us see which pages get used. They stay dark unless you accept."],
      disclaimer: ["The small print", "We use analytics cookies to see which pages get used. They only switch on if you accept, and you can change your mind any time."],
      algorithms: ["Sorted: one quick question", "Analytics cookies help us see which pages get used. Accept runs in O(1). Decline does too."],
      mind: ["No nudges here", "Analytics cookies help us see which pages get used. They’re off by default, and declining is exactly as easy as accepting."],
      music: ["Turn it up?", "Analytics cookies help us see which pages get used. They stay silent unless you accept."],
      evolution: ["Survival of the tastiest", "Analytics cookies help us see which pages get used. Only the ones you accept survive."],
      internet: ["Packet incoming", "Analytics cookies help us see which pages get used. Accept and they’re delivered; decline and they’re dropped, no resend."],
      wireless: ["No signal unless you say so", "Analytics cookies help us see which pages get used. They stay switched off unless you accept."],
      lightspeed: ["Faster than light? No, just faster than reading this", "Analytics cookies help us see which pages get used. Decide at your own speed."],
      correlation: ["Cookies and better pages: correlated?", "Analytics cookies help us see which pages get used. Accepting doesn’t cause anything bad, we promise."],
      logic: ["If accept, then cookies", "Accept → analytics cookies help us see which pages get used. ¬Accept → ¬cookies. That’s the whole truth table."]
    },
    es: {
      index: ["Una cookie, explicada", "Usamos cookies de analítica para saber qué explicaciones se usan de verdad. Solo se activan si dices que sí."],
      units: ["1 cookie (unidad SI: ñam)", "Las cookies de analítica miden qué páginas se usan. En sistema métrico, imperial o en ninguno: solo se activan si las aceptas."],
      voting: ["Sometámoslo a votación", "Las cookies de analítica nos muestran qué páginas se usan. Es una elección con un solo votante, y eres tú: solo se activan si las aceptas."],
      time: ["Una cookie del futuro", "Las cookies de analítica ayudan a nuestro yo del futuro a ver qué páginas se usaron. Sin paradojas: solo se activan si las aceptas."],
      blockchain: ["Sin necesidad de consenso", "Las cookies de analítica nos dicen qué páginas se usan. Un nodo, un voto, y ese nodo eres tú: solo se activan si las aceptas."],
      quantum: ["La cookie de Schrödinger", "Nuestras cookies de analítica no están ni encendidas ni apagadas hasta que miras. Si aceptas, vemos qué páginas se usan; si rechazas, colapsan a apagadas."],
      dimensions: ["Una cookie en 3D", "Un ser de cuatro dimensiones podría espiar sin pedir permiso. Nosotros no: las cookies de analítica solo se activan si las aceptas."],
      universe: ["Un objeto muy pequeño", "Cada cookie de analítica ocupa unas decenas de bytes en un universo enorme. Nos ayudan a ver qué páginas se usan y solo se activan si las aceptas."],
      gametheory: ["Te toca", "Si aceptas, las cookies de analítica nos ayudan a ver qué páginas se usan. Si rechazas, no se activa nada. Sin dilema: las dos opciones nos parecen bien."],
      probability: ["¿Qué probabilidades hay?", "Si aceptas, las cookies de analítica nos ayudan a ver qué páginas se usan. Si rechazas, la probabilidad de que se activen es exactamente del 0 %."],
      codes: ["Aquí no hay nada cifrado", "En texto claro: las cookies de analítica nos ayudan a ver qué páginas se usan, y solo se activan si las aceptas."],
      infinity: ["Una petición finita", "Las cookies de analítica nos ayudan a ver qué páginas se usan. No infinitas: solo un pequeño sí o no, y solo se activan si las aceptas."],
      language: ["Cookie (s.)", "Un pequeño archivo que nos ayuda a ver qué páginas se usan. Nuestras cookies de analítica solo se activan si las aceptas. No confundir con galleta."],
      maps: ["Usted está aquí", "Las cookies de analítica nos ayudan a ver qué páginas se usan, no dónde estás. Solo se activan si las aceptas."],
      money: ["Gratis y sin intereses", "Las cookies de analítica no te cuestan nada y nos ayudan a ver qué páginas se usan. Solo se activan si las aceptas."],
      light: ["Arrojando algo de luz", "Las cookies de analítica nos ayudan a ver qué páginas se usan. Se quedan a oscuras a menos que las aceptes."],
      disclaimer: ["La letra pequeña", "Usamos cookies de analítica para ver qué páginas se usan. Solo se activan si las aceptas, y puedes cambiar de opinión cuando quieras."],
      algorithms: ["Ordenado: una pregunta rápida", "Las cookies de analítica nos ayudan a ver qué páginas se usan. Aceptar se ejecuta en O(1). Rechazar, también."],
      mind: ["Aquí no hay empujoncitos", "Las cookies de analítica nos ayudan a ver qué páginas se usan. Están desactivadas por defecto, y rechazar es igual de fácil que aceptar."],
      music: ["¿Subimos el volumen?", "Las cookies de analítica nos ayudan a ver qué páginas se usan. Se quedan en silencio a menos que las aceptes."],
      evolution: ["La supervivencia de la más rica", "Las cookies de analítica nos ayudan a ver qué páginas se usan. Solo sobreviven las que aceptas."],
      internet: ["Paquete entrante", "Las cookies de analítica nos ayudan a ver qué páginas se usan. Si aceptas, se entregan; si rechazas, se descartan, sin reenvío."],
      wireless: ["Sin señal hasta que tú digas", "Las cookies de analítica nos ayudan a ver qué páginas se usan. Se quedan apagadas a menos que las aceptes."],
      lightspeed: ["¿Más rápido que la luz? No, pero casi", "Las cookies de analítica nos ayudan a ver qué páginas se usan. Decide a tu ritmo."],
      correlation: ["¿Cookies y mejores páginas: correlacionadas?", "Las cookies de analítica nos ayudan a ver qué páginas se usan. Aceptarlas no causa nada malo, lo prometemos."],
      logic: ["Si aceptas, entonces cookies", "Aceptar → las cookies de analítica nos ayudan a ver qué páginas se usan. ¬Aceptar → ¬cookies. Esa es toda la tabla de verdad."]
    }
  };
  var page = (location.pathname.split("/").pop() || "index").replace(/\.html$/, "") || "index";
  var C = (es ? COPY.es : COPY.en)[page] || (es ? COPY.es : COPY.en).index;
  var COOKIE = '<svg class="ck" viewBox="0 0 48 48" aria-hidden="true"><defs><mask id="bite"><rect width="48" height="48" fill="#fff"/><g class="bt"><circle cx="44" cy="8" r="7" fill="#000"/><circle cx="38" cy="3" r="5" fill="#000"/><circle cx="47" cy="16" r="5" fill="#000"/></g></mask></defs><g mask="url(#bite)"><circle cx="24" cy="24" r="21" fill="#D99A0B"/><circle cx="24" cy="24" r="21" fill="none" stroke="#B07A06" stroke-width="2"/><g fill="#5A3A12"><circle cx="15" cy="16" r="3"/><circle cx="29" cy="13" r="2.4"/><circle cx="20" cy="29" r="3.2"/><circle cx="33" cy="27" r="2.6"/><circle cx="14" cy="34" r="2"/><circle cx="28" cy="37" r="2.2"/></g></g></svg>';

  function gtag() { window.dataLayer = window.dataLayer || []; window.dataLayer.push(arguments); }
  function apply(v) {
    var g = v === "granted" ? "granted" : "denied";
    gtag("consent", "update", { analytics_storage: g, ad_storage: g, ad_user_data: g, ad_personalization: g });
    window.dataLayer.push({ event: "consent_update", consent: g });
  }
  function save(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
    apply(v);
    if (!box || matchMedia("(prefers-reduced-motion: reduce)").matches) { hide(); return; }
    box.classList.add(v === "granted" ? "eat" : "bye");
    var b = box; setTimeout(function () { if (box === b) hide(); }, 650);
  }

  var css = ".cc{position:fixed;left:12px;right:12px;bottom:12px;z-index:1000;max-width:560px;margin:0 auto;background:var(--card,#fff);color:var(--ink,#0E1A2B);border:1px solid var(--line,#D3DAE3);border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.18);padding:14px 16px;display:grid;gap:10px;font:14px/1.5 var(--body,system-ui,sans-serif)}" +
    ".cc p{margin:0}.cc .r{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap}" +
    ".cc .tp2{display:grid;grid-template-columns:44px 1fr;gap:12px;align-items:center}.cc b{display:block;font-family:var(--display,system-ui);font-size:17px;line-height:1.2;margin-bottom:2px}" +
    ".cc .ck{width:44px;height:44px;transform-origin:50% 50%;animation:ckwob 2.4s ease-in-out infinite}" +
    ".cc .bt{transform:translate(14px,-14px);transition:transform .25s ease}" +
    ".cc.eat .bt{transform:none}.cc.eat .ck{animation:none;transform:scale(1.08)}" +
    ".cc.eat,.cc.bye{transition:opacity .35s ease .3s,transform .35s ease .3s}.cc.eat{opacity:0;transform:translateY(12px)}" +
    ".cc.bye{opacity:0;transform:translateY(20px)}.cc.bye .ck{animation:ckroll .6s ease-in forwards}" +
    "@keyframes ckwob{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(6deg)}}" +
    "@keyframes ckroll{to{transform:translateX(240px) rotate(360deg)}}" +
    "@media (prefers-reduced-motion:reduce){.cc .ck{animation:none}}" +
    ".cc button{font:inherit;font-weight:500;border-radius:999px;padding:8px 16px;min-height:40px;cursor:pointer;border:1px solid var(--ink,#0E1A2B)}" +
    ".cc .y{background:var(--ink,#0E1A2B);color:var(--paper,#fff)}.cc .y:hover{background:var(--accent,#1D47F0);border-color:var(--accent,#1D47F0);color:var(--accent-ink,#fff)}" +
    ".cc .n{background:transparent;color:var(--ink,#0E1A2B);border-color:var(--line,#D3DAE3)}.cc .n:hover{border-color:var(--accent,#1D47F0)}" +
    ".cc-link{background:none;border:0;padding:0;font:inherit;color:inherit;text-decoration:underline;cursor:pointer}";
  var box;
  function show() {
    if (box) return;
    box = document.createElement("div");
    box.className = "cc"; box.setAttribute("role", "dialog"); box.setAttribute("aria-label", T.label);
    box.innerHTML = '<div class="tp2">' + COOKIE + "<p><b>" + C[0] + "</b>" + C[1] + "</p></div><div class=\"r\"><button type=\"button\" class=\"n\">" + T.no + "</button><button type=\"button\" class=\"y\">" + T.ok + "</button></div>";
    box.querySelector(".y").onclick = function () { save("granted"); };
    box.querySelector(".n").onclick = function () { save("denied"); };
    document.body.appendChild(box);
  }
  function hide() { if (box) { box.remove(); box = null; } }

  function init() {
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    // "Cookies" link in the footer bar to change your mind later
    var left = document.querySelector(".sitefoot .sf-l"), foot = document.querySelector(".sitefoot > span:last-child");
    var b = document.createElement("button"); b.type = "button"; b.className = "cc-link"; b.textContent = T.link; b.onclick = show;
    if (left) { left.appendChild(document.createTextNode(" · ")); left.appendChild(b); }
    else if (foot) { foot.insertBefore(document.createTextNode(" · "), foot.firstChild); foot.insertBefore(b, foot.firstChild); }
    window.openCookieSettings = show;
    var v = null; try { v = localStorage.getItem(KEY); } catch (e) {}
    if (v !== "granted" && v !== "denied") show();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
