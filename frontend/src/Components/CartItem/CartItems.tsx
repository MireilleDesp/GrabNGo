import { UserCartItemsGet } from "../../Models/CartItem";
import Table from "../Table/Table";
import Spinner from "../Spinners/Spinner";
import { formatPrice } from "../../Helpers/Formatting";

interface Props {
  cartItemsData: UserCartItemsGet[];
}
const config = [
  {
    label: "",
    render: (product: UserCartItemsGet) => (
      <img
        className="ProductImg"
        src={product.productImage}
        alt="Product Image"
      />
    ),
  },
  {
    label: "Product",
    render: (product: UserCartItemsGet) => product.productName,
  },
  {
    label: "Unit price",
    render: (product: UserCartItemsGet) => <>{formatPrice(product.price)}</>,
  },
  {
    label: "Quantity",
    render: (product: UserCartItemsGet) => product.quantity,
  },
  ,
  {
    label: "Price",
    render: (product: UserCartItemsGet) => (
      <>{formatPrice(product.quantity * product.price)}</>
    ),
  },
];

const CartItems = ({ cartItemsData }: Props) => {
  return cartItemsData ? (
    <Table config={config} data={cartItemsData}></Table>
  ) : (
    <Spinner />
  );
};

export default CartItems;
