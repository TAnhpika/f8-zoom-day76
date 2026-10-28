import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";

export default function CartTable({ items, total }) {
    return (
        <Table>
            <TableCaption>A list of your products.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-25">Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="w-20 text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item) => (
                    <TableRow key={item.productId}>
                        <TableCell className="font-medium">
                            {item.name}
                        </TableCell>
                        <TableCell>{item.price.toLocaleString()}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell className="text-right">
                            {item.total.toLocaleString()}
                        </TableCell>
                        <TableCell className="flex justify-center cursor-pointer hover:text-red-700">
                            <Trash size={16} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
