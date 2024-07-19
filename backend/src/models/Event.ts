import { Schema, model } from "mongoose";

interface IEvent {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  timezone: string;
  color: string;
}

// Schéma de l'événement dans MongoDB avec des validations supplémentaires
const eventSchema = new Schema<IEvent>({
  name: { type: String, required: true, maxlength: 32 },
  description: { type: String, required: true },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: (value: Date) => {
        return value >= new Date();
      },
      message: "La date de début doit être dans le futur",
    },
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (this: IEvent, value: Date) {
        return value > this.startDate;
      },
      message: "La date de fin doit être après la date de début",
    },
  },
  timezone: { type: String, required: true },
  color: { type: String, required: true },
});

export const Event = model<IEvent>("Event", eventSchema);
