"use client";

import { useCartStore } from "@/store/cart.store";
import Link from "next/link";
import React, { useEffect } from "react";

export default function CartCount() {
    const { count, fetchCount } = useCartStore();
    
    // lấy init count
    useEffect(() => {
        fetchCount();
    }, [fetchCount]);

    return (
        <li>
            <Link href={"/cart"}>Cart ({count})</Link>
        </li>
    );
}
