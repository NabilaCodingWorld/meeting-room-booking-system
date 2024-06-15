import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RoomService } from "./room.service";

const createRoom = catchAsync(async (req, res) => {
  const result = await RoomService.createRoomIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room added successfully",
    data: result,
  });
});
const getSingleRoom = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await RoomService.getSingleRoomFromDB(id as string);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room retrieved successfully",
    data: result,
  });
});

const getAllRooms = catchAsync(async (req, res) => {
 
  const result = await RoomService.getAllRoomFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room retrieved successfully",
    data: result,
  });
});

const updateRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoomService.updateRoomInDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room updated successfully",
    data: result,
  });
});

const deleteSingleRoom = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await RoomService.deleteSingleRoomFromDB(id as string);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room deleted successfully",
    data: result,
  });
});

export const RoomController = {
  createRoom,
  getSingleRoom,
  getAllRooms,
  updateRoom,
  deleteSingleRoom
};
