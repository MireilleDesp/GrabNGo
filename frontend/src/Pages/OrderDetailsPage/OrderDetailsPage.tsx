import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import Order from "../../Components/Order/Order";
import { getUserOrders } from "../../Services/OrderService";
import { OrderGet } from "../../Models/Order";
import Search from "../../Components/Search/Search";

type Props = {};

const OrderDetailsPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");
  const [ordersResult, setOrdersResult] = useState<OrderGet[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await getUserOrders(search);
        if (typeof result === "string") {
          setServerError(result);
        } else if (Array.isArray(result!.data)) {
          setOrdersResult(result!.data);
        }
      } catch (error) {
        setServerError("An error occurred while fetching cart items.");
      }
    };

    fetchOrders();
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  const changeSearchOrderHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchOrderSubmitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await getUserOrders(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result!.data)) {
      setOrdersResult(result!.data);
    }
  };

  return (
    <>
      <Search
        usedForComponent="orders"
        search={search}
        changeSearchHandler={changeSearchOrderHandler}
        onSearchSubmit={searchOrderSubmitHandler}
      />
      {ordersResult && <Order orderData={ordersResult} />}
      {serverError && <h1>{serverError}</h1>}
    </>
  );
};

export default OrderDetailsPage;
