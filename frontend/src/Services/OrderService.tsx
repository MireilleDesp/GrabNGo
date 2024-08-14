import axios from "axios";
import { OrderGet } from "../Models/Order";

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
