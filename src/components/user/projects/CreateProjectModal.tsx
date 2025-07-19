import { Plus, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { NewProjectData, CustomInputsState } from "./ProjectTypes";
import { ProjectDetailsContainer } from "./project-details";

interface CreateProjectModalProps {
	isOpen: boolean;
	onClose: () => void;
	newProject: NewProjectData;
	setNewProject: React.Dispatch<React.SetStateAction<NewProjectData>>;
	customInputs: CustomInputsState;
	setCustomInputs: React.Dispatch<React.SetStateAction<CustomInputsState>>;
	handleCreateProject: () => void;
}

export default function CreateProjectModal({
	isOpen,
	onClose,
	newProject,
	setNewProject,
	customInputs,
	setCustomInputs,
	handleCreateProject,
}: CreateProjectModalProps) {
	// Validate project details before submission
	const isProjectValid = () => {
		const hasBasicInfo =
			newProject.projectName.trim() !== "" &&
			newProject.company.trim() !== "" &&
			newProject.projectType.trim() !== "";

		// Check if at least one field in each category has a value
		const hasRetailers = newProject.retailers.some(
			(retailer) => retailer.trim() !== ""
		);
		const hasBrands = newProject.brands.some((brand) => brand.trim() !== "");
		const hasProducts = newProject.products.some(
			(product) => product.trim() !== ""
		);

		return hasBasicInfo && hasRetailers && hasBrands && hasProducts;
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
						<Plus className="h-6 w-6 text-[#009bcc]" />
						Create New Project
					</DialogTitle>
					<DialogDescription className="text-slate-600">
						Fill in the details below to create a new optimization project.
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
									Project Name *
								</Label>
								<Input
									id="projectName"
									value={newProject.projectName}
									onChange={(e) =>
										setNewProject((prev) => ({
											...prev,
											projectName: e.target.value,
										}))
									}
									placeholder="Enter project name"
									className="w-full"
								/>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="company"
									className="text-sm font-medium text-slate-700"
								>
									Company *
								</Label>
								<Input
									id="company"
									value={newProject.company}
									onChange={(e) =>
										setNewProject((prev) => ({
											...prev,
											company: e.target.value,
										}))
									}
									placeholder="Enter company name"
									className="w-full"
								/>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="targetBrand"
									className="text-sm font-medium text-slate-700"
								>
									Target Brand
								</Label>
								<Input
									id="targetBrand"
									value={newProject.targetBrand}
									onChange={(e) =>
										setNewProject((prev) => ({
											...prev,
											targetBrand: e.target.value,
										}))
									}
									placeholder="Enter target brand"
									className="w-full"
								/>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="projectType"
									className="text-sm font-medium text-slate-700"
								>
									Project Type *
								</Label>
								<Select
									value={newProject.projectType}
									onValueChange={(value) =>
										setNewProject((prev) => ({ ...prev, projectType: value }))
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select project type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="pricing">
											Pricing Optimization
										</SelectItem>
										<SelectItem value="tpo">
											Trade Promotion Optimization (TPO)
										</SelectItem>
										<SelectItem value="forecast">Demand Forecasting</SelectItem>
										<SelectItem value="assortment">
											Assortment Planning
										</SelectItem>
										<SelectItem value="competitor">
											Competitor Analysis
										</SelectItem>
										<SelectItem value="market">Market Research</SelectItem>
									</SelectContent>
								</Select>
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
									value={newProject.version}
									onChange={(e) =>
										setNewProject((prev) => ({
											...prev,
											version: e.target.value,
										}))
									}
									placeholder="1.0"
									className="w-full"
								/>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="createdBy"
									className="text-sm font-medium text-slate-700"
								>
									Created By
								</Label>
								<Input
									id="createdBy"
									value={newProject.createdBy}
									disabled
									className="w-full bg-slate-50"
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
								value={newProject.description}
								onChange={(e) =>
									setNewProject((prev) => ({
										...prev,
										description: e.target.value,
									}))
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
										onClick={() => setNewProject(prev => ({ ...prev, headerColor: color.name }))}
										className={`relative w-full h-16 rounded-xl ${color.bg} border-2 transition-all duration-200 hover:scale-105 ${
											newProject.headerColor === color.name 
												? 'border-gray-800 shadow-lg' 
												: 'border-gray-200 hover:border-gray-300'
										}`}
									>
										<div className={`absolute bottom-2 right-2 w-3 h-3 rounded-full ${color.accent}`} />
										{newProject.headerColor === color.name && (
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

					{/* Project Details Container */}
					<ProjectDetailsContainer
						newProject={newProject}
						customInputs={customInputs}
						onAddField={(field) => {
							setNewProject((prev) => ({
								...prev,
								[field]: [...prev[field], ""],
							}));
						}}
						onRemoveField={(field, index) => {
							setNewProject((prev) => ({
								...prev,
								[field]: prev[field].filter((_, i) => i !== index),
							}));
							setCustomInputs((prev) => {
								const updatedFieldInputs = { ...prev[field] };
								delete updatedFieldInputs[index];
								return {
									...prev,
									[field]: updatedFieldInputs,
								};
							});
						}}
						onUpdateField={(field, index, value) => {
							setNewProject((prev) => ({
								...prev,
								[field]: prev[field].map((item, i) =>
									i === index ? value : item
								),
							}));
							if (value) {
								setCustomInputs((prev) => {
									const updatedFieldInputs = { ...prev[field] };
									delete updatedFieldInputs[index];
									return {
										...prev,
										[field]: updatedFieldInputs,
									};
								});
							}
						}}
						onCustomInputChange={(field, index, value) => {
							setCustomInputs((prev) => ({
								...prev,
								[field]: {
									...prev[field],
									[index]: value,
								},
							}));
						}}
					/>

					{/* Status and Dates */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
							Project Status
						</h3>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="space-y-2">
								<Label className="text-sm font-medium text-slate-700">
									Status
								</Label>
								<div className="flex items-center space-x-2">
									<Switch
										checked={newProject.status === "Active"}
										onCheckedChange={(checked) =>
											setNewProject((prev) => ({
												...prev,
												status: checked ? "Active" : "Inactive",
											}))
										}
									/>
									<span className="text-sm text-slate-600">
										{newProject.status === "Active" ? "Active" : "Inactive"}
									</span>
								</div>
							</div>

							<div className="space-y-2">
								<Label className="text-sm font-medium text-slate-700">
									Created Date
								</Label>
								<div className="text-sm text-slate-600 bg-slate-50 p-2 rounded border">
									{new Date().toLocaleDateString()}
								</div>
							</div>

							<div className="space-y-2">
								<Label className="text-sm font-medium text-slate-700">
									Updated Date
								</Label>
								<div className="text-sm text-slate-600 bg-slate-50 p-2 rounded border">
									{new Date().toLocaleDateString()}
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
					<div className="flex gap-2">
						<Button
							variant="outline"
							onClick={handleCreateProject}
							disabled={
								!newProject.projectName ||
								!newProject.company ||
								!newProject.projectType
							}
						>
							Save as Draft
						</Button>
						<Button
							onClick={handleCreateProject}
							disabled={!isProjectValid()}
							className="bg-blue-600 hover:bg-blue-700"
						>
							Create Project
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
