function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

function createComicCard(comic) {
    const card = document.createElement('a');
    card.href = `comic-detail.html?id=${comic.id}`;
    card.className = 'comic-card';
    card.innerHTML = `
        <img src="${comic.coverImage}" alt="${comic.title}" class="comic-cover">
        <div class="comic-info">
            <h3 class="comic-title">${comic.title}</h3>
            <p class="comic-publisher">${comic.publisher}</p>
            <span class="comic-genre">${comic.genre}</span>
            <p class="comic-price">$${comic.price.toFixed(2)}</p>
        </div>
    `;
    return card;
}

function displayFeaturedComics() {
    const featuredGrid = document.getElementById('featuredComics');
    if (!featuredGrid) return;

    const featuredComics = comicsData
        .filter(comic => ['001', '002', '003', '005', '011', '022'].includes(comic.id));
    
    featuredComics.forEach(comic => {
        featuredGrid.appendChild(createComicCard(comic));
    });
}

function displayNewReleases() {
    const newReleasesGrid = document.getElementById('newReleases');
    if (!newReleasesGrid) return;

    const sortedByDate = [...comicsData].sort((a, b) => 
        new Date(b.releaseDate) - new Date(a.releaseDate)
    );
    
    const newReleases = sortedByDate.slice(0, 6);
    
    newReleases.forEach(comic => {
        newReleasesGrid.appendChild(createComicCard(comic));
    });
}

function init() {
    updateCartCount();
    displayFeaturedComics();
    displayNewReleases();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
