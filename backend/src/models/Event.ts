import { Schema, model } from "mongoose";

// Schéma de l'événement dans MongoDB
const eventSchema = new Schema({
  name: { type: String, required: true, maxlength: 32 },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  timezone: { type: String, required: true },
  color: { type: String, required: true },
});

export const Event = model("Event", eventSchema);
