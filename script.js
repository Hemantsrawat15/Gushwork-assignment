// ── FAQ ACCORDION ──
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

// ── APPLICATIONS CAROUSEL ──
const carousel = document.getElementById('applications-carousel');
const cardWidth = 420 + 16; // card width + gap
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

// ── STICKY HEADER ──
(function () {
    const stickyHeader = document.getElementById('sticky-header');
    const siteHeader = document.getElementById('site-header');
    let lastScrollY = 0;
    let ticking = false;

    function handleScroll() {
        const currentScrollY = window.scrollY;
        const headerBottom = siteHeader.offsetTop + siteHeader.offsetHeight;

        if (currentScrollY > headerBottom) {
            // Past first fold: show sticky header only when scrolling DOWN
            if (currentScrollY > lastScrollY) {
                stickyHeader.classList.add('visible');
            } else {
                // Scrolling UP: hide sticky header
                stickyHeader.classList.remove('visible');
            }
        } else {
            // Still in first fold: always hide
            stickyHeader.classList.remove('visible');
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }, { passive: true });
})();

// ── IMAGE ZOOM ON HOVER ──
(function () {
    const imageWrapper = document.getElementById('main-image-wrapper');
    const mainImage = document.getElementById('main-product-image');
    const zoomLens = document.getElementById('zoom-lens');
    const zoomPreview = document.getElementById('zoom-preview');

    if (!imageWrapper || !mainImage || !zoomLens || !zoomPreview) return;

    const ZOOM_FACTOR = 2.5;
    const LENS_SIZE = 150;

    imageWrapper.addEventListener('mouseenter', () => {
        // Set the zoom preview background to the current image
        zoomPreview.style.backgroundImage = `url('${mainImage.src}')`;
        zoomPreview.style.backgroundSize = `${imageWrapper.offsetWidth * ZOOM_FACTOR}px ${imageWrapper.offsetHeight * ZOOM_FACTOR}px`;
        zoomLens.classList.add('active');
        zoomPreview.classList.add('active');
    });

    imageWrapper.addEventListener('mouseleave', () => {
        zoomLens.classList.remove('active');
        zoomPreview.classList.remove('active');
    });

    imageWrapper.addEventListener('mousemove', (e) => {
        const rect = imageWrapper.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        // Clamp lens position within the image wrapper
        const halfLens = LENS_SIZE / 2;
        let lensX = x - halfLens;
        let lensY = y - halfLens;

        lensX = Math.max(0, Math.min(lensX, rect.width - LENS_SIZE));
        lensY = Math.max(0, Math.min(lensY, rect.height - LENS_SIZE));

        // Position the lens inside the image wrapper
        zoomLens.style.left = `${lensX}px`;
        zoomLens.style.top = `${lensY}px`;

        // Calculate the background position for the zoom preview
        const ratioX = lensX / (rect.width - LENS_SIZE);
        const ratioY = lensY / (rect.height - LENS_SIZE);

        const bgWidth = rect.width * ZOOM_FACTOR;
        const bgHeight = rect.height * ZOOM_FACTOR;
        const previewWidth = 400;
        const previewHeight = 400;

        const bgX = ratioX * (bgWidth - previewWidth);
        const bgY = ratioY * (bgHeight - previewHeight);

        zoomPreview.style.backgroundPosition = `-${bgX}px -${bgY}px`;
    });
})();

// ── DOWNLOAD BROCHURE MODAL ──
(function () {
    const overlay = document.getElementById('download-modal-overlay');
    const closeBtn = document.getElementById('download-modal-close');
    const downloadBtn = document.getElementById('btn-download');

    if (!overlay || !closeBtn || !downloadBtn) return;

    downloadBtn.addEventListener('click', () => {
        overlay.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
        }
    });
})();

// ── QUOTE REQUEST MODAL ──
(function () {
    const overlay = document.getElementById('quote-modal-overlay');
    const closeBtn = document.getElementById('quote-modal-close');
    const requestQuoteBtn = document.getElementById('btn-request-quote');
    const getQuoteBtn = document.getElementById('btn-quote');

    if (!overlay || !closeBtn) return;

    function openQuoteModal() {
        overlay.classList.add('active');
    }

    if (requestQuoteBtn) requestQuoteBtn.addEventListener('click', openQuoteModal);
    if (getQuoteBtn) getQuoteBtn.addEventListener('click', openQuoteModal);

    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
        }
    });
})();