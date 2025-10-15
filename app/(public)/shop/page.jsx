'use client'

import {Suspense, useEffect, useState} from "react"
import ProductCard from "@/components/ProductCard"
import {MoveLeftIcon} from "lucide-react"
import {useRouter, useSearchParams} from "next/navigation"
import {useSelector} from "react-redux"
import axios from "axios"

function ShopContent() {
    const searchParams = useSearchParams()
    const search = searchParams.get("search")
    const categoryParam = searchParams.get("category")
    const router = useRouter()

    const products = useSelector((state) => state.product.list)
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(categoryParam || "")
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 12

    // ✅ Fetch all categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const {data} = await axios.get("/api/categories")
                setCategories(data.categories || [])
            } catch (error) {
                console.error("Failed to fetch categories:", error)
            }
        }
        fetchCategories()
    }, [])

    // ✅ Reset page to 1 when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [search, selectedCategory])

    // ✅ Filter by category or search
    const filteredProducts = products.filter((product) => {
        const matchesSearch = search
            ? product.name.toLowerCase().includes(search.toLowerCase())
            : true
        const matchesCategory = selectedCategory
            ? product.category?.toLowerCase() === selectedCategory.toLowerCase()
            : true
        return matchesSearch && matchesCategory
    })

    // ✅ Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
    const startIndex = (currentPage - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

    // ✅ Handle title
    const title = selectedCategory
        ? `${selectedCategory} Products`
        : search
            ? `Search Results`
            : "All Products"

    // ✅ Handle dropdown change
    const handleCategoryChange = (e) => {
        const category = e.target.value
        setSelectedCategory(category)
        if (category) {
            router.push(`/shop?category=${encodeURIComponent(category)}`)
        } else {
            router.push(`/shop`)
        }
    }

    // ✅ Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page)
        window.scrollTo({top: 0, behavior: "smooth"})
    }

    const handleBack = () => {
        setSelectedCategory("")
        router.push("/shop")
        router.refresh()
        setCurrentPage(1)
    }

    return (
        <div className="min-h-[70vh] mx-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center my-6">
                    <h1
                        onClick={handleBack}
                        className="text-2xl text-slate-500 flex items-center gap-2 cursor-pointer"
                    >
                        {(search || selectedCategory) && <MoveLeftIcon size={20}/>}
                        <span className="text-slate-700 font-medium">{title}</span>
                    </h1>

                    {/* ✅ Category Filter Dropdown */}
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="mt-3 sm:mt-0 border border-slate-300 text-slate-600 px-4 py-2 rounded-lg outline-none cursor-pointer hover:border-slate-400 transition"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {filteredProducts.length === 0 ? (
                    <p className="text-slate-400">No products found.</p>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto mb-10">
                            {paginatedProducts.map((product) => (
                                <ProductCard key={product.id} product={product}/>
                            ))}
                        </div>

                        {/* ✅ Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mb-20">
                                {Array.from({length: totalPages}).map((_, index) => {
                                    const pageNum = index + 1
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`px-4 py-2 rounded-md border text-sm ${
                                                currentPage === pageNum
                                                    ? "bg-slate-700 text-white border-slate-700"
                                                    : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </>
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