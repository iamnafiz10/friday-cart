'use client'
import PageTitle from "@/components/PageTitle"
import {useEffect, useState} from "react";
import OrderItem from "@/components/OrderItem";
import {useAuth, useUser} from "@clerk/nextjs";
import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import Loading from "@/components/Loading";

export default function Orders() {
    const {getToken} = useAuth();
    const {user, isLoaded} = useUser();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // ✅ Pagination state
    const ordersPerPage = 10;
    const router = useRouter();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = await getToken();
                const {data} = await axios.get('/api/orders', {
                    headers: {Authorization: `Bearer ${token}`}
                });

                // ✅ Sort newest first
                const sortedOrders = data.orders.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );

                setOrders(sortedOrders);
                setLoading(false);
            } catch (error) {
                toast.error(error?.response?.data?.error || error.message);
            }
        };
        if (isLoaded) {
            if (user) {
                fetchOrders();
            } else {
                router.push('/');
            }
        }
    }, [isLoaded, user, getToken, router]);

    if (!isLoaded || loading) {
        return <Loading/>;
    }

    // ✅ Show Bangla message only when status === "ORDER_PLACED"
    const hasPlacedOrder = orders.some(order => order.status === "ORDER_PLACED");

    // ✅ Pagination Logic
    const totalPages = Math.ceil(orders.length / ordersPerPage);
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    return (
        <div className="min-h-[70vh] mx-6">
            {/* ✅ Bangla Islamic Alert */}
            {hasPlacedOrder && (
                <div className="max-w-3xl mx-auto my-10 animate-fadeIn">
                    <div
                        className="bg-gradient-to-r from-green-100 via-emerald-50 to-green-100 border border-emerald-200 rounded-xl shadow-md p-6 text-center">
                        <p className='text-[18px] text-emerald-700 font-semibold'>
                            আমাদের কল সেন্টার থেকে ফোন করে আপনার অর্ডারটি কনফার্ম করা হবে।
                        </p>
                        <p className="text-red-500 text-sm sm:text-base leading-relaxed mt-2">
                            ফেইক অর্ডার শনাক্ত করতে আমরা আপনাদের <span
                            className="font-bold text-green-500">IP Address</span> রেখে
                            দিচ্ছি। <br/>
                            যে ফেইক অর্ডার করবে, তার বিরুদ্ধে আইনগত পদক্ষেপ নেওয়া হবে।
                        </p>
                        <p className="mt-2 text-xs sm:text-sm text-black font-semibold">
                            আল্লাহ তায়ালা আমাদের হালাল উপার্জন ও সততার পথে রাখুন। 🤲
                        </p>
                    </div>
                </div>
            )}

            {/* ✅ Orders Table */}
            {orders.length > 0 ? (
                <div className="mb-20 mt-10 max-w-7xl mx-auto">
                    <PageTitle
                        heading="My Orders"
                        text={`Showing total ${orders.length} orders`}
                        linkText={'Go to home'}
                    />

                    <table
                        className="w-full max-w-5xl text-slate-500 table-auto border-separate border-spacing-y-12 border-spacing-x-4">
                        <thead>
                        <tr className="max-sm:text-sm text-slate-600 max-md:hidden">
                            <th className="text-left">Product</th>
                            <th className="text-center">Total Price</th>
                            <th className="text-left">Address</th>
                            <th className="text-left">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentOrders.map((order) => (
                            <OrderItem order={order} key={order.id}/>
                        ))}
                        </tbody>
                    </table>

                    {/* ✅ Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-12 gap-2">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-4 py-2 rounded-lg border transition-all ${
                                        currentPage === index + 1
                                            ? 'bg-emerald-600 text-white border-emerald-600'
                                            : 'bg-white text-emerald-600 border-emerald-300 hover:bg-emerald-50'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="min-h-[80vh] mx-6 flex items-center justify-center text-slate-400">
                    <h1 className="text-2xl sm:text-4xl font-semibold">You have no orders</h1>
                </div>
            )}

            {/* ✅ Animation */}
            <style jsx>{`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: translateY(-10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }

              .animate-fadeIn {
                animation: fadeIn 0.7s ease-in-out;
              }
            `}</style>
        </div>
    );
}