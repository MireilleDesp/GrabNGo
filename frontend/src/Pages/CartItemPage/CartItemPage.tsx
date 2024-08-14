import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import CartItems from "../../Components/CartItem/CartItems";
import Search from "../../Components/Search/Search";
import { UserCartItemsGet } from "../../Models/CartItem";
import { getCartItems, getSearchedCartItems } from "../../Services/CartItemService";
import CartTotal from "../../Components/Cart/CartTotal";

type Props = {};

const CartItemPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");
  const [cartItemsResult, setCartItemsResult] = useState<UserCartItemsGet[]>(
    []
  );

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
  return (
    <>
      <Search
        usedForComponent="cart items"
        search={search}
        changeSearchHandler={changeSearchCartItemHandler}
        onSearchSubmit={searchCartItemSubmitHandler}
      />
      <CartItems cartItemsData={cartItemsResult} />
      <CartTotal cartItemsData={cartItemsResult}/>
      {serverError && <h1>{serverError}</h1>}
    </>
  );
};

export default CartItemPage;
