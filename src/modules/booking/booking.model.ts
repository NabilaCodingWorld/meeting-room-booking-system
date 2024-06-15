import { Schema, model } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>({
  date: { type: String, required: true },
  slots: [{ type: Schema.Types.ObjectId, ref: "Slot" }],
  room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  isConfirmed:{type:String,enum: ["confirmed", "unconfirmed"],default:"unconfirmed"},
  totalAmount:{ type: Number, required: true },
  isDeleted:{ type: Boolean, default: false },
});

export const Booking = model<IBooking>("Booking", bookingSchema);
