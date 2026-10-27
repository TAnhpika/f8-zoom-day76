import { Suspense } from "react";
import { getProductList } from "@/services/product.service";
import ProductCard from "@/components/ProductCard";

async function ProductsContent() {
    const products = await getProductList();
    // fix warning trùng ảnh unsplash 
    const eagerImageSources = new Set(products.slice(0, 4).map((product) => product.image));

    return (
        <div className="flex flex-wrap -mx-3">
            {products.map((product) => (
                <div key={product._id} className="px-3 mb-3 w-1/4">
                    <ProductCard
                        product={product}
                        loading={eagerImageSources.has(product.image) ? "eager" : "lazy"}
                    />
                </div>
            ))}
        </div>
    );
}

export default function ProductsPage() {
    return (
        <div>
            <h1 className="3xl mb-3">Products</h1>
            <Suspense fallback={<p>Loading products...</p>}>
                <ProductsContent />
            </Suspense>
        </div>
    );
}
