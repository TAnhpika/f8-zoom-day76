"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
    return (
        <div>
            <form action="">
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
                <Button>Log in</Button>
            </form>
        </div>
    );
}
