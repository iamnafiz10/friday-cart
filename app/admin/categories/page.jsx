'use client'
import {useEffect, useState} from "react"
import toast from "react-hot-toast"
import {DeleteIcon, PlusIcon, XIcon} from "lucide-react"
import {useAuth} from "@clerk/nextjs"
import axios from "axios"

export default function AdminCategories() {
    const {getToken} = useAuth()
    const [categories, setCategories] = useState([])

    const [showModal, setShowModal] = useState(false)
    const [newCategory, setNewCategory] = useState({name: ""})

    // ✅ Fetch categories
    const fetchCategories = async () => {
        try {
            const token = await getToken()
            const {data} = await axios.get('/api/admin/category', {
                headers: {Authorization: `Bearer ${token}`}
            })
            setCategories(data.categories ?? data)
        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        }
    }

    // ✅ Add new category
    const handleAddCategory = async () => {
        if (!newCategory.name.trim()) {
            throw new Error("Category name cannot be empty");
        }

        const token = await getToken()
        const {data} = await axios.post(
            '/api/admin/category',
            {category: {name: newCategory.name}},
            {headers: {Authorization: `Bearer ${token}`}}
        )

        await fetchCategories()
        setNewCategory({name: ""})
        setShowModal(false)
        return data.message || "Category added successfully"
    }

    // ✅ Delete category
    const deleteCategory = async (idOrName) => {
        const confirmed = window.confirm("Are you sure you want to delete this category?")
        if (!confirmed) return

        const token = await getToken()
        await axios.delete(`/api/admin/category?id=${idOrName}`, {
            headers: {Authorization: `Bearer ${token}`}
        })

        toast.success("Category deleted successfully")
        await fetchCategories()
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <div className="text-slate-700 mb-40 p-4">
            {/* Header Section */}
            <div className="flex justify-between items-center max-w-4xl">
                <h2 className="text-2xl font-semibold">Manage Categories</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition"
                >
                    <PlusIcon className="w-4 h-4"/> Add Category
                </button>
            </div>

            {/* Categories Table */}
            <div className="overflow-x-auto mt-6 rounded-lg border border-slate-200 max-w-4xl">
                <table className="min-w-full bg-white text-sm">
                    <thead className="bg-slate-50">
                    <tr>
                        <th className="py-3 px-4 text-left font-semibold text-slate-600 w-16">SI</th>
                        <th className="py-3 px-4 text-left font-semibold text-slate-600">Name</th>
                        <th className="py-3 px-4 text-left font-semibold text-slate-600">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                    {categories.length === 0 ? (
                        <tr>
                            <td className="py-3 px-4 text-slate-500" colSpan={3}>No categories found</td>
                        </tr>
                    ) : (
                        categories.map((category, index) => (
                            <tr
                                key={category.id ?? category._id ?? category.name}
                                className="hover:bg-slate-50"
                            >
                                <td className="py-3 px-4 text-slate-600 font-medium">{index + 1}</td>
                                <td className="py-3 px-4 font-medium text-slate-800">{category.name}</td>
                                <td className="py-3 px-4 text-slate-800">
                                    <DeleteIcon
                                        onClick={() =>
                                            toast.promise(
                                                deleteCategory(category.id ?? category._id ?? category.name),
                                                {loading: "Deleting category..."}
                                            )
                                        }
                                        className="w-5 h-5 text-red-500 hover:text-red-800 cursor-pointer"
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {/* ✅ Modal for Adding Category */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-slate-800">Add Category</h3>
                            <XIcon
                                onClick={() => setShowModal(false)}
                                className="w-5 h-5 text-slate-500 hover:text-slate-700 cursor-pointer"
                            />
                        </div>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter category name"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({name: e.target.value})}
                            className="w-full p-2 border border-slate-200 rounded-md outline-slate-400"
                            required
                        />

                        <div className="flex justify-end mt-5 gap-3">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-100"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    toast.promise(handleAddCategory(), {
                                        loading: "Adding category...",
                                        success: (msg) => msg,
                                        error: (err) => err.message || "Failed to add category"
                                    })
                                }
                                className="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-800"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}