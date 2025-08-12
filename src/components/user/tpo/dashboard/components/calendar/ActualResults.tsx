'use client'

import React from 'react'
import { Table, Input, InputNumber } from 'antd'

type FinancialData = any
type ActualResults = any

interface ActualResultsEditorProps {
  financialData: FinancialData
  actualResults?: ActualResults
  onChange: (actualResults: ActualResults) => void
}

const getResult = (financialData: any) => {
  const promotionalResults = [
    { promotion: 'TPR', acv: 0, lift: 0, units: financialData.units || 0, dollars: (financialData.units || 0) * (financialData.promoPrice || 0) },
  ]
  const financialResults = [
    { name: 'Revenue', value: `$${(((financialData.units || 0) * (financialData.promoPrice || 0)) || 0).toFixed(2)}` },
  ]
  return { promotionalResults, financialResults }
}

const ActualResultsEditor: React.FC<ActualResultsEditorProps> = ({ financialData, actualResults, onChange }) => {
  const { promotionalResults, financialResults } = getResult(financialData)
  const currentPromotionalResults = actualResults?.promotionalResults || promotionalResults
  const currentFinancialResults = actualResults?.financialResults || financialResults

  const handlePromotionalResultChange = (index: number, field: 'acv' | 'lift' | 'units' | 'dollars', value: number) => {
    const updatedResults = [...currentPromotionalResults]
    updatedResults[index] = { ...updatedResults[index], [field]: value }
    onChange({ ...actualResults, promotionalResults: updatedResults, financialResults: currentFinancialResults })
  }

  const handleFinancialResultChange = (index: number, value: string) => {
    const updatedResults = [...currentFinancialResults]
    updatedResults[index] = { ...updatedResults[index], value }
    onChange({ ...actualResults, promotionalResults: currentPromotionalResults, financialResults: updatedResults })
  }

  const promotionalColumns = [
    { title: 'Promotion', dataIndex: 'promotion', key: 'promotion' },
    { title: '% ACV', dataIndex: 'acv', key: 'acv', align: 'right' as const, render: (v: number, _r: any, i: number) => (
      <InputNumber value={v} onChange={(val) => handlePromotionalResultChange(i, 'acv', val || 0)} formatter={(value) => `${value}%`} parser={(value) => parseFloat(value?.replace('%', '') || '0')} style={{ width: '100%' }} step={0.01} precision={2} />
    ) },
    { title: '% Lift', dataIndex: 'lift', key: 'lift', align: 'right' as const, render: (v: number, _r: any, i: number) => (
      <InputNumber value={v} onChange={(val) => handlePromotionalResultChange(i, 'lift', val || 0)} formatter={(value) => `${value}%`} parser={(value) => parseFloat(value?.replace('%', '') || '0')} style={{ width: '100%' }} step={0.01} precision={2} />
    ) },
    { title: 'Units', dataIndex: 'units', key: 'units', align: 'right' as const, render: (v: number, _r: any, i: number) => (
      <InputNumber value={v} onChange={(val) => handlePromotionalResultChange(i, 'units', val || 0)} style={{ width: '100%' }} step={1} precision={0} />
    ) },
    { title: 'Dollars', dataIndex: 'dollars', key: 'dollars', align: 'right' as const, render: (v: number, _r: any, i: number) => (
      <InputNumber value={v} onChange={(val) => handlePromotionalResultChange(i, 'dollars', val || 0)} formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => parseFloat(value?.replace(/\$\s?|(,*)/g, '') || '0')} style={{ width: '100%' }} step={0.01} precision={2} />
    ) },
  ]

  const financialColumns = [
    { title: 'Metric', dataIndex: 'name', key: 'name' },
    { title: 'Value', dataIndex: 'value', key: 'value', align: 'right' as const, render: (v: string, _r: any, i: number) => (
      <Input value={v} onChange={(e) => handleFinancialResultChange(i, e.target.value)} style={{ width: '100%' }} />
    ) },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Promotion Results</h3>
        <Table columns={promotionalColumns} dataSource={currentPromotionalResults.map((item: any, index: number) => ({ ...item, key: index }))} pagination={false} size="small" bordered />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Financial Results</h3>
        <Table columns={financialColumns} dataSource={currentFinancialResults.map((item: any, index: number) => ({ ...item, key: index }))} pagination={false} size="small" bordered />
      </div>
    </div>
  )
}

export default ActualResultsEditor


