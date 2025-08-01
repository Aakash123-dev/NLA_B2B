'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Search,
  FileText,
  Calendar,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { Question } from '../types';

interface QuestionManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  onSave: (data: Partial<Question>) => void;
  onUpdate: (questions: Question[]) => void;
}

const QuestionManagementModal: React.FC<QuestionManagementModalProps> = ({
  isOpen,
  onClose,
  questions,
  onSave,
  onUpdate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isCreating, setIsCreating] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [formData, setFormData] = useState({
    text: '',
    category: 'promo' as 'promo' | 'base' | 'strat' | 'overall',
    isActive: true
  });

  // Filter questions based on search and category
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || question.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      promo: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      base: 'bg-blue-100 text-blue-800 border-blue-200',
      strat: 'bg-purple-100 text-purple-800 border-purple-200',
      overall: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleCreateNew = () => {
    setEditingQuestion(null);
    setFormData({
      text: '',
      category: 'promo',
      isActive: true
    });
    setIsCreating(true);
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setFormData({
      text: question.text,
      category: question.category,
      isActive: question.isActive
    });
    setIsCreating(true);
  };

  const handleSave = () => {
    if (editingQuestion) {
      // Update existing question
      const updatedQuestions = questions.map(q => 
        q.id === editingQuestion.id 
          ? { ...q, ...formData, updatedAt: new Date() }
          : q
      );
      onUpdate(updatedQuestions);
    } else {
      // Create new question
      onSave(formData);
    }
    setIsCreating(false);
    setFormData({ text: '', category: 'promo', isActive: true });
  };

  const handleDelete = (questionId: string) => {
    const updatedQuestions = questions.filter(q => q.id !== questionId);
    onUpdate(updatedQuestions);
  };

  const handleToggleActive = (questionId: string, isActive: boolean) => {
    const updatedQuestions = questions.map(q => 
      q.id === questionId 
        ? { ...q, isActive, updatedAt: new Date() }
        : q
    );
    onUpdate(updatedQuestions);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingQuestion(null);
    setFormData({ text: '', category: 'promo', isActive: true });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Question Management
          </DialogTitle>
        </DialogHeader>

        {!isCreating ? (
          // Question List View
          <div className="space-y-6">
            {/* Header with Search and Filters */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="promo">Promo</SelectItem>
                  <SelectItem value="base">Base</SelectItem>
                  <SelectItem value="strat">Strategic</SelectItem>
                  <SelectItem value="overall">Overall</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Question
              </Button>
            </div>

            {/* Questions List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredQuestions.map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`text-xs ${getCategoryColor(question.category)}`}>
                            {question.category.toUpperCase()}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {question.isActive ? (
                              <ToggleRight className="w-4 h-4 text-green-500" />
                            ) : (
                              <ToggleLeft className="w-4 h-4 text-gray-400" />
                            )}
                            <span className={`text-xs ${question.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                              {question.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-900 mb-2 leading-relaxed">
                          {question.text}
                        </p>
                        
                        <div className="text-xs text-gray-500">
                          Created: {question.createdAt.toLocaleDateString()} • 
                          Updated: {question.updatedAt.toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={question.isActive}
                          onCheckedChange={(checked) => handleToggleActive(question.id, checked)}
                        />
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(question)}
                          className="h-8 w-8 p-0 hover:bg-blue-50"
                        >
                          <Edit3 className="w-3 h-3" />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(question.id)}
                          className="h-8 w-8 p-0 hover:bg-red-50 text-red-500"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredQuestions.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery || filterCategory !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'Create your first question to get started'
                  }
                </p>
                {(!searchQuery && filterCategory === 'all') && (
                  <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Question
                  </Button>
                )}
              </div>
            )}
          </div>
        ) : (
          // Question Creation/Edit Form
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingQuestion ? 'Edit Question' : 'Create New Question'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Question Text
                  </label>
                  <Textarea
                    value={formData.text}
                    onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                    placeholder="Enter your question..."
                    rows={3}
                    className="resize-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Category
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: any) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="promo">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                          Promotional Analysis
                        </div>
                      </SelectItem>
                      <SelectItem value="base">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          Base Business
                        </div>
                      </SelectItem>
                      <SelectItem value="strat">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          Strategic Planning
                        </div>
                      </SelectItem>
                      <SelectItem value="overall">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          Overall Performance
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-3">
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  />
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Active Question
                    </label>
                    <p className="text-xs text-gray-500">
                      Active questions will be available for template creation
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <DialogFooter className="border-t pt-4">
          {isCreating ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!formData.text.trim()}
              >
                {editingQuestion ? 'Update Question' : 'Create Question'}
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionManagementModal;
