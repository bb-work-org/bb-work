import {Button, TextField} from "@mui/material";

export default function SignForm() {
    return (
        <form className="w-full max-w-sm space-y-3">
            <TextField
                variant="outlined"
                label="RGM"
                name="rgm"
                autoComplete="rgm"
                required
                fullWidth
                autoFocus
            />
            <TextField
                variant="outlined"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                fullWidth
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            >
                Sign In
            </Button>
        </form>
    )
}