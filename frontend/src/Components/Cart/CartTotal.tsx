import { formatPrice } from "../../Helpers/Formatting";
import { UserCartItemsGet } from "../../Models/CartItem";
import Spinner from "../Spinners/Spinner";
import "./CartTotal.css"; // Import the CSS file for styling

interface Props {
  cartItemsData: UserCartItemsGet[];
}

const CartItems = ({ cartItemsData }: Props) => {
  // Calculate the total price
  const totalPrice = cartItemsData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return cartItemsData ? (
    <div className="cart-container">
      <div className="total-price">
        Total to Pay: <span>{formatPrice(totalPrice)}</span>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default CartItems;
