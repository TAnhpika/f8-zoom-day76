"use client";

import { loginAction } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

export default function LoginForm() {
    const [state, action, pending] = useActionState(loginAction, {});
    const router = useRouter();
    const lastStateRef = useRef(state);

    useEffect(() => {
        if (lastStateRef.current === state) {
            return;
        }
        lastStateRef.current = state;

        if (state.message) {
            if (state.success) {
                toast.success(state.message);
            } else {
                toast.error(state.message);
            }
        }

        if (state.success) {
            router.push("/");
        }
    }, [router, state]);

    return (
        <div>
            <form
                action={action}
                ref={(form) => {
                    return () => form?.reset();
                }}
            >
                <div className="mb-3">
                    <label htmlFor="">Email</label>
                    <Input type={"email"} name="email" placeholder="Email..." />
                </div>
                <div className="mb-3">
                    <label htmlFor="">Password</label>
                    <Input
                        type={"password"}
                        name="password"
                        placeholder="Password..."
                    />
                </div>
                <Button>{pending ? "Loading" : "Login"}</Button>
            </form>
        </div>
    );
}
