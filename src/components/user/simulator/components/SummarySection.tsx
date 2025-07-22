'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SummarySectionProps {
  selectedBrand: string;
}

export function SummarySection({ selectedBrand }: SummarySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 border-b border-purple-100/50">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center justify-between">
            Summary
            <Badge variant="outline" className="bg-white/50 text-purple-700 border-purple-200">
              {selectedBrand}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center text-gray-600">
            <p className="text-lg font-medium">Ready to simulate pricing scenarios</p>
            <p className="text-sm mt-2">Select products and enter new prices to begin analysis</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
