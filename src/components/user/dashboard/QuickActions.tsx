'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Sparkles } from 'lucide-react';

export default function QuickActions() {
  return (
    <div className="mt-8">
      <Card className="bg-gradient-to-r from-[#009bcc]/5 to-blue-50 border-[#009bcc]/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to optimize more?</h3>
              <p className="text-gray-600">
                Start a new optimization project or explore advanced AI features to boost your business performance.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Upload className="w-4 h-4" />
                Import Data
              </Button>
              <Button className="bg-[#009bcc] hover:bg-[#007ba3] text-white gap-2">
                <Sparkles className="w-4 h-4" />
                Start AI Analysis
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
