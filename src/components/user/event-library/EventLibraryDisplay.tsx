'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Building2, Calendar, Tag } from 'lucide-react';
import { BrandWithEvents } from './EventLibraryPage';

interface EventLibraryDisplayProps {
  brands: BrandWithEvents[];
  onBack: () => void;
}

export const EventLibraryDisplay = ({ brands, onBack }: EventLibraryDisplayProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Event Library</h1>
          <p className="text-white/70">
            Viewing events for {brands.length} selected brand{brands.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button
          onClick={onBack}
          variant="outline"
          className="bg-slate-700/50 border-white/20 text-white hover:bg-slate-600/50 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Selection
        </Button>
      </div>

      {/* Brands and Events Display */}
      <div className="space-y-8">
        {brands.map((brand) => (
          <Card key={brand.id} className="bg-slate-800/50 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-[#009bcc]/20 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#009bcc]" />
                </div>
                {brand.name}
                <Badge variant="secondary" className="bg-[#009bcc]/20 text-[#009bcc] border-[#009bcc]/30">
                  {brand.events.length} events
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {brand.events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-slate-700/30 rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all"
                  >
                    {/* Event Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-slate-600/50 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-white/70" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{event.name}</h3>
                      <Badge variant="outline" className="border-white/30 text-white/70">
                        {event.attributes.length} attributes
                      </Badge>
                    </div>

                    {/* Event Attributes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {event.attributes.map((attribute) => (
                        <div
                          key={attribute.id}
                          className="bg-slate-600/30 rounded-lg p-4 border border-white/10"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-slate-500/50 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Tag className="w-3 h-3 text-white/60" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm font-medium text-white mb-1">
                                {attribute.name}
                              </h4>
                              <p className="text-sm text-white/70 break-words">
                                {attribute.value}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {brands.length === 0 && (
        <Card className="bg-slate-800/50 border-white/20">
          <CardContent className="text-center py-12">
            <Calendar className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No Events Found</h3>
            <p className="text-white/60">
              No events are available for the selected brands.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Summary Footer */}
      {brands.length > 0 && (
        <Card className="bg-slate-700/30 border-white/20 mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <h3 className="font-medium mb-1">Library Summary</h3>
                <p className="text-sm text-white/70">
                  Total: {brands.length} brands, {brands.reduce((sum, brand) => sum + brand.events.length, 0)} events, {brands.reduce((sum, brand) => sum + brand.events.reduce((eventSum, event) => eventSum + event.attributes.length, 0), 0)} attributes
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-slate-600/50 border-white/20 text-white hover:bg-slate-500/50"
                >
                  Export Data
                </Button>
                <Button
                  size="sm"
                  className="bg-[#009bcc] hover:bg-[#007a9a] text-white"
                >
                  Add New Event
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
