import { useInsightsContext } from '../contexts';

export const useInsightsListProps = () => {
  const { state, actions, filteredInsights, chartData } = useInsightsContext();

  return {
    filteredInsights,
    expandedInsight: state.expandedInsight,
    setExpandedInsight: actions.setExpandedInsight,
    generateSummary: actions.generateSummary,
    chartData,
    showLegend: state.showLegend,
    getCurrentColors: actions.getCurrentColors,
    selectedRetailer: state.selectedRetailer,
    setSelectedRetailer: actions.setSelectedRetailer,
    selectedBrand: state.selectedBrand,
    setSelectedBrand: actions.setSelectedBrand,
    selectedPPG: state.selectedPPG,
    setSelectedPPG: actions.setSelectedPPG,
    viewBy: state.viewBy,
    setViewBy: actions.setViewBy,
    downloadType: state.downloadType,
    setDownloadType: actions.setDownloadType,
    notes: state.notes,
    setNotes: actions.setNotes,
  };
};
