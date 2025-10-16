'use client'
import Counter from "@/components/Counter";
import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/PageTitle";
import {deleteItemFromCart} from "@/lib/features/cart/cartSlice";
import {Trash2Icon} from "lucide-react";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

export default function Cart() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '৳';

    const {cartItems} = useSelector(state => state.cart);
    const products = useSelector(state => state.product.list);

    const dispatch = useDispatch();

    const [cartArray, setCartArray] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const createCartArray = () => {
        setTotalPrice(0);
        const cartArray = [];
        for (const [key, value] of Object.entries(cartItems)) {
            const product = products.find(product => product.id === key);
            if (product) {
                cartArray.push({
                    ...product,
                    quantity: value,
                });
                setTotalPrice(prev => prev + product.price * value);
            }
        }
        setCartArray(cartArray);
    }

    const handleDeleteItemFromCart = (productId) => {
        dispatch(deleteItemFromCart({productId}))
    }

    useEffect(() => {
        if (products.length > 0) {
            createCartArray();
        }
    }, [cartItems, products]);

    return cartArray.length > 0 ? (
        <div className="min-h-screen mx-6 text-slate-800">

            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <PageTitle heading="My Cart" text="items in your cart" linkText="Add more" path='/shop'/>

                <div className="flex items-start justify-between gap-5 max-lg:flex-col">
                    <div className="w-full">
                        <table className="w-full text-slate-600 table-auto border-collapse">
                            <thead className="bg-slate-50 text-slate-700 uppercase text-sm max-sm:hidden">
                            <tr>
                                <th className="text-left py-3 px-4">Product</th>
                                <th className="text-center py-3 px-4">Quantity</th>
                                <th className="text-center py-3 px-4">Total Price</th>
                                <th className="text-center py-3 px-4 hidden sm:table-cell">Remove</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                            {cartArray.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`
              hover:bg-slate-50 transition-all duration-200
              max-sm:flex max-sm:flex-col max-sm:gap-2
              max-sm:rounded-lg max-sm:border max-sm:border-slate-200 max-sm:p-4 max-sm:shadow-sm max-sm:mb-3
              max-sm:relative
            `}
                                >
                                    <td className="flex gap-3 items-start py-3 px-4 max-sm:p-0">
                                        <div
                                            className="bg-slate-100 rounded-md flex items-center justify-center w-16 h-16 shrink-0">
                                            <Image
                                                src={item.images[0]}
                                                className="object-contain h-14 w-auto"
                                                alt={item.name}
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-slate-700">{item.name}</p>
                                            <p className="text-xs text-slate-500">{item.category}</p>
                                            <p className="text-sm font-semibold">{currency}{item.price}</p>
                                        </div>

                                        {/* Mobile Remove Button */}
                                        <button
                                            onClick={() => handleDeleteItemFromCart(item.id)}
                                            className="text-red-500 hover:bg-red-50 p-1.5 rounded-full active:scale-95 transition-all sm:hidden absolute top-3 right-3"
                                            aria-label={`Remove ${item.name}`}
                                        >
                                            <Trash2Icon size={18}/>
                                        </button>
                                    </td>

                                    <td className="text-center py-3 px-4 max-sm:p-0 max-sm:text-left">
                                        <Counter productId={item.id}/>
                                    </td>

                                    <td className="text-center py-3 px-4 max-sm:p-0 max-sm:text-left font-semibold text-slate-700">
                                        {currency}{(item.price * item.quantity).toLocaleString()}
                                    </td>

                                    <td className="text-center py-3 px-4 hidden sm:table-cell">
                                        <button
                                            onClick={() => handleDeleteItemFromCart(item.id)}
                                            className="text-red-500 hover:bg-red-50 p-2.5 rounded-full active:scale-95 transition-all"
                                            aria-label={`Remove ${item.name}`}
                                        >
                                            <Trash2Icon size={18}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <OrderSummary totalPrice={totalPrice} items={cartArray}/>
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-[80vh] mx-6 flex items-center justify-center text-slate-400">
            <h1 className="text-2xl sm:text-4xl font-semibold">Your cart is empty</h1>
        </div>
    )
}