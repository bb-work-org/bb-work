import { Done, QueryBuilder } from "@mui/icons-material";
import { ListItem, ListItemText, Skeleton as MuiSkeleton, Tooltip } from "@mui/material";
import { type PropsWithChildren, type ReactNode, useCallback } from "react";
import { type Activity } from "@/@types/activities";
import { useGetAttemptsQuery } from "@/redux/services/activity-api";

function Skeleton() {
  return (
    <Body
      primary={<MuiSkeleton width={`${Math.random() * 20 + 10}%`} />}
      secondary={<MuiSkeleton width={`${Math.random() * 30 + 10}%`} />}
    >
      <MuiSkeleton variant={"circular"} width={24} height={24} />
    </Body>
  );
}

function Root({ activity }: { activity: Activity }) {
  const gradingColumn = activity.contentDetail[activity.contentHandler as "resource/x-bb-assignment"]!.gradingColumn;
  const { isLoading, data } = useGetAttemptsQuery({
    activityId: gradingColumn.id,
    courseId: activity.courseId,
  });

  const getExpireDate = useCallback((endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = new Date(end.getTime() - now.getTime());

    return `${end.toLocaleDateString()} - ${diff.getDate()} days left`; // need i18n
  }, []);

  return isLoading ? (
    <Skeleton />
  ) : (
    <Body primary={activity.title} secondary={activity.id}>
      {data && Object.keys(data.lookup).length !== 0 ? (
        <Tooltip title={"Completed"}>
          <Done />
        </Tooltip>
      ) : undefined}

      {activity.adaptiveReleaseRules ?? gradingColumn.dueDate ? (
        <Tooltip title={getExpireDate(activity?.adaptiveReleaseRules?.endDate ?? gradingColumn.dueDate)}>
          <QueryBuilder />
        </Tooltip>
      ) : undefined}
    </Body>
  );
}

function Body({ primary, secondary, children }: PropsWithChildren<{ primary: ReactNode; secondary: ReactNode }>) {
  return (
    <ListItem divider>
      <ListItemText primary={primary} secondary={secondary} />
      {children}
    </ListItem>
  );
}

export const ActivityCard = {
  Root,
  Skeleton,
};
