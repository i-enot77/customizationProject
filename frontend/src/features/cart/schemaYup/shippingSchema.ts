import { object, string, ObjectSchema } from "yup";

export interface ShippingSchema {
  shippingMethod: string;
}

export const shippingSchema: ObjectSchema<ShippingSchema> = object({
  shippingMethod: string().required("Metoda dostawy jest wymagana"),
});
