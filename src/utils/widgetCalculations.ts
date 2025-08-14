import { Event } from '../types/event'
import { getResult } from './financialCalculations'

export const calculateWidgetValues = (events: Event[], targetBudget: number, year: number) => {
    // Initialize accumulators
    let totalRevenue = 0
    let totalSpend = 0
    let totalIncrementalContribution = 0

    let totalIncrementalRevenue = 0
    let totalVolume = 0
    let totalIncrementalVolume = 0
    let totalCogs = 0;

    events.forEach(event => {
        const { totalSpend: eventTotalSpend, incrementalContribution } = calculateEventROI(event);

        event.planned.forEach(product => {
            const { financialResults, promotionalResults } = getResult(product.financialData)
            const grossRevenue = promotionalResults.find(r => r.promotion === "Event Total")?.dollars || 0
            // const totalSpendResult = financialResults.find(r => r.name === "Total Spend")?.value
            const incrementalRevenue = financialResults.find(r => r.name === "Incremental Revenue")?.value
            // const salesROI = financialResults.find(r => r.name === "Sales ROI")?.value

            const eventTotalVolume = promotionalResults.find(r => r.promotion === "Event Total")?.units || 0
            const eventIncrementalVolume = promotionalResults.find(r => r.promotion === "Event Incremental")?.units || 0

            totalCogs += Number(product.financialData.vcm * eventTotalVolume) // TODO: Check if this is correct

            // totalSpend += Number(totalSpendResult?.replace(/[^0-9.-]+/g, "")) || 0
            totalIncrementalRevenue += Number(incrementalRevenue?.replace(/[^0-9.-]+/g, "")) || 0

            // Handle Incremental Volume average
            if (!isNaN(eventIncrementalVolume)) {
                totalIncrementalVolume += eventIncrementalVolume
            }

            if (!isNaN(grossRevenue)) {
                totalRevenue += grossRevenue;
            }

            // Handle Total Volume average
            if (!isNaN(eventTotalVolume)) {
                totalVolume += eventTotalVolume
            }
        })

        totalSpend += Number(eventTotalSpend) || 0;
        totalIncrementalContribution += Number(incrementalContribution) || 0;
    })

    // Calculate final values
    const budgetRemaining = Number((targetBudget - totalSpend).toFixed(2))
    const totalContribution = Number(totalRevenue - (totalSpend + totalCogs));
    return {
        totalVolume: Number(totalVolume.toFixed(2)).toLocaleString(),
        totalRevenue: Number(totalRevenue.toFixed(2)).toLocaleString(),
        totalContribution: Number(totalContribution.toFixed(2)).toLocaleString(), // As per requirement
        totalSpend,
        incrementalVolume: Number(totalIncrementalVolume.toFixed(2)).toLocaleString(),
        incrementalRevenue: Number(totalIncrementalRevenue.toFixed(2)).toLocaleString(),
        planROI: (((totalIncrementalContribution - totalSpend) / totalSpend) * 100),
        budgetRemaining
    }
}

export const calculateEventROI = (event: Event) => {
    let totalIncrContr = 0;
    let eventTotalSpend = 0;
    let eventTotalUnits = 0;
    let eventTotalPromoUnits = 0;
    // Calculate metrics for each product in event
    event.planned.forEach(product => {
        const { promotionalResults } = getResult(product.financialData);
        // Get base values from financialData
        const baseUnits = Number(product.financialData.units) || 0;
        // const basePrice = Number(product.financialData.basePrice) || 0;
        // const promoPrice = Number(product.financialData.promoPrice) || 0;
        const vcm = Number(product.financialData.vcm) || 0;
        const fixedFee = Number(product.financialData.fixedFee) || 0;

        // Get promo units from promotionalResults
        const promoUnits = Number(promotionalResults?.find(r =>
            r.promotion === 'Event Incremental')?.units) || 0;

        // Calculate incremental contribution
        const incrContr = promoUnits * vcm;
        totalIncrContr += incrContr;
        eventTotalUnits += promoUnits + baseUnits;
        eventTotalPromoUnits += promoUnits;
        // Calculate variable spend
        const varSpend = (baseUnits + promoUnits) * (product.financialData.edlpPerUnitRate + product.financialData.promoPerUnitRate);

        // Add fixed fee to get total spend for this product
        const productTotalSpend = varSpend + fixedFee;
        eventTotalSpend += productTotalSpend;
    });

    // Calculate and return event ROI and related metrics
    const roi = eventTotalSpend ? ((totalIncrContr - eventTotalSpend) / eventTotalSpend) * 100 : 0;
    return {
        roi,
        totalSpend: eventTotalSpend,
        incrementalContribution: totalIncrContr,
        eventTotalUnits,
        eventLift: eventTotalPromoUnits ? (eventTotalPromoUnits * 100) / eventTotalUnits : 0,
        eventROIUnits: eventTotalUnits * roi
    };
};