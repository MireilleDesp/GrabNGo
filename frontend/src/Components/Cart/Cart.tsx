import React, { SyntheticEvent } from "react";
import DeleteElement from "../DeleteElement/DeleteElement";

interface Props {
  cartValue: string;
  onRemoveFromCart: (e: SyntheticEvent) => void;
  cartItemId: number;
  cartItemQuantity: number;
  cartItemPrice: number;
  productImage: string;
}

const Cart = ({
  cartValue,
  cartItemId,
  cartItemQuantity,
  cartItemPrice,
  onRemoveFromCart,
  productImage,
}: Props) => {
  return (
    <div className="flex flex-col w-full space-y-4 text-center rounded-lg shadow-lg md:w-1/3">
      <p className="pt-3 text-xl font-bold">{cartValue}</p>
      <img className="mx-auto ProductImg" src={productImage} alt="Product Image"/>
      {cartItemQuantity} Units for {cartItemPrice} €
      <>
        <DeleteElement
          elementId={cartItemId}
          elementName={cartValue}
          onDeleteElement={onRemoveFromCart}
        />
      </>
    </div>
  );
};

export default Cart;
