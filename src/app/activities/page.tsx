'use client';
import {Container, Stack, Typography} from "@mui/material";
import {useGetMeQuery} from "@/redux/services/user-api";

export default function Activities() {
    const {isLoading, data} = useGetMeQuery();

    return (
        <Container component="main" maxWidth="xs" className={"h-screen"}>
            <Stack
                justifyContent={"center"}
                alignItems={"center"}
                alignContent={"center"}
                direction={"column"}
                spacing={2}
                className={"h-full"}
            >
                <Typography>Activities page</Typography>
                <Typography>{isLoading ? "Loading..." : data.familyName}</Typography>
            </Stack>
        </Container>
    );
}
