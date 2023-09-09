'use client';
import {Button, CircularProgress, TextField} from "@mui/material";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {signIn} from "@/redux/actions/auth-action";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

type Inputs = {
    rgm: string;
    password: string;
}

const schema = yup.object().shape({
    rgm: yup.string().required("RGM is required"),
    password: yup.string().required("Password is required")
});

export default function SignForm() {
    const route = useRouter();
    const dispatch = useAppDispatch();
    const {loading, loggedIn} = useAppSelector(state => state.auth);

    const {register, handleSubmit, formState: {errors, isValid}} = useForm<Inputs>({
        resolver: yupResolver(schema),
        mode: "onBlur"
    });

    useEffect(() => {
        if (loggedIn) {
            route.push("/activities");
        }
    }, [loggedIn]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        dispatch(signIn(data));
    }

    return (
        <form className="w-full max-w-sm space-y-3"
              onSubmit={handleSubmit(onSubmit)}
        >
            <TextField
                variant="outlined"
                label="RGM"
                autoComplete="rgm"
                fullWidth
                autoFocus
                {...register("rgm")}
                error={!!errors.rgm}
                helperText={errors.rgm?.message || false}
            />
            <TextField
                variant="outlined"
                label="Password"
                type="password"
                autoComplete="current-password"
                fullWidth
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message || false}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!isValid || loading}

                startIcon={loading ? <CircularProgress size={20}/> : null}
            >
                Sign In
            </Button>
        </form>
    )
}