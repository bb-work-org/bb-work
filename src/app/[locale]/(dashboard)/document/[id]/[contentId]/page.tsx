"use client";
import { Box, CircularProgress } from "@mui/material";
import { Activity } from "@/@types/activities";
import { useContentQuery } from "@/redux/services/course-content-api";

interface DocumentQueryParams {
  params: {
    id: string;
    contentId: string;
  };
}

export default function Document({ params: { id, contentId } }: DocumentQueryParams) {
  const { data, isLoading } = useContentQuery({ courseId: id, contentId });

  console.log("Document", data, isLoading);

  return isLoading ? (
    <Box mt={3} display={"flex"} justifyContent={"center"}>
      <CircularProgress />
    </Box>
  ) : (
    <iframe
      className={"h-full w-full bg-white"}
      title={"Document content"}
      srcDoc={(data as Activity | undefined)?.body.rawText}
    />
  );
}
