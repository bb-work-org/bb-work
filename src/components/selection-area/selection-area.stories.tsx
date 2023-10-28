import { Meta } from "@storybook/react";
import { SelectionArea } from "@/components/selection-area/selection-area";

const meta: Meta<typeof SelectionArea> = {
  title: "Components/SelectionArea",
  component: SelectionArea,
};

export const Default = () => (
  <SelectionArea>
    <h1>Select this text</h1>
  </SelectionArea>
);

export default meta;
