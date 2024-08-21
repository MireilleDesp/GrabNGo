import { ChangeEvent, SyntheticEvent, useState } from "react";
import { OrderPost } from "../../Models/Order";

interface Props {
  closeOnSubmit: () => void;
  handleOrderPopupSubmit: (
    e: SyntheticEvent,
    closeOnSubmit: () => void
  ) => void;
  formData: OrderPost;
  setOrderData: React.Dispatch<React.SetStateAction<OrderPost>>; // Add this prop
}

const AddOrder = ({
  handleOrderPopupSubmit,
  closeOnSubmit,
  formData,
  setOrderData,
}: Props) => {
  const handleOrderPopupInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOrderData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <form
      className="poppup-child-form"
      onSubmit={(e) => handleOrderPopupSubmit(e, closeOnSubmit)}
    >
      <select
        className="form-input"
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleOrderPopupInputChange}
        required
      >
        <option value="" disabled>
          Select Payment Method
        </option>
        <option value="bankTransaction">Bank Transaction</option>
        <option value="card">Card</option>
        <option value="paypal">PayPal</option>
        <option value="cashOnDelivery">Cash on Delivery</option>
      </select>
      <input
        className="form-input"
        type="text"
        placeholder="Shipping address"
        name="shippingAddress"
        value={formData.shippingAddress}
        onChange={handleOrderPopupInputChange}
        required
      />
      <button className="form-button" type="submit">
        Save
      </button>
    </form>
  );
};

export default AddOrder;
