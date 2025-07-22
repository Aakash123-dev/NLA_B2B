'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CompetitorsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-50/80 to-amber-50/80 border-b border-orange-100/50">
          <CardTitle className="text-xl font-bold text-gray-900">
            Competitors Outside Brand
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center text-gray-600">
            <p className="text-sm">No competitor data available</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
