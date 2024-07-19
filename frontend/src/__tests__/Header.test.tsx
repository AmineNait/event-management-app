import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../components/Header";

test("renders Header component with title", () => {
  render(<Header />);
  const headerElement = screen.getByText(/Kumojin Test App/i);
  expect(headerElement).toBeInTheDocument();
});
