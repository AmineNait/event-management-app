import { Event } from "../models/Event";

export const createEvent = async (data: any) => {
  const event = new Event(data);
  await event.save();
  return event;
};

export const getAllEvents = async () => {
  return await Event.find();
};

export const getEventById = async (id: string) => {
  return await Event.findById(id);
};
