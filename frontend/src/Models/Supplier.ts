export interface SupplierGet {
  id: number;
  name: string;
  contactName: string;
  phoneNumber: string;
  email: string;
  address: string;
}

export interface SupplierPost {
  name: string;
  contactName: string;
  phoneNumber: string;
  email: string;
  address: string;
}
