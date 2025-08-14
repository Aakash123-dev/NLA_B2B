import React from 'react'


import { DollarSign, Package } from 'lucide-react'
import { InfoSection } from '../ui/InfoSection'
import { InfoRow } from '../ui/InfoRow'

import { FinancialData } from '@/types/financial'
import { Product } from '@/types/product'
import { formatCurrency } from '@/utils/formatters'

interface EventFinancialInfoProps {
    product: Product
    financialData: FinancialData
}

export const EventFinancialInfo: React.FC<EventFinancialInfoProps> = ({
    product,
    financialData,
}) => {
    // Helper function to safely parse numeric values
    const safeParseFloat = (value: number | null | undefined) => {
        if (!value || value === null || value === undefined) return 0;
        const parsed = parseFloat(value.toString());
        return isNaN(parsed) ? 0 : parsed;
    };

    // Calculate netPrice
    const netPrice = safeParseFloat(financialData.listPrice) -
        safeParseFloat(financialData.spoils) -
        safeParseFloat(financialData.edlpPerUnitRate) -
        safeParseFloat(financialData.promoPerUnitRate);

    return (
        <InfoSection title="Financial Details">
            <InfoRow
                icon={<DollarSign size={16} />}
                label="Base Price"
                value={formatCurrency(financialData.basePrice)}
            />
            <InfoRow
                icon={<DollarSign size={16} />}
                label="Promo Price"
                value={formatCurrency(financialData.promoPrice)}
            />
            <InfoRow
                icon={<DollarSign size={16} />}
                label="Discount"
                value={`${safeParseFloat(financialData.discount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`}
            />
            <InfoRow
                icon={<Package size={16} />}
                label="Units"
                value={safeParseFloat(financialData.units).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            />
            <InfoRow
                icon={<DollarSign size={16} />}
                label="List Price"
                value={formatCurrency(financialData.listPrice)}
            />
            <InfoRow
                icon={<DollarSign size={16} />}
                label="Spoil Per Unit"
                value={formatCurrency(financialData.spoils || 0)}
            />
            <InfoRow
                icon={<DollarSign size={16} />}
                label="EDLP Per Unit Rate"
                value={formatCurrency(financialData.edlpPerUnitRate)}
            />
            <InfoRow
                icon={<DollarSign size={16} />}
                label="Promo Per Unit Rate"
                value={formatCurrency(financialData.promoPerUnitRate)}
            />
            <InfoRow
                icon={<DollarSign size={16} />}
                label="Net Price"
                value={formatCurrency(netPrice)}
            />
            <InfoRow
                icon={<DollarSign size={16} />}
                label="COGS Per Unit"
                value={formatCurrency(financialData.cogs || 0)}
            />
            <InfoRow
                icon={<DollarSign size={16} />}
                label="VCM"
                value={formatCurrency(financialData.vcm)}
            />
            <InfoRow
                icon={<DollarSign size={16} />}
                label="Fixed Fees"
                value={formatCurrency(financialData.fixedFee)}
            />
        </InfoSection>
    )
}