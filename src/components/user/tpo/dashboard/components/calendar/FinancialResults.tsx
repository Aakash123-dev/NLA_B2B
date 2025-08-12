'use client'

import React from 'react'
import { Table } from 'antd'

type FinancialData = any

interface FinancialResultsProps {
  financialData: FinancialData
}

const getResult = (financialData: any) => {
  // Minimal fallback; assume external util exists in your project
  const promotionalResults = [
    { promotion: 'TPR', acv: 0, lift: 0, units: financialData.units || 0, dollars: (financialData.units || 0) * (financialData.promoPrice || 0) },
  ]
  const financialResults = [
    { name: 'Revenue', value: `$${(((financialData.units || 0) * (financialData.promoPrice || 0)) || 0).toFixed(2)}` },
  ]
  return { promotionalResults, financialResults }
}

const FinancialResults: React.FC<FinancialResultsProps> = ({ financialData }) => {
  const { promotionalResults, financialResults } = getResult(financialData)
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Promotion Results</h3>
        <Table
          columns={[
            { title: 'Promotion', dataIndex: 'promotion' },
            { title: '% ACV', dataIndex: 'acv', align: 'right' as const, render: (v: number) => v ? `${v.toFixed(2)}%` : '-' },
            { title: '% Lift', dataIndex: 'lift', align: 'right' as const, render: (v: number) => v ? `${v.toFixed(2)}%` : '-' },
            { title: 'Units', dataIndex: 'units', align: 'right' as const, render: (v: number) => v ? v.toLocaleString('en-US') : '-' },
            { title: 'Dollars', dataIndex: 'dollars', align: 'right' as const, render: (v: number) => v ? `$${v.toLocaleString('en-US')}` : '-' },
          ]}
          dataSource={promotionalResults.map((item, index) => ({ ...item, key: index }))}
          pagination={false}
          size="small"
          bordered
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Financial Results</h3>
        <Table
          columns={[
            { title: 'Metric', dataIndex: 'name' },
            { title: 'Value', dataIndex: 'value', align: 'right' as const, render: (value: string) => value },
          ]}
          dataSource={financialResults.map((item, index) => ({ ...item, key: index }))}
          pagination={false}
          size="small"
          bordered
        />
      </div>
    </div>
  )
}

export default FinancialResults


