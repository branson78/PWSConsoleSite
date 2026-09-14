(() => {
  const hero = document.querySelector("[data-hero-v2]");
  if (!hero) return;

  const slides = [
    {
      id: "watch",
      kicker: "Apple Watch",
      title: "Weather at a glance.",
      body: "Conditions, forecasts, complications, and animated radar right on your wrist."
    },
    {
      id: "iphone",
      kicker: "iPhone",
      title: "Your weather, wherever you are.",
      body: "Current conditions, local weather, forecast detail, radar, and optional personal-station data in one consistent experience."
    },
    {
      id: "ipad",
      kicker: "iPad",
      title: "See the forecast unfold.",
      body: "A wider canvas gives hourly and extended forecasts the room they deserve."
    },
    {
      id: "fire-tv",
      kicker: "Amazon Fire TV",
      title: "Weather fills the room.",
      body: "Home ZIP weather, forecasts, animated radar, and severe-weather alerts in a remote-friendly TV experience."
    }
  ];

  const devices = [...hero.querySelectorAll("[data-device]")];
  const dots = [...hero.querySelectorAll("[data-slide]")];
  const copy = hero.querySelector("[data-hero-copy]");
  const kicker = hero.querySelector("[data-copy-kicker]");
  const title = hero.querySelector("[data-copy-title]");
  const body = hero.querySelector("[data-copy-body]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let active = 0;
  let timer = null;
  let resumeTimer = null;
  let pausedByUser = false;

  const slots = ["front", "right", "back", "left"];

  function setActive(index, immediate = false) {
    active = (index + slides.length) % slides.length;
    hero.dataset.active = slides[active].id;

    devices.forEach((device, deviceIndex) => {
      const relative = (deviceIndex - active + devices.length) % devices.length;
      device.dataset.slot = slots[relative];
      device.setAttribute("aria-hidden", deviceIndex === active ? "false" : "true");
    });

    dots.forEach((dot, i) => dot.setAttribute("aria-pressed", String(i === active)));

    const applyCopy = () => {
      kicker.textContent = slides[active].kicker;
      title.textContent = slides[active].title;
      body.textContent = slides[active].body;
      copy.classList.add("is-visible");
    };

    if (immediate || reduceMotion) {
      copy.classList.remove("is-visible");
      applyCopy();
    } else {
      copy.classList.remove("is-visible");
      window.setTimeout(applyCopy, 320);
    }
  }

  function schedule() {
    if (reduceMotion || pausedByUser) return;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      if (pausedByUser) return;
      setActive(active + 1);
      schedule();
    }, 6800);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      pausedByUser = true;
      window.clearTimeout(timer);
      window.clearTimeout(resumeTimer);
      setActive(index);
      resumeTimer = window.setTimeout(() => {
        pausedByUser = false;
        schedule();
      }, 12000);
    });
  });

  setActive(0, true);
  schedule();
})();
