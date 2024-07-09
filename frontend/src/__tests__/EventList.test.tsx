import { render, screen } from "@testing-library/react";
import EventList from "../components/EventList";
import { Event } from "../types";
import "@testing-library/jest-dom";

const events: Event[] = [
  {
    _id: "1",
    name: "Test Event",
    description: "Test Description",
    startDate: "2024-07-07T10:00:00Z",
    endDate: "2024-07-07T11:00:00Z",
    timezone: "America/New_York",
    color: "#7cd992",
  },
];

test("renders EventList with events", () => {
  render(<EventList events={events} />);
  expect(screen.getByText(/Test Event/i)).toBeInTheDocument();
  expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
  expect(screen.getByText(/America\/New_York/i)).toBeInTheDocument();
});
