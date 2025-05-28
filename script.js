const sideBtn = document.querySelector("#sidebar-btn");
const navOverlay = document.querySelector("#nav-overlay");
const close = document.querySelector("#close");
const sideTimeLine = gsap.timeline();
const navTitle = document.querySelector("#nav-title");
const cursor = document.querySelector("#cursor-box");
const container = document.querySelector(".container");

sideTimeLine.to(navOverlay, {
  right: 0,
  duration: 0.4,
});
sideTimeLine.from(".nav-items", {
  x: 150,
  opacity: 0,
  duration: 0.4,
  stagger: 0.1,
});
sideTimeLine.pause();

sideBtn.addEventListener("click", () => {
  sideTimeLine.play();
});
close.addEventListener("click", () => {
  sideTimeLine.reverse();
});

const titleTimeLine = gsap.timeline();

titleTimeLine.from("#nav-title", {
  x: -100,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
});
titleTimeLine.from(
  "#sidebar-btn",
  {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  },
  "<"
);

var h1Box = document.querySelector("#hero-name");
var characters = h1Box.innerText.split("");
var halfLength = Math.floor(characters.length / 2);

var clutter = "";
characters.forEach(function (ch, idx) {
  if (idx <= halfLength) {
    clutter += `<span class="clutter-a">${ch}</span>`;
  } else {
    clutter += `<span class="clutter-b">${ch}</span>`;
  }
});
h1Box.innerHTML = clutter;

titleTimeLine.from("#hero-name .clutter-a", {
  y: 80,
  opacity: 0,
  duration: 0.5,
  stagger: 0.1,
});
titleTimeLine.from(
  "#hero-name .clutter-b",
  {
    y: 80,
    opacity: 0,
    duration: 0.5,
    stagger: -0.1,
  },
  "<"
);

titleTimeLine.from(".social-icon", {
  y: 80,
  opacity: 0,
  duration: 0.5,
  stagger: 0.1,
});

container.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    duration: 0.5,
    delay: 0.05,
    opacity: 1,
    x: e.clientX,
    y: e.clientY,
    ease: "back.out",
  });
});

gsap.from("#about-img", {
  opacity: 0,
  scale: 0.5,
  duration: 1,
  delay: 0.3,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".about-box",
    start: "top 80%",
    toggleActions: "play none none reset",
  },
});

gsap.from("#about-text-box", {
  opacity: 0,
  x: 100,
  duration: 1.2,
  delay: 0.4,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".about-box",
    start: "top 80%",
    toggleActions: "play none none reset",
  },
});

document.querySelectorAll(".about-btn").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, {
      scale: 1.1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  });
  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, {
      scale: 1,
      duration: 0.3,
      ease: "back.in(1.7)",
    });
  });
});

document.querySelectorAll(".social-icon").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, {
      scale: 1.1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  });
  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, {
      scale: 1,
      duration: 0.3,
      ease: "back.in(1.7)",
    });
  });
});

function qs(selector, all = false) {
  return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}

const sections = qs(".timeline__section", true);
const timeline = qs(".timeline");
const line = qs(".timeline__line");

line.style.bottom = `calc(100% - 20px)`;
let prevScrollY = window.scrollY;
let set = 0;
const targetY = window.innerHeight * 0.8;

function scrollHandler() {
  const scrollY = window.scrollY;
  const timelineRect = timeline.getBoundingClientRect();
  const dist = targetY - timelineRect.top;

  set = Math.max(set, dist);
  line.style.bottom = `calc(100% - ${set}px)`;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top + section.offsetHeight / 5 < targetY) {
      section.classList.add("show-me");
    } else {
      section.classList.remove("show-me");
    }
  });

  prevScrollY = scrollY;
}

scrollHandler();
line.style.display = "block";
window.addEventListener("scroll", scrollHandler);

const timelineSections = document.querySelectorAll(".timeline__section__content");

timelineSections.forEach((section) => {
  section.addEventListener("mouseenter", () => {
    const parent = section.parentElement;
    const bead = parent.querySelector(".timeline__section__bead");
    if (bead) bead.classList.add("active");
  });

  section.addEventListener("mouseleave", () => {
    const parent = section.parentElement;
    const bead = parent.querySelector(".timeline__section__bead");
    if (bead) bead.classList.remove("active");
  });
});

gsap.to(".footer-box", {
  opacity: 1,
  y: 0,
  duration: 0.2,
  ease: "power3.out"
});

document.querySelectorAll(".footer-icon").forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    gsap.to(icon, {
      scale: 1.3,
      duration: 0.3,
      ease: "power1.out",
    });
  });
  icon.addEventListener("mouseleave", () => {
    gsap.to(icon, {
      scale: 1,
      duration: 0.3,
      ease: "power1.inOut",
    });
  });
});
gsap.utils.toArray(".project-card").forEach((card) => {
  gsap.fromTo(
    card,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none reset", // plays every time you scroll back
      },
    }
  );
});
