import { render, screen, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App, { randomId } from "../App";

describe("MainView", () => {
  beforeEach(() => localStorage.clear());

  it("Displays previously set stressors", async () => {
    const testStressors = [
      {
        id: randomId(),
        title: "a",
        description: "first stressor",
        severity: 0
      },
      {
        id: randomId(),
        title: "b",
        description: "second stressor",
        severity: 1
      },
      { id: randomId(), title: "c", description: "third stressor", severity: 5 }
    ];
    localStorage.setItem("levelmind-stressors", JSON.stringify(testStressors));
    const user = userEvent.setup();
    render(<App />);

    const menuButton = screen.getByRole("button", {
      name: "Open navigation menu"
    });
    await user.click(menuButton);
    const nav = screen.getByRole("navigation");
    const setStressorsLink = within(nav).getByText(/set stressors/i);
    await user.click(setStressorsLink);

    const totalScore = screen.getByText("Σ 6");
    expect(totalScore).toBeVisible();
  });

  it("Tells you when no stressors have been configured", async () => {
    const user = userEvent.setup();
    render(<App />);

    const menuButton = screen.getByRole("button", {
      name: "Open navigation menu"
    });
    await user.click(menuButton);
    const nav = screen.getByRole("navigation");
    const setStressorsLink = within(nav).getByText(/set stressors/i);
    await user.click(setStressorsLink);

    expect(screen.getByText(/No stressors configured yet/i)).toBeVisible();
    expect(screen.getByText(/Use the menu/i)).toBeVisible();
  });

  it("Lets you configure the severity of a stressor", async () => {
    const testStressor = {
      id: randomId(),
      title: "Test Stressor",
      description: "A test stressor",
      severity: 0
    };
    localStorage.setItem("levelmind-stressors", JSON.stringify([testStressor]));
    const user = userEvent.setup();
    render(<App />);
    const menuButton = screen.getByRole("button", {
      name: "Open navigation menu"
    });
    await user.click(menuButton);
    const nav = screen.getByRole("navigation");
    const setStressorsLink = within(nav).getByText(/set stressors/i);
    await user.click(setStressorsLink);
    expect(screen.getByText("Σ 0")).toBeVisible();

    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "2" } });

    const totalOverwhelmScore = screen.getByText("Σ 5");
    expect(totalOverwhelmScore).toBeVisible();
  });
});
