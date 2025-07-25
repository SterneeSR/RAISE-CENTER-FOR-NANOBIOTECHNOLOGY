function initializeCarousel(carouselElement, arrowButtons) {
    if (!carouselElement || !carouselElement.querySelector(".card, .image-card")) {
        console.error("Carousel element not found or no cards within it.");
        return;
    }

    const firstCardWidth = carouselElement.querySelector(".card, .image-card").offsetWidth;
    const carouselChildrens = [...carouselElement.children];

    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

    // Append duplicate cards (adjust duplication logic as needed for each carousel type)
    carouselChildrens.slice(-3).reverse().forEach(card => {
        carouselElement.insertAdjacentHTML("afterbegin", card.outerHTML);
    });
    carouselChildrens.slice(0, 3).forEach(card => {
        carouselElement.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    carouselElement.classList.add("no-transition");
    carouselElement.scrollLeft = carouselElement.offsetWidth;
    carouselElement.classList.remove("no-transition");

    arrowButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (carouselElement.classList.contains("dragging")) return;
            carouselElement.scrollLeft += btn.id.includes("left") ? -firstCardWidth : firstCardWidth;
        });
    });

    const dragStart = (e) => {
        isDragging = true;
        carouselElement.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carouselElement.scrollLeft;
    }

    const dragging = (e) => {
        if (!isDragging) return;
        carouselElement.scrollLeft = startScrollLeft - (e.pageX - startX);
    }

    const dragStop = () => {
        isDragging = false;
        carouselElement.classList.remove("dragging");
    }

    const autoPlay = () => {
        if (window.innerWidth < 800) return;
        timeoutId = setTimeout(() => carouselElement.scrollLeft += firstCardWidth, 2500);
    }
    autoPlay();

    const infiniteScroll = () => {
        if (carouselElement.scrollLeft === 0) {
            carouselElement.classList.add("no-transition");
            carouselElement.scrollLeft = carouselElement.scrollWidth - (2 * carouselElement.offsetWidth);
            carouselElement.classList.remove("no-transition");
        } else if (Math.ceil(carouselElement.scrollLeft) === carouselElement.scrollWidth - carouselElement.offsetWidth) {
            carouselElement.classList.add("no-transition");
            carouselElement.scrollLeft = carouselElement.offsetWidth;
            carouselElement.classList.remove("no-transition");
        }

        clearTimeout(timeoutId);
        if (!carouselElement.matches(":hover")) autoPlay();
    }

    carouselElement.addEventListener("mousedown", dragStart);
    carouselElement.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carouselElement.addEventListener("scroll", infiniteScroll);
    carouselElement.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    carouselElement.addEventListener("mouseleave", autoPlay);
}

// Initialize your existing carousel
const startupsCarousel = document.querySelector(".tcarousel-1");
const startupsArrowBtns = document.querySelectorAll(".wrapper i");
initializeCarousel(startupsCarousel, startupsArrowBtns);

// Initialize the new horizontal image carousel
const galleryCarousel = document.querySelector(".image-carousel");
const galleryArrowBtns = document.querySelectorAll(".image-carousel-wrapper .fa-solid");
initializeCarousel(galleryCarousel, galleryArrowBtns);

const circleActiveColors = ['#e75480', '#98fa92', '#58d1fb', '#ffe156'];
const circleToggle = document.getElementById('circleToggle');
const desktopNav = document.querySelector('nav.navbar');
let mobileNav = null;

circleToggle.addEventListener('click', function() {
  if (!mobileNav) {
    mobileNav = desktopNav.cloneNode(true);
    mobileNav.classList.remove('navbar');
    mobileNav.classList.add('mobile-nav');
    mobileNav.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    document.body.appendChild(mobileNav);
  }
  mobileNav.classList.toggle('open');
  document.body.classList.toggle('menu-open', mobileNav.classList.contains('open'));
  document.querySelectorAll('.circle-toggle .circle').forEach((circle, idx) => {
    if (mobileNav.classList.contains('open')) {
      circle.style.background = circleActiveColors[idx];
      circle.style.borderColor = circleActiveColors[idx];
    } else {
      circle.style.background = 'transparent';
      circle.style.borderColor = '#fff';
    }
  });
});

// Close drawer when a link is clicked or on outside click
document.addEventListener('click', (e) => {
  if (
    mobileNav &&
    mobileNav.classList.contains('open') &&
    (e.target.closest('.nav-menu li a') ||
     (!e.target.closest('.mobile-nav') && !e.target.closest('.circle-toggle')))
  ) {
    mobileNav.classList.remove('open');
    document.body.classList.remove('menu-open');
    document.querySelectorAll('.circle-toggle .circle').forEach(circle => {
      circle.style.background = 'transparent';
      circle.style.borderColor = '#fff';
    });
  }
});

