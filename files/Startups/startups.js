document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const imagePopup = document.getElementById('imagePopup');
    const popupImage = document.getElementById('popupImage');
    const closeButton = document.querySelector('.close-button');
    const moreInfoLinks = document.querySelectorAll('.more-info-link');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.closest('.accordion-item');
            const isExpanded = accordionItem.classList.contains('expanded');

            accordionHeaders.forEach(otherHeader => {
                const otherItem = otherHeader.closest('.accordion-item');
                if (otherItem !== accordionItem && otherItem.classList.contains('expanded')) {
                    otherItem.classList.remove('expanded');
                }
            });

            accordionItem.classList.toggle('expanded', !isExpanded);
        });
    });

    moreInfoLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const imageUrl = link.getAttribute('data-popup-image');
            if (imageUrl) {
                popupImage.src = imageUrl;
                imagePopup.style.display = 'flex';
            }
        });
    });

    closeButton.addEventListener('click', () => {
        imagePopup.style.display = 'none';
        popupImage.src = '';
    });

    imagePopup.addEventListener('click', (event) => {
        if (event.target === imagePopup) {
            imagePopup.style.display = 'none';
            popupImage.src = '';
        }
    });
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

