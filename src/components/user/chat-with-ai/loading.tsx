'use client';

import { Brain } from 'lucide-react';
import { Skeleton } from '@/components/ui';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header section - skeleton */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="w-full px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-8 w-20">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="w-px h-6 bg-slate-300" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">Gazelle AI</h1>
                  <div className="h-4 w-48">
                    <Skeleton className="h-full w-full" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="h-8 w-28">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="h-8 w-8">
                <Skeleton className="h-full w-full rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content - skeleton */}
      <div className="container mx-auto px-4 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
        {/* Chat sidebar skeleton */}
        <div className="hidden md:block w-64 border-r border-slate-200 pr-4">
          <div className="mb-4">
            <Skeleton className="h-10 w-full" />
          </div>
          
          <div className="mb-4">
            <Skeleton className="h-10 w-full" />
          </div>
          
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
        
        {/* Chat main area skeleton */}
        <div className="flex-1 flex flex-col">
          {/* Mobile tabs skeleton */}
          <div className="md:hidden mb-4">
            <Skeleton className="h-10 w-full" />
          </div>
          
          {/* Messages area skeleton */}
          <div className="flex-1">
            <div className="space-y-6">
              <div className="flex justify-start">
                <div className="flex flex-row gap-4 max-w-[85%]">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-24 w-64 rounded-xl" />
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="flex flex-row-reverse gap-4 max-w-[85%]">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-16 w-48 rounded-xl" />
                </div>
              </div>
              
              <div className="flex justify-start">
                <div className="flex flex-row gap-4 max-w-[85%]">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-32 w-80 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Input area skeleton */}
          <div className="mt-4">
            <Skeleton className="h-32 w-full rounded-xl" />
            <div className="mt-3 flex justify-center">
              <Skeleton className="h-4 w-72" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
