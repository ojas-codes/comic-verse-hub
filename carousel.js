let currentSlide = 0;
let carouselInterval;

function initCarousel() {
    const featuredComics = comicsData.slice(0, 5);
    const slidesContainer = document.getElementById('carouselSlides');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    if (!slidesContainer || !indicatorsContainer) return;

    featuredComics.forEach((comic, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `
            <div class="carousel-content">
                <h2>${comic.title}</h2>
                <p>${comic.description.substring(0, 150)}...</p>
                <div style="margin-bottom: 1rem;">
                    <span style="background: rgba(255,255,255,0.2); padding: 0.5rem 1rem; border-radius: 20px; margin-right: 1rem;">
                        ${comic.publisher}
                    </span>
                    <span style="background: rgba(255,255,255,0.2); padding: 0.5rem 1rem; border-radius: 20px;">
                        ${comic.genre}
                    </span>
                </div>
                <a href="comic-detail.html?id=${comic.id}" class="btn btn-primary">View Details</a>
            </div>
        `;
        slidesContainer.appendChild(slide);

        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    document.getElementById('prevBtn').addEventListener('click', prevSlide);
    document.getElementById('nextBtn').addEventListener('click', nextSlide);

    startAutoSlide();
}

function updateCarousel() {
    const slidesContainer = document.getElementById('carouselSlides');
    const indicators = document.querySelectorAll('.indicator');
    
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
    resetAutoSlide();
}

function prevSlide() {
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
    resetAutoSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetAutoSlide();
}

function startAutoSlide() {
    carouselInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(carouselInterval);
    startAutoSlide();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
} else {
    initCarousel();
}
