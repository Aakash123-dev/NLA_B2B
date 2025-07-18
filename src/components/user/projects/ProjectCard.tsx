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
	FileOutput,
	FlaskConical,
	Lightbulb,
	MoreVertical,
	Pencil,
	Star,
	Trash2,
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
}

export default function ProjectCard({
	project,
	favorites,
	toggleFavorite,
	handleEditProject,
	handleDeleteProject,
	handleDuplicateProject,
}: ProjectCardProps) {
	// Feature icons mapping
	const featureIcons: Record<string, React.ReactNode> = {
		"Design Studio": <Activity className="w-5 h-5" />,
		Insights: <Lightbulb className="w-5 h-5" />,
		Simulator: <FlaskConical className="w-5 h-5" />,
		Output: <FileOutput className="w-5 h-5" />,
	};

	// Feature colors mapping
	const featureColors: Record<
		string,
		{
			bg: string;
			text: string;
			hover: string;
			border: string;
			icon: string;
			gradient: string;
		}
	> = {
		"Design Studio": {
			bg: "bg-gradient-to-r from-white via-[#F2F7F2] to-white",
			text: "text-[#6F826A]",
			hover: "hover:shadow-[0_0_0_2px_#A0DAA9]",
			border: "border-[#A0DAA9]",
			icon: "text-[#6F826A]",
			gradient: "bg-gradient-to-r from-[#A0DAA9] via-white to-[#A0DAA9]",
		},
		Insights: {
			bg: "bg-gradient-to-r from-white via-[#F0EDF5] to-white",
			text: "text-[#555879]",
			hover: "hover:shadow-[0_0_0_2px_#C8A4D4]",
			border: "border-[#C8A4D4]",
			icon: "text-[#555879]",
			gradient: "bg-gradient-to-r from-[#C8A4D4] via-white to-[#C8A4D4]",
		},
		Simulator: {
			bg: "bg-gradient-to-r from-white via-[#F6F0E8] to-white",
			text: "text-[#A17A55]",
			hover: "hover:shadow-[0_0_0_2px_#FDE2B4]",
			border: "border-[#FDE2B4]",
			icon: "text-[#A17A55]",
			gradient: "bg-gradient-to-r from-[#FDE2B4] via-white to-[#FDE2B4]",
		},
		Output: {
			bg: "bg-gradient-to-r from-white via-[#EDF4F5] to-white",
			text: "text-[#604652]",
			hover: "hover:shadow-[0_0_0_2px_#AEDEE0]",
			border: "border-[#AEDEE0]",
			icon: "text-[#604652]",
			gradient: "bg-gradient-to-r from-[#AEDEE0] via-white to-[#AEDEE0]",
		},
	};

	const fixedFeatures = ["Design Studio", "Insights", "Simulator", "Output"];
	console.log(project?.Models, "AlProjectData");

	return (
		<div
			key={project.id}
			className="group bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-lg hover:border-slate-300 transition-all duration-300 overflow-hidden min-h-[380px] flex flex-col relative"
		>
			{/* Inner container to handle gradient border */}
			<div className="relative bg-white/95 rounded-3xl h-full flex flex-col z-10 backdrop-blur-sm">
				{/* Enhanced Card Header */}
				<div className="relative h-14 flex-shrink-0">
					<div
						className={`h-full bg-slate-300 relative overflow-hidden rounded-t-3xl`}
					>
						{/* Animated Background Pattern */}
						<div className="absolute bg-gradient-to-t from-black/20 via-transparent to-white/10 backdrop-blur-[1px]" />
						{/* Modern shimmering effect */}
						<div className="absolute opacity-40 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.9),transparent_70%)]" />
						<div className="absolute opacity-30 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.4)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
						{/* Subtle grain texture */}
						<div className="absolute opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

						{/* Enhanced Logo Section - Matching Navbar */}
						<div className="absolute top-3 left-4">
							<div className="w-8 h-8 bg-[#ffffff] rounded-xl flex items-center justify-center shadow-lg">
								<span className="text-[#009bcc] font-bold text-sm">G</span>
								{/* <Image className="rounde" width={30} height={30} src={project?.company_logo} alt="companylogo" /> */}
							</div>
						</div>

						{/* Enhanced Action Buttons */}
						<div className="absolute top-3 right-4 flex gap-2">
							<Button
								variant="ghost"
								size="sm"
								onClick={() => toggleFavorite(project.id)}
								className="h-8 w-8 p-0 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 hover:scale-110 transition-all duration-300 shadow-lg"
							>
								<Star
									className={`h-3 w-3 ${
										favorites.includes(project.id)
											? "fill-amber-500 text-amber-500"
											: "text-slate-700"
									}`}
								/>
							</Button>

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										size="sm"
										className="h-8 w-8 p-0 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 hover:scale-110 transition-all duration-300 shadow-lg flex-shrink-0"
									>
										<MoreVertical className="h-3 w-3 text-slate-700" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="end"
									className="w-56 min-w-[12rem] bg-white shadow-2xl border border-slate-200 rounded-2xl p-2"
								>
									<DropdownMenuItem
										onClick={() => handleDuplicateProject(project)}
										className="text-slate-700 hover:bg-blue-50 hover:text-blue-700 px-4 py-3 cursor-pointer text-sm rounded-xl font-medium flex items-center whitespace-nowrap"
									>
										<Copy className="w-4 h-4 mr-3 flex-shrink-0" />
										<span className="flex-shrink-0">Duplicate Project</span>
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => handleEditProject(project)}
										className="text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 px-4 py-3 cursor-pointer text-sm rounded-xl font-medium flex items-center whitespace-nowrap"
									>
										<Pencil className="w-4 h-4 mr-3 flex-shrink-0" />
										<span className="flex-shrink-0">Edit Project</span>
									</DropdownMenuItem>
									<DropdownMenuSeparator className="my-2" />
									<DropdownMenuItem
										onClick={() => handleDeleteProject(project)}
										className="text-red-600 hover:bg-red-50 px-4 py-3 cursor-pointer text-sm rounded-xl font-medium flex items-center whitespace-nowrap"
									>
										<Trash2 className="w-4 h-4 mr-3 flex-shrink-0" />
										<span className="flex-shrink-0">Delete Project</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>

				{/* Enhanced Card Body */}
				<div className="flex-1 p-6 flex flex-col">
					{/* Project Title with Version Badge */}
					<div className="mb-4">
						<div className="flex items-center gap-2 mb-3">
							<h3 className="font-bold text-xl text-slate-800 leading-tight flex-1">
								{project.project_name}
							</h3>

							<Badge
								variant="outline"
								className="text-xs font-semibold border-slate-300 text-slate-700 px-2 py-1 bg-white rounded-lg shadow-sm whitespace-nowrap"
							>
								v{project.project_version}
							</Badge>
						</div>
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-xs text-slate-800">
								<Clock className="w-4 h-4 text-blue-500" />
								<span className="text-[14px]">Table: Table 1</span>
								<span>
									{" "}
									{/* {new Date(project.date_created).toLocaleString("en-IN", {
										year: "numeric",
										month: "short",
										day: "numeric",
										hour: "2-digit",
										minute: "2-digit",
										hour12: true,
									})} */}
								</span>
							</div>
							<div className="flex items-center gap-2 text-xs text-slate-800">
								<CalendarClock className="w-4 h-4 text-emerald-500" />
								<span className="text-[14px]">Target Brand: Brand 1</span>
								<span>
									{/* {new Date(project.updatedAt).toLocaleString("en-IN", {
										year: "numeric",
										month: "short",
										day: "numeric",
										hour: "2-digit",
										minute: "2-digit",
										hour12: true,
									})} */}
								</span>
							</div>
							<div className="flex items-center gap-2 text-xs text-slate-800">
								<CalendarClock className="w-4 h-4 text-emerald-500" />
								<span className="text-[14px]">Model Run: 52 Weeks </span>
								<span>
									{/* {new Date(project.updatedAt).toLocaleString("en-IN", {
										year: "numeric",
										month: "short",
										day: "numeric",
										hour: "2-digit",
										minute: "2-digit",
										hour12: true,
									})} */}
								</span>
							</div>
						</div>

						{/* Compact Timestamps Section */}
						<div className="space-y-2 mt-2">
							<div className="flex items-center gap-2 text-xs text-slate-800">
								<Clock className="w-4 h-4 text-blue-500" />
								<span className="text-[14px]">Created:</span>
								<span className="text-[14px]">
									{" "}
									{new Date(project.date_created).toLocaleString("en-IN", {
										year: "numeric",
										month: "short",
										day: "numeric",
										hour: "2-digit",
										minute: "2-digit",
										hour12: true,
									})}
								</span>
							</div>
							<div className="flex items-center gap-2 text-xs text-slate-800">
								<CalendarClock className="w-4 h-4 text-emerald-500" />
								<span className="text-[14px]">Last Updated:</span>
								<span className="text-[14px]">
									{new Date(project.updatedAt).toLocaleString("en-IN", {
										year: "numeric",
										month: "short",
										day: "numeric",
										hour: "2-digit",
										minute: "2-digit",
										hour12: true,
									})}
								</span>
							</div>
						</div>
					</div>

					{/* Enhanced Feature Buttons */}
					<div className="mb-6">
						<h4 className="text-sm font-semibold text-slate-700 mb-3">
							Available Features
						</h4>
						<div className="grid grid-cols-2 gap-3">
							{fixedFeatures.map((feature, index) => {
								const getFeatureLink = (
									featureName: string,
									projectId: number,
									modelId?: number
								) => {
									switch (featureName) {
										case "Design Studio":
											return `/user/design-studio?project=${projectId}&model=${
												modelId ?? ""
											}`;
										case "Insights":
											return `/user/insights?project=${projectId}&model=${
												modelId ?? ""
											}`;
										case "Simulator":
											return `/user/simulator?project=${projectId}`;
										case "Output":
											return `/user/output?project=${projectId}`;
										default:
											return "#";
									}
								};

								const modelId = project?.Models?.[0]?.id;

								return (
									<Link
										key={index}
										href={getFeatureLink(feature, project.id, modelId)}
										className={`flex items-center justify-center gap-2 ${featureColors[feature].bg} ${featureColors[feature].text} border ${featureColors[feature].border} ${featureColors[feature].hover} h-12 px-3 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl group cursor-pointer`}
									>
										<span className="transition-transform duration-300 group-hover:scale-110">
											{featureIcons[feature]}
										</span>
										<span className="truncate">
											{feature === "Design Studio" ? "Studio" : feature}
										</span>
									</Link>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
