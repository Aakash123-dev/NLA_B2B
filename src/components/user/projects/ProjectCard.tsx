/* eslint-disable react/jsx-key */
import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Activity,
	CalendarClock,
	Clock,
	Copy,
	MoreVertical,
	Pencil,
	Star,
	Trash2,
	Target,
	Database,
	Timer,
	Palette,
	MoreHorizontal,
	ChevronDown,
	Layers,
} from "lucide-react";
import { ProjectType } from "./ProjectTypes";
import Image from "next/image";

interface ProjectCardProps {
	project: ProjectType;
	favorites: number[];
	toggleFavorite: (id: number) => void;
	handleEditProject: (project: ProjectType) => void;
	handleDeleteProject: (project: ProjectType) => void;
	handleDuplicateProject: (project: ProjectType) => void;
	handleColorChange?: (project: ProjectType, color: string) => void;
}

export default function ProjectCard({
	project,
	favorites,
	toggleFavorite,
	handleEditProject,
	handleDeleteProject,
	handleDuplicateProject,
	handleColorChange,
}: ProjectCardProps) {
	// Format dates
	const formatDate = (dateString: string | Date) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		}) + ", " + date.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		}).toLowerCase();
	};

	// Generate unique dashboard-style color themes for each card based on project id
    const getCardTheme = (id: number | string | undefined, headerColor?: string) => {
		// If project has a specific headerColor, use it
		if (headerColor) {
			return getThemeFromColor(headerColor);
		}

		// Default themes array
		const themes = [
			{
				header: 'bg-gradient-to-br from-blue-50 to-blue-100',
				accent: 'bg-gradient-to-r from-blue-600 to-blue-700',
				text: 'text-blue-700',
				light: 'text-blue-400',
				hover: 'hover:bg-blue-50/80',
				card: 'bg-gradient-to-br from-blue-50 to-blue-100',
				overlay: 'bg-gradient-to-br from-blue-600 to-blue-700',
				moduleAccent: 'bg-gradient-to-r from-purple-600 to-purple-700',
			},
			{
				header: 'bg-gradient-to-br from-purple-50 to-purple-100',
				accent: 'bg-gradient-to-r from-purple-600 to-purple-700',
				text: 'text-purple-700',
				light: 'text-purple-400',
				hover: 'hover:bg-purple-50/80',
				card: 'bg-gradient-to-br from-purple-50 to-purple-100',
				overlay: 'bg-gradient-to-br from-purple-600 to-purple-700',
				moduleAccent: 'bg-gradient-to-r from-blue-600 to-blue-700',
			},
			{
				header: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
				accent: 'bg-gradient-to-r from-emerald-600 to-emerald-700',
				text: 'text-emerald-700',
				light: 'text-emerald-400',
				hover: 'hover:bg-emerald-50/80',
				card: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
				overlay: 'bg-gradient-to-br from-emerald-600 to-emerald-700',
				moduleAccent: 'bg-gradient-to-r from-teal-600 to-teal-700',
			},
			{
				header: 'bg-gradient-to-br from-orange-50 to-orange-100',
				accent: 'bg-gradient-to-r from-orange-600 to-orange-700',
				text: 'text-orange-700',
				light: 'text-orange-400',
				hover: 'hover:bg-orange-50/80',
				card: 'bg-gradient-to-br from-orange-50 to-orange-100',
				overlay: 'bg-gradient-to-br from-orange-600 to-orange-700',
				moduleAccent: 'bg-gradient-to-r from-amber-600 to-amber-700',
			},
			{
				header: 'bg-gradient-to-br from-rose-50 to-rose-100',
				accent: 'bg-gradient-to-r from-rose-600 to-rose-700',
				text: 'text-rose-700',
				light: 'text-rose-400',
				hover: 'hover:bg-rose-50/80',
				card: 'bg-gradient-to-br from-rose-50 to-rose-100',
				overlay: 'bg-gradient-to-br from-rose-600 to-rose-700',
				moduleAccent: 'bg-gradient-to-r from-pink-600 to-pink-700',
			},
			{
				header: 'bg-gradient-to-br from-cyan-50 to-cyan-100',
				accent: 'bg-gradient-to-r from-cyan-600 to-cyan-700',
				text: 'text-cyan-700',
				light: 'text-cyan-400',
				hover: 'hover:bg-cyan-50/80',
				card: 'bg-gradient-to-br from-cyan-50 to-cyan-100',
				overlay: 'bg-gradient-to-br from-cyan-600 to-cyan-700',
				moduleAccent: 'bg-gradient-to-r from-indigo-600 to-indigo-700',
			},
			{
				header: 'bg-gradient-to-br from-lime-50 to-lime-100',
				accent: 'bg-gradient-to-r from-lime-600 to-lime-700',
				text: 'text-lime-700',
				light: 'text-lime-400',
				hover: 'hover:bg-lime-50/80',
				card: 'bg-gradient-to-br from-lime-50 to-lime-100',
				overlay: 'bg-gradient-to-br from-lime-600 to-lime-700',
				moduleAccent: 'bg-gradient-to-r from-green-600 to-green-700',
			},
			{
				header: 'bg-gradient-to-br from-fuchsia-50 to-fuchsia-100',
				accent: 'bg-gradient-to-r from-fuchsia-600 to-fuchsia-700',
				text: 'text-fuchsia-700',
				light: 'text-fuchsia-400',
				hover: 'hover:bg-fuchsia-50/80',
				card: 'bg-gradient-to-br from-fuchsia-50 to-fuchsia-100',
				overlay: 'bg-gradient-to-br from-fuchsia-600 to-fuchsia-700',
				moduleAccent: 'bg-gradient-to-r from-violet-600 to-violet-700',
			},
		];
        const numericId = Number(id);
        const safeIndex = Number.isFinite(numericId)
            ? Math.abs(numericId) % themes.length
            : 0;
        return themes[safeIndex];
	};

	// Function to generate theme from color selection
	const getThemeFromColor = (colorName: string) => {
		const colorThemes = {
			blue: {
				header: 'bg-gradient-to-br from-blue-50 to-blue-100',
				accent: 'bg-gradient-to-r from-blue-600 to-blue-700',
				text: 'text-blue-700',
				light: 'text-blue-400',
				hover: 'hover:bg-blue-50/80',
				card: 'bg-gradient-to-br from-blue-50 to-blue-100',
				overlay: 'bg-gradient-to-br from-blue-600 to-blue-700',
				moduleAccent: 'bg-gradient-to-r from-purple-600 to-purple-700',
			},
			purple: {
				header: 'bg-gradient-to-br from-purple-50 to-purple-100',
				accent: 'bg-gradient-to-r from-purple-600 to-purple-700',
				text: 'text-purple-700',
				light: 'text-purple-400',
				hover: 'hover:bg-purple-50/80',
				card: 'bg-gradient-to-br from-purple-50 to-purple-100',
				overlay: 'bg-gradient-to-br from-purple-600 to-purple-700',
				moduleAccent: 'bg-gradient-to-r from-blue-600 to-blue-700',
			},
			emerald: {
				header: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
				accent: 'bg-gradient-to-r from-emerald-600 to-emerald-700',
				text: 'text-emerald-700',
				light: 'text-emerald-400',
				hover: 'hover:bg-emerald-50/80',
				card: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
				overlay: 'bg-gradient-to-br from-emerald-600 to-emerald-700',
				moduleAccent: 'bg-gradient-to-r from-teal-600 to-teal-700',
			},
			orange: {
				header: 'bg-gradient-to-br from-orange-50 to-orange-100',
				accent: 'bg-gradient-to-r from-orange-600 to-orange-700',
				text: 'text-orange-700',
				light: 'text-orange-400',
				hover: 'hover:bg-orange-50/80',
				card: 'bg-gradient-to-br from-orange-50 to-orange-100',
				overlay: 'bg-gradient-to-br from-orange-600 to-orange-700',
				moduleAccent: 'bg-gradient-to-r from-amber-600 to-amber-700',
			},
			rose: {
				header: 'bg-gradient-to-br from-rose-50 to-rose-100',
				accent: 'bg-gradient-to-r from-rose-600 to-rose-700',
				text: 'text-rose-700',
				light: 'text-rose-400',
				hover: 'hover:bg-rose-50/80',
				card: 'bg-gradient-to-br from-rose-50 to-rose-100',
				overlay: 'bg-gradient-to-br from-rose-600 to-rose-700',
				moduleAccent: 'bg-gradient-to-r from-pink-600 to-pink-700',
			},
			cyan: {
				header: 'bg-gradient-to-br from-cyan-50 to-cyan-100',
				accent: 'bg-gradient-to-r from-cyan-600 to-cyan-700',
				text: 'text-cyan-700',
				light: 'text-cyan-400',
				hover: 'hover:bg-cyan-50/80',
				card: 'bg-gradient-to-br from-cyan-50 to-cyan-100',
				overlay: 'bg-gradient-to-br from-cyan-600 to-cyan-700',
				moduleAccent: 'bg-gradient-to-r from-indigo-600 to-indigo-700',
			},
			lime: {
				header: 'bg-gradient-to-br from-lime-50 to-lime-100',
				accent: 'bg-gradient-to-r from-lime-600 to-lime-700',
				text: 'text-lime-700',
				light: 'text-lime-400',
				hover: 'hover:bg-lime-50/80',
				card: 'bg-gradient-to-br from-lime-50 to-lime-100',
				overlay: 'bg-gradient-to-br from-lime-600 to-lime-700',
				moduleAccent: 'bg-gradient-to-r from-green-600 to-green-700',
			},
			fuchsia: {
				header: 'bg-gradient-to-br from-fuchsia-50 to-fuchsia-100',
				accent: 'bg-gradient-to-r from-fuchsia-600 to-fuchsia-700',
				text: 'text-fuchsia-700',
				light: 'text-fuchsia-400',
				hover: 'hover:bg-fuchsia-50/80',
				card: 'bg-gradient-to-br from-fuchsia-50 to-fuchsia-100',
				overlay: 'bg-gradient-to-br from-fuchsia-600 to-fuchsia-700',
				moduleAccent: 'bg-gradient-to-r from-violet-600 to-violet-700',
			},
			indigo: {
				header: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
				accent: 'bg-gradient-to-r from-indigo-600 to-indigo-700',
				text: 'text-indigo-700',
				light: 'text-indigo-400',
				hover: 'hover:bg-indigo-50/80',
				card: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
				overlay: 'bg-gradient-to-br from-indigo-600 to-indigo-700',
				moduleAccent: 'bg-gradient-to-r from-blue-600 to-blue-700',
			},
			teal: {
				header: 'bg-gradient-to-br from-teal-50 to-teal-100',
				accent: 'bg-gradient-to-r from-teal-600 to-teal-700',
				text: 'text-teal-700',
				light: 'text-teal-400',
				hover: 'hover:bg-teal-50/80',
				card: 'bg-gradient-to-br from-teal-50 to-teal-100',
				overlay: 'bg-gradient-to-br from-teal-600 to-teal-700',
				moduleAccent: 'bg-gradient-to-r from-emerald-600 to-emerald-700',
			},
		};
		
		return colorThemes[colorName as keyof typeof colorThemes] || colorThemes.blue;
	};

    const theme = getCardTheme(project?.id, project?.headerColor);

	return (
		<div
			key={project.id}
			className={`group relative overflow-hidden border-0 ${theme.card} hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer w-full min-h-[340px] flex flex-col rounded-3xl shadow-lg`}
		>
			{/* Dashboard-style overlay */}
			<div className={`absolute inset-0 ${theme.overlay} opacity-5`} />
			
			{/* Header */}
			<div className={`relative ${theme.header} px-6 py-2.5 border-b border-white/20`}>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<div className={`${theme.accent} w-8 h-8 rounded-2xl flex items-center justify-center shadow-lg`}>
							<span className="text-white font-bold text-sm">
								{project.project_name ? project.project_name.charAt(0).toUpperCase() : "P"}
							</span>
						</div>
						<div>
							<h2 className="text-lg font-bold text-slate-900">
								{project.project_name || "Project 7"}
							</h2>
							<span className={`${theme.text} bg-white/90 px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm inline-block mt-0.5`}>
								v{project.project_version || "1"}
							</span>
						</div>
					</div>
					<div className="flex items-center space-x-2">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => toggleFavorite(project.id)}
							className={`${theme.hover} p-2 rounded-xl transition-all duration-200 group h-auto w-auto border-0 bg-white/60 backdrop-blur-sm`}
						>
							<Star
								className={`w-4 h-4 ${
									favorites.includes(project.id)
										? "fill-amber-400 text-amber-400"
										: "text-gray-500 group-hover:text-gray-700"
								}`}
							/>
						</Button>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									className={`${theme.hover} p-2 rounded-xl transition-all duration-200 group h-auto w-auto border-0 bg-white/60 backdrop-blur-sm`}
								>
									<MoreVertical className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className="w-52 bg-white/90 backdrop-blur-xl shadow-2xl border border-white/20 rounded-2xl p-2"
							>
								<DropdownMenuItem
									onClick={() => handleDuplicateProject(project)}
									className="text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 px-4 py-3 cursor-pointer text-sm rounded-xl font-medium flex items-center gap-3 whitespace-nowrap"
								>
									<Copy className="w-4 h-4 flex-shrink-0" />
									Duplicate Project
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => handleEditProject(project)}
									className="text-gray-700 hover:bg-emerald-50/80 hover:text-emerald-600 px-4 py-3 cursor-pointer text-sm rounded-xl font-medium flex items-center gap-3"
								>
									<Pencil className="w-4 h-4" />
									Edit Project
								</DropdownMenuItem>
								<DropdownMenuSeparator className="my-1" />
								<DropdownMenuItem
									onClick={() => handleDeleteProject(project)}
									className="text-red-600 hover:bg-red-50/80 px-4 py-3 cursor-pointer text-sm rounded-xl font-medium flex items-center gap-3"
								>
									<Trash2 className="w-4 h-4" />
									Delete Project
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>

			{/* Content - Fixed height with proper spacing */}
			<div className="relative px-6 py-3 flex-1 flex flex-col min-h-0 bg-white/80 backdrop-blur-sm">
				{/* Description */}
				<p className="text-slate-600 text-sm mb-3 leading-relaxed font-medium">
					{project.description || "Modern optimization project with advanced analytics and reporting capabilities."}
				</p>

				{/* Details - Scrollable if needed */}
				<div className="space-y-2.5 flex-1">
					<div className="flex items-center justify-between py-1">
						<div className="flex items-center space-x-3">
							<Database className="w-4 h-4 text-slate-400" />
							<span className="text-sm text-slate-500 font-medium">Table</span>
						</div>
						<span className="text-sm font-semibold text-slate-800">Table 1</span>
					</div>

					<div className="flex items-center justify-between py-1">
						<div className="flex items-center space-x-3">
							<Target className="w-4 h-4 text-slate-400" />
							<span className="text-sm text-slate-500 font-medium">Target Brand</span>
						</div>
						<span className="text-sm font-semibold text-slate-800">Brand 1</span>
					</div>

					<div className="flex items-center justify-between py-1">
						<div className="flex items-center space-x-3">
							<Timer className="w-4 h-4 text-slate-400" />
							<span className="text-sm text-slate-500 font-medium">Model Run</span>
						</div>
						<span className="text-sm font-semibold text-slate-800">52 Weeks</span>
					</div>

					<div className="pt-2.5 border-t border-slate-200/60 space-y-1.5">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<Clock className="w-4 h-4 text-slate-400" />
								<span className="text-xs text-slate-500 font-medium">Created</span>
							</div>
							<span className="text-xs text-slate-700 font-semibold">{formatDate(project.date_created)}</span>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<CalendarClock className="w-4 h-4 text-slate-400" />
								<span className="text-xs text-slate-500 font-medium">Last Updated</span>
							</div>
							<span className="text-xs text-slate-700 font-semibold">{formatDate(project.updatedAt)}</span>
						</div>
					</div>
				</div>

				{/* Button - Fixed at bottom */}
				<div className="mt-3 pt-2.5 border-t border-slate-200/60">
					<div className="grid grid-cols-2 gap-2">
						{/* Actions Button */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									className={`w-full ${theme.accent} hover:shadow-lg text-white font-semibold py-2.5 px-5 rounded-2xl transition-all duration-300 text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer group relative z-10`}
								>
									<span>Actions</span>
									<ChevronDown className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="center"
								className="bg-white/95 backdrop-blur-lg shadow-2xl border border-white/20 rounded-2xl p-3 w-[400px] mb-2"
								sideOffset={5}
								side="top"
							>
								<div className="grid grid-cols-2 gap-3 w-full">
									{/* Column 1 */}
									<div className="flex flex-col space-y-2">
										<Link
											href={`/user/simulator?projectName=${project?.project_name}&project=${project.id}&model=${project?.Models?.[0]?.id ?? ""}`}
											className={`bg-emerald-200 hover:bg-emerald-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-2 h-9 border border-emerald-300/50`}
										>
											<Target className="w-3.5 h-3.5" />
											Simulator
										</Link>
										
										<Link
											href={`/user/insights?projectName=${project?.project_name}&project=${project.id}&model=${project?.Models?.[0]?.id ?? ""}`}
											className={`bg-indigo-200 hover:bg-indigo-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-2 h-9 border border-indigo-300/50`}
										>
											<Database className="w-3.5 h-3.5" />
											Insights
										</Link>
										
										<Link
											href={`/user/analysis?projectName=${project?.project_name}&project=${project.id}&model=${project?.Models?.[0]?.id ?? ""}`}
											className={`bg-rose-200 hover:bg-rose-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-2 h-9 border border-rose-300/50`}
										>
											<Target className="w-3.5 h-3.5" />
											Analysis
										</Link>
										
										<Link
											href={`/user/output?projectName=${project?.project_name}&project=${project.id}&model=${project?.Models?.[0]?.id ?? ""}`}
											className={`bg-amber-200 hover:bg-amber-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-2 h-9 border border-amber-300/50`}
										>
											<Clock className="w-3.5 h-3.5" />
											Output Report
										</Link>
									</div>
									
									{/* Column 2 - Replicated */}
									<div className="flex flex-col space-y-2">
										<Link
											href={`/user/simulator?projectName=${project?.project_name}&project=${project.id}&model=${project?.Models?.[0]?.id ?? ""}`}
											className={`bg-emerald-200 hover:bg-emerald-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-2 h-9 border border-emerald-300/50`}
										>
											<Target className="w-3.5 h-3.5" />
											Simulator
										</Link>
										
										<Link
											href={`/user/insights?projectName=${project?.project_name}&project=${project.id}&model=${project?.Models?.[0]?.id ?? ""}`}
											className={`bg-indigo-200 hover:bg-indigo-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-2 h-9 border border-indigo-300/50`}
										>
											<Database className="w-3.5 h-3.5" />
											Insights
										</Link>
										
										<Link
											href={`/user/analysis?projectName=${project?.project_name}&project=${project.id}&model=${project?.Models?.[0]?.id ?? ""}`}
											className={`bg-rose-200 hover:bg-rose-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-2 h-9 border border-rose-300/50`}
										>
											<Target className="w-3.5 h-3.5" />
											Analysis
										</Link>
										
										<Link
											href={`/user/output?projectName=${project?.project_name}&project=${project.id}&model=${project?.Models?.[0]?.id ?? ""}`}
											className={`bg-amber-200 hover:bg-amber-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-2 h-9 border border-amber-300/50`}
										>
											<Clock className="w-3.5 h-3.5" />
											Output Report
										</Link>
									</div>
								</div>
							</DropdownMenuContent>
						</DropdownMenu>

						{/* Module Button */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									className={`w-full ${theme.moduleAccent} hover:shadow-lg text-white font-semibold py-2.5 px-5 rounded-2xl transition-all duration-300 text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer group relative z-10`}
								>
									<span>Modules</span>
									<ChevronDown className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="center"
								className="bg-white/95 backdrop-blur-lg shadow-2xl border border-white/20 rounded-2xl p-3 w-[400px] mb-2"
								sideOffset={5}
								side="top"
							>
								<div className="grid grid-cols-2 gap-3 w-full">
									{/* Column 1 */}
									<div className="flex flex-col space-y-2">
										<Link
											href={`/user/design-studio?projectName=${project?.project_name}&project=${project.id}&model=${project?.Models?.[0]?.id ?? ""}`}
											className={`bg-purple-200 hover:bg-purple-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-2 h-9 border border-purple-300/50`}
										>
											<Activity className="w-3.5 h-3.5" />
											Design Studio
										</Link>
										
										<Link
											href={`/user/forecast?projectName=${project?.project_name}&project=${project.id}&model=${project?.Models?.[0]?.id ?? ""}`}
											className={`bg-cyan-200 hover:bg-cyan-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-2 h-9 border border-cyan-300/50`}
										>
											<CalendarClock className="w-3.5 h-3.5" />
											Forecast
										</Link>
										
										<Link
											href={`/user/price-architecture?projectName=${project?.project_name}&project=${project.id}&model=${project?.Models?.[0]?.id ?? ""}`}
											className={`bg-lime-200 hover:bg-lime-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-2 h-9 border border-lime-300/50`}
										>
											<Database className="w-3.5 h-3.5" />
											Price Architecture
										</Link>
										
										<Link
											href={`/user/tpo?projectName=${project?.project_name}&project=${project.id}&model=${project?.Models?.[0]?.id ?? ""}`}
											className={`bg-fuchsia-200 hover:bg-fuchsia-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-2 h-9 border border-fuchsia-300/50`}
										>
											<Palette className="w-3.5 h-3.5" />
											TPO
										</Link>
									</div>
									
									{/* Column 2 - Replicated */}
									<div className="flex flex-col space-y-2">
										<Link
											href={`/user/design-studio?projectName=${project?.project_name}&project=${project.id}&model=${project?.Models?.[0]?.id ?? ""}`}
											className={`bg-purple-200 hover:bg-purple-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-2 h-9 border border-purple-300/50`}
										>
											<Activity className="w-3.5 h-3.5" />
											Design Studio
										</Link>
										
										<Link
											href={`/user/forecast?projectName=${project?.project_name}&project=${project.id}&model=${project?.Models?.[0]?.id ?? ""}`}
											className={`bg-cyan-200 hover:bg-cyan-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-2 h-9 border border-cyan-300/50`}
										>
											<CalendarClock className="w-3.5 h-3.5" />
											Forecast
										</Link>
										
										<Link
											href={`/user/price-architecture?projectName=${project?.project_name}&project=${project.id}&model=${project?.Models?.[0]?.id ?? ""}`}
											className={`bg-lime-200 hover:bg-lime-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-2 h-9 border border-lime-300/50`}
										>
											<Database className="w-3.5 h-3.5" />
											Price Architecture
										</Link>
										
										<Link
											href={`/user/tpo?projectName=${project?.project_name}&project=${project.id}&model=${project?.Models?.[0]?.id ?? ""}`}
											className={`bg-fuchsia-200 hover:bg-fuchsia-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-2 h-9 border border-fuchsia-300/50`}
										>
											<Palette className="w-3.5 h-3.5" />
											TPO
										</Link>
									</div>
								</div>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</div>
	);
}
