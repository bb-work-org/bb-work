import { Article, Assignment, Book, ExpandLess, ExpandMore, Folder, InsertDriveFile, Link } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useRouter } from "next-intl/client";
import { useState } from "react";
import { type ActivityWithChildren, type ContentHandler } from "@/@types/activities";

function getIconByType(type: ContentHandler) {
  switch (type) {
    case "resource/x-bb-file":
      return <InsertDriveFile />;

    case "resource/x-bb-folder":
      return <Folder />;

    case "resource/x-bb-assignment":
      return <Assignment />;

    case "resource/x-bb-externallink":
      return <Link />;

    case "resource/x-bb-document":
      return <Article />;

    case "resource/x-bb-lesson":
      return <Book />;

    default:
      break;
  }
}

export default function CourseContent({ activity }: { activity: ActivityWithChildren }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleCourseRedirect() {
    let contentType = "courses";

    switch (activity.contentHandler) {
      case "resource/x-bb-assignment":
        contentType = "activities";
        break;
      case "resource/x-bb-externallink":
        // todo: handle external link
        contentType = "";
        break;
    }

    if (contentType === "") {
      return;
    }

    router.push(`/${contentType}/${activity.courseId}/${activity.id}`);
  }

  return activity.children && activity.children.length > 0 ? (
    <>
      <ListItemButton
        divider
        onClick={() => {
          setOpen(!open);
        }}
      >
        <ListItemIcon>{getIconByType(activity.contentHandler)}</ListItemIcon>

        <ListItemText primary={activity.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout={"auto"} unmountOnExit>
        <List sx={{ pl: 3 }}>
          {activity.children?.map((children, index) => <CourseContent activity={children} key={index} />)}
        </List>
      </Collapse>
    </>
  ) : (
    <ListItemButton onClick={handleCourseRedirect}>
      <ListItemIcon>{getIconByType(activity.contentHandler)}</ListItemIcon>
      <ListItemText primary={activity.title} />
    </ListItemButton>
  );
}
