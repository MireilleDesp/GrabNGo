export interface OrderGet {
  id: number;
  createdOn: string;
  paymentMethod: string;
  amount: number;
  status: number;
  appUserName: string;
  shippingAddress : string;
}
