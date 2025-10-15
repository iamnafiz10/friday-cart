import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

// ✅ Public endpoint - no auth needed
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {createdAt: "desc"},
        });
        return NextResponse.json({categories});
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error: error.message || "Failed to fetch categories"},
            {status: 500}
        );
    }
}