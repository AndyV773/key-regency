// nav bar
const navToggle = document.getElementById("nav-toggle");
const header = document.querySelector("header");
const imageUrls = [
  "assets/images/img01.jpg",
  "assets/images/img02.jpg",
  "assets/images/img03.jpg"
];

// form dropdown
const input = document.getElementById("myInput");
const dropdown = document.getElementById("myDropdown");
const loc = document.getElementById("location");

// gallery lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const thumbnails = document.querySelectorAll('.popup-img');

let slideIndex = 0;
let loadedImages = 0;
let hero = document.getElementById("hero");
let timeoutId;
let lastY = window.scrollY;


function showSlideShow(n) {
    const backgroundImages = imageUrls.map(url => `url('${url}')`);
    const fadeLayer = document.getElementById("fade-layer");
    const dots = document.getElementsByClassName("dot");

    if (typeof n === "number") {
        slideIndex = n; // set to clicked dot
    }
    
    fadeLayer.style.backgroundImage = backgroundImages[slideIndex];
    fadeLayer.style.opacity = 1;
    
    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active-dot");
    }

    setTimeout(() => {
        document.getElementById("hero").style.backgroundImage = backgroundImages[slideIndex];
        fadeLayer.style.opacity = 0;

        // Increment *after* showing current image
        slideIndex = (slideIndex + 1) % backgroundImages.length;

        // Schedule next
        timeoutId = setTimeout(showSlideShow, 5000);

    }, 2000); // match CSS transition duration

    // Update dot state
    dots[slideIndex].classList.add("active-dot");

    // Clear previous timeout before continuing
    if (timeoutId) clearTimeout(timeoutId);
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


function toggleNav() {
    header.classList.toggle("active", navToggle.checked);
}


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    dropdown.classList.toggle("show");
}

function filterFunction() {
    let li = dropdown.getElementsByTagName("li");
    let filter = input.value.toUpperCase();
    for (let i = 0; i < li.length; i++) {
        txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
        } else {
        li[i].style.display = "none";
        }
    }
}

if (dropdown) {
    const listItems = dropdown.getElementsByTagName("li");

    // Set selection
    for (let li of listItems) {
        li.addEventListener("click", (e) => {
            const selectedText = e.target.innerText;
            const selectedValue = e.target.dataset.value;

            loc.innerHTML = `${selectedText} <i class="fa-solid fa-caret-down"></i>`;           
            loc.dataset.value = selectedValue;     
            dropdown.classList.remove("show");   

            // clear filter input
            input.value = "";
            filterFunction(); // reset visible list
        });
    }

    window.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target) && !loc.contains(e.target)) {
            dropdown.classList.remove("show");
        }
    });
}

if (lightbox) {
    thumbnails.forEach((img) => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        });
    });

    // Close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
}


window.addEventListener("scroll", function () {
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

    navToggle.addEventListener("change", toggleNav);
    toggleNav();

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