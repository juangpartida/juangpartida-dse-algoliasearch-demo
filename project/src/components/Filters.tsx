/*
 * Written by: Juan G Partida
 * Date: 11/15/2024
 *
 * Component for displaying all filter options
 */

import React from 'react';
import {
  RefinementList,
  ClearRefinements,
  CurrentRefinements,
} from 'react-instantsearch';
import { Panel } from './Panel';
import { RatingFilter } from './RatingFilter';

export function Filters() {
  return (
    <div className="col-span-3 space-y-6">
      <div className="mb-6">
        <ClearRefinements
          classNames={{
            button:
              'px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full',
            disabledButton: 'opacity-50 cursor-not-allowed',
          }}
        />
        <CurrentRefinements
          classNames={{
            list: 'mt-4 space-y-2',
            item: 'flex items-center space-x-2',
            label: 'text-sm text-gray-600',
            category:
              'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800',
            delete: 'ml-1 text-indigo-600 hover:text-indigo-900',
          }}
        />
      </div>

      <Panel title="Rating">
        <RatingFilter />
      </Panel>

      <Panel title="Brand">
        <RefinementList
          attribute="brand"
          limit={10}
          showMore={true}
          showMoreLimit={20}
          classNames={{
            root: 'mb-6',
            list: 'space-y-2',
            item: 'flex items-center',
            label: 'flex items-center w-full cursor-pointer',
            checkbox:
              'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500',
            labelText: 'ml-3 text-sm text-gray-700 flex-grow',
            count:
              'ml-2 text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5',
            showMore: 'mt-4 text-sm text-indigo-600 hover:text-indigo-500',
          }}
        />
      </Panel>

      <Panel title="Categories">
        <RefinementList
          attribute="categories"
          limit={10}
          showMore={true}
          showMoreLimit={20}
          classNames={{
            root: 'mb-6',
            list: 'space-y-2',
            item: 'flex items-center',
            label: 'flex items-center w-full cursor-pointer',
            checkbox:
              'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500',
            labelText: 'ml-3 text-sm text-gray-700 flex-grow',
            count:
              'ml-2 text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5',
            showMore: 'mt-4 text-sm text-indigo-600 hover:text-indigo-500',
          }}
        />
      </Panel>
    </div>
  );
}
