let currentFilters = {
    publisher: '',
    genre: '',
    sortBy: 'title-asc'
};

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        publisher: params.get('publisher') || '',
        genre: params.get('genre') || ''
    };
}

function applyURLParams() {
    const params = getURLParams();
    
    if (params.publisher) {
        document.getElementById('publisherFilter').value = params.publisher;
        currentFilters.publisher = params.publisher;
    }
    
    if (params.genre) {
        document.getElementById('genreFilter').value = params.genre;
        currentFilters.genre = params.genre;
    }
}

function filterComics() {
    let filtered = [...comicsData];

    if (currentFilters.publisher) {
        filtered = filtered.filter(comic => comic.publisher === currentFilters.publisher);
    }

    if (currentFilters.genre) {
        filtered = filtered.filter(comic => comic.genre === currentFilters.genre);
    }

    switch (currentFilters.sortBy) {
        case 'title-asc':
            filtered.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            filtered.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'date-desc':
            filtered.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
            break;
        case 'date-asc':
            filtered.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
            break;
    }

    return filtered;
}

function displayComics() {
    const grid = document.getElementById('comicsGrid');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');
    
    const filtered = filterComics();
    
    grid.innerHTML = '';
    
    if (filtered.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        resultsCount.textContent = 'No comics found';
    } else {
        grid.style.display = 'grid';
        noResults.style.display = 'none';
        resultsCount.textContent = `Showing ${filtered.length} comic${filtered.length !== 1 ? 's' : ''}`;
        
        filtered.forEach(comic => {
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
            grid.appendChild(card);
        });
    }
}

function setupEventListeners() {
    document.getElementById('publisherFilter').addEventListener('change', (e) => {
        currentFilters.publisher = e.target.value;
        displayComics();
    });

    document.getElementById('genreFilter').addEventListener('change', (e) => {
        currentFilters.genre = e.target.value;
        displayComics();
    });

    document.getElementById('sortBy').addEventListener('change', (e) => {
        currentFilters.sortBy = e.target.value;
        displayComics();
    });

    document.getElementById('resetFilters').addEventListener('click', () => {
        currentFilters = {
            publisher: '',
            genre: '',
            sortBy: 'title-asc'
        };
        
        document.getElementById('publisherFilter').value = '';
        document.getElementById('genreFilter').value = '';
        document.getElementById('sortBy').value = 'title-asc';
        
        window.history.pushState({}, '', 'browse.html');
        
        displayComics();
    });
}

function init() {
    updateCartCount();
    applyURLParams();
    displayComics();
    setupEventListeners();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
