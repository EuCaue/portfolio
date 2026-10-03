// Helpers shared by the E-round mocks (E1, E2, E3). Depends on data.js.

// Web and mobile lead, desktop and Linux follow (PRODUCT.md positioning).
window.FAMILY = { Web: "web", Mobile: "web", Firefox: "web", GNOME: "desktop", CLI: "desktop" };
window.PLATFORM_LABEL = { Web: "Web app", Mobile: "Mobile app", Firefox: "Firefox extension", GNOME: "GNOME / Linux", CLI: "Command line" };
window.ORDER = ["Auto Volume", "Scrolled", "PIX Donation System", "My Movies", "Get Cat", "URL Short", "Snap The Web", "Feed Pet", "CSS Cursor Gallery", "Reddit Auto Theme", "Quick Lofi", "Flexa", "Harbor", "Nautilus Copy File Contents", "decomp"];
window.SORTED = ORDER.map(n => PROJECTS.find(p => p.name === n));
window.byFamily = f => SORTED.filter(p => FAMILY[p.platform] === f);
window.slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
window.host = u => new URL(u).hostname.replace(/^www\./, "");

// Videos load lazily and only play while on screen.
window.playInView = root => {
  const vids = [...(root || document).querySelectorAll("video")];
  vids.forEach(v => v.removeAttribute("autoplay"));
  if (REDUCE_E) return;
  const io = new IntersectionObserver(es => es.forEach(e => (e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause())), { threshold: 0.35 });
  vids.forEach(v => io.observe(v));
};
window.REDUCE_E = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Mock contact form: real validation copy from src/locales/en.ts, no network.
window.mockForm = form => {
  const msgs = { name: "Name must be at least 2 characters", email: "Please enter a valid email address", message: "Message must be at least 10 characters" };
  form.addEventListener("submit", e => {
    e.preventDefault();
    let ok = true;
    const v = { name: form.name.value.trim().length >= 2, email: /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.value), message: form.message.value.trim().length >= 10 };
    for (const k in v) {
      const err = form.querySelector(`#${form.id}-${k}-err`);
      form[k].setAttribute("aria-invalid", String(!v[k]));
      err.textContent = v[k] ? "" : msgs[k];
      if (!v[k] && ok) { form[k].focus(); ok = false; }
    }
    const status = form.querySelector("[role=status]");
    if (!ok) { status.textContent = ""; return; }
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true; btn.textContent = "Sending...";
    setTimeout(() => { btn.disabled = false; btn.textContent = "Send Message"; status.textContent = "Your message has been sent! I'll get back to you soon."; form.reset(); }, 900);
  });
};

window.formHTML = id => `
<form id="${id}" novalidate>
  <div class="field"><label for="${id}-name">Name</label><input id="${id}-name" name="name" autocomplete="name" placeholder="Your name" aria-describedby="${id}-name-err"><p class="err" id="${id}-name-err"></p></div>
  <div class="field"><label for="${id}-email">Email</label><input id="${id}-email" name="email" type="email" autocomplete="email" placeholder="Your email" aria-describedby="${id}-email-err"><p class="err" id="${id}-email-err"></p></div>
  <div class="field"><label for="${id}-message">Message</label><textarea id="${id}-message" name="message" placeholder="Your message" aria-describedby="${id}-message-err"></textarea><p class="err" id="${id}-message-err"></p></div>
  <div class="form-foot"><button class="send" type="submit">Send Message</button><p role="status" class="ok"></p></div>
</form>`;

window.ABOUT_P = [
  "I'm a software engineer who enjoys working across different layers of technology. My experience spans modern, responsive interfaces for web and mobile (React, Next.js, React Native) all the way to native desktop applications and system extensions for Linux/GNOME built with Python and JavaScript.",
  "I believe in using technology to solve real-world problems simply and efficiently. I combine technical rigor, sound design principles, and smart automation in my daily workflow to build experiences that are robust under the hood and seamless for the user.",
];
window.INTRO = "Software Engineer passionate about building complete digital solutions from web and mobile applications to native desktop integrations and system-level tooling.";
