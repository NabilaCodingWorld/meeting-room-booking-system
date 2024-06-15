import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SlotService } from "./slot.service";
import { Request, Response } from "express";

const createSlot = catchAsync(async (req: Request, res: Response) => {
  const result = await SlotService.createSlotIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Slots created successfully",
    data: result,
  });
});

const getAvailableSlots = catchAsync(async (req: Request, res: Response) => {
  const { date, roomId } = req.query;
  const result = await SlotService.getAvailableSlots(date as string, roomId as string);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Available slots retrieved successfully",
    data: result,
  });
});

export const SlotController = {
  createSlot,
  getAvailableSlots,
};
