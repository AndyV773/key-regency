let slideIndex = 0;
let hero = document.getElementById("hero");

function showSlideShow() {
    let i;
    let dots = document.getElementsByClassName("dot");

    // Array of background images
    const backgroundImages = [
        "url('assets/images/img01.jpg')",
        "url('assets/images/img02.jpg')",
        "url('assets/images/img03.jpg')"
    ];

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }

    slideIndex++;

    if (slideIndex > backgroundImages.length) {
        slideIndex = 1;
    }

    hero.style.backgroundImage = backgroundImages[slideIndex - 1];

    dots[slideIndex - 1].className += " active-dot";

    // Change image every 2 seconds
    setTimeout(showSlideShow, 3000);
}

document.addEventListener("DOMContentLoaded", function () {

    // updates the copyright section to the most recent year
    document.getElementById("year").textContent = new Date().getFullYear();

   
    if (hero) {
        showSlideShow();
    }
});