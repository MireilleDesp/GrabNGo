import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getOrderDetailsById,
  getUserOrders,
} from "../../Services/OrderService";
import Search from "../../Components/Search/Search";
import { UserCartItemsGet } from "../../Models/CartItem";
import OrderDetails from "../../Components/Order/OrderDetails";

type Props = {};

const OrderDetailsPage = (props: Props) => {
  const { orderId } = useParams<{ orderId: string }>();
  const [search, setSearch] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");
  const [orderDetailResult, setOrderDetailResult] = useState<
    UserCartItemsGet[]
  >([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (orderId) {
        try {
          const result = await getOrderDetailsById(orderId, search);
console.log(result)
          if (typeof result === "string") {
            setServerError(result);
          } else if (Array.isArray(result!.data)) {
            setOrderDetailResult(result!.data);
          }
        } catch (error) {
          setServerError("An error occurred while fetching cart items.");
        }
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const changeSearchOrderDetailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchOrderDetailsSubmitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (orderId) {
      try {
        const result = await getOrderDetailsById(orderId, search);
        if (typeof result === "string") {
          setServerError(result);
        } else if (Array.isArray(result!.data)) {
          setOrderDetailResult(result!.data);
        }
      } catch (error) {
        setServerError("An error occurred while fetching cart items.");
      }
    }
  };

  return (
    <>
      <Search
        usedForComponent="orders"
        search={search}
        changeSearchHandler={changeSearchOrderDetailHandler}
        onSearchSubmit={searchOrderDetailsSubmitHandler}
      />
      <OrderDetails cartItemsData={orderDetailResult} />
      {serverError && <h1>{serverError}</h1>}
    </>
  );
};

export default OrderDetailsPage;
