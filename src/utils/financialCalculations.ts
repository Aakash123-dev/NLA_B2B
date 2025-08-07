// Helper function to safely parse numeric values, treating empty/null as 0
const safeParseFloat = (value: any): number => {
    if (!value || value === "" || value === null) return 0;
    const parsed = parseFloat(value.toString()?.replace(/,/g, '') || '0');
    return isNaN(parsed) ? 0 : parsed;
};

// Enhanced financial calculations matching Financials.js
export const calculateEnhancedFinancialResults = (values: {
    units: number
    increamentalUnits: number
    baseUnits: number
    promoPrice: number
    basePrice: number
    listPrice: number
    spoils?: number
    cogs?: number
    edlpPerUnitRate: number
    promoPerUnitRate: number
    fixedFee: number
    vcm?: number
}): { name: string; value: string }[] => {
    const {
        units, // total promo units (base + incremental)
        increamentalUnits,
        baseUnits,
        promoPrice,
        basePrice,
        listPrice,
        spoils = 0,
        cogs = 0,
        edlpPerUnitRate,
        promoPerUnitRate,
        fixedFee,
        vcm = 0
    } = values;

    // Basic calculations
    const grossRevenue = units * safeParseFloat(listPrice);
    const retailGrossRevenue = units * promoPrice;
    const spoilsTotal = units * safeParseFloat(spoils);

    const netPrice = safeParseFloat(listPrice) - safeParseFloat(spoils) - safeParseFloat(edlpPerUnitRate) - safeParseFloat(promoPerUnitRate);
    const netRevenue = netPrice * units;
    const cogsTotal = safeParseFloat(cogs) * units;

    const grossMargin = netRevenue - cogsTotal;
    const grossMarginPercentage = netRevenue > 0 ? (grossMargin / netRevenue * 100) : 0;

    // Calculate base values for comparison (unpromoted)
    const baseNetRevenue = (safeParseFloat(listPrice) - safeParseFloat(spoils)) * baseUnits;
    const baseCogsTotal = safeParseFloat(cogs) * baseUnits;
    const baseGrossMargin = baseNetRevenue - baseCogsTotal;
    const baseGrossMarginPercentage = baseNetRevenue > 0 ? (baseGrossMargin / baseNetRevenue * 100) : 0;

    const variableSpend = (safeParseFloat(edlpPerUnitRate) + safeParseFloat(promoPerUnitRate)) * units;
    const totalSpend = safeParseFloat(fixedFee) + variableSpend;
    const increamentalRevenue = increamentalUnits * safeParseFloat(listPrice);
    const retailIncrementalRevenue = increamentalUnits * promoPrice;
    const percentageROI = totalSpend > 0 ? ((grossMargin - baseGrossMargin) / totalSpend * 100) : 0;

    const retailerEverydayMargin = basePrice > 0 ? ((basePrice - safeParseFloat(listPrice)) / basePrice) * 100 : 0;
    const netCost = safeParseFloat(listPrice) - safeParseFloat(edlpPerUnitRate) - safeParseFloat(promoPerUnitRate) - (safeParseFloat(fixedFee) / units);
    const retailerPromoMargin = promoPrice > 0 ? ((promoPrice - netCost) / promoPrice) * 100 : 0;
    const retailerProfit = units * promoPrice - netCost * units;

    // Calculate additional retail financial metrics to preserve existing functionality
    const mfrCOGS = safeParseFloat(listPrice) - safeParseFloat(edlpPerUnitRate) - safeParseFloat(promoPerUnitRate) - safeParseFloat(fixedFee) / units;
    const baseSharedProfit = (basePrice - mfrCOGS) * units;
    const promoSharedProfit = (promoPrice - mfrCOGS) * units;
    const sharedProfitCreated = promoSharedProfit - baseSharedProfit;

    const shelfPriceInvestment = (basePrice - promoPrice) * units;
    const mfrTradeInvestment = safeParseFloat(fixedFee) + (safeParseFloat(edlpPerUnitRate) + safeParseFloat(promoPerUnitRate)) * units;
    const percentageFundedByRetailer = shelfPriceInvestment > 0 ? ((shelfPriceInvestment - mfrTradeInvestment) / shelfPriceInvestment) * 100 : 0;

    return [
        {
            name: "Mfr Gross Revenue",
            value: formatMoney(grossRevenue, '$'),
        },
        {
            name: "Incremental Revenue",
            value: formatMoney(increamentalRevenue, '$'),
        },
        {
            name: "Spoils",
            value: formatMoney(spoilsTotal, '$'),
        },
        {
            name: "Trade Spend",
            value: formatMoney(totalSpend, '$'),
        },
        {
            name: "Mfr Net Revenue",
            value: formatMoney(netRevenue, '$'),
        },
        {
            name: "COGS",
            value: formatMoney(cogsTotal, '$'),
        },
        {
            name: "Mfr Gross Margin (Unpromoted)",
            value: formatMoney(baseGrossMargin, '$'),
        },
        {
            name: "Mfr Gross Margin % (Unpromoted)",
            value: formatValue(baseGrossMarginPercentage, '%'),
        },
        {
            name: "Mfr Gross Margin",
            value: formatMoney(grossMargin, '$'),
        },
        {
            name: "Mfr Gross Margin %",
            value: formatValue(grossMarginPercentage, '%'),
        },
        {
            name: "Sales ROI",
            value: formatValue(percentageROI, '%'),
        },
        {
            name: "Retail Gross Revenue",
            value: formatMoney(retailGrossRevenue, '$'),
        },
        {
            name: "Retail Incremental Revenue",
            value: formatMoney(retailIncrementalRevenue, '$'),
        },
        {
            name: "Retail Promo Margin %",
            value: formatValue(retailerPromoMargin, '%'),
        },
        {
            name: "Retail Everyday Margin %",
            value: formatValue(retailerEverydayMargin, '%'),
        },
        {
            name: "Retail Profit",
            value: formatMoney(retailerProfit, '$'),
        },
        {
            name: "Shared Profit Created",
            value: formatMoney(sharedProfitCreated, '$'),
        },
        {
            name: "% Funded by Retailer",
            value: formatValue(percentageFundedByRetailer, '%'),
        },
    ]
}

export const calculateFinancialResults = (values: {
    units: number
    promoPrice: number
    basePrice: number
    edlpPerUnitRate: number
    promoPerUnitRate: number
    fixedFee: number
    listPrice: number
    vcm: number
    increamentalUnits: number
    promoPriceElasticity?: number
}): { name: string; value: string }[] => {
    const {
        units, // promo units
        promoPrice,
        basePrice,
        edlpPerUnitRate,
        promoPerUnitRate,
        fixedFee,
        listPrice,
        vcm,
        increamentalUnits, // promo units
    } = values
    // console.log({ units, promoPrice, basePrice, edlpPerUnitRate, promoPerUnitRate, fixedFee, listPrice, vcm, increamentalUnits });

    const grossRevenue = units * promoPrice
    const variableSpend = (edlpPerUnitRate + promoPerUnitRate) * units
    const totalSpend = fixedFee ? fixedFee + variableSpend : variableSpend

    const increamentalRevenue = increamentalUnits * promoPrice
    const variableContributionMargin = vcm
    const increamentalProfit = increamentalUnits * variableContributionMargin - totalSpend
    const percentageROI = (increamentalProfit / totalSpend) * 100

    const netCost = listPrice - edlpPerUnitRate - promoPerUnitRate - fixedFee / units

    const retailerEverydayMargin = ((basePrice - listPrice) / basePrice) * 100
    const retailerPromoMargin = ((promoPrice - netCost) / promoPrice) * 100
    const retailerProfit = units * promoPrice - netCost * units

    const mfrCOGS = listPrice - edlpPerUnitRate - promoPerUnitRate - fixedFee / units
    const baseSharedProfit = (basePrice - mfrCOGS) * units
    const promoSharedProfit = (promoPrice - mfrCOGS) * units
    const sharedProfitCreated = promoSharedProfit - baseSharedProfit

    const shelfPriceInvestment = (basePrice - promoPrice) * units
    const mfrTradeInvestment = fixedFee + (edlpPerUnitRate + promoPerUnitRate) * units
    const percentageFundedByRetailer = ((shelfPriceInvestment - mfrTradeInvestment) / shelfPriceInvestment) * 100

    return [
        {
            name: "Gross Revenue",
            value: formatMoney(grossRevenue, '$'),
        },
        {
            name: "Total Spend",
            value: formatMoney(totalSpend, '$'),
        },
        {
            name: "Incremental Revenue",
            value: formatMoney(increamentalRevenue, '$'),
        },
        {
            name: "Incremental Profit",
            value: formatMoney(increamentalProfit, '$'),
        },
        {
            name: "Sales ROI",
            value: formatValue(percentageROI, '%'),
        },
        {
            name: "Retail Promo Margin %",
            value: formatValue(retailerPromoMargin, '%'),
        },
        {
            name: "Retail Everyday Margin %",
            value: formatValue(retailerEverydayMargin, '%'),
        },
        {
            name: "Retail Profit",
            value: formatMoney(retailerProfit, '$'),
        },
        {
            name: "Shared Profit Created",
            value: formatMoney(sharedProfitCreated, '$'),
        },
        {
            name: "% Funded by Retailer",
            value: formatValue(percentageFundedByRetailer, '%'),
        },
    ]
}

interface PromotionalResult {
    promotion: string
    acv: number
    lift: number
    units: number
    dollars: number
}

export const calculatePromotionalResults = (values: {
    basePrice: number
    promoPrice: number
    tprDist: number
    foDist: number
    doDist: number
    fdDist: number
    totalUnits: number
    promoPriceElasticity: number
    featureEffect?: number
    displayEffect?: number
    featureAndDisplayEffect?: number
}): PromotionalResult[] => {
    const {
        basePrice,
        promoPrice,
        tprDist,
        foDist,
        doDist,
        fdDist,
        totalUnits,
        promoPriceElasticity,
        featureEffect = 0,
        displayEffect = 0,
        featureAndDisplayEffect = 0
    } = values

    // Calculate discount percentage
    const discount = ((basePrice - promoPrice) * 100) / basePrice

    // TPR Lift calculation
    const tprLift = (tprDist === 0 || !tprDist) ? 0 :
        ((1 + -discount / 100) ** promoPriceElasticity - 1) * tprDist

    // Base TPR effect for subtraction
    const baseTprEffect = ((1 + -discount / 100) ** promoPriceElasticity - 1) * tprDist

    // Feature Only Lift
    const foLift = (foDist === 0 || !foDist || featureEffect === 0) ? 0 :
        ((1 + -discount / 100) **
            (promoPriceElasticity * Math.exp((featureEffect * foDist) / 100)) - 1) * 100 -
        baseTprEffect

    // Display Only Lift
    const doLift = (doDist === 0 || !doDist || displayEffect === 0) ? 0 :
        ((1 + -discount / 100) **
            (promoPriceElasticity * Math.exp((displayEffect * doDist) / 100)) - 1) * 100 -
        baseTprEffect

    // Feature and Display Lift
    const fdLift = (fdDist === 0 || !fdDist || featureAndDisplayEffect === 0) ? 0 :
        ((1 + -discount / 100) **
            (promoPriceElasticity * Math.exp((featureAndDisplayEffect * fdDist) / 100)) - 1) * 100 -
        baseTprEffect

    // Calculate units
    const tprUnits = (tprLift / 100) * totalUnits
    const foUnits = (foLift / 100) * totalUnits
    const doUnits = (doLift / 100) * totalUnits
    const fdUnits = (fdLift / 100) * totalUnits

    // Calculate dollars
    const tprDollars = tprUnits * promoPrice
    const foDollars = foUnits * promoPrice
    const doDollars = doUnits * promoPrice
    const fdDollars = fdUnits * promoPrice

    // Calculate totals
    const totalLift = tprLift + foLift + doLift + fdLift
    const totalUnitsIncremental = (tprUnits ?? 0) + (foUnits ?? 0) + (doUnits ?? 0) + (fdUnits ?? 0)
    const totalDollarsIncremental = (tprDollars ?? 0) + (foDollars ?? 0) + (doDollars ?? 0) + (fdDollars ?? 0)
    const totalUnitsEvent = (totalUnitsIncremental ?? 0) + (totalUnits ?? 0)
    const totalDollarsEvent = (totalDollarsIncremental ?? 0) + ((totalUnits ?? 0) * (promoPrice ?? 0))

    console.log({ totalUnitsEvent, totalUnitsIncremental, totalUnits, tprUnits, foUnits, doUnits, fdUnits });

    return [
        {
            promotion: 'TPR',
            acv: tprDist,
            lift: tprLift,
            units: tprUnits,
            dollars: tprDollars
        },
        {
            promotion: 'Feature Only',
            acv: foDist,
            lift: foLift,
            units: foUnits,
            dollars: foDollars
        },
        {
            promotion: 'Display Only',
            acv: doDist,
            lift: doLift,
            units: doUnits,
            dollars: doDollars
        },
        {
            promotion: 'Feature and Display',
            acv: fdDist,
            lift: fdLift,
            units: fdUnits,
            dollars: fdDollars
        },
        {
            promotion: 'Event Incremental',
            acv: 0,
            lift: totalLift,
            units: totalUnitsIncremental,
            dollars: totalDollarsIncremental
        },
        {
            promotion: 'Event Total',
            acv: 0,
            lift: totalLift + 100,
            units: totalUnitsEvent,
            dollars: totalDollarsEvent
        }
    ]
}

const formatMoney = (value: number, symbol: string): string => {
    if (isNaN(value)) return "-";

    if (value < 0) return `-${symbol}${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    return `${symbol}${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

const formatValue = (value: number, symbol: string): string => {
    if (!isNaN(value) && value !== 0) {
        return `${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${symbol}`;
    }
    return "-";
}

// Special formatter for currency values that need 2 decimal places (like Net Price, VCM)
const formatCurrencyWithDecimals = (value: number, symbol: string): string => {
    if (value <= 0 && value !== 0) return "-";
    return `${symbol}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Special formatter for units that need comma separation but no decimals
const formatUnits = (value: number): string => {
    if (value <= 0 && value !== 0) return "-";
    return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export const getResult = (financialData: any) => {
    console.log({ financialData });
    const promotionalResults = calculatePromotionalResults({
        basePrice: Number(financialData.basePrice),
        promoPrice: Number(financialData.promoPrice),
        tprDist: Number(financialData.tprDist),
        foDist: Number(financialData.foDist),
        doDist: Number(financialData.doDist),
        fdDist: Number(financialData.fdDist),
        totalUnits: Number(financialData.units),
        promoPriceElasticity: Number(financialData.promoPriceElasticity),
        featureEffect: Number(financialData.featureEffect),
        displayEffect: Number(financialData.displayEffect),
        featureAndDisplayEffect: Number(financialData.featureAndDisplayEffect),
    })

    let totalUnits = Number(promotionalResults.find(result => result.promotion === 'Event Total')?.units);
    let incrementalUnits = Number(promotionalResults.find(result => result.promotion === 'Event Incremental')?.units);

    // Use enhanced financial calculations if new fields are available
    // const hasNewFields = financialData.spoils !== undefined || financialData.cogs !== undefined;
    let financialResults = calculateEnhancedFinancialResults({
        units: Number(totalUnits),
        increamentalUnits: Number(incrementalUnits),
        baseUnits: Number(financialData.units),
        promoPrice: Number(financialData.promoPrice),
        basePrice: Number(financialData.basePrice),
        listPrice: Number(financialData.listPrice),
        spoils: Number(financialData.spoils || 0),
        cogs: Number(financialData.cogs || 0),
        edlpPerUnitRate: Number(financialData.edlpPerUnitRate),
        promoPerUnitRate: Number(financialData.promoPerUnitRate),
        fixedFee: Number(financialData.fixedFee),
        vcm: Number(financialData.vcm),
    });

    console.log({ financialResults, totalUnits, promotionalResults });


    financialResults = financialResults.map(result => result.name === 'Incremental Revenue' ? { ...result, value: formatMoney(promotionalResults.find(result => result.promotion === 'Event Incremental')?.dollars || 0, '$') } : result);

    return {
        promotionalResults,
        financialResults
    }
}