import { SyntheticEvent } from "react";
import { ProductGet } from "../../Models/Product";
import Table from "../Table/Table";
import Spinner from "../Spinners/Spinner";
import AddToCartButton from "../CartItem/AddToCartButton";
import DeleteElement from "../DeleteElement/DeleteElement";
import EditPopup from "../PopupBoxes/EditPopup";
import EditProduct from "./EditProduct";
import { SupplierGet } from "../../Models/Supplier";
import { CategoryGet } from "../../Models/Category";
import { useAuth } from "../../Context/useAuth";

interface Props {
  onAddToCart: (e: SyntheticEvent) => void;
  onDeleteProduct: (e: SyntheticEvent) => void;
  productData: ProductGet[];
  closeOnSubmit: () => void;
  handleEditProductPopupSubmit: (
    e: SyntheticEvent,
    closeOnSubmit: () => void
  ) => void;
  suppliers: SupplierGet[];
  categories: CategoryGet[];
}
const Product = ({
  onAddToCart,
  onDeleteProduct,
  productData,
  closeOnSubmit,
  handleEditProductPopupSubmit,
  suppliers,
  categories,
}: Props) => {
  const { isAdmin } = useAuth();

  const config = [
    {
      label: " ",
      render: (product: ProductGet) => (
        <img className="ProductImg" src={product.image} alt="Product Image" />
      ),
    },
    {
      label: "Product",
      render: (product: ProductGet) => product.name,
    },
    {
      label: "Description",
      render: (product: ProductGet) => product.description,
    },
    {
      label: "Price",
      render: (product: ProductGet) => <>{product.price} €</>,
    },

    // Conditionally add the AddToCartButton if the user is not an admin
    ...(!isAdmin()
      ? [
          {
            label: " ",
            render: (product: ProductGet) => (
              <AddToCartButton
                onAddToCart={onAddToCart}
                productId={product.id}
              />
            ),
          },
        ]
      : []),
    // Conditionally add these elements if the user is an admin
    ...(isAdmin()
      ? [
          {
            label: " ",
            render: (product: ProductGet) => (
              <div className="content-wrapper ">
                <div>
                  <EditPopup
                    children={
                      <EditProduct
                        handleEditProductPopupSubmit={
                          handleEditProductPopupSubmit
                        }
                        formData={product}
                        closeOnSubmit={closeOnSubmit}
                        categories={categories}
                        suppliers={suppliers}
                      />
                    }
                  />
                </div>

                <div>
                  <DeleteElement
                    onDeleteElement={onDeleteProduct}
                    elementId={product.id}
                    elementName={product.name}
                  />
                </div>
              </div>
            ),
          },
        ]
      : []),
  ];

  return productData ? (
    <Table config={config} data={productData}></Table>
  ) : (
    <Spinner />
  );
};

export default Product;
