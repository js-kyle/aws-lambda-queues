import Ajv, { JSONSchemaType } from "ajv";
import { betterAjvErrors } from "@apideck/better-ajv-errors";
const ajv = new Ajv({ allErrors: true });

interface Order {
  quantity: number;
  productId: string;
}

const orderSchema: JSONSchemaType<Order> = {
  type: "object",
  properties: {
    quantity: { type: "integer" },
    productId: { type: "string" },
  },
  required: ["quantity", "productId"],
  additionalProperties: false,
};

export const validateOrder = (order: any) => {
  const valid = ajv.validate(orderSchema, order);
  let errors;
  if (!valid) {
    errors = betterAjvErrors({
      schema: orderSchema,
      data: order,
      errors: ajv.errors,
    });
  }
  return { valid, errors };
};
