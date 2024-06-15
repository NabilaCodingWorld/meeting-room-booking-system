import { ISlot } from "./slot.interface";
import { Slot } from "./slot.model";

const createSlotIntoDB = async (payload: ISlot) => {
    const { room, date, startTime, endTime } = payload;
  
    // Convert start and end times to minutes since midnight
    const startMinutes = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
    const endMinutes = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);
  
    const slotDuration = 60; // 60 minutes per slot
    const totalSlots = (endMinutes - startMinutes) / slotDuration;
  
    const slots = [];
  
    for (let i = 0; i < totalSlots; i++) {
      const slotStartTime = new Date();
      slotStartTime.setHours(0, startMinutes + i * slotDuration, 0, 0);
      const slotEndTime = new Date();
      slotEndTime.setHours(0, startMinutes + (i + 1) * slotDuration, 0, 0);
  
      const formattedStartTime = `${String(slotStartTime.getHours()).padStart(2, '0')}:${String(slotStartTime.getMinutes()).padStart(2, '0')}`;
      const formattedEndTime = `${String(slotEndTime.getHours()).padStart(2, '0')}:${String(slotEndTime.getMinutes()).padStart(2, '0')}`;
  
      // Check if the slot already exists
      const existingSlot = await Slot.findOne({
        room,
        date,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      });
  
      if (existingSlot) {
        throw new Error(`Slot already exists for this room on date ${date} from ${formattedStartTime} to ${formattedEndTime}`);
      }
  
      const slot = new Slot({
        room,
        date,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        isBooked: false,
      });
  
      await slot.save();
      slots.push(slot);
    }
  
    return slots;
  };

const getAvailableSlots = async (date?: string, roomId?: string) => {

    const query: any = { isBooked: false };
  
    if (date) {
      query.date = date;
    }
  
    if (roomId) {
      query.room = roomId;
    }

  
    const slots = await Slot.find(query).populate('room');
  
    return slots;
  };


export const SlotService = {
  createSlotIntoDB,
  getAvailableSlots,
};
