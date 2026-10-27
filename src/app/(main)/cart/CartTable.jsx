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

export default function CartTable() {
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
                <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                    <TableCell className="flex justify-center cursor-pointer hover:text-red-700">
                        <Trash size={16} />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
