import { Suspense } from "react";
import CartTable from "./CartTable";
import { getCartList } from "@/services/cart.service";

async function CartContent() {
    const { items, total } = await getCartList();

    return <CartTable items={items} total={total} />;
}

export default function CartPage() {
    return (
        <Suspense fallback={<p>Loading cart...</p>}>
            <CartContent />
        </Suspense>
    );
}
