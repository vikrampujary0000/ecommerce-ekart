import { CartItem } from "./cartItem";

export interface Order {
    _id?: string,
    date: Date;
    items: CartItem[];
    address: any;
    paymentType: string;
    status?: string;
}
