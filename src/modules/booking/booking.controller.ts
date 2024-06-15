import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { BookingService } from "./booking.service";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.createBookingIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking created successfully",
    data: result,
  });
});

const getBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getBookingsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All bookings retrieved successfully",
    data: result,
  });
});
const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await BookingService.getMyBookingsFromDB(token as string);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User bookings retrieved successfully",
    data: result,
  });
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const result = await BookingService.updateBookingInDB(id, updateData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking updated successfully",
    data: result,
  });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookingService.deleteBookingFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking deleted successfully",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getBookings,
  getMyBookings,
  updateBooking,
  deleteBooking,
};
