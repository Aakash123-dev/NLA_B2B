import { useState } from 'react'
import { ComparisonColumn, ComparisonState, TPOEvent } from '../types'
import { generateTPOComparisonColumns, markBestPerformingColumn } from '../utils'

export const useComparison = () => {
  const [selectedTPOs, setSelectedTPOs] = useState<TPOEvent[]>([])
  const [columns, setColumns] = useState<ComparisonColumn[]>([])
  const [isConfiguring, setIsConfiguring] = useState(false)

  const handleTPOSelection = (tpos: TPOEvent[]) => {
    setSelectedTPOs(tpos)
    const newColumns = generateTPOComparisonColumns(tpos)
    setColumns(newColumns)
    setIsConfiguring(true)
  }

  const resetComparison = () => {
    setSelectedTPOs([])
    setColumns([])
    setIsConfiguring(false)
  }

  const toggleAttribute = (columnId: string, attribute: string) => {
    const updatedColumns = columns.map(col => 
      col.id === columnId 
        ? {
            ...col,
            attributes: {
              ...col.attributes,
              [attribute]: !col.attributes[attribute]
            }
          }
        : col
    )
    
    // Re-mark the best performing column after attribute change
    setColumns(markBestPerformingColumn(updatedColumns))
  }

  return {
    selectedTPOs,
    numberOfTpos: selectedTPOs.length,
    columns,
    isConfiguring,
    handleTPOSelection,
    resetComparison,
    toggleAttribute
  }
}
