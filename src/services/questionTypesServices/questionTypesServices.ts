import { API_ENDPOINTS } from "../../constants/endPoints/endPoints";
import { axiosInstance } from "../projectservices/axiosInstance";

export const fetchQuestionTypes = async (modelId:any) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.QUESTION_TYPES.GET_QUESTION_TYPES(modelId));
      return Array.isArray(response.data?.data) ? response.data.data : [];
    } catch (error) {
      console.error("Error fetching question types:", error);
      throw error;
    }
  };