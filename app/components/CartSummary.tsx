"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import { X, Minus, Plus, Trash2, ShoppingBag, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function CartSummary() {
    const { cart, totalItems, totalPrice, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, setEditingItem } = useCart();
    const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');

    if (totalItems === 0) return null;

    return (
        <>
            {/* Floating Bar (Collapsed) */}
            {!isCartOpen && (
                <div className="fixed bottom-6 left-4 right-4 z-40 mx-auto max-w-md animate-slide-up">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="w-full flex items-center justify-between bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 p-4 rounded-xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-orange-500 text-white font-bold h-8 w-8 rounded-full flex items-center justify-center text-sm shadow-md">
                                {totalItems}
                            </div>
                            <span className="font-semibold text-lg">Ver Pedido</span>
                        </div>
                        <span className="font-bold text-lg">${totalPrice.toLocaleString('es-AR')}</span>
                    </button>
                </div>
            )}

            {/* Cart Panel (Expanded) */}
            <div
                className={cn(
                    "fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4 pointer-events-none",
                    isCartOpen ? "pointer-events-auto" : ""
                )}
            >
                {/* Backdrop */}
                <div
                    className={cn(
                        "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
                        isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                    onClick={() => setIsCartOpen(false)}
                />

                {/* Panel Content */}
                <div
                    className={cn(
                        "relative w-full max-w-lg max-h-[90vh] flex flex-col bg-white dark:bg-zinc-900 rounded-t-3xl sm:rounded-2xl shadow-2xl transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1)",
                        isCartOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                    )}
                >
                    {/* Handle for mobile drag visual */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full sm:hidden shrink-0 z-10" />

                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                            <ShoppingBag className="text-orange-500" />
                            Tu Pedido
                        </h2>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <X size={20} className="text-zinc-500 dark:text-zinc-400" />
                        </button>
                    </div>

                    {/* Items List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar min-h-0">
                        {cart.map((item) => (
                            <div key={item.cartItemId} className="flex gap-4 group">
                                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-1">
                                            {item.name}
                                        </h4>
                                        <span className="font-bold text-zinc-900 dark:text-zinc-50">
                                            ${((item.price + (item.flavorsExtraPrice || 0)) * item.quantity).toLocaleString('es-AR')}
                                        </span>
                                    </div>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                                        {item.id === "custom"
                                            ? `Pan de papa, ${item.customMeats}x Medallón${item.customIngredients && item.customIngredients.length > 0 ? `, ${item.customIngredients.join(', ')}` : ''}`
                                            : (item.selectedFlavors
                                                ? item.selectedFlavors.map(f => f.name).join(", ")
                                                : item.ingredients.slice(0, 3).join(", ") + "...")}
                                    </p>
                                    {!item.customIngredients && item.excludedIngredients && item.excludedIngredients.length > 0 && (
                                        <p className="text-xs text-red-500 dark:text-red-400 font-medium">
                                            Sin: {item.excludedIngredients.join(", ")}
                                        </p>
                                    )}

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-3 bg-zinc-100 dark:text-white text-zinc-900 dark:bg-zinc-800 rounded-lg p-1">
                                            <button
                                                onClick={() => updateQuantity(item.cartItemId, -1)}
                                                className="w-6 h-6 flex items-center justify-center rounded-md bg-white dark:bg-zinc-700 shadow-sm hover:scale-105 active:scale-95 transition-transform"
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span className="text-sm font-semibold w-3 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.cartItemId, 1)}
                                                className="w-6 h-6 flex items-center justify-center rounded-md bg-white dark:bg-zinc-700 shadow-sm hover:scale-105 active:scale-95 transition-transform"
                                            >
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => {
                                                    setEditingItem(item);
                                                    setIsCartOpen(false); // Hide cart while editing
                                                }}
                                                className="p-2 text-zinc-400 hover:text-blue-500 transition-colors"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => removeFromCart(item.cartItemId)}
                                                className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-b-3xl sm:rounded-b-2xl shrink-0">

                        {/* Delivery Method Selection */}
                        <div className="flex gap-2 mb-6 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                            <button
                                onClick={() => setDeliveryMethod('delivery')}
                                className={cn(
                                    "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200",
                                    deliveryMethod === 'delivery'
                                        ? "bg-white dark:bg-zinc-700 text-orange-600 dark:text-orange-400 shadow-sm"
                                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                                )}
                            >
                                Delivery
                            </button>
                            <button
                                onClick={() => setDeliveryMethod('pickup')}
                                className={cn(
                                    "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200",
                                    deliveryMethod === 'pickup'
                                        ? "bg-white dark:bg-zinc-700 text-orange-600 dark:text-orange-400 shadow-sm"
                                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                                )}
                            >
                                Retiro
                            </button>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                                <span>Subtotal</span>
                                <span>${totalPrice.toLocaleString('es-AR')}</span>
                            </div>
                            <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                                <span>{deliveryMethod === 'delivery' ? 'Envío' : 'Retiro'}</span>
                                <span className="text-orange-500 font-medium">
                                    {deliveryMethod === 'delivery' ? 'A coordinar' : 'Gratis'}
                                </span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-zinc-900 dark:text-zinc-50 pt-3 border-t border-zinc-200 dark:border-zinc-700">
                                <span>Total</span>
                                <span>${totalPrice.toLocaleString('es-AR')}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                const phoneNumber = "543755246464"; // Formato internacional para Argentina
                                const orderDetails = cart.map(item => {
                                    let name = item.name;
                                    let extraText = "";
                                    if (item.selectedFlavors) {
                                        name += ` (${item.selectedFlavors.map(f => f.name).join(', ')})`;
                                    }
                                    if (item.id === "custom") {
                                        extraText = ` [${item.customMeats || 1}x Medallón, ${item.customIngredients?.join(', ') || 'Solo pan y carne'}]`;
                                    }

                                    let excludeText = "";
                                    if (item.excludedIngredients && item.excludedIngredients.length > 0) {
                                        excludeText = ` [SIN: ${item.excludedIngredients.join(", ")}]`;
                                    }

                                    let price = item.price;
                                    if (item.flavorsExtraPrice) price += item.flavorsExtraPrice;

                                    return `- ${item.quantity}x ${name}${extraText}${excludeText} ($${(price * item.quantity).toLocaleString('es-AR')})`;
                                }).join('%0A');
                                const total = totalPrice.toLocaleString('es-AR');
                                const method = deliveryMethod === 'delivery' ? 'Envío a Domicilio (Costo a coordinar)' : 'Retiro en Local';
                                const message = `¡Hola Top One Burgers! Quisiera realizar el siguiente pedido:%0A%0A${orderDetails}%0A%0A*Método de entrega:* ${method}%0A*Total estimada (sin envío): $${total}*%0A%0A¡Muchas gracias!`;

                                alert("¡Pedido preparado! Te estamos redirigiendo a WhatsApp para enviarlo.");
                                window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
                            }}
                            className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-4 rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-zinc-900/10 dark:shadow-white/10 uppercase tracking-wide"
                        >
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
