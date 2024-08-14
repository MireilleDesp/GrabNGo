import { OrderGet } from "../../Models/Order";
import Table from "../Table/Table";
import Spinner from "../Spinners/Spinner";
import { formatDate } from "../../Helpers/Formatting";
import GetOrderDetails from "./GetOrderDetails";

interface Props {
  orderData: OrderGet[];
}



const Order = ({ orderData }: Props) => {
  const config = [
    {
      label: "Order record",
      render: (order: OrderGet) => order.appUserName,
    },
    {
      label: "Payment status",
      render: (order: OrderGet) =>
        order.status == 0
          ? "pending"
          : order.status == 1
          ? "success"
          : "failure",
    },
    {
      label: "Total amount",
      render: (order: OrderGet) => order.amount,
    },
    {
      label: "Shipping address",
      render: (order: OrderGet) => order.shippingAddress,
    },
    {
      label: "Order date",
      render: (order: OrderGet) => formatDate(order.createdOn),
    },
    {
      label: "",
      render: (order: OrderGet) => <GetOrderDetails />,
    },
  ];

  return orderData ? (
    <Table config={config} data={orderData}></Table>
  ) : (
    <Spinner />
  );
};

export default Order;
