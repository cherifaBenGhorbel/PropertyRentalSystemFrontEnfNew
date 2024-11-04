import { Owner } from "./owner.model";
export class OwnerWrapper {
    _embedded!: { owners: Owner[] };
}