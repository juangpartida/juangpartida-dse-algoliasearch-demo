import React from 'react';
import {
  InstantSearch,
  Configure,
  PoweredBy,
  SearchBox as InstantSearchBox,
  Hits,
  Pagination,
  RefinementList,
  ClearRefinements,
  CurrentRefinements
} from 'react-instantsearch';
import { searchClient, ALGOLIA_INDEX_NAME, searchConfiguration } from './config/algolia';
import { Header } from './components/Header';
import { SearchBox } from './components/SearchBox';
import { Filters } from './components/Filters';
import { SearchResults } from './components/SearchResults';
import 'instantsearch.css/themes/satellite.css';
import './style.css';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
          <Configure 
            {...searchConfiguration}
            facets={['*']}
            maxValuesPerFacet={20}
          />
          <SearchBox />
          <div className="grid grid-cols-12 gap-8">
            <Filters />
            <SearchResults />
          </div>
          <div className="mt-8 flex justify-center">
            <PoweredBy />
          </div>
        </InstantSearch>
      </main>
    </div>
  );
}