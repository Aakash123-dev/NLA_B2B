import { FinancialData } from './financial'
import { Dayjs } from 'dayjs'

export type EventStatus = 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'

export interface EventTPO {
    id: string
    name: string
    year: string | number
    project_id: string
    model_id: string
    brand_id: string
    retailer_id: string
}

export interface ActualPromotionalResult {
    promotion: string
    acv: number
    lift: number
    units: number
    dollars: number
}

export interface ActualFinancialResult {
    name: string
    value: string
}

export interface ActualResults {
    promotionalResults?: ActualPromotionalResult[]
    financialResults?: ActualFinancialResult[]
}

export interface EventProduct {
    productId: string
    productName: string
    financialData: FinancialData
    actualResults?: ActualResults
}

export interface BaseEvent {
    id: string
    title: string
    description: string
    start_date: Date | Dayjs | undefined
    end_date: Date | Dayjs | undefined
    color: string
    status: EventStatus
    channels: string[]
    event_tpo_id: string
    ppg_name: string
    planned: EventProduct[]
    actual: EventProduct[]
    user_id?: string
}

export interface Event extends BaseEvent {
}

export type NewEvent = Omit<Event, 'id'>