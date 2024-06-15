import { z } from "zod";

const createRoomValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    roomNo: z
      .number({ required_error: "Room number is required" })
      .int()
      .nonnegative(),
    floorNo: z
      .number({ required_error: "Floor number is required" })
      .int()
      .nonnegative(),
    capacity: z
      .number({ required_error: "Capacity is required" })
      .int()
      .nonnegative(),
    pricePerSlot: z
      .number({ required_error: "Price per slot is required" })
      .nonnegative(),
    amenities: z.array(z.string({ required_error: "Amenity is required" }), {
      required_error: "Amenities are required",
    }),
  }),
});


const updateRoomValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    roomNo: z.number().int().nonnegative().optional(),
    floorNo: z.number().int().nonnegative().optional(),
    capacity: z.number().int().nonnegative().optional(),
    pricePerSlot: z.number().nonnegative().optional(),
    amenities: z.array(z.string()).optional(),
  }),
});

export const RoomValidation = {
  createRoomValidationSchema,
  updateRoomValidationSchema
};
