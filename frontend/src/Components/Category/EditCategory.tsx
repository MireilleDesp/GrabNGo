import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { CategoryGet } from "../../Models/Category";

interface Props {
  closeOnSubmit: () => void;
  handleEditCategoryPopupSubmit: (
    e: SyntheticEvent,
    closeOnSubmit: () => void
  ) => void;
  categoryInput: CategoryGet;
}

const EditCategory = ({
  handleEditCategoryPopupSubmit,
  closeOnSubmit,
  categoryInput,
}: Props) => {
  const [categoryData, setCategoryData] = useState<CategoryGet>(categoryInput);

  const handleCategoryPopupNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryData({
      ...categoryData,
      name: e.target.value,
    });
  };

  return (
    <form
      className="poppup-child-form"
      onSubmit={(e) => handleEditCategoryPopupSubmit(e, closeOnSubmit)}
    >
      {/* Hidden input to store the ID */}
      <input type="hidden" name="categoryId" value={categoryData.id} />
      <label className="form-label">Category Name:</label>
      <input
        className="form-input"
        type="text"
        name="categoryName"
        value={categoryData.name}
        onChange={handleCategoryPopupNameChange}
        required
      />
      <button className="form-button" type="submit">
        Save
      </button>
    </form>
  );
};

export default EditCategory;
