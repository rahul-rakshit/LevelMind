import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("ConfigureView", () => {
  beforeEach(() => localStorage.clear());

  it("Creates a new stressor with title and description", async () => {
    const user = userEvent.setup();
    render(<App />);
    const menuButton = screen.getByRole("button", {
      name: "Open navigation menu"
    });
    await user.click(menuButton);
    const nav = screen.getByRole("navigation");
    const configureLink = within(nav).getByText(/edit stressors/i);
    await user.click(configureLink);
    expect(screen.getByText(/No stressors configured yet/i)).toBeVisible();

    const addStressorButton = screen.getByRole("button", {
      name: /add stressor/i
    });
    await user.click(addStressorButton);
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionTextarea = screen.getByLabelText(/description/i);
    await user.type(titleInput, "This is a test title");
    await user.type(descriptionTextarea, "This is a test description");
    const saveButton = screen.getByRole("button", { name: /add stressor/i });
    await user.click(saveButton);

    await waitFor(() => {
      expect(
        screen.queryByTestId("configure-stressor-modal")
      ).not.toBeInTheDocument();
    });

    await screen.findByText("This is a test title");
    expect(screen.getByText("This is a test title")).toBeVisible();
    expect(screen.getByText("This is a test description")).toBeVisible();
    const storedStressors = JSON.parse(
      localStorage.getItem("levelmind-stressors") || "[]"
    );
    expect(storedStressors).toHaveLength(1);
    expect(storedStressors[0]).toMatchObject({
      title: "This is a test title",
      description: "This is a test description",
      severity: 0
    });
    expect(storedStressors[0]).toHaveProperty("id");
  });
});
