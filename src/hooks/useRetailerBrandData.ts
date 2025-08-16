import { useState, useEffect } from 'react';
import { axiosPythonInstance } from '@/services/projectservices/axiosInstance';

// Define types for the data structure
interface RetailerBrandProducts {
  [retailer: string]: {
    [brand: string]: string[];
  };
}

interface UseRetailerBrandDataReturn {
  retailerBrandProducts: RetailerBrandProducts;
  retailers: string[];
  getBrandsForRetailer: (retailer: string) => string[];
  getProductsForBrand: (retailer: string, brand: string) => string[];
  isLoading: boolean;
  error: string | null;
}

export const useRetailerBrandData = (project_id: number, model_id: number): UseRetailerBrandDataReturn => {
    console.log(project_id ,"Project_id_data")
    const [retailerBrandProducts, setRetailerBrandProducts] = useState<RetailerBrandProducts>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRetailerBrandProductData = async () => {
            if (!project_id || !model_id) return;

            try {
                setIsLoading(true);
                setError(null);
                const api = `/insights/retailer_brands_products?project_id=${project_id}&model_id=${model_id}`;
                const response = await axiosPythonInstance.get(api);

                console.log(response ,"responseData")

                if (response.status === 200) {
                    setRetailerBrandProducts(response?.data?.data);
                }
            } catch (error) {
                console.error("Error in fetching retailers", error);
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchRetailerBrandProductData();
    }, [project_id, model_id]);
    console.log(retailerBrandProducts, "retilerBrandProducsffrrere")

    // Get retailers list
    const retailers = Object.keys(retailerBrandProducts);

    // Get brands for a specific retailer
    const getBrandsForRetailer = (retailer: string): string[] => {
        return retailer ? Object.keys(retailerBrandProducts[retailer] || {}) : [];
    };

    // Get products for a specific retailer and brand
    const getProductsForBrand = (retailer: string, brand: string): string[] => {
        return (retailer && brand) ? retailerBrandProducts[retailer]?.[brand] || [] : [];
    };

    return {
        retailerBrandProducts,
        retailers,
        getBrandsForRetailer,
        getProductsForBrand,
        isLoading,
        error
    };
}; 