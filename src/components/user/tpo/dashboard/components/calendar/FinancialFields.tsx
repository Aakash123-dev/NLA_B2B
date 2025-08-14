import React, { useEffect, useState } from 'react'
import { InputNumber, Form } from 'antd'
import { FinancialData } from '../../../types/financial'

interface FinancialFieldsProps {
    productId: string
    financialData: FinancialData
    onChange: (data: FinancialData) => void
    basePrice: number
    totalUnits: number
    readonly?: boolean
    onFocus?: () => void
}

const PROMOTIONAL_FIELDS = [
    {
        name: 'basePrice',
        label: 'Base Price',
        prefix: "$",
        formatter: (value: any) => {
            return Number(value).toFixed(2)
        },
    },
    {
        name: 'promoPrice',
        label: 'Promo Price',
        prefix: "$"
    },
    {
        name: 'discount',
        label: 'Discount %',
        readonly: true, formatter: (value: any) => {
            return Number(value).toFixed(2)
        },
        prefix: ""
    },
    { name: 'units', label: 'Units' },
    { name: 'tprDist', label: '% TPR ACV' },
    { name: 'doDist', label: '% Display Only ACV' },
    { name: 'foDist', label: '% Feature Only ACV' },
    { name: 'fdDist', label: '% Feature and Display ACV' },
]

const FINANCIAL_FIELDS = [
    {
        name: 'listPrice', label: 'List Price', prefix: "$", formatter: (value: any) => {
            return Number(value).toFixed(2)
        }
    },
    {
        name: 'spoils', label: 'Spoil Per Unit', prefix: "$", formatter: (value: any) => {
            return Number(value).toFixed(2)
        }
    },
    {
        name: 'edlpPerUnitRate', label: 'EDLP Per Unit Rate', prefix: "$", formatter: (value: any) => {
            return Number(value).toFixed(2)
        }
    },
    {
        name: 'promoPerUnitRate', label: 'Promo Per Unit Rate', prefix: "$", formatter: (value: any) => {
            return Number(value).toFixed(2)
        }
    },
    {
        name: 'netPrice', label: 'Net Price', prefix: "$", readonly: true, formatter: (value: any) => {
            return Number(value).toFixed(2)
        }
    },
    {
        name: 'cogs', label: 'COGS Per Unit', prefix: "$", formatter: (value: any) => {
            return Number(value).toFixed(2)
        }
    },
    { name: 'vcm', label: 'VCM', prefix: "$", readonly: true },
    {
        name: 'fixedFee', label: 'Fixed Fees', prefix: "$", formatter: (value: any) => {
            return Number(value).toFixed(2)
        }
    },
]

const FinancialFields: React.FC<FinancialFieldsProps> = ({
    financialData,
    onChange,
    basePrice,
    totalUnits,
    readonly = false,
    onFocus
}) => {
  console.log(financialData, "FinancialData")
    // Helper function to safely parse numeric values, treating empty/null as 0
    const safeParseFloat = (value: number | null | undefined) => {
        if (!value || value === null || value === undefined) return 0;
        const parsed = parseFloat(value.toString());
        return isNaN(parsed) ? 0 : parsed;
    };

    // Calculate netPrice
    const [netPrice, setNetPrice] = useState(0);
    useEffect(() => {
        const calculatedNetPrice = safeParseFloat(financialData.listPrice) -
            safeParseFloat(financialData.spoils) -
            safeParseFloat(financialData.edlpPerUnitRate) -
            safeParseFloat(financialData.promoPerUnitRate);
        setNetPrice(Number(calculatedNetPrice.toFixed(2)));
    }, [financialData.listPrice, financialData.spoils, financialData.edlpPerUnitRate, financialData.promoPerUnitRate]);

    const handleFieldChange = (fieldName: keyof FinancialData, value: number | null) => {
        if (readonly) return // Don't allow changes in readonly mode

        const newData = {
            ...financialData,
            [fieldName]: value || 0,
        }

        // Calculate discount when promo price changes
        if (fieldName === 'promoPrice' && basePrice > 0) {
            const promoPrice = value || 0
            newData.discount = ((basePrice - promoPrice) / basePrice) * 100
        }

        // Auto-calculate VCM when listPrice or cogs changes
        if (fieldName === 'listPrice' || fieldName === 'cogs') {
            const listPriceValue = fieldName === 'listPrice' ? (value || 0) : newData.listPrice;
            const cogsValue = fieldName === 'cogs' ? (value || 0) : newData.cogs;
            newData.vcm = listPriceValue - cogsValue;
        }

        if (fieldName === "basePrice") {
            const originalBasePrice = financialData.originalBasePrice;
            const newBasePrice = Number(financialData.basePrice);
            const difference = (newBasePrice - originalBasePrice) / originalBasePrice;

            // Update the base price of the products
            const newLift = ((1 + (difference)) ** financialData.basePriceElasticity) - 1;

            const newUnits = (newLift + 1) * financialData.originalTotalUnits;

            // Update the total units of the products
            // newData.totalUnits = newUnits;
            newData.units = newUnits;
        }

        onChange(newData)
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                {PROMOTIONAL_FIELDS.map(field => (
                    <Form.Item key={field.name} label={field.label} className="mb-2">
                        <InputNumber
                            value={financialData[field.name as keyof FinancialData]}
                            onChange={(value) => handleFieldChange(field.name as keyof FinancialData, value)}
                            className={`w-full ${readonly ? 'bg-gray-50' : ''}`}
                            readOnly={field.name !== 'units' && (field.readonly || readonly)}
                            precision={field.name === 'units' ? 0 : 2}
                            prefix={field.prefix}
                            max={field.name === 'promoPrice' ? basePrice : undefined}
                            step={0.01}
                            formatter={(value) => {
                                if (field.name === 'units') {
                                    return `${Math.round(Number(value) || 0)}`;
                                }
                                if (field.formatter) {
                                    return field.formatter(value)
                                }
                                return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            }}
                            parser={(value: string | undefined) => parseFloat(value?.replace(/\$\s?|(,*)/g, '') || '0')}
                            onFocus={onFocus}
                        />
                    </Form.Item>
                ))}
            </div>

            <h3 className="text-lg font-semibold mb-4 mt-4 border-t border-gray-200 pt-4">Financial</h3>
            <div className="grid grid-cols-2 gap-4">
                {FINANCIAL_FIELDS.map(field => (
                    <Form.Item key={field.name} label={field.label} className="mb-2">
                        <InputNumber
                            value={field.name === 'netPrice' ? netPrice :
                                field.name === 'vcm' ? financialData.vcm :
                                    financialData[field.name as keyof FinancialData]}
                            onChange={(value) => handleFieldChange(field.name as keyof FinancialData, value)}
                            className={`w-full ${(readonly || field.readonly) ? 'bg-gray-100' : ''}`}
                            readOnly={readonly || field.readonly}
                            precision={2}
                            step={0.01}
                            prefix={field.prefix}
                            formatter={(value) => {
                                if (field.name === 'units') {
                                    return `${Math.round(Number(value) || 0)}`;
                                }
                                if (field.formatter) {
                                    return field.formatter(value)
                                }
                                return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            }}
                            parser={(value: string | undefined) => parseFloat(value?.replace(/\$\s?|(,*)/g, '') || '0')}
                            onFocus={onFocus}
                        />
                    </Form.Item>
                ))}
            </div>
        </div>
    )
}

export default FinancialFields