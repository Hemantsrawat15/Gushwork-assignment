document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const answer = item.querySelector('.faq-answer');
        const icon = btn.querySelector('.faq-icon');
        const isOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
        document.querySelectorAll('.faq-icon').forEach(i => {
            i.classList.remove('open');
            i.classList.add('closed');
        });

        // Open clicked if it was closed
        if (!isOpen) {
            item.classList.add('open');
            answer.style.display = 'block';
            icon.classList.remove('closed');
            icon.classList.add('open');
        }
    });
});

const carousel = document.getElementById('applications-carousel');
const cardWidth = 285 + 20; // card width + gap
let carouselIndex = 0;
const totalCards = document.querySelectorAll('.app-card').length;
const visibleCards = 4;

document.getElementById('app-next').addEventListener('click', () => {
    if (carouselIndex < totalCards - visibleCards) {
        carouselIndex++;
        carousel.style.transform = `translateX(-${carouselIndex * cardWidth}px)`;
    }
});

document.getElementById('app-prev').addEventListener('click', () => {
    if (carouselIndex > 0) {
        carouselIndex--;
        carousel.style.transform = `translateX(-${carouselIndex * cardWidth}px)`;
    }
});