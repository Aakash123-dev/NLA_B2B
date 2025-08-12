import { FolderOpen, Plus, Search, Brain, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

interface ProjectHeaderProps {
	projectCount: number;
	isCreateModalOpen: boolean;
	searchQuery: any;
	setSearchQuery: any;
	setIsCreateModalOpen: (isOpen: boolean) => void;
	onOpenSmartInsights?: () => void;
}

export default function ProjectHeader({
	projectCount,
	isCreateModalOpen,
	setIsCreateModalOpen,
	searchQuery,
	setSearchQuery,
	onOpenSmartInsights,
}: ProjectHeaderProps) {
	return (
		<div className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-slate-200/50">
			<div className="absolute inset-0 bg-grid-slate-200/40 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] opacity-40"></div>
			<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
			<div className="relative w-full px-6 lg:px-12 py-10">
				<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
					{/* Left section with enhanced styling */}
					<div className="flex items-start gap-5">
						<div className="relative">
							<div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-900/20 transform hover:scale-105 transition-all duration-300">
								<FolderOpen className="w-6 h-6 text-white" />
							</div>
							<div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-md">
								<TrendingUp className="w-3 h-3 text-white" />
							</div>
						</div>
						<div className="space-y-2">
							<div className="flex items-center gap-3">
								<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
									Your Projects
								</h1>
								<div className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs font-semibold rounded-full border border-blue-200/50 shadow-sm">
									{projectCount} active
								</div>
							</div>
							<p className="text-slate-600 text-base font-medium leading-relaxed">
								Manage and optimize your <span className="text-blue-600 font-semibold">Gazelle projects</span> • 
								<span className="text-indigo-700 font-semibold"> {projectCount} active projects</span>
							</p>
						</div>
					</div>

					{/* Right section with enhanced controls */}
					<div className="flex items-center gap-4">
						{/* Enhanced Search */}
						<div className="relative group">
							<div className="absolute inset-0 bg-gradient-to-r from-blue-200/50 to-indigo-200/50 rounded-xl blur opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>
							<div className="relative">
								<Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400 group-hover:text-indigo-600 transition-colors duration-200" />
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Search projects..."
									className="pl-12 pr-4 py-3 w-full sm:w-72 rounded-xl bg-white/90 backdrop-blur-sm border border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-300 text-slate-800 placeholder-slate-400 text-sm transition-all duration-300 shadow-sm hover:shadow-md focus:bg-white"
								/>
							</div>
						</div>

						{/* Smart Insights Button - with enhanced styling */}
						{onOpenSmartInsights && (
							<Button 
								variant="outline" 
								size="sm" 
								className="gap-2 bg-gradient-to-r from-indigo-50 to-violet-100 border-indigo-200 text-indigo-700 hover:from-indigo-100 hover:to-violet-200 hover:border-indigo-300 hover:text-indigo-800 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transform rounded-full px-5"
								onClick={onOpenSmartInsights}
							>
								<Brain className="w-4 h-4" />
								Smart Insights
							</Button>
						)}

						{/* Create Project Button - with enhanced styling */}
						<Dialog
							open={isCreateModalOpen}
							onOpenChange={setIsCreateModalOpen}
						>
							<DialogTrigger asChild>
								<Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 transform">
									<Plus className="h-4 w-4" />
									<span>Create Project</span>
								</Button>
							</DialogTrigger>
						</Dialog>
					</div>
				</div>
			</div>
		</div>
	);
}
