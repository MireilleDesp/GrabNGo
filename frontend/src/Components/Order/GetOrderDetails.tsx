import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const GetOrderDetails = (props: Props) => {
  return (
    <Link to="/orderDetails/:orderId" className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70">
      Order details
    </Link>
  );
};

export default GetOrderDetails;
