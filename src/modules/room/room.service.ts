import { IRoom } from "./room.interface";
import { Room } from "./room.model";

const createRoomIntoDB = async (payload: IRoom) => {
  const result = await Room.create(payload);
  return result;
};

const getSingleRoomFromDB = async (id: string) => {
  const result = await Room.findById(id);
  return result;
};
const getAllRoomFromDB = async () => {
  const result = await Room.find();
  return result;
};

const updateRoomInDB = async (id: string, payload: Partial<IRoom>) => {
  const result = await Room.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deleteSingleRoomFromDB = async (id: string) => {
  const result = await Room.findByIdAndDelete(id);
  return result;
};

export const RoomService = {
  createRoomIntoDB,
  getSingleRoomFromDB,
  getAllRoomFromDB,
  updateRoomInDB,
  deleteSingleRoomFromDB
};
