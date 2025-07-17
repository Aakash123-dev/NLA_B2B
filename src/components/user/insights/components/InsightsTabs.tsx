"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InsightsTabsProps {
	selectedTab: string;
	setSelectedTab: (tab: string) => void;
	setIsSmartInsightsOpen: (open: boolean) => void;
}

interface TabType {
	type: string;
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
	const searchParams = useSearchParams();
	const modelId = searchParams.get("model");

	const [tabs, setTabs] = useState<TabType[]>([]);

	useEffect(() => {
		if (!modelId) return;
		const token =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3LCJlbWFpbCI6InRlc3RpbmdAbmxhLmNvbSIsInN0YXR1cyI6ImFjdGl2ZSIsInJvbGUiOiJ1c2VyIiwic2hvd19wb3B1cCI6MSwicGFzc3dvcmQiOiIkMmEkMTAkeW9HSi5WU3hRck1kWGpIc0NHMENWLnhCUWxBSlppWmdCaFZ5UGZCVlIyaGVlREZHUVcyclMiLCJjbGllbnRfZmlyc3RfbmFtZSI6IlRlc3RpbmciLCJjbGllbnRfbGFzdF9uYW1lIjoiTmFtZTEiLCJmdWxsX25hbWUiOm51bGwsImFkZHJlc3MiOiJqYWhza2pkbiIsInBob25lX251bWJlciI6IjIzMjEzMzQzIiwiY2xpZW50X2xvZ28iOm51bGwsImNyZWF0ZWRfYnkiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjItMTItMDdUMjM6NDQ6MDIuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDQtMThUMTc6Mjk6NDMuMDAwWiJ9LCJpYXQiOjE3NTI0NjcxMTIsImV4cCI6MTc1NTA1OTExMn0.2Avb2uW4QceaXMVPlahRlKttk1b7E1GpvgcKOAlXMbE";

		fetch(
			`https://nla-node-backend-u3zputq5qq-uc.a.run.app/api/v1/insights/question-types/${modelId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then((res) => res.json())
			.then((json) => {
				if (Array.isArray(json.data)) {
					setTabs(json.data);
				}
			})
			.catch((err) => {
				console.error("Error fetching question types:", err);
			});
	}, [modelId]);

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
					{tabs.map((tab, index) => {
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
					})}
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
