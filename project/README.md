# Spencer and Williams E-commerce Search

A sophisticated e-commerce search implementation featuring Algolia's InstantSearch.js, React, and TypeScript. This project demonstrates a production-ready search interface with advanced filtering, faceting, and view customization options.

## Features

### Search Interface
- **Real-time Search**: Instant search results as users type
- **Highlighted Search Terms**: Search terms are highlighted in results
- **Custom Search Box**: Styled search input with clear and submit buttons
- **Pagination**: Navigate through search results with customized pagination controls

### Product Display
- **Dual View Options**:
  - Grid View: Compact display showing essential product information
  - List View: Detailed view with expanded product descriptions
- **Product Cards Include**:
  - High-resolution product image
  - Product name with highlight support
  - Brand information
  - Price display
  - Category tags
  - Star rating visualization
  - Product description (in list view)
  - Hover effects and transitions

### Filtering System
- **Multiple Filter Types**:
  - Brand filter with search capability
  - Category filter with hierarchical support
  - Star rating filter with visual representation
- **Filter Management**:
  - Clear all refinements button
  - Current refinements display
  - Show more/less options for long lists
  - Count indicators for each filter option

### Responsive Design
- Fully responsive layout adapting to all screen sizes
- Grid system adjusts columns based on viewport width
- Mobile-friendly filters and search interface

## Technical Implementation

### Core Technologies
- **React**: Frontend framework
- **TypeScript**: Type safety and enhanced development experience
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first styling
- **Algolia**: Search backend and InstantSearch components

### Project Structure
```
src/
├── components/
│   ├── Filters.tsx         # Filter sidebar component
│   ├── Header.tsx          # Site header
│   ├── Panel.tsx           # Reusable panel component
│   ├── ProductHit.tsx      # Product card components (grid/list)
│   ├── RatingFilter.tsx    # Custom rating filter
│   ├── SearchBox.tsx       # Search input component
│   ├── SearchResults.tsx   # Results display management
│   └── ViewToggle.tsx      # Grid/List view switcher
├── config/
│   └── algolia.ts          # Algolia configuration
├── data/
│   └── products.json       # Sample product data
├── App.tsx                 # Main application component
└── main.tsx               # Application entry point
```

### Algolia Configuration

#### Index Settings
```typescript
{
  searchableAttributes: [
    'name',
    'brand',
    'categories',
    'description'
  ],
  attributesForFaceting: [
    'searchable(brand)',
    'searchable(categories)',
    'filterOnly(rating)'
  ],
  customRanking: [
    'desc(rating)',
    'desc(popularity)',
    'desc(price)'
  ],
  distinct: true,
  attributeForDistinct: 'name'
}
```

#### Search Configuration
```typescript
{
  hitsPerPage: 20,
  attributesToRetrieve: [
    'name',
    'brand',
    'categories',
    'description',
    'image',
    'price',
    'rating',
    'popularity',
    'free_shipping'
  ],
  attributesToHighlight: [
    'name',
    'brand',
    'categories',
    'description'
  ]
}
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Algolia account

### Environment Setup
1. Create a `.env` file in the root directory:
```env
VITE_ALGOLIA_APP_ID=your_app_id_here
VITE_ALGOLIA_SEARCH_API_KEY=your_search_only_api_key_here
VITE_ALGOLIA_INDEX_NAME=your_index_name_here
ALGOLIA_ADMIN_API_KEY=your_admin_api_key_here
```

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/spencer-and-williams.git
cd spencer-and-williams
```

2. Install dependencies:
```bash
npm install
```

3. Index the product data:
```bash
npm run index-data
```

4. Start the development server:
```bash
npm run dev
```

### Deployment
The project is configured for GitHub Pages deployment:

1. Update the base URL in `vite.config.ts` if needed:
```typescript
base: '/spencer-and-williams/'
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

## Security Considerations

### API Keys
- Admin API key is used only for indexing and stored in `.env`
- Search-only API key is public and has restricted permissions
- Environment variables are properly handled using Vite's env variable system

### Data Protection
- Sensitive data is excluded from the client bundle
- API requests are made over HTTPS
- Rate limiting is handled by Algolia's service

## Performance Optimizations

### Search Performance
- Proper attribute indexing for fast searches
- Custom ranking rules for relevant results
- Faceting optimization for quick filtering
- Pagination to manage large result sets

### Frontend Performance
- Code splitting for optimal bundle size
- Lazy loading of components
- Efficient state management
- Debounced search inputs
- Optimized image loading
- Minimal CSS bundle using Tailwind's JIT compiler

## Customization

### Styling
The project uses Tailwind CSS for styling. Customize the design by:
1. Modifying `tailwind.config.js`
2. Adding custom CSS in `src/style.css`
3. Updating component-level styles

### Search Configuration
Modify search behavior in `src/config/algolia.ts`:
- Adjust searchable attributes
- Update faceting options
- Customize ranking strategy
- Change results per page

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License - See LICENSE file for details