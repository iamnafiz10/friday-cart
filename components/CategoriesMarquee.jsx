'use client'

import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import axios from "axios"

export default function CategoriesMarquee() {
    const [categories, setCategories] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const {data} = await axios.get("/api/categories")
                setCategories(data.categories || [])
            } catch (error) {
                console.error("❌ Failed to fetch categories:", error)
            }
        }
        fetchCategories()
    }, [])

    const handleCategoryClick = (categoryName) => {
        router.push(`/shop?category=${encodeURIComponent(categoryName)}`)
    }

    if (categories.length === 0) {
        return (
            <div className="text-center text-slate-400 py-10">
                No categories available
            </div>
        )
    }

    // Repeat enough times to fill screen even if only 1–2 items
    const repeated = Array(10).fill(categories).flat()

    return (
        <div className="relative w-full overflow-hidden select-none sm:my-20">
            {/* Left gradient */}
            <div
                className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"/>

            {/* Marquee */}
            <div className="flex animate-scroll">
                <div className="flex flex-nowrap gap-4 px-4">
                    {repeated.map((cat, index) => (
                        <button
                            key={`cat-${index}-${cat.id ?? cat.name}`}
                            onClick={() => handleCategoryClick(cat.name)}
                            className="px-5 py-2 bg-slate-100 rounded-lg text-slate-500 text-xs sm:text-sm hover:bg-slate-600 hover:text-white active:scale-95 transition-all duration-300 whitespace-nowrap"
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Right gradient */}
            <div
                className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"/>

            {/* Keyframes */}
            <style jsx>{`
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }

              .animate-scroll {
                display: flex;
                width: max-content;
                animation: scroll 25s linear infinite;
              }
            `}</style>
        </div>
    )
}