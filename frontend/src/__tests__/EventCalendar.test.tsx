import { render, screen, fireEvent } from "@testing-library/react";
import EventCalendar from "../components/EventCalendar";
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

test("renders EventCalendar and shows event details in modal", () => {
  render(<EventCalendar events={events} />);
  fireEvent.click(screen.getByText(/Test Event/i));

  expect(screen.getByText(/Event Details/i)).toBeInTheDocument();
  expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
});
