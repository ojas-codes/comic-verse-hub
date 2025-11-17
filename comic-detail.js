function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

function getComicIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function findComicById(id) {
    return comicsData.find(comic => comic.id === id);
}

function addToCart(comic) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === comic.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: comic.id,
            title: comic.title,
            price: comic.price,
            publisher: comic.publisher,
            coverImage: comic.coverImage,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    alert(`${comic.title} added to cart!`);
}

function displayComicDetail(comic) {
    const container = document.getElementById('comicDetail');
    const breadcrumbTitle = document.getElementById('breadcrumbTitle');
    
    breadcrumbTitle.textContent = comic.title;
    
    container.innerHTML = `
        <div class="comic-detail">
            <div class="detail-image">
                <img src="${comic.coverImage}" alt="${comic.title}" class="detail-cover">
            </div>
            <div class="detail-info">
                <h1>${comic.title}</h1>
                <div class="detail-meta">
                    <span class="meta-item">${comic.publisher}</span>
                    <span class="meta-item">${comic.genre}</span>
                </div>
                <p class="detail-price">$${comic.price.toFixed(2)}</p>
                <p class="detail-description">${comic.description}</p>
                <div class="detail-specs">
                    <div class="spec-row">
                        <span class="spec-label">Writer:</span>
                        <span>${comic.writer}</span>
                    </div>
                    <div class="spec-row">
                        <span class="spec-label">Artist:</span>
                        <span>${comic.artist}</span>
                    </div>
                    <div class="spec-row">
                        <span class="spec-label">Pages:</span>
                        <span>${comic.pages}</span>
                    </div>
                    <div class="spec-row">
                        <span class="spec-label">Release Date:</span>
                        <span>${new Date(comic.releaseDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}</span>
                    </div>
                </div>
                <button class="btn btn-primary add-to-cart-btn" id="addToCartBtn">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('addToCartBtn').addEventListener('click', () => addToCart(comic));
}

function displayRelatedComics(comic) {
    const relatedSection = document.getElementById('relatedSection');
    const relatedGrid = document.getElementById('relatedComics');
    
    const related = comicsData
        .filter(c => c.id !== comic.id && (c.genre === comic.genre || c.publisher === comic.publisher))
        .slice(0, 4);
    
    if (related.length > 0) {
        relatedSection.style.display = 'block';
        
        related.forEach(relatedComic => {
            const card = document.createElement('a');
            card.href = `comic-detail.html?id=${relatedComic.id}`;
            card.className = 'comic-card';
            card.innerHTML = `
                <img src="${relatedComic.coverImage}" alt="${relatedComic.title}" class="comic-cover">
                <div class="comic-info">
                    <h3 class="comic-title">${relatedComic.title}</h3>
                    <p class="comic-publisher">${relatedComic.publisher}</p>
                    <span class="comic-genre">${relatedComic.genre}</span>
                    <p class="comic-price">$${relatedComic.price.toFixed(2)}</p>
                </div>
            `;
            relatedGrid.appendChild(card);
        });
    }
}

function init() {
    updateCartCount();
    
    const comicId = getComicIdFromURL();
    
    if (!comicId) {
        document.getElementById('comicDetail').style.display = 'none';
        document.getElementById('notFound').style.display = 'block';
        return;
    }
    
    const comic = findComicById(comicId);
    
    if (!comic) {
        document.getElementById('comicDetail').style.display = 'none';
        document.getElementById('notFound').style.display = 'block';
        return;
    }
    
    displayComicDetail(comic);
    displayRelatedComics(comic);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
