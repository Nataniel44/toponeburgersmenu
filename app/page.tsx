"use client";

import { useState } from "react";
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

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Video Layer */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="fondo.mp4" type="video/mp4" />
          </video>
          {/* Smooth Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/80 via-zinc-50/40 to-zinc-50 dark:from-black/80 dark:via-black/40 dark:to-black backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="inline-block px-5 py-2 rounded-full bg-orange-100/80 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 font-bold text-xs sm:text-sm tracking-[0.2em] uppercase animate-fade-in border border-orange-500/20 backdrop-blur-md shadow-sm">
              Top One Burgers • San Vicente
            </span>
            <h1 className="text-5xl sm:text-7xl font-black text-zinc-900 dark:text-white leading-[1.1] animate-slide-up tracking-tight" style={{ animationDelay: '0.1s' }}>
              El Sabor Que <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 drop-shadow-sm">Revoluciona</span> Tu Paladar
            </h1>
            <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto animate-slide-up font-medium leading-relaxed" style={{ animationDelay: '0.2s' }}>
              Medallones 100% premium, pan de papa horneado en el día y combinaciones únicas. Descubre la verdadera experiencia artesanal.
            </p>
            <div className="pt-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <a href="#menu-selection" className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold text-lg shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 hover:-translate-y-1 active:scale-95">
                Ver Nuestro Menú
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="menu-selection" className="px-4 sm:px-6 lg:px-8 pb-32 max-w-7xl mx-auto scroll-mt-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Nuestra Selección</h2>
        </div>



        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Nosotros Section */}
      <section id="nosotros" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/cs.png"
              alt="Cocinando"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <p className="text-white font-medium italic text-lg line-clamp-2">
                "Cocinamos cada burger como si fuera para nosotros mismos."
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">Nuestra Pasión</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">Hechas a mano, con amor y los mejores ingredientes.</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              En Top One Burgers, no solo hacemos comida; creamos experiencias. Todo comenzó en San Vicente, con el sueño de traer la mejor Burger a Misiones.
              <br /><br />
              Utilizamos cortes de carne seleccionados, pan de papa horneado diariamente y vegetales de productores locales. Nuestra meta es simple: que la primera mordida te haga volver siempre.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-white text-2xl">100%</h4>
                <p className="text-sm text-zinc-500">Carne Premium</p>
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-white text-2xl">DIARIO</h4>
                <p className="text-sm text-zinc-500">Pan Horneado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local & Horarios Section */}
      <section id="local" className="py-24 bg-zinc-100 dark:bg-zinc-900/50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Visitanos en San Vicente</h2>
            <p className="text-zinc-600 dark:text-zinc-400">El punto de encuentro para los amantes de las burgers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl shadow-black/5 border border-zinc-200/50 dark:border-zinc-800/50">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Ubicación</h3>
              <p className="text-zinc-600 dark:text-zinc-400">San Vicente, Misiones.<br />Consulta por WhatsApp la dirección exacta.</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl shadow-black/5 border border-zinc-200/50 dark:border-zinc-800/50">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Horarios</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Mar - Dom: 19:30 a 00:00 hs<br />Lunes: Cerrado</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl shadow-black/5 border border-zinc-200/50 dark:border-zinc-800/50">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Contacto</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Tel: 3755 246464<br />IG: @toponeburgers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-white dark:bg-black border-t border-zinc-100 dark:border-zinc-900 pt-20 pb-10 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1 space-y-6">
              <div className="flex items-center gap-2">
                <div className="px-4 py-1.5 bg-zinc-900 dark:bg-white rounded-xl shadow-xl flex items-center justify-center">
                  <span className="text-white dark:text-orange-600 font-extrabold text-lg tracking-tight uppercase">
                    Top <span className="text-orange-500 dark:text-zinc-900">One</span>
                  </span>
                </div>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                Las mejores hamburguesas de San Vicente directas a tu mesa. Calidad premium garantizada.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white mb-6 uppercase text-sm tracking-widest">Navegación</h4>
              <ul className="space-y-4 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                <li><a href="#menu-selection" className="hover:text-orange-500 transition-colors">Menú</a></li>
                <li><a href="#local" className="hover:text-orange-500 transition-colors">Ubicación</a></li>
                <li><a href="#nosotros" className="hover:text-orange-500 transition-colors">Sobre Nosotros</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white mb-6 uppercase text-sm tracking-widest">Social</h4>
              <ul className="space-y-4 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Facebook</a></li>
                <li><a href="https://wa.me/543755246464" className="hover:text-orange-500 transition-colors" target="_blank">WhatsApp</a></li>
              </ul>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-3xl">
              <h4 className="font-bold text-zinc-900 dark:text-white mb-4 uppercase text-sm tracking-widest text-center md:text-left">¿Antojo?</h4>
              <button
                onClick={() => setIsCartOpen(true)}
                className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95"
              >
                Pedir Ahora
              </button>
            </div>
          </div>

          <div className="pt-10 border-t border-zinc-100 dark:border-zinc-900 text-center">
            <p className="text-zinc-400 dark:text-zinc-600 text-xs">
              &copy; {new Date().getFullYear()} Top One Burgers. San Vicente, Misiones. Todos los derechos reservados.
            </p>
          </div>
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
