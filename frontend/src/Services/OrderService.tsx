import axios from "axios";
import { OrderGet } from "../Models/Order";
import { UserCartItemsGet } from "../Models/CartItem";

const api = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/Order/`;

export const getOrders = async () => {
  try {
    const data = await axios.get<OrderGet>(api);
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const getUserOrders = async (query: string) => {
  try {
    const data = await axios.get<OrderGet[]>(api);
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const getOrderDetailsById = async (orderId: string, query: string) => {
  try {
    const data = await axios.get<UserCartItemsGet[]>(
      api + `${orderId}/` + `${query}`
    );
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

export const postOrder = async (
  paymentMethod: string,
  amount: number,
  shippingAddress: string
) => {
  try {
    const data = await axios.post<OrderGet>(api, {
      paymentMethod: paymentMethod,
      amount: amount,
      shippingAddress: shippingAddress,
    });
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};
