import { Clear, Done } from "@mui/icons-material";
import { ListItem, ListItemText, Skeleton as MuiSkeleton, Tooltip } from "@mui/material";
import { useFormatter, useNow, useTranslations } from "next-intl";
import { type PropsWithChildren, type ReactNode } from "react";
import { type Activity, ResourceXBbAssignment } from "@/@types/activities";
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
  const contentDetail =
    activity.contentDetail[activity.contentHandler as "resource/x-bb-assignment" | "resource/x-bb-asmt-test-link"];
  const isAssignment = (x: unknown | undefined): x is ResourceXBbAssignment =>
    activity.contentHandler === "resource/x-bb-assignment";
  console.log("Content Detail", contentDetail);
  const gradingColumn = isAssignment(contentDetail) ? contentDetail?.gradingColumn : contentDetail?.test?.gradingColumn;
  const t = useTranslations("dashboard.activities");
  const format = useFormatter();
  const now = useNow();

  const { data, isLoading } = useGetAttemptsQuery({
    activityId: gradingColumn?.id,
    courseId: activity?.courseId,
  });

  const endDate = activity.adaptiveReleaseRules?.endDate ?? gradingColumn?.dueDate ?? null;
  const end = endDate && new Date(endDate);

  const expired = end && end < now;
  const expireDate = end
    ? `${expired ? `${t("expired")} - ` : ""} ${format.dateTime(end)} - ${format.relativeTime(end, now)}`
    : "";
  const completed = data?.lookup && Object.keys(data.lookup).length !== 0;

  return isLoading ? (
    <Skeleton />
  ) : (
    <Body primary={activity.title} secondary={expireDate}>
      {completed ? (
        <Tooltip title={t("completed")}>
          <Done />
        </Tooltip>
      ) : undefined}

      {expired && !completed ? (
        <Tooltip title={t("expired")}>
          <Clear color="error" />
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
