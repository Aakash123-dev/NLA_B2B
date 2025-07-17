import { useInsightsContext } from '../contexts';

export const useSmartInsightsDrawerProps = () => {
  const { state, actions } = useInsightsContext();

  return {
    isSmartInsightsOpen: state.isSmartInsightsOpen,
    setIsSmartInsightsOpen: actions.setIsSmartInsightsOpen,
    showSummary: state.showSummary,
    setShowSummary: actions.setShowSummary,
    showTextBot: state.showTextBot,
    setShowTextBot: actions.setShowTextBot,
    summaryType: state.summaryType,
    setSummaryType: actions.setSummaryType,
    isGeneratingSummary: state.isGeneratingSummary,
    setIsGeneratingSummary: actions.setIsGeneratingSummary,
    generatedSummary: state.generatedSummary,
    setGeneratedSummary: actions.setGeneratedSummary,
    textBotPrompt: state.textBotPrompt,
    setTextBotPrompt: actions.setTextBotPrompt,
    textBotResponse: state.textBotResponse,
    setTextBotResponse: actions.setTextBotResponse,
    isGeneratingTextBotResponse: state.isGeneratingTextBotResponse,
    setIsGeneratingTextBotResponse: actions.setIsGeneratingTextBotResponse,
  };
};
