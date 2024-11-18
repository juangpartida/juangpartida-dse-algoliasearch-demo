import React from 'react';

interface PanelProps {
  title: string;
  children: React.ReactNode;
}

export function Panel({ title, children }: PanelProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-base uppercase font-semibold text-gray-500 mb-4">{title}</h3>
      {children}
    </div>
  );
}