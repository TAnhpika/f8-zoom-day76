import { Toaster } from "@/components/ui/sonner";
import UserProfile from "@/components/UserProfile";
import Link from "next/link";

export default function MainLayout({ children }) {
    return (
        <>
            <header className="flex justify-between items-center py-3 max-w-300 mx-auto">
                <div>
                    <h1 className="text-3xl font-medium">
                        <Link href={"/"}>Logo</Link>
                    </h1>
                </div>
                <ul className="flex gap-3 items-center">
                    <li>
                        <Link href={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link href={"/products"}>Products</Link>
                    </li>
                    <li>
                        <Link href={"/cart"}>Cart (0)</Link>
                    </li>
                    <UserProfile />
                </ul>
            </header>

            <main className="py-3 max-w-300 mx-auto">{children}</main>
            <Toaster />
        </>
    );
}
