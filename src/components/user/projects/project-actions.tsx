'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// Project type definition matching the structure in page.tsx
export interface Project {
  company_logo: string;
  project_version: string;
  updatedAt: Date;
  date_created: Date;
  Models: any;
  project_name: string;
  product_name: string;
  id: number;
  title: string;
  description: string;
  createdDate: string;
  updatedDate: string;
  version: string;
  logo: string;
  color: string;
  progress?: number;
  features: string[];
  pin_project: number;
}

// Props interface for the edit modal
interface EditProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
}

// Props interface for the delete confirmation dialog
interface DeleteProjectDialogProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (projectId: number) => void;
}

// Edit Project Modal Component
export function EditProjectModal({
  project,
  isOpen,
  onClose,
  onSave,
}: EditProjectModalProps) {
  const [editedProject, setEditedProject] = useState<Project | null>(project);

  // Update the local state when the project prop changes
  useEffect(() => {
    setEditedProject(project);
  }, [project]);

  // If no project is provided, don't render anything
  if (!editedProject) {
    return null;
  }

  const handleSave = () => {
    if (editedProject) {
      // Update the updatedDate to current date
      const updatedProject = {
        ...editedProject,
        updatedDate: new Date()
          .toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
          .replace(',', ''),
      };
      onSave(updatedProject);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">
            Edit Project: {editedProject.project_name}
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Update your project details below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="border-b border-slate-200 pb-2 text-lg font-semibold text-slate-800">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="projectName"
                  className="text-sm font-medium text-slate-700"
                >
                  Project Name
                </Label>
                <Input
                  id="projectName"
                  value={editedProject?.project_name}
                  onChange={(e) =>
                    setEditedProject({
                      ...editedProject,
                      project_name: e.target.value,
                    })
                  }
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="version"
                  className="text-sm font-medium text-slate-700"
                >
                  Version
                </Label>
                <Input
                  id="version"
                  value={editedProject.project_version}
                  onChange={(e) =>
                    setEditedProject({
                      ...editedProject,
                      version: e.target.value,
                    })
                  }
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-medium text-slate-700"
              >
                Description
              </Label>
              <Textarea
                id="description"
                value={editedProject.description}
                onChange={(e) =>
                  setEditedProject({
                    ...editedProject,
                    description: e.target.value,
                  })
                }
                placeholder="Enter project description"
                className="h-20 w-full"
              />
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="border-b border-slate-200 pb-2 text-lg font-semibold text-slate-800">
              Project Features
            </h3>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Active Features
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {['Design Studio', 'Insights', 'Simulator', 'Output'].map(
                  (feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Switch
                      // checked={editedProject.features.includes(feature)}
                      // onCheckedChange={(checked) => {
                      //   if (checked) {
                      //     setEditedProject({
                      //       ...editedProject,
                      //       features: [...editedProject.features, feature]
                      //     });
                      //   } else {
                      //     setEditedProject({
                      //       ...editedProject,
                      //       features: editedProject.features.filter(f => f !== feature)
                      //     });
                      //   }
                      // }}
                      />
                      <Label className="text-sm text-slate-700">
                        {feature}
                      </Label>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Status and Dates */}
          <div className="space-y-4">
            <h3 className="border-b border-slate-200 pb-2 text-lg font-semibold text-slate-800">
              Project Status
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Created Date
                </Label>
                <div className="rounded border bg-slate-50 p-2 text-sm text-slate-600">
                  {editedProject.date_created.toLocaleString()}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Updated Date
                </Label>
                <div className="rounded border bg-slate-50 p-2 text-sm text-slate-600">
                  Will be updated on save
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <DialogFooter className="flex items-center justify-between border-t border-slate-200 pt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Delete Project Dialog Component
export function DeleteProjectDialog({
  project,
  isOpen,
  onClose,
  onConfirm,
}: DeleteProjectDialogProps) {
  if (!project) {
    return null;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Project</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &quot;{project.title}&quot;? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onConfirm(project.id)}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Function to duplicate a project
export function duplicateProject(
  project: Project,
  allProjects: Project[]
): Project {
  // Find the highest ID to ensure the new ID is unique
  const highestId = Math.max(...allProjects.map((p) => p.id));

  // Create a new project with a new ID and updated timestamps
  const now = new Date()
    .toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(',', '');

  return {
    ...project,
    id: highestId + 1,
    title: `${project.title} (Copy)`,
    createdDate: now,
    updatedDate: now,
    version: '1',
  };
}
