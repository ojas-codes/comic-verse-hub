# ComicVerse Hub

## Overview
ComicVerse Hub is a fully static, multi-page online comic book store simulation built entirely with pure HTML, CSS, and JavaScript. The project demonstrates modern web development techniques without relying on any frameworks, build tools, or backend services.

**Status:** Complete and functional  
**Last Updated:** November 15, 2025

## Project Purpose
This is a high-fidelity comic book store website designed to run 100% statically on any web server or hosting platform like GitHub Pages. It features a modern, bold comic-style UI with full e-commerce functionality using browser localStorage for state management.

## Features Implemented

### Core Pages
- **index.html** - Homepage with hero carousel and featured comics
- **browse.html** - Browse page with filtering and sorting
- **comic-detail.html** - Individual comic detail pages with URL parameters
- **cart.html** - Shopping cart with localStorage persistence

### Key Functionality
- ✅ Hero carousel on homepage (pure JavaScript, auto-rotating)
- ✅ Dynamic filtering by publisher and genre
- ✅ Sorting by title (A-Z), price, and release date
- ✅ URL parameter-based comic detail loading
- ✅ Full shopping cart system with localStorage
- ✅ Quantity controls and real-time price calculations
- ✅ Responsive design with Flexbox and media queries
- ✅ 24 comics with complete metadata and cover images

### Technical Stack
- **HTML5** - Semantic markup, accessible structure
- **CSS3** - Custom properties, Flexbox, Grid, media queries
- **Vanilla JavaScript (ES6+)** - No libraries or frameworks
- **localStorage API** - Cart persistence
- **URLSearchParams API** - Dynamic content loading

## Project Structure

```
/
├── index.html              # Homepage
├── browse.html            # Browse/catalog page
├── comic-detail.html      # Comic detail page
├── cart.html              # Shopping cart page
├── styles.css             # Main stylesheet
├── comics.js              # Comic data (24 comics)
├── carousel.js            # Hero carousel functionality
├── home.js                # Homepage logic
├── browse.js              # Browse page filtering/sorting
├── comic-detail.js        # Detail page logic
├── cart.js                # Shopping cart functionality
└── assets/                # Comic cover images
    ├── comic-001.jpg
    ├── comic-002.jpg
    └── ... (24 total)
```

## Data Model

Each comic in `comics.js` contains:
- `id` - Unique identifier (001-024)
- `title` - Comic book title
- `price` - Price in USD
- `publisher` - Marvel, DC, Image, or Dark Horse
- `genre` - Superhero, Sci-Fi, Fantasy, Horror, Mystery, Action, Adventure
- `releaseDate` - Publication date
- `description` - Full description
- `coverImage` - Path to cover image
- `pages` - Page count
- `writer` - Comic writer
- `artist` - Comic artist

## Local Development

The project uses Python's built-in HTTP server for local development:

```bash
python -m http.server 5000
```

Then visit: http://localhost:5000

## Deployment

This site is 100% static and can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

No build process or server-side code required.

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- localStorage support required for cart functionality

## Design System

### Color Palette
- Primary: #e63946 (Red)
- Secondary: #f1faee (Off-white)
- Accent: #457b9d (Blue)
- Dark: #1d3557 (Navy)
- Light: #a8dadc (Light blue)

### Typography
- Font: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- Responsive font sizing with media queries

### Responsive Breakpoints
- Desktop: 1200px and above
- Tablet: 768px - 1199px
- Mobile: Below 768px

## Recent Changes
- **Nov 15, 2025**: Complete project implementation
  - Created all HTML pages with semantic structure
  - Implemented hero carousel with auto-rotation
  - Built filtering and sorting system for browse page
  - Developed localStorage-based shopping cart
  - Generated 24 unique comic cover images
  - Styled complete site with comic-themed CSS
  - Made fully responsive across all devices

## User Preferences
No specific user preferences have been set yet.

## Known Limitations
- This is a demonstration/portfolio project
- No actual payment processing
- No user authentication
- Cart data stored in browser localStorage only
- Images are AI-generated placeholders

## Future Enhancements (Not Implemented)
- User wishlist functionality
- Comic search feature
- Checkout confirmation page
- User ratings and reviews
- Related comics recommendations engine
