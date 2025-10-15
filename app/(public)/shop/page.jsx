'use client'

import {Suspense} from "react"
import ProductCard from "@/components/ProductCard"
import {MoveLeftIcon} from "lucide-react"
import {useRouter, useSearchParams} from "next/navigation"
import {useSelector} from "react-redux"

function ShopContent() {
    const searchParams = useSearchParams()
    const search = searchParams.get("search")
    const category = searchParams.get("category") // ✅ get category from URL
    const router = useRouter()

    const products = useSelector((state) => state.product.list)

    // ✅ Filter by category or search
    const filteredProducts = products.filter((product) => {
        const matchesSearch = search
            ? product.name.toLowerCase().includes(search.toLowerCase())
            : true
        const matchesCategory = category
            ? product.category?.toLowerCase() === category.toLowerCase()
            : true
        return matchesSearch && matchesCategory
    })

    // ✅ Handle title
    const title = category
        ? `${category} Products`
        : search
            ? `Search Results`
            : "All Products"

    return (
        <div className="min-h-[70vh] mx-6">
            <div className="max-w-7xl mx-auto">
                <h1
                    onClick={() => router.push("/shop")}
                    className="text-2xl text-slate-500 my-6 flex items-center gap-2 cursor-pointer"
                >
                    {(search || category) && <MoveLeftIcon size={20}/>}
                    <span className="text-slate-700 font-medium">{title}</span>
                </h1>

                {filteredProducts.length === 0 ? (
                    <p className="text-slate-400">No products found.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto mb-32">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default function Shop() {
    return (
        <Suspense fallback={<div>Loading shop...</div>}>
            <ShopContent/>
        </Suspense>
    )
}