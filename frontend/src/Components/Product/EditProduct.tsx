import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { ProductGet } from "../../Models/Product";
import { SupplierGet } from "../../Models/Supplier";
import { CategoryGet } from "../../Models/Category";
import ImagePicker from "../ImagePicker/ImagePicker";

interface Props {
  closeOnSubmit: () => void;
  handleEditProductPopupSubmit: (
    e: SyntheticEvent,
    closeOnSubmit: () => void
  ) => void;
  formData: ProductGet;
  suppliers: SupplierGet[];
  categories: CategoryGet[];
}

const EditProduct = ({
  handleEditProductPopupSubmit,
  closeOnSubmit,
  formData,
  suppliers,
  categories,
}: Props) => {
  const [productData, setSupplierData] = useState<ProductGet>(formData);

  const handleImageChange = (image: string) => {
    handleProductPopupInputChange({
      target: { name: "image", value: image },
    } as ChangeEvent<HTMLInputElement>);
  };

  const handleProductPopupInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setSupplierData({
      ...productData,
      [name]: value, // Dynamically update the field based on the input's name attribute
    });
  };

  // Function to find supplier by ID
  const getSupplierById = (id: number) => {
    return suppliers.find((supplier) => supplier.id === id);
  };
  const currentSupplier = getSupplierById(formData.supplierId);
  // Function to find category by ID
  const getCategoryById = (id: number) => {
    return categories.find((category) => category.id === id);
  };
  const currentCategory = getCategoryById(formData.categoryId);

  return (
    <form
      className="poppup-child-form"
      onSubmit={(e) => handleEditProductPopupSubmit(e, closeOnSubmit)}
    >
      <label className="form-label">Product:</label>
      <input
        className="form-input"
        type="text"
        name="name"
        placeholder="Product name"
        value={productData.name}
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
        value={productData.price}
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
        value={productData.quatityInStock}
        onChange={handleProductPopupInputChange}
        required
      />
      <input
        className="form-input"
        type="text"
        placeholder="Description"
        name="description"
        value={productData.description}
        onChange={handleProductPopupInputChange}
        required
      />
      <ImagePicker
        image={productData.image}
        onImageChange={handleImageChange}
      />

      <select
        className="form-input"
        name="supplierId"
        value={productData.supplierId || ""}
        onChange={handleProductPopupInputChange}
        required
      >
        <option value="">Select Supplier</option>
        {suppliers.map((supplier) => (
          <option key={supplier.id} value={supplier.id}>
            {supplier.name}
          </option>
        ))}
      </select>
      <select
        className="form-input"
        name="categoryId"
        value={productData.categoryId || ""}
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

export default EditProduct;
