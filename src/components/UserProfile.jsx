"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Spinner } from "./ui/spinner";

export default function UserProfile() {
    const { user, isLoading, isAuthenticated } = useAuth();

    return (
        <>
            {isLoading ? (
                <li>
                    <Spinner />
                </li>
            ) : isAuthenticated ? (
                <>
                    <li>Hello: {user.fullName}</li>
                    <li>
                        <Button className="bg-red-700">Logout</Button>
                    </li>
                </>
            ) : (
                <li>
                    <Link href={"/auth/login"}>
                        <Button>Login</Button>
                    </Link>
                </li>
            )}
        </>
    );
}
