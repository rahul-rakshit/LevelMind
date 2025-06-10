import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Vite + React heading", () => {
  render(<App />);
  const heading = screen.getByText(/LevelMind/i);
  expect(heading).toBeVisible();
});
