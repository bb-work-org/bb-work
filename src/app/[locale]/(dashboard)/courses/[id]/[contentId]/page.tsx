"use client";

import { Box, CircularProgress } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { useContentAttachmentsQuery, useContentDownloadQuery } from "@/redux/services/course-content-api";

export default function CourseContent({ params: { id, contentId } }: { params: { id: string; contentId: string } }) {
  const { data: attachments } = useContentAttachmentsQuery({
    contentId,
    courseId: id,
  });

  const { data: downloadResult } = useContentDownloadQuery(
    attachments?.results?.[0]
      ? {
          courseId: id,
          contentId,
          attachmentId: attachments.results[0].id,
        }
      : skipToken
  );

  return downloadResult ? (
    <iframe title={"Course Content"} className={"min-h-full w-full"} src={downloadResult} />
  ) : (
    <Box mt={3} display={"flex"} justifyContent={"center"}>
      <CircularProgress />
    </Box>
  );
}
