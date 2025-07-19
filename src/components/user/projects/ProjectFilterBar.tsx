import { useState } from "react";
import { Building, ChevronDown, Filter, Plus, Search } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ProjectFilterBarProps {
	selectedFilter: string;
	setSelectedFilter: (filter: string) => void;
}

export default function ProjectFilterBar({
	selectedFilter,
	setSelectedFilter,
}: ProjectFilterBarProps) {
	return (
		<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
			<div className="flex flex-wrap items-center gap-4">
				{/* Filter Dropdown */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							className="bg-white  hover:bg-slate-50  text-slate-700 px-6 py-2.5 rounded-2xl shadow-sm font-medium transition-all duration-300 flex items-center gap-2"
						>
							{selectedFilter === "All Projects" && (
								<div className="h-5 w-5 rounded-md bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-white"
									>
										<rect x="3" y="3" width="7" height="7" rx="1" />
										<rect x="14" y="3" width="7" height="7" rx="1" />
										<rect x="14" y="14" width="7" height="7" rx="1" />
										<rect x="3" y="14" width="7" height="7" rx="1" />
									</svg>
								</div>
							)}
							{selectedFilter === "Pinned" && (
								<div className="h-5 w-5 rounded-md bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-white"
									>
										<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
									</svg>
								</div>
							)}
							{selectedFilter === "Recent" && (
								<div className="h-5 w-5 rounded-md bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-white"
									>
										<circle cx="12" cy="12" r="10" />
										<polyline points="12 6 12 12 16 14" />
									</svg>
								</div>
							)}
							<span>{selectedFilter}</span>
							<ChevronDown className="h-4 w-4 ml-1" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="start"
						className="w-52 bg-white shadow-xl border border-slate-200 rounded-xl p-2"
					>
						<DropdownMenuItem
							onClick={() => setSelectedFilter("All Projects")}
							className={`px-4 py-3 cursor-pointer text-sm rounded-xl font-medium flex items-center gap-2  ${
								selectedFilter === "All Projects"
									? "bg-blue-50 text-blue-600"
									: "text-slate-700 hover:bg-blue-50/50 hover:text-blue-600"
							}`}
						>
							<div className="h-5 w-5 rounded-md bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="text-white"
								>
									<rect x="3" y="3" width="7" height="7" rx="1" />
									<rect x="14" y="3" width="7" height="7" rx="1" />
									<rect x="14" y="14" width="7" height="7" rx="1" />
									<rect x="3" y="14" width="7" height="7" rx="1" />
								</svg>
							</div>
							All Projects
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setSelectedFilter("Pinned")}
							className={`px-4 py-3 cursor-pointer text-sm rounded-xl font-medium flex items-center gap-2 ${
								selectedFilter === "Pinned"
									? "bg-emerald-50 text-emerald-600"
									: "text-slate-700 hover:bg-emerald-50/50 hover:text-emerald-600"
							}`}
						>
							<div className="h-5 w-5 rounded-md bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="text-white"
								>
									<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
								</svg>
							</div>
							Pinned
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setSelectedFilter("Recent")}
							className={`px-4 py-3 cursor-pointer text-sm rounded-xl font-medium flex items-center gap-2 ${
								selectedFilter === "Recent"
									? "bg-purple-50 text-purple-600"
									: "text-slate-700 hover:bg-purple-50/50 hover:text-purple-600"
							}`}
						>
							<div className="h-5 w-5 rounded-md bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="text-white"
								>
									<circle cx="12" cy="12" r="10" />
									<polyline points="12 6 12 12 16 14" />
								</svg>
							</div>
							Recent
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className="flex items-center gap-3 text-sm text-slate-600">
				<span className="font-medium">Sort by:</span>
				<select className="border border-slate-200 rounded-xl px-8 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer font-medium text-slate-800 shadow-sm transition-all duration-300">
					<option>Last Updated</option>
					<option>Date Created</option>
				</select>
			</div>
		</div>
	);
}
