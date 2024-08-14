import axios from "axios";
import { OrderGet } from "../Models/Order";

const api = "http://localhost:5072/Order/";

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
