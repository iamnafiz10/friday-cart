import {getAuth} from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function DELETE(req, context) {
    try {
        const {userId} = getAuth(req);
        if (!userId) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        // ✅ Await params (new Next.js requirement)
        const {id} = await context.params;

        // 🔹 Check if address exists
        const address = await prisma.address.findUnique({where: {id}});
        if (!address) {
            return NextResponse.json({error: "Address not found"}, {status: 404});
        }

        // 🔹 Check if address belongs to current user
        if (address.userId !== userId) {
            return NextResponse.json({error: "Forbidden"}, {status: 403});
        }

        // 🔹 Check if this address is used in any order
        const existingOrder = await prisma.order.findFirst({
            where: {addressId: id},
        });

        if (existingOrder) {
            return NextResponse.json(
                {
                    error: "This address is linked to an order and cannot be deleted.",
                },
                {status: 400}
            );
        }

        // ✅ Delete address safely
        await prisma.address.delete({where: {id}});

        return NextResponse.json({message: "Address deleted successfully"});
    } catch (error) {
        console.error("Delete address error:", error);
        return NextResponse.json(
            {error: error.message || "Failed to delete address"},
            {status: 500}
        );
    }
}