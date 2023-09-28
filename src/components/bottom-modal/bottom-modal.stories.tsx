import type { Meta } from "@storybook/react";
import { BottomModal } from "@/components/bottom-modal/bottom-modal";

const meta: Meta<typeof BottomModal> = {
	title: "Components/BottomModal",
	component: BottomModal,
};

export const Default = () => (
	<BottomModal open={true}>
		<div>Content</div>
	</BottomModal>
);

export default meta;
