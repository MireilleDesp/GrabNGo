import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { SupplierGet } from "../../Models/Supplier";

interface Props {
  closeOnSubmit: () => void;
  handleEditSupplierPopupSubmit: (
    e: SyntheticEvent,
    closeOnSubmit: () => void
  ) => void;
  supplierInput: SupplierGet;
}

const EditSupplier = ({
  handleEditSupplierPopupSubmit,
  closeOnSubmit,
  supplierInput,
}: Props) => {
  const [supplierData, setSupplierData] = useState<SupplierGet>(supplierInput);

  const handleSupplierPopupChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setSupplierData({
      ...supplierData,
      [name]: value,  // Dynamically update the field based on the input's name attribute
    });
  };
  

  return (
    <form
      className="poppup-child-form"
      onSubmit={(e) => handleEditSupplierPopupSubmit(e, closeOnSubmit)}
    >
      {/* Hidden input to store the ID */}
      <input type="hidden" name="supplierId" value={supplierData.id} />
      <label className="form-label">Supplier Name:</label>
      <input
        className="form-input"
        type="text"
        name="name"
        placeholder="Supplier name"
        value={supplierData.name}
        onChange={handleSupplierPopupChange}
        required
      />
      <input
        className="form-input"
        type="text"
        placeholder="Contact person"
        name="contactName"
        value={supplierData.contactName}
        onChange={handleSupplierPopupChange}
        required
      />
      <input
        className="form-input"
        type="text"
        placeholder="Phone number"
        name="phoneNumber"
        value={supplierData.phoneNumber}
        onChange={handleSupplierPopupChange}
      />
      <input
        className="form-input"
        type="text"
        placeholder="Email"
        name="email"
        value={supplierData.email}
        onChange={handleSupplierPopupChange}
        required
      />
      <input
        className="form-input"
        type="text"
        placeholder="Address"
        name="address"
        value={supplierData.address}
        onChange={handleSupplierPopupChange}
        required
      />
      <button className="form-button" type="submit">
        Save
      </button>
    </form>
  );
};

export default EditSupplier;
