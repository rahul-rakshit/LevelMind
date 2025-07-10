import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App, { randomId } from "../App";

describe("ConfigureView", () => {
  beforeEach(() => localStorage.clear());

  it("Lets you create a new stressor", async () => {
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
    await user.type(titleInput, "This is a test title");
    const descriptionTextarea = screen.getByLabelText(/description/i);
    await user.type(descriptionTextarea, "This is a test description");
    const saveButton = screen.getByRole("button", { name: /add stressor/i });
    await user.click(saveButton);

    expect(screen.getByText("This is a test title")).toBeVisible();
    expect(screen.getByText("This is a test description")).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Edit stressor This is a test title" })
    ).toBeVisible();
    const storedStressors = JSON.parse(
      localStorage.getItem("levelmind-stressors") || "[]"
    );
    expect(storedStressors.length).toEqual(1);
    expect(storedStressors[0]).toMatchObject({
      title: "This is a test title",
      description: "This is a test description",
      severity: 0
    });
  });

  it("Lets you edit an existing stressor", async () => {
    const user = userEvent.setup();
    const existingStressor = {
      id: randomId(),
      title: "abc",
      description: "123",
      severity: 0
    };
    localStorage.setItem(
      "levelmind-stressors",
      JSON.stringify([existingStressor])
    );
    render(<App />);
    const menuButton = screen.getByRole("button", {
      name: "Open navigation menu"
    });
    await user.click(menuButton);
    const nav = screen.getByRole("navigation");
    const configureLink = within(nav).getByText(/edit stressors/i);
    await user.click(configureLink);

    const editButton = screen.getByRole("button", {
      name: "Edit stressor abc"
    });
    await user.click(editButton);
    const titleInput = screen.getByLabelText(/title/i);
    await user.clear(titleInput);
    await user.type(titleInput, "def");
    const descriptionTextarea = screen.getByLabelText(/description/i);
    await user.clear(descriptionTextarea);
    await user.type(descriptionTextarea, "456");
    const saveButton = screen.getByRole("button", { name: /save/i });
    await user.click(saveButton);

    expect(screen.getByText("def")).toBeVisible();
    expect(screen.getByText("456")).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Edit stressor def" })
    ).toBeVisible();
    const storedStressors = JSON.parse(
      localStorage.getItem("levelmind-stressors") || "[]"
    );
    expect(storedStressors.length).toEqual(1);
    expect(storedStressors[0]).toMatchObject({
      title: "def",
      description: "456",
      severity: 0
    });
  });

  it("Lets you delete an existing stressor", async () => {
    const user = userEvent.setup();
    const existingStressor = {
      id: randomId(),
      title: "abc",
      description: "123",
      severity: 0
    };
    localStorage.setItem(
      "levelmind-stressors",
      JSON.stringify([existingStressor])
    );
    render(<App />);
    const menuButton = screen.getByRole("button", {
      name: "Open navigation menu"
    });
    await user.click(menuButton);
    const nav = screen.getByRole("navigation");
    const configureLink = within(nav).getByText(/edit stressors/i);
    await user.click(configureLink);

    const editButton = screen.getByRole("button", {
      name: "Edit stressor abc"
    });
    await user.click(editButton);
    const deleteButton = screen.getByRole("button", {
      name: "Delete stressor"
    });
    await user.click(deleteButton);
    const deletionConfirmationButton = screen.getByRole("button", {
      name: "confirm-delete"
    });
    await user.click(deletionConfirmationButton);

    const noStressorsText = await screen.findByText(
      /No stressors configured yet/i
    );
    expect(noStressorsText).toBeVisible();
    expect(screen.queryByText("abc")).not.toBeInTheDocument();
    expect(screen.queryByText("123")).not.toBeInTheDocument();
    const storedStressors = JSON.parse(
      localStorage.getItem("levelmind-stressors") || "[]"
    );
    expect(storedStressors).toHaveLength(0);
  });

  it("Lets you cancel deleting and editing", async () => {
    const user = userEvent.setup();
    const existingStressor = {
      id: randomId(),
      title: "abc",
      description: "123",
      severity: 0
    };
    localStorage.setItem(
      "levelmind-stressors",
      JSON.stringify([existingStressor])
    );
    render(<App />);
    const menuButton = screen.getByRole("button", {
      name: "Open navigation menu"
    });
    await user.click(menuButton);
    const nav = screen.getByRole("navigation");
    const configureLink = within(nav).getByText(/edit stressors/i);
    await user.click(configureLink);

    const editButton = screen.getByRole("button", {
      name: "Edit stressor abc"
    });
    await user.click(editButton);
    const deleteButton = screen.getByRole("button", {
      name: "Delete stressor"
    });
    await user.click(deleteButton);
    const cancelDeletionButton = screen.getByRole("button", {
      name: "cancel-delete"
    });
    await user.click(cancelDeletionButton);
    const cancelEditingButton = screen.getByRole("button", {
      name: "cancel-editing-stressor"
    });
    await user.click(cancelEditingButton);

    expect(screen.getByText("abc")).toBeVisible();
    expect(screen.getByText("123")).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Edit stressor abc" })
    ).toBeVisible();
    const storedStressors = JSON.parse(
      localStorage.getItem("levelmind-stressors") || "[]"
    );
    expect(storedStressors.length).toEqual(1);
    expect(storedStressors[0]).toMatchObject({
      title: "abc",
      description: "123",
      severity: 0
    });
  });
});
