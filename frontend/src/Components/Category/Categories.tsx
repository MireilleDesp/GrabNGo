import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import Table from "../Table/Table";
import Spinner from "../Spinners/Spinner";
import { CategoryGet } from "../../Models/Category";
import DeleteElement from "../DeleteElement/DeleteElement";
import EditCategory from "./EditCategory";
import AddForm from "../PopupBoxes/AddPopup";
import EditPopup from "../PopupBoxes/EditPopup";

interface Props {
  categoriesData: CategoryGet[];
  closeOnSubmit: () => void;
  handleEditCategoryPopupSubmit: (
    e: SyntheticEvent,
    closeOnSubmit: () => void
  ) => void;
  onDeleteCategory: (e: SyntheticEvent) => void;
}

const Categories = ({
  categoriesData,
  closeOnSubmit,
  onDeleteCategory,
  handleEditCategoryPopupSubmit,
}: Props) => {
  const config = [
    {
      label: "Category",
      render: (category: CategoryGet) => category.name,
    },
    {
      label: " ",
      render: (category: CategoryGet) => (
        <div className="content-wrapper ">
          <div>
            <EditPopup
              children={
                <EditCategory
                  handleEditCategoryPopupSubmit={handleEditCategoryPopupSubmit}
                  categoryInput={category}
                  closeOnSubmit={closeOnSubmit}
                />
              }
            />
          </div>

          <div>
            <DeleteElement
              onDeleteElement={onDeleteCategory}
              elementId={category.id}
              elementName={category.name}
            />
          </div>
        </div>
      ),
    },
  ];

  return categoriesData ? (
    <Table config={config} data={categoriesData}></Table>
  ) : (
    <Spinner />
  );
};

export default Categories;
{
  /* </div>
      ),
    },
    ,
    {
      label: " ",
      render: (category: CategoryGet) => (
        <div className="content-wrapper "> */
}
