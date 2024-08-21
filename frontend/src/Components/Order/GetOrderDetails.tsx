import React from "react";
import { Link } from "react-router-dom";

interface Props {
  orderId: number;
}

const GetOrderDetails = (props: Props) => {
  return (
    <Link
      to={`/orderDetails/${props.orderId}`}
      className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
    >
      Order details
    </Link>
  );
};

export default GetOrderDetails;
