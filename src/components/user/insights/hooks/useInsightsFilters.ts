import { useEffect, useMemo, useState } from "react";
import type { InsightType } from "../types";
import { insightTypes } from "../data";
import { useSearchParams } from "next/navigation";

export const useInsightsFilters = (selectedTab: string, apiData: any, setApiData: (data: any[]) => void) => {
	const searchParams = useSearchParams();
	const modelId = searchParams.get("model");

	const token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3LCJlbWFpbCI6InRlc3RpbmdAbmxhLmNvbSIsInN0YXR1cyI6ImFjdGl2ZSIsInJvbGUiOiJ1c2VyIiwic2hvd19wb3B1cCI6MSwicGFzc3dvcmQiOiIkMmEkMTAkeW9HSi5WU3hRck1kWGpIc0NHMENWLnhCUWxBSlppWmdCaFZ5UGZCVlIyaGVlREZHUVcyclMiLCJjbGllbnRfZmlyc3RfbmFtZSI6IlRlc3RpbmciLCJjbGllbnRfbGFzdF9uYW1lIjoiTmFtZTEiLCJmdWxsX25hbWUiOm51bGwsImFkZHJlc3MiOiJqYWhza2pkbiIsInBob25lX251bWJlciI6IjIzMjEzMzQzIiwiY2xpZW50X2xvZ28iOm51bGwsImNyZWF0ZWRfYnkiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjItMTItMDdUMjM6NDQ6MDIuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDQtMThUMTc6Mjk6NDMuMDAwWiJ9LCJpYXQiOjE3NTI0NjcxMTIsImV4cCI6MTc1NTA1OTExMn0.2Avb2uW4QceaXMVPlahRlKttk1b7E1GpvgcKOAlXMbE";

	useEffect(() => {
		if (!modelId) return;

		const fetchData = async () => {
			try {
				let url = "";

				if (selectedTab === "all") {
					// Use this URL when "all" tab is selected
					url = `https://nla-node-backend-u3zputq5qq-uc.a.run.app/api/v1/admin/get-admin-questions/${modelId}`;
				} else {
					// Use this URL for other tabs
					url = `https://nla-node-backend-u3zputq5qq-uc.a.run.app/api/v1/insights/questions-per-type/${modelId}/${selectedTab}`;
				}

				const response = await fetch(url, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				const json = await response.json();
				console.log(json, "fetched response");

				if (Array.isArray(json.data)) {
					setApiData(json.data);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [modelId, selectedTab]);

	console.log(apiData, "allApiData");

	const filteredInsights = useMemo(() => {
		return selectedTab === "all"
			? apiData
			: apiData.filter((insight) => insight.type === selectedTab);
	}, [selectedTab, apiData]);

	return {
		filteredInsights,
	};
};
