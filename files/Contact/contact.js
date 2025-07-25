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
