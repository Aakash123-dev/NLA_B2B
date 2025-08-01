import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  FileText,
  Search,
  Edit3,
  Trash2,
  X
} from 'lucide-react';
import { Question, TemplateFormData, QuestionFormData } from '../types';

interface QuestionsManagementSectionProps {
  formData: TemplateFormData;
  questions: Question[];
  isCreatingQuestion: boolean;
  editingQuestion: Question | null;
  questionSearchQuery: string;
  questionFormData: QuestionFormData;
  onCreateNewQuestion: () => void;
  onEditQuestion: (question: Question) => void;
  onSaveQuestion: () => void;
  onDeleteQuestion: (questionId: string) => void;
  onCancelQuestionEdit: () => void;
  setQuestionSearchQuery: (query: string) => void;
  setQuestionFormData: (data: QuestionFormData | ((prev: QuestionFormData) => QuestionFormData)) => void;
}

export function QuestionsManagementSection({
  formData,
  questions,
  isCreatingQuestion,
  editingQuestion,
  questionSearchQuery,
  questionFormData,
  onCreateNewQuestion,
  onEditQuestion,
  onSaveQuestion,
  onDeleteQuestion,
  onCancelQuestionEdit,
  setQuestionSearchQuery,
  setQuestionFormData
}: QuestionsManagementSectionProps) {
  
  const filteredQuestions = questions.filter(question => 
    question.text.toLowerCase().includes(questionSearchQuery.toLowerCase())
  );

  const questionsByCategory = filteredQuestions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = [];
    }
    acc[question.category].push(question);
    return acc;
  }, {} as Record<string, Question[]>);

  const categoryConfig = {
    base: { 
      label: 'Base Price Analysis', 
      color: 'bg-blue-50 text-blue-800 border-blue-200',
      icon: '📊',
      description: 'Questions related to base pricing strategies and elasticity'
    },
    promo: { 
      label: 'Promotional Analysis', 
      color: 'bg-green-50 text-green-800 border-green-200',
      icon: '🏷️',
      description: 'Questions about promotional effectiveness and ROI'
    },
    strat: { 
      label: 'Strategic Analysis', 
      color: 'bg-purple-50 text-purple-800 border-purple-200',
      icon: '🎯',
      description: 'Strategic planning and portfolio optimization questions'
    },
    overall: { 
      label: 'Overall Analysis', 
      color: 'bg-orange-50 text-orange-800 border-orange-200',
      icon: '🔍',
      description: 'Comprehensive performance and market analysis'
    }
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Questions Management
            </CardTitle>
          </div>
          <Button
            onClick={onCreateNewQuestion}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Manage your insight questions library and create new ones as needed.
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {/* Advanced Filters and Search */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search questions by content..."
                value={questionSearchQuery}
                onChange={(e) => setQuestionSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select 
              value={questionFormData.category} 
              onValueChange={(value: 'base' | 'promo' | 'strat' | 'overall' | 'all') => {
                if (value !== 'all') {
                  setQuestionFormData(prev => ({ ...prev, category: value }));
                }
              }}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="base">Base Price Analysis</SelectItem>
                <SelectItem value="promo">Promotional Analysis</SelectItem>
                <SelectItem value="strat">Strategic Analysis</SelectItem>
                <SelectItem value="overall">Overall Analysis</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show:</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Question Creation/Edit Form */}
        {isCreatingQuestion && (
          <Card className="mb-6 border-blue-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                {editingQuestion ? 'Edit Question' : 'Create New Question'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Textarea
                  value={questionFormData.text}
                  onChange={(e) => setQuestionFormData(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Enter your question here... (e.g., What is the price across all products by retailers?)"
                  rows={3}
                  className="resize-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Select 
                    value={questionFormData.category} 
                    onValueChange={(value: 'base' | 'promo' | 'strat' | 'overall') => setQuestionFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="base">Base Price Analysis</SelectItem>
                      <SelectItem value="promo">Promotional Analysis</SelectItem>
                      <SelectItem value="strat">Strategic Analysis</SelectItem>
                      <SelectItem value="overall">Overall Analysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2 mt-6">
                  <Checkbox
                    id="questionActive"
                    checked={questionFormData.isActive}
                    onCheckedChange={(checked) => 
                      setQuestionFormData(prev => ({ ...prev, isActive: checked as boolean }))
                    }
                  />
                  <label htmlFor="questionActive" className="text-sm text-gray-700">
                    Active Question
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onCancelQuestionEdit}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  onClick={onSaveQuestion}
                  disabled={!questionFormData.text.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {editingQuestion ? 'Update' : 'Save'} Question
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Questions List by Category */}
        <div className="space-y-6">
          {Object.entries(questionsByCategory).map(([category, categoryQuestions]) => {
            const config = categoryConfig[category as keyof typeof categoryConfig];

            return (
              <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{config.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{config.label}</h3>
                        <p className="text-xs text-gray-600">{config.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`${config.color} text-xs`}>
                      {categoryQuestions.length} questions
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  {categoryQuestions.map((question) => (
                    <div key={question.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border">
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 leading-relaxed">{question.text}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge 
                            variant={question.isActive ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {question.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            Updated {question.updatedAt.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          onClick={() => onEditQuestion(question)}
                          size="sm"
                          variant="ghost"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit3 className="w-3 h-3" />
                        </Button>
                        <Button
                          onClick={() => onDeleteQuestion(question.id)}
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {categoryQuestions.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No questions in this category</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {Object.keys(questionsByCategory).length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No questions found</h3>
              <p className="text-sm mb-4">
                {questionSearchQuery ? 'Try adjusting your search terms' : 'Create your first question to get started'}
              </p>
              {!questionSearchQuery && (
                <Button onClick={onCreateNewQuestion} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Question
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
