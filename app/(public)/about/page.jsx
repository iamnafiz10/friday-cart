'use client'

export default function About() {
    return (
        <div className="min-h-screen bg-white text-slate-700">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-green-50 to-green-100 py-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">
                        About <span className="text-green-600">FridayCart</span>
                    </h1>
                    <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">
                        Your trusted online shopping destination in Bangladesh — delivering quality, convenience, and
                        joy to every doorstep.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-16 bg-white rounded-t-[50%]"></div>
            </section>

            {/* Our Story Section */}
            <section className="max-w-6xl mx-auto py-20 px-6">
                <h2 className="text-3xl font-semibold text-slate-800 mb-4 text-center">
                    Our Story
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4 text-center max-w-3xl mx-auto">
                    FridayCart started with a simple idea — to make online shopping in Bangladesh simple, reliable, and
                    enjoyable for everyone.
                    We are a passionate team driven by innovation and customer satisfaction.
                </p>
                <p className="text-slate-600 leading-relaxed text-center max-w-3xl mx-auto">
                    From humble beginnings to becoming a trusted online marketplace,
                    FridayCart continues to grow while staying true to our core belief: <b>quality, affordability, and
                    trust.</b>
                </p>
            </section>

            {/* Mission and Vision */}
            <section className="bg-slate-50 py-20 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 text-center md:text-left">
                    <div>
                        <h2 className="text-3xl font-semibold text-slate-800 mb-4">
                            Our Mission
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            To empower online shoppers in Bangladesh with <b>trust, quality, and convenience</b> —
                            bringing the joy of Friday shopping to every day of the week.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-semibold text-slate-800 mb-4">
                            Our Vision
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            To become Bangladesh’s most loved online shopping destination,
                            connecting millions of buyers and sellers through innovation, simplicity, and trust.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="max-w-6xl mx-auto py-20 px-6">
                <h2 className="text-3xl font-semibold text-slate-800 text-center mb-12">
                    Why Choose <span className="text-green-600">FridayCart</span>?
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {title: "Wide Selection", desc: "Shop from hundreds of trusted brands and categories."},
                        {
                            title: "Fast Delivery",
                            desc: "Get your favorite products delivered quickly across Bangladesh."
                        },
                        {title: "Best Prices", desc: "Affordable deals, seasonal offers, and everyday savings."},
                        {title: "Secure Shopping", desc: "Safe payments and guaranteed data protection."}
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
                        >
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-slate-600 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section className="bg-green-600 py-16 text-white text-center">
                <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
                <p className="max-w-xl mx-auto mb-6">
                    Have a question, feedback, or partnership inquiry? We’d love to hear from you.
                </p>
                <a
                    href="mailto:fridaycartbd@gmail.com"
                    className="px-8 py-3 bg-white text-green-600 font-medium rounded-full shadow hover:bg-slate-100 transition"
                >
                    fridaycartbd@gmail.com
                </a>
            </section>
        </div>
    )
}