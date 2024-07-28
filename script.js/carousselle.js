const slider = document.querySelector(".slideshow-contenair");
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length / 2;
let holding = false;
let fisrtClickX;
let alreadyLeftScroll;
let velocity;
let rafID;

slider.scrollLeft = slider.offsetWidth * totalSlides;

slider.addEventListener("mousedown", (e) => {
  holding = true;

  fisrtClickX = e.pageX - slider.offsetLeft;
  alreadyLeftScroll = slider.scrollLeft;
  stopTransition();
});

slider.addEventListener("mousemove", (e) => {
  if (!holding) return;

  const x = e.pageX - slider.offsetLeft;

  const scrolled = (x - fisrtClickX) * 1;
  const prevScrollLeft = slider.scrollLeft;
  slider.scrollLeft = alreadyLeftScroll - scrolled;
  velocity = slider.scrollLeft - prevScrollLeft;

  // infiniteScroll()
});
slider.addEventListener("mouseup", () => {
  holding = false;
  startTransition();
});
slider.addEventListener("mouseleave", () => {
  holding = false;
});

function startTransition() {
  stopTransition();

  rafID = requestAnimationFrame(decreasingTransition);
}
function stopTransition() {
  cancelAnimationFrame(rafID);
}

function decreasingTransition() {
  slider.scrollLeft += velocity;
  velocity *= 0.95;
  // infiniteScroll()
  if (Math.abs(velocity) > 0.5) {
    rafID = requestAnimationFrame(decreasingTransition);
  }
}

slider.addEventListener("touchstart", (e) => {
  holding = true;
  fisrtClickX = e.targetTouches[0].pageX - slider.offsetLeft;
  alreadyLeftScroll = slider.scrollLeft;
  stopTransition();
});

slider.addEventListener(
  "touchmove",
  (e) => {
    // Modification: Ajout de l'événement "touchmove"
    if (!holding) return;

    const x = e.targetTouches[0].pageX - slider.offsetLeft;

    const scrolled = (x - fisrtClickX) * 1;
    const prevScrollLeft = slider.scrollLeft;
    slider.scrollLeft = alreadyLeftScroll - scrolled;
    velocity = slider.scrollLeft - prevScrollLeft;
  },
  { passif: true }
);

slider.addEventListener("touchend", () => {
  holding = false;
  startTransition();
});

// background top

let slider1 = document.querySelector(".slider .list");
let items = document.querySelectorAll(".slider .list .item1");
let dots = document.querySelectorAll(".slider .dots li");

let lengthItems = items.length - 1;
let active = 0;

function reloadSlider() {
  slider1.style.left = -items[active].offsetLeft + "px";
  let last_active_dot = document.querySelector(".slider .dots li.active");
  last_active_dot.classList.remove("active");
  dots[active].classList.add("active");

  clearInterval();
}

dots.forEach((li, key) => {
  li.addEventListener("click", () => {
    active = key;
    reloadSlider();
  });
});
window.onresize = function (event) {
  reloadSlider();
};

//
