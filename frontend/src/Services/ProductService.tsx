import axios from "axios";
import { ProductGet, ProductPost } from "../Models/Product";

const api = "http://localhost:5072/Product/";

export const getProducts = async () => {
  try {
    const data = await axios.get<ProductGet>(api);
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

export const searchProducts = async (query: string) => {
  try {
    const data = await axios.get<ProductGet>(api + `${query}`);
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

export const getProductsArray = async () => {
  try {
    const data = await axios.get<ProductGet[]>(api);
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const searchProductsArray = async (query: string) => {
  try {
    const data = await axios.get<ProductGet[]>(api + `/${query}`);
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const postProduct = async (
  name: string,
  price: number,
  quatityInStock: number,
  description: string,
  image: string,
  supplierId: number,
  categoryId: number
) => {
  try {
    const data = await axios.post<ProductGet>(
      api + `${categoryId}` + `/${supplierId}`,
      {
        name: name,
        price: price,
        quatityInStock: quatityInStock,
        description: description,
        image: image,
      }
    );
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const deleteProduct = async (productId: number) => {
  try {
    const response = await axios.delete(`${api}${productId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const putProduct = async (
  id: number,
  name: string,
  price: number,
  quatityInStock: number,
  description: string,
  image: string,
  supplierId: number,
  categoryId: number
) => {
  try {
    const data = await axios.post<ProductGet>(
      api + `${id}` + `${categoryId}` + `/${supplierId}`,
      {
        name: name,
        price: price,
        quatityInStock: quatityInStock,
        description: description,
        image: image,
      }
    );
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};
