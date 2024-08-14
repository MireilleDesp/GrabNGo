import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import Supplier from "../../Components/Supplier/Supplier";
import { SupplierGet, SupplierPost } from "../../Models/Supplier";
import {
  deleteSupplier,
  postSupplier,
  putSupplier,
  searchSuppliers,
} from "../../Services/SupplierService";
import Search from "../../Components/Search/Search";
import AddForm from "../../Components/PopupBoxes/AddPopup";
import AddSupplier from "../../Components/Supplier/AddSupplier";

type Props = {};

const SupplierPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");
  const [suppliersResult, setSuppliersResult] = useState<SupplierGet[]>([]);
  const [formData, setFormData] = useState<SupplierPost>({
    name: "",
    contactName: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await searchSuppliers(search);
        if (typeof result === "string") {
          setServerError(result);
        } else if (Array.isArray(result!.data)) {
          setSuppliersResult(result!.data);
        }
      } catch (error) {
        setServerError("An error occurred while fetching cart items.");
      }
    };

    fetchCategories();
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  const changeSearchSupplierHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchSupplierSubmitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchSuppliers(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result!.data)) {
      setSuppliersResult(result!.data);
    }
  };

  const handleSupplierPopupSubmit = async (
    e: SyntheticEvent,
    close: () => void
  ) => {
    e.preventDefault();

    const { name, contactName, phoneNumber, email, address } = formData;
    const result = await postSupplier(
      name,
      contactName,
      phoneNumber,
      email,
      address
    );
    if (typeof result === "string") {
      setServerError(result);
    } else if (result!.data) {
      setSuppliersResult((prevSuppliers) => [...prevSuppliers, result!.data]);
      close(); // Close the popup after successful submission
    }
  };

  const handleSupplierPopupInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEditSupplierPopupSubmit = async (
    e: SyntheticEvent,
    close: () => void
  ) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      supplierId: { value: string };
      name: { value: string };
      contactName: { value: string };
      phoneNumber: { value: string };
      email: { value: string };
      address: { value: string };
    };

    const id = parseInt(target.supplierId.value);
    const name = target.name.value;
    const contactName = target.contactName.value;
    const phoneNumber = target.phoneNumber.value;
    const email = target.email.value;
    const address = target.address.value;

    const result = await putSupplier(
      id,
      name,
      contactName,
      phoneNumber,
      email,
      address
    );
    if (typeof result === "string") {
      setServerError(result);
    } else if (result!.data) {
      setSuppliersResult((prevSuppliers) =>
        prevSuppliers.map((supplier) =>
          supplier.id === result!.data.id ? result!.data : supplier
        )
      );
      close(); // Close the popup after successful submission
    }
  };

  const onDeleteSupplier = async (e: any) => {
    e.preventDefault();
    const supplierId = parseInt(e.target[0].value);
    const removed = await deleteSupplier(supplierId);

    if (typeof removed === "string") {
      setServerError(removed);
    } else if (removed?.data) {
      setSuppliersResult(removed!.data);
    } else {
      setServerError("Unexpected response format");
    }
  };

  return (
    <>
      <Search
        usedForComponent="suppliers"
        search={search}
        changeSearchHandler={changeSearchSupplierHandler}
        onSearchSubmit={searchSupplierSubmitHandler}
      />
      <AddForm
        children={
          <AddSupplier
            closeOnSubmit={() => {}}
            handleProductPopupInputChange={handleSupplierPopupInputChange}
            handleProductPopupSubmit={handleSupplierPopupSubmit}
            formData={formData}
          />
        }
      />
      {suppliersResult && (
        <Supplier
          supplierData={suppliersResult}
          onDeleteProduct={onDeleteSupplier}
          closeOnSubmit={() => {}}
          handleEditSupplierPopupSubmit={handleEditSupplierPopupSubmit}
        />
      )}
      {serverError && <h1>{serverError}</h1>}
    </>
  );
};

export default SupplierPage;
