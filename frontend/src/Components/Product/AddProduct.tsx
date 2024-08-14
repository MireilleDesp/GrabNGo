import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { ProductPost } from "../../Models/Product";
import { SupplierGet } from "../../Models/Supplier";
import { CategoryGet } from "../../Models/Category";
import ImagePicker from "../ImagePicker/ImagePicker";

interface Props {
  closeOnSubmit: () => void;
  handleProductPopupSubmit: (
    e: SyntheticEvent,
    closeOnSubmit: () => void
  ) => void;
  handleProductPopupInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  formData: ProductPost;
  suppliers: SupplierGet[];
  categories: CategoryGet[];
}

const AddProduct = ({
  handleProductPopupSubmit,
  handleProductPopupInputChange,
  closeOnSubmit,
  formData,
  suppliers,
  categories,
}: Props) => {
  const handleImageChange = (image: string) => {
    handleProductPopupInputChange({
      target: { name: "image", value: image },
    } as ChangeEvent<HTMLInputElement>);
  };
  return (
    <form
      className="poppup-child-form"
      onSubmit={(e) => handleProductPopupSubmit(e, closeOnSubmit)}
    >
      <label className="form-label">Product:</label>
      <input
        className="form-input"
        type="text"
        name="name"
        placeholder="Product name"
        value={formData.name}
        onChange={handleProductPopupInputChange}
        required
      />
      <label htmlFor="price">Price:</label>
      <input
        className="form-input"
        type="number"
        placeholder="Product price"
        name="price"
        id="price"
        value={formData.price}
        onChange={handleProductPopupInputChange}
        required
      />
      <label htmlFor="quatityInStock">Quatity in stock:</label>
      <input
        className="form-input"
        type="number"
        placeholder="Quatity in stock"
        name="quatityInStock"
        id="quatityInStock"
        value={formData.quatityInStock}
        onChange={handleProductPopupInputChange}
        required
      />
      <input
        className="form-input"
        type="text"
        placeholder="Description"
        name="description"
        value={formData.description}
        onChange={handleProductPopupInputChange}
        required
      />
      <ImagePicker image={formData.image} onImageChange={handleImageChange} />
      <select
        className="form-input"
        name="supplierId"
        value={formData.supplierId}
        onChange={handleProductPopupInputChange}
        required
      >
        <option value="">Select Supplier</option>
        {suppliers.map((supplier) => (
          <option key={supplier.id} value={supplier.id}>
            {supplier.name}
          </option>
        ))}
        required
      </select>
      <select
        className="form-input"
        name="categoryId"
        value={formData.categoryId}
        onChange={handleProductPopupInputChange}
        required
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button className="form-button" type="submit">
        Save
      </button>
    </form>
  );
};

export default AddProduct;
