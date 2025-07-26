'use client'

import React from 'react'
import { TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function PromotionResultsTableSection() {
  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          Promotion Results
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-hidden border-t border-slate-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="font-semibold text-slate-700 py-3 px-4">Promotion Type</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center py-3 px-4">% ACV</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center py-3 px-4">% Lift</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center py-3 px-4">Units</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center py-3 px-4">Dollars</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-blue-50/50 transition-colors">
                <TableCell className="font-medium py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    TPR
                  </div>
                </TableCell>
                <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
              </TableRow>
              <TableRow className="hover:bg-emerald-50/50 transition-colors">
                <TableCell className="font-medium py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Feature Only
                  </div>
                </TableCell>
                <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
              </TableRow>
              <TableRow className="hover:bg-amber-50/50 transition-colors">
                <TableCell className="font-medium py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    Display Only
                  </div>
                </TableCell>
                <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
              </TableRow>
              <TableRow className="hover:bg-red-50/50 transition-colors">
                <TableCell className="font-medium py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Feature and Display
                  </div>
                </TableCell>
                <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
              </TableRow>
              <TableRow className="bg-purple-50/70 hover:bg-purple-100/70 transition-colors">
                <TableCell className="font-semibold py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Event Incremental
                  </div>
                </TableCell>
                <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
              </TableRow>
              <TableRow className="bg-slate-100/70 hover:bg-slate-200/70 transition-colors border-t-2 border-slate-300">
                <TableCell className="font-bold py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                    Event Total
                  </div>
                </TableCell>
                <TableCell className="text-center text-slate-500 font-semibold py-3 px-4">-</TableCell>
                <TableCell className="text-center text-slate-500 font-semibold py-3 px-4">-</TableCell>
                <TableCell className="text-center text-slate-500 font-semibold py-3 px-4">-</TableCell>
                <TableCell className="text-center text-slate-500 font-semibold py-3 px-4">-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
