"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaUtensils } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // এখানে আপনার authClient.signUp কল হবে
        console.log("Registering:", formData);
        
        setTimeout(() => {
            setLoading(false);
            toast.success("Account created successfully!");
        }, 1500);
    };

    const inputGroupClass = `flex items-center gap-3 px-4 h-12 bg-base-100 rounded-xl border border-base-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all shadow-sm`;
    const inputClass = `w-full bg-transparent text-sm text-base-content placeholder:text-base-content/40 outline-none`;

    return (
        <section className="relative min-h-[95vh] w-full flex items-center justify-center bg-base-100 px-4 py-16 overflow-hidden">
            <div className="absolute top-10 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[460px] p-2 bg-base-200/50 backdrop-blur-md rounded-3xl border border-base-300/60 shadow-2xl"
            >
                <div className="w-full h-full p-6 sm:p-9 bg-base-100 rounded-[1.3rem]">
                    <div className="text-center mb-7 flex flex-col items-center gap-3">
                        <div className="inline-flex items-center gap-2 p-2 bg-primary/10 rounded-xl text-primary mb-1">
                            <FaUtensils className="w-4 h-4" />
                        </div>
                        <h2 className="text-3xl font-black text-base-content tracking-tight mb-1">
                            Create <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Account</span>
                        </h2>
                        <p className="text-sm font-medium text-base-content/60">Join RecipeHub to explore secret culinary methods</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        {/* Name Input */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-base-content/60 pl-1">Full Name</label>
                            <div className={inputGroupClass}>
                                <FaUser className="text-base-content/30 text-lg" />
                                <input type="text" required placeholder="Enter Your Name" className={inputClass} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-base-content/60 pl-1">Email Address</label>
                            <div className={inputGroupClass}>
                                <FaEnvelope className="text-base-content/30 text-lg" />
                                <input type="email" required placeholder="Enter Your Email" className={inputClass} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1.5 relative">
                            <label className="text-xs font-bold uppercase tracking-wider text-base-content/60 pl-1">Password</label>
                            <div className={inputGroupClass}>
                                <FaLock className="text-base-content/30 text-lg" />
                                <input type={showPassword ? "text" : "password"} required placeholder="••••••••" className={`${inputClass} pr-10`} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                            </div>
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 bottom-3.5 text-base-content/30 hover:text-primary transition-colors p-1 rounded-md">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <button type="submit" disabled={loading} className="w-full h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-accent to-secondary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-95 transition-all">
                            {loading ? "Creating..." : "Register Now"} {!loading && <FaArrowRight />}
                        </button>
                    </form>

                    <p className="text-center text-sm text-base-content/60 font-medium mt-6">
                        Already have an account? <Link href="/login" className="font-bold text-primary hover:underline">Log In</Link>
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default RegisterPage;