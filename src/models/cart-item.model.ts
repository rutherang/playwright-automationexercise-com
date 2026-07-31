export interface CartItem {
  name: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export type ExpectedCartItem = Omit<CartItem, 'total'>;