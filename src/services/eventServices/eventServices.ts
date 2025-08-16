import axios from 'axios'
import { axiosInstance, axiosPythonInstance } from '../projectservices/axiosInstance'

// Define interfaces for better type safety
interface Event {
    id?: string | number;
    brand_id?: string | number;
    retailer_id?: string | number;
    user_id?: string | number;
    status: string;
    project_id?: string | number;
    model_id?: string | number;
    [key: string]: any; // Allow additional properties
}

interface ProductData {
    id: string;
    name: string;
    brand_id: string;
    retailer_id: string;
    totalUnits: number;
    promoPriceElasticity: number;
    basePriceElasticity: number;
    originalBasePrice: number;
    originalTotalUnits: number;
    basePrice: number;
    featureEffect: number;
    displayEffect: number;
    featureAndDisplayEffect: number;
}

interface ApiResponse<T> {
    data: T;
    status: number;
}

export const eventService = {
    async getEvents(event_id: string | number): Promise<any[]> {
        try {
            const response = await axiosInstance.get(`/events/${event_id}`)
            return response.data || []
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    async createImportedEvent(event: Event): Promise<any[]> {
        try {
            let eventData = {
                ...event,
                // brand_id: event.brand_id,
                // retailer_id: event.retailer_id,
                // user_id: auth.user_id,
                status: event.status.toUpperCase(), // Uppercase only
            }
           
            const response = await axiosInstance.post(`/events`, eventData)
            return response.data || []
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    async createEvent(event: Event): Promise<any[]> {
        try {
            console.log({ saveEvent: event });

            const auth = JSON.parse(localStorage.getItem("user") || '{}')
            let eventData = {
                ...event,
                // brand_id: event.brand_id,
                // // end_date: event.endDate,
                // // start_date: event.startDate,
                // project_id: event.project_id,
                // model_id: event.model_id,
                // retailer_id: event.retailer_id,
                user_id: auth.user_id,
                status: event.status.toUpperCase(), // Uppercase only
            }
            const response = await axiosInstance.post(`events`, eventData)
            return response.data || []
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    async updateEvent(event: Event): Promise<any[]> {
        try {
            if (!event.id) {
                throw new Error('Event ID is required for update')
            }
            const response = await axiosInstance.put(`/events/${event.id}`, event)
            return response.data || []
        } catch (error) {
            console.error(error)
            throw error
        }
        // return event
    },

    async deleteEvent(id: string | number): Promise<any[]> {
        try {
            const response = await axiosInstance.delete(`/events/${id}`)
            return response.data || []
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    async fetchProductData(
        products: string[], 
        selectedProject: string | number, 
        selectedModel: string | number, 
        selectedRetailer: string
    ): Promise<ProductData[]> {
        let productDataArray: ProductData[] = [];
        try {
            for (const product of products) {
                const api = `/insights/simulation/price/product-data?project_id=${selectedProject}&model_id=${selectedModel}&Retailer=${selectedRetailer}&Product=${product}`;
                const response: ApiResponse<any> = await axiosPythonInstance.get(api);
                if (response.status === 200) {
                    // setTimeout(() => {
                    let SingleproductData = response?.data?.data[0];
                    const basePrice = !isNaN(
                        response?.data?.data[0]?.Price_avg_last_4_weeks
                    )
                        ? response?.data?.data[0]?.Price_avg_last_4_weeks
                        : 0;

                    const productData: ProductData = {
                        id: SingleproductData._id,
                        name: SingleproductData.Product,
                        brand_id: SingleproductData.Brand,
                        retailer_id: SingleproductData.Retailer,
                        totalUnits: SingleproductData.total_units_sum / 52,
                        promoPriceElasticity:
                            SingleproductData?.Promo_Price_Elasticity || 0,
                        basePriceElasticity:
                            SingleproductData?.Base_Price_Elasticity || 0,
                        originalBasePrice: basePrice,
                        originalTotalUnits: SingleproductData.total_units_sum / 52,
                        basePrice: basePrice,
                        featureEffect: SingleproductData.Feature || 0,
                        displayEffect: SingleproductData.Display || 0,
                        featureAndDisplayEffect: SingleproductData.Feature_And_Display || 0,
                        // total_units_sum: SingleproductData?.total_units_sum / 52,
                    };

                    productDataArray.push(productData);
                }
            }
            return productDataArray;
        } catch (error) {
            console.log("Error in fetching promo event simulation data: ", error);
            return productDataArray; // Return empty array on error
        }
    },
}