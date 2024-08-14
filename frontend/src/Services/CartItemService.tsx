import axios from "axios";
import { UserCartItemsGet, UserCartItemsPost } from "../Models/CartItem";

const api = "http://localhost:5072/CartItem/";

export const getCartItems = async () => {
  try {
    const data = await axios.get<UserCartItemsGet[]>(api);
    console.log(data)
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const getSearchedCartItems = async (query: string) => {
  try {
    const data = await axios.get<UserCartItemsGet[]>(api + `${query}`);
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const postCartItem = async (productId: number, quantity: number) => {
  try {
    const response = await axios.post(
      `${api}${productId}`,
      { quantity: quantity },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const deleteCartItem = async (cartItemId: number) => {
  try {
    const response = await axios.delete(`${api}${cartItemId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const getCartItemsByOrder = async (orderId: number) => {
  try {
    const data = await axios.get<UserCartItemsGet[]>(`${api}${orderId}`);
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};