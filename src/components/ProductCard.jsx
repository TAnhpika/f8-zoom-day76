import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ProductCard({ product, loading = "lazy" }) {
    return (
        <div>
            <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading={loading}
                    className="object-cover"
                />
            </div>
            <h2 className="text-xl font-medium my-3">{product.name}</h2>
            <Button className="bg-amber-700 text-white" size="lg">
                Add to card
            </Button>
        </div>
    );
}
