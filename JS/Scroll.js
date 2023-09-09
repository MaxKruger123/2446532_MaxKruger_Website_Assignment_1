document.addEventListener('DOMContentLoaded', function() {
  // Get a reference to the button element by its ID
  const scrollToTopButton = document.getElementById('ScrollToTop');

  // Add a click event listener to the button
  scrollToTopButton.addEventListener('click', function() {
    // Call your scroll-to-top function here
    topFunction();
  });

  // Your other DOM manipulation and event listeners can go here as well
});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  const scrollToTopButton = document.getElementById('ScrollToTop');
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

