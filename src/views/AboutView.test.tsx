import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("AboutView", () => {
  it("Shows you an About heading", async () => {
    const user = userEvent.setup();
    render(<App />);

    const menuButton = screen.getByRole("button", {
      name: "Open navigation menu"
    });
    await user.click(menuButton);
    const nav = screen.getByRole("navigation");
    const aboutLink = within(nav).getByText(/about/i);
    await user.click(aboutLink);

    const heading = screen.getByRole("heading", { name: /About/i });
    expect(heading).toBeVisible();
  });
});
