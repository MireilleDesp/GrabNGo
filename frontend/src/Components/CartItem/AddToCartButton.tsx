import { SyntheticEvent, useState } from "react";

interface Props {
  onAddToCart: (e: SyntheticEvent) => void;
  productId: number;
}

const AddToCartButton = ({ onAddToCart, productId }: Props) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0">
      <button
        type="button"
        onClick={handleDecrease}
        className="p-2 px-4 bg-gray-300 rounded-lg hover:opacity-70 focus:outline-none"
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        type="button"
        onClick={handleIncrease}
        className="p-2 px-4 bg-gray-300 rounded-lg hover:opacity-70 focus:outline-none"
      >
        +
      </button>

      <form onSubmit={onAddToCart}>
        <input readOnly={true} hidden={true} value={productId} />
        <input readOnly={true} hidden={true} value={quantity} />
        <button
          type="submit"
          className="buttonMargin p-2 px-8 text-white bg-lightGreen rounded-lg hover:opacity-70 focus:outline-none"
        >
          Add to cart
        </button>
      </form>
    </div>
  );
};

export default AddToCartButton;
