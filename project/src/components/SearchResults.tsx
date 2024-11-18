/*
 * Written by: Juan G Partida
 * Date: 11/15/2024
 * 
 * Component for displaying search results in either grid or list view
 */

import React, { useState } from 'react';
import { Hits, Pagination } from 'react-instantsearch';
import { ProductHit, ProductListHit } from './ProductHit';
import { ViewToggle } from './ViewToggle';

export function SearchResults() {
  // State for tracking current view mode
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="col-span-9">
      {/* View toggle controls */}
      <ViewToggle view={view} setView={setView} />
      
      {/* Search results display */}
      <Hits
        hitComponent={view === 'grid' ? ProductHit : ProductListHit}
        classNames={{
          list: view === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'flex flex-col space-y-4',
        }}
      />
      
      {/* Pagination controls */}
      <div className="mt-8 flex justify-center">
        <Pagination
          padding={2}
          totalPages={50}
          classNames={{
            list: 'flex space-x-1',
            item: 'px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md',
            selectedItem: 'bg-indigo-600 text-white hover:bg-indigo-700',
          }}
        />
      </div>
    </div>
  );
}