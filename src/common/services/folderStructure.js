import axios from "axios";
import { FOLDER_STRUCTURE_MOCK_ENDPOINT } from "../constants/endpoint";

export const fetchFolderStructure = async () => {
  try {
    const response = await axios.get(FOLDER_STRUCTURE_MOCK_ENDPOINT);
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
};
