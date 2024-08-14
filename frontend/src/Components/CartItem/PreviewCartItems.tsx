import { SyntheticEvent } from "react";
import Cart from "../Cart/Cart";
import { UserCartItemsGet } from "../../Models/CartItem";

interface Props {
  cartItems: UserCartItemsGet[];
  onRemoveFromCart: (e: SyntheticEvent) => void;
}

const PreviewCartItems = ({ cartItems, onRemoveFromCart }: Props) => {
  return (
    <section>
      <h5 className="mb-2 mt-2 font-semibold text-center md:text-xl">
        My items
      </h5>
      <div className="centerElement relative flex flex-col items-center max-w-xl mx-auto space-y-10 px-10 mb-5 md:px-6 md:space-y-0 md:space-x-7 md:flex-row">
        <>
          {cartItems.length > 0 ? (
            cartItems.map((cartItem) => {
              return (
                <Cart
                  onRemoveFromCart={onRemoveFromCart}
                  key={cartItem.id}
                  cartValue={cartItem.productName}
                  productImage={cartItem.productImage}
                  cartItemQuantity={cartItem.quantity}
                  cartItemId={cartItem.id}
                  cartItemPrice= {cartItem.price}
                />
              );
            })
          ) : (
            <h3 className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
              {/* Your cart is empty. */}
            </h3>
          )}
        </>
      </div>
    </section>
  );
};

export default PreviewCartItems;

