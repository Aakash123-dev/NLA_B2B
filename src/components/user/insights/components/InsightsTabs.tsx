"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInsightsContext } from "../contexts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getQuestionTypes } from "@/store/slices/questionTypesSlices";

interface InsightsTabsProps {
	selectedTab: string;
	setSelectedTab: (tab: string) => void;
	setIsSmartInsightsOpen: (open: boolean) => void;
}

// Optional: Human-readable names for tabs
const labelMap: Record<string, string> = {
	all: "All Insights",
	base: "Base Price",
	promo: "Promotional",
	strat: "Strategic",
	overall: "Overall",
};

export const InsightsTabs: React.FC<InsightsTabsProps> = ({
	selectedTab,
	setSelectedTab,
	setIsSmartInsightsOpen,
}) => {
	const { state } = useInsightsContext();
	const dispatch = useDispatch<AppDispatch>();
	
	// Safely get URL parameters if available
	let modelIdFromUrl = null;
	try {
		const searchParams = useSearchParams();
		modelIdFromUrl = searchParams.get("model");
	} catch (error) {
		console.log("useSearchParams not available, using context modelId");
	}
	
	const modelId = modelIdFromUrl;

	// Get question types from Redux state
	const { tabs, isLoading, error } = useSelector(
		(state: RootState) => state.questionTypes
	);

	useEffect(() => {
		if (!modelId) return;
	
		dispatch(getQuestionTypes(modelId.toString()));
	}, [dispatch, modelId]);

	return (
		<div className="w-full px-6 lg:px-12 py-4 bg-white shadow-sm border-b border-gray-200">
			<div className="flex items-center justify-between">
				<div className="flex gap-2 overflow-x-auto py-1 scrollbar-hide">
					{/* Optional static All Insights tab */}
					<button
						onClick={() => setSelectedTab("all")}
						className={`py-2 px-4 rounded-full font-medium text-sm transition-all duration-300 ${
							selectedTab === "all"
								? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
								: "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
						}`}
					>
						All Insights
					</button>

					{/* Render API-based tabs */}
					{isLoading ? (
						<div className="flex items-center gap-2">
							<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
							<span className="text-sm text-gray-500">Loading tabs...</span>
						</div>
					) : error ? (
						<div className="text-sm text-red-500">Error loading tabs</div>
					) : (
						tabs.map((tab, index) => {
							const label = labelMap[tab.type] || tab.type;

							return (
								<button
									key={index}
									onClick={() => setSelectedTab(tab.type)}
									className={`py-2 px-4 rounded-full font-medium text-sm transition-all duration-300 ${
										selectedTab === tab.type
											? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
											: "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
									}`}
								>
									{label}
								</button>
							);
						})
					)}
				</div>

				<div className="px-4">
					<Button
						variant="outline"
						size="sm"
						className="gap-2 bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200 text-indigo-700 hover:from-indigo-100 hover:to-violet-100 hover:border-indigo-300 hover:text-indigo-800 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transform rounded-full px-5"
						onClick={() => setIsSmartInsightsOpen(true)}
					>
						<Brain className="w-4 h-4" />
						Smart Insights
					</Button>
				</div>
			</div>
		</div>
	);
};
