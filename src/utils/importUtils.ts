import { Event, EventProduct, EventStatus } from '../types/event'
import Papa from 'papaparse'
import axios from "axios";
import type { Dayjs } from 'dayjs';
import { axiosPythonInstance } from '@/services/projectservices/axiosInstance';

interface CsvRow {
    eventId?: string // Optional - to group multiple products under same event
    title: string
    description: string
    start_date: string
    end_date: string
    status: string
    color: string
    channels: string
    retailer_id: string
    brand_id: string
    project_id: string
    model_id: string
    // budget: string
    ppg_name: string
    // Product data
    productId: string
    basePrice: string
    promoPrice: string
    units: string
    tprDist: string
    doDist: string
    foDist: string
    fdDist: string
    listPrice: string
    spoils: string
    cogs: string
    edlpPerUnitRate: string
    promoPerUnitRate: string
    vcm: string
    fixedFee: string
    increamentalUnits: string
}

interface ParseResult {
    events: Event[]
    errors: string[]
}

const getOrCreateTPO = async (currentTPOData: any, start_date: Date | Dayjs) => {
    try {
        const auth = JSON.parse(localStorage.getItem("auth") || '{}')
        const config = { headers: { Authorization: `Bearer ` + auth.token } }

        // Convert start_date to Date if it's Dayjs
        const eventDate = start_date instanceof Date ? start_date : start_date.toDate()
        const eventYear = eventDate.getFullYear()
        const currentTPOYear = new Date(currentTPOData.year).getFullYear()

        // If years match, use current TPO
        if (eventYear === currentTPOYear) {
            return currentTPOData.id
        }

        // Find TPO by year
        const findResponse = await axios.get(
            `${process.env.REACT_APP_Base_URL}/api/v1/events/tpo/find-by-year`,
            {
                ...config,
                params: {
                    project_id: currentTPOData.project_id,
                    model_id: currentTPOData.model_id,
                    retailer_id: currentTPOData.retailer_id,
                    brand_id: currentTPOData.brand_id,
                    year: eventYear
                }
            }
        )
        console.log({ findResponse });

        // If TPO exists for this year, return its ID
        if (findResponse.data) {
            return findResponse.data.id
        }

        // Create new TPO with same data but different year
        const newTPOData = {
            ...currentTPOData,
            year: eventDate.toISOString(),
            project_id: currentTPOData.project_id,
            model_id: currentTPOData.model_id,
            retailer_id: currentTPOData.retailer_id,
            brand_id: currentTPOData.brand_id
        }
        delete newTPOData.id // Remove id to create new TPO

        const createResponse = await axios.post(
            `${process.env.REACT_APP_Base_URL}/api/v1/events/tpo`,
            newTPOData,
            config
        )
        return createResponse.data.id
    } catch (error) {
        console.error('Error in getOrCreateTPO:', error)
        throw error
    }
}

export const parseEventData = async (
    file: File,
    tpoData: any
): Promise<ParseResult> => {
    const events = new Map<string, Event>()
    const errors: string[] = []
    return new Promise((resolve) => {
        Papa.parse<CsvRow>(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                try {
                    // Use Promise.all with map instead of forEach
                    await Promise.all(results.data.map(async (row: CsvRow, index) => {
                        try {
                            const eventId = row.eventId || crypto.randomUUID()
                            const productData = await createProductData(row, tpoData)

                            // Create event first to get start_date
                            const event = createEvent(row, eventId, productData, tpoData)

                            if (!event.start_date) {
                                throw new Error('Start date is required')
                            }

                            // Get or create TPO based on event year
                            const tpoId = await getOrCreateTPO(tpoData, event.start_date)
                            event.event_tpo_id = tpoId

                            if (events.has(eventId)) {
                                // Add product to existing event
                                const existingEvent = events.get(eventId)!
                                existingEvent.planned.push(productData)
                                existingEvent.actual.push(productData)
                            } else {
                                // Create new event with product
                                events.set(eventId, event)
                            }
                        } catch (error) {
                            errors.push(`Row ${index + 2}: ${(error as Error).message}`)
                        }
                    }))

                    // Only resolve after all async operations are complete
                    resolve({ events: Array.from(events.values()), errors })
                } catch (error) {
                    errors.push(`Processing error: ${(error as Error).message}`)
                    resolve({ events: [], errors })
                }
            },
            error: (error) => {
                errors.push(`Failed to parse file: ${error.message}`)
                resolve({ events: [], errors })
            }
        })
    })
}

export const getProductData = async (product: string, tpoData: any) => {
    try {
        const api = `/insights/simulation/price/product-data?project_id=${tpoData.project_id}&model_id=${tpoData.model_id}&Retailer=${tpoData.retailer_id}&Product=${product}`;
        const response = await axiosPythonInstance.get(api);
        if (response.status === 200) {
            // setTimeout(() => {
            let SingleproductData = response?.data?.data[0];
            const basePrice = !isNaN(
                response?.data?.data[0]?.Price_avg_last_4_weeks
            )
                ? response?.data?.data[0]?.Price_avg_last_4_weeks
                : 0;

            SingleproductData = {
                id: SingleproductData._id,
                name: SingleproductData.Product,
                brand_id: SingleproductData.Brand,
                retailer_id: SingleproductData.Retailer,
                totalUnits: SingleproductData.total_units_sum / 52,
                promoPriceElasticity:
                    SingleproductData?.Promo_Price_Elasticity,
                basePrice: basePrice,
                // total_units_sum: SingleproductData?.total_units_sum / 52,
            };

            return SingleproductData;
        }
    } catch (error) {
        console.log("Error in fetching promo event simulation data: ", error);
    }
};

const createProductData = async (row: CsvRow, tpoData: any): Promise<EventProduct> => {
    try {
        // Fetch product data from database
        const product = await getProductData(row.productId, tpoData)

        return {
            productId: product.id,
            productName: product.name,
            financialData: {
                basePrice: Number(product.basePrice) || 0,
                basePriceElasticity: Number(product.basePriceElasticity),
                originalBasePrice: Number(product.basePrice),
                originalTotalUnits: Number(product.totalUnits),
                promoPrice: Number(row.promoPrice) || 0,
                discount: calculateDiscount(Number(product.basePrice), Number(row.promoPrice)),
                units: Number(product.totalUnits) || 0,
                tprDist: Number(row.tprDist) || 0,
                doDist: Number(row.doDist) || 0,
                foDist: Number(row.foDist) || 0,
                fdDist: Number(row.fdDist) || 0,
                listPrice: Number(row.listPrice) || 0,
                spoils: Number(row.spoils) || 0,
                cogs: Number(row.cogs) || 0,
                edlpPerUnitRate: Number(row.edlpPerUnitRate) || 0,
                promoPerUnitRate: Number(row.promoPerUnitRate) || 0,
                vcm: Number(row.vcm) || 0,
                fixedFee: Number(row.fixedFee) || 0,
                increamentalUnits: Number(row.increamentalUnits) || 0,
                promoPriceElasticity: Number(product.promoPriceElasticity),
                featureEffect: Number(product.featureEffect),
                displayEffect: Number(product.displayEffect),
                featureAndDisplayEffect: Number(product.featureAndDisplayEffect)
            }
        }
    } catch (error) {
        console.log("Error in creating product data: ", error);
        throw error;
    }
}

const calculateDiscount = (basePrice: number, promoPrice: number): number => {
    if (!basePrice || !promoPrice) return 0
    return ((basePrice - promoPrice) / basePrice) * 100
}

const createEvent = (
    row: CsvRow,
    eventId: string,
    productData: EventProduct,
    tpoData: any
): Event => {
    try {
        // Validate required fields
        const requiredFields: (keyof CsvRow)[] = ['title', 'start_date', 'end_date', 'status', 'productId', 'promoPrice']
        requiredFields.forEach(field => {
            if (!row[field]) {
                throw new Error(`Missing required field: ${field}`)
            }
        })

        // Parse dates
        const startDate = new Date(row.start_date)
        const endDate = new Date(row.end_date)

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            throw new Error('Invalid date format. Please use YYYY-MM-DD format.')
        }

        const auth = JSON.parse(localStorage.getItem("auth") || '{}')

        return {
            id: eventId,
            event_tpo_id: tpoData.id,
            title: row.title,
            description: row.description || '',
            start_date: startDate,
            end_date: endDate,
            color: row.color || '#4F46E5',
            status: validateStatus(row.status) as EventStatus,
            channels: parseChannels(row.channels),
            ppg_name: row.ppg_name || '',
            planned: [productData],
            actual: [productData],
            user_id: auth.user_id.toString()
        }
    } catch (error) {
        console.log("Error in creating event: ", error);
        throw error;
    }
}

const parseDate = (value: string, timeframe: 'past' | 'current' = 'past'): Date => {
    const date = new Date(value)
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date format')
    }

    if (timeframe === 'current') {
        const currentYear = new Date().getFullYear()
        date.setFullYear(currentYear)
    }

    return date
}

const validateStatus = (status: string): EventStatus => {
    const validStatuses = ['DRAFT', 'ACTIVE', 'COMPLETED']
    if (!validStatuses.includes(status.toUpperCase())) {
        throw new Error('Invalid status')
    }
    return status.toUpperCase() as EventStatus
}

const parseChannels = (channels: string): string[] => {
    if (!channels) return []
    return channels.split(',').map(c => c.trim())
}

export const parseEventFromRow = (row: any, project_id: string, model_id: string): Event => {
    return {
        id: crypto.randomUUID(), // Add unique ID
        title: row.title,
        description: row.description,
        start_date: new Date(row.start_date),
        end_date: new Date(row.end_date),
        color: row.color || '#4F46E5',
        status: validateStatus(row.status) as EventStatus,
        channels: parseChannels(row.channels),
        event_tpo_id: row.event_tpo_id,
        ppg_name: row.ppg_name,
        planned: [],
        actual: []
    }
}