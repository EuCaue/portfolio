// Functional core shared by the G-round mocks: the same information architecture and behavior,
// dressed by each page's own world. Depends on data.js and e-shared.js.
window.G = {};

G.icon = n => `<i data-lucide="${n}" aria-hidden="true"></i>`;
G.find = n => PROJECTS.find(p => p.name === n);
G.liveLabel = p => p.preview ? (/gnome|mozilla/.test(p.preview) ? `Published on ${host(p.preview)}` : "Live demo online") : "";

// tech filter options, most used first
G.TECH = (() => {
  const c = {};
  PROJECTS.forEach(p => p.tags.forEach(t => (c[t] = (c[t] || 0) + 1)));
  return Object.entries(c).filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
})();
G.PLATFORMS = ["Web", "Mobile", "Firefox", "GNOME", "CLI"];
G.SHORT = { Web: "Web", Mobile: "Mobile", Firefox: "Browser extensions", GNOME: "GNOME / Linux", CLI: "Command line" };

G.links = p => `${p.github ? `<a href="${p.github}">${G.icon("github")}GitHub</a>` : ""}${p.preview ? `<a href="${p.preview}">${G.icon("external-link")}Live demo</a>` : ""}${!p.github && !p.preview ? `<span class="nolink">Source not public</span>` : ""}`;

G.card = (p, placeholder) => `
  <article class="card" id="${slug(p.name)}" data-platform="${p.platform}" data-tags="${p.tags.join("|")}" aria-labelledby="c-${slug(p.name)}">
    <div class="card-media">${media(p) || placeholder(p)}</div>
    <div class="card-body">
      <p class="card-plat">${PLATFORM_LABEL[p.platform]}${G.liveLabel(p) ? `<span class="card-live">${G.liveLabel(p)}</span>` : ""}</p>
      <h3 id="c-${slug(p.name)}">${p.name}</h3>
      <p class="card-desc">${p.desc}</p>
      <ul class="card-tags" aria-label="Built with">${p.tags.map(t => `<li>${t}</li>`).join("")}</ul>
      <p class="card-links">${G.links(p)}</p>
    </div>
  </article>`;

G.row = p => `
  <li class="row" id="${slug(p.name)}" data-platform="${p.platform}" data-tags="${p.tags.join("|")}">
    <div class="row-thumb">${media(p) || ""}</div>
    <div class="row-main">
      <h4>${p.name}</h4>
      <p class="row-plat">${PLATFORM_LABEL[p.platform]}${G.liveLabel(p) ? `, ${G.liveLabel(p).toLowerCase()}` : ""}</p>
      <p class="row-desc">${p.desc}</p>
    </div>
    <p class="row-links">${G.links(p)}</p>
  </li>`;

G.filtersHTML = () => `
  <div class="filters">
    <div class="chips" role="group" aria-label="Filter by platform">
      <button type="button" data-plat="all" aria-pressed="true">All <span>${PROJECTS.length}</span></button>
      ${G.PLATFORMS.map(k => `<button type="button" data-plat="${k}" aria-pressed="false">${G.SHORT[k]} <span>${PROJECTS.filter(p => p.platform === k).length}</span></button>`).join("")}
    </div>
    <label class="tech"><span>Technology</span>
      <select id="tech"><option value="">Any</option>${G.TECH.map(([t, n]) => `<option value="${t}">${t} (${n})</option>`).join("")}</select>
    </label>
  </div>
  <p class="count" id="count" aria-live="polite"></p>`;

// Renders the whole work section into `el`. `placeholder(p)` draws a media slot for projects without one.
G.work = (el, placeholder, { onFilter } = {}) => {
  const feat = SORTED.filter(p => p.featured), rest = SORTED.filter(p => !p.featured);
  el.innerHTML = `
    ${G.filtersHTML()}
    <h3 class="sub" id="feat-t">Featured</h3>
    <div class="grid" aria-labelledby="feat-t">${feat.map(p => G.card(p, placeholder)).join("")}</div>
    <h3 class="sub" id="more-t">More projects</h3>
    <ul class="rows" aria-labelledby="more-t">${rest.map(G.row).join("")}</ul>
    <div class="empty" id="empty" hidden><p>No projects match these filters.</p><button type="button" id="clear">Clear filters</button></div>`;
  const state = { plat: "all", tech: "" };
  const items = [...el.querySelectorAll(".card, .row")];
  const apply = () => {
    let shown = 0;
    items.forEach(it => {
      const ok = (state.plat === "all" || it.dataset.platform === state.plat) && (!state.tech || it.dataset.tags.split("|").includes(state.tech));
      it.hidden = !ok; if (ok) shown++;
    });
    el.querySelectorAll("[data-plat]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.plat === state.plat)));
    el.querySelector("#tech").value = state.tech;
    const fs = el.querySelectorAll(".card:not([hidden])").length, rs = el.querySelectorAll(".row:not([hidden])").length;
    el.querySelector("#feat-t").hidden = !fs; el.querySelector("#more-t").hidden = !rs;
    el.querySelector("#empty").hidden = shown > 0;
    el.querySelector("#count").textContent = shown === PROJECTS.length ? `Showing all ${shown} projects` : `Showing ${shown} of ${PROJECTS.length} projects`;
    onFilter && onFilter(state);
  };
  el.addEventListener("click", e => {
    const b = e.target.closest("[data-plat]"); if (b) { state.plat = b.dataset.plat; apply(); }
    if (e.target.closest("#clear")) { state.plat = "all"; state.tech = ""; apply(); }
  });
  el.querySelector("#tech").addEventListener("change", e => { state.tech = e.target.value; apply(); });
  apply();
  return { set: (k, v) => { state[k] = v; apply(); }, state };
};

G.skills = el => (el.innerHTML = SKILLS.map(([h, items]) => `<div class="skill"><h3>${h}</h3><ul>${items.map(s => `<li>${s}</li>`).join("")}</ul></div>`).join(""));

// Quick contact row: copyable email plus profiles.
G.quick = () => `
  <ul class="quick">
    <li><button type="button" class="copy" data-copy="souzacaue@proton.me">${G.icon("mail")}<span>souzacaue@proton.me</span><span class="copy-state">${G.icon("copy")}<span class="sr">Copy email</span></span></button></li>
    <li><a href="https://github.com/EuCaue">${G.icon("github")}GitHub</a></li>
    <li><a href="https://linkedin.com/in/caue-souza">${G.icon("linkedin")}LinkedIn</a></li>
  </ul>`;
document.addEventListener("click", async e => {
  const b = e.target.closest(".copy"); if (!b) return;
  try { await navigator.clipboard.writeText(b.dataset.copy); } catch {}
  const s = b.querySelector(".copy-state"); const was = s.innerHTML;
  s.innerHTML = `${G.icon("check")}<span class="copied">Copied</span>`; lucide.createIcons();
  b.setAttribute("aria-label", "Email copied"); setTimeout(() => { s.innerHTML = was; lucide.createIcons(); b.removeAttribute("aria-label"); }, 1800);
});

// Header: active section marker and a mobile menu.
G.chrome = () => {
  const links = [...document.querySelectorAll(".nav a[href^='#']")];
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.setAttribute("aria-current", String(a.hash === "#" + e.target.id))); }), { rootMargin: "-45% 0px -50% 0px" });
  links.forEach(a => { const s = a.hash.length > 1 && document.querySelector(a.hash); if (s) io.observe(s); });
  const btn = document.querySelector(".menu-btn"), nav = document.querySelector(".nav");
  if (btn) {
    btn.addEventListener("click", () => { const o = btn.getAttribute("aria-expanded") === "true"; btn.setAttribute("aria-expanded", String(!o)); nav.classList.toggle("open", !o); });
    nav.addEventListener("click", e => { if (e.target.closest("a")) { btn.setAttribute("aria-expanded", "false"); nav.classList.remove("open"); } });
  }
};

G.finish = () => {
  document.getElementById("form-slot").innerHTML = formHTML("cf");
  mockForm(document.getElementById("cf"));
  lucide.createIcons();
  playInView();
  G.chrome();
};
