'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, Search, Building2 } from 'lucide-react';
import { BrandWithEvents } from './EventLibraryPage';

interface BrandSelectionStepProps {
  onNext: (brands: BrandWithEvents[]) => void;
}

export const BrandSelectionStep = ({ onNext }: BrandSelectionStepProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);

  // Sample brands data
  const availableBrands = [
    { id: 1, name: 'Brand 1', selected: false },
    { id: 2, name: 'Brand 2', selected: false },
    { id: 3, name: 'Brand 3', selected: false },
    { id: 4, name: 'Brand 4', selected: false },
    { id: 5, name: 'Brand 5', selected: false },
    { id: 6, name: 'Brand 6', selected: false },
    { id: 7, name: 'Brand 7', selected: false },
    { id: 8, name: 'Brand 8', selected: false },
  ];

  // Generate sample events for each brand
  const generateEventsForBrand = (brandId: number) => {
    return Array.from({ length: 3 }, (_, eventIndex) => ({
      id: brandId * 100 + eventIndex + 1,
      name: `Event ${eventIndex + 1}`,
      attributes: Array.from({ length: 3 }, (_, attrIndex) => ({
        id: brandId * 1000 + eventIndex * 10 + attrIndex + 1,
        name: `Attribute ${attrIndex + 1}`,
        value: `Value ${attrIndex + 1}`
      }))
    }));
  };

  const filteredBrands = availableBrands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBrandToggle = (brandId: number) => {
    setSelectedBrandIds(prev => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  const handleNext = () => {
    const selectedBrands: BrandWithEvents[] = availableBrands
      .filter(brand => selectedBrandIds.includes(brand.id))
      .map(brand => ({
        ...brand,
        selected: true,
        events: generateEventsForBrand(brand.id)
      }));
    
    onNext(selectedBrands);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Event Library</h1>
        <p className="text-white/70">Select brands to view their saved events from Trade Calendar</p>
      </div>

      {/* Search */}
      <Card className="bg-slate-800/50 border-white/20 mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <input
              type="text"
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-[#009bcc] focus:border-[#009bcc] transition-all"
            />
          </div>
        </CardContent>
      </Card>

      {/* Brand Selection */}
      <Card className="bg-slate-800/50 border-white/20 mb-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Select Brands ({selectedBrandIds.length} selected)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBrands.map((brand) => (
              <div
                key={brand.id}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  selectedBrandIds.includes(brand.id)
                    ? 'bg-[#009bcc]/20 border-[#009bcc] shadow-lg'
                    : 'bg-slate-700/30 border-white/20 hover:bg-slate-700/50 hover:border-white/30'
                }`}
                onClick={() => handleBrandToggle(brand.id)}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={selectedBrandIds.includes(brand.id)}
                    onChange={() => handleBrandToggle(brand.id)}
                    className="border-white/30"
                  />
                  <div>
                    <h3 className="text-white font-medium">{brand.name}</h3>
                    <p className="text-white/60 text-sm">3 events available</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBrands.length === 0 && (
            <div className="text-center py-8">
              <p className="text-white/60">No brands found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleNext}
          disabled={selectedBrandIds.length === 0}
          className="bg-[#009bcc] hover:bg-[#007a9a] text-white px-8 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          View Events Library
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
