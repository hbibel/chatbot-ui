import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import HistoryButton from "./history-button";

const toggleHistoryVisibility = vi.hoisted(() => vi.fn());
vi.mock("@/actions/history", () => ({ toggleHistoryVisibility }));

describe("HistoryButton", () => {
  it("calls the toggleHistoryVisibility action when clicked", async () => {
    render(<HistoryButton />);

    await userEvent.click(screen.getByText("label"));

    expect(toggleHistoryVisibility).toHaveBeenCalled();
  });
});
