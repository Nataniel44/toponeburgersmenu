"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CartProvider, useCart } from "./components/CartContext";
import Header from "./components/Header";
import BurgerCard from "./components/BurgerCard";
import ProductModal from "./components/ProductModal";
import CartSummary from "./components/CartSummary";
import { burgers, Burger } from "./data";

function HomeContent() {
  const [selectedBurger, setSelectedBurger] = useState<Burger | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setIsCartOpen, editingItem, setEditingItem } = useCart();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Force play for iOS devices
      videoRef.current.play().catch((e) => console.log("Video autoplay failed:", e));
    }
  }, []);

  const handleSelectBurger = (burger: Burger) => {
    setSelectedBurger(burger);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (editingItem) setEditingItem(null);
    setIsModalOpen(false);
    setTimeout(() => setSelectedBurger(null), 300); // Clear after animation
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-300">
      <Header />

      {/* Hero Section - App Style */}
      <section className="pt-24 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* App Greeting */}
        <div className="flex items-center justify-between mb-5 animate-slide-up">
          <div>
            <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">¡Hola! 👋</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mt-0.5">¿Qué vas a pedir hoy?</p>
          </div>
        </div>

        {/* Featured Banner Card */}
        <div className="relative h-48 sm:h-64 w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-orange-500/10 mb-6 group animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          >
            <source src="fondo.mp4" type="video/mp4" />
          </video>
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-center">
            <span className="inline-block px-3 py-1 rounded-full bg-orange-500 text-white font-bold text-[10px] sm:text-xs tracking-widest uppercase w-max mb-3 shadow-md border border-orange-400/30">
              Top One San Vicente
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.15] max-w-[220px] sm:max-w-sm drop-shadow-md">
              El Sabor Que <span className="text-orange-400">Revoluciona</span> Tu Paladar
            </h2>
            <div className="mt-4">
              <a href="#menu-selection" className="inline-flex items-center justify-center px-5 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-sm shadow-xl transition-all duration-300 active:scale-95">
                Ver Menú
              </a>
            </div>
          </div>
        </div>

        {/* Categories / Quick Filters */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button className="whitespace-nowrap px-6 py-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-sm shadow-lg shadow-zinc-900/10 dark:shadow-white/10 transition-transform active:scale-95 flex items-center gap-2">
            <span className="text-lg">🍔</span> Burgers
          </button>
          <button className="whitespace-nowrap px-6 py-3 rounded-2xl bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 font-bold text-sm shadow-sm border border-zinc-100 dark:border-zinc-800 transition-transform active:scale-95 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center gap-2">
            <span className="text-lg">🍟</span> Papas <span className="text-[10px] font-medium opacity-60 ml-1">(Pronto)</span>
          </button>
          <button className="whitespace-nowrap px-6 py-3 rounded-2xl bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 font-bold text-sm shadow-sm border border-zinc-100 dark:border-zinc-800 transition-transform active:scale-95 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center gap-2">
            <span className="text-lg">🥤</span> Bebidas <span className="text-[10px] font-medium opacity-60 ml-1">(Pronto)</span>
          </button>
        </div>
      </section>

      <section id="menu-selection" className="px-4 sm:px-6 lg:px-8 pb-16 max-w-7xl mx-auto scroll-mt-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Nuestra Selección</h2>
        </div>



        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {burgers.map((burger, index) => (
            <div
              key={burger.id}
              className="animate-slide-up"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <BurgerCard
                burger={burger}
                onSelect={handleSelectBurger}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Informacion del Local - App Style */}
      <section id="info" className="px-4 sm:px-6 lg:px-8 pb-24 max-w-7xl mx-auto scroll-mt-24 space-y-6">

        {/* Story Card (Nosotros) */}
        <div id="nosotros" className="bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden shadow-sm border border-zinc-100 dark:border-zinc-800">
          <div className="relative h-48 w-full">
            <Image
              src="/cs.png"
              alt="Cocinando"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-5">
              <h3 className="text-xl font-black text-white leading-tight">Nuestra Pasión</h3>
            </div>
          </div>
          <div className="p-5 sm:p-6 space-y-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              Hechas a mano, con amor y los mejores ingredientes. En Top One Burgers creamos experiencias. Todo comenzó en San Vicente, con el sueño de traer la mejor Burger a Misiones.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-950/20 px-3 py-1.5 rounded-xl border border-orange-100 dark:border-orange-900/30">
                <span className="text-orange-600 dark:text-orange-400 font-bold text-xs uppercase">100% Carne</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800/50 px-3 py-1.5 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-700 dark:text-zinc-300 font-bold text-xs uppercase">Pan Diario</span>
              </div>
            </div>
          </div>
        </div>

        {/* Store Info Menu (Local & Horarios) */}
        <div id="local" className="bg-white dark:bg-zinc-900 rounded-[2rem] p-5 sm:p-6 shadow-sm border border-zinc-100 dark:border-zinc-800">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Información del Local</h3>

          <div className="space-y-1">
            {/* Ubicacion */}
            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="w-10 h-10 shrink-0 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-900 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white">Local San Vicente</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">San Vicente, Misiones</p>
              </div>
            </div>

            <div className="h-px w-[80%] sm:w-[95%] bg-zinc-100 dark:bg-zinc-800 ml-14"></div>

            {/* Horarios */}
            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="w-10 h-10 shrink-0 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-900 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white">Abiertos hoy</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Mar - Dom: 19:30 a 00:00 hs</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">Abierto</span>
            </div>

            <div className="h-px w-[80%] sm:w-[95%] bg-zinc-100 dark:bg-zinc-800 ml-14"></div>

            {/* Contacto */}
            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="w-10 h-10 shrink-0 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white">WhatsApp</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">+54 9 3755 24-6464</p>
              </div>
              <a href="https://wa.me/543755246464" target="_blank" className="text-xs font-bold text-white bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform">Chatear</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - App Style */}
      <footer id="contacto" className="bg-white dark:bg-zinc-950 pb-28 pt-8 px-4 border-t border-zinc-100 dark:border-zinc-900 rounded-t-[2rem]">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-6">
          {/* Logo Mini */}
          <div className="px-5 py-2 bg-zinc-900 dark:bg-white rounded-2xl shadow-md flex items-center justify-center">
            <span className="text-white dark:text-zinc-900 font-black text-sm tracking-widest uppercase">
              Top <span className="text-orange-500">One</span>
            </span>
          </div>

          {/* Social Links App Style */}
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/toponeburgers/" className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/50 transition-all active:scale-90">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
            </a>
            <a href="https://www.facebook.com/toponeburgers/" className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/50 transition-all active:scale-90">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
          </div>

          <p className="text-zinc-400 dark:text-zinc-600 text-[10px] font-medium uppercase tracking-wider text-center max-w-[200px]">
            &copy; {new Date().getFullYear()} Top One Burgers<br />San Vicente, Misiones
          </p>
        </div>
      </footer>

      <ProductModal
        isOpen={isModalOpen || !!editingItem}
        onClose={handleCloseModal}
        burger={editingItem ? editingItem : selectedBurger}
        isEditing={!!editingItem}
      />

      <CartSummary />
    </div>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <HomeContent />
    </CartProvider>
  );
}
