import { Link } from "react-router-dom";
import { FaHome, FaTable, FaMoneyBill } from "react-icons/fa";
import {
  BsCartFill,
  BsBagHeart,
  BsBoxes,
  BsChatRightText,
} from "react-icons/bs";
import { useAuth } from "../../Context/useAuth";
import { useEffect, useState } from "react";
import { OrderGet } from "../../Models/Order";
import { getOrders, getUserOrders } from "../../Services/OrderService";

type Props = {};

const Sidebar = (props: Props) => {
  const { isLoggedIn, user, isAdmin } = useAuth();
  const [ordersResult, setOrdersResult] = useState<OrderGet[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await getOrders();
      if (typeof result === "string") {
        setServerError(result);
      } else if (Array.isArray(result!.data)) {
        setOrdersResult(result!.data);
      }
    };
    if (isLoggedIn()) fetchOrders();
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  return (
    <>
      {isLoggedIn() && (
        <nav className="block py-4 px-6 top-0 bottom-0 w-50 bg-white shadow-xl left-0 absolute flex-row flex-nowrap md:z-10 z-9999 transition-all duration-300 ease-in-out transform md:translate-x-0 -translate-x-full">
          <div className="flex-col min-h-full px-0 flex flex-wrap items-center justify-between w-full mx-auto overflow-y-auto overflow-x-hidden">
            <div className="flex bg-white flex-col items-stretch opacity-100 relative mt-4 overflow-y-auto overflow-x-hidden h-auto z-40 items-center flex-1 rounded w-full">
              <div className="md:flex-col md:min-w-full flex flex-col list-none">
                <Link
                  to="/"
                  className="flex md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
                >
                  <FaHome />
                  <h6 className="ml-3">Home</h6>
                </Link>
                <Link
                  to="product"
                  className="flex md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
                >
                  <BsCartFill />
                  <h6 className="ml-3">Products</h6>
                </Link>
                <Link
                  to="cartItem"
                  className="flex md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
                >
                  <BsBagHeart />
                  <h6 className="ml-3">Cart Items</h6>
                </Link>
                {isAdmin() && (
                  <>
                    <Link
                      to="category"
                      className="flex md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
                    >
                      <BsBoxes />
                      <h6 className="ml-3">Categories</h6>
                    </Link>
                    <Link
                      to="supplier"
                      className="flex md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
                    >
                      <BsChatRightText />
                      <h6 className="ml-3">Suppliers</h6>
                    </Link>
                  </>
                )}
                {ordersResult.length > 0 && (
                  <>
                    <Link
                      to="order"
                      className="flex md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
                    >
                      <FaMoneyBill />
                      <h6 className="ml-3">Orders</h6>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Sidebar;
function setServerError(result: never) {
  throw new Error("Function not implemented.");
}
