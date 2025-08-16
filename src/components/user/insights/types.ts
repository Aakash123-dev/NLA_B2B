import { ReactNode } from 'react';

export interface Retailer {
	id: string;
	name: string;
}

export interface Brand {
	id: string;
	name: string;
}

export interface PPGCategory {
	id: string;
	name: string;
}

export interface Region {
	id: string;
	name: string;
}

export interface Category {
	id: string;
	name: string;
}

export interface InsightType {
	id: string;
	name: string;
	category: "base" | "promo" | "strat" | "overall";
	question?: string;
	type?: string;
	// Add missing properties that the code is trying to access
	SlideNames?: Array<{
		slide_title: string;
	}>;
	Notes?: Array<{
		notes: string;
	}>;
}

// Add proper chart data types to replace any[]
export interface ChartDataItem {
	Brand?: string;
	Retailer?: string;
	Product?: string;
	Price_avg_last_4_weeks?: number;
	Price_per_ounce?: number;
	Ounces?: string | number;
	Dollar_sales_last_52_weeks?: number;
	Base_Price_Elasticity?: number;
	Price?: number;
	Total_Volume?: number;
	WeekEnding?: string;
	Promo_Price_Elasticity?: number;
	Average_discount_depth?: number;
	tpr_avg?: number;
	fo_avg?: number;
	do_avg?: number;
	fd_avg?: number;
	[key: string]: any; // For dynamic properties
}

export interface ColorScheme {
	id: string;
	name: string;
	colors: string[];
}

export interface PriceComparisonData {
	retailer: string;
	product: string;
	price: number;
	volume: number;
	size: string;
}

export interface PriceSlopeData {
	size: string;
	price: number;
	product: string;
}

export interface SensitivityData {
	price: number;
	volume: number;
	profit: number;
	elasticity: number;
}

export interface MerchandisingData {
	type: string;
	lift: number;
	revenue: number;
	cost: number;
	roi: number;
}

export interface ChartData {
	name: string;
	value: number;
	volume?: number;
	product?: string;
	profit?: number;
	elasticity?: number;
	revenue?: number;
	cost?: number;
	roi?: number;
	pricePerOz?: number;
}

export interface TopProduct {
	name: string;
	performance: string;
	metric: string;
	price: string;
	units: string;
	revenue: string;
	category: string;
}

export interface WidgetData {
	elasticProducts: number;
	inelasticProducts: number;
	growthPercentage: number;
	totalSales: number;
	recommendedUplift: number;
	topProducts: TopProduct[];
}

export type SummaryType = "overall" | "base" | "promo" | "strat";

export interface InsightsState {
	// Tab and insight states
	selectedTab: string;
	expandedInsight: string | null;
	selectedInsightType: string;
	setApiData: (data: InsightType[]) => void;
	apiData: InsightType[];
	// Filter states
	searchQuery: string;
	selectedRegion: string;
	selectedCategory: string;
	selectedRetailer: string;
	selectedBrand: string;
	selectedPPG: string;
	selectedUPC: string;

	// New multiselect filter states
	selectedRetailers: string[];
	selectedBrands: string[];
	selectedProducts: string[];

	// Chart states
	selectedColorScheme: string;
	showLegend: boolean;
	showDataLabels: boolean;
	animationEnabled: boolean;
	viewBy: string;
	downloadType: string;

	// Modal and drawer states
	showPasswordShare: boolean;
	isTopProductsModalOpen: boolean;
	isSummaryDrawerOpen: boolean;
	isSmartInsightsOpen: boolean;
	showSummary: boolean;
	showTextBot: boolean;

	// Summary states
	summaryType: SummaryType;
	isGeneratingSummary: boolean;
	generatedSummary: string;

	// Notes and text bot states
	notes: string;
	textBotPrompt: string;
	textBotResponse: string;
	isGeneratingTextBotResponse: boolean;
	isLoading: boolean;
}
