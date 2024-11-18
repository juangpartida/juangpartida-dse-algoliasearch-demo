/*
 * Written by: Juan G Partida
 * Date: 11/15/2024
 * 
 * Script to index product data to Algolia
 */

import * as dotenv from 'dotenv';
import algoliasearch from 'algoliasearch';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load environment variables
dotenv.config();

// Get admin API key from environment
const adminApiKey = process.env.ALGOLIA_ADMIN_API_KEY;
const appId = process.env.VITE_ALGOLIA_APP_ID;
const indexName = process.env.VITE_ALGOLIA_INDEX_NAME;

// Validate environment variables
if (!adminApiKey || !appId || !indexName) {
  console.error('Missing required environment variables. Please check your .env file.');
  process.exit(1);
}

async function indexData() {
  try {
    // Initialize the admin client
    const client = algoliasearch(appId, adminApiKey);
    const index = client.initIndex(indexName);

    // Read products data
    const productsData = JSON.parse(
      readFileSync(join(__dirname, '../src/data/products.json'), 'utf8')
    );

    // Configure index settings
    await index.setSettings({
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
      // Other settings as needed
      distinct: true,
      attributeForDistinct: 'name'
    });

    // Upload the records
    const { objectIDs } = await index.saveObjects(productsData, {
      autoGenerateObjectIDIfNotExist: true
    });

    console.log(`Successfully indexed ${objectIDs.length} products`);
  } catch (error) {
    console.error('Error indexing data:', error);
    process.exit(1);
  }
}

// Run the indexing
indexData();