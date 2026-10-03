// Shared mock behavior: page chrome, project panel, width-proximity type.
window.REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;

window.chrome = () => {
  document.body.insertAdjacentHTML("afterbegin", `
<header><div class="wrap">
  <a class="logo" href="#">Cauê Souza</a>
  <nav aria-label="Main">
    <div class="navlinks"><a href="#about">About</a><a href="#projects">Projects</a><a href="#contact">Contact</a><a href="#">Resume</a></div>
    <button class="icon-btn" type="button" aria-label="Change language">EN</button>
    <button class="icon-btn" type="button" onclick="toggleTheme()" aria-label="Toggle theme">Theme</button>
  </nav>
</div></header>`);
  document.body.insertAdjacentHTML("beforeend", `
<footer><div class="wrap">
  <span>© 2026 Cauê Souza. All rights reserved.</span>
  <a href="https://eucaue.online">eucaue.online</a>
  <a href="https://blog.eucaue.online">Blog</a>
  <a class="end" href="#">Resume</a>
</div></footer>`);
  const sk = document.getElementById("skills");
  if (sk) sk.innerHTML = SKILLS.map(([h, items]) =>
    `<div><h3>${h}</h3><ul>${items.map(s => `<li>${s}</li>`).join("")}</ul></div>`).join("");
};

window.panelHTML = p => `
  <div class="frame">${media(p) || '<span class="none">No preview available</span>'}</div>
  <h3>${p.name}</h3>
  <p>${p.desc}</p>
  <ul class="tags mono">${p.tags.map(t => `<li>${t}</li>`).join("")}</ul>
  <div class="links">
    ${p.github ? `<a href="${p.github}">GitHub</a>` : ""}
    ${p.preview ? `<a href="${p.preview}">Live Demo</a><span class="mono shipped">Published</span>` : ""}
  </div>`;

// Split text into per-letter spans, keeping one readable label for screen readers.
window.wrapChars = node => {
  [...node.childNodes].forEach(c => {
    if (c.nodeType === 3 && c.textContent.trim()) {
      const frag = document.createDocumentFragment();
      // Letters sit inside a no-wrap word so lines only break between words.
      c.textContent.split(/( )/).forEach(w => {
        if (!w) return;
        if (w === " ") return frag.appendChild(document.createTextNode(" "));
        const word = document.createElement("span");
        word.style.whiteSpace = "nowrap"; word.setAttribute("aria-hidden", "true");
        [...w].forEach(ch => {
          const s = document.createElement("span");
          s.className = "ch"; s.textContent = ch;
          word.appendChild(s);
        });
        frag.appendChild(word);
      });
      const label = document.createElement("span");
      label.className = "sr"; label.textContent = c.textContent;
      frag.appendChild(label);
      c.replaceWith(frag);
    } else if (c.nodeType === 1 && c.tagName !== "BR" && !c.classList.contains("sep")) wrapChars(c);
  });
};

// Letters near the pointer widen along the font's wdth axis.
window.proximity = (el, { min = 62, max = 125, radius = 200 } = {}) => {
  wrapChars(el);
  if (REDUCE) return;
  const chars = [...el.querySelectorAll(".ch")];
  el.addEventListener("pointermove", e => {
    chars.forEach(c => {
      const b = c.getBoundingClientRect();
      const t = Math.max(0, 1 - Math.hypot(e.clientX - (b.left + b.width / 2), e.clientY - (b.top + b.height / 2)) / radius);
      c.style.fontVariationSettings = `"wdth" ${min + (max - min) * t}`;
    });
  });
  el.addEventListener("pointerleave", () => chars.forEach(c => (c.style.fontVariationSettings = "")));
};

window.ABOUT = `
<section id="about"><div class="wrap">
  <h2>About Me</h2>
  <div class="about">
    <div>
      <p>I'm a software engineer who enjoys working across different layers of technology. My experience spans modern, responsive interfaces for web and mobile (React, Next.js, React Native) all the way to native desktop applications and system extensions for Linux/GNOME built with Python and JavaScript.</p>
      <p>I believe in using technology to solve real-world problems simply and efficiently. I combine technical rigor, sound design principles, and smart automation in my daily workflow to build experiences that are robust under the hood and seamless for the user.</p>
    </div>
    <div class="skills" id="skills"></div>
  </div>
</div></section>`;

window.CONTACT = (cls = "") => `
<section id="contact" class="${cls}"><div class="wrap">
  <h2>Get In Touch</h2>
  <div class="contact-grid">
    <div class="contact-info">
      <p>Have a project in mind or just want to say hello? Feel free to reach out!</p>
      <a href="mailto:souzacaue@proton.me">souzacaue@proton.me</a>
      <a href="https://linkedin.com/in/caue-souza">LinkedIn</a>
      <a href="https://github.com/EuCaue">GitHub</a>
    </div>
    <form onsubmit="event.preventDefault()">
      <div class="field"><label for="n">Name</label><input id="n" placeholder="Your name" autocomplete="name"></div>
      <div class="field"><label for="e">Email</label><input id="e" type="email" placeholder="Your email" autocomplete="email"></div>
      <div class="field"><label for="m">Message</label><textarea id="m" placeholder="Your message"></textarea></div>
      <button class="btn primary send" type="submit">Send Message</button>
    </form>
  </div>
</div></section>`;

window.HEAD = `<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Martian+Mono:wght@400;500&display=swap" rel="stylesheet">`;
