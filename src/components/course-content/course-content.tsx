import { Article, Assignment, Book, ExpandLess, ExpandMore, Folder, InsertDriveFile, Link } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { open as openExternal } from "@tauri-apps/api/shell";
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
  const [open, setOpen] = useState(activity.parentId === undefined);
  const router = useRouter();

  function handleCourseRedirect() {
    let contentType = "courses";

    switch (activity.contentHandler) {
      case "resource/x-bb-assignment":
        contentType = "activities";
        break;
      case "resource/x-bb-externallink":
        const url = activity.contentDetail["resource/x-bb-externallink"]?.url;

        if (url && url.startsWith("http")) {
          contentType = "";
          openExternal(url);
        }
        break;
      case "resource/x-bb-document":
        contentType = "document";
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
          {activity.children.map((children, index) => (
            <CourseContent activity={children} key={index} />
          ))}
        </List>
      </Collapse>
    </>
  ) : (
    <ListItemButton onClick={handleCourseRedirect}>
      <ListItemIcon>{getIconByType(activity.contentHandler)}</ListItemIcon>
      <ListItemText primary={activity.title} secondary={activity.contentHandler} />
    </ListItemButton>
  );
}
