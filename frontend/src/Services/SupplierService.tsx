import axios from "axios";
import { SupplierGet } from "../Models/Supplier";

const api = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/Supplier/`;

export const getSuppliers = async () => {
  try {
    const data = await axios.get<SupplierGet[]>(api);
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const searchSuppliers = async (query: string) => {
  try {
    const data = await axios.get<SupplierGet[]>(api + `${query}`);
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const postSupplier = async (
  name: string,
  contactName: string,
  phoneNumber: string,
  email: string,
  address: string
) => {
  try {
    const data = await axios.post<SupplierGet>(api, {
      name: name,
      contactName: contactName,
      phoneNumber: phoneNumber,
      email: email,
      address: address,
    });
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const putSupplier = async (
  supplierId: number,
  name: string,
  contactName: string,
  phoneNumber: string,
  email: string,
  address: string
) => {
  try {
    const data = await axios.put<SupplierGet>(`${api}${supplierId}`, {
      name: name,
      contactName: contactName,
      phoneNumber: phoneNumber,
      email: email,
      address: address,
    });
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const deleteSupplier = async (supplierId: number) => {
  try {
    const response = await axios.delete(`${api}${supplierId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};
