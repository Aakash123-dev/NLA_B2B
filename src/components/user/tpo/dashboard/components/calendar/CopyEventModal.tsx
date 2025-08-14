import React, { useState, useEffect } from 'react'
import { Modal, Select, Button, Checkbox, Spin } from 'antd'
import { Event, EventTPO } from '@/types/event'
import { eventService } from '@/services/eventServices/eventServices'
import { toJsDate } from '@/utils/dateUtils'
import { PreviewTable } from '../ImportEvent/PreviewTable'

interface CopyEventModalProps {
    isOpen: boolean
    onClose: () => void
    availableYears: EventTPO[]
    currentYear: number
    onCopyEvents: (events: Event[]) => Promise<void>
    tpoData: EventTPO
}

const CopyEventModal: React.FC<CopyEventModalProps> = ({
    isOpen,
    onClose,
    availableYears,
    currentYear,
    onCopyEvents,
    tpoData
}) => {
    const [selectedYearId, setSelectedYearId] = useState<string>('')
    const [selectedEvents, setSelectedEvents] = useState<string[]>([])
    const [yearEvents, setYearEvents] = useState<Event[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isFetchingEvents, setIsFetchingEvents] = useState(false)

    useEffect(() => {
        const fetchEvents = async () => {
            if (selectedYearId) {
                try {
                    setIsFetchingEvents(true)
                    // Find the TPO ID for the selected year
                    const selectedYearTPO = availableYears.find(y => y.id === selectedYearId)
                    if (!selectedYearTPO) {
                        console.error('No TPO found for selected year')
                        return
                    }

                    // Fetch events for the selected year's TPO
                    const fetchedEvents = await eventService.getEvents(selectedYearTPO.id)
                    setYearEvents(fetchedEvents.filter((item: any) => item.status == 'COMPLETED'))
                    setSelectedEvents([]) // Reset selections when year changes
                } catch (error) {
                    console.error('Failed to fetch events:', error)
                } finally {
                    setIsFetchingEvents(false)
                }
            } else {
                setYearEvents([])
                setSelectedEvents([])
            }
        }

        fetchEvents()
    }, [selectedYearId, availableYears])

    const handleYearChange = (value: string) => {
        setSelectedYearId(value)
    }

    const handleEventSelect = (eventId: string) => {
        setSelectedEvents(prev => {
            if (prev.includes(eventId)) {
                return prev.filter(id => id !== eventId)
            }
            return [...prev, eventId]
        })
    }

    const handleCopyEvents = async () => {
        try {
            setIsSubmitting(true)
            const selectedEventsData = yearEvents
                .filter(event => selectedEvents.includes(event.id))
                .map(event => {
                    // Adjust dates to current year
                    const startDate = toJsDate(event.start_date) || new Date()
                    const endDate = toJsDate(event.end_date) || new Date()

                    const yearDiff = currentYear - startDate.getFullYear()
                    const newStartDate = new Date(startDate)
                    const newEndDate = new Date(endDate)

                    newStartDate.setFullYear(startDate.getFullYear() + yearDiff)
                    newEndDate.setFullYear(endDate.getFullYear() + yearDiff)

                    return {
                        ...event,
                        id: '', // Clear ID for new event
                        start_date: newStartDate,
                        end_date: newEndDate,
                        event_tpo_id: tpoData.id
                    }
                })

            await onCopyEvents(selectedEventsData)
            onClose()
        } catch (error) {
            console.error('Failed to copy events:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    // Extend PreviewTable columns to include checkbox
    const TableWithCheckbox = ({ data }: { data: Event[] }) => {
        const columns = [
            {
                title: 'Select',
                key: 'select',
                render: (record: Event) => (
                    <Checkbox
                        checked={selectedEvents.includes(record.id)}
                        onChange={() => handleEventSelect(record.id)}
                    />
                ),
            }
        ]

        return (
            <div className="max-h-[600px] overflow-auto">
                <PreviewTable
                    data={data}
                    additionalColumns={columns}
                />
            </div>
        )
    }

    return (
        <Modal
            title="Copy Events from Another Year"
            open={isOpen}
            onCancel={onClose}
            width={1200}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button
                    key="copy"
                    type="primary"
                    onClick={handleCopyEvents}
                    disabled={selectedEvents.length === 0}
                    loading={isSubmitting}
                >
                    Copy Selected Events
                </Button>
            ]}
        >
            <div className="space-y-4">
                <Select
                    placeholder="Select Year"
                    className="w-full"
                    onChange={handleYearChange}
                    value={selectedYearId}
                    options={availableYears
                        .filter(year => year.id !== tpoData.id)
                        .map(year => ({
                            value: year.id,
                            label: year.year + ' (' + year.name + ')'
                        }))}
                />
                {isFetchingEvents ? (
                    <div className="flex justify-center items-center py-8">
                        <Spin />
                        <span className="ml-2 text-gray-500">Loading events...</span>
                    </div>
                ) : selectedYearId && yearEvents.length > 0 ? (
                    <TableWithCheckbox data={yearEvents} />
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        {selectedYearId ? 'No events found for selected year' : 'Select a year to view events'}
                    </div>
                )}
            </div>
        </Modal>
    )
}

export default CopyEventModal 