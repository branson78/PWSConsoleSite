(() => {
  const root = document.querySelector("[data-ecosystem-hero]");
  if (!root) return;

  const slides = [
    {
      id: "ipad",
      kicker: "iPad",
      title: "See the forecast unfold.",
      body: "A wider view gives hourly and extended forecasts room to breathe, while preserving the same PWS Console weather language.",
      device: "iPad"
    },
    {
      id: "iphone",
      kicker: "iPhone",
      title: "Your weather, wherever you are.",
      body: "Current conditions, local weather, forecast detail, radar, and optional personal-station data stay together in one consistent experience.",
      device: "iPhone"
    },
    {
      id: "watch",
      kicker: "Apple Watch",
      title: "Weather at a glance — radar on your wrist.",
      body: "Check PWS or Local conditions, forecasts, complications, and animated NOAA/NWS radar without reaching for your phone.",
      device: "Apple Watch"
    }
  ];

  const copy = root.querySelector("[data-hero-copy]");
  const kicker = root.querySelector("[data-hero-kicker]");
  const title = root.querySelector("[data-hero-title]");
  const body = root.querySelector("[data-hero-body]");
  const buttons = [...root.querySelectorAll("[data-hero-select]")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let active = 0;
  let timer = null;
  let locked = false;

  function positionFor(index) {
    const delta = (index - active + slides.length) % slides.length;
    if (delta === 0) return "front";
    if (delta === 1) return "right";
    return "left";
  }

  function render(immediate = false) {
    root.dataset.active = slides[active].id;
    root.querySelectorAll("[data-device]").forEach((el, index) => {
      el.dataset.position = positionFor(index);
      el.setAttribute("aria-hidden", index === active ? "false" : "true");
    });

    buttons.forEach((button, index) => {
      const selected = index === active;
      button.setAttribute("aria-pressed", String(selected));
      button.setAttribute("aria-label", `Show ${slides[index].device}`);
    });

    const updateCopy = () => {
      kicker.textContent = slides[active].kicker;
      title.textContent = slides[active].title;
      body.textContent = slides[active].body;
      copy.classList.add("is-visible");
    };

    if (immediate || reduceMotion) {
      copy.classList.remove("is-visible");
      updateCopy();
      return;
    }

    copy.classList.remove("is-visible");
    window.setTimeout(updateCopy, 260);
  }

  function schedule() {
    if (reduceMotion || locked) return;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      active = (active + 1) % slides.length;
      render();
      schedule();
    }, 6500);
  }

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      active = index;
      locked = true;
      render();
      window.clearTimeout(timer);
      window.setTimeout(() => {
        locked = false;
        schedule();
      }, 11000);
    });
  });

  root.addEventListener("mouseenter", () => {
    if (!reduceMotion) window.clearTimeout(timer);
  });

  root.addEventListener("mouseleave", () => {
    if (!reduceMotion && !locked) schedule();
  });

  render(true);
  schedule();
})();
