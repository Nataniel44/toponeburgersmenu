"use client";

import { Moon, Sun, ShoppingBag, Menu, MapPin, Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { cn } from "@/lib/utils";

export default function Header() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("menu-selection");
    const { totalItems, setIsCartOpen } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Detect active section
            const sections = ["menu-selection", "nosotros", "local", "contacto"];
            const currentSection = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 120 && rect.bottom >= 120;
                }
                return false;
            });
            if (currentSection) setActiveSection(currentSection);
        };
        window.addEventListener("scroll", handleScroll);

        // Dark Mode Persistence Logic
        const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (storedTheme === "dark" || (!storedTheme && systemPrefersDark)) {
            setTheme("dark");
            document.documentElement.classList.add("dark");
        } else {
            setTheme("light");
            document.documentElement.classList.remove("dark");
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    const scrollToSection = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setMobileMenuOpen(false);
        }
    };

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out",
                    scrolled
                        ? "bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-white/20 dark:border-zinc-800/50 py-2"
                        : "bg-transparent py-4"
                )}
            >
                <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
                    {/* Logo Area */}
                    <div
                        className="flex items-center gap-3 group cursor-pointer"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative px-4 py-1.5 bg-zinc-900 dark:bg-white rounded-xl shadow-xl flex items-center justify-center">
                                <span className="text-white dark:text-orange-600 font-extrabold text-lg tracking-tight uppercase">
                                    Top <span className="text-orange-500 dark:text-zinc-900">One</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1 bg-zinc-100/50 dark:bg-zinc-800/30 p-1 rounded-full backdrop-blur-md border border-white/10">
                        <NavLink href="#menu-selection" onClick={(e) => scrollToSection(e, "menu-selection")} active={activeSection === "menu-selection"}>Menú</NavLink>
                        <NavLink href="#nosotros" onClick={(e) => scrollToSection(e, "nosotros")} active={activeSection === "nosotros"}>Nosotros</NavLink>
                        <NavLink href="#local" onClick={(e) => scrollToSection(e, "local")} active={activeSection === "local"}>Local</NavLink>
                        <NavLink href="#contacto" onClick={(e) => scrollToSection(e, "contacto")} active={activeSection === "contacto"}>Contacto</NavLink>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {/* Location Badge (Desktop) */}
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-xs font-medium border border-zinc-200/50 dark:border-zinc-800/50">
                            <MapPin size={14} className="text-orange-500" />
                            <span>San Vicente, MN</span>
                        </div>

                        <div className="flex items-center bg-white/50 dark:bg-zinc-900/50 p-1 rounded-full border border-zinc-200/50 dark:border-zinc-800/50">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-white dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-all duration-300"
                                aria-label="Toggle Theme"
                            >
                                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                            </button>

                            <button
                                className="p-2 rounded-full hover:bg-white dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-all duration-300"
                                aria-label="Search"
                                onClick={() => alert("Búsqueda próximamente disponible")}
                            >
                                <Search size={18} />
                            </button>
                        </div>

                        {/* Cart Button */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="group relative flex items-center gap-2 bg-orange-500 text-white pl-3 pr-4 py-2 rounded-full font-bold text-sm transition-all duration-300 hover:bg-orange-600 hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/25"
                        >
                            <div className="relative">
                                <ShoppingBag size={18} className="group-hover:animate-cart-bounce" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-zinc-900 text-white text-[10px] font-black h-4 w-4 flex items-center justify-center rounded-full border border-white/20 animate-scale-in">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                            <span className="hidden sm:inline">Pedido</span>
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 active:scale-90 transition-transform"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
                    mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Sidebar Content */}
            <div
                className={cn(
                    "fixed top-0 right-0 bottom-0 z-50 w-3/4 max-w-xs bg-white dark:bg-zinc-950 shadow-2xl transition-transform duration-300 ease-out lg:hidden",
                    mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex flex-col h-full p-6">
                    <div className="flex items-center justify-between mb-8">
                        <span className="font-extrabold text-xl dark:text-white uppercase tracking-tighter">
                            Menú
                        </span>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-4">
                        <MobileNavLink href="#menu-selection" onClick={(e) => scrollToSection(e, "menu-selection")} active={activeSection === "menu-selection"}>Menú</MobileNavLink>
                        <MobileNavLink href="#nosotros" onClick={(e) => scrollToSection(e, "nosotros")} active={activeSection === "nosotros"}>Nosotros</MobileNavLink>
                        <MobileNavLink href="#local" onClick={(e) => scrollToSection(e, "local")} active={activeSection === "local"}>Local</MobileNavLink>
                        <MobileNavLink href="#contacto" onClick={(e) => scrollToSection(e, "contacto")} active={activeSection === "contacto"}>Contacto</MobileNavLink>
                    </nav>

                    <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 text-sm">
                            <MapPin size={16} className="text-orange-500" />
                            <span>San Vicente, Misiones</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function NavLink({ href, children, active = false, onClick }: { href: string; children: React.ReactNode; active?: boolean; onClick?: (e: React.MouseEvent) => void }) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={cn(
                "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                active
                    ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-zinc-800/50"
            )}
        >
            {children}
        </a>
    );
}

function MobileNavLink({ href, children, active = false, onClick }: { href: string; children: React.ReactNode; active?: boolean; onClick?: (e: React.MouseEvent) => void }) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={cn(
                "px-4 py-3 rounded-xl text-lg font-bold transition-all",
                active
                    ? "bg-orange-50 text-orange-600 dark:bg-orange-950/20 dark:text-orange-400"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
            )}
        >
            {children}
        </a>
    );
}
