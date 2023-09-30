import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { ActivityWithChildren } from "@/@types/activities";
import CourseContent from "@/components/course-content/course-content";

describe("CourseContent", () => {
	const testActivity: ActivityWithChildren = {
		aiState: "",
		body: {
			rawText: "",
			displayText: "",
			webLocation: "",
			fileLocation: "",
		},
		contentDetail: {},
		courseId: "",
		description: "",
		dueDateExceptionType: "",
		iconUrl: "",
		id: "",
		inLesson: false,
		inSequence: false,
		isGroupContent: false,
		isReviewable: false,
		launchInNewWindow: false,
		modifiedDate: 0,
		position: 0,
		renderType: "",
		state: "",
		thumbnailAltText: "",
		titleColor: "",
		title: "Test title",
		contentHandler: "resource/x-bb-file",
		children: [],
	};

	it("renders without crashing", () => {
		const { getByText } = render(<CourseContent activity={testActivity} />);

		expect(getByText("Test title")).toBeInTheDocument();
	});

	it("renders with children", () => {
		const { getByText } = render(
			<CourseContent
				activity={{ ...testActivity, children: [testActivity] }}
			/>,
		);

		expect(getByText("Test title")).toBeInTheDocument();
		expect(getByText("Test title")).toHaveClass("MuiTypography-root");
	});
});
