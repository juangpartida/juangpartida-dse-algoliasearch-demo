/*
 * Written by: Juan G Partida
 * Date: 11/15/2024
 */

import React from 'react';
import { ShoppingBag } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Spencer and Williams</h1>
          </div>
        </div>
      </div>
    </header>
  );
}