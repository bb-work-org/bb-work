import { LockOutlined } from "@mui/icons-material";
import { Avatar, Container, Stack } from "@mui/material";
import SignForm from "@/components/sign-form";

export default function Home() {
  return (
    <Container component="main" className="h-screen">
      <Stack justifyContent="center" alignItems="center" direction="column" spacing={2} className="h-full">
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>

        <SignForm />
      </Stack>
    </Container>
  );
}
