import React from "react";
import { ChevronDown, Sparkles, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { InsightCard } from "./InsightCard";
import type { InsightType } from "../types";

interface InsightsListProps {
	filteredInsights: InsightType[];
	expandedInsight: string | null;
	setExpandedInsight: (id: string | null) => void;
	generateSummary: () => void;
	chartData: any[];
	showLegend: boolean;
	getCurrentColors: () => string[];
	selectedRetailer: string;
	setSelectedRetailer: (value: string) => void;
	selectedBrand: string;
	setSelectedBrand: (value: string) => void;
	selectedPPG: string;
	setSelectedPPG: (value: string) => void;
	viewBy: string;
	setViewBy: (value: string) => void;
	downloadType: string;
	setDownloadType: (value: string) => void;
	notes: string;
	setNotes: (value: string) => void;
}

export const InsightsList: React.FC<InsightsListProps> = ({
	filteredInsights,
	expandedInsight,
	setExpandedInsight,
	generateSummary,
	chartData,
	showLegend,
	getCurrentColors,
	selectedRetailer,
	setSelectedRetailer,
	selectedBrand,
	setSelectedBrand,
	selectedPPG,
	setSelectedPPG,
	viewBy,
	setViewBy,
	downloadType,
	setDownloadType,
	notes,
	setNotes,
}) => {
	const { toast } = useToast();

	return (
		<div className="w-full px-6 lg:px-12 py-4">
			<div className="flex items-center justify-between mb-4">
				<div className="text-sm text-gray-500">
					Total {filteredInsights.length} insights
				</div>
			</div>

			<div className="space-y-4">
				{filteredInsights.map((insight) => (
					<div
						key={insight.id}
						className="border border-gray-200 rounded-lg overflow-hidden"
					>
						<div
							className="flex items-center p-4 bg-gray-50 cursor-pointer"
							onClick={() =>
								setExpandedInsight(
									expandedInsight === insight.id ? null : insight.id
								)
							}
						>
							<div
								className={`inline-flex items-center justify-center py-1 px-2 text-sm rounded mr-4 ${
									insight.type === "base"
										? "bg-green-100 text-green-800"
										: insight.type === "promo"
										? "bg-purple-100 text-purple-800"
										: insight.type === "strat"
										? "bg-blue-100 text-blue-800"
										: "bg-orange-100 text-orange-800"
								}`}
							>
								<span className="uppercase">{insight.type}</span>{" "}
							</div>
							<h3 className="text-base font-medium flex-1">
								{insight.question}
							</h3>
							<div className="ml-auto flex items-center gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={(e) => {
										e.stopPropagation();
										generateSummary();
									}}
									className="rounded-full px-4 py-1.5 bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200 text-indigo-700 hover:from-indigo-100 hover:to-violet-100 hover:border-indigo-300 hover:text-indigo-800 transition-all duration-300 shadow hover:shadow-md hover:-translate-y-0.5 transform"
								>
									<div className="h-4 w-4 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mr-1.5">
										<Sparkles className="w-2.5 h-2.5 text-white" />
									</div>
									Generate AI Summary
								</Button>
								<Button
									variant="ghost"
									size="sm"
									className={`transition-transform ${
										expandedInsight === insight.id ? "rotate-180" : ""
									}`}
								>
									<ChevronDown className="h-4 w-4" />
								</Button>
							</div>
						</div>

						{expandedInsight === insight.id && (
							<InsightCard
								insight={insight}
								chartData={chartData}
								showLegend={showLegend}
								getCurrentColors={getCurrentColors}
								selectedRetailer={selectedRetailer}
								setSelectedRetailer={setSelectedRetailer}
								selectedBrand={selectedBrand}
								setSelectedBrand={setSelectedBrand}
								selectedPPG={selectedPPG}
								setSelectedPPG={setSelectedPPG}
								viewBy={viewBy}
								setViewBy={setViewBy}
								downloadType={downloadType}
								setDownloadType={setDownloadType}
								notes={notes}
								setNotes={setNotes}
								toast={toast}
							/>
						)}
					</div>
				))}
			</div>
		</div>
	);
};
