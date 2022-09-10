/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */
const startPerformance = performance.now();
/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll('section');
const pageHeader = document.querySelector('.page__header');
const navBar = document.querySelector('.navbar__menu');
const menuButton = document.getElementById('menuIcon');
const navBarList = document.getElementById('navbar__list');
const anchors = document.getElementsByClassName('menu__link');
const scrollToTopButton = document.getElementById('scrollToTopButton');
const collapseButtons = document.getElementsByClassName('collapse__button');

let lastScrollPosition = 0;
let scrollTimeOut;
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
// Build Navbar
const buildNavBar = () => {
  // Create empty fragment
  const fragment = document.createDocumentFragment();
  // Loop through section to create list "li"s
  sections.forEach((section) => {
    let li = document.createElement('li');
    li.innerHTML = `<a data-nav="${section.getAttribute(
      'id'
    )}" class="menu__link">${section.getAttribute('data-nav')}</a>`;
    // Append created li to the empty fragment
    fragment.appendChild(li);
  });
  // Append fragment to navbar list
  navBarList.appendChild(fragment);
};
// Create anchor tags event listeners
const createAnchorTagsEventListeners = () => {
  // Loop through anchors to create event listeners with scroll to section function
  Array.from(anchors).forEach((anchor) => {
    anchor.addEventListener('click', () => scrollToSection(anchor));
  });
};
// Get element in viewport
const elementInViewPort = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientHeight)
  );
};
// Scroll to Top
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
// Scroll to section
const scrollToSection = (anchor) => {
  let section = document.getElementById(anchor.getAttribute('data-nav'));
  section.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
  });
};
// Set active class for active section in viewport
const setActiveSectionClass = () => {
  sections.forEach((section) => {
    if (elementInViewPort(section)) {
      section.classList.add('section__active');
      setActiveAnchorClass(section.getAttribute('data-nav'));
    } else {
      section.classList.remove('section__active');
    }
  });
};
// Set active class to anchor tag
const setActiveAnchorClass = (sectionDataNav) => {
  Array.from(anchors).forEach((anchor) => {
    anchor.classList.remove('link__active');
    anchor.textContent === sectionDataNav
      ? anchor.classList.add('link__active')
      : anchor.classList.remove('link__active');
  });
};
// Apllying effects while scrolling
const applyScrollEffects = () => {
  lastScrollPosition = window.scrollY;
  pageHeader.classList.remove('hide__page__header');
  scrollToTopButton.classList.add('scroll__button__show');
  clearTimeout(scrollTimeOut);
  scrollTimeOut = setTimeout(() => {
    lastScrollPosition > 20
      ? pageHeader.classList.add('hide__page__header')
      : pageHeader.classList.remove('hide__page__header');

    scrollToTopButton.classList.remove('scroll__button__show');
  }, 6000);
  setTimeout(() => {
    setActiveSectionClass();
  }, 0);
};
// Open & close menu when clicking menu buttons on small screens
const toggleMenuClass = () => {
  navBar.classList.toggle('show__menu');
};
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
buildNavBar();

/**
 * End Main Functions
 * Begin Events
 *
 */

// Scroll to section on link click
createAnchorTagsEventListeners();
// Set sections as active
document.addEventListener('scroll', applyScrollEffects);
// Scroll to Top Button listener
scrollToTopButton.addEventListener('click', scrollToTop);
// Menu button from small screens
menuButton.addEventListener('click', toggleMenuClass);
// Collapse buttons events
Array.from(collapseButtons).forEach((button) => {
  button.addEventListener('click', () => {
    // Toggle parent next sbiling class to collapse
    button.parentElement.nextElementSibling.classList.contains('collapsed')
      ? button.parentElement.nextElementSibling.classList.remove('collapsed')
      : button.parentElement.nextElementSibling.classList.add('collapsed');
    // Toggle icon direction
    button.classList.contains('rotate__icon')
      ? button.classList.remove('rotate__icon')
      : button.classList.add('rotate__icon');
    // Toggle icon color
    button.style.color === 'green'
      ? (button.style.color = 'red')
      : (button.style.color = 'green');
  });
});

const endPerformance = performance.now();
console.log(`loading took ${endPerformance - startPerformance} milliseconds`);
