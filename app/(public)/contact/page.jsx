'use client'

import {MailIcon, MessageCircleIcon} from "lucide-react"

export default function Contact() {
    return (
        <div
            className="min-h-[70vh] bg-gradient-to-b from-white via-green-50 to-white flex flex-col items-center justify-center px-6 py-16">
            <div className="max-w-3xl w-full text-center">
                <h1 className="text-4xl font-bold text-green-700 mb-4">Get in Touch</h1>
                <p className="text-slate-600 text-lg mb-10">
                    We’re always happy to hear from you!
                    Whether you have questions, suggestions, or need assistance, feel free to reach out.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Gmail Section */}
                    <div
                        className="bg-white rounded-2xl p-8 shadow-sm border border-green-100 hover:shadow-md transition">
                        <div className="flex flex-col items-center">
                            <div className="p-4 bg-green-100 rounded-full mb-4">
                                <MailIcon className="w-8 h-8 text-green-600"/>
                            </div>
                            <h2 className="text-xl font-semibold text-slate-800 mb-2">Email Us</h2>
                            <p className="text-slate-600 text-sm mb-1">We’re here to help anytime.</p>
                            <a
                                href="mailto:fridaycartbd@gmail.com"
                                className="text-green-600 font-medium mt-2 hover:underline"
                            >
                                fridaycartbd@gmail.com
                            </a>
                        </div>
                    </div>

                    {/* WhatsApp Section */}
                    <div
                        className="bg-white rounded-2xl p-8 shadow-sm border border-green-100 hover:shadow-md transition">
                        <div className="flex flex-col items-center">
                            <div className="p-4 bg-green-100 rounded-full mb-4">
                                <MessageCircleIcon className="w-8 h-8 text-green-600"/>
                            </div>
                            <h2 className="text-xl font-semibold text-slate-800 mb-2">WhatsApp</h2>
                            <p className="text-slate-600 text-sm mb-1">Chat with our support team.</p>
                            <a
                                href="https://wa.me/8801321764096"
                                target="_blank"
                                className="text-green-600 font-medium mt-2 hover:underline"
                            >
                                +880 1321-764096
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-slate-500 text-sm">
                    <p>We’ll get back to you as soon as possible 💚</p>
                </div>
            </div>
        </div>
    )
}