import { ThemeProvider } from "@mui/material/styles";
import { render } from "@testing-library/react";
import { BottomModal } from "@/components/bottom-modal/bottom-modal";
import { darkTheme } from "@/theme/schemes/dark-theme";

describe("BottomModal", () => {
  it("should render without errors", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <BottomModal open={true}>
          <div>Test</div>
        </BottomModal>
      </ThemeProvider>
    );
  });
});
