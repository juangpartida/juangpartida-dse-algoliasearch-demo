# Spencer and Williams E-commerce Search

A sophisticated e-commerce search implementation featuring Algolia's InstantSearch.js, React, and TypeScript. 

This technical assignment demonstrates a production-ready search interface with advanced filtering, faceting, and view customization options.


<img width="1015" alt="image" src="https://github.com/user-attachments/assets/1968aef3-2b32-48f3-bca6-3453e7f0677e">

Please note, screenshot above is when the App ID, Search Only API Key, and Index Name is active. 

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
  - product image
  - Product name with highlight support
  - Brand information
  - Price display
  - Category tags
  - Star rating visualization
  - Product description (list view)


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


## Technical Implementation

### Core Technologies
- **React**: Frontend framework
- **TypeScript**: Type safety and enhanced development experience
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first styling
- **Algolia**: Search backend and InstantSearch component

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


## Indexing Settings/Instructions

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


### Setting Up Environment Variables

1. Create a `.env` file in the root directory using `.env.example` as a template:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Algolia credentials in `.env`:
   ```env
   # Public variables (used by the frontend)
   VITE_ALGOLIA_APP_ID=app_id_here
   VITE_ALGOLIA_SEARCH_API_KEY=search_only_api_key_here
   VITE_ALGOLIA_INDEX_NAME=index_name_here

   # Private variables (used only for indexing)
   ALGOLIA_ADMIN_API_KEY=your_admin_api_key_here
   ```

   ⚠️ **IMPORTANT**: 
   - Never commit your `.env` file to version control
   - Keep admin API key private and secure
   - The search-only API key is public and safe to use in the frontend

### Installation
  1. Clone the repository:
```bash
  git clone https://github.com/juangpartida/juangpartida-dse-algoliasearch-demo.git
  cd juangpartida-dse-algoliasearch-demo
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
    base: '/juangpartida-dse-algoliasearch-demo/'
    ```

    2. Deploy to GitHub Pages:
    ```bash
    npm run deploy

### Running the Indexing Script

The indexing script is written in TypeScript and located in `scripts/index.ts`. It:
- Reads product data from `src/data/products.json`
- Configures index settings for optimal search relevance
- Uploads the data to your Algolia index

To run the indexing script:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the indexing script:
   ```bash
   npm run index-data
   ```

### Customizing the Index

The script configures several important index settings:

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
  ]
}
```

Modify these settings in `scripts/index.ts` to adjust search relevance and filtering capabilities.

### Using Your Own Data

To index your own product data:

1. Replace or modify `src/data/products.json` with your product data
2. Ensure your data follows the same structure:
   ```json
   {
     "name": "Product Name",
     "description": "Product Description",
     "brand": "Brand Name",
     "categories": ["Category 1", "Category 2"],
     "price": 99.99,
     "image": "image_url",
     "rating": 4,
     "popularity": 100
   }
   ```
3. Run the indexing script again

