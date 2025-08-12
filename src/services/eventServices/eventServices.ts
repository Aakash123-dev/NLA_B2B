import axios from 'axios'
import { axiosInstance, axiosPythonInstance } from '../projectservices/axiosInstance'

export const eventService = {
    async getEvents(event_id) {
        try {
            const response = await axiosInstance.get(`/events/${event_id}`)
            return response.data || []
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    async createImportedEvent(event) {
        try {
            const auth = JSON.parse(localStorage.getItem("auth") || '{}')
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

    async createEvent(event) {
        try {
            console.log({ saveEvent: event });

            const auth = JSON.parse(localStorage.getItem("auth") || '{}')
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

    async updateEvent(event) {
        try {
            const response = await axiosInstance.put(`/events/${event.id}`, event)
            return response.data || []
        } catch (error) {
            console.error(error)
            throw error
        }
        // return event
    },

    async deleteEvent(id) {
        try {
            const response = await axiosInstance.delete(`/events/${id}`)
            return response.data || []
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    async fetchProductData(products, selectedProject, selectedModel, selectedRetailer) {
        let productDataArray = [];
        try {
            for (const product of products) {
                const api = `/insights/simulation/price/product-data?project_id=${selectedProject}&model_id=${selectedModel}&Retailer=${selectedRetailer}&Product=${product}`;
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
                        basePriceElasticity:
                            SingleproductData?.Base_Price_Elasticity,
                        originalBasePrice: basePrice,
                        originalTotalUnits: SingleproductData.total_units_sum / 52,
                        basePrice: basePrice,
                        featureEffect: SingleproductData.Feature,
                        displayEffect: SingleproductData.Display,
                        featureAndDisplayEffect: SingleproductData.Feature_And_Display,
                        // total_units_sum: SingleproductData?.total_units_sum / 52,
                    };

                    productDataArray.push(SingleproductData);
                }
            }
            return productDataArray;
        } catch (error) {
            console.log("Error in fetching promo event simulation data: ", error);
        }
    },
}