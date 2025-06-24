let slideIndex = 0;
let loadedImages = 0;
let hero = document.getElementById("hero");
let timeoutId;
let lastY = window.scrollY;


const imageUrls = [
  "assets/images/img01.jpg",
  "assets/images/img02.jpg",
  "assets/images/img03.jpg"
];


const backgroundImages = imageUrls.map(url => `url('${url}')`);


function showSlideShow(n) {
    let dots = document.getElementsByClassName("dot");

    if (typeof n === "number") {
        slideIndex = n; // set to clicked dot
    } else {
        slideIndex++;
        if (slideIndex >= backgroundImages.length) {
            slideIndex = 0;
        }
    }

    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }

    // Set background image and active dot
    hero.style.backgroundImage = backgroundImages[slideIndex];
    dots[slideIndex].className += " active-dot";

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
            } else {
                entry.target.classList.remove("visible");
            }
        });
    },
    {
      root: null,
      rootMargin: "0px 0px -30% 0px",
      threshold: 0.01,
    }
);


document.querySelectorAll(".tick-icon").forEach((icon) => {
observer.observe(icon);
});

window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.innerWidth < 768) {
        if (window.scrollY > 10) {
        header.classList.add("scrolled");
        } else {
        header.classList.remove("scrolled");
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {

    // updates the copyright section to the most recent year
    document.getElementById("year").textContent = new Date().getFullYear();

   
    if (hero) {
        imageUrls.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedImages++;
                if (loadedImages === imageUrls.length) {
                showSlideShow();
                }
            };
        });
        
        // Add click handlers for dots
        let dots = document.getElementsByClassName("dot");
        for (let i = 0; i < dots.length; i++) {
            dots[i].addEventListener("click", function () {
                showSlideShow(i);
            });
        }
    }
});