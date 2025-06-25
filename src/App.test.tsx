import { render, screen } from "@testing-library/react";
import App from "./App";

test("has the LevelMind text", () => {
  render(<App />);
  const heading = screen.getByText(/LevelMind/i);
  expect(heading).toBeVisible();
});
