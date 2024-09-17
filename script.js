const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const slider = document.querySelector('.slider');
let index = 0;

function showSlide(slideIndex) {
    const slides = document.querySelectorAll('.slider-item');
    const totalSlides = slides.length;
    if (slideIndex >= totalSlides) index = 0;
    else if (slideIndex < 0) index = totalSlides - 1;
    else index = slideIndex;

    slider.style.transform =`translateX(-${index * 100}%)`;
}

prevBtn.addEventListener('click', () => {
    showSlide(index - 1);
});

nextBtn.addEventListener('click', () => {
    showSlide(index + 1);
});

// Optional: Auto slide every 5 seconds
setInterval(() => {
    showSlide(index + 1);
}, 5000);



