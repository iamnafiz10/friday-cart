export default function PrivacyPolicy() {
    // ✅ Get today's date
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="min-h-screen bg-slate-50 py-16 px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-10 border border-slate-100">
                <h1 className="text-3xl font-semibold text-slate-800 mb-6 text-center">
                    Privacy Policy
                </h1>

                {/* ✅ Auto-updating date */}
                <p className="text-slate-500 text-center mb-10">
                    Effective Date: {formattedDate}
                </p>

                <div className="space-y-8 text-slate-600 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-2">
                            1. Introduction
                        </h2>
                        <p>
                            Welcome to <span className="font-semibold text-slate-700">FridayCart</span>.
                            We respect your privacy and are committed to protecting your personal information.
                            This Privacy Policy explains how we collect, use, and safeguard your data when you visit our
                            website
                            or make a purchase from our platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-2">
                            2. Information We Collect
                        </h2>
                        <p>
                            We may collect personal details such as your name, email address, phone number,
                            shipping address, and payment information when you create an account, make an order,
                            or contact us for support.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-2">
                            3. How We Use Your Information
                        </h2>
                        <p>
                            The information we collect is used to:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>Process and deliver your orders</li>
                            <li>Improve our products and customer experience</li>
                            <li>Send updates, promotions, or relevant notifications</li>
                            <li>Respond to your questions and support requests</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-2">
                            4. Data Protection
                        </h2>
                        <p>
                            We implement appropriate security measures to protect your data
                            from unauthorized access, alteration, disclosure, or destruction.
                            However, please note that no method of online transmission is completely secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-2">
                            5. Third-Party Services
                        </h2>
                        <p>
                            FridayCart may use trusted third-party tools for payments, analytics,
                            and logistics. These partners only receive the minimum data required
                            to perform their services safely and efficiently.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-2">
                            6. Your Rights
                        </h2>
                        <p>
                            You can request to view, update, or delete your personal data at any time.
                            To do so, please reach out to us using the contact details below.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-2">
                            7. Contact Us
                        </h2>
                        <p>
                            If you have any questions about our Privacy Policy or data practices,
                            feel free to contact us:
                        </p>
                        <div className="mt-3 space-y-1">
                            <p><span className="font-medium text-slate-800">Email:</span> fridaycartbd@gmail.com</p>
                            <p><span className="font-medium text-slate-800">WhatsApp:</span> 01321764096</p>
                        </div>
                    </section>

                    <p className="text-center text-slate-400 text-sm mt-12">
                        © {new Date().getFullYear()} FridayCart — All Rights Reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}