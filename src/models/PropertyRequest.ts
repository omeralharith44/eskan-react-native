import { Property } from "./Property";
import { RentalTerm } from "./RentalTerm";
import { Status } from "./Status";
import { TenantType } from "./TenantType";
import { User } from "./User";

export type PropertyRequest = {
  id: number;
  userId: number;
  user: User;
  propertyId: number;
  property: Property;
  tenantTypesId: number;
  tenantType: TenantType;
  rentalTermId: number;
  rentalTerm: RentalTerm;
  statusId: number;
  status: Status;
  period: number;
};
