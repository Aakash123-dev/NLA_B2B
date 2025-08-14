export interface FinancialData {
    basePrice: number
    basePriceElasticity: number
    originalBasePrice: number
    originalTotalUnits: number

    promoPrice: number
    discount: number
    units: number
    totalUnits?: number
    tprDist: number
    doDist: number
    foDist: number
    fdDist: number
    listPrice: number
    spoils: number
    cogs: number
    edlpPerUnitRate: number
    promoPerUnitRate: number
    vcm: number
    fixedFee: number
    increamentalUnits: number,
    promoPriceElasticity: number,
    featureEffect: number,
    displayEffect: number,
    featureAndDisplayEffect: number,

    sharedProfitCreated?: number,
    percentageFundedByRetailer?: number,
}

export interface FinancialResults {
    name: string
    value: string
}