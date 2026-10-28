"use client";

import { Button } from "@/components/ui/button";
import { addToCart, getCartCount } from "@/services/cart.service";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { useCartStore } from "@/store/cart.store";

export default function AddToCartButton({ productId }) {
    const [status, setStatus] = useState("idle");
    const { fetchCount } = useCartStore();

    const handleAddToCart = async () => {
        setStatus("pending");
        const addToCartStatus = await addToCart({
            quantity: 1,
            productId,
        });

        setStatus("idle");

        if (addToCartStatus) {
            toast.success("Add to cart success");
            fetchCount();
        } else {
            toast.success("Add to cart failed");
        }
    };

    return (
        <Button
            className="bg-amber-700 text-white"
            size="lg"
            onClick={handleAddToCart}
            disabled={status === "pending"}
        >
            {status === "pending" && <Spinner />} Add to card
        </Button>
    );
}
