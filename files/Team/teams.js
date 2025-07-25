document.querySelectorAll(".wrapper").forEach(wrapper => {
    const carousel = wrapper.querySelector(".tcarousel-1");
    const arrowBtns = wrapper.querySelectorAll("i");

    if (!carousel) return;

    const firstCard = carousel.querySelector(".card");
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth + 40; 
    let isDragging = false, startX, startScrollLeft, autoplayId;

    const children = [...carousel.children];
    children.slice(-3).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });
    children.slice(0, 3).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    carousel.scrollLeft = carousel.offsetWidth;

    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id === "left" ? -cardWidth : cardWidth;
        });
    });

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    const handleInfiniteScroll = () => {
        if (carousel.scrollLeft <= 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        } else if (Math.ceil(carousel.scrollLeft) >= carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }
        clearTimeout(autoplayId);
        if (!carousel.matches(":hover")) startAutoplay();
    };

    const startAutoplay = () => {
        if (window.innerWidth < 800) return;
        autoplayId = setTimeout(() => {
            carousel.scrollLeft += cardWidth;
        }, 2500);
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", handleInfiniteScroll);
    carousel.addEventListener("mouseenter", () => clearTimeout(autoplayId));
    carousel.addEventListener("mouseleave", startAutoplay);

    startAutoplay();
});

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

