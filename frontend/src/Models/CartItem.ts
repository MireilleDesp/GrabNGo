export interface UserCartItemsGet {
  id: number;
  quantity: number;
  cartId: number;
  productId: number;
  productName: string;
  productImage: string;
  price: number;
}


export interface UserCartItemsPost {
  quantity: number;

}
