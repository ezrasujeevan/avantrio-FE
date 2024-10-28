export interface IAppState {
  language: string;
}

export interface Product {
  id: number;
  name: string;
  unitPrice: number;
}
export interface Cart extends Product {
  quantity: number;
}
