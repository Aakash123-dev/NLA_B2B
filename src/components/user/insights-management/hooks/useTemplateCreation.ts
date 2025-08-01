import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TemplateFormData, TemplateVariable, Question, QuestionFormData } from '../types';
import { mockProjects, modelConfigs, mockQuestions } from '../constants/mockData';

export function useTemplateCreation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('id');
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<TemplateFormData>({
    name: '',
    description: '',
    companyOrganization: 'Real Good Foods',
    dbSelection: 'DB1',
    selectedQuestions: [],
    type: 'promo',
    model: 'Pricing',
    variables: [],
    dateRange: 'monthly',
    yAxisLabel: '',
    xAxisLabel: '',
    appliedProjects: []
  });

  const [availableFields, setAvailableFields] = useState<any[]>([]);
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  
  // Question management state
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [questionSearchQuery, setQuestionSearchQuery] = useState('');
  const [questionFormData, setQuestionFormData] = useState<QuestionFormData>({
    text: '',
    category: formData.type,
    isActive: true
  });

  // Project selection state
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [selectedProjectType, setSelectedProjectType] = useState<string>('all');
  const [selectedProjectStatus, setSelectedProjectStatus] = useState<string>('all');

  // Initialize form data when template changes
  useEffect(() => {
    if (templateId) {
      setIsLoading(true);
      // Mock loading delay and simulate fetching template data
      setTimeout(() => {
        const mockTemplate = {
          name: 'Q4 Promo Analysis Template',
          description: 'Comprehensive promotional analysis for Q4 campaigns',
          companyOrganization: 'Real Good Foods',
          dbSelection: 'DB1' as 'DB1' | 'DB2',
          selectedQuestions: ['1', '2'],
          type: 'promo' as 'promo' | 'base' | 'strat' | 'overall',
          model: 'TPO' as 'Pricing' | 'TPO' | 'Forecast',
          variables: [
            { id: '1', name: 'Revenue', type: 'x' as 'x' | 'y1' | 'y2' | 'y3' | 'yn', aggregate: 'sum' as 'min' | 'max' | 'average' | 'sum', unit: '$' },
            { id: '2', name: 'ROI', type: 'y1' as 'x' | 'y1' | 'y2' | 'y3' | 'yn', aggregate: 'average' as 'min' | 'max' | 'average' | 'sum', unit: '%' }
          ],
          dateRange: 'quarterly' as 'weekly' | 'monthly' | 'quarterly' | 'halfyearly' | 'yearly' | '2yr',
          yAxisLabel: 'ROI (%)',
          xAxisLabel: 'Revenue ($)',
          appliedProjects: ['project-1', 'project-2']
        };
        
        setFormData(mockTemplate);
        setIsLoading(false);
      }, 1000);
    }
  }, [templateId]);

  // Update available fields when model changes
  useEffect(() => {
    if (formData.model && modelConfigs[formData.model]) {
      setAvailableFields(modelConfigs[formData.model]);
    }
  }, [formData.model]);

  const handleInputChange = (field: keyof TemplateFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Update question form category when template type changes
    if (field === 'type') {
      setQuestionFormData(prev => ({
        ...prev,
        category: value
      }));
    }
  };

  const handleAddVariable = () => {
    const newVariable: TemplateVariable = {
      id: Date.now().toString(),
      name: '',
      type: 'y1',
      aggregate: 'sum',
      unit: ''
    };
    
    handleInputChange('variables', [...formData.variables, newVariable]);
  };

  const handleUpdateVariable = (index: number, field: keyof TemplateVariable, value: any) => {
    const updatedVariables = formData.variables.map((variable, i) => 
      i === index ? { ...variable, [field]: value } : variable
    );
    handleInputChange('variables', updatedVariables);
  };

  const handleRemoveVariable = (index: number) => {
    const updatedVariables = formData.variables.filter((_, i) => i !== index);
    handleInputChange('variables', updatedVariables);
  };

  const handleProjectToggle = (projectId: string, checked: boolean) => {
    const appliedProjects = checked
      ? [...formData.appliedProjects, projectId]
      : formData.appliedProjects.filter(id => id !== projectId);
    
    handleInputChange('appliedProjects', appliedProjects);
  };

  const handleSave = () => {
    if (!formData.name || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate save operation
    setTimeout(() => {
      console.log('Saving template:', formData);
      setIsLoading(false);
      router.push('/user/insights-management');
    }, 1000);
  };

  const handlePreview = () => {
    console.log('Preview template:', formData);
  };

  // Question management functions
  const handleCreateNewQuestion = () => {
    setEditingQuestion(null);
    setQuestionFormData({
      text: '',
      category: formData.type,
      isActive: true
    });
    setIsCreatingQuestion(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setQuestionFormData({
      text: question.text,
      category: question.category,
      isActive: question.isActive
    });
    setIsCreatingQuestion(true);
  };

  const handleSaveQuestion = () => {
    if (!questionFormData.text.trim()) return;

    if (editingQuestion) {
      setQuestions(prev => prev.map(q => 
        q.id === editingQuestion.id 
          ? { ...q, ...questionFormData, updatedAt: new Date() }
          : q
      ));
    } else {
      const newQuestion: Question = {
        id: Date.now().toString(),
        ...questionFormData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setQuestions(prev => [newQuestion, ...prev]);
    }
    
    setIsCreatingQuestion(false);
    setQuestionFormData({ text: '', category: formData.type, isActive: true });
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const handleCancelQuestionEdit = () => {
    setIsCreatingQuestion(false);
    setEditingQuestion(null);
    setQuestionFormData({ text: '', category: formData.type, isActive: true });
  };

  // Project filtering
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(projectSearchQuery.toLowerCase());
    const matchesType = selectedProjectType === 'all' || project.type === selectedProjectType;
    const matchesStatus = selectedProjectStatus === 'all' || project.status === selectedProjectStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Get unique project types for filter dropdown
  const projectTypes = Array.from(new Set(mockProjects.map(p => p.type)));

  return {
    // State
    templateId,
    isLoading,
    formData,
    availableFields,
    questions,
    isCreatingQuestion,
    editingQuestion,
    questionSearchQuery,
    questionFormData,
    projectSearchQuery,
    selectedProjectType,
    selectedProjectStatus,
    filteredProjects,
    projectTypes,
    
    // Handlers
    handleInputChange,
    handleAddVariable,
    handleUpdateVariable,
    handleRemoveVariable,
    handleProjectToggle,
    handleSave,
    handlePreview,
    handleCreateNewQuestion,
    handleEditQuestion,
    handleSaveQuestion,
    handleDeleteQuestion,
    handleCancelQuestionEdit,
    setQuestionSearchQuery,
    setQuestionFormData,
    setProjectSearchQuery,
    setSelectedProjectType,
    setSelectedProjectStatus,
    
    // Navigation
    router
  };
}
