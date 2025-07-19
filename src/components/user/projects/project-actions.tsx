"use client";

import { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Palette } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Project type definition matching the structure in page.tsx
export interface Project {
	company_logo: string;
	project_version: string;
	updatedAt:Date;
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
	headerColor?: string;
	progress?: number;
	features: string[];
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
					.toLocaleDateString("en-US", {
						month: "2-digit",
						day: "2-digit",
						year: "numeric",
						hour: "2-digit",
						minute: "2-digit",
						hour12: false,
					})
					.replace(",", ""),
			};
			onSave(updatedProject);
			onClose();
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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
						<h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
							Basic Information
						</h3>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
								className="w-full h-20"
							/>
						</div>

						{/* Header Color Selection */}
						<div className="space-y-3">
							<Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
								<Palette className="w-4 h-4" />
								Header Color Theme
							</Label>
							<div className="grid grid-cols-5 gap-3">
								{[
									{ name: 'blue', bg: 'bg-gradient-to-br from-blue-50 to-blue-100', accent: 'bg-blue-600' },
									{ name: 'purple', bg: 'bg-gradient-to-br from-purple-50 to-purple-100', accent: 'bg-purple-600' },
									{ name: 'emerald', bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100', accent: 'bg-emerald-600' },
									{ name: 'orange', bg: 'bg-gradient-to-br from-orange-50 to-orange-100', accent: 'bg-orange-600' },
									{ name: 'rose', bg: 'bg-gradient-to-br from-rose-50 to-rose-100', accent: 'bg-rose-600' },
									{ name: 'cyan', bg: 'bg-gradient-to-br from-cyan-50 to-cyan-100', accent: 'bg-cyan-600' },
									{ name: 'lime', bg: 'bg-gradient-to-br from-lime-50 to-lime-100', accent: 'bg-lime-600' },
									{ name: 'fuchsia', bg: 'bg-gradient-to-br from-fuchsia-50 to-fuchsia-100', accent: 'bg-fuchsia-600' },
									{ name: 'indigo', bg: 'bg-gradient-to-br from-indigo-50 to-indigo-100', accent: 'bg-indigo-600' },
									{ name: 'teal', bg: 'bg-gradient-to-br from-teal-50 to-teal-100', accent: 'bg-teal-600' },
								].map((color) => (
									<button
										key={color.name}
										type="button"
										onClick={() => setEditedProject(prev => prev ? { ...prev, headerColor: color.name } : null)}
										className={`relative w-full h-16 rounded-xl ${color.bg} border-2 transition-all duration-200 hover:scale-105 ${
											editedProject.headerColor === color.name 
												? 'border-gray-800 shadow-lg' 
												: 'border-gray-200 hover:border-gray-300'
										}`}
									>
										<div className={`absolute bottom-2 right-2 w-3 h-3 rounded-full ${color.accent}`} />
										{editedProject.headerColor === color.name && (
											<div className="absolute inset-0 bg-black/10 rounded-xl flex items-center justify-center">
												<div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
													<div className="w-3 h-3 bg-gray-800 rounded-full" />
												</div>
											</div>
										)}
									</button>
								))}
							</div>
						</div>
					</div>

					{/* Features */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
							Project Features
						</h3>

						<div className="space-y-2">
							<Label className="text-sm font-medium text-slate-700">
								Active Features
							</Label>
							<div className="grid grid-cols-2 gap-3">
								{["Design Studio", "Insights", "Simulator", "Output"].map(
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
						<h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
							Project Status
						</h3>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label className="text-sm font-medium text-slate-700">
									Created Date
								</Label>
								<div className="text-sm text-slate-600 bg-slate-50 p-2 rounded border">
									{editedProject.date_created.toLocaleString()}
								</div>
							</div>

							<div className="space-y-2">
								<Label className="text-sm font-medium text-slate-700">
									Updated Date
								</Label>
								<div className="text-sm text-slate-600 bg-slate-50 p-2 rounded border">
									Will be updated on save
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<DialogFooter className="flex items-center justify-between pt-6 border-t border-slate-200">
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
						className="bg-red-600 hover:bg-red-700 text-white"
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
		.toLocaleDateString("en-US", {
			month: "2-digit",
			day: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		})
		.replace(",", "");

	return {
		...project,
		id: highestId + 1,
		title: `${project.title} (Copy)`,
		createdDate: now,
		updatedDate: now,
		version: "1",
	};
}
