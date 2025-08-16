'use client';

import React, { Suspense } from 'react';
import { useTemplateCreation } from '../hooks';
import { TemplateCreationHeader } from './TemplateCreationHeader';
import { TemplateCreationLoading } from './TemplateCreationLoading';
import { BasicInformationSection } from './BasicInformationSection';
import { QuestionsManagementSection } from './QuestionsManagementSection';
import { VariablesConfigurationSection } from './VariablesConfigurationSection';
import { AppliedProjectsSection } from './AppliedProjectsSection';

interface TemplateCreationPageProps {}

// Wrapper component that handles the hook call
function TemplateCreationContent() {
  const {
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
  } = useTemplateCreation();

  if (isLoading) {
    return <TemplateCreationLoading />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <TemplateCreationHeader
        templateId={templateId}
        isLoading={isLoading}
        onBack={() => router.push('/user/insights-management')}
        onPreview={handlePreview}
        onSave={handleSave}
      />

      <div className="w-full px-8 py-8 bg-gray-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            {/* Basic Information */}
            <BasicInformationSection 
              formData={formData}
              onInputChange={handleInputChange}
            />

            {/* Questions Management */}
            <QuestionsManagementSection
              formData={formData}
              questions={questions}
              isCreatingQuestion={isCreatingQuestion}
              editingQuestion={editingQuestion}
              questionSearchQuery={questionSearchQuery}
              questionFormData={questionFormData}
              onCreateNewQuestion={handleCreateNewQuestion}
              onEditQuestion={handleEditQuestion}
              onSaveQuestion={handleSaveQuestion}
              onDeleteQuestion={handleDeleteQuestion}
              onCancelQuestionEdit={handleCancelQuestionEdit}
              setQuestionSearchQuery={setQuestionSearchQuery}
              setQuestionFormData={setQuestionFormData}
            />

            {/* Variables Configuration */}
            <VariablesConfigurationSection
              formData={formData}
              availableFields={availableFields}
              onInputChange={handleInputChange}
              onAddVariable={handleAddVariable}
              onUpdateVariable={handleUpdateVariable}
              onRemoveVariable={handleRemoveVariable}
            />

            {/* Applied Projects */}
            <AppliedProjectsSection
              formData={formData}
              filteredProjects={filteredProjects}
              mockProjects={[]} // This should come from the hook if needed
              projectSearchQuery={projectSearchQuery}
              selectedProjectType={selectedProjectType}
              selectedProjectStatus={selectedProjectStatus}
              projectTypes={projectTypes}
              onInputChange={handleInputChange}
              onProjectToggle={handleProjectToggle}
              setProjectSearchQuery={setProjectSearchQuery}
              setSelectedProjectType={setSelectedProjectType}
              setSelectedProjectStatus={setSelectedProjectStatus}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TemplateCreationPage({}: TemplateCreationPageProps) {
  return (
    <Suspense fallback={<TemplateCreationLoading />}>
      <TemplateCreationContent />
    </Suspense>
  );
}
