import { ActivityWithChildren, ContentHandler } from "@/@types/activities";
import { Assignment, Link, ExpandLess, ExpandMore, Folder, InsertDriveFile, Article, Book } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";

function getIconByType(type: ContentHandler) {
    switch (type) {
        case "resource/x-bb-file":
            return <InsertDriveFile/>

        case "resource/x-bb-folder":
            return <Folder/>

        case "resource/x-bb-assignment":
            return <Assignment/>

        case "resource/x-bb-externallink":
            return <Link/>

        case "resource/x-bb-document":
            return <Article/>

        case "resource/x-bb-lesson":
            return <Book/>
    
        default:
            break;
    }
}

export default function CourseContent({ activity }: { activity: ActivityWithChildren }) {
    const [open, setOpen] = useState(false);

    return (
        activity.children && activity.children.length > 0
            ? (
                <>
                    <ListItemButton divider onClick={() => setOpen(!open)}>
                        <ListItemIcon>
                            {getIconByType(activity.contentHandler)}
                        </ListItemIcon>

                        <ListItemText primary={activity.title}/>
                        {open ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>
                    
                    <Collapse in={open} timeout={"auto"} unmountOnExit>
                        <List sx={{ pl: 3 }}>
                            {activity.children?.map((children, index) => (
                                <CourseContent activity={children} key={index}/>
                            ))}
                        </List>
                    </Collapse>
                </>
            )
            : (
                <ListItemButton>
                    <ListItemIcon>
                        {getIconByType(activity.contentHandler)}
                    </ListItemIcon>
                    <ListItemText primary={activity.title}/>
                </ListItemButton>
            )
    )
}