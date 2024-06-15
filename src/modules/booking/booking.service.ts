import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { Room } from "../room/room.model";
import { Slot } from "../slot/slot.model";
import { User } from "../user/user.model";
import { IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import jwt, { JwtPayload } from "jsonwebtoken";
const createBookingIntoDB = async (payload: IBooking) => {
  const { date, slots, room, user } = payload;
  console.log(payload);
  try {
    // 1. Check if slots are available (not booked already)
    const bookedSlots = await Slot.find({
      _id: { $in: slots },
      isBooked: true,
    });

    if (bookedSlots.length > 0) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "One or more slots are already booked."
      );
    }

    // 2. Check for existing bookings for the same room on the same date
    const existingBooking = await Booking.findOne({ date, room });
    if (existingBooking) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "A booking already exists for this room on the same date."
      );
    }

    // 3. Create new Booking document
    const newBooking = await Booking.create({
      date,
      slots,
      room,
      user,
      totalAmount: 0, // Initialize totalAmount to 0 initially
    });

    // 4. Update slots to mark them as booked
    await Slot.updateMany({ _id: { $in: slots } }, { isBooked: true });

    // 5. Populate room, user, and slot details in the newBooking object
    //   await newBooking.populate('room').populate('user').execPopulate();
    await newBooking.populate("room");
    await newBooking.populate("user");

    // 6. Fetch room details for calculating totalAmount
    const roomDetails = await Room.findById(room);
    if (!roomDetails) {
      throw new Error("Room not found.");
    }

    // 7. Fetch user details
    const userDetails = await User.findById(user);
    if (!userDetails) {
      throw new Error("User not found.");
    }

    // 8. Calculate total amount based on the number of slots and pricePerSlot
    const totalAmount = slots.length * roomDetails.pricePerSlot;

    // 9. Update the booking document with totalAmount
    newBooking.totalAmount = totalAmount;
    await newBooking.save();

    // 10. Populate slots details
    const populatedSlots = await Slot.find({ _id: { $in: slots } });

    // 11. Format response data
    const responseData = {
      _id: newBooking._id,
      date: newBooking.date,
      slots: populatedSlots.map((slot) => ({
        _id: slot._id,
        room: slot.room,
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        isBooked: slot.isBooked,
      })),
      room: {
        _id: roomDetails._id,
        name: roomDetails.name,
        roomNo: roomDetails.roomNo,
        floorNo: roomDetails.floorNo,
        capacity: roomDetails.capacity,
        pricePerSlot: roomDetails.pricePerSlot,
        amenities: roomDetails.amenities,
        isDeleted: roomDetails.isDeleted,
      },
      user: {
        _id: userDetails._id,
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        address: userDetails.address,
        role: userDetails.role,
      },
      totalAmount: newBooking.totalAmount,
      isConfirmed: newBooking.isConfirmed,
      isDeleted: newBooking.isDeleted,
    };

    return responseData;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw any caught errors
  }
};

const getBookingsFromDB = async () => {
  try {
    // Fetch all bookings and populate related fields
    const bookings = await Booking.find()
      .populate("room")
      .populate("user", "-password")
      .populate("slots");

    return bookings;
  } catch (error) {
    throw error;
  }
};
const getMyBookingsFromDB = async (token: string) => {
  const extractedToken = token.split("Bearer ")[1];
  const decoded = jwt.verify(
    extractedToken,
    config.jwt_access_secret as string
  );

  const email = (decoded as JwtPayload).email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found.");
    }
    const bookings = await Booking.find({ user: user._id })
      .populate("room")
      .populate("slots");

    return bookings;
  } catch (error) {
    throw error;
  }
};

const updateBookingInDB = async (id: string, updateData: Partial<IBooking>) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("room")
      .populate("slots")
      .populate("user", "-password");

    if (!updatedBooking) {
      throw new Error("Booking not found.");
    }

    return updatedBooking;
  } catch (error) {
    throw error;
  }
};

const deleteBookingFromDB = async (id: string) => {
  try {
    const deletedBooking = await Booking.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    )
      .populate("room")
      .populate("slots")
      .populate("user", "-password");

    if (!deletedBooking) {
      throw new Error("Booking not found.");
    }

    return deletedBooking;
  } catch (error) {
    throw error;
  }
};

export const BookingService = {
  createBookingIntoDB,
  getBookingsFromDB,
  getMyBookingsFromDB,
  updateBookingInDB,
  deleteBookingFromDB,
};
