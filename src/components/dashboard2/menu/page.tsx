"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Star,
  DollarSign,
  Clock,
  ChefHat,
  Utensils,
  Pizza,
  Coffee,
  Sandwich,
  Soup,
  Eye,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Package,
  User,
  Home,
  Flame,
  Bell,
  Settings,
  LogOut,
  ShoppingCart,
  Users,
  BarChart3,
  Image as ImageIcon,
  Heart,
  Share2
} from 'lucide-react';

// Sample menu data
const menuItems = [
  {
    id: 1,
    name: 'Spicy Chicken Burger',
    description: 'Juicy grilled chicken breast with spicy mayo, lettuce, tomato, and crispy bacon on a brioche bun',
    price: 15.99,
    originalPrice: 18.99,
    category: 'Burgers',
    image: '/api/placeholder/300/200',
    rating: 4.8,
    reviews: 324,
    prepTime: '12-15 min',
    calories: 620,
    isPopular: true,
    isNew: false,
    inStock: true,
    tags: ['Spicy', 'Bestseller', 'Chicken'],
    allergens: ['Gluten', 'Dairy'],
    ingredients: ['Chicken Breast', 'Bacon', 'Lettuce', 'Tomato', 'Spicy Mayo', 'Brioche Bun']
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    description: 'Classic Italian pizza with fresh mozzarella, tomato sauce, and basil on thin crust',
    price: 18.99,
    originalPrice: null,
    category: 'Pizza',
    image: '/api/placeholder/300/200',
    rating: 4.9,
    reviews: 456,
    prepTime: '15-20 min',
    calories: 580,
    isPopular: true,
    isNew: false,
    inStock: true,
    tags: ['Vegetarian', 'Classic', 'Italian'],
    allergens: ['Gluten', 'Dairy'],
    ingredients: ['Mozzarella', 'Tomato Sauce', 'Fresh Basil', 'Olive Oil', 'Pizza Dough']
  },
  {
    id: 3,
    name: 'BBQ Ribs',
    description: 'Slow-cooked baby back ribs with our signature BBQ sauce, served with coleslaw and cornbread',
    price: 24.99,
    originalPrice: null,
    category: 'Grilled',
    image: '/api/placeholder/300/200',
    rating: 4.7,
    reviews: 289,
    prepTime: '25-30 min',
    calories: 890,
    isPopular: false,
    isNew: false,
    inStock: true,
    tags: ['BBQ', 'Ribs', 'Smoky'],
    allergens: ['Gluten'],
    ingredients: ['Baby Back Ribs', 'BBQ Sauce', 'Coleslaw', 'Cornbread', 'Spices']
  },
  {
    id: 4,
    name: 'Truffle Mushroom Risotto',
    description: 'Creamy arborio rice with wild mushrooms, truffle oil, and parmesan cheese',
    price: 22.99,
    originalPrice: null,
    category: 'Pasta & Rice',
    image: '/api/placeholder/300/200',
    rating: 4.6,
    reviews: 178,
    prepTime: '20-25 min',
    calories: 520,
    isPopular: false,
    isNew: true,
    inStock: true,
    tags: ['Vegetarian', 'Truffle', 'Creamy'],
    allergens: ['Dairy'],
    ingredients: ['Arborio Rice', 'Wild Mushrooms', 'Truffle Oil', 'Parmesan', 'White Wine']
  },
  {
    id: 5,
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with caesar dressing, croutons, and parmesan cheese',
    price: 12.99,
    originalPrice: 14.99,
    category: 'Salads',
    image: '/api/placeholder/300/200',
    rating: 4.4,
    reviews: 234,
    prepTime: '5-8 min',
    calories: 320,
    isPopular: false,
    isNew: false,
    inStock: true,
    tags: ['Healthy', 'Fresh', 'Classic'],
    allergens: ['Dairy', 'Gluten'],
    ingredients: ['Romaine Lettuce', 'Caesar Dressing', 'Croutons', 'Parmesan', 'Anchovies']
  },
  {
    id: 6,
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten chocolate center, served with vanilla ice cream',
    price: 8.99,
    originalPrice: null,
    category: 'Desserts',
    image: '/api/placeholder/300/200',
    rating: 4.9,
    reviews: 567,
    prepTime: '10-12 min',
    calories: 450,
    isPopular: true,
    isNew: false,
    inStock: false,
    tags: ['Dessert', 'Chocolate', 'Warm'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    ingredients: ['Dark Chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour', 'Vanilla Ice Cream']
  }
];

const categories = ['All', 'Burgers', 'Pizza', 'Grilled', 'Pasta & Rice', 'Salads', 'Desserts', 'Beverages'];

const MenuCard = ({ item, index }: { item: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-red-900/30 shadow-2xl hover:shadow-red-500/20 transition-all duration-300 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <div className="w-full h-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
            <ImageIcon className="h-16 w-16 text-gray-600" />
          </div>
          
          {/* Status Badges */}
          <div className="absolute top-3 left-3 flex gap-2 z-20">
            {item.isNew && (
              <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
                New
              </Badge>
            )}
            {item.isPopular && (
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                Popular
              </Badge>
            )}
            {!item.inStock && (
              <Badge className="bg-gray-600 text-white">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-3 right-3 flex gap-2 z-20"
          >
            <Button size="icon" variant="ghost" className="bg-black/50 hover:bg-black/70 text-white">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="bg-black/50 hover:bg-black/70 text-white">
              <Share2 className="h-4 w-4" />
            </Button>
          </motion.div>

          {/* Price */}
          <div className="absolute bottom-3 right-3 z-20">
            <div className="flex items-center gap-2">
              {item.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${item.originalPrice}
                </span>
              )}
              <span className="text-xl font-bold text-white bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 rounded-full">
                ${item.price}
              </span>
            </div>
          </div>
        </div>

        <CardContent className="p-4 relative z-10">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
              <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-red-900/20">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-gray-700">
                <DropdownMenuItem className="text-gray-300 hover:bg-red-900/20">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-red-900/20">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Item
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-red-900/20">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Item
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-300">{item.rating}</span>
              <span className="text-sm text-gray-500">({item.reviews})</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-orange-400" />
              <span className="text-sm text-gray-300">{item.prepTime}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 2).map((tag: string, tagIndex: number) => (
                <Badge key={tagIndex} variant="outline" className="text-xs border-orange-500/30 text-orange-400">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${item.inStock ? 'bg-green-500' : 'bg-red-500'} text-white text-xs`}>
                {item.inStock ? 'In Stock' : 'Out of Stock'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [filteredItems, setFilteredItems] = useState(menuItems);

  useEffect(() => {
    let filtered = menuItems;

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (categoryFilter !== 'All') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    setFilteredItems(filtered);
  }, [searchTerm, categoryFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.15),rgba(255,255,255,0))] opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-red-600/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 bg-black/90 backdrop-blur-md border-b border-red-900/20 px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
                <Flame className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Gazelle
              </span>
            </motion.div>
            
            <div className="hidden md:flex items-center gap-1">
              <Button 
                variant="ghost" 
                className="text-gray-400 hover:bg-red-900/20 hover:text-red-300"
                onClick={() => window.location.href = '/dashboard2'}
              >
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-400 hover:bg-red-900/20 hover:text-red-300"
                onClick={() => window.location.href = '/dashboard2/orders'}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Orders
              </Button>
              <Button variant="ghost" className="text-white hover:bg-red-900/20 hover:text-red-300">
                <Package className="h-4 w-4 mr-2" />
                Menu
              </Button>
              <Button variant="ghost" className="text-gray-400 hover:bg-red-900/20 hover:text-red-300">
                <Users className="h-4 w-4 mr-2" />
                Customers
              </Button>
              <Button variant="ghost" className="text-gray-400 hover:bg-red-900/20 hover:text-red-300">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-red-900/20 hover:text-red-300 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
              </Button>
            </motion.div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Chef" />
                    <AvatarFallback className="bg-gradient-to-r from-red-500 to-orange-500">
                      CK
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-900 border-gray-700" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-white">Chef Kitchen</p>
                    <p className="text-xs leading-none text-gray-400">chef@gazelle.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="text-gray-300 hover:bg-red-900/20">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-red-900/20">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="text-gray-300 hover:bg-red-900/20">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.nav>

      <div className="relative z-10 p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
                Menu Management
              </h1>
              <p className="text-gray-400 text-lg">
                Manage your restaurant's delicious offerings
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add New Item
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search menu items, categories, or tags..." 
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={categoryFilter === category ? "default" : "outline"}
                  className={`${
                    categoryFilter === category
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                      : 'border-red-900/30 text-gray-300 hover:bg-red-900/20'
                  }`}
                  onClick={() => setCategoryFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <MenuCard key={item.id} item={item} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Package className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Items Found</h3>
            <p className="text-gray-400">No menu items match your current filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
