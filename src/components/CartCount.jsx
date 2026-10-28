"use client";

import { useCartStore } from "@/store/cart.store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function CartCount() {
    const { count, fetchCount } = useCartStore();
    const pathname = usePathname();

    // lấy init count & cập nhật khi chuyển trang (VD: sau khi login / logout / proxy refresh token)
    useEffect(() => {
        fetchCount();
    }, [fetchCount, pathname]);

    return (
        <li>
            <Link href={"/cart"}>Cart ({count})</Link>
        </li>
    );
}
