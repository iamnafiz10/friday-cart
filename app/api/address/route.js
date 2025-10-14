import {getAuth} from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

// 🟩 Add new address
export async function POST(request) {
    try {
        const {userId} = getAuth(request);

        if (!userId) {
            return NextResponse.json(
                {error: "Please login your account first"},
                {status: 401}
            );
        }

        const {address} = await request.json();
        address.userId = userId;

        const newAddress = await prisma.address.create({
            data: address,
        });

        return NextResponse.json({
            newAddress,
            message: "Address added successfully",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error: error.code || error.message},
            {status: 400}
        );
    }
}

// 🟦 Get all address for a user
export async function GET(request) {
    try {
        const {userId} = getAuth(request);

        const addresses = await prisma.address.findMany({
            where: {userId},
        });

        return NextResponse.json({addresses});
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error: error.code || error.message},
            {status: 400}
        );
    }
}

// 🟥 Delete address (using ?id=ADDRESS_ID)
export async function DELETE(request) {
    try {
        const {userId} = getAuth(request);
        if (!userId) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const {searchParams} = new URL(request.url);
        const id = searchParams.get("id");

        // Check if address belongs to this user
        const address = await prisma.address.findUnique({
            where: {id},
        });

        if (!address || address.userId !== userId) {
            return NextResponse.json({error: "Address not found"}, {status: 404});
        }

        // 🔍 Check manually if any order uses this address
        const existingOrder = await prisma.order.findFirst({
            where: {addressId: id},
        });

        if (existingOrder) {
            return NextResponse.json({
                error: "This address is linked to an order and cannot be deleted.",
            }, {status: 400});
        }

        // ✅ Safe to delete
        await prisma.address.delete({
            where: {id},
        });

        return NextResponse.json({message: "Address deleted successfully"});

    } catch (error) {
        console.error(error);
        return NextResponse.json({error: error.message}, {status: 400});
    }
}