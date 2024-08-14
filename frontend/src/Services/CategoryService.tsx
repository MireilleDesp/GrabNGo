import axios from "axios";
import { CategoryGet, CategoryPost } from "../Models/Category";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5072/Category/";

export const getCategories = async () => {
  try {
    const data = await axios.get<CategoryGet>(api);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An expected error has occured.";
    }
  }
};

export const searchCategories = async (query: string) => {
  try {
    const data = await axios.get<CategoryGet>(api + `${query}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An expected error has occured.";
    }
  }
};

export const postCategory = async (name: string) => {
  try {
    const data = await axios.post<CategoryPost>(api, {
      name: name,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteCategory = async (categoryId: number) => {
  try {
    const response = await axios.delete(`${api}${categoryId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const putCategory = async (categoryId: number, name: string) => {
 
  try {
    const response = await axios.put<CategoryGet>(`${api}${categoryId}`, {
      name: name,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};
