/*
 * Written by: Juan G Partida
 * Date: 11/15/2024
 * 
 * Component for the search input and header section
 */

import React from 'react';
import { SearchBox as InstantSearchBox } from 'react-instantsearch';

export function SearchBox() {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
        Quality Tech, Affordable Prices
      </h2>
      <p className="text-xl text-gray-600 mb-8">
        Discover our curated collection of premium tech products
      </p>
      <div className="max-w-2xl mx-auto">
        <InstantSearchBox
          placeholder="Search products..."
          classNames={{
            root: 'relative',
            form: 'relative',
            input: 'w-full py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
            submit: 'absolute left-4 top-1/2 -translate-y-1/2',
            submitIcon: 'w-5 h-5 text-gray-400',
            reset: 'absolute right-4 top-1/2 -translate-y-1/2',
            resetIcon: 'w-5 h-5 text-gray-400',
          }}
        />
      </div>
    </div>
  );
}