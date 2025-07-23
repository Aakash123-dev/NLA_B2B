'use client';

import React from 'react';
import { Package, DollarSign, Users, TrendingDown, TrendingUp } from 'lucide-react';

export function ProductTableHeader() {
  return (
    <thead className="bg-gradient-to-r from-slate-50/80 to-gray-50/80 border-b border-slate-200/60">
      <tr>
        <th className="text-left px-6 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-80">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-slate-500" />
            Product
          </div>
        </th>
        <th className="text-center px-4 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-24">
          <div className="flex items-center justify-center gap-1">
            <DollarSign className="w-4 h-4 text-green-500" />
            Latest Price
          </div>
        </th>
        <th className="text-center px-4 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-28">
          <div className="flex items-center justify-center gap-1">
            <Users className="w-4 h-4 text-blue-500" />
            <div>
              Total Units
              <br/>
              <span className="text-[10px] text-slate-500 normal-case">(Last 52 Weeks)</span>
            </div>
          </div>
        </th>
        <th className="text-center px-4 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-28">
          <div className="flex items-center justify-center gap-1">
            <DollarSign className="w-4 h-4 text-emerald-500" />
            Total Dollars
          </div>
        </th>
        <th className="text-center px-4 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-32">
          <div className="flex items-center justify-center gap-1">
            <DollarSign className="w-4 h-4 text-indigo-500" />
            New Price
          </div>
        </th>
        <th className="text-center px-4 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-24">New Units</th>
        <th className="text-center px-4 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-28">
          <div className="flex items-center justify-center gap-1">
            <TrendingDown className="w-4 h-4 text-red-500" />
            Change Units
          </div>
        </th>
        <th className="text-center px-4 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-24">% Change</th>
        <th className="text-center px-4 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-28">
          <div className="flex items-center justify-center gap-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            New Dollars
          </div>
        </th>
        <th className="text-center px-4 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-28">Change $</th>
        <th className="text-center px-4 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-24">% Change</th>
      </tr>
    </thead>
  );
}
