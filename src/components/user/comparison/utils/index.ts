import { ComparisonColumn, ComparisonSummary, TPOEvent } from '../types'
import { defaultAttributes } from '../constants'

export const generateRandomAttributes = (): Record<string, boolean> => {
  const attributes: Record<string, boolean> = {}
  defaultAttributes.forEach(attr => {
    attributes[attr] = Math.random() > 0.4 // 60% chance of true
  })
  return attributes
}

export const generateComparisonColumns = (numberOfTpos: number): ComparisonColumn[] => {
  const newColumns: ComparisonColumn[] = []
  for (let i = 0; i < numberOfTpos; i++) {
    newColumns.push({
      id: `tpo-${i + 1}`,
      title: `Plan ${i + 1}`,
      attributes: generateRandomAttributes()
    })
  }
  return markBestPerformingColumn(newColumns)
}

export const generateTPOComparisonColumns = (tpoEvents: TPOEvent[]): ComparisonColumn[] => {
  const columns = tpoEvents.map((tpo, index) => ({
    id: tpo.id,
    title: tpo.name,
    attributes: generateRandomAttributes()
  }))
  return markBestPerformingColumn(columns)
}

export const calculateComparisonSummary = (column: ComparisonColumn): ComparisonSummary => {
  const totalTrue = Object.values(column.attributes).filter(Boolean).length
  const percentage = Math.round((totalTrue / defaultAttributes.length) * 100)
  
  return {
    totalTrue,
    percentage
  }
}

export const markBestPerformingColumn = (columns: ComparisonColumn[]): ComparisonColumn[] => {
  if (columns.length === 0) return columns
  
  // Calculate performance for each column
  const columnsWithPerformance = columns.map(column => ({
    ...column,
    performance: calculateComparisonSummary(column)
  }))
  
  // Find the column with the highest percentage
  const bestColumn = columnsWithPerformance.reduce((best, current) => 
    current.performance.percentage > best.performance.percentage ? current : best
  )
  
  // Mark the best performing column
  return columnsWithPerformance.map(column => ({
    id: column.id,
    title: column.title,
    attributes: column.attributes,
    detailedMetrics: column.detailedMetrics,
    isBestPerforming: column.id === bestColumn.id
  }))
}
