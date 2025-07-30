import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function ButtonRowsDemo() {
  return (
    <div className="space-y-6">
      {/* First row - Standard size buttons (already existing) */}
      <div className="flex flex-wrap gap-1 items-center">
        <Button variant="empty">Empty</Button>
        <Button className="btn-primary">Primary</Button>
        <Button className="btn-secondary">Secondary</Button>
        <Button disabled className="bg-muted text-gray-900 border border-muted">Disabled</Button>
        <Button className="bg-blue-600 text-white hover:bg-blue-700">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading
        </Button>
        <Button variant="success">Success</Button>
        <Button className="bg-red-600 text-white hover:bg-red-700">Error</Button>
        <Button className="bg-yellow-500 text-white hover:bg-yellow-600">Warning</Button>
      </div>

      {/* Second row - Medium size buttons */}
      <div className="flex flex-wrap gap-1 items-center">
        <Button size="sm" variant="empty" className="text-xs px-3 py-1 h-8">Empty</Button>
        <Button size="sm" className="btn-primary text-xs px-3 py-1 h-8">Primary</Button>
        <Button size="sm" className="btn-secondary text-xs px-3 py-1 h-8">Secondary</Button>
        <Button size="sm" disabled className="bg-muted text-gray-900 border border-muted text-xs px-3 py-1 h-8">Disabled</Button>
        <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700 text-xs px-3 py-1 h-8">
          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
          Loading
        </Button>
        <Button size="sm" variant="success" className="text-xs px-3 py-1 h-8">Success</Button>
        <Button size="sm" className="bg-red-600 text-white hover:bg-red-700 text-xs px-3 py-1 h-8">Error</Button>
        <Button size="sm" className="bg-yellow-500 text-white hover:bg-yellow-600 text-xs px-3 py-1 h-8">Warning</Button>
      </div>

      {/* Third row - Small size buttons */}
      <div className="flex flex-wrap gap-1 items-center">
        <Button size="sm" variant="empty" className="text-sm px-2 py-1 h-7">Empty</Button>
        <Button size="sm" className="btn-primary text-sm px-2 py-1 h-7">Primary</Button>
        <Button size="sm" className="btn-secondary text-sm px-2 py-1 h-7">Secondary</Button>
        <Button size="sm" disabled className="bg-muted text-gray-900 border border-muted text-sm px-2 py-1 h-7">Disabled</Button>
        <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700 text-sm px-2 py-1 h-7">
          <Loader2 className="mr-1 h-2 w-2 animate-spin" />
          Loading
        </Button>
        <Button size="sm" variant="success" className="text-sm px-2 py-1 h-7">Success</Button>
        <Button size="sm" className="bg-red-600 text-white hover:bg-red-700 text-sm px-2 py-1 h-7">Error</Button>
        <Button size="sm" className="bg-yellow-500 text-white hover:bg-yellow-600 text-sm px-2 py-1 h-7">Warning</Button>
      </div>
    </div>
  );
}
