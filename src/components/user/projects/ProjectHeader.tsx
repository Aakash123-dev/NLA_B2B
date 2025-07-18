import { FolderOpen, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

interface ProjectHeaderProps {
	projectCount: number;
	isCreateModalOpen: boolean;
	searchQuery: any;
	setSearchQuery: any;
	setIsCreateModalOpen: (isOpen: boolean) => void;
}

export default function ProjectHeader({
	projectCount,
	isCreateModalOpen,
	setIsCreateModalOpen,
	searchQuery,
	setSearchQuery,
}: ProjectHeaderProps) {
	console.log(searchQuery, "all suchquery");
	return (
		<div className="bg-white border-b border-slate-200">
			<div className="w-full px-6 lg:px-12 py-6">
				<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
					<div className="flex items-center gap-4">
						<div className="w-8 h-8 bg-[#009bcc] rounded-lg flex items-center justify-center">
							<FolderOpen className="w-4 h-4 text-white" />
						</div>
						<div>
							<h1 className="text-2xl font-bold text-slate-800">
								Your Projects
							</h1>
							<p className="text-slate-600 text-sm">
								Manage and optimize your Gazelle projects • {projectCount}{" "}
								active projects
							</p>
						</div>
					</div>

					<div className="flex items-center gap-3">
						{/* Search */}
						<div className="relative">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Search projects..."
								className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-lg bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 placeholder-slate-400 text-sm transition-all duration-300"
							/>
						</div>

						<Dialog
							open={isCreateModalOpen}
							onOpenChange={setIsCreateModalOpen}
						>
							<DialogTrigger asChild>
								<Button className="bg-[#009bcc] hover:bg-[#007ca3] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium text-sm transition-all duration-300">
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
