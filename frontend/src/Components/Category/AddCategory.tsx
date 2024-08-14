import React, { ChangeEvent, SyntheticEvent, useState } from "react";

interface Props {
  closeOnSubmit: () => void;
  handleCategoryPopupSubmit: (e: SyntheticEvent, closeOnSubmit: () => void) => void;
  handleCategoryPopupNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AddCategory = ({
  handleCategoryPopupSubmit,
  handleCategoryPopupNameChange,
  closeOnSubmit,
}: Props) => {
  return (
    <form
      className="poppup-child-form"
      onSubmit={(e) => handleCategoryPopupSubmit(e, closeOnSubmit)}>
      <label className="form-label">Category Name:</label>
      <input
        className="form-input"
        type="text"
        name="categoryName"
        onChange={handleCategoryPopupNameChange}
        required
      />
      <button className="form-button" type="submit">
        Save
      </button>
    </form>
  );
};

export default AddCategory;
