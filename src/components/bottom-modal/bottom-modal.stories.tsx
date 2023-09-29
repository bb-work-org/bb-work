import type { Meta } from "@storybook/react";
import { BottomModal } from "@/components/bottom-modal/bottom-modal";
import { List, ListItem, ListItemText } from "@mui/material";

const meta: Meta<typeof BottomModal> = {
	title: "Components/BottomModal",
	component: BottomModal,
};

export const Default = () => (
	<BottomModal open={true}>
		<List>
			<ListItem>
				<ListItemText>Item 1</ListItemText>
			</ListItem>
			<ListItem>
				<ListItemText>Item 2</ListItemText>
			</ListItem>
			<ListItem>
				<ListItemText>Item 3</ListItemText>
			</ListItem>
		</List>
	</BottomModal>
);

export default meta;
