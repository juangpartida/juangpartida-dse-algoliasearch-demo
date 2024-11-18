/*
 * Written by: Juan G Partida
 * Date: 11/15/2024
 * 
 * Algolia configuration and client setup
 */

import algoliasearch from 'algoliasearch/lite';

// Get environment variables
const appId = import.meta.env.VITE_ALGOLIA_APP_ID;
const searchApiKey = import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY;
const indexName = import.meta.env.VITE_ALGOLIA_INDEX_NAME;

// Validate environment variables
if (!appId || !searchApiKey || !indexName) {
  throw new Error(
    'Missing Algolia environment variables. Please check your .env file.'
  );
}

export const searchClient = algoliasearch(appId, searchApiKey);

export const ALGOLIA_INDEX_NAME = indexName;

export const searchConfiguration = {
  // Pagination settings
  hitsPerPage: 20,
  
  // Attributes to retrieve and highlight
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
};