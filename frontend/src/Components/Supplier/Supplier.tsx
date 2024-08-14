import React, { SyntheticEvent, useEffect, useState } from "react";
import { SupplierGet } from "../../Models/Supplier";
import Table from "../Table/Table";
import Spinner from "../Spinners/Spinner";
import DeleteElement from "../DeleteElement/DeleteElement";
import EditPopup from "../PopupBoxes/EditPopup";
import EditSupplier from "./EditSupplier";

interface Props {
  onDeleteProduct: (e: SyntheticEvent) => void;
  supplierData: SupplierGet[];
  closeOnSubmit: () => void;
  handleEditSupplierPopupSubmit: (
    e: SyntheticEvent,
    closeOnSubmit: () => void
  ) => void;
}

const Supplier = ({
  supplierData,
  onDeleteProduct,
  closeOnSubmit,
  handleEditSupplierPopupSubmit,
}: Props) => {
  const config = [
    {
      label: "Supplier name",
      render: (supplier: SupplierGet) => supplier.name,
    },
    {
      label: "Contact person",
      render: (supplier: SupplierGet) => supplier.contactName,
    },
    {
      label: "Address",
      render: (supplier: SupplierGet) => supplier.address,
    },
    {
      label: " ",
      render: (supplier: SupplierGet) => (
        <div className="content-wrapper ">
          <div>
            <EditPopup
              children={
                <EditSupplier
                  handleEditSupplierPopupSubmit={handleEditSupplierPopupSubmit}
                  supplierInput={supplier}
                  closeOnSubmit={closeOnSubmit}
                />
              }
            />
          </div>

          <div>
            <DeleteElement
              onDeleteElement={onDeleteProduct}
              elementId={supplier.id}
              elementName={supplier.name}
            />
          </div>
        </div>
      ),
    },
  ];
  return supplierData ? (
    <Table config={config} data={supplierData}></Table>
  ) : (
    <Spinner />
  );
};

export default Supplier;
