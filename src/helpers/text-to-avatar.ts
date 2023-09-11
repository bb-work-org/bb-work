export const stringToColor = (string: string) => {
	let hash = 0;
	let i;

	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}

	return color;
};

export const textColor = (bgColor: string) => {
	const hex = bgColor.replace("#", "");
	const r = parseInt(hex.slice(0, 2), 16); // hexToR
	const g = parseInt(hex.slice(2, 4), 16); // hexToG
	const b = parseInt(hex.slice(4, 6), 16); // hexToB

	return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
};

export const stringAvatar = (name?: string) => {
	return (
		name && {
			sx: {
				bgcolor: stringToColor(name),
				color: textColor(stringToColor(name)),
			},
			children: `${name
				?.split(" ")
				.map((n) => n[0])
				.join("")}`,
		}
	);
};
