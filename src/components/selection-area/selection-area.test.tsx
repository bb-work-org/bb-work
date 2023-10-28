import { render, screen } from "@testing-library/react";
import { SelectionArea } from "@/components/selection-area/selection-area";

describe("SelectionArea Tests", () => {
  test("renders SelectionArea component", () => {
    render(<SelectionArea>Test</SelectionArea>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
