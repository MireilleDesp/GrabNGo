import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import CartItems from "../../Components/CartItem/CartItems";
import Search from "../../Components/Search/Search";
import { UserCartItemsGet } from "../../Models/CartItem";
import {
  getCartItems,
  getSearchedCartItems,
} from "../../Services/CartItemService";
import CartTotal from "../../Components/Cart/CartTotal";
import AddOrder from "../../Components/Order/AddOrder";
import { OrderPost } from "../../Models/Order";
import { postOrder } from "../../Services/OrderService";
import PlaceOrderPopup from "../../Components/PopupBoxes/PlaceOrderPopup";
import { useNavigate } from "react-router-dom";

type Props = {};

const CartItemPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");
  const [cartItemsResult, setCartItemsResult] = useState<UserCartItemsGet[]>(
    []
  );

  const [orderData, setOrderData] = useState<OrderPost>({
    paymentMethod: "",
    amount: 0,
    shippingAddress: "",
  });

  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const result = await getCartItems();
        if (typeof result === "string") {
          setServerError(result);
        } else if (Array.isArray(result!.data)) {
          setCartItemsResult(result!.data);
        }
      } catch (error) {
        setServerError("An error occurred while fetching cart items.");
      }
    };

    fetchCartItems();
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  const changeSearchCartItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchCartItemSubmitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await getSearchedCartItems(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result!.data)) {
      setCartItemsResult(result!.data);
    }
  };

  const handleOrderPopupSubmit = async (
    e: SyntheticEvent,
    close: () => void
  ) => {
    e.preventDefault();

    const { paymentMethod, shippingAddress } = orderData;
    // Calculate the total amount
    const amount = cartItemsResult.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const result = await postOrder(paymentMethod, amount, shippingAddress);
    if (typeof result === "string") {
      setServerError(result);
    } else if (result!.data) {
      setOrderData(result!.data);
      close();
      navigate("/order"); // Redirect to the order page
    }
  };

  return (
    <>
      <Search
        usedForComponent="cart items"
        search={search}
        changeSearchHandler={changeSearchCartItemHandler}
        onSearchSubmit={searchCartItemSubmitHandler}
      />
      <CartItems cartItemsData={cartItemsResult} />

      {cartItemsResult.length > 0 && (
        <PlaceOrderPopup
          children={
            <AddOrder
              closeOnSubmit={() => {}}
              handleOrderPopupSubmit={handleOrderPopupSubmit}
              formData={orderData}
              setOrderData={setOrderData}
            />
          }
        />
      )}
      <CartTotal cartItemsData={cartItemsResult} />
      {serverError && <h1>{serverError}</h1>}
    </>
  );
};

export default CartItemPage;
