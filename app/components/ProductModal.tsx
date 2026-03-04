"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { X, Minus, Plus } from "lucide-react";
import { Burger, burgers } from "@/app/data";
import { useCart, CartItem } from "./CartContext";
import { cn } from "@/lib/utils";

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    burger: Burger | CartItem | null;
    isEditing?: boolean;
}

export default function ProductModal({ isOpen, onClose, burger, isEditing }: ProductModalProps) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart, updateCartItem, setIsCartOpen } = useCart();
    const [isAnimating, setIsAnimating] = useState(false);

    // For Minis
    const isMiniBurgers = burger?.id === "5";
    const flavorOptions = burgers.filter(b => b.id !== "4" && b.id !== "5");
    const [flavor1, setFlavor1] = useState<string>("1");
    const [flavor2, setFlavor2] = useState<string>("1");
    const [flavor3, setFlavor3] = useState<string>("1");

    // For normal burgers (ingredient toggling)
    const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);

    // For custom burgers
    const isCustom = burger?.id === "custom";
    const [customMeats, setCustomMeats] = useState<number>(1);
    const [customIngredients, setCustomIngredients] = useState<string[]>([]);

    const availableDressings = ["Mayo", "Ketchup", "Salsa BBQ", "Mostaza", "Salsa de Ajo"];
    const availableCheeses = ["Queso Cheddar", "Queso Barra"];
    const availableExtras = ["Tomate", "Lechuga", "Cebolla Caramelizada", "Huevo", "Jamón", "Panceta"];

    const toggleCustomIngredient = (ingredient: string) => {
        setCustomIngredients(prev =>
            prev.includes(ingredient)
                ? prev.filter(i => i !== ingredient)
                : [...prev, ingredient]
        );
    };

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            document.body.style.overflow = 'hidden';
            if (isEditing && burger) {
                const cartItem = burger as CartItem;
                setQuantity(cartItem.quantity);
                if (cartItem.selectedFlavors && cartItem.selectedFlavors.length === 3) {
                    setFlavor1(cartItem.selectedFlavors[0].id);
                    setFlavor2(cartItem.selectedFlavors[1].id);
                    setFlavor3(cartItem.selectedFlavors[2].id);
                } else {
                    setFlavor1("1");
                    setFlavor2("1");
                    setFlavor3("1");
                }
                setExcludedIngredients(cartItem.excludedIngredients || []);
                setCustomIngredients(cartItem.customIngredients || []);
                setCustomMeats(cartItem.customMeats || 1);
            } else {
                setQuantity(1);
                setFlavor1("1");
                setFlavor2("1");
                setFlavor3("1");
                setExcludedIngredients([]);
                setCustomIngredients([]);
                setCustomMeats(1);
            }
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen, isMiniBurgers, isEditing, burger]);

    if (!isOpen && !isAnimating) return null;
    if (!burger) return null;

    const isHulk = (id: string) => id === "6";
    const extraPricePerHulkPair = 500;

    const f1 = flavorOptions.find(b => b.id === flavor1);
    const f2 = flavorOptions.find(b => b.id === flavor2);
    const f3 = flavorOptions.find(b => b.id === flavor3);
    const selectedFlavors = [f1, f2, f3].filter(Boolean) as Burger[];

    const flavorsExtraPrice = isMiniBurgers
        ? ([flavor1, flavor2, flavor3].filter(isHulk).length * extraPricePerHulkPair)
        : (isCustom && customMeats === 2) ? 1500 : 0;

    const toggleIngredient = (ingredient: string) => {
        setExcludedIngredients(prev =>
            prev.includes(ingredient)
                ? prev.filter(i => i !== ingredient)
                : [...prev, ingredient]
        );
    };

    const handleAddToCart = () => {
        const finalExcludedIngredients = excludedIngredients.length > 0 ? excludedIngredients : undefined;
        const finalCustomIngredients = customIngredients.length > 0 ? customIngredients : undefined;

        if (isEditing) {
            const cartItem = burger as CartItem;
            updateCartItem(cartItem.cartItemId, quantity, isMiniBurgers ? selectedFlavors : undefined, flavorsExtraPrice, isMiniBurgers || isCustom ? undefined : finalExcludedIngredients, isCustom ? finalCustomIngredients : undefined, isCustom ? customMeats : undefined);
            onClose();
            setTimeout(() => setIsCartOpen(true), 300);
        } else {
            addToCart(burger, quantity, isMiniBurgers ? selectedFlavors : undefined, flavorsExtraPrice, isMiniBurgers || isCustom ? undefined : finalExcludedIngredients, isCustom ? finalCustomIngredients : undefined, isCustom ? customMeats : undefined);
            onClose();
        }
    };

    return (
        <div
            className={cn(
                "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4",
                isOpen ? "pointer-events-auto" : "pointer-events-none"
            )}
        >
            {/* Backdrop */}
            <div
                className={cn(
                    "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0"
                )}
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={cn(
                    "relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-t-3xl sm:rounded-2xl shadow-2xl transition-transform duration-300 ease-out sm:duration-200",
                    isOpen ? "translate-y-0 scale-100" : "translate-y-full sm:translate-y-10 sm:scale-95 sm:opacity-0"
                )}
            >
                {/* Close Button Mobile */}
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors backdrop-blur-md"
                    >
                        <X size={20} className="text-zinc-900 dark:text-white" />
                    </button>
                </div>

                {/* Header (Image or Custom) */}
                {!isCustom && (
                    <div className="relative h-64 sm:h-72 w-full shrink-0 overflow-hidden rounded-t-3xl sm:rounded-t-2xl">
                        <Image
                            src={burger.image}
                            alt={burger.name}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:hidden" />
                    </div>
                )}

                {isCustom && (
                    <div className="relative pt-12 pb-8 px-6 sm:px-8 bg-gradient-to-br from-orange-500 to-orange-700 rounded-t-3xl sm:rounded-t-2xl overflow-hidden shadow-inner shrink-0">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10 flex flex-col justify-end mt-4">
                            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-2 drop-shadow-md">
                                {burger.name}
                            </h2>
                            <p className="text-orange-100 font-medium leading-relaxed drop-shadow-sm text-sm">
                                {burger.fullDescription}
                            </p>
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto no-scrollbar">
                    {!isCustom && (
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                                {burger.name}
                            </h2>
                            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                {burger.fullDescription}
                            </p>
                        </div>
                    )}

                    {/* Normal Ingredients */}
                    {!isCustom && (
                        <div>
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider mb-3">
                                {isMiniBurgers ? "INGREDIENTES GENERALES" : "INGREDIENTES (Toca para quitar)"}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {burger.ingredients.map((ing) => {
                                    const isExcluded = excludedIngredients.includes(ing);
                                    return (
                                        <button
                                            key={ing}
                                            type="button"
                                            disabled={isMiniBurgers}
                                            onClick={() => toggleIngredient(ing)}
                                            className={cn(
                                                "px-3 py-1.5 rounded-full text-xs font-semibold transition-all border",
                                                isExcluded
                                                    ? "bg-red-50 dark:bg-red-950/30 text-red-500 border-red-200 dark:border-red-900/50 line-through opacity-70"
                                                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700",
                                                isMiniBurgers && "cursor-default hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                            )}
                                        >
                                            {ing}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Custom Burger Options */}
                    {isCustom && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider mb-3">
                                    MEDALLONES
                                </h3>
                                <div className="flex gap-3">
                                    {[1, 2].map(num => (
                                        <button
                                            key={num}
                                            onClick={() => setCustomMeats(num)}
                                            className={cn(
                                                "flex-1 py-2 rounded-xl text-sm font-semibold transition-all border",
                                                customMeats === num
                                                    ? "bg-orange-500 border-orange-500 text-white shadow-md"
                                                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                            )}
                                        >
                                            {num} Carne{num > 1 ? "s (+$1500)" : ""}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider mb-3">
                                    ADEREZOS
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {availableDressings.map((ing) => {
                                        const isSelected = customIngredients.includes(ing);
                                        return (
                                            <button
                                                key={ing}
                                                type="button"
                                                onClick={() => toggleCustomIngredient(ing)}
                                                className={cn(
                                                    "px-3 py-1.5 rounded-full text-xs font-semibold transition-all border",
                                                    isSelected
                                                        ? "bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-500 border-orange-200 dark:border-orange-900/50 shadow-sm"
                                                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                                )}
                                            >
                                                {ing}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider mb-3">
                                    QUESOS
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {availableCheeses.map((ing) => {
                                        const isSelected = customIngredients.includes(ing);
                                        return (
                                            <button
                                                key={ing}
                                                type="button"
                                                onClick={() => toggleCustomIngredient(ing)}
                                                className={cn(
                                                    "px-3 py-1.5 rounded-full text-xs font-semibold transition-all border",
                                                    isSelected
                                                        ? "bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-500 border-orange-200 dark:border-orange-900/50 shadow-sm"
                                                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                                )}
                                            >
                                                {ing}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider mb-3">
                                    EXTRAS
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {availableExtras.map((ing) => {
                                        const isSelected = customIngredients.includes(ing);
                                        return (
                                            <button
                                                key={ing}
                                                type="button"
                                                onClick={() => toggleCustomIngredient(ing)}
                                                className={cn(
                                                    "px-3 py-1.5 rounded-full text-xs font-semibold transition-all border",
                                                    isSelected
                                                        ? "bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-500 border-orange-200 dark:border-orange-900/50 shadow-sm"
                                                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                                )}
                                            >
                                                {ing}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Seleccionador de Sabores para Minis */}
                    {isMiniBurgers && (
                        <div className="mb-6 space-y-4">
                            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider mb-3">
                                ELIGE LOS 3 SABORES (Vienen de a 2)
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[1, 2, 3].map((slot) => {
                                    const value = slot === 1 ? flavor1 : slot === 2 ? flavor2 : flavor3;
                                    const setValue = slot === 1 ? setFlavor1 : slot === 2 ? setFlavor2 : setFlavor3;
                                    return (
                                        <div key={slot} className="flex flex-col gap-1">
                                            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase">Par {slot}</label>
                                            <select
                                                value={value}
                                                onChange={(e) => setValue(e.target.value)}
                                                className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl px-3 py-2.5 text-sm text-zinc-900 dark:text-white font-medium focus:ring-2 focus:ring-orange-500 cursor-pointer"
                                            >
                                                {flavorOptions.map(opt => (
                                                    <option key={opt.id} value={opt.id}>
                                                        {opt.name} {opt.id === "6" ? "(+ $500)" : ""}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 bg-zinc-100 dark:bg-zinc-800 rounded-full p-1.5">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-zinc-700 shadow-sm hover:scale-105 active:scale-95 transition-transform"
                                disabled={quantity <= 1}
                            >
                                <Minus size={16} className={quantity <= 1 ? "text-zinc-300" : "text-zinc-900 dark:text-white"} />
                            </button>
                            <span className="text-lg font-semibold w-4 text-center text-zinc-900 dark:text-white">
                                {quantity}
                            </span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-zinc-700 shadow-sm hover:scale-105 active:scale-95 transition-transform"
                            >
                                <Plus size={16} className="text-zinc-900 dark:text-white" />
                            </button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold rounded-full shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/30 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span>{isEditing ? "Actualizar pedido" : "Agregar al pedido"}</span>
                            <span className="bg-white/20 px-2 py-0.5 rounded text-sm font-bold min-w-[3rem]">
                                ${((burger.price + flavorsExtraPrice) * quantity).toLocaleString('es-AR')}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
