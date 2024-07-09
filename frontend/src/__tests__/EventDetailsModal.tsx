import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EventDetailsModal from "../components/EventDetailsModal";
import { Event } from "../types";
import moment from "moment-timezone";

test("renders EventDetailsModal and displays event details", () => {
  const event: Event = {
    _id: "1",
    name: "Test Event",
    description: "Test Description",
    startDate: "2024-07-07T14:00:00.000Z",
    endDate: "2024-07-07T15:00:00.000Z",
    timezone: "America/New_York",
    color: "#7cd992",
  };

  const startOriginal = moment
    .tz(event.startDate, event.timezone)
    .format("YYYY-MM-DD HH:mm z");
  const endOriginal = moment
    .tz(event.endDate, event.timezone)
    .format("YYYY-MM-DD HH:mm z");
  const startEST = moment
    .tz(event.startDate, "UTC")
    .tz("America/New_York")
    .format("YYYY-MM-DD HH:mm z");
  const endEST = moment
    .tz(event.endDate, "UTC")
    .tz("America/New_York")
    .format("YYYY-MM-DD HH:mm z");

  render(<EventDetailsModal event={event} open={true} onClose={() => {}} />);

  expect(screen.getByText("Event Details")).toBeInTheDocument();
  expect(screen.getByText("Name:")).toBeInTheDocument();
  expect(screen.getByText(event.name)).toBeInTheDocument();
  expect(screen.getByText("Description:")).toBeInTheDocument();
  expect(screen.getByText(event.description)).toBeInTheDocument();

  expect(screen.getByText("Original Start:")).toBeInTheDocument();
  expect(screen.getByText("Original End:")).toBeInTheDocument();
  expect(screen.getByText("Start (EST):")).toBeInTheDocument();
  expect(screen.getByText("End (EST):")).toBeInTheDocument();
  expect(screen.getByText("Color:")).toBeInTheDocument();

  // Using a more flexible approach to find and assert date contents
  const originalStartNode = screen.getByText("Original Start:").parentElement;
  const originalEndNode = screen.getByText("Original End:").parentElement;
  const startESTNode = screen.getByText("Start (EST):").parentElement;
  const endESTNode = screen.getByText("End (EST):").parentElement;
  const colorNode = screen.getByText("Color:").parentElement;

  expect(originalStartNode).toHaveTextContent(startOriginal);
  expect(originalEndNode).toHaveTextContent(endOriginal);
  expect(startESTNode).toHaveTextContent(startEST);
  expect(endESTNode).toHaveTextContent(endEST);
  expect(colorNode).toHaveTextContent(event.color);
});
