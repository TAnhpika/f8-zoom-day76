import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ProductCard() {
    return (
        <div>
            <Image
                src={
                    "https://images.unsplash.com/photo-1791984417769-260efbbf2066?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                }
                alt="demo"
                width={400}
                height={300}
                className="h-75 object-cover"
            />
            <h2 className="text-xl font-medium my-3">Tên sản phẩm</h2>
            <Button className="bg-amber-700 text-white" size="lg">
                Add to card
            </Button>
        </div>
    );
}
