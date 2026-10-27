import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
    return (
        <div>
            <h1 className="3xl mb-3">Products</h1>
            <div className="flex flex-wrap -mx-3">
                <div className="px-3 mb-3 w-1/4">
                    <ProductCard />
                </div>
            </div>
        </div>
    );
}
