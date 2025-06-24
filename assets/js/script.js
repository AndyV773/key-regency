let slideIndex = 0;
let hero = document.getElementById("hero");
let timeoutId;

// Array of background images
const backgroundImages = [
    "url('assets/images/img01.jpg')",
    "url('assets/images/img02.jpg')",
    "url('assets/images/img03.jpg')"
];

// Thumbnail image controls
function currentSlide(n) {
  showSlideShow(slideIndex = n);
}


function showSlideShow(n) {
    let dots = document.getElementsByClassName("dot");

    if (typeof n === "number") {
        slideIndex = n; // set to clicked dot
    } else {
        slideIndex++;
        if (slideIndex > backgroundImages.length) {
            slideIndex = 1;
        }
    }

    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }

    // Set background image and active dot
    hero.style.backgroundImage = backgroundImages[slideIndex - 1];
    dots[slideIndex - 1].className += " active-dot";

    // Clear previous timeout to avoid overlap when manually changing slide
    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    // Auto change slide every 3 seconds
    timeoutId = setTimeout(showSlideShow, 3000);
}

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
      root: null,
      rootMargin: "0px 0px -40% 0px",
      threshold: 0.01,
    }
);

document.querySelectorAll(".tick-icon").forEach((icon) => {
observer.observe(icon);
});

document.addEventListener("DOMContentLoaded", function () {

    // updates the copyright section to the most recent year
    document.getElementById("year").textContent = new Date().getFullYear();

   
    if (hero) {
        showSlideShow();
        
        // Add click handlers for dots
        let dots = document.getElementsByClassName("dot");
        for (let i = 0; i < dots.length; i++) {
            dots[i].addEventListener("click", function () {
                showSlideShow(i + 1);
            });
        }
    }
});