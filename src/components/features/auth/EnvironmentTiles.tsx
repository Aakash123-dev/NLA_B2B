'use client';

import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';

// Environment tile component props
export interface EnvironmentTileProps {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  roles: string[];
  tags: string[];
  onClick: (id: string) => void;
  isDisabled?: boolean;
  isHidden?: boolean;
}

export const EnvironmentTile: React.FC<EnvironmentTileProps> = ({
  id,
  name,
  description,
  icon: Icon,
  color,
  roles,
  tags,
  onClick,
  isDisabled = false,
  isHidden = false,
}) => {
  if (isHidden) {
    return null;
  }

  return (
    <Card 
      className={`overflow-hidden border-2 transition-all group ${
        isDisabled 
          ? 'opacity-60 cursor-not-allowed border-slate-200' 
          : 'hover:border-blue-500 hover:shadow-lg cursor-pointer'
      }`}
      onClick={() => !isDisabled && onClick(id)}
    >
      <div className={`${color} h-2 w-full`}></div>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className={`${color} bg-opacity-20 p-3 rounded-lg`}>
            <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
          </div>
          {!isDisabled && (
            <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="h-4 w-4 mr-2" />
              Launch
            </Button>
          )}
          {isDisabled && (
            <Badge variant="outline" className="bg-slate-100 text-slate-500">
              <ShieldCheck className="h-3 w-3 mr-1" />
              Restricted
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg mt-4">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs bg-slate-50">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-slate-50 border-t flex justify-between items-center">
        <span className="text-xs text-slate-500">
          {roles.includes('all') ? 'Available to everyone' : `Restricted access`}
        </span>
        {!isDisabled && (
          <div className="flex items-center text-blue-600 text-sm">
            <span>Enter demo</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

// Environment tile management component props
export interface EnvironmentTilesProps {
  environments: Array<{
    id: string;
    name: string;
    description: string;
    icon: React.ElementType;
    color: string;
    roles: string[];
    tags: string[];
  }>;
  userRole?: string;
  onSelectEnvironment: (id: string) => void;
  isAdminMode?: boolean;
}

export const EnvironmentTiles: React.FC<EnvironmentTilesProps> = ({
  environments,
  userRole = '',
  onSelectEnvironment,
  isAdminMode = false,
}) => {
  const [hiddenTiles, setHiddenTiles] = useState<string[]>([]);
  
  // Function to toggle visibility of a tile (admin only)
  const toggleTileVisibility = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdminMode) return;
    
    setHiddenTiles(prev => 
      prev.includes(id) 
        ? prev.filter(tileId => tileId !== id) 
        : [...prev, id]
    );
  };
  
  // Filter environments based on user role if not in admin mode
  const filteredEnvironments = environments.filter(env => 
    isAdminMode || env.roles.includes('all') || env.roles.includes(userRole)
  );
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {filteredEnvironments.map((env) => {
        const isDisabled = !isAdminMode && !env.roles.includes('all') && !env.roles.includes(userRole);
        const isHidden = hiddenTiles.includes(env.id);
        
        return (
          <div key={env.id} className="relative">
            {isAdminMode && (
              <Button
                size="sm"
                variant="ghost"
                className="absolute -top-2 -right-2 z-10 rounded-full h-8 w-8 p-0 bg-white shadow-md border"
                onClick={(e) => toggleTileVisibility(env.id, e)}
              >
                {isHidden ? (
                  <EyeOff className="h-4 w-4 text-slate-500" />
                ) : (
                  <Eye className="h-4 w-4 text-blue-500" />
                )}
              </Button>
            )}
            <EnvironmentTile
              {...env}
              onClick={onSelectEnvironment}
              isDisabled={isDisabled}
              isHidden={!isAdminMode && isHidden}
            />
          </div>
        );
      })}
    </div>
  );
};
