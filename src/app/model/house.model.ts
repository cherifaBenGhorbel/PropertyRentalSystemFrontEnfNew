import { Owner } from "./owner.model";

export class House {
    idHouse!: number;
    address!: string;
    rentPrice!: number;
    status!: string; // available, rented
    owner!: Owner;
}
