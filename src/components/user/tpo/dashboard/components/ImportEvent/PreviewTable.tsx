import React from 'react'
import { Table, Tabs } from 'antd'
import { format } from 'date-fns'
import { Event } from '@/types/event'
import { getResult } from '@/utils/financialCalculations'
import { toJsDate } from '@/utils/dateUtils'

const { TabPane } = Tabs

interface PreviewTableProps {
    data: Event[]
    additionalColumns?: any[]
}

export const PreviewTable: React.FC<PreviewTableProps> = ({ data, additionalColumns = [] }) => {
    const safeNum = (value: unknown, fractionDigits?: { min?: number; max?: number }) => {
        const num = Number(value)
        const n = Number.isFinite(num) ? num : 0
        if (!fractionDigits) return n
        return n
    }

    const formatMoney = (value: unknown) => `$${safeNum(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    const formatPercent = (value: unknown) => `${safeNum(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`
    const formatInteger = (value: unknown) => safeNum(value).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

    const defaultColumns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date',
            render: (date: Date) => {
                const jsDate = toJsDate(date)
                return jsDate ? format(jsDate, 'MMM d, yyyy') : '-'
            },
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            key: 'end_date',
            render: (date: Date) => {
                const jsDate = toJsDate(date)
                return jsDate ? format(jsDate, 'MMM d, yyyy') : '-'
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => <span className="capitalize">{status}</span>,
        },
        {
            title: 'PPG Name',
            dataIndex: 'ppg_name',
            key: 'ppg_name',
            render: (ppg_name: string) => ppg_name,
        },
        {
            title: 'Products',
            dataIndex: 'planned',
            key: 'products',
            render: (planned: any[]) => planned.length,
        },
        {
            title: 'List Price',
            dataIndex: ['financialData', 'listPrice'],
            key: 'listPrice',
            render: (value: number) => formatMoney(value),
        },
        {
            title: 'Spoil Per Unit',
            dataIndex: ['financialData', 'spoils'],
            key: 'spoils',
            render: (value: number) => formatMoney(value),
        },
        {
            title: 'EDLP Rate',
            dataIndex: ['financialData', 'edlpPerUnitRate'],
            key: 'edlpPerUnitRate',
            render: (value: number) => formatMoney(value),
        },
        {
            title: 'Promo Rate',
            dataIndex: ['financialData', 'promoPerUnitRate'],
            key: 'promoPerUnitRate',
            render: (value: number) => formatMoney(value),
        },
        {
            title: 'COGS',
            dataIndex: ['financialData', 'cogs'],
            key: 'cogs',
            render: (value: number) => formatMoney(value),
        },
        {
            title: 'VCM',
            dataIndex: ['financialData', 'vcm'],
            key: 'vcm',
            render: (value: number) => formatMoney(value),
        },
        {
            title: 'Fixed Fee',
            dataIndex: ['financialData', 'fixedFee'],
            key: 'fixedFee',
            render: (value: number) => formatMoney(value),
        },
        {
            title: 'Discount %',
            dataIndex: ['financialData', 'discount'],
            key: 'discount',
            render: (value: number) => formatPercent(value),
        },
        {
            title: 'Units',
            dataIndex: ['financialData', 'units'],
            key: 'units',
            render: (value: number) => formatInteger(value),
        },
    ]

    const columns = [...additionalColumns, ...defaultColumns]

    const renderProductDetails = (products: any[], title: string) => {
        const productColumns = [
            { title: 'Product', dataIndex: 'productName', key: 'productName' },
            {
                title: 'Base Price',
                dataIndex: ['financialData', 'basePrice'],
                key: 'basePrice',
                render: (value: number) => formatMoney(value),
            },
            {
                title: 'Promo Price',
                dataIndex: ['financialData', 'promoPrice'],
                key: 'promoPrice',
                render: (value: number) => formatMoney(value),
            },
            {
                title: 'Discount',
                dataIndex: ['financialData', 'discount'],
                key: 'discount',
                render: (value: number) => formatPercent(value),
            },
            {
                title: 'Units',
                dataIndex: ['financialData', 'units'],
                key: 'units',
                render: (value: number) => formatInteger(value),
            },
        ]

        return (
            <div>
                <h4 className="text-lg font-semibold mb-4">{title}</h4>
                <Table
                    columns={productColumns}
                    dataSource={products}
                    pagination={false}
                    size="small"
                />
            </div>
        )
    }

    const renderFinancialResults = (products: any[]) => {
        const financialColumns = [
            { title: 'Metric', dataIndex: 'name', key: 'name' },
            { title: 'Value', dataIndex: 'value', key: 'value' },
        ]

        return products.map((product) => {
            const { promotionalResults, financialResults } = getResult(product.financialData);

            return (
                <div key={product.productId} className="mt-6">
                    <Tabs defaultActiveKey="financial">
                        <TabPane tab="Financial Results" key="financial">
                            <Table
                                columns={financialColumns}
                                dataSource={financialResults}
                                pagination={false}
                                size="small"
                            />
                        </TabPane>
                        <TabPane tab="Promotional Results" key="promotional">
                            <Table
                                columns={[
                                    { title: 'Promotion', dataIndex: 'promotion' },
                                    {
                                        title: '% ACV',
                                        dataIndex: 'acv',
                                        align: 'right',
                                        render: (value: number) => value ? `${value.toFixed(2)}%` : '-',
                                    },
                                    {
                                        title: '% Lift',
                                        dataIndex: 'lift',
                                        align: 'right',
                                        render: (value: number) => value ? `${value.toFixed(2)}%` : '-',
                                    },
                                    {
                                        title: 'Units',
                                        dataIndex: 'units',
                                        align: 'right',
                                        render: (value: number) => value ? value.toLocaleString() : '-',
                                    },
                                    {
                                        title: 'Dollars',
                                        dataIndex: 'dollars',
                                        align: 'right',
                                        render: (value: number) => value ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '-',
                                    },
                                ]}
                                dataSource={promotionalResults}
                                pagination={false}
                                size="small"
                            />
                        </TabPane>
                    </Tabs>
                </div>
            )
        })
    }

    const expandedRowRender = (record: Event) => (
        <div className="p-4 space-y-4">
            <Tabs defaultActiveKey="planned">
                <TabPane tab="Planned" key="planned">
                    {renderProductDetails(record.planned, 'Planned Products')}
                    {renderFinancialResults(record.planned)}
                </TabPane>
                <TabPane tab="Actual" key="actual">
                    {record.actual.length > 0 ? (
                        <>
                            {renderProductDetails(record.actual, 'Actual Products')}
                            {renderFinancialResults(record.actual)}
                        </>
                    ) : (
                        <div className="text-gray-500 text-center py-4">
                            No actual data available
                        </div>
                    )}
                </TabPane>
            </Tabs>
        </div>
    )

    return (
        <Table
            dataSource={data}
            columns={columns}
            rowKey="id"
            expandable={{
                expandedRowRender,
                expandRowByClick: true,
            }}
            pagination={false}
            scroll={{ y: 400 }}
        />
    )
}