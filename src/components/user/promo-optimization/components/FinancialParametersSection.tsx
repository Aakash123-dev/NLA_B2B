'use client';

import React from 'react';
import {
  DollarSign,
  Sparkles,
  Download,
  TrendingUp,
  BarChart3,
  LineChart,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface FinancialParametersSectionProps {
  promotedPrice?: number;
  units?: number;
  increamentalUnits?: number;
  basePrice?: number;
  isPriceSimulationLoading?: boolean;
  handlePromoEventPriceInputChange?: (event: any) => void;
  promoEventPriceValues?: any;
  formData?: any;
  onInputChange?: (field: string, value: any) => void;
}

interface FinancialPriceValues {
  listPrice: string;
  spoils: string;
  cogs: string;
  edlpPerUnitRate: string;
  promoPerUnitRate: string;
  fixedFee: string;
  vcm: string;
}

interface EventResult {
  name: string;
  value: string;
  colorStatus: 'Green' | 'Red';
}

export function FinancialParametersSection({
  promotedPrice = 0,
  units = 0,
  increamentalUnits = 0,
  basePrice = 0,
  isPriceSimulationLoading = false,
  handlePromoEventPriceInputChange = () => {},
  promoEventPriceValues = {},
  onInputChange = () => {}
}: FinancialParametersSectionProps) {
  console.log("FinancialParametersSection Debug:", {
    promotedPrice,
    units,
    increamentalUnits,
    basePrice,
    promoEventPriceValues
  })
  
  const [eventResults, setEventResults] = React.useState<EventResult[]>([])
  const [chartType, setChartType] = React.useState("rangeArea")
  const [isStacked, setIsStacked] = React.useState(false)

  // Initialize financialPriceValues from promoEventPriceValues
  const [financialPriceValues, setFinancialPriceValues] = React.useState<FinancialPriceValues>({
    listPrice: promoEventPriceValues.listPrice ?? "",
    spoils: promoEventPriceValues.spoils ?? "0",
    cogs: promoEventPriceValues.cogs ?? "0",
    edlpPerUnitRate: promoEventPriceValues.edlpPerUnitRate ?? "0",
    promoPerUnitRate: promoEventPriceValues.promoPerUnitRate ?? "0",
    fixedFee: promoEventPriceValues.fixedFee ?? "",
    vcm: promoEventPriceValues.vcm ?? "",
  })

  const [netPrice, setNetPrice] = React.useState(0)

  // Sync with parent's promoEventPriceValues when it changes
  React.useEffect(() => {
    setFinancialPriceValues({
      listPrice: promoEventPriceValues.listPrice ?? "",
      spoils: promoEventPriceValues.spoils ?? "0",
      cogs: promoEventPriceValues.cogs ?? "0",
      edlpPerUnitRate: promoEventPriceValues.edlpPerUnitRate ?? "0",
      promoPerUnitRate: promoEventPriceValues.promoPerUnitRate ?? "0",
      fixedFee: promoEventPriceValues.fixedFee ?? "",
      vcm: promoEventPriceValues.vcm ?? "",
    })
  }, [promoEventPriceValues])

  const handleFinancialPriceInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    
    // Remove commas for internal state
    const rawValue = value?.replace(/,/g, '')

    // Optional: Check if it's a valid number before updating state
    if (!isNaN(Number(rawValue)) || rawValue === '') {
      // Format with commas. Do not add commas after decimal point
      let formattedValue = rawValue
      if (rawValue && rawValue.includes('.')) {
        // Split by decimal, format only the integer part
        const [integerPart, decimalPart] = rawValue.split('.')
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        formattedValue = `${formattedInteger}.${decimalPart}`
      } else if (rawValue) {
        // No decimal point, format normally
        formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }

      // Update local state
      setFinancialPriceValues((prevInputValues) => ({
        ...prevInputValues,
        [name]: formattedValue,
      }))

      // Call parent handler to update promoEventPriceValues
      handlePromoEventPriceInputChange({
        target: {
          name: name,
          value: formattedValue
        }
      })

      // Also update formData if onInputChange is provided
      if (onInputChange) {
        onInputChange(name, parseFloat(rawValue) || 0)
      }
    }
  }

  // Helper function to safely parse numeric values, treating empty/null as 0
  const safeParseFloat = (value: any) => {
    if (!value || value === "" || value === null) return 0
    const parsed = parseFloat(value.toString()?.replace(/,/g, ''))
    return isNaN(parsed) ? 0 : parsed
  }

  React.useEffect(() => {
    // Auto-calculate VCM when listPrice or cogs changes
    const listPriceValue = parseFloat(financialPriceValues.listPrice?.replace(/,/g, '')) || 0
    const cogsValue = parseFloat(financialPriceValues.cogs?.replace(/,/g, '')) || 0
    const calculatedVCM = listPriceValue - cogsValue

    if (calculatedVCM !== parseFloat(financialPriceValues.vcm?.replace(/,/g, '') || '0')) {
      const formattedVCM = calculatedVCM > 0 ? calculatedVCM.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ""
      
      setFinancialPriceValues(prev => ({
        ...prev,
        vcm: formattedVCM
      }))

      // Update parent state
      handlePromoEventPriceInputChange({
        target: {
          name: "vcm",
          value: formattedVCM
        }
      })

      // Update formData if onInputChange is provided
      if (onInputChange) {
        onInputChange('vcm', calculatedVCM)
      }
    }
  }, [financialPriceValues.listPrice, financialPriceValues.cogs])

  React.useEffect(() => {
    setNetPrice(safeParseFloat(financialPriceValues.listPrice) - safeParseFloat(financialPriceValues.spoils) - safeParseFloat(financialPriceValues.edlpPerUnitRate) - safeParseFloat(financialPriceValues.promoPerUnitRate))
  }, [financialPriceValues.listPrice, financialPriceValues.spoils, financialPriceValues.edlpPerUnitRate, financialPriceValues.promoPerUnitRate])

  function calculateFinancialsWithBaseUnits(units: number) {
    let grossRevenue = units * safeParseFloat(financialPriceValues.listPrice)
    let retailGrossRevenue = units * promotedPrice

    let spoils = units * safeParseFloat(financialPriceValues.spoils)

    let netPrice = safeParseFloat(financialPriceValues.listPrice) - safeParseFloat(financialPriceValues.spoils)
    let netRevenue = netPrice * units
    let cogs = safeParseFloat(financialPriceValues.cogs) * units

    let grossMargin = (netRevenue - cogs)
    let grossMarginPercentage = (netRevenue - cogs) / netRevenue * 100

    return { grossMargin, grossMarginPercentage }
  }

  React.useEffect(() => {
    // Convert string values to numbers properly
    const totalUnits = Number(promoEventPriceValues?.total_units_sum || 0) + Number(increamentalUnits || 0)
    const baseUnits = Number(promoEventPriceValues?.total_units_sum || 0)
    const promotedPriceNum = Number(promotedPrice || 0)
    const basePriceNum = Number(basePrice || 0)
    
    // Ensure increamentalUnits is properly calculated
    // If increamentalUnits is 0 or undefined, try to calculate it from promoEventPriceValues
    let calculatedIncreamentalUnits = Number(increamentalUnits || 0)
    
    // Fallback: If increamentalUnits is 0, try to calculate from promoEventPriceValues
    if (calculatedIncreamentalUnits === 0 && promoEventPriceValues) {
      // Try to calculate from the difference between total units and base units
      const totalUnitsFromPromo = Number(promoEventPriceValues?.total_units_sum || 0)
      const baseUnitsFromPromo = Number(promoEventPriceValues?.originalTotalUnits || 0)
      if (totalUnitsFromPromo > baseUnitsFromPromo) {
        calculatedIncreamentalUnits = totalUnitsFromPromo - baseUnitsFromPromo
      }
    }
    
    console.log("Calculation Debug:", {
      totalUnits,
      baseUnits,
      increamentalUnits: calculatedIncreamentalUnits,
      promotedPrice: promotedPriceNum,
      basePrice: basePriceNum,
      financialPriceValues,
      promoEventPriceValues
    })

    let grossRevenue = totalUnits * safeParseFloat(financialPriceValues.listPrice)
    let retailGrossRevenue = totalUnits * promotedPriceNum

    let spoils = totalUnits * safeParseFloat(financialPriceValues.spoils)

    let netPrice = safeParseFloat(financialPriceValues.listPrice) - safeParseFloat(financialPriceValues.spoils) - safeParseFloat(financialPriceValues.edlpPerUnitRate) - safeParseFloat(financialPriceValues.promoPerUnitRate)
    let netRevenue = netPrice * totalUnits
    let cogs = safeParseFloat(financialPriceValues.cogs) * totalUnits

    let grossMargin = (netRevenue - cogs)
    let grossMarginPercentage = (netRevenue - cogs) / netRevenue * 100

    let variableSpend =
      (safeParseFloat(financialPriceValues.edlpPerUnitRate) + safeParseFloat(financialPriceValues.promoPerUnitRate)) * totalUnits
    let totalSpend = financialPriceValues.fixedFee
      ? safeParseFloat(financialPriceValues.fixedFee) + variableSpend
      : variableSpend
    let increamentalRevenue = calculatedIncreamentalUnits * safeParseFloat(financialPriceValues.listPrice)
    let retailIncrementalRevenue = calculatedIncreamentalUnits * promotedPriceNum
    let variableContributionMargin = safeParseFloat(financialPriceValues?.vcm)
    let increamentalProfit = calculatedIncreamentalUnits * variableContributionMargin - totalSpend
    let retailerEverydayMargin = ((basePriceNum - safeParseFloat(financialPriceValues?.listPrice)) / basePriceNum) * 100
    let netCost =
      safeParseFloat(financialPriceValues.listPrice) -
      safeParseFloat(financialPriceValues.edlpPerUnitRate) -
      safeParseFloat(financialPriceValues.promoPerUnitRate) -
      safeParseFloat(financialPriceValues.fixedFee) / Number(totalUnits)

    let retailerPromoMargin = ((promotedPriceNum - netCost) / promotedPriceNum) * 100
    let retailerProfit = totalUnits * promotedPriceNum - netCost * totalUnits

    let { grossMargin: baseGrossMargin, grossMarginPercentage: baseGrossMarginPercentage } = calculateFinancialsWithBaseUnits(baseUnits)

    let percentageROI = (grossMargin - baseGrossMargin) / totalSpend * 100

    console.log("Retail Calculations Debug:", {
      netCost,
      retailerPromoMargin,
      retailerProfit,
      retailerEverydayMargin,
      promotedPrice: promotedPriceNum,
      basePrice: basePriceNum,
      increamentalUnits: calculatedIncreamentalUnits,
      retailIncrementalRevenue,
      increamentalRevenue
    })

    setEventResults([
      {
        name: "Mfr Gross Revenue",
        value: !isNaN(grossRevenue) && parseFloat(grossRevenue.toString()) !== 0 ? "$" + grossRevenue.toFixed(0) : "-",
        colorStatus: Math.sign(grossRevenue) === 1 ? 'Green' : 'Red'
      },
      {
        name: "Incremental Revenue",
        value: !isNaN(increamentalRevenue) && parseFloat(increamentalRevenue.toString()) !== 0 ? "$" + increamentalRevenue.toFixed(0) : "-",
        colorStatus: Math.sign(increamentalRevenue) === 1 ? 'Green' : 'Red'
      },
      {
        name: "Spoils",
        value: !isNaN(spoils) && parseFloat(spoils.toString()) !== 0 ? "$" + spoils.toFixed(0) : "-",
        colorStatus: Math.sign(spoils) === 1 ? 'Green' : 'Red'
      },
      {
        name: "Trade Spend",
        value: !isNaN(totalSpend) ? "$" + totalSpend.toFixed(0) : "-",
        colorStatus: Math.sign(totalSpend) === 1 ? 'Green' : 'Red'
      },
      {
        name: "Mfr Net Revenue",
        value: !isNaN(netRevenue) ? "$" + netRevenue.toFixed(0) : "-",
        colorStatus: Math.sign(netRevenue) === 1 ? 'Green' : 'Red'
      },
      {
        name: "COGS",
        value: !isNaN(cogs) ? "$" + cogs.toFixed(0) : "-",
        colorStatus: Math.sign(cogs) === 1 ? 'Green' : 'Red'
      },
      {
        name: "Mfr Gross Margin (Unpromoted)",
        value: !isNaN(baseGrossMargin) ? "$" + baseGrossMargin.toFixed(0) : "-",
        colorStatus: Math.sign(baseGrossMargin) === 1 ? 'Green' : 'Red'
      },
      {
        name: "Mfr Gross Margin % (Unpromoted)",
        value: !isNaN(baseGrossMarginPercentage) ? baseGrossMarginPercentage.toFixed(2) + "%" : "-",
        colorStatus: Math.sign(baseGrossMarginPercentage) === 1 ? 'Green' : 'Red'
      },
      {
        name: "Mfr Gross Margin",
        value: !isNaN(grossMargin) ? "$" + grossMargin.toFixed(0) : "-",
        colorStatus: Math.sign(grossMargin) === 1 ? 'Green' : 'Red'
      },
      {
        name: "Mfr Gross Margin %",
        value: !isNaN(grossMarginPercentage) ? grossMarginPercentage.toFixed(2) + "%" : "-",
        colorStatus: Math.sign(grossMarginPercentage) === 1 ? 'Green' : 'Red'
      },
      {
        name: "Sales ROI",
        value: !isNaN(percentageROI) ? percentageROI.toFixed(2) + "%" : "-",
        colorStatus: Math.sign(percentageROI) === 1 ? 'Green' : 'Red'
      },
      {
        name: "Retail Gross Revenue",
        value: !isNaN(retailGrossRevenue) && parseFloat(retailGrossRevenue.toString()) !== 0 ? "$" + retailGrossRevenue.toFixed(0) : "-",
        colorStatus: Math.sign(retailGrossRevenue) === 1 ? 'Green' : 'Red'
      },
      {
        name: "Retail Incremental Revenue",
        value: !isNaN(retailIncrementalRevenue) && parseFloat(retailIncrementalRevenue.toString()) !== 0 ? "$" + retailIncrementalRevenue.toFixed(0) : "-",
        colorStatus: Math.sign(retailIncrementalRevenue) === 1 ? 'Green' : 'Red'
      },
      {
        name: "Retail Promo Margin %",
        value: !isNaN(retailerPromoMargin) ? retailerPromoMargin.toFixed(2) + "%" : "-",
        colorStatus: Math.sign(retailerPromoMargin) === 1 ? 'Green' : 'Red'
      },
      {
        name: "Retail Everyday Margin %",
        value: !isNaN(retailerEverydayMargin) && promotedPriceNum ? retailerEverydayMargin.toFixed(2) + "%" : "-",
        colorStatus: Math.sign(retailerEverydayMargin) === 1 ? 'Green' : 'Red'
      },
      {
        name: "Retail Profit",
        value: !isNaN(retailerProfit) && parseFloat(retailerProfit.toString()) !== 0 ? "$" + retailerProfit.toFixed(0) : "-",
        colorStatus: Math.sign(totalSpend) === 1 ? 'Green' : 'Red'
      },
    ])

  }, [financialPriceValues, units, promotedPrice, basePrice, increamentalUnits, promoEventPriceValues])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Financial Analysis</h2>
          <p className="text-sm text-slate-600 mt-1">Comprehensive financial modeling and analysis</p>
        </div>
      </div>

      {isPriceSimulationLoading ? (
        <Card className="border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-slate-600">Please wait, while we are fetching the data for you...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="animate__animated animate__fadeInUp">
          {/* Flex Layout Container */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Event Results Section */}
            <div className="flex-1">
              <Card className="border border-slate-200 shadow-sm h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    Event Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-sm font-medium text-slate-700">Metric</TableHead>
                        <TableHead className="text-sm font-medium text-slate-700 text-right">Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {eventResults.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-sm font-medium text-slate-700">{result.name}</TableCell>
                          <TableCell 
                            className={`text-sm font-semibold text-right ${
                              result.colorStatus === 'Green' ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {result.value}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Financial Parameters Section */}
            <div className="flex-1">
              <Card className="border border-slate-200 shadow-sm h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                    </div>
                    Financial Parameters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Pricing Structure Section */}
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide text-slate-500 border-b border-slate-200 pb-1">
                      Pricing Structure
                    </div>
                    
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between py-1">
                        <Label className="text-xs font-medium text-slate-700 min-w-0 flex-1">
                          List Price
                        </Label>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-xs font-medium text-slate-600">$</span>
                          <Input
                            type="text"
                            name="listPrice"
                            value={financialPriceValues.listPrice}
                            onChange={handleFinancialPriceInputChange}
                            placeholder="0.00"
                            className="bg-white border-slate-300 hover:border-slate-400 focus:border-emerald-500 transition-colors h-8 w-20 text-right text-xs"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-1">
                        <Label className="text-xs font-medium text-slate-700 min-w-0 flex-1">
                          COGS Per Unit
                        </Label>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-xs font-medium text-slate-600">$</span>
                          <Input
                            type="text"
                            name="cogs"
                            value={financialPriceValues.cogs}
                            onChange={handleFinancialPriceInputChange}
                            placeholder="0.00"
                            className="bg-white border-slate-300 hover:border-slate-400 focus:border-emerald-500 transition-colors h-8 w-20 text-right text-xs"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-1">
                        <div className="min-w-0 flex-1">
                          <Label className="text-xs font-medium text-slate-700">VCM</Label>
                          <div className="text-xs text-slate-500">Variable Contribution Margin</div>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-xs font-medium text-slate-600">$</span>
                          <Input
                            type="text"
                            name="vcm"
                            value={financialPriceValues.vcm}
                            onChange={handleFinancialPriceInputChange}
                            placeholder="Auto-calculated"
                            className="bg-gray-100 border-slate-300 hover:border-slate-400 focus:border-emerald-500 transition-colors h-8 w-20 text-right text-xs"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Trade Terms Section */}
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide text-slate-500 border-b border-slate-200 pb-1">
                      Trade Terms
                    </div>
                    
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between py-1">
                        <Label className="text-xs font-medium text-slate-700 min-w-0 flex-1">
                          Spoil Per Unit
                        </Label>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-xs font-medium text-slate-600">$</span>
                          <Input
                            type="text"
                            name="spoils"
                            value={financialPriceValues.spoils}
                            onChange={handleFinancialPriceInputChange}
                            placeholder="0.00"
                            className="bg-white border-slate-300 hover:border-slate-400 focus:border-emerald-500 transition-colors h-8 w-20 text-right text-xs"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-1">
                        <div className="min-w-0 flex-1">
                          <Label className="text-xs font-medium text-slate-700">EDLP Per Unit</Label>
                          <div className="text-xs text-slate-500">Everyday Low Price</div>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-xs font-medium text-slate-600">$</span>
                          <Input
                            type="text"
                            name="edlpPerUnitRate"
                            value={financialPriceValues.edlpPerUnitRate}
                            onChange={handleFinancialPriceInputChange}
                            placeholder="0.00"
                            className="bg-white border-slate-300 hover:border-slate-400 focus:border-emerald-500 transition-colors h-8 w-20 text-right text-xs"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-1">
                        <Label className="text-xs font-medium text-slate-700 min-w-0 flex-1">
                          Promo Per Unit
                        </Label>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-xs font-medium text-slate-600">$</span>
                          <Input
                            type="text"
                            name="promoPerUnitRate"
                            value={financialPriceValues.promoPerUnitRate}
                            onChange={handleFinancialPriceInputChange}
                            placeholder="0.00"
                            className="bg-white border-slate-300 hover:border-slate-400 focus:border-emerald-500 transition-colors h-8 w-20 text-right text-xs"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-1">
                        <Label className="text-xs font-medium text-slate-700 min-w-0 flex-1">
                          Net Price
                        </Label>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-xs font-medium text-slate-600">$</span>
                          <Input
                            type="text"
                            value={netPrice.toFixed(2)}
                            placeholder="0.00"
                            className="bg-gray-100 border-slate-300 hover:border-slate-400 focus:border-emerald-500 transition-colors h-8 w-20 text-right text-xs"
                            disabled
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-1">
                        <Label className="text-xs font-medium text-slate-700 min-w-0 flex-1">
                          Fixed Fees
                        </Label>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-xs font-medium text-slate-600">$</span>
                          <Input
                            type="text"
                            name="fixedFee"
                            value={financialPriceValues.fixedFee}
                            onChange={handleFinancialPriceInputChange}
                            placeholder="0.00"
                            className="bg-white border-slate-300 hover:border-slate-400 focus:border-emerald-500 transition-colors h-8 w-20 text-right text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-slate-200">
                    <div className="space-y-2">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-9 text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Generate Report
                      </Button>
                      <Button variant="outline" className="w-full border-slate-300 text-slate-600 hover:bg-slate-50 h-9 text-xs">
                        <Download className="w-3 h-3 mr-1" />
                        Export Data
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
