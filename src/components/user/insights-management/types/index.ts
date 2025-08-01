export interface Template {
  id: string;
  name: string;
  description: string;
  companyOrganization: string;
  dbSelection: 'DB1' | 'DB2';
  questions: Question[];
  type: 'promo' | 'base' | 'strat' | 'overall';
  model: 'Pricing' | 'TPO' | 'Forecast';
  variables: TemplateVariable[];
  dateRange: 'weekly' | 'monthly' | 'quarterly' | 'halfyearly' | 'yearly' | '2yr';
  yAxisLabel: string;
  xAxisLabel: string;
  appliedProjects: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  text: string;
  category: 'promo' | 'base' | 'strat' | 'overall';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TemplateVariable {
  id: string;
  name: string;
  type: 'x' | 'y1' | 'y2' | 'y3' | 'yn';
  aggregate: 'min' | 'max' | 'average' | 'sum';
  unit?: string;
}

export interface Database {
  id: string;
  name: string;
  isAvailable: boolean;
}

export interface Project {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  type: string;
}

export interface ModelConfig {
  type: 'Pricing' | 'TPO' | 'Forecast';
  fields: ConfigField[];
}

export interface ConfigField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'multiselect';
  required: boolean;
  options?: string[];
  defaultValue?: any;
}

export interface TemplateFormData {
  name: string;
  description: string;
  companyOrganization: string;
  dbSelection: 'DB1' | 'DB2';
  selectedQuestions: string[];
  type: 'promo' | 'base' | 'strat' | 'overall';
  model: 'Pricing' | 'TPO' | 'Forecast';
  variables: TemplateVariable[];
  dateRange: 'weekly' | 'monthly' | 'quarterly' | 'halfyearly' | 'yearly' | '2yr';
  yAxisLabel: string;
  xAxisLabel: string;
  appliedProjects: string[];
}

export interface QuestionFormData {
  text: string;
  category: 'promo' | 'base' | 'strat' | 'overall';
  isActive: boolean;
}

export interface ChartPreviewData {
  name: string;
  value: number;
  [key: string]: any;
}
