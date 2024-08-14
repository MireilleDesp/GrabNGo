import { ChangeEvent, SyntheticEvent, useState } from "react";
import { SupplierPost } from "../../Models/Supplier";

interface Props {
  closeOnSubmit: () => void;
  handleProductPopupSubmit: (
    e: SyntheticEvent,
    closeOnSubmit: () => void
  ) => void;
  handleProductPopupInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  formData: SupplierPost;
}

const AddSupplier = ({
  handleProductPopupSubmit,
  handleProductPopupInputChange,
  closeOnSubmit,
  formData,
}: Props) => {
  return (
    <form
      className="poppup-child-form"
      onSubmit={(e) => handleProductPopupSubmit(e, closeOnSubmit)}
    >
      <label className="form-label">Supplier:</label>
      <input
        className="form-input"
        type="text"
        name="name"
        placeholder="Supplier name"
        value={formData.name}
        onChange={handleProductPopupInputChange}
        required
      />
      <input
        className="form-input"
        type="text"
        placeholder="Contact person"
        name="contactName"
        value={formData.contactName}
        onChange={handleProductPopupInputChange}
        required
      />
      <input
        className="form-input"
        type="text"
        placeholder="Phone number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleProductPopupInputChange}
        
      />
      <input
        className="form-input"
        type="text"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleProductPopupInputChange}
        required
      />
      <input
        className="form-input"
        type="text"
        placeholder="Address"
        name="address"
        value={formData.address}
        onChange={handleProductPopupInputChange}
        required
      />
      <button className="form-button" type="submit">
        Save
      </button>
    </form>
  );
};

export default AddSupplier;
