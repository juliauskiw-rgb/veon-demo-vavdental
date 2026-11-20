// Small enhancements; the page works without them (anchors, native popovers, <details>).
const root = document.documentElement;

// Active anchor in the header while scrolling.
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav__link"));
const byId = new Map(links.map((a) => [a.hash.slice(1), a]));
if ("IntersectionObserver" in window && links.length) {
  const visible = new Map<string, number>();
  const spy = new IntersectionObserver((entries) => {
    for (const e of entries) visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
    let best = ""; let max = 0;
    for (const [id, r] of visible) if (r > max && byId.has(id)) { best = id; max = r; }
    for (const [id, a] of byId) {
      const on = id === best;
      a.classList.toggle("is-active", on);
      if (on) a.setAttribute("aria-current", "location"); else a.removeAttribute("aria-current");
    }
  }, { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.01, 0.5, 1] });
  document.querySelectorAll<HTMLElement>("main section[id]").forEach((s) => spy.observe(s));

  // Mobile call bar appears once the first screen is gone.
  const hero = document.getElementById("top");
  if (hero) {
    new IntersectionObserver(([e]) => root.classList.toggle("past-hero", !e.isIntersecting), { threshold: 0 }).observe(hero);
  }
} else {
  root.classList.add("past-hero");
}

// Menu: close after choosing a section.
const menu = document.getElementById("menu");
menu?.addEventListener("click", (ev) => {
  const t = ev.target as HTMLElement;
  if (t.closest("a[href^='#']") && menu.matches(":popover-open")) menu.hidePopover();
});

// Channel panel: move focus into it when it opens.
const channels = document.getElementById("channels");
channels?.addEventListener("toggle", (ev) => {
  if ((ev as ToggleEvent).newState === "open") channels.querySelector<HTMLElement>(".channel")?.focus();
});

// Doctors rail: back / next buttons (the rail itself scrolls by touch, wheel and keyboard).
document.querySelectorAll<HTMLElement>("[data-rail]").forEach((wrap) => {
  const rail = wrap.querySelector<HTMLElement>(".rail");
  const backBtn = wrap.querySelector<HTMLButtonElement>("[data-rail-back]");
  const next = wrap.querySelector<HTMLButtonElement>("[data-rail-next]");
  if (!rail || !backBtn || !next) return;
  wrap.classList.add("has-controls");
  const step = () => {
    const card = rail.querySelector<HTMLElement>("li");
    return card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(rail).columnGap || "0") : rail.clientWidth;
  };
  const sync = () => {
    backBtn.disabled = rail.scrollLeft <= 2;
    next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
  };
  backBtn.addEventListener("click", () => rail.scrollBy({ left: -step(), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
  next.addEventListener("click", () => rail.scrollBy({ left: step(), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
  rail.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync, { passive: true });
  sync();
});

// FutureLink note: open leftwards when it would leave the screen.
const placeNote = (ev: Event) => {
  const link = ev.currentTarget as HTMLElement;
  const note = link.querySelector<HTMLElement>(".future-link__note");
  if (!note) return;
  link.classList.remove("is-flipped");
  if (note.getBoundingClientRect().right > root.clientWidth - 4) link.classList.add("is-flipped");
};
document.querySelectorAll<HTMLElement>(".future-link").forEach((l) => {
  l.addEventListener("mouseenter", placeNote);
  l.addEventListener("focus", placeNote);
});
