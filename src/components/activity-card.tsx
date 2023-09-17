import { ListItem, ListItemText, Tooltip } from "@mui/material";
import { Done, QueryBuilder } from "@mui/icons-material";
import { Activity } from "@/@types/activities";
import { useGetAttemptsQuery } from "@/redux/services/activity-api";

export default function ActivityCard({ activity }: { activity: Activity }) {
	const { data } = useGetAttemptsQuery({
		activityId: activity.contentDetail[activity.contentHandler as "resource/x-bb-assignment"]!.gradingColumn.id,
		courseId: activity.courseId
	});

	return (
		<ListItem key={activity.id} divider>
			<ListItemText
				primary={activity.title}
				secondary={activity.id}
			/>

			{
				data && Object.keys(data.lookup).length !== 0
					  ? (
						<Tooltip title={"Completed"}>
							<Done/>
						</Tooltip>
					  )
					  : undefined
			}

			{
				activity.adaptiveReleaseRules
					? (
						<Tooltip title={new Date(activity.adaptiveReleaseRules.endDate).toLocaleDateString()}>
							<QueryBuilder />
						</Tooltip>
					  )
					: undefined
			}
		</ListItem>
	)
}